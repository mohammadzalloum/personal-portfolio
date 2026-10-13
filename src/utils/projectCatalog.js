const projectTitle = (project) =>
  String(project?.Title || project?.title || "").trim().toLowerCase();

const projectLink = (project) =>
  String(project?.Link || project?.link || "")
    .trim()
    .toLowerCase()
    .replace(/\/+$/, "")
    .replace(/\/tree\/main$/, "");

export const isBlockchainProject = (project) => {
  const category = String(project?.Category || project?.category || "")
    .trim()
    .toLowerCase();
  if (["blockchain", "web3", "smart contracts", "smart contract", "solidity", "ethereum", "dapp", "dao", "defi"].includes(category)) {
    return true;
  }

  // Match portfolio classification and identity, not passing mentions in an unrelated summary.
  const searchableText = `${projectTitle(project)} ${projectLink(project)}`;
  return /blockchain|web3|solidity|smart contract|ethereum|\bdao\b|\bdefi\b|\bdapp\b|on-chain|tokenized|tokenised|fractional real estate|\bbrix\b/i.test(searchableText);
};

export const isSafeguardProject = (project) => {
  const title = projectTitle(project);
  return projectLink(project).includes("safeguard-fall-adl-tcn") ||
    (title.startsWith("safeguard") &&
      (title.includes("fall") || title.includes("helmet")));
};

export const isSameProject = (left, right) => {
  const leftLink = projectLink(left);
  const rightLink = projectLink(right);
  if (leftLink && rightLink && leftLink === rightLink) return true;

  const leftTitle = projectTitle(left);
  const rightTitle = projectTitle(right);
  if (leftTitle && leftTitle === rightTitle) return true;

  // Match the earlier Safeguard card even if a remote row lacks its source URL.
  return isSafeguardProject(left) && isSafeguardProject(right);
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
