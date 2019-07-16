const css = 'optly-preview optly-close{color:#000;position:absolute;'+ 
            'right:-15px;top:-15px;height:40px;width:40px;font-size: 25px;'+ 
            'border-radius:100%;background-color:#fff;text-align:center;'+
            'border:3px solid #0f75b2;cursor:pointer;}'+
            'optly-ball{left:-35px;right:inherit;}';

/**
 * @desc optlyXHelper adds an "X" button to the optimizely X preview
 *  link module, allowing it to be closed by a non technical person.
 *
 *  optlyXHelper is named generically instead of addOptlyXPreviewCloseButton
 *  so that it can be added to as problems with optly x surface
 */
function optlyXHelper () {
  // close button
  const $optlyClose = $('<optly-close>X</optly-close>');
  // on dom ready add the close button and bind click listener
  $(function(){
    $('head').append('<style>' + css + '</style>');
    $('optly-ball').after($optlyClose);
    $optlyClose.click(function(){
      $(this).closest('optly-preview').remove();
    });
  });
}

export default optlyXHelper;