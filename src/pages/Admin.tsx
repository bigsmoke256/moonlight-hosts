import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Download, RefreshCw, Calendar, User, Mail, FileText, Circle } from "lucide-react";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type RegistrationStatus = Database["public"]["Enums"]["registration_status"];

type VisitorRegistration = {
  id: string;
  full_name: string;
  contact_info: string;
  reason_for_visit: string;
  event_date: string | null;
  created_at: string;
  status: RegistrationStatus;
};

const reasonLabels: Record<string, string> = {
  booking_inquiry: "Booking Inquiry",
  general_inquiry: "General Inquiry",
  partnership_jobs: "Partnership / Jobs",
  just_browsing: "Just Browsing",
};

const statusColors: Record<RegistrationStatus, string> = {
  new: "text-blue-500",
  contacted: "text-amber-500",
  converted: "text-green-500",
};

const statusLabels: Record<RegistrationStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<VisitorRegistration[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        fetchRegistrations();
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        fetchRegistrations();
      } else {
        setIsAuthenticated(false);
        setRegistrations([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("visitor_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      if (error.code === "42501") {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to view registrations.",
          variant: "destructive",
        });
      }
    } else {
      setRegistrations(data || []);
    }
  };

  const updateStatus = async (id: string, newStatus: RegistrationStatus) => {
    setUpdatingStatus(id);
    
    const { error } = await supabase
      .from("visitor_registrations")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update the registration status.",
        variant: "destructive",
      });
    } else {
      setRegistrations(prev =>
        prev.map(reg =>
          reg.id === id ? { ...reg, status: newStatus } : reg
        )
      );
      toast({
        title: "Status Updated",
        description: `Registration marked as ${statusLabels[newStatus]}.`,
      });
    }
    
    setUpdatingStatus(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome!",
        description: "You're now logged in.",
      });
    }

    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You've been signed out.",
    });
  };

  const exportToCSV = () => {
    if (registrations.length === 0) {
      toast({
        title: "No Data",
        description: "There are no registrations to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Name", "Contact", "Reason", "Status", "Event Date", "Registered At"];
    const rows = registrations.map((r) => [
      r.full_name,
      r.contact_info,
      reasonLabels[r.reason_for_visit] || r.reason_for_visit,
      statusLabels[r.status] || r.status,
      r.event_date || "-",
      format(new Date(r.created_at), "PPP p"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitor-registrations-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported!",
      description: "CSV file has been downloaded.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-heading font-semibold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to view visitor registrations
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => navigate("/")}>
              ← Back to Website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-semibold text-foreground">
              Visitor Registrations
            </h1>
            <p className="text-sm text-muted-foreground">
              {registrations.length} total submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRegistrations}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {registrations.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No visitor registrations yet.</p>
            <p className="text-sm mt-1">Registrations will appear here as visitors submit the form.</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </div>
                  </TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Event Date
                    </div>
                  </TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.full_name}</TableCell>
                    <TableCell>{reg.contact_info}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {reasonLabels[reg.reason_for_visit] || reg.reason_for_visit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={reg.status}
                        onValueChange={(value: RegistrationStatus) => updateStatus(reg.id, value)}
                        disabled={updatingStatus === reg.id}
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <Circle className={`w-2 h-2 fill-current ${statusColors[reg.status]}`} />
                              <span>{statusLabels[reg.status]}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">
                            <div className="flex items-center gap-2">
                              <Circle className="w-2 h-2 fill-current text-blue-500" />
                              New
                            </div>
                          </SelectItem>
                          <SelectItem value="contacted">
                            <div className="flex items-center gap-2">
                              <Circle className="w-2 h-2 fill-current text-amber-500" />
                              Contacted
                            </div>
                          </SelectItem>
                          <SelectItem value="converted">
                            <div className="flex items-center gap-2">
                              <Circle className="w-2 h-2 fill-current text-green-500" />
                              Converted
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {reg.event_date ? format(new Date(reg.event_date), "PPP") : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(reg.created_at), "PPP p")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
