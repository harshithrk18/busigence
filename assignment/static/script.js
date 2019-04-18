function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  var target_id = ev.target.getAttribute('id');
  console.log(target_id);
  document.getElementById(target_id).innerHTML = data;

}

function dropelement1(ev) {
  ev.preventDefault();
  document.getElementById('file').innerHTML = 'File Added';
}

function dropelement2(ev) {
  ev.preventDefault();
  document.getElementById('csvtransform').innerHTML = 'Transformed';
}

function dropelement3(ev) {
  ev.preventDefault();
  document.getElementById('csvoutput').innerHTML = 'Table Created';
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
                // console.log(output_data);
                // console.log(data);

                var database = '<div style="margin-top:20px">';
                for(var database_count = 0; database_count < 4; database_count++)
                {
                    database += '<div class="dropdown" style="margin: 3px">';
                    database += '<button class="btn btn-secondary dropdown-toggle" style="width:250px;" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + '<span class="pull-left">' + data[database_count] + '</span>' +'</button>' ;
                    database += '<div class="dropdown-menu" >';

                    for(var table_count = 0; table_count < data_values[database_count].length; table_count++ )
                    {
                        // console.log(data_values[database_count][table_count]);
                        database += '<li class="dropdown-item" id="'+ data_values[database_count][table_count] +'" draggable="true" ondragstart="drag(event)">'+ data_values[database_count][table_count] +'</li>';

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
// $(document).ready(function () {
//     $('#csvsubmit').click(function () {
//         var path = $('#csvvalue').val()
//         $('#csvpath').html(path);
//         $.ajax({
//             type: "POST",
//             url: "upload",
//             data: "file",
//             success: function () {
//                 alert('success');
//             }
//         })
//
//
//     })
// });
$(document).ready(function () {
    $('#info_btn').click(function () {
        $.ajax({
            url: "sqlcd",
            dataType: "text",
            success: function (column_name) {
                var obj = JSON.parse(column_name);
                var list1 = '';
                var list2 = '';
                for(var j=0; j<obj.length; j++){

                    for (var i = 0; i< obj[j].length; i++){
                        if (j===0){
                            list1 += '<option value="'+ obj[j][i] +'">' + obj[j][i] + '</option>';
                        }
                        else {
                            list2 += '<option value="'+ obj[j][i] +'">' + obj[j][i] + '</option>';
                        }


                    }


                }
                var list3 = list1 + list2 ;
                $('#joinlist1').html(list1);
                $('#joinlist2').html(list2);
                $('#transformlist2').html(list3);

            }
        })
    })
});
// $(document).ready(function () {
//     var value = new FormData();
//     $('#joinbtn').click(function () {
//         // var jval = $('#joinlist1').val();
//         // var pk = new FormData();
//         value.append($('#joinlist1').val().toString(),$('#joinlist1').val());
//         value.append($('#joinlist2').val().toString(),$('#joinlist2').val());
//         for (var key of pk.entries()) {
//         console.log(key[0] + ', ' + key[1]);
//         });
//     $('#transformbtn').click(function () {
//         var transformation = new FormData();
//         transformation.append($('#transformlist1').val().toString(),$('#transformlist1').val());
//         transformation.append($('#transformlist2').val().toString(),$('#transformlist2').val());
//
//     });
//     for (var key of value.entries()) {
//         console.log(key[0] + ', ' + key[1]);
//     }
// });
//

// $(document).ready(function () {
//     var $myform = $('#csvform');
//     $myform.submit(function (event) {
//         event.preventDefault();
        // var data = new FormData(document.getElementById('csvform'));
        // data.append("file",document.getElementById('file'));
        // console.log(document.getElementById('csvvalue'));
        // $.ajax({
        //     type: "POST",
        //     url: $myform.attr('action'),
        //     contentType: false,
        //     data: new FormData($myform[1]),
        //     processData:false,
        //     cache: false,
        //     success: function () {
        //         alert('success');
        //     }
        // });
//     });
// });


//
// $(document).ready(function () {
//     $('#csvsubmit').submit(function () {
//         event.preventDefault();
//         var data = new FormData();
//         data.append("file", document.getElementById('csvvalue').files[0]);
//         console.log(document.getElementById('csvvalue').files[0]);
        //
        // $.ajax({
        //     type: "POST",
        //     url: "upload",
        //     contentType: false,
        //     data: data,
        //     success: function () {
        //         alert('success');
        //     }
        // });
        // return false;
//     });
// });
$(document).ready(function () {
    $('#csvsubmit').click(function (event) {
        event.preventDefault();
        var path = $('#csvvalue').val();
        var p = '<div class="alert alert-info">' + path + '</div>';
        $('#csvpath').html(p)
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
$(document).ready(function () {
    $('#table_load').click(function () {
        console.log('button clicked');
        $.ajax({
            url: "join",
            dataType: "text",
            success: function (data) {

                var data_table = JSON.parse(data);
                console.log(data_table);
                var table_data = '<table class="table table-striped">';
                for(var count = 0; count < data_table.length; count++)
                {
                    console.log(data_table[count]);
                    var cell_data = data_table[count]

                    table_data += '<tr>';
                    for(var cell_count = 0; cell_count< cell_data.length; cell_count++)
                    {
                        table_data += '<td>' + cell_data[cell_count] +'</td>';

                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $('#show_table').html(table_data);
            }

        })
    })
});
function myFunction() {
  var x = document.getElementById("shdiv");

  if (x.style.display === "block") {
    x.style.display = "none";
    // document.getElementById("csvnav").className = "nav-link";
    // console.log(document.getElementById("csvnav").className)
  } else {
    x.style.display = "block";
    // document.getElementById("csvnav").className += " active";

  }
    document.getElementById("csvnav").className += " active";

}

function sqlFunction() {
  var x = document.getElementById("sqldiv");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  document.getElementById("sqlnav").className += " active";
}
//
function csvvisualizer() {
  var x = document.getElementById("csv_visualizer");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function sqlvisualizer() {
  var x = document.getElementById("sql_visualizer");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function joinblock() {
    console.log('clicked');
  var x = document.getElementById("joinblock");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function slidediv() {
    var move = document.getElementById("content");
    var table = document.getElementById("table");
    if (move.style.width === "0px"){
        move.style.width = "400px";
        table.style.display = "block";
    }
    else {
        move.style.width = "0px";
        table.style.display = "none";


    }
}


