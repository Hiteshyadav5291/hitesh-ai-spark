import { queryOptions } from "@tanstack/react-query";

import { getPortfolioContent, type SkillRow } from "./content.functions";

export const portfolioQueryOptions = queryOptions({
  queryKey: ["portfolio-content"],
  queryFn: () => getPortfolioContent(),
});

export type SkillGroup = {
  category: string;
  blurb: string;
  skills: { name: string; note: string }[];
};

/** Flat skill rows grouped by their category, preserving order. */
export function groupSkills(rows: SkillRow[]): SkillGroup[] {
  const groups: SkillGroup[] = [];
  for (const row of rows) {
    let group = groups.find((g) => g.category === row.category);
    if (!group) {
      group = { category: row.category, blurb: row.category_note, skills: [] };
      groups.push(group);
    }
    if (!group.blurb && row.category_note) group.blurb = row.category_note;
    group.skills.push({ name: row.name, note: row.note });
  }
  return groups;
}
