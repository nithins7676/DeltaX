import { TrendingUp, TrendingDown, Users, Phone, Target, Trophy, AlertTriangle, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import CRMLayout from "@/components/CRMLayout";
import StatusPill from "@/components/StatusPill";
import { useRole } from "@/hooks/use-role";

const Dashboard = () => {
  const { role } = useRole();
  // Mock data for KPIs
  const kpis = [
    {
      title: "New Leads",
      value: "142",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      period: "This month"
    },
    {
      title: "Contact Rate",
      value: "73%",
      change: "+5%",
      trend: "up" as const,
      icon: Phone,
      period: "Last 30 days"
    },
    {
      title: "Qualification Rate",
      value: "45%",
      change: "-3%",
      trend: "down" as const,
      icon: Target,
      period: "Last 30 days"
    },
    {
      title: "Win Rate",
      value: "18%",
      change: "+2%",
      trend: "up" as const,
      icon: Trophy,
      period: "Last 30 days"
    }
  ];

  // Mock data for funnel
  const funnelData = [
    { stage: "New", count: 142, percentage: 100, color: "bg-status-new" },
    { stage: "Contacted", count: 104, percentage: 73, color: "bg-status-contacted" },
    { stage: "Qualified", count: 47, percentage: 33, color: "bg-status-qualified" },
    { stage: "Follow-up", count: 28, percentage: 20, color: "bg-status-followup" },
    { stage: "Won", count: 8, percentage: 6, color: "bg-status-won" }
  ];

  // Mock data for channel performance
  const channelData = [
    { channel: "Website", leads: 56, qualified: 23, won: 4, rate: "7.1%" },
    { channel: "Facebook", leads: 34, qualified: 12, won: 2, rate: "5.9%" },
    { channel: "WhatsApp", leads: 28, qualified: 8, won: 1, rate: "3.6%" },
    { channel: "Phone", leads: 24, qualified: 4, won: 1, rate: "4.2%" }
  ];

  // Mock data for at-risk follow-ups
  const atRiskLeads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      status: "qualified" as const,
      lastContact: "2024-01-15",
      daysPending: 5,
      owner: "John Doe",
      priority: "high"
    },
    {
      id: 2,
      name: "Priya Sharma",
      status: "followup" as const,
      lastContact: "2024-01-17",
      daysPending: 3,
      owner: "Jane Smith",
      priority: "medium"
    },
    {
      id: 3,
      name: "Amit Patel",
      status: "contacted" as const,
      lastContact: "2024-01-16",
      daysPending: 4,
      owner: "John Doe",
      priority: "high"
    }
  ];

  // Mock data for top campaigns
  const topCampaigns = [
    {
      name: "Digital Campaign Q1",
      leads: 89,
      conversions: 12,
      rate: "13.5%",
      spend: "₹2,45,000"
    },
    {
      name: "Social Media Q1",
      leads: 67,
      conversions: 8,
      rate: "11.9%",
      spend: "₹1,89,000"
    },
    {
      name: "WhatsApp Campaign",
      leads: 45,
      conversions: 3,
      rate: "6.7%",
      spend: "₹98,000"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <CRMLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">{role === 'manager' ? 'Overview of team performance and pipeline health' : 'Your personal performance and pipeline'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* KPI Tiles */}
        <div className="grid grid-cols-4 gap-6">
          {(role === 'manager' ? kpis : kpis.slice(0, 2)).map((kpi) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = kpi.trend === "up" ? "text-success" : "text-destructive";
            
            return (
              <Card key={kpi.title} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{kpi.title}</p>
                      </div>
                      <p className="text-4xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        {kpi.value}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-full ${trendColor === 'text-success' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                        </div>
                        <span className={`text-sm font-bold ${trendColor}`}>
                          {kpi.change}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {kpi.period}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Charts */}
          <div className="col-span-8 space-y-6">
            {/* Funnel Chart */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mr-3">
                    <span className="text-primary-foreground font-bold text-sm">📊</span>
                  </div>
                  {role === 'manager' ? 'Sales Funnel by Status' : 'Your Funnel by Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {funnelData.map((stage, index) => (
                    <div key={stage.stage} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-semibold text-foreground">{stage.stage}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                            {stage.count} leads
                          </span>
                          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                            {stage.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-muted/40 rounded-full h-4 overflow-hidden">
                          <div 
                            className={`h-4 rounded-full bg-gradient-to-r ${stage.color} shadow-lg transition-all duration-1000 ease-out`}
                            style={{ width: `${stage.percentage}%` }}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            {role === 'manager' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  📊 Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">📢 Channel</TableHead>
                      <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">🎯 Leads</TableHead>
                      <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">✅ Qualified</TableHead>
                      <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">🏆 Won</TableHead>
                      <TableHead className="font-bold text-automotive-charcoal bg-gradient-to-r from-muted/60 to-muted/40">📈 Win Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channelData.map((channel) => (
                      <TableRow key={channel.channel}>
                        <TableCell className="font-medium">
                          <Badge variant="outline" className="rounded-full font-semibold border-primary/20 text-primary">
                            {channel.channel}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-lg">{channel.leads}</TableCell>
                        <TableCell className="font-semibold text-lg text-success">{channel.qualified}</TableCell>
                        <TableCell className="font-semibold text-lg text-primary">{channel.won}</TableCell>
                        <TableCell className="font-bold text-lg bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1 rounded-lg">
                          {channel.rate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Right Column - Tables */}
          <div className="col-span-4 space-y-6">
            {/* At-Risk Follow-ups */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-warning to-warning/80 rounded-xl flex items-center justify-center mr-3">
                    <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                  </div>
                  {role === 'manager' ? 'At-Risk Follow-ups' : 'Your At-Risk Follow-ups'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atRiskLeads.map((lead) => (
                    <div key={lead.id} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-muted/50 hover:border-warning/30 transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-sm text-foreground">{lead.name}</span>
                        <StatusPill status={lead.status} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{lead.owner}</span>
                        <span className={`font-bold px-2 py-1 rounded-full text-xs ${getPriorityColor(lead.priority)} ${getPriorityColor(lead.priority).includes('destructive') ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                          {lead.daysPending} days overdue
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:bg-warning/10 hover:border-warning/30 transition-all duration-200">
                    View All Overdue
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Campaigns */}
            {role === 'manager' && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mr-3">
                    <span className="text-primary-foreground font-bold text-sm">🚀</span>
                  </div>
                  Top Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCampaigns.map((campaign, index) => (
                    <div key={campaign.name} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-muted/50 hover:border-primary/30 transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-sm text-foreground">{campaign.name}</span>
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <span className="font-bold text-primary">{campaign.leads}</span>
                          <div className="text-xs text-muted-foreground">leads</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <span className="font-bold text-success">{campaign.conversions}</span>
                          <div className="text-xs text-muted-foreground">conversions</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <span className="font-bold text-warning">{campaign.rate}</span>
                          <div className="text-xs text-muted-foreground">rate</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <span className="font-bold text-primary">{campaign.spend}</span>
                          <div className="text-xs text-muted-foreground">spend</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    View All Campaigns
                  </Button>
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Dashboard;