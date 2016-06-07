$(document).ready(function() {
  var summary_list, engine,  suggestion_template, empty_template, summary_template;

  $.support.cors = true;
  
  //pre-compile Handlebars templates
  suggestion_template = Handlebars.compile($("#result-template").html());
  empty_template = Handlebars.compile($("#empty-template").html());
  summary_template = Handlebars.compile($("#summary-template").html());
  //data source
  summary_list = '../data/movies_id.json'; //'../data/summaries_short.json';
  //'../data/tr_reviews_summary_sentence_v14.8a_v14.8.json';  
  
  //var context = {title: "Start", summary: "My New Post"};
  //console.log(context.title);
  //var myhtml    = summary_nonneg_template(context);    
  //$(myhtml).appendTo('#summary');
  
  engine = new Bloodhound({
    initialize: true, //if false, need engine.initialize() later
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'), //,'avg_rating','summary_nonneg','summary_nonpos'), //('name', 'screen_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    //dupDetector: function(a, b) { return a.id_str === b.id_str; },
    identify: function(o) { return o.title; }, //{ return o.id_str; },
    prefetch: summary_list //'../data/films/post_1960.json'
    //transform: function(response) {
     //   return response.summary_nonneg;
    //  },
    //prefetch: $.map(summary_list, function(obj) { 
     //       return { title : obj.title, eg: obj.summary_nonneg}; }) 
    // prefetch: $.map(country_list, function(item) {return {value: item};})
    
  });

 
  // ensure defaults are read on initialization
  //engine.get("Rudolph the Red Nosed Reindeer", "The Passion of the Christ", "Visual Bible: The Book of Matthew [VHS]")
  function engineWithDefaults(q, sync) {
    if (q === '') {
      sync(engine.get("Rudolph the Red Nosed Reindeer", "The Passion of the Christ", "Visual Bible: The Book of Matthew [VHS]"));
      //async([]);
    }

    else {  
      engine.search(q, sync); 
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
    name: 'summaries',
    source: engineWithDefaults,
    displayKey: 'title', //screen_name',
    
    templates: {
     suggestion:  suggestion_template, //function (data) {console.log(data);}, 
     empty: empty_template,
    }
  })
  
  .on('typeahead:render', function() {
    $('.Typeahead-spinner').show();
  })
  .on('typeahead:select', function(e, record){            
    $('.Typeahead-spinner').hide();
    //console.log(record.title);
    //console.log(record.summary_nonneg);
    $("#summary").html( $(summary_template(record)))
});
 

});