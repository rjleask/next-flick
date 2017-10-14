var bootstrap_alert = function() {};
bootstrap_alert.warning = function(message) {
  $('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')
}
$("#submit").on('click', function(e) {
  e.preventDefault();
 // check if all inputs have been selected
  if ($("input[type=radio]:checked").length < 4) {
    bootstrap_alert.warning('Please answer all questions!');
  } else {
    $("#alert_placeholder").hide();
    var actionChecked = $('input[name=optionsAction]:checked').val();
    var comedyChecked = $('input[name=optionsComedy]:checked').val();
    var horrorChecked = $('input[name=optionsHorror]:checked').val();
    var dramaChecked = $('input[name=optionsDrama]:checked').val();
    var checkedInput = {
      action: actionChecked,
      comedy: comedyChecked,
      horror: horrorChecked,
      drama: dramaChecked
    }
    // make cookies for user
    var actionCookie = $.cookie("settingsAct", checkedInput.action);
    var comedyCookie = $.cookie("settingsCom", checkedInput.comedy);
    var horrorCookie = $.cookie("settingsHor", checkedInput.horror);
    var dramaCookie = $.cookie("settingsDra", checkedInput.drama);
    $.post("/api/settings", checkedInput).done(function() {
      // window.location = "/";
      console.log(checkedInput);
    })
  }
});