var Pokemon = function(name, types, weight){
  this.name = name,
  this.types = types,
  this.weight = weight;
}

function generateCard(pokemon){
  var type = pokemon.types[0].type.name;
  
  if(pokemon.types[1] != undefined)
    type += " "+pokemon.types[1].type.name;
  
  console.log(type);

  var html = 
  "<div class=\"card\">"+
  "<h2 class=\"namePokemon\">"+pokemon.name+"</h2>"+
  "<div class=\"types\" ><p>"+ type +"</p></div>"+
  "<div class=\"weight\" ><p>"+pokemon.weight +"</p></div>"+
  "</div>"

  $(".container-pokemon").append(html);
}

function searchPokemon(index){
  var name = "";
  var type= [];
  var weight="";

  $.ajax({
   url: 'http://pokeapi.co/api/v2/pokemon/'+index+'/',
   data: {
    format: 'json'
  },
  error: function() {
    $('#info').html('<p>An error has occurred</p>');
  },
  dataType: 'json',
  success: function(data) {
   name = data.name;
   type = data.types;
   weight = data.weight;
   var pokemon = new Pokemon(name,type,weight);
   generateCard(pokemon); 
 },
 type: 'GET'

});
}

$(document).ready(function(){
  $(".search").keypress(function(event){
    if(event.keyCode === 13){
      console.log("he entrado");
      searchPokemon($(this).val());
    }
  });
});


