const pokeName = document.querySelector(`.Pokemon-name`);
const pokeType = document.querySelector(`.Pokemon-type`);
const pokeImage = document.querySelector(`.Pokemon-image`);
const submitBtn = document.querySelector(`.submitBtn`);

$(document).ready(function () {
    $(submitBtn).on("click", (event) => {
        event.preventDefault();
        var pokemon = "";
        pokemon = $("#userInput").val();
        $("#userInput").val("");
        $.ajax({
            type: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/charizard/ ",
            datatype: "JSON",
        })
            .then((response) => {
                console.log(response);
                //Name
                pokeName.textContent = response.name;
                //Type     
                console.log(response.types[0].type.name);
                pokeType.textContent = `Type: ${response.types[0].type.name}`;
                //Image
                pokeImage.src = response.sprites.front_default;

            })
    })
});


//module.exports = { pokeName };
