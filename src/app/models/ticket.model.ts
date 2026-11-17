// Priority indicates how urgent the ticket is.
// It is usually decided based on business impact, customer tier (VIP/Regular), and SLA rules.
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

// Status represents the current stage of the ticket in the support workflow.
export type TicketStatus = 'Open' | 'InProgress' | 'WaitingForCustomer' | 'Resolved';

// Channel tells where the ticket came from (source of communication).
// This helps support teams track and respond using the same channel if needed.
export type TicketChannel = 'Email' | 'Phone' | 'Chat' | 'WhatsApp';

// Impact shows how many users are affected by the issue.
// This is a key input for deciding priority and SLA.
export type TicketImpact = 'SingleUser' | 'MultipleUsers' | 'AllUsers';

// CustomerTier helps support teams apply different SLAs and service rules.
// Example: VIP customers may have faster SLAs and higher priority handling.
export type CustomerTier = 'Regular' | 'VIP';

export interface Ticket {
  // Unique ticket number used for tracking and searching (e.g., #901).
  id: number;

  // Short summary/title of the problem (single-line in table, full in modal).
  subject: string;

  // Customer name who raised the ticket.
  customer: string;

  // Customer email used for communication and verification.
  customerEmail: string;

  // Customer Phone used for communication and verification.
  customerPhone: string;

  // Source channel from where the ticket was created (Email/Chat/Phone/WhatsApp).
  channel: TicketChannel;

  // High-level classification of the ticket (e.g., Payments, Login, Delivery, Refunds).
  // Used for reporting and routing tickets to the right team.
  category: string;

  // Additional keywords for quick filtering/searching.
  // Example: ["Refund", "Delay", "UPI"] helps identify similar issues faster.
  tags: string[];

  // Urgency level of the ticket.
  // Drives SLA duration and escalation rules.
  priority: TicketPriority;

  // Current state of the ticket in the resolution process.
  status: TicketStatus;

  // Indicates how widely the issue affects users (single user vs many vs system-wide).
  // Helps in deciding escalation and incident handling.
  impact: TicketImpact;

  // Customer service tier (Regular or VIP) to apply different handling rules.
  customerTier: CustomerTier;

  // The team currently responsible for handling this ticket (e.g., Billing, Tech, Operations).
  // Used for routing and workload tracking.
  assignedTeam: string;

  // The person currently assigned to work on this ticket.
  // May be empty/unknown until assignment happens in real systems.
  assignee: string;

  // Ticket creation date/time.
  // Used for reporting, sorting, and calculating SLA timelines.
  createdAt: string;

  // Last updated date/time.
  // Helpful for sorting by freshness and showing recency on dashboard.
  lastUpdatedAt: string;

  // SLA due date/time (deadline).
  // Used to compute SLA minutes left / breached status.
  dueAt: string;
}
