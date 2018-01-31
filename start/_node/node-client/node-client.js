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
        if (data.setUserName){
            if('userArr' in data){
                var userArr = data.userArr;
                if (Object.keys(userArr).length > 1 && !data.endGame) {
                    timer(data.endTimer, "Ends In", me);
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
                        var html = "<span>"+data.winnerCountArr[key]+"</span>";
                        $('.'+key+'-count-div').html(html);
                    }
                }
            }
        }
        if('endGame' in data){
            if(data.endGame){
                var html = "<span><img src='/mi_node_project/Project-A/_include/img/GameOver.png' class='img-fluid'/></span>";
                $('#winner-div').html(html);
                $('#user1-selected-div').html('');
                $('#user2-selected-div').html('');
                return;
            }
        }
        if('declearWinner' in data){
            if(data.declearWinner){
                if (Object.keys(data.winnerArr).length > 0) {
                   
                    for (var k in data.winnerArr){
                        if (data.winnerArr.hasOwnProperty(k)) {
                            var html = "<span> WINNER: "+k+"</span><span> He Choose: "+data.winnerArr[k]+"</span>";
                            $('#winner-div').html(html);
                        }
                    }
                }
                else{
                    var html = "<span> Tie!!!</span><span> You Choose:<img src='/mi_node_project/Project-A/_include/img/Tie.png' class='img-fluid'/></span>";
                    $('#winner-div').html(html);
                }
                if (Object.keys(data.mainArr).length > 0) {
                    for (var k in data.mainArr){
                        if (data.mainArr.hasOwnProperty(k)) {
                            var html = "<span> "+k+"</span><span> You Choose: <img src='/mi_node_project/Project-A/_include/img/"+data.mainArr[k]+".png' class='img-fluid'/></span>";
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
                            var html = "<span><img src='/mi_node_project/Project-A/_include/img/PleaseWait.png' class='img-fluid'/></span>";
                            if(k==user){
                                html = "<span> "+k+"</span><span> You Choose:<img src='/mi_node_project/Project-A/_include/img/"+data.mainArr[k]+".png' class='img-fluid'/></span>";

                            }
                            $('#'+k+'-selected-div').html(html);
                        }
                    }
                }
                else{
                    var html = "<span><img src='/mi_node_project/Project-A/_include/img/PleaseWait.png' class='img-fluid'/></span>";
                    $('#user1-selected-div').html(html);
                    $('#user2-selected-div').html(html);
                    $('#winner-div').html(html);
                }
            }
        }
        
    });
    nodeClient.on('userError', function(msg) {
        var imgHtml = "<span>"+msg+"</span>";
        $('#winner-div').html(imgHtml);
        console.log('error >>', msg);
    });
    me.client_event = new Event(me);
}
function timer(timer, msg, me){
    $('.countdown_msg').html(msg);
    var timer = new Date().getTime() + parseInt(timer + '000');
    $('.countdown').countdown(timer, function(event){
        $(this).html(event.strftime('<span>%H:%M:%S</span>'));
    });
}