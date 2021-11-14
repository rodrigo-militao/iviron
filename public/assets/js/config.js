$(document).ready(() => {

  let tag, localizacao, cliente, ocupacao
  $.getJSON(JSON_CONFIG_FILE, function(config) {
      tag = config.tag
      localizacao = config.localizacao
      cliente = config.cliente
      ocupacao = config.ocupacao
    }).then(() => {

      $("#config_cliente").val(cliente)
      $("#config_localizacao").val(localizacao)
      $("#config_tag").val(tag)
      $("#config_ocupacao").val(ocupacao)
      $("#ocupacao_limite").text(ocupacao)

    })

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