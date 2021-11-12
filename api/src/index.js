import { Router } from "itty-router";
import { fetchGithubData } from "./github";
import { fetchNpmData } from "./npm";
import { gatherResponse } from "./util";

const router = Router();

async function getRepoData(data) {
  const { org, repo } = data;
  const githubResponse = await fetchGithubData(`${org}/${repo}`);
  const npmResponse = await fetchNpmData(repo);

  if (githubResponse.status !== 200 || npmResponse.status !== 200) {
    return { error: "Error getting repo data" };
  }

  const githubData = JSON.parse(await gatherResponse(githubResponse));
  const npmData = JSON.parse(await gatherResponse(npmResponse));

  return {
    repo,
    name: githubData.name,
    forks: githubData.forks,
    stars: githubData.stargazers_count,
    issues: githubData.open_issues_count,
    npm: {
      downloads: npmData.downloads,
    },
  };
}

// GET collection index
router.get("/stats", async () => {
  const data = await Promise.all([
    getRepoData({ org: "facebook", repo: "react" }),
    getRepoData({ org: "vuejs", repo: "vue" }),
    getRepoData({ org: "angular", repo: "angular" }),
  ]);

  const repos = {
    react: data[0],
    vue: data[1],
    angular: data[2],
  };

  return new Response(JSON.stringify(repos), {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
});

// 404 for everything else
router.all(
  "*",
  () => new Response("Where in the tarnation?!??!", { status: 404 })
);

// eslint-disable-next-line no-restricted-globals
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
