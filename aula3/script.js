$(document).ready(function(e) {
    $.getJSON("https://randomuser.me/api/?results=10&nat=br", function(data) {
        for (var i = 0; i < data.results.length; i++) {
            var out = "<tr>";
            out += "<td scope='row'>" + (parseInt(i)+1) + "</td>";
            out += "<td><!-- <img src='" + data.results[i].picture.thumbnail + "' /> --></td>";
            out += "<td>" + data.results[i].login.username + "</td>";
            out += "</tr>"

            $("table tbody").append(out);
        }
    });
});