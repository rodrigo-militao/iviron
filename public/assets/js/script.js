$(document).ready(() => {

  $(".button-tab").on("click", function() {
    const targetId = $(this).attr("target")
    tabination(targetId)
  })

  $("#data").text(new Date().toLocaleDateString())

  clockUpdate();
  setInterval(clockUpdate, 1000);

  $.getJSON(JSON_CONFIG_FILE, function(config) {
    tag = config.tag
    localizacao = config.localizacao
    cliente = config.cliente
  }).then(() => {
    $("#cliente").text(cliente)
    $("#localizacao").text(localizacao)
    $("#tag").text(tag)
  })
})


function tabination(targetId) {
  $(".tab-page").each(function() {
    const tabId = $(this).attr("id")
    $(this).css("display", "none")
    if (tabId == targetId) {
      $(this).css("display", "block")
    }
  });
}


function clockUpdate() {
  var date = new Date();
  function addZero(x) {
    let value;
    value = x < 10 ? "0" + x : x
    return value
  }

  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  $('#hora').text(h + ':' + m + ':' + s)
}

const difference_between_dates_in_seconds = (saiu, entrou) => moment(saiu).diff(moment(entrou), 'seconds')
const difference_between_dates_in_minutes = (saiu, entrou) => moment(saiu).diff(moment(entrou), 'minutes')
