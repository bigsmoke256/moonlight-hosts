import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X, CalendarIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const registrationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  contact_info: z.string().trim().min(1, "Phone or email is required").max(255, "Contact must be less than 255 characters"),
  reason_for_visit: z.enum(["booking_inquiry", "general_inquiry", "partnership_jobs", "just_browsing"], {
    required_error: "Please select a reason for your visit",
  }),
  event_date: z.date().optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

interface VisitorRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitorRegistrationForm = ({ isOpen, onClose }: VisitorRegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    contact_info: "",
    reason_for_visit: "",
    event_date: undefined as Date | undefined,
  });

  const handleChange = (field: string, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = registrationSchema.parse({
        ...formData,
        reason_for_visit: formData.reason_for_visit || undefined,
      });

      // Insert into database
      const { error: dbError } = await supabase
        .from("visitor_registrations")
        .insert({
          full_name: validatedData.full_name,
          contact_info: validatedData.contact_info,
          reason_for_visit: validatedData.reason_for_visit,
          event_date: validatedData.event_date?.toISOString().split("T")[0] || null,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save registration");
      }

      // Send email notification (fire and forget)
      supabase.functions.invoke("send-visitor-notification", {
        body: {
          full_name: validatedData.full_name,
          contact_info: validatedData.contact_info,
          reason_for_visit: validatedData.reason_for_visit,
          event_date: validatedData.event_date?.toISOString().split("T")[0],
        },
      }).catch((err) => console.error("Email notification error:", err));

      toast({
        title: "Thank you! ✨",
        description: "We've received your details. We'll be in touch soon!",
      });

      // Reset form and close
      setFormData({
        full_name: "",
        contact_info: "",
        reason_for_visit: "",
        event_date: undefined,
      });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Please check your details",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-card border border-border rounded-lg shadow-2xl animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm tracking-wide uppercase">Quick Hello</span>
          </div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Before you go, mind leaving your name?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We'd love to know who's interested in our services.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              placeholder="Your name"
              value={formData.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              className="bg-background"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_info">Phone or Email *</Label>
            <Input
              id="contact_info"
              placeholder="How can we reach you?"
              value={formData.contact_info}
              onChange={(e) => handleChange("contact_info", e.target.value)}
              className="bg-background"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason_for_visit">Reason for Visit *</Label>
            <Select
              value={formData.reason_for_visit}
              onValueChange={(value) => handleChange("reason_for_visit", value)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booking_inquiry">Booking Inquiry</SelectItem>
                <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                <SelectItem value="partnership_jobs">Partnership / Jobs</SelectItem>
                <SelectItem value="just_browsing">Just Browsing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.reason_for_visit === "booking_inquiry" && (
            <div className="space-y-2 animate-fade-in">
              <Label>Event Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background",
                      !formData.event_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.event_date ? format(formData.event_date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.event_date}
                    onSelect={(date) => handleChange("event_date", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorRegistrationForm;
