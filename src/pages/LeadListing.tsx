import { useState } from "react";
import { Phone, MessageSquare, MoreHorizontal, Filter, Download, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CRMLayout from "@/components/CRMLayout";
import StatusPill from "@/components/StatusPill";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/hooks/use-role";

const LeadListing = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Mock data
  const leads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      status: "new" as const,
      nextAction: "Initial call scheduled",
      owner: "John Doe",
      channel: "Website",
      updated: "2 hours ago",
      email: "rajesh.kumar@email.com",
      carInterest: "Hyundai Creta",
      budget: "₹15-18 Lakhs"
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 8765432109",
      status: "contacted" as const,
      nextAction: "Follow-up call",
      owner: "Jane Smith",
      channel: "Facebook",
      updated: "1 day ago",
      email: "priya.sharma@email.com",
      carInterest: "Maruti Swift",
      budget: "₹8-10 Lakhs"
    },
    {
      id: 3,
      name: "Amit Patel",
      phone: "+91 7654321098",
      status: "qualified" as const,
      nextAction: "Test drive booked",
      owner: "John Doe",
      channel: "WhatsApp",
      updated: "3 hours ago",
      email: "amit.patel@email.com",
      carInterest: "Honda City",
      budget: "₹12-15 Lakhs"
    }
  ];

  const channels = ["Website", "Facebook", "WhatsApp", "Phone", "Walk-in", "Referral"];
  const owners = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];

  const handleRowClick = (lead: any) => {
    setSelectedLead(lead);
    setPreviewOpen(true);
  };

  const handleViewDetails = (leadId: number) => {
    navigate(`/leads/${leadId}`);
  };

  return (
    <CRMLayout>
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Filter Panel */}
        <div className="w-80 border-r border-border bg-card p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <Button variant="ghost" size="sm">Clear All</Button>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Status</Label>
              <div className="flex flex-wrap gap-2">
                <StatusPill status="new" />
                <StatusPill status="contacted" />
                <StatusPill status="qualified" />
                <StatusPill status="followup" />
                <StatusPill status="won" />
                <StatusPill status="lost" />
              </div>
            </div>

            {/* Channel Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Channel</Label>
              <div className="space-y-2">
                {channels.map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Checkbox id={channel} />
                    <label htmlFor={channel} className="text-sm">{channel}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Owner</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" placeholder="From" />
                <Input type="date" placeholder="To" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <h2 className="text-2xl font-bold text-automotive-midnight">Lead Listing</h2>
                  <p className="text-sm text-muted-foreground mt-1">Manage and track your sales opportunities</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                  🎯 {leads.length} Active Leads
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="font-semibold rounded-xl px-4 hover:bg-accent/60 transition-all duration-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                {role === 'manager' && (
                <Button variant="outline" size="sm" className="font-semibold rounded-xl px-4 hover:bg-accent/60 transition-all duration-200">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                )}
                <Button size="sm" className="font-semibold rounded-xl px-5 bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  New Lead
                </Button>
              </div>
            </div>
          </div>

          {/* Premium Table */}
          <div className="flex-1 p-6">
            <Card className="crm-card border-0 shadow-lg">
              <Table className="crm-table">
                <TableHeader>
                  <TableRow className="border-none">
                    <TableHead className="w-[200px] font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">👤 Customer</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">📞 Phone</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">🎯 Status</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">⚡ Next Action</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">👨‍💼 Owner</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">📢 Channel</TableHead>
                    <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">🕒 Updated</TableHead>
                    <TableHead className="w-[120px] font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">⚙️ Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, index) => (
                    <TableRow 
                      key={lead.id} 
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/10 transition-all duration-200 border-0"
                      onClick={() => handleRowClick(lead)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="font-semibold text-automotive-charcoal">{lead.name}</TableCell>
                      <TableCell className="font-mono text-sm">{lead.phone}</TableCell>
                      <TableCell>
                        <StatusPill status={lead.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">{lead.nextAction}</TableCell>
                      <TableCell className="font-medium">{lead.owner}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full font-semibold border-primary/20 text-primary">{lead.channel}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{lead.updated}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => e.stopPropagation()}
                            className="hover:bg-success/10 hover:text-success rounded-xl transition-all duration-200"
                            title="Call Customer"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => e.stopPropagation()}
                            className="hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200"
                            title="Send Message"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="hover:bg-muted/60 rounded-xl transition-all duration-200"
                                title="More Actions"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 rounded-xl shadow-lg">
                              <DropdownMenuItem onClick={() => handleViewDetails(lead.id)} className="font-medium">
                                👁️ View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-medium">
                                🔄 Change Status
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-medium">
                                👥 Assign Owner
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>

        {/* Right Preview Drawer */}
        <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
          <SheetContent className="w-96">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Lead Preview
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => selectedLead && handleViewDetails(selectedLead.id)}
                >
                  View Full Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </SheetTitle>
            </SheetHeader>
            {selectedLead && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedLead.name}</h3>
                  <p className="text-muted-foreground">{selectedLead.phone}</p>
                  <p className="text-muted-foreground">{selectedLead.email}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">
                      <StatusPill status={selectedLead.status} />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Car Interest</Label>
                    <p className="text-sm mt-1">{selectedLead.carInterest}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="text-sm mt-1">{selectedLead.budget}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Owner</Label>
                    <p className="text-sm mt-1">{selectedLead.owner}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Channel</Label>
                    <div className="mt-1">
                      <Badge variant="outline">{selectedLead.channel}</Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm font-medium">Next Action</Label>
                  <p className="text-sm mt-1">{selectedLead.nextAction}</p>
                  <Button size="sm" className="mt-2 w-full">
                    Schedule Action
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </CRMLayout>
  );
};

export default LeadListing;