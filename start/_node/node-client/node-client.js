function NodeClient(url) {
    let me = this;
    me.server_url = url;

    me.nodeClient;

    var nodeClient = me.nodeClient = io.connect(me.server_url);

    nodeClient.on('msg', function(msg) {
        console.log('msg >>', msg);
        $(selector + ' .msg').html(msg.msg);
    });

    nodeClient.on('errorMsg', function(msg) {
        console.log('error >>', msg);
    });
    nodeClient.on('current_state', function(data) {
        var me = this;
        var url = new URL(window.location.href),
            user = url.searchParams.get("user");
        if('msgArr' in data){
            // if(data.msgArr.length = 0){
            //     $('#messages').html('');
            // }
            if(data.loadMsg && data.msgArr.length > 0){
                $('#messages').html('');
                for( var i in data.msgArr){
                    var adminClass = "msg_not_yours";
                    if(user == data.msgArr[i].user){
                        adminClass = "msg_yours";
                        $('#messages').append($('<li align="left" class = "'+adminClass+'">').text(data.msgArr[i].msg));
                    }
                    else{
                        $('#messages').append($('<li align="right" class = "'+adminClass+'">').text(data.msgArr[i].msg));
                        
                    }
                }
                window.scrollTo(0, document.body.scrollHeight);
                $('#m').val('');
            }
        }
        if('gameRound' in data){
            $('.'+data.gameRound).prop("checked", true);
        }
        if('currentRound' in data){
            var count = "<span>Round["+data.currentRound+"]<span>";
            if(data.currentRound>data.gameRound){
                count = "";
            }
            $('.roundCount').html(count);
        }
        $('.'+user+'_child_div').show();
        if (data.setUserName){
            if('userArr' in data){
                var userArr = data.userArr;
                if (Object.keys(userArr).length > 1 && !data.endGame) {
                    $('#startInfoCnt').hide();
                    $('#bodyCnt').show();
                    // timer(data.endTimer, "Ends In", me);
                }
                if (Object.keys(userArr).length > 0) {
                    for (var k in userArr){
                        if (userArr.hasOwnProperty(k)) {
                            $('.'+k+'-name').val(userArr[k]);
                        }
                    }
                }
            }
        }
        if('winnerCountArr' in data){
            if(data.winnerCountArr){
                for (var key in data.winnerCountArr){
                    if (data.winnerCountArr.hasOwnProperty(key)) {
                        var html = "<span style='font-size:20px;font-family: Arial Black;'>"+data.winnerCountArr[key]+"</span>";
                        $('.'+key+'-count-div').html(html);
                    }
                }
            }
        }
        if('endGame' in data){
            if(data.endGame){
                var winnerName ='';
                if (Object.keys(data.winnerCountArr).length > 0) {
                    var countArr = data.winnerCountArr;
                    if(countArr["user1"]>countArr["user2"]){
                        winnerName = "<span style='font-size:20px;color:#00ff00;font-family: Arial Black;'>"+$(".user1-name").val()+" WINS</span>";
                    }
                    else if(countArr["user1"]<countArr["user2"]){
                        winnerName = "<span style='font-size:20px;color:#00ff00;font-family: Arial Black;'>"+$(".user2-name").val()+" WINS</span>";
                    }
                    else{
                        winnerName = "<span style='font-size:20px;color:#f79f24;font-family: Arial Black;'>Tie!!!!!</span>";
                    }

                }
                var html = winnerName+"<br/><span><img src='/home_project/scissor_paper_rock/_include/img/GameOver.png' class='img-fluid'/></span>";
                $('#winner-div').html(html);
                $('#user1-selected-div').html('');
                $('#user2-selected-div').html('');
                $('#startInfoCnt').hide();
                $('#bodyCnt').show();
                return;
            }
        }
        if('declearWinner' in data){
            if(data.declearWinner){
                if (Object.keys(data.winnerArr).length > 0) {
                   
                    for (var k in data.winnerArr){
                        if (data.winnerArr.hasOwnProperty(k)) {
                            var name = $('.'+k+'-name').val();
                            var html = "<span style='font-size:20px; color:#00ff00;font-family: Arial Black;'> WINNER: "+name+"</span><br/><span style='font-size:20px'><img src='/home_project/scissor_paper_rock/_include/img/"+data.winnerArr[k]+".png' class='img-fluid'/></span>";
                            $('#winner-div').html(html);
                        }
                    }
                }
                else{
                    var html = "<span style='font-size:20px; color:#f79f24;font-family: Arial Black;'> Tie!!!</span><br/><span style='font-size:20px'><img src='/home_project/scissor_paper_rock/_include/img/Tie.png' class='img-fluid'/></span>";
                    $('#winner-div').html(html);
                }
                if (Object.keys(data.mainArr).length > 0) {
                    for (var k in data.mainArr){
                        if (data.mainArr.hasOwnProperty(k)) {
                            var name = $('.'+k+'-name').val();
                            var html = "<span style='font-size:20px;  color:#00ff00;font-family: Arial Black;'>"+name+" Choose: <img src='/home_project/scissor_paper_rock/_include/img/"+data.mainArr[k]+".png' class='img-fluid'/></span>";
                            // "+data.mainArr[k]+"</span>";
                            $('#'+k+'-selected-div').html(html);
                        }
                    }
                }
            }
            else{
                if (Object.keys(data.mainArr).length > 0) {
                    for (var k in data.mainArr){
                        if (data.mainArr.hasOwnProperty(k)) {
                            var html = "<span><img src='/home_project/scissor_paper_rock/_include/img/spinner.gif' class='img-fluid'/></span>";
                            if(k==user){
                                var name = $('.'+k+'-name').val();
                                html = "<span style='font-size:20px; color:#00ff00;font-family: Arial Black;'>"+name+" Choose:<img src='/home_project/scissor_paper_rock/_include/img/"+data.mainArr[k]+".png' class='img-fluid'/></span>";

                            }
                            $('#'+k+'-selected-div').html(html);
                        }
                    }
                }
                else{
                    var html = "<span><img src='/home_project/scissor_paper_rock/_include/img/spinner.gif' class='img-fluid'/></span>";
                    $('#user1-selected-div').html(html);
                    $('#user2-selected-div').html(html);
                    $('#winner-div').html(html);
                }
            }
        }
        
    });
    // nodeClient.on('chatMessage', function(msg) {
    //     $('#messages').append($('<li>').text(msg));
    //     window.scrollTo(0, document.body.scrollHeight);
    //     $('#m').val('');
    // });
    nodeClient.on('userError', function(msg) {
        var imgHtml = "<span style='font-size:20px'>"+msg+"</span>";
        $('#winner-div').html(imgHtml);
        console.log('error >>', msg);
    });
    me.client_event = new Event(me);
}
function timer(timer, msg, me){
    $('.countdown_msg').html(msg);
    var timer = new Date().getTime() + parseInt(timer + '000');
    $('.countdown').countdown(timer, function(event){
        $(this).html(event.strftime("<span style='font-size:20px'>%H:%M:%S</span>"));
    });
}