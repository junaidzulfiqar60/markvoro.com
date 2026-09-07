import {
  Share2,
  Megaphone,
  Search,
  PenTool,
  Palette,
  Code2,
  Mail,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Smartphone,
  UserCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Prisma can't store a React component, so DB-backed Service rows store an
 * icon *name* (one of these keys) and the frontend resolves it through here.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  Share2,
  Megaphone,
  Search,
  PenTool,
  Palette,
  Code2,
  Mail,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Smartphone,
  UserCheck,
  Workflow,
  Zap,
};

export const ICON_NAMES = Object.keys(ICON_MAP) as [string, ...string[]];

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
