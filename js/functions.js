var helper = {counter: 0, i: 1};

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
  "</div>";

  $(".container-pokemon").append(html);
}

function searchPokemon(search, searchControl){
  var name = "";
  var type= [];
  var weight="";
  if(searchControl){
    var counter = 0;
    var i = 1;

    while(helper.counter < 4){
      console.log("i: "+helper.i+"counter: "+helper.counter);
      searchPokemonByType(helper.i,search);
      helper.i++;
    }
    
  }
  else{
    searchPokemonById(search);
  }
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
    var pokemon = new Pokemon(data.name,data.types,data.weight);
    generateCard(pokemon); 
  },
  type: 'GET'

});
}

function searchPokemonByType(index, type){

  $.ajax({
   url: 'http://pokeapi.co/api/v2/pokemon/'+index+'/',
   data: {
    format: 'json'
  },
  error: function() {

  },
  dataType: 'json',
  success: function(data){
    var pokemon = new Pokemon(data.name,data.types,data.weight);

    if(pokemon.types[0].type.name === type || pokemon.types[1].type.name === type){
      console.log("entro por aqui");
      generateCard(pokemon); 
      helper.counter++;
    }
    
  },
  type: 'GET'

});
  
}

$(document).ready(function(){
  $(".search").keypress(function(event){
    if(event.keyCode === 13){
      console.log("he entrado");
      var texto = $(this).val();
      var searchControl = false;

      //checkear que exista el tipo POR HACER
      searchControl = isNaN(texto);
      searchPokemon($(this).val(), searchControl);
    }
  });
});


