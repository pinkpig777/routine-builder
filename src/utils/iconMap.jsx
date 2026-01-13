import {
  BookOpen,
  Briefcase,
  BusFront,
  Code2,
  Dumbbell,
  GraduationCap,
  Sparkles,
  UtensilsCrossed,
  FlaskConical,
} from 'lucide-react';

const ICON_MAP = {
  code: Code2,
  research: FlaskConical,
  meal: UtensilsCrossed,
  class: GraduationCap,
  work: Briefcase,
  study: BookOpen,
  commute: BusFront,
  exercise: Dumbbell,
  life: Sparkles,
};

export const getIcon = (type) => ICON_MAP[type] || Sparkles;
