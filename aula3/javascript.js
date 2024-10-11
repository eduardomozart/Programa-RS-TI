$(document).ready(function() {
    $('table').DataTable({    
        serverSide: true,
        ajax: {
          url: "https://randomuser.me/api/1.4/",
          data: function(){
             // console.log(d);

             var api = $('table').DataTable();
     
             // Get paging information
             var info = api.page.info();
     
             // Update URL
             // Send page number as a parameter
             api.ajax.url(
                "https://randomuser.me/api/1.4/?page=" + (info.page + 1) + "&results=10"
             );

             // https://datatables.net/forums/discussion/41210/how-to-get-recordstotal-from-response-header
             return $.extend({}, "", {
                // "page": pageIndex,
                // "size": pageSize,
                // "sort": sort,
                // "search": searchValue
             });
          },
          dataFilter: function(data) {
            // Parse the returned API data and modify it the way datatable needs.
            var json = jQuery.parseJSON( data ); 
            json.data = json.results;
            
            // console.log(json);
            return JSON.stringify( json ); // return JSON string
          },
        },
        language: {
            url: "https://cdn.datatables.net/plug-ins/2.1.8/i18n/pt-BR.json"
        },
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

    $('table').on('xhr.dt', function (e, settings, json, xhr) {
        // console.log(json);
        json.recordsTotal = json.recordsFiltered = 1000;
        // Note no return - manipulate the data directly in the JSON object.
    })

    /* $.getJSON("", function(data) {
        $('table').dataTable( {
            serverSide: true,
            ajax: {
                url: '&nat=br',
                dataFilter: function(data){
                    var json = jQuery.parseJSON( data );
                    json.recordsTotal = json.total;
                    json.recordsFiltered = json.total;
                    json.data = json.list;
        
                    return JSON.stringify( json ); // return JSON string
                }
            }


                "aaData": data.results,
                "bProcessing": true,
                
                
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
    // });
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