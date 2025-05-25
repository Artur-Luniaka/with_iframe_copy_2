// Index page specific JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Only run this code on the index page
  if (
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("/index.html")
  ) {
    // Load index page content from JSON
    fetch("data/index.json")
      .then((response) => response.json())
      .then((data) => {
        // Populate hero section
        const heroSection = document.getElementById("hero");
        if (heroSection) {
          heroSection.innerHTML = `
                        <div class="container">
                            <div class="hero-content fade-in">
                                <div style="flex-shrink: 2;">
                                    <h1 class="hero-title">${data.hero.title}</h1>
                                    <p class="hero-description">${data.hero.description}</p>
                                </div>
                                <div><img class='hero-image' src=${data.hero.image} alt='hero image'/></div>
                            </div>
                        </div>
                    `;
        }

        // Populate how to play section
        const howToPlaySection = document.getElementById("how-to-play");
        if (howToPlaySection) {
          let stepsHtml = "";
          data.howToPlay.steps.forEach((step, index) => {
            stepsHtml += `
                            <div class="step-item animate-on-scroll">
                                <div class="step-number">${index + 1}</div>
                                <h3 class="step-title">${step.title}</h3>
                                <p>${step.description}</p>
                            </div>
                        `;
          });

          howToPlaySection.innerHTML = `
                        <div class="container">
                            <h2 class="page-title">${data.howToPlay.title}</h2>
                            <div class="how-to-play-content">
                                <div class="how-to-play-text">
                                    <p>${data.howToPlay.description}</p>
                                </div>
                                <div class="how-to-play-steps">
                                    ${stepsHtml}
                                </div>
                            </div>
                        </div>
                    `;
        }

        // Populate crowd mechanics section
        const crowdMechanicsSection =
          document.getElementById("crowd-mechanics");
        if (crowdMechanicsSection) {
          let mechanicsHtml = "";
          data.crowdMechanics.items.forEach((item) => {
            mechanicsHtml += `
                            <div class="mechanics-item animate-on-scroll">
                                <div class="mechanics-icon">${item.icon}</div>
                                <h3 class="mechanics-title">${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        `;
          });

          crowdMechanicsSection.innerHTML = `
                        <div class="container">
                            <h2 class="page-title">${data.crowdMechanics.title}</h2>
                            <div class="mechanics-content">
                                ${mechanicsHtml}
                            </div>
                        </div>
                    `;
        }

        // Populate survival tips section
        const survivalTipsSection = document.getElementById("survival-tips");
        if (survivalTipsSection) {
          let tipsHtml = "";
          data.survivalTips.tips.forEach((tip) => {
            tipsHtml += `
                            <div class="tip-card animate-on-scroll">
                                <h3 class="tip-title">${tip.title}</h3>
                                <p>${tip.description}</p>
                            </div>
                        `;
          });

          survivalTipsSection.innerHTML = `
                        <div class="container">
                            <h2 class="page-title">${data.survivalTips.title}</h2>
                            <div class="tips-container">
                                ${tipsHtml}
                            </div>
                        </div>
                    `;
        }

        // Populate battle arena section
        const battleArenaSection = document.getElementById("battle-arena");
        if (battleArenaSection) {
          const gameContainer =
            battleArenaSection.querySelector(".game-container");
          if (!gameContainer) {
            battleArenaSection.innerHTML = `
                            <div class="container">
                                <h2 class="page-title battle-arena-title">${data.battleArena.title}</h2>
                                <p class="battle-arena-description">${data.battleArena.description}</p>
                                <div class="game-container">
                                    <iframe src="https://html5.gamemonetize.co/h29k7j1k1lteufdwei0ldn4enpkekk7r/" width="750" height="1334" scrolling="none" frameborder="0"></iframe>
                                </div>
                            </div>
                        `;
          }
        }
      })
      .catch((error) => console.error("Error loading index data:", error));

    // Load reviews for Players Speak section
    fetch("data/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        const playersSpeakSection = document.getElementById("players-speak");
        if (playersSpeakSection) {
          let reviewsHtml = "";
          data.reviews.forEach((review) => {
            const gender = Math.random() > 0.5 ? "men" : "women";
            const index = Math.floor(Math.random() * 100); // от 0 до 99
            const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
            const stars =
              "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

            reviewsHtml += `
                            <div class="review-card animate-on-scroll">
                                <div class="review-header">
                                    <div class="review-avatar">
                                        <img src="${avatarUrl}" alt="reviewer">
                                    </div>
                                    <div>
                                        <div class="review-author">${review.name}</div>
                                        <div class="review-rating">${stars}</div>
                                    </div>
                                </div>
                                <div class="review-content">
                                    <p>${review.comment}</p>
                                </div>
                            </div>
                        `;
          });

          playersSpeakSection.innerHTML = `
                        <div class="container">
                            <h2 class="page-title">${data.title}</h2>
                            <div class="reviews-container">
                                ${reviewsHtml}
                            </div>
                        </div>
                    `;
        }
      })
      .catch((error) => console.error("Error loading reviews data:", error));
  }
});

// --- Cookie Consent Bar Functionality ---
document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookie-consent-bar");
  const acceptButton = document.getElementById("accept-cookies-btn");
  const COOKIE_NAME = "cookiesAccepted"; // Имя куки
  const COOKIE_EXPIRATION_DAYS = 90; // Срок действия куки в днях

  // Функция для установки куки
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Функция для получения куки
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Проверяем, было ли уже принято согласие
  if (!getCookie(COOKIE_NAME)) {
    // Если куки нет, показываем бар с небольшой задержкой для smooth-эффекта
    setTimeout(() => {
      if (cookieBar) {
        // Проверяем, существует ли элемент, прежде чем добавлять класс
        cookieBar.classList.add("show");
      }
    }, 1000); // Показываем через 1 секунду
  }

  // Обработчик нажатия кнопки "Принять"
  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      setCookie(COOKIE_NAME, "true", COOKIE_EXPIRATION_DAYS);
      if (cookieBar) {
        cookieBar.classList.remove("show"); // Скрываем бар
        setTimeout(() => {
          cookieBar.style.display = "none"; // Удаляем из потока документа после анимации
        }, 300); // Соответствует времени transition в CSS
      }
    });
  }
});
