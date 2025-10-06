import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Heart, MessageCircle, Bookmark, User, Settings, 
  Crown, TrendingUp, Briefcase, GraduationCap, Trophy, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Heart, label: 'Matches', path: '/discover' },
  { icon: HelpCircle, label: 'Q&A', path: '/qa' },
  { icon: MessageCircle, label: 'Forum', path: '/forum' },
  { icon: Briefcase, label: 'Job Tracker', path: '/job-tracker' },
  { icon: TrendingUp, label: 'Pitch Analytics', path: '/pitch-analytics' },
  { icon: TrendingUp, label: 'Trends', path: '/job-trends' },
  { icon: GraduationCap, label: 'Mentorship', path: '/mentorship' },
  { icon: Trophy, label: 'Success Stories', path: '/success-stories' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Crown, label: 'Premium', path: '/premium' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300',
        isExpanded ? 'w-60' : 'w-16'
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className={cn('px-4 mb-8', !isExpanded && 'px-3')}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              V
            </div>
            {isExpanded && (
              <span className="font-bold text-lg whitespace-nowrap">
                VentureConnect
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                  !isExpanded && 'justify-center'
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
