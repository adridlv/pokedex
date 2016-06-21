var arrayPokemon = [];

var Pokemon = function(name, types, weight, url){
  this.name = name,
  this.types = types,
  this.weight = weight
  this.url = url,
  this.evolutions = [];
}

function generateCard(pokemon){
  var type = pokemon.types[0].type.name;
  
  if(pokemon.types[1] != undefined)
    type += " "+pokemon.types[1].type.name;
  
  console.log(type);

  var html = 
  "<div class=\"card\">"+
  "<img src=\""+pokemon.url+"\">"+
  "<h2 class=\"namePokemon\">"+pokemon.name+"</h2>"+
  "<div class=\"types\" ><p>"+ type +"</p></div>"+
  "<div class=\"weight\" ><p>"+pokemon.weight +"</p></div>"+
  "<div class=\"container-evolutions\"></div>"+
  "</div>";

  $(".container-pokemon").append(html);
}

function searchPokemonById(index){
  $.ajax({
   url: 'http://pokeapi.co/api/v2/pokemon/'+index+'/',
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){
    var pokemon = new Pokemon(data.name,data.types,data.weight,data.sprites.front_default);
    searchEvolutionsPokemon(index, pokemon);
    generateCard(pokemon); 
  },
  type: 'GET'

});
}

function searchEvolutionsPokemon(index, pokemon){
  $.ajax({
   url: 'http://pokeapi.co/api/v2/evolution-chain/'+index+'/',
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){
    pokemon.evolutions.push(data.chain.evolves_to[0].species["name"]);
    console.log(pokemon.evolutions);
  },
  type: 'GET'

});
}

function searchPokemonByURL(url){
  $.ajax({
   url: url,
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){
    var pokemon = new Pokemon(data.name,data.types,data.weight,data.sprites.front_default);
    generateCard(pokemon); 
  },
  type: 'GET'

});
}

function searchPokemonByType(index){
  $.ajax({
    url: 'http://pokeapi.co/api/v2/type/'+index+'/',
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){

    arrayPokemon = data.pokemon;
    for(var i = 0; i<10; i++){
      searchPokemonByURL(arrayPokemon[i].pokemon["url"]);
    }
    /*
    arrayPokemon.forEach(function(pokemon){
      searchPokemonByURL(pokemon.pokemon["url"]);
    });*/ 
  },
  type: 'GET'

});
}

$(document).ready(function(){
  /*$(".search").keypress(function(event){
    if(event.keyCode === 13){
      searchPokemonById($(this).val());
    }
  });*/

  $(".searchById").click(function(){
    var text = $(".search").val();
    searchPokemonById(text);
  });

  $(".searchByType").click(function(){
    var text = $(".search").val();
    console.log("Searching pokemons...");
    searchPokemonByType(text);
  });
});
