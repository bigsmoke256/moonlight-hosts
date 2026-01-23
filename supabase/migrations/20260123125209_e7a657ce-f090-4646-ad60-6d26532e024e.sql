-- Create enum for visit reasons
CREATE TYPE public.visit_reason AS ENUM ('booking_inquiry', 'general_inquiry', 'partnership_jobs', 'just_browsing');

-- Create visitor_registrations table
CREATE TABLE public.visitor_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    reason_for_visit visit_reason NOT NULL,
    event_date DATE NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_registrations ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (submit registration)
CREATE POLICY "Anyone can submit visitor registration"
ON public.visitor_registrations
FOR INSERT
WITH CHECK (true);

-- Create app_role enum for admin system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Only admins can view visitor registrations
CREATE POLICY "Admins can view visitor registrations"
ON public.visitor_registrations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update visitor registrations
CREATE POLICY "Admins can update visitor registrations"
ON public.visitor_registrations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete visitor registrations
CREATE POLICY "Admins can delete visitor registrations"
ON public.visitor_registrations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);