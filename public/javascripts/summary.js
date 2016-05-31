$(document).ready(function() {
  var engine,  template, empty;

  $.support.cors = true;
  
  //pre-compile Handlebars templates
  template = Handlebars.compile($("#result-template").html());
  empty = Handlebars.compile($("#empty-template").html());

  engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'), //('name', 'screen_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    //dupDetector: function(a, b) { return a.id_str === b.id_str; },
    identify: function(o) { return o.team; }, //{ return o.id_str; },
    prefetch: '../data/nfl.json' //'../data/films/post_1960.json',
    // prefetch: $.map(country_list, function(item) {return {value: item};})
    //remote: 
    //{
    //  url: "s.php?s=%QUERY", //'../data/%QUERY.json' //'../data/films/queries/%QUERY.json',
    //  wildcard: '%QUERY'
    //}
    
  });

 
  
  // ensure default users are read on initialization
  engine.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears')
  //N.B. comment out the async requests when data is local; otherwise 'empty' template requires engine.remote
  function engineWithDefaults(q, sync) {    //engineWithDefaults(q, sync, async) {
    if (q === '') {
      sync(engine.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears'));
      //async([]);
    }

    else {  
      engine.search(q, sync); //engine.search(q, sync, async);
    }
  }

 
    
  $('#demo-input').typeahead(//null,
  {
    hint: $('.Typeahead-hint'),
    menu: $('.Typeahead-menu'),
    minLength: 0,
   
    classNames: {   
      open: 'is-open',
      empty: 'is-empty',
      cursor: 'is-active',
      suggestion: 'Typeahead-suggestion',
      selectable: 'Typeahead-selectable'
    }
    }, 
    {
    name: 'nfl-teams',
    source: engineWithDefaults,
    display: 'team', //screen_name',
    
    templates: {
     suggestion: template,
     empty: empty
     
    }
  })
  //.on('typeahead:asyncrequest', function() {
  //  $('.Typeahead-spinner').show();
  //})
  //.on('typeahead:asynccancel typeahead:asyncreceive', function() {
  //  $('.Typeahead-spinner').hide();
  //});
  .on('typeahead:render', function() {
    $('.Typeahead-spinner').show();
  })
  .on('typeahead:select', function() {
    $('.Typeahead-spinner').hide();
    console.log(this.value)
});
  
});