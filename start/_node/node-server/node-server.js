//node server
module.exports = function(io) {
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
    var sendCurrentState = function(socket) {
        var current_state = {
            'endGame': endGame,
            'mainArr': mainArr,
            'winnerArr' : winnerArr,
            'declearWinner': declearWinner,
            'setWinnerCount': setWinnerCount,
            'winnerCountArr': winnerCountArr,
            'username'  : username,
            'setUserName'  : setUserName,
            'userArr'  : userArr,
            'endTimer'  : endTimer
            };
        if(setUserName){
            setUserName = false;
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
        if(endTimer == 0){
            endGame = true;
        }
        else if(endTimer > -1){
            endTimer = endTimer-1;
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
                            delayNextRoundStart(5 * 1000).then(function(){
                                declearWinner = false;
                                winnerArr = {};
                                mainArr = {};
                                console.log('Next Round Start Delay Timer Is Finished.');
                            });
                        }
                    }
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
                endTimer = 30;
            }
        });
        socket.on('userError', function(Msg) {
            socket.emit('userError', Msg);
        });

    });

};