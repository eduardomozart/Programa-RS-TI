$(document).ready(function() {
    $.getJSON("https://randomuser.me/api/?results=25&nat=br", function(data) {
        $('table').dataTable( {
            "aaData": data.results,
            "bProcessing": true,
            "columns": [
                { data: null,
                    render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1; // Calcula o número da linha
                    }
                },
                { data: "picture.thumbnail", 
                    render: function (data) {
                        return '<img src="' + data + '" class="avatar" width="48" height="48" onerror="loadImgAsBase64(this)" />';
                    }
                },
                { data: "login.username" },
                { data: "name.first" },
                { data: "name.last" },
                { data: "gender" },
                { data: "email" },
                { data: "phone" },
                { data: null,
                    render: function (data) {
                        return data.location.street.name + ", " + data.location.street.number;
                    }
                },
                { data: "location.city" },
                { data: "location.state" },
                { data: "location.country" }
            ]
        });

        /* for (var i = 0; i < data.results.length; i++) {
            var user = data.results[i];
            var out = "<tr>";
            out += "<td scope='row'>" + (i + 1) + "</td>";
            out += "<td><img id='img" + i + "' src='" + data.results[i].picture.thumbnail + "' /></td>";
            out += "<td>" + user.login.username + "</td>";
            out += "<td>" + user.name.first + "</td>";
            out += "<td>" + user.name.last + "</td>";
            out += "<td>" + user.gender + "</td>"; // Adicionando gênero
            out += "<td>" + user.email + "</td>";
            out += "<td class='text-nowrap'>" + user.phone + "</td>";
            out += "<td>" + $.trim(user.location.street.name) + ", " + user.location.street.number + "</td>";
            out += "<td>" + user.location.city + "</td>";
            out += "<td>" + user.location.state + "</td>";
            out += "<td>" + user.location.country + "</td>";
            out += "</tr>";
            
            $("table tbody").append(out);

            $("#img" + i).on("error", function () {
                loadImgAsBase64($(this).attr("src"), (dataURL) => {
                    $(this).attr("src", dataURL);
                });
            });
        } */
    });
});

function loadImgAsBase64(el) {
    let canvas = document.createElement('canvas');
    let img = document.createElement('img');
    img.setAttribute('crossorigin', 'anonymous');
    img.src = 'https://corsproxy.io/?' + el.src;
    
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('image/png');
        canvas = null;
        el.src = dataURL;
    };
}