var HtmlNode = document.getElementById('datos');

function cargarDatos() {

    $.ajax({
        type: 'GET',
        url: 'https://api.tvmaze.com/shows',
        /*datos a enviar*/
        data: {},
        /*recibir el callback*/
        success: function(data) {
            data.forEach(function(val, i) {
                //cargara elementos en una lista
                HtmlNode.innerHTML = HtmlNode.innerHTML + '<li>' + val.name + '</li>';
                console.log(val.name);
            });
            //probar si trae la data.
            console.log('data', data);
        }
    });
}
//llamar la función para que  carge los datos
cargarDatos();