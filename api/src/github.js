// eslint-disable-next-line no-undef
const GH_TOKEN = globalThis.GH_TOKEN;

export const fetchGithubData = (repoName) => {
  return fetch(`https://api.github.com/repos/${repoName}`, {
    headers: {
      "User-Agent": "ueye api client",
      Authorization: `Bearer ${GH_TOKEN}`,
    },
  });
};
