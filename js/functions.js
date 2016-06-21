var name = "";
var type= [];
var weight="";

$.ajax({
   url: 'http://pokeapi.co/api/v2/pokemon/48/',
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

     console.log(data.types);
     $('.namePokemon').text(name);
     $('.types').each([0]);
     $('.weight').text(weight);
   },
   type: 'GET'

});






