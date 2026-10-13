const projectTitle = (project) =>
  String(project?.Title || project?.title || "").trim().toLowerCase();

const projectLink = (project) =>
  String(project?.Link || project?.link || "")
    .trim()
    .toLowerCase()
    .replace(/\/+$/, "")
    .replace(/\/tree\/main$/, "");

export const isSameProject = (left, right) => {
  const leftLink = projectLink(left);
  const rightLink = projectLink(right);
  if (leftLink && rightLink && leftLink === rightLink) return true;

  const leftTitle = projectTitle(left);
  const rightTitle = projectTitle(right);
  if (leftTitle && leftTitle === rightTitle) return true;

  // The existing Safeguard card has also used the shorter "ADL" title.
  return leftTitle.startsWith("safeguard fall ") &&
    rightTitle.startsWith("safeguard fall ");
};

export const mergeProjectCatalog = (prioritized, remote, local) => {
  const merged = [];
  for (const project of [...prioritized, ...remote, ...local]) {
    if (!merged.some((existing) => isSameProject(existing, project))) {
      merged.push(project);
    }
  }
  return merged;
};

export const sortAiProjects = (projects) =>
  [...projects].sort(
    (left, right) =>
      (left.portfolioPriority ?? Number.MAX_SAFE_INTEGER) -
      (right.portfolioPriority ?? Number.MAX_SAFE_INTEGER)
  );
