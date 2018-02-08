function Event(client) {
    $('#btnShowMsgCnt').click(function(event) {
	    client.nodeClient.emit('showHideMsg');
    });
    $('.btnSend').click(function(event){
    	var msg = $('#m').val();
    	if(msg){
			client.nodeClient.emit('appendChat',msg, client.user);
		}
    });
    $('#m').unbind().keypress(function(event) {
	    if ( event.key == "Enter"){
	    	var msg = this.value;
	    	if(msg){
			  	client.nodeClient.emit('appendChat',msg, client.user);
	    	}
		}
    });
    $('#btnRestart').click(function(event) {
	    client.nodeClient.emit('restartGame');
	    location.reload(true);
    });
    $('#btnClearMsg').click(function(event) {
	    client.nodeClient.emit('clearMsg');
	    location.reload(true);
    });
    $('input:radio[name="round"]').click(function(event) {
    	var round = this.value;
	    client.nodeClient.emit('setRoundValue',round);
    });
    $('.username').unbind().keypress(function(event) {
		var name = this.value;
	    if ( event.key == "Enter"){
		    client.nodeClient.emit('addUserToUserArr',name, client.user);
		}
    });
    $('.user1-name').unbind().keypress(function(event) {
		var name = this.value;
		if(client.user == 'user1'){
		    if ( event.key == "Enter"){
			    client.nodeClient.emit('addUserToUserArr',name, client.user);
		    }
		}
		else{
			client.nodeClient.emit('userError', 'You Cannot Set Others Name....');
		}
	    	
	});
	$('.user2-name').unbind().keypress(function(event) {
		var name = this.value;
	    if(client.user == 'user2'){
		    if ( event.key == "Enter"){
			    client.nodeClient.emit('addUserToUserArr',name, client.user);
		    }
		}
		else{
			client.nodeClient.emit('userError', 'You Cannot Set Others Name....');
		}

    });
	$('.user1 td').click(function(event) {
		if(client.user == 'user1'){
		    var clsName = this.className;
		    onTdClick(clsName, client);
		}
		else{
			client.nodeClient.emit('userError', 'You Cannot Choose Others....');
		}
	});
	$('.user2 td').click(function(event) {
		if(client.user == 'user2'){
			var clsName = this.className;
		    onTdClick(clsName, client);
		}
		else{
			client.nodeClient.emit('userError', 'You Cannot Choose Others....');
		}
	});
};
function onTdClick(clsName, client) {
    client.nodeClient.emit('onTdClick',clsName, client.user, client.name);

}



