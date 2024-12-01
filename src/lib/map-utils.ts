import L from 'leaflet';
import type { SkillCategory } from '@/types/skill-map';

const CATEGORY_COLORS: Record<SkillCategory, string> = {
  programming: '#3b82f6',
  design: '#ec4899',
  music: '#8b5cf6',
  language: '#10b981',
  fitness: '#f59e0b',
  cooking: '#ef4444',
  business: '#6366f1',
  art: '#14b8a6',
  crafts: '#f97316',
  academic: '#6b7280',
};

export function getCategoryIcon(category: SkillCategory) {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${CATEGORY_COLORS[category]};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        ${category[0].toUpperCase()}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}