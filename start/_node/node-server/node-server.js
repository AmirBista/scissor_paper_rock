//node server
module.exports = function(io) {
    let gameRound = 1;
    let currentRound = 0;
    let mainArr = {};
    let endGame = false;
    let declearWinner = false;
    let setWinnerCount = false;
    let setUserName = false;
    let username = '';
    let winnerArr = {};
    let userArr = {};
    let winnerCountArr = {};
    let user1WinningCount = 0;
    let user2WinningCount = 0;
    let endTimer = -1;
    let msgArr = [];
    let loadMsg = false;
    var sendCurrentState = function(socket) {
        var current_state = {
            'gameRound': gameRound,
            'currentRound': currentRound,
            'endGame': endGame,
            'mainArr': mainArr,
            'winnerArr' : winnerArr,
            'declearWinner': declearWinner,
            'setWinnerCount': setWinnerCount,
            'winnerCountArr': winnerCountArr,
            'username'  : username,
            'setUserName'  : setUserName,
            'loadMsg'  : loadMsg,
            'userArr'  : userArr,
            'msgArr'  : msgArr,
            'endTimer'  : endTimer
            };
        if(setUserName){
            setUserName = false;
        }
        if(loadMsg){
            loadMsg = false;
        }
        socket.emit('current_state', current_state);
    };
    var checkData = function() {
        if (Object.keys(mainArr).length > 1) {
            declearWinner = true;
            if (mainArr['user1'] === "Paper") {
                if (mainArr['user2'] === "Rock") {
                    winnerArr['user1'] = "Paper";
                    console.log('Winner Decleared >>', "paper wins [user1]");
                    return ;
                } 
                else if (mainArr['user2'] === "Scissors") {
                    winnerArr['user2'] = "Scissors";
                    console.log('Winner Decleared >>',"scissors wins [user2]");
                    return ;
                }
            }
            else if (mainArr['user1'] === "Scissors") {
                if (mainArr['user2'] === "Rock") {
                    winnerArr['user2'] = "Rock";
                    console.log('Winner Decleared >>',"rock wins [user2]");
                    return ;
                } 
                else if (mainArr['user2'] === "Paper") {
                    winnerArr['user1'] = "Scissors";
                    console.log('Winner Decleared >>', "scissors wins [user1]");
                    return;
                }
            }
            else if (mainArr['user1'] === "Rock") {
                if (mainArr['user2'] === "Scissors") {
                    winnerArr['user1'] = "Rock";
                    console.log('Winner Decleared >>',  "rock wins [user1]");
                    return;
                } 
                else if (mainArr['user2'] === "Paper") {
                    winnerArr['user2'] = "Paper";
                    console.log('Winner Decleared >>',  "paper wins [user2]");
                    return;
                }
            }
            console.log('Winner Decleared >>', "Tie!!!");
            return ;
        }
        return;

    };
    var timerFunc = function() {
        sendCurrentState(io);
    };
    var auction_main_timer = setInterval(function() {
        //runs in every 1 second
        if(currentRound > gameRound){
            endGame = true;
        }
        timerFunc();
    }, 1000);
    var delayNextRoundStart = function(t) {
        return new Promise(function(resolve) { 
          setTimeout(resolve, t)
        });
    }
    io.on('connection', function(socket) {
        setUserName = true;
        loadMsg = true;
        console.log('Client Connected');
        socket.on('close', function() {
            // delete socketsArr[socketId];
        });
        socket.on('onTdClick', function(newValue, user, name) {
            username = user;
            if (user in mainArr) {
                socket.emit('userError', "Already Seleted....");
            } else {
                mainArr[user] = newValue;
                checkData();
                if(declearWinner){
                    setWinnerCount = true;
                    if (Object.keys(winnerArr).length > 0) {
                        for (var k in winnerArr){
                            if (winnerArr.hasOwnProperty(k)) {
                                if(k == "user1"){
                                    user1WinningCount++;
                                }
                                else if(k == "user2"){
                                    user2WinningCount++;
                                }
                            }
                            winnerCountArr['user1'] = user1WinningCount;
                            winnerCountArr['user2'] = user2WinningCount;
                        }
                    }
                    delayNextRoundStart(5 * 1000).then(function(){
                        declearWinner = false;
                        winnerArr = {};
                        mainArr = {};
                        console.log('Next Round Start Delay Timer Is Finished.');
                    });
                    currentRound++;
                }
                sendCurrentState(io);
            }
        });
        socket.on('addUserToUserArr', function(name, user) {
            // if (user in userArr) {
            //     // console.log('userError >>', Error);
            // } else {
            //     userArr[user] = name;
            // }
            userArr[user] = name;
            setUserName = true;
            if (Object.keys(userArr).length > 1) {
                endTimer = 180;
                currentRound = 1;
            }
        });
        socket.on('setRoundValue', function(round) {
            gameRound = round;
        });
        socket.on('clearMsg', function() {
            loadMsg = true;
            msgArr = [];
        });
        socket.on('restartGame', function() {
            gameRound = 1;
            currentRound = 0;
            mainArr = {};
            endGame = false;
            declearWinner = false;
            setWinnerCount = false;
            setUserName = false;
            loadMsg = true;
            username = '';
            winnerArr = {};
            userArr = {};
            winnerCountArr = {};
            msgArr = [];
            user1WinningCount = 0;
            user2WinningCount = 0;
            endTimer = -1;
        });
        socket.on('userError', function(Msg) {
            socket.emit('userError', Msg);
        });
        socket.on('appendChat', function(Msg,user) {
            loadMsg = true;
            var arr = {};
            arr['user'] = user;
            arr['msg'] = Msg;
            msgArr.push(arr);
            // socket.emit('chatMessage',Msg);
        });

    });

};