$(document).ready(function() {

  var engine = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: '../data/meta_Movies_and_TV_title.json'
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .typeahead').typeahead(null, {
  name: 'engine',
  source: engine
});
  
  //assign and print product name, after click away or return, 
  //N.B. May not be in the dataset!
  $('#product').on('blur keyup', function (e, ui) {
    if (e.type == 'blur' || e.keyCode == '13') {
      var productname = $('#product').val(); //e.target.value;
      
      $('#printproduct').html('Movie: ' + productname);
      $('#product').blur();
    }

  }).change();
  
  

  
});
