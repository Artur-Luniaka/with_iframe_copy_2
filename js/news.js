// News page specific JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Only run this code on the news page
  if (window.location.pathname.includes("news.html")) {
    // Load news content from JSON
    fetch("data/news.json")
      .then((response) => response.json())
      .then((data) => {
        const newsContainer = document.getElementById("news-container");
        if (newsContainer) {
          let newsHtml = "";

          data.news.forEach((newsItem) => {
            newsHtml += `
                            <div class="news-card animate-on-scroll">
                                <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image">
                                <div class="news-content">
                                    <div class="news-date">${newsItem.date}</div>
                                    <h3 class="news-title">${newsItem.title}</h3>
                                    <p class="news-excerpt">${newsItem.excerpt}</p>
                                </div>
                            </div>
                        `;
          });

          newsContainer.innerHTML = newsHtml;

          // Update page title and meta description
          document.title = data.pageTitle;
          const metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescription) {
            metaDescription.setAttribute("content", data.pageDescription);
          }
        }
      })
      .catch((error) => console.error("Error loading news data:", error));
  }
});
