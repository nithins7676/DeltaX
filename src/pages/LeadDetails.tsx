import { useState } from "react";
import { ArrowLeft, Phone, Mail, MessageSquare, Calendar, Paperclip, Edit, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CRMLayout from "@/components/CRMLayout";
import StatusPill from "@/components/StatusPill";
import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "@/hooks/use-role";

const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { role } = useRole();

  // Mock data - in real app this would be fetched based on ID
  const lead = {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    status: "contacted" as const,
    owner: "John Doe",
    channel: "Website",
    carInterest: "Hyundai Creta",
    budget: "₹15-18 Lakhs",
    timeline: "3-6 months",
    dndSms: false,
    dndCall: false,
    consentWhatsapp: true,
    address: "123 MG Road, Bangalore, Karnataka 560001",
    occupation: "Software Engineer",
    created: "2024-01-15T10:30:00Z"
  };

  const activities = [
    {
      id: 1,
      type: "call",
      title: "Outbound call - Initial inquiry",
      description: "Discussed car requirements and budget. Customer interested in Hyundai Creta.",
      timestamp: "2024-01-15T14:30:00Z",
      user: "John Doe",
      duration: "8 minutes"
    },
    {
      id: 2,
      type: "email",
      title: "Brochure sent",
      description: "Sent Hyundai Creta brochure and pricing details",
      timestamp: "2024-01-15T15:45:00Z",
      user: "John Doe"
    },
    {
      id: 3,
      type: "whatsapp",
      title: "WhatsApp message",
      description: "Follow-up message with test drive booking link",
      timestamp: "2024-01-16T09:15:00Z",
      user: "John Doe"
    }
  ];

  const duplicates = [
    {
      id: 2,
      name: "Rajesh K",
      phone: "+91 9876543210",
      email: "r.kumar@gmail.com",
      similarity: 95,
      created: "2024-01-10T08:20:00Z"
    }
  ];

  const ActivityIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <CRMLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/leads')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leads
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-2xl font-semibold">{lead.name}</h1>
              <p className="text-muted-foreground">Lead #{lead.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {role === 'sales' && (
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            )}
          </div>
        </div>

        {/* Top Bar - Status, Owner, Channel */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Select defaultValue={lead.status}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Owner</Label>
                  <div className="mt-1">
                    <Select defaultValue={lead.owner}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Channel</Label>
                  <div className="mt-1">
                    <Badge variant="outline">{lead.channel}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" disabled={role === 'manager'}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" disabled={role === 'manager'}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  SMS
                </Button>
                <Button variant="outline" size="sm" disabled={role === 'manager'}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Lead Details */}
          <div className="col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <Input 
                    value={lead.name} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <Input 
                    value={lead.phone} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <Input 
                    value={lead.email} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <Textarea 
                    value={lead.address} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent resize-none" : ""}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Interest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Car Interest</Label>
                  <Input 
                    value={lead.carInterest} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Budget</Label>
                  <Input 
                    value={lead.budget} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Timeline</Label>
                  <Input 
                    value={lead.timeline} 
                    readOnly={!isEditing || role === 'manager'}
                    className={!isEditing || role === 'manager' ? "border-0 px-0 bg-transparent" : ""}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">DND SMS</Label>
                  <Switch checked={lead.dndSms} disabled={!isEditing || role === 'manager'} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">DND Call</Label>
                  <Switch checked={lead.dndCall} disabled={!isEditing || role === 'manager'} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">WhatsApp Consent</Label>
                  <Switch checked={lead.consentWhatsapp} disabled={!isEditing || role === 'manager'} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Activity Timeline */}
          <div className="col-span-5 space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <div className="space-y-4 h-full overflow-y-auto">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <ActivityIcon type={activity.type} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{activity.user}</span>
                          {activity.duration && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{activity.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Activity Composer */}
                <div className="mt-4 pt-4 border-t border-border">
                  <Textarea placeholder="Add a note or activity..." rows={3} />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm">Add Activity</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Next Action, Duplicates, Attachments */}
          <div className="col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Next Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Action Type</Label>
                  <Select defaultValue="call">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Follow-up Call</SelectItem>
                      <SelectItem value="email">Send Email</SelectItem>
                      <SelectItem value="meeting">Schedule Meeting</SelectItem>
                      <SelectItem value="demo">Product Demo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date & Time</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Reminder</Label>
                  <Select defaultValue="15min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 minutes before</SelectItem>
                      <SelectItem value="30min">30 minutes before</SelectItem>
                      <SelectItem value="1hour">1 hour before</SelectItem>
                      <SelectItem value="1day">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Action
                </Button>
              </CardContent>
            </Card>

            {duplicates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                    Potential Duplicates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {duplicates.map((duplicate) => (
                    <div key={duplicate.id} className="p-3 border border-warning/20 rounded-lg bg-warning/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{duplicate.name}</p>
                          <p className="text-xs text-muted-foreground">{duplicate.phone}</p>
                          <p className="text-xs text-muted-foreground">{duplicate.email}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {duplicate.similarity}% match
                        </Badge>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Merge
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs h-7">
                          Ignore
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No attachments yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Strip - Quick Templates */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Quick Templates</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS Template
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email Template
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send WhatsApp Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  );
};

export default LeadDetails;