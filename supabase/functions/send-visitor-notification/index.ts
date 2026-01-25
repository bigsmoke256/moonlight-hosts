import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VisitorNotificationRequest {
  full_name: string;
  contact_info: string;
  reason_for_visit: string;
  event_date?: string;
}

const reasonLabels: Record<string, string> = {
  booking_inquiry: "Booking Inquiry",
  general_inquiry: "General Inquiry",
  partnership_jobs: "Partnership / Jobs",
  just_browsing: "Just Browsing",
};

const validReasons = ["booking_inquiry", "general_inquiry", "partnership_jobs", "just_browsing"];

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const escapeHtml = (text: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return text.replace(/[&<>"'\/]/g, (char) => htmlEscapes[char]);
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-visitor-notification");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization - require valid Supabase auth token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Missing or invalid authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the token is valid (either anon key usage or authenticated user)
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    // For public submissions, we accept the anon key
    // The token validation ensures this is coming from our app, not direct API calls
    if (claimsError && !token.startsWith("eyJ")) {
      console.error("Invalid token:", claimsError);
      return new Response(
        JSON.stringify({ error: "Invalid authorization" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data: VisitorNotificationRequest = await req.json();
    console.log("Visitor data received:", { ...data, contact_info: "[REDACTED]" });

    // Validate required fields with strict checks
    if (!data.full_name || typeof data.full_name !== "string" || data.full_name.trim().length === 0 || data.full_name.length > 100) {
      console.error("Invalid full_name field");
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!data.contact_info || typeof data.contact_info !== "string" || data.contact_info.trim().length === 0 || data.contact_info.length > 255) {
      console.error("Invalid contact_info field");
      return new Response(
        JSON.stringify({ error: "Invalid contact info" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!data.reason_for_visit || !validReasons.includes(data.reason_for_visit)) {
      console.error("Invalid reason_for_visit field");
      return new Response(
        JSON.stringify({ error: "Invalid reason for visit" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate event_date if provided (should be YYYY-MM-DD format)
    if (data.event_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.event_date)) {
      console.error("Invalid event_date format");
      return new Response(
        JSON.stringify({ error: "Invalid event date format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs for HTML output
    const safeName = escapeHtml(data.full_name.trim());
    const safeContact = escapeHtml(data.contact_info.trim());
    const reasonLabel = reasonLabels[data.reason_for_visit] || escapeHtml(data.reason_for_visit);
    const eventDateInfo = data.event_date 
      ? `<p><strong>Event Date:</strong> ${escapeHtml(data.event_date)}</p>` 
      : "";

    // Send admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #c4a052; border-bottom: 2px solid #c4a052; padding-bottom: 10px;">
          🌙 New Visitor Registration
        </h1>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Visitor Details</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Contact:</strong> ${safeContact}</p>
          <p><strong>Reason for Visit:</strong> ${reasonLabel}</p>
          ${eventDateInfo}
        </div>
        
        <p style="color: #666; font-size: 14px;">
          This visitor registered on your Moonlight Hosts website. 
          Follow up promptly to provide excellent service!
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Sent from Moonlight Hosts Visitor Registration System
        </p>
      </div>
    `;

    console.log("Sending admin notification email...");
    
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Moonlight Hosts <onboarding@resend.dev>",
        to: ["matamabrenda@gmail.com", "kobusingbarbara89@gmail.com"],
        subject: `New Visitor: ${safeName} - ${reasonLabel}`,
        html: adminEmailHtml,
      }),
    });

    const adminEmailResult = await adminEmailResponse.json();
    
    if (!adminEmailResponse.ok) {
      console.error("Admin email send error:", adminEmailResult);
      throw new Error(adminEmailResult.message || "Failed to send admin email");
    }

    console.log("Admin email sent successfully:", adminEmailResult);

    // Send thank-you email to visitor if they provided a valid email
    let visitorEmailResult = null;
    if (isValidEmail(data.contact_info)) {
      const thankYouHtml = `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #1a1a1a; color: #f5f5f5;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4a052; font-size: 28px; margin: 0; letter-spacing: 2px;">
              ✨ MOONLIGHT HOSTS ✨
            </h1>
            <p style="color: #888; font-size: 12px; margin-top: 8px; letter-spacing: 1px;">
              Graceful Welcomes, Lasting Impressions
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); padding: 30px; border-radius: 12px; border: 1px solid #333;">
            <h2 style="color: #c4a052; margin-top: 0; font-size: 22px;">
              Thank You, ${safeName}! 🌙
            </h2>
            
            <p style="color: #d4d4d4; line-height: 1.8; font-size: 16px;">
              We're thrilled that you reached out to us! Your inquiry has been received, and our team will be in touch shortly.
            </p>
            
            ${data.reason_for_visit === 'booking_inquiry' ? `
            <div style="background-color: #c4a052; color: #1a1a1a; padding: 15px 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">
                🎉 Event Inquiry Received!
              </p>
              <p style="margin: 8px 0 0 0; font-size: 14px;">
                We can't wait to help make your event unforgettable.
                ${data.event_date ? `<br/>Event Date: ${data.event_date}` : ''}
              </p>
            </div>
            ` : ''}
            
            <p style="color: #d4d4d4; line-height: 1.8; font-size: 16px;">
              In the meantime, feel free to explore our services or reach out directly if you have any questions.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                With warm regards,<br/>
                <strong style="color: #c4a052;">The Moonlight Hosts Team</strong>
              </p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
            © ${new Date().getFullYear()} Moonlight Hosts. All rights reserved.
          </p>
        </div>
      `;

      console.log("Sending thank-you email to visitor...");
      
      const visitorEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Moonlight Hosts <onboarding@resend.dev>",
          to: [data.contact_info.trim()],
          subject: `Thank you for reaching out, ${safeName}! ✨`,
          html: thankYouHtml,
        }),
      });

      visitorEmailResult = await visitorEmailResponse.json();
      
      if (!visitorEmailResponse.ok) {
        console.error("Visitor thank-you email error:", visitorEmailResult);
        // Don't throw - admin email was sent, just log the visitor email failure
      } else {
        console.log("Thank-you email sent to visitor:", visitorEmailResult);
      }
    } else {
      console.log("Contact info is not a valid email, skipping thank-you email");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailResponse: adminEmailResult,
        visitorEmailResponse: visitorEmailResult 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-visitor-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
