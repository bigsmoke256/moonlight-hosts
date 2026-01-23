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

    const emailHtml = `
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

    console.log("Sending email notification...");
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Moonlight Hosts <onboarding@resend.dev>",
        to: ["matamabrenda@gmail.com", "kobusingbarbara89@gmail.com"],
        subject: `New Visitor: ${data.full_name} - ${reasonLabel}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("Email send error:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ success: true, emailResponse: emailResult }),
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
