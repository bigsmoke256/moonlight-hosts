-- Create status enum for tracking registration follow-ups
CREATE TYPE public.registration_status AS ENUM ('new', 'contacted', 'converted');

-- Add status column to visitor_registrations
ALTER TABLE public.visitor_registrations 
ADD COLUMN status public.registration_status NOT NULL DEFAULT 'new';

-- Add index for faster status filtering
CREATE INDEX idx_visitor_registrations_status ON public.visitor_registrations(status);