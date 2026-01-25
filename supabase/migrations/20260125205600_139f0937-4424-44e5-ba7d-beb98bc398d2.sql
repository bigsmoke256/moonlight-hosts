-- Create a rate limiting function for visitor registrations
-- This prevents spam by limiting total submissions in a time window
CREATE OR REPLACE FUNCTION public.check_visitor_registration_rate()
RETURNS TRIGGER AS $$
DECLARE
  submission_count INTEGER;
BEGIN
  -- Count submissions in the last hour
  SELECT COUNT(*) INTO submission_count
  FROM public.visitor_registrations
  WHERE created_at > NOW() - INTERVAL '1 hour';
  
  -- Allow max 100 submissions per hour globally (adjust as needed)
  IF submission_count >= 100 THEN
    RAISE EXCEPTION 'Too many submissions. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the rate limiting trigger
CREATE TRIGGER rate_limit_visitor_registrations
BEFORE INSERT ON public.visitor_registrations
FOR EACH ROW EXECUTE FUNCTION public.check_visitor_registration_rate();

-- Update the RLS policy to be more restrictive
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit visitor registration" ON public.visitor_registrations;

-- Create a more explicit policy that still allows public inserts 
-- but documents the intent (rate limiting is handled by trigger)
CREATE POLICY "Public can submit visitor registration with rate limit"
ON public.visitor_registrations
FOR INSERT
TO public
WITH CHECK (
  -- Basic validation: required fields must be non-empty
  full_name IS NOT NULL AND full_name <> '' AND
  contact_info IS NOT NULL AND contact_info <> '' AND
  reason_for_visit IS NOT NULL AND
  -- Length limits
  length(full_name) <= 100 AND
  length(contact_info) <= 255
);