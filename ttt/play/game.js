
var data =  {
    "grid" : ["", "", "", "", "", "", "", "", ""],
    "winner" : ""
};

var usr = 'X';
var ai = 'O';

function regClick(tag) {
    var id = parseInt(tag);
    var cur = $('#'+id);
    //cur.attr("disabled", "disabled");
    cur.removeAttr('onClick');
    console.log("Start of regClick: " + JSON.stringify(data.grid));
    if ( cur.html()===""){
        data.grid[id] = usr;
        cur.html(usr);
        console.log("Before calling send: " + JSON.stringify(data));
        send();
    }
}

function send() {
    $.ajax({
        type: "POST",
        url: "/ttt/play",
        data: data,
        success: function (jsonData) {
            console.log("Received data: " + JSON.stringify(jsonData));
            var grid = jsonData.grid;

            for( var i=0; i<9; i++) {
                if (grid[i] === ai) {
                    data.grid[i] = ai;
                    var cur = $('#' + i);
                    cur.html(ai);
                }
            }
            if(jsonData.winner !== ""){
                $("#board").find("*").removeAttr("onClick");
                var win = $("#Win");
                win.append(jsonData.winner + " WON!!!!!!");
            }
        }
    });
}

/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
