document.addEventListener("DOMContentLoaded", () => {
  const username = "kaylajill12";
  const featuredRepos = [
    "scrap-happens",
    "summer-chores",
    "mary-codepins-bottomless-bit-bag",
    "basic-fetch-practice",
    "porkys-portable-pitstop"
  ];

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (!response.ok) throw new Error("GitHub API request failed");
      return response.json();
    })
    .then(repos => {
      const selected = repos.filter(repo => featuredRepos.includes(repo.name));
      selected.forEach(repo => {
        const listItem = document.getElementById(repo.name);
        if (listItem) {
          listItem.innerHTML = `
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description || "No description available."}</p>
          `;
        }
      });
    })
    .catch(error => {
      console.error("GitHub repo fetch failed:", error);
    });
});