function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function dropelement1(ev) {
  ev.preventDefault();
  document.getElementById('file').innerHTML = 'File Added';
}

function dropelement2(ev) {
  ev.preventDefault();
  document.getElementById('transform').innerHTML = 'Transformed';
}

function dropelement3(ev) {
  ev.preventDefault();
  document.getElementById('output').innerHTML = 'Table Created';
}
function droptable1(ev) {
  ev.preventDefault();
  document.getElementById('table1').innerHTML = 'customers';
}
function droptable2(ev) {
  ev.preventDefault();
  document.getElementById('table2').innerHTML = 'orders';
}

$(document).ready(function () {
    $('#info_btn').click(function () {
        $.ajax({
            url: "sql",
            dataType: "text",
            success: function (output_data) {
                var obj = JSON.parse(output_data);
                var data = Object.keys(obj);
                var data_values = Object.values(obj);
                console.log(output_data);
                console.log(data);

                var database = '<div>';
                for(var database_count = 0; database_count < 4; database_count++)
                {
                    database += '<div class="dropdown">';
                    database += '<button class="btn btn-secondary dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + data[database_count] + '  </button>' ;
                    database += '<div class="dropdown-menu" >';

                    for(var table_count = 0; table_count < data_values[database_count].length; table_count++ )
                    {
                        console.log(data_values[database_count][table_count]);
                        database += '<a class="dropdown-item" href="#" >'+ data_values[database_count][table_count] +'</a>';

                    }
                    database += '</div>';
                    database += '</div>';

                }
                database +='</div>';

                $('#database').html(database);
            }
        })
    })
});

$(document).ready(function () {
    $('#load_data').click(function () {
        $.ajax({
            url: "loadfile",
            dataType: "text",
            success: function (data) {

                var data_table = data.split(/\r?\n?\r/);
                console.log(data);

                var table_data = '<table class="table table-striped">';
                for(var count = 0; count < data_table.length; count++)
                {

                    var cell_data = data_table[count].split(",");
                    table_data += '<tr>';
                    for(var cell_count = 0; cell_count< cell_data.length; cell_count++)
                    {
                        if(count === 0)
                        {
                            table_data += '<th>' + cell_data[cell_count] +'</th>';
                        }
                        else
                        {
                            table_data += '<td>' + cell_data[cell_count] + '</td>';
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $('#data_table').html(table_data);
            }

        })
    })
});

function myFunction() {
  var x = document.getElementById("shdiv");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function sqlFunction() {
  var x = document.getElementById("sqldiv");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}








