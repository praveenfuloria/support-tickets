import { Component } from '@angular/core';
import { Ticket, TicketPriority, TicketStatus } from '../models/ticket.model';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [NgClass, NgStyle],
  selector: 'app-tickets-board',
  styleUrl: './tickets-board.css',
  templateUrl: './tickets-board.html',
})
export class TicketsBoard {
  // FILTER STATE (Controls what tickets appear in the table)
  // Text typed in the Search box.
  // Used to filter tickets by Id / Subject / Customer / Email.
  searchText = '';
  // Current selected Status filter.
  // 'All' means "do not filter by status".
  selectedStatus: TicketStatus | 'All' = 'All';
  // Current selected Priority filter.
  // 'All' means "do not filter by priority".
  selectedPriority: TicketPriority | 'All' = 'All';
  // Dropdown options shown in the Status filter.
  // Kept in one place so template can render options using @for.
  statusOptions: Array<TicketStatus | 'All'> = [
    'All',
    'Open',
    'InProgress',
    'WaitingForCustomer',
    'Resolved',
  ];
  // Dropdown options shown in the Priority filter.
  priorityOptions: Array<TicketPriority | 'All'> = ['All', 'Low', 'Medium', 'High', 'Critical'];
  // PAGINATION STATE (Controls page navigation at bottom)
  // Available page sizes (records shown per page).
  pageSizeOptions = [5, 10, 20];
  // Current page size selected by user.
  pageSize = 5;
  // Current page number (1-based index for user friendly display).
  currentPage = 1;
  // MODAL STATE (Controls ticket details popup)
  // When user clicks "View", we store the selected ticket here.
  // Template uses @if(selectedTicket) to show the Bootstrap modal UI.
  selectedTicket: Ticket | null = null;
  // DATA SOURCE (Dummy data)
  // In real applications this data comes from an API.
  // Here, each object represents one ticket record.
  tickets: Ticket[] = [
    {
      id: 901,
      subject: 'Payment deducted but order not created',
      customerPhone: '1234567890',
      customer: 'Ravi Kumar',
      customerEmail: 'ravi.kumar@gmail.com',
      channel: 'WhatsApp',
      category: 'Payments',
      tags: ['PaymentFailed', 'Deduction', 'OrderNotCreated'],
      priority: 'Critical',
      status: 'Open',
      impact: 'MultipleUsers',
      customerTier: 'VIP',
      assignedTeam: 'Billing',
      assignee: 'Anita',
      createdAt: '2026-01-28T09:15:00',
      lastUpdatedAt: '2026-01-28T12:30:00',
      dueAt: '2026-01-28T12:15:00',
    },
    {
      id: 902,
      subject: 'Refund not received (7 days) for UPI transaction',
      customerPhone: '1234567890',
      customer: 'Priya Singh',
      customerEmail: 'priya.singh@gmail.com',
      channel: 'Email',
      category: 'Refunds',
      tags: ['Refund', 'Delay'],
      priority: 'High',
      status: 'InProgress',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Billing',
      assignee: 'Suman',
      createdAt: '2026-01-28T10:05:00',
      lastUpdatedAt: '2026-01-28T11:45:00',
      dueAt: '2026-01-28T16:05:00',
    },
    {
      id: 903,
      subject: 'Unable to login - OTP not coming on registered mobile',
      customerPhone: '1234567890',
      customer: 'John Paul',
      customerEmail: 'john.paul@gmail.com',
      channel: 'Chat',
      category: 'Login',
      tags: ['OTP', 'LoginIssue'],
      priority: 'High',
      status: 'WaitingForCustomer',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Tech',
      assignee: 'Kiran',
      createdAt: '2026-01-28T10:35:00',
      lastUpdatedAt: '2026-01-28T12:10:00',
      dueAt: '2026-01-28T14:35:00',
    },
    {
      id: 904,
      subject: 'Change delivery address for order placed today',
      customerPhone: '1234567890',
      customer: 'Nandini Mishra',
      customerEmail: 'nandini.mishra@gmail.com',
      channel: 'Phone',
      category: 'Delivery',
      tags: ['AddressChange'],
      priority: 'Medium',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'VIP',
      assignedTeam: 'Operations',
      assignee: 'Deepak',
      createdAt: '2026-01-28T11:10:00',
      lastUpdatedAt: '2026-01-28T11:20:00',
      dueAt: '2026-01-28T18:10:00',
    },
    {
      id: 905,
      subject: 'Invoice download issue on order history page',
      customerPhone: '1234567890',
      customer: 'Amit Sharma',
      customerEmail: 'amit.sharma@gmail.com',
      channel: 'Email',
      category: 'Invoices',
      tags: ['InvoiceDownload'],
      priority: 'Low',
      status: 'Resolved',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Tech',
      assignee: 'Ritika',
      createdAt: '2026-01-28T08:40:00',
      lastUpdatedAt: '2026-01-28T09:05:00',
      dueAt: '2026-01-28T20:40:00',
    },
    {
      id: 906,
      subject: 'Double charged for subscription renewal - need reversal',
      customerPhone: '1234567890',
      customer: 'Suresh Nayak',
      customerEmail: 'suresh.nayak@gmail.com',
      channel: 'Email',
      category: 'Payments',
      tags: ['Subscription', 'DoubleCharge'],
      priority: 'Critical',
      status: 'InProgress',
      impact: 'MultipleUsers',
      customerTier: 'VIP',
      assignedTeam: 'Billing',
      assignee: 'Anita',
      createdAt: '2026-01-28T09:50:00',
      lastUpdatedAt: '2026-01-28T12:40:00',
      dueAt: '2026-01-28T13:20:00',
    },
    {
      id: 907,
      subject: 'Order stuck in processing for 3 hours',
      customerPhone: '1234567890',
      customer: 'Meera Das',
      customerEmail: 'meera.das@gmail.com',
      channel: 'Chat',
      category: 'Orders',
      tags: ['Processing', 'Delay'],
      priority: 'High',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Operations',
      assignee: 'Deepak',
      createdAt: '2026-01-28T10:20:00',
      lastUpdatedAt: '2026-01-28T12:05:00',
      dueAt: '2026-01-28T15:20:00',
    },
    {
      id: 908,
      subject: 'App crash on checkout screen (Android 14)',
      customerPhone: '1234567890',
      customer: 'Rahul Verma',
      customerEmail: 'rahul.verma@gmail.com',
      channel: 'WhatsApp',
      category: 'Technical',
      tags: ['Crash', 'Checkout'],
      priority: 'High',
      status: 'InProgress',
      impact: 'MultipleUsers',
      customerTier: 'Regular',
      assignedTeam: 'Tech',
      assignee: 'Kiran',
      createdAt: '2026-01-28T09:05:00',
      lastUpdatedAt: '2026-01-28T12:15:00',
      dueAt: '2026-01-28T13:05:00',
    },
    {
      id: 909,
      subject: 'OTP delayed - arrives after 2 minutes',
      customerPhone: '1234567890',
      customer: 'Sweta Patra',
      customerEmail: 'sweta.patra@gmail.com',
      channel: 'Phone',
      category: 'Login',
      tags: ['OTP', 'Delay'],
      priority: 'Medium',
      status: 'WaitingForCustomer',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Tech',
      assignee: 'Ritika',
      createdAt: '2026-01-28T11:35:00',
      lastUpdatedAt: '2026-01-28T12:25:00',
      dueAt: '2026-01-28T17:35:00',
    },
    {
      id: 910,
      subject: 'Need cancellation and refund for prepaid order',
      customerPhone: '1234567890',
      customer: 'Kunal Jain',
      customerEmail: 'kunal.jain@gmail.com',
      channel: 'Email',
      category: 'Refunds',
      tags: ['Cancel', 'Refund'],
      priority: 'High',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'VIP',
      assignedTeam: 'Billing',
      assignee: 'Suman',
      createdAt: '2026-01-28T11:00:00',
      lastUpdatedAt: '2026-01-28T12:35:00',
      dueAt: '2026-01-28T16:00:00',
    },
  ];
  // UI ACTIONS (Triggered by user interactions in the template)
  // Runs whenever user types in the search box.
  // We reset currentPage to 1 so results always start from first page after a filter change.
  onSearchChange(value: string) {
    this.searchText = value ?? '';
    this.currentPage = 1;
  }
  // Runs when user changes Status filter.
  // Resets to first page because filtered data count changes.
  setStatus(value: TicketStatus | 'All') {
    this.selectedStatus = value;
    this.currentPage = 1;
  }
  // Runs when user changes Priority filter.
  setPriority(value: TicketPriority | 'All') {
    this.selectedPriority = value;
    this.currentPage = 1;
  }
  // Clears all filters and resets the board to default view.
  // NOTE: keep default values consistent with what you want to show on load.
  clearFilters() {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.selectedPriority = 'All';
    this.pageSize = 5; // default page size after reset
    this.currentPage = 1;
  }
  // Runs when user changes page size (5/10/20).
  // We also reset current page to 1 to avoid landing on an invalid page.
  onPageSizeChange(value: number) {
    this.pageSize = value;
    this.currentPage = 1;
  }
  // MODAL OPEN/CLOSE
  // Opens ticket details modal by setting selectedTicket.
  // Template shows modal using @if(selectedTicket).
  openTicketModal(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
  // Closes modal by clearing selectedTicket.
  closeTicketModal() {
    this.selectedTicket = null;
  }
  // FILTERING LOGIC (Computed list based on Search + Filters)
  // Returns tickets after applying:
  // 1) Search text match
  // 2) Status filter match
  // 3) Priority filter match
  get filteredTickets(): Ticket[] {
    const text = this.searchText.trim().toLowerCase();
    return this.tickets.filter((t) => {
      // Search is applied across multiple fields for better real-world usability.
      const matchesText =
        !text ||
        String(t.id).includes(text) ||
        t.subject.toLowerCase().includes(text) ||
        t.customer.toLowerCase().includes(text) ||
        t.customerEmail.toLowerCase().includes(text);
      // Filter by status if user selected anything other than 'All'.
      const matchesStatus = this.selectedStatus === 'All' || t.status === this.selectedStatus;
      // Filter by priority if user selected anything other than 'All'.
      const matchesPriority =
        this.selectedPriority === 'All' || t.priority === this.selectedPriority;
      return matchesText && matchesStatus && matchesPriority;
    });
  }
  // PAGINATION LOGIC (Computed list for current page)
  // Total tickets after filters (used for footer "Total: X").
  get totalItems(): number {
    return this.filteredTickets.length;
  }
  // Total pages based on filtered total and selected page size.
  // Math.max(1, ...) ensures we never return 0 pages even when list is empty.
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }
  // Tickets shown in the table for the selected page.
  // slice() returns only the required part of the array.
  get pagedTickets(): Ticket[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTickets.slice(start, start + this.pageSize);
  }
  // Pagination actions (wired with First/Previous/Next/Last buttons).
  goToFirst() {
    this.currentPage = 1;
  }
  goToLast() {
    this.currentPage = this.totalPages;
  }
  goToPrevious() {
    if (this.currentPage > 1) this.currentPage--;
  }
  goToNext() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
  // SLA HELPERS (Used for SLA minutes, breach state, progress)
  // "Now" time used for SLA calculations.
  // We keep it fixed for demo so output doesn't change on every refresh.
  // In real application, use: return Date.now();
  private now(): number {
    return new Date('2026-01-28T13:00:00').getTime();
  }
  // Calculates how many minutes are left until SLA due time.
  // Positive => still within SLA
  // Negative => SLA already breached
  minutesLeft(t: Ticket): number {
    const due = new Date(t.dueAt).getTime();
    return Math.round((due - this.now()) / 60000);
  }
  // SLA is breached when minutesLeft is 0 or negative AND ticket is not resolved.
  // Resolved tickets are not treated as breached even if due time is in the past.
  isBreached(t: Ticket): boolean {
    return this.minutesLeft(t) <= 0 && t.status !== 'Resolved';
  }
  // A ticket is resolved when its status is "Resolved".
  // Used to disable action buttons and show green row highlighting.
  isResolved(t: Ticket): boolean {
    return t.status === 'Resolved';
  }
  // Calculates SLA progress percentage (0..100) for progress bar.
  // This is a simplified demo approach:
  // - totalMinutes is assumed as 240 min window
  // - "used" increases as due time approaches
  slaPercent(t: Ticket): number {
    const totalMinutes = 240;
    const used = totalMinutes - this.minutesLeft(t);
    const pct = Math.round((used / totalMinutes) * 100);
    return Math.max(0, Math.min(100, pct));
  }
  // BOOTSTRAP CLASS MAPPERS (Used with [ngClass])
  // Returns Bootstrap badge class based on priority.
  // Keeps template clean and avoids repeated switch logic inside HTML.
  priorityBadgeClass(p: TicketPriority): string {
    switch (p) {
      case 'Critical':
        return 'text-bg-danger';
      case 'High':
        return 'text-bg-warning text-dark';
      case 'Medium':
        return 'text-bg-info text-dark';
      case 'Low':
        return 'text-bg-secondary';
      default:
        return 'text-bg-dark';
    }
  }
  // Returns Bootstrap badge class based on status.
  statusBadgeClass(status: TicketStatus): string {
    switch (status) {
      case 'Open':
        return 'text-bg-primary';
      case 'InProgress':
        return 'text-bg-warning text-dark';
      case 'WaitingForCustomer':
        return 'text-bg-info text-dark';
      case 'Resolved':
        return 'text-bg-success';
      default:
        return 'text-bg-secondary';
    }
  }
  // Returns progress bar class based on SLA situation.
  // - Resolved => green
  // - Breached => red
  // - Nearing breach (>=80%) => warning
  // - Otherwise => blue
  progressBarClass(t: Ticket): string {
    if (this.isResolved(t)) return 'bg-success';
    if (this.isBreached(t)) return 'bg-danger';
    const pct = this.slaPercent(t);
    return pct >= 80 ? 'bg-warning' : 'bg-primary';
  }
  // Formats ISO date string into local readable format for UI.
  formatDate(iso: string): string {
    return new Date(iso).toLocaleString();
  }
}
