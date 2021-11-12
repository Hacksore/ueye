export const fetchNpmData = (repoName) => {
  // date ref
  const date = new Date();

  // get current date yy-mm-dd current date
  const currentDate = date.toISOString().split("T")[0];

  // get current date yy-mm-dd current today minus seven days
  const sevenDaysAgo = new Date(date.setDate(date.getDate() - 7))
    .toISOString()
    .split("T")[0];

  console.log(currentDate, sevenDaysAgo);

  return fetch(
    `https://api.npmjs.org/downloads/point/${sevenDaysAgo}:${currentDate}/${repoName}`,
    {
      headers: {
        "User-Agent": "ueye api client",
      },
    }
  );
};
