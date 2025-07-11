const newsContainer = document.getElementById('news-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Fetch live random news JSON (no API key required)
async function fetchNews() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/openai-news-sample/news-data/main/news.json');
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        newsContainer.innerHTML = `<p>Could not load news. Please try again later.</p>`;
        console.error('Error fetching news:', error);
    }
}

// Display news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');
        articleEl.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="News Image">
            <div class="article-content">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        newsContainer.appendChild(articleEl);
    });
}

// Handle search
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const filteredArticles = allArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
    if (filteredArticles.length > 0) {
        displayNews(filteredArticles);
    } else {
        newsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    }
});

let allArticles = [];

// Fetch news on page load
fetchNews().then(() => {
    allArticles = [...document.querySelectorAll('.article')].map(article => ({
        title: article.querySelector('h2').textContent,
        description: article.querySelector('p').textContent,
        url: article.querySelector('a').href,
        urlToImage: article.querySelector('img').src
    }));
});
