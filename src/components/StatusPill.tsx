import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: 'new' | 'contacted' | 'qualified' | 'followup' | 'won' | 'lost';
  className?: string;
}

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  followup: 'Follow-up',
  won: 'Won',
  lost: 'Lost'
};

const StatusPill = ({ status, className }: StatusPillProps) => {
  return (
    <span 
      className={cn(
        "status-pill",
        `status-${status}`,
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
};

export default StatusPill;