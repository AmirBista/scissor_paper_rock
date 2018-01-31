$(function($) {
	var baseUrl ='http://192.168.1.7:8088/';
	// var baseUrl ='http://192.168.1.122:8088/';
	var client = {};
	var client_event = {};
	var url = new URL(window.location.href);
	var user = url.searchParams.get("user");
	var name = url.searchParams.get("name");
	client = new NodeClient(baseUrl);
	client.user = user;
	client.name = name;
});