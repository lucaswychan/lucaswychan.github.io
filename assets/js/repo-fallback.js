// Cache for GitHub API responses to avoid duplicate requests
const repoCache = {};

// Fetch repository data from GitHub API
async function fetchRepoData(repoElement) {
  const fallback = repoElement.querySelector('.repo-fallback');
  if (!fallback) return;

  // Show fallback immediately
  fallback.style.display = 'block';

  const username = repoElement.dataset.username;
  const reponame = repoElement.dataset.reponame;
  const cacheKey = `${username}/${reponame}`;

  // Check cache first
  if (repoCache[cacheKey]) {
    updateFallbackCard(fallback, repoCache[cacheKey]);
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${reponame}`);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    repoCache[cacheKey] = data;
    updateFallbackCard(fallback, data);
  } catch (error) {
    console.warn(`Failed to fetch repo data for ${cacheKey}:`, error);
    // Show default message on error
    const descEl = fallback.querySelector('.repo-fallback-desc');
    if (descEl) {
      descEl.textContent = 'Click to view repository on GitHub';
    }
  }
}

// Update fallback card with fetched data
function updateFallbackCard(fallback, data) {
  const descEl = fallback.querySelector('.repo-fallback-desc');
  const statsEl = fallback.querySelector('.repo-fallback-stats');

  if (descEl) {
    descEl.textContent = data.description || 'No description available';
  }

  if (statsEl) {
    const stars = formatNumber(data.stargazers_count || 0);
    const forks = formatNumber(data.forks_count || 0);
    const language = data.language || '';

    let statsHTML = `
      <span class="repo-stat">
        <i class="fa-solid fa-star"></i> ${stars}
      </span>
      <span class="repo-stat">
        <i class="fa-solid fa-code-fork"></i> ${forks}
      </span>
    `;

    if (language) {
      statsHTML += `
        <span class="repo-stat">
          <span class="repo-lang-dot" style="background-color: ${getLanguageColor(language)}"></span>
          ${language}
        </span>
      `;
    }

    statsEl.innerHTML = statsHTML;
  }
}

// Format large numbers (e.g., 1500 -> 1.5k)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// Get color for programming language
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Swift': '#F05138',
    'Kotlin': '#A97BFF',
    'Scala': '#c22d40',
    'Shell': '#89e051',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'SCSS': '#c6538c',
    'Vue': '#41b883',
    'Svelte': '#ff3e00',
    'Dart': '#00B4AB',
    'Jupyter Notebook': '#DA5B0B',
    'R': '#198CE7',
    'MATLAB': '#e16737',
    'Lua': '#000080',
    'Perl': '#0298c3',
    'Haskell': '#5e5086',
    'Elixir': '#6e4a7e',
    'Clojure': '#db5855',
    'Erlang': '#B83998',
    'Julia': '#a270ba',
    'Dockerfile': '#384d54',
    'Makefile': '#427819',
    'CMake': '#DA3434',
    'TeX': '#3D6117',
  };
  return colors[language] || '#858585';
}
