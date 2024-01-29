




document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById('news-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const apiKey = 'pub_372526a7cec756dca8aababe330a21335156a';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&category=politics&language=en`;

    showLoading();

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            hideLoading();
            displayNews(data?.results);
        })
        .catch(error => {
            hideLoading();
            showErrorAlert(error.message);
        });
});

function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'none';
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        newsItem.innerHTML = `
            <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
            <p>${article.description}</p>
        `;

        newsContainer.appendChild(newsItem);
    });
}

function showErrorAlert(message) {
    alert(`Error: ${message}`);
}
