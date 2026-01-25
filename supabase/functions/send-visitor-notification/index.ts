import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-visitor-notification");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: VisitorNotificationRequest = await req.json();
    console.log("Visitor data received:", { ...data, contact_info: "[REDACTED]" });

    // Validate required fields
    if (!data.full_name || !data.contact_info || !data.reason_for_visit) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
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

    const reasonLabel = reasonLabels[data.reason_for_visit] || data.reason_for_visit;
    const eventDateInfo = data.event_date 
      ? `<p><strong>Event Date:</strong> ${data.event_date}</p>` 
      : "";

    // Send admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #c4a052; border-bottom: 2px solid #c4a052; padding-bottom: 10px;">
          🌙 New Visitor Registration
        </h1>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Visitor Details</h2>
          <p><strong>Name:</strong> ${data.full_name}</p>
          <p><strong>Contact:</strong> ${data.contact_info}</p>
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
        subject: `New Visitor: ${data.full_name} - ${reasonLabel}`,
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
              Thank You, ${data.full_name}! 🌙
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
          to: [data.contact_info],
          subject: `Thank you for reaching out, ${data.full_name}! ✨`,
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
