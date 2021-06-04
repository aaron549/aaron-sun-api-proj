import { DOMSelectors } from "./DOM";

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.grid.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchParams}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        data.forEach((element) => {
          DOMSelectors.grid.insertAdjacentHTML(
            "beforeend",
            `<div class="movie-card">
            <div class="movie-card-front">
              <img
                src="${element.image}"
                alt=""
                class="poster"
              />
            </div>
            <div class="movie-card-back">
              <h3 class="movie-card-header">${element.symbol}</h3>
              <div class="score-box">
                <p class="user-score">${element.name}</p>
                <p class="user-score">$${element.current_price}</p>
              </div>
      
              <div class="release-box">
                <p class="release-date">Market Capitalization</p>
                <p class="release-date">$${element.market_cap}</p>
              </div>
      
              <div class="movie-genres">
                <li class="movie-genre">24h High $${element.high_24h}</li>
                <li class="movie-genre">24h Low $${element.low_24h}</li>
              </div>
            </div>
          </div>`
          );
        });
      } catch (error) {
        console.log(error);
        alert("Hey something went wrong");
      }
    };
    searchQuery();
  });
};

listen();
