add_poke = ''

const cardColors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4e7da',
    rock: 'd5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#98b3e6',
    psychic: '#eaeda1',
    flying: 'F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const main_types = Object.keys(cardColors);

function processPokeResp(pokemon) {
    const upperCaseName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokemon_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => pokemon_types.indexOf(type) > -1);
    const colour = cardColors[type];
    add_poke += `<div class="pokemon_container" style = "background-color : ${colour}" onclick="checkProfile('${pokemon.name}')"><a href="/profile/${pokemon.id}"><img src="${pokemon.sprites.other["official-artwork"].front_default}"> <div> </a>${upperCaseName} </div> <button id= "${pokemon.id}" class = "cart"> Add to Cart </button> </div>`
    // $(".pokemon_container").css("background-color", red);
    // pokemon_container.style.backgroundColor = color;
}



async function ninePokemons() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {
            add_poke += `<div class ="pokemon_images">`
        }

        random = Math.floor(Math.random() * 30) + 1

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${random}`,
            success: processPokeResp
        })

        if (i % 3 == 0) {
            add_poke += `</div>`
        }
    }
    jQuery("main").html(add_poke);
}

function addtocart() {
    x = this.id;
    console.log(x);
    console.log(`http://localhost:3000/cart/insert/${x}`);
    $.ajax({
        url: `http://localhost:3000/cart/insert/${x}`,
        type: "get",
        success: function (a) {
            if(a) {
                window.alert(`Id: ${x} card was added to your cart`);
            } else {
                window.alert(`Please login before add to cart`);
            }
        }
    })
}


function setup() {
    ninePokemons();
    $("body").on("click", ".cart", addtocart);
}


$(document).ready(setup);