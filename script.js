const btn = document.querySelector(".btn");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const input = document.querySelector(".search__form");
const inputArea = document.querySelector("[name='search']");

function randomQuote() {
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      author.textContent = data.author;
      quote.textContent = `" ${data.content} "`;
    });
}

btn.addEventListener("click", randomQuote);

let inputValue = "";
function getValue(e) {
  e.preventDefault();
  fetch("http://api.quotable.io/quotes?limit=150")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      inputValue = inputArea.value;
      const newData = [...data.results].filter((data) =>
        data.tags.includes(inputValue)
      );
      const index = Math.floor(Math.random() * newData.length);

      author.textContent = newData[index].author;
      quote.textContent = `" ${newData[index].content} "`;
    });
}
input.addEventListener("submit", getValue);

const select = document.querySelector("#quotes");
fetch("http://api.quotable.io/quotes?limit=150")
  .then((response) => response.json())
  .then((data) => {
    const tagsList = data.results.map((data) => data.tags).flat();
    const newTagList = [...new Set(tagsList)];
    console.log(newTagList);
    const html = newTagList
      .map((data) => `<option value="${data}">${data}</option>`)
      .join("");
    select.innerHTML = html;
  });

select.addEventListener("change", (e) => {
  fetch("http://api.quotable.io/quotes?limit=150")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      inputValue = e.target.value;
      const newData = [...data.results].filter((data) =>
        data.tags.includes(inputValue)
      );
      const index = Math.floor(Math.random() * newData.length);

      author.textContent = newData[index].author;
      quote.textContent = `" ${newData[index].content} "`;
    });
});

randomQuote();
