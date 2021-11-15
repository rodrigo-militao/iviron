$(document).ready(() => {
  $("#config_save").on('click', function() {
    const data = [
      {path: 'cliente', value: $("#config_cliente").val() },
      {path: 'localizacao', value: $("#config_localizacao").val() },
      {path: 'tag', value: $("#config_tag").val() },
      {path: 'ocupacao', value: $("#config_ocupacao").val() },
    ]

    set_config(data)

    $("#cliente").text($("#config_cliente").val())
    $("#localizacao").text($("#config_localizacao").val())
    $("#tag").text($("#config_tag").val())
    $("#ocupacao_limite").text($("#config_ocupacao").val())
  })
})