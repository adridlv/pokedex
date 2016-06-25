var arrayPokemon = [];
var evolutionPokemon = "";

var Pokemon = function(name, types, weight, url){
  this.name = name,
  this.types = types,
  this.weight = weight
  this.url = url,
  this.evolution = "";
}

function generateCard(pokemon){
  var type = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
  
  if(pokemon.types[1] != undefined)
    type += " "+pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.slice(1);
  
  console.log(type);

  var html = 
  "<div class=\"card\">"+
  "<img class=\"imgPokemon\"src=\""+pokemon.url+"\">"+
  "<h2 class=\"namePokemon\">"+pokemon.name[0].toUpperCase() + pokemon.name.slice(1)+"</h2>"+
  "<div class=\"types\" ><p>Type: "+ type +"</p></div>"+
  "<div class=\"weight\" ><p>Weight: "+pokemon.weight +"</p></div>"+
  "<div class=\"back\"></div>"
  "</div>"

  ;

  $(".container-pokemon").append(html);
}

function searchPokemon(urlAux, index, callFunction){
  $.ajax({
   url: urlAux+""+index,
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){
    callFunction(data, index)},
  type: 'GET'
});
}

function appendDataPokemon(data, index){
  var pokemonV1 = searchPokemon("http://pokeapi.co/api/v1/pokemon/", index, getPokemonV1);
  printPokemon(data);
}

function getPokemonV1(data){
  //evolutionPokemon = data.evolutions[0].to;
}

function printPokemon(data){
  var pokemon = new Pokemon(data.name,data.types,data.weight,data.sprites.front_default, evolutionPokemon);
  generateCard(pokemon); 
}

function printPokemonArray(data, index){
  var arrayPokemon = data.pokemon;
  arrayPokemon = arrayPokemon.splice(0,10);

  arrayPokemon.forEach(function(item){
    searchPokemon(item.pokemon["url"],"",appendDataPokemon);
  });
}

$(document).ready(function(){
  $(".searchById").click(function(){
    var text = $(".search").val();
    searchPokemon("http://pokeapi.co/api/v2/pokemon/",text, appendDataPokemon);
  });

  $(".searchByType").click(function(){
    var text = $(".search").val();
    console.log("Searching pokemons...");
    searchPokemon("http://pokeapi.co/api/v2/type/",text,printPokemonArray);
  });
});
