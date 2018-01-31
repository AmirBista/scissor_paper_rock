function Event(client) {
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



