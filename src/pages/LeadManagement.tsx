import { useState } from "react";
import { Users, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CRMLayout from "@/components/CRMLayout";
import StatusPill from "@/components/StatusPill";
import { useRole } from "@/hooks/use-role";

const LeadManagement = () => {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const { role } = useRole();

  // Mock data
  const unassignedLeads = [
    {
      id: 1,
      name: "Arjun Reddy",
      phone: "+91 9876543211",
      channel: "Website",
      created: "2024-01-20T10:30:00Z",
      suggestedOwner: "John Doe",
      slaHours: 2,
      campaign: "Digital Campaign Q1"
    },
    {
      id: 2,
      name: "Sneha Iyer",
      phone: "+91 8765432110",
      channel: "Facebook",
      created: "2024-01-20T09:15:00Z",
      suggestedOwner: "Jane Smith",
      slaHours: 4,
      campaign: "Social Media Q1"
    },
    {
      id: 3,
      name: "Karthik Singh",
      phone: "+91 7654321011",
      channel: "WhatsApp",
      created: "2024-01-19T16:45:00Z",
      suggestedOwner: "John Doe",
      slaHours: 18,
      campaign: "WhatsApp Campaign"
    }
  ];

  const owners = [
    { name: "John Doe", currentLeads: 15, capacity: 20, available: true },
    { name: "Jane Smith", currentLeads: 18, capacity: 20, available: true },
    { name: "Mike Johnson", currentLeads: 22, capacity: 20, available: false },
    { name: "Sarah Wilson", currentLeads: 12, capacity: 20, available: true }
  ];

  const channels = ["Website", "Facebook", "WhatsApp", "Phone", "Walk-in", "Referral"];

  const handleSelectLead = (leadId: number) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === unassignedLeads.length 
        ? [] 
        : unassignedLeads.map(lead => lead.id)
    );
  };

  const handleAssignLeads = () => {
    if (selectedLeads.length > 0 && selectedOwner) {
      // Handle assignment logic
      console.log(`Assigning leads ${selectedLeads} to ${selectedOwner}`);
      setSelectedLeads([]);
      setSelectedOwner("");
    }
  };

  const getSLAStatus = (hours: number) => {
    if (hours <= 4) return { color: "text-success", icon: CheckCircle };
    if (hours <= 12) return { color: "text-warning", icon: Clock };
    return { color: "text-destructive", icon: AlertTriangle };
  };

  return (
    <CRMLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Lead Management</h1>
            <p className="text-muted-foreground">Assign and manage lead workflows</p>
          </div>
        </div>

        <Tabs defaultValue="unassigned" className="space-y-6">
          <TabsList>
            <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
            <TabsTrigger value="reassignment">Reassignment</TabsTrigger>
            <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="unassigned" className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Filters */}
              <div className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Channel</Label>
                      <div className="space-y-2 mt-2">
                        {channels.map((channel) => (
                          <div key={channel} className="flex items-center space-x-2">
                            <Checkbox id={channel} />
                            <label htmlFor={channel} className="text-sm">{channel}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Date Range</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <Input type="date" placeholder="From" />
                        <Input type="date" placeholder="To" />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Campaign</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="digital-q1">Digital Campaign Q1</SelectItem>
                          <SelectItem value="social-q1">Social Media Q1</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp Campaign</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Table */}
              <div className="col-span-9 space-y-4">
                {/* Bulk Actions Bar */}
                {role === 'manager' && selectedLeads.length > 0 && (
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{selectedLeads.length} leads selected</span>
                      <div className="flex items-center space-x-2">
                        <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            {owners.map((owner) => (
                              <SelectItem 
                                key={owner.name} 
                                value={owner.name}
                                disabled={!owner.available}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{owner.name}</span>
                                  <Badge 
                                    variant={owner.available ? "default" : "destructive"}
                                    className="ml-2 text-xs"
                                  >
                                    {owner.currentLeads}/{owner.capacity}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAssignLeads} disabled={!selectedOwner}>
                          Assign
                        </Button>
                        {selectedOwner && owners.find(o => o.name === selectedOwner)?.currentLeads! >= 18 && (
                          <Badge variant="outline" className="text-warning">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Over capacity
                          </Badge>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          {role === 'manager' ? (
                            <Checkbox 
                              checked={selectedLeads.length === unassignedLeads.length}
                              onCheckedChange={handleSelectAll}
                            />
                          ) : null}
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Suggested Owner</TableHead>
                        <TableHead>SLA TTF</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unassignedLeads.map((lead) => {
                        const slaStatus = getSLAStatus(lead.slaHours);
                        const SLAIcon = slaStatus.icon;
                        
                        return (
                          <TableRow key={lead.id}>
                            <TableCell>
                              {role === 'manager' ? (
                                <Checkbox 
                                  checked={selectedLeads.includes(lead.id)}
                                  onCheckedChange={() => handleSelectLead(lead.id)}
                                />
                              ) : null}
                            </TableCell>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{lead.channel}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(lead.created).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.suggestedOwner}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <SLAIcon className={`h-4 w-4 ${slaStatus.color}`} />
                                <span className={`text-sm ${slaStatus.color}`}>
                                  {lead.slaHours}h
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reassignment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Reassignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Reassignment Rules</h3>
                  <p className="text-muted-foreground">Configure automatic reassignment based on performance metrics</p>
                  <Button className="mt-4">Configure Rules</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playbooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Playbooks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Define Sales Processes</h3>
                  <p className="text-muted-foreground">Create standardized workflows for different lead types</p>
                  <Button className="mt-4">Create Playbook</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Automation Rules</h3>
                  <p className="text-muted-foreground">Set up automatic lead assignment based on criteria</p>
                  <Button className="mt-4">Configure Rules</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default LeadManagement;