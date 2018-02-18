var express = require('express');
var router = express.Router();

msg ="";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var date = Date();
    console.log("Hi");
    res.render('index', {
        msg: "Hello " + name + ", Today is " + date
    })
});

router.post('/play', function (req, res, next) {
    var jsonBody = (req.body);
    res.send(aiMove(jsonBody));
});

function aiMove(body) {
    var grid = body.grid;
    if(checkWin(body)){
        body.winner = "X";
        console.log("Before AI move: " + JSON.stringify(body));
        return body;
    }
    for( var i=0; i<9; i++){
        if(grid[i]===""){
            grid[i] = "O";
            console.log("Ai move: " + grid);
            break;
        }
    }

    console.log("Before check win: " + JSON.stringify(body, null));
    if(checkWin(body)){
        body.winner = "O";
    }
    console.log("After AI move: " + JSON.stringify(body, null));
    return body;
}

function checkWin(data) {
    function checkRow() {
        for(var i = 0; i< 7; i+=3){
            if(data.grid[i] === data.grid[i+1] && data.grid[i] === data.grid[i+2] && data.grid[i] !== ""){
                return true;
            }
        }
        return false;
    }

    function checkColumn() {
        for(var i = 0; i< 3; i++){
            if(data.grid[i] === data.grid[i+3] && data.grid[i] === data.grid[i+6] && data.grid[i] !== ""){
                return true;
            }
        }
        return false;
    }

    function checkDiag() {
        return (data.grid[0] === data.grid[4] && data.grid[0] === data.grid[8] && data.grid[0] !== "") === true
            || (data.grid[2] === data.grid[4] && data.grid[2]  === data.grid[6] && data.grid[2] !== "") === true;

    }

    return checkRow() === true || checkColumn() === true || checkDiag() === true;
}

module.exports = router;
