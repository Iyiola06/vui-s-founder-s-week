import Link from 'next/link';
import {
  getOrientationDays,
  getAnnouncements,
  getFaqs,
  getLeadershipProfiles,
  getTransportGuides,
  getContactMessages,
  getSiteSettings,
} from '@/lib/data-store';
import { siteConfig } from '@/lib/config';
import {
  Calendar,
  Bell,
  HelpCircle,
  Users,
  Bus,
  MessageSquare,
  Settings,
  ArrowRight,
  Shield,
  Compass,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    days,
    announcements,
    faqs,
    leadership,
    transports,
    messages,
    settings,
  ] = await Promise.all([
    getOrientationDays(),
    getAnnouncements(),
    getFaqs(),
    getLeadershipProfiles(),
    getTransportGuides(),
    getContactMessages(),
    getSiteSettings(),
  ]);

  const totalActivities = days.reduce((sum, d) => sum + (d.activities || []).length, 0);
  const urgentAnnouncements = announcements.filter((a) => a.priority === 'urgent').length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="w-full min-h-screen bg-sprf-surface text-sprf-charcoal pb-24">
      {/* Top Navigation */}
      <header className="bg-white border-b border-sprf-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-sprf-navy block leading-tight">
                SPRF Executive Console
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-sprf-muted">
                Venite University Student Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-sprf-border text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sprf-muted" />
              <span>View Public Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sprf-gold uppercase tracking-wider mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>SPRF Presidential & Executive Desk</span>
            </div>
            <h1 className="text-3xl font-serif text-sprf-navy">Orientation Operations Overview</h1>
          </div>

          <div className="text-xs text-sprf-muted font-mono bg-white px-3 py-1.5 rounded-lg border border-sprf-border self-start sm:self-auto">
            Session: {settings.sessionName || siteConfig.sessionName}
          </div>
        </div>

        {/* 6 Key Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link href="/admin/orientation" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">Days</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{days.length}</p>
              <p className="text-[11px] text-sprf-muted mt-1">{totalActivities} sessions</p>
            </div>
          </Link>

          <Link href="/admin/announcements" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <Bell className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">Notices</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{announcements.length}</p>
              <p className="text-[11px] text-amber-700 font-semibold mt-1">{urgentAnnouncements} urgent</p>
            </div>
          </Link>

          <Link href="/admin/faqs" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <HelpCircle className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">FAQs</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{faqs.length}</p>
              <p className="text-[11px] text-sprf-muted mt-1">Knowledge base</p>
            </div>
          </Link>

          <Link href="/admin/transport" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <Bus className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">Transit</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{transports.length}</p>
              <p className="text-[11px] text-sprf-muted mt-1">Verified routes</p>
            </div>
          </Link>

          <Link href="/admin/leadership" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">Council</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{leadership.length}</p>
              <p className="text-[11px] text-sprf-muted mt-1">SPRF Executives</p>
            </div>
          </Link>

          <Link href="/admin/messages" className="group">
            <div className="sprf-card rounded-2xl p-5 bg-white group-hover:border-sprf-gold transition-all h-full">
              <div className="flex items-center justify-between mb-3">
                <MessageSquare className="w-5 h-5 text-sprf-gold" />
                <span className="text-[10px] uppercase font-bold text-sprf-muted">Inquiries</span>
              </div>
              <p className="text-2xl font-serif font-bold text-sprf-navy">{messages.length}</p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">{unreadMessages} unread</p>
            </div>
          </Link>
        </div>

        {/* Action Shortcuts Strip */}
        <div className="sprf-card rounded-2xl p-6 bg-white space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-sprf-muted block">
            Content Management Hub
          </span>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/orientation"
              className="px-4 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Manage Orientation Days</span>
            </Link>

            <Link
              href="/admin/announcements"
              className="px-4 py-2.5 rounded-xl bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-charcoal transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Publish Announcements</span>
            </Link>

            <Link
              href="/admin/faqs"
              className="px-4 py-2.5 rounded-xl bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-charcoal transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Manage FAQs</span>
            </Link>

            <Link
              href="/admin/leadership"
              className="px-4 py-2.5 rounded-xl bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-charcoal transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Executive Council</span>
            </Link>

            <Link
              href="/admin/transport"
              className="px-4 py-2.5 rounded-xl bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-charcoal transition-colors flex items-center gap-1.5"
            >
              <Bus className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Transport Terminals</span>
            </Link>

            <Link
              href="/admin/settings"
              className="px-4 py-2.5 rounded-xl bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-charcoal transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Portal Settings</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Split: System Checklist & Recent Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Operational Checklist */}
          <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-4">
            <h2 className="text-xl font-serif text-sprf-navy">Orientation Operations Checklist</h2>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-sprf-surface border border-sprf-border/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sprf-navy block">Official Orientation Window</span>
                    <span className="text-sprf-muted">{settings.orientationDatesText || siteConfig.orientationDatesText}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-sprf-surface border border-sprf-border/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sprf-navy block">Google Maps Destination Pin</span>
                    <span className="text-sprf-muted font-mono truncate max-w-[280px] block">
                      {settings.googleMapsDestination || siteConfig.googleMapsDestination}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-sprf-surface border border-sprf-border/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sprf-navy block">Arrival Emergency Helpline</span>
                    <span className="text-sprf-muted font-mono">{settings.emergencyHelpline || siteConfig.contact.emergencyHelpline}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-sprf-surface border border-sprf-border/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sprf-navy block">SPRF Welcome Marshals Deployment</span>
                    <span className="text-sprf-muted">Main Entrance Gate & Iloro-Ekiti Junction</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>

          {/* Recent Student Messages */}
          <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif text-sprf-navy">Recent Inquiries</h2>
              <Link href="/admin/messages" className="text-xs font-semibold text-sprf-navy hover:text-sprf-gold">
                View All ({messages.length}) →
              </Link>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-sprf-muted bg-sprf-surface rounded-xl">
                No student inquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 4).map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-sprf-surface border border-sprf-border/60 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sprf-navy">{msg.name}</span>
                      <span className="text-[10px] font-mono text-sprf-muted">{msg.category}</span>
                    </div>
                    <p className="text-sprf-muted truncate">{msg.message}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="font-mono text-sprf-muted">{msg.email}</span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${msg.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {msg.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
