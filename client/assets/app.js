const pokeName = document.querySelector(`.Pokemon-name`);
const pokeType = document.querySelector(`.Pokemon-type`);
const pokeImage = document.querySelector(`.Pokemon-image`);
const submitBtn = document.querySelector(`#submitBtn`);
const pokeListItems = document.querySelectorAll(`.list-item`);

let prevUrl = null;
let nextUrl = null;

//This is for the next and previous buttons
// const leftButton = document.querySelector(`.left-button`);
// const rightButton = document.querySelector(`.right-button`);

$(document).ready(function () {
  $("#pokemonName");
  $("pokemonType");

  $(".userSearch").hide();

  $(submitBtn).on("click", (event) => {
    event.preventDefault();
    $(".userSearch").show();
    let pokemon = $("#userInput").val();
    $("#userInput").val("");
    $.ajax({
      type: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/ `,
      datatype: "JSON",
    }).then((response) => {
      console.log(response);
      //Name
      pokeName.textContent = response.name;
      //Type
      console.log(response.types[0].type.name);
      pokeType.textContent = `Type: ${response.types[0].type.name}`;
      //Image
      pokeImage.src = response.sprites.front_default;
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////TESTING
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

//module.exports = { pokeName };