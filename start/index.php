<?php
$localhost = 'http://'.$_SERVER['HTTP_HOST'];
$backgroundImg = $localhost.'/home_project/scissor_paper_rock/_include/img/bk4.jpeg';
$bImg = $localhost.'/home_project/scissor_paper_rock/_include/img/spinner.gif';
$paperImg = $localhost.'/home_project/scissor_paper_rock/_include/img/Paper.png';
$rockImg = $localhost.'/home_project/scissor_paper_rock/_include/img/Rock.png';
$scissorsImg = $localhost.'/home_project/scissor_paper_rock/_include/img/Scissors.png';
// echo $_SERVER['REMOTE_ADDR'];
?>
<style type="text/css">
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 5px; }
      #messages li {
      	padding: 5px 10px; 
      	width: 90%;     
      	margin-top: 5px;
   		margin-bottom: 5px;
    }
	  .msg_not_yours { background: #a0e4b0; float:right;}
	  .msg_yours { background: #00ced1; float:left;}
	  #messages { margin-bottom: 40px }
	 /* #main-div{
	  	z-index: 999;
	  	box-shadow: 0 0 20px #6a6a6a;
		border: 1px solid #2f72ac;
	    opacity: 1;
	  }*/
	 #main-div {
	    width:100%;
	    height:100%;
	    position: absolute;
	    background-image:url(<?php echo $backgroundImg;?>);
	    background-size:cover;
		border: 1px solid #2f72ac;
	    /*-webkit-filter: blur(4px);
	    -moz-filter: blur(4px);
	    -ms-filter: blur(4px);
	    -o-filter: blur(4px);*/
	    /*filter: blur(4px);*/
	}
	#child-div-1 { 
		box-shadow: 0 0 30px #6a6a6a;
		border: 1px solid #2f72ac;
	    opacity: 1;
/*	    -webkit-filter: blur(0px);
	    -moz-filter: blur(0px);
	    -ms-filter: blur(0px);
	    -o-filter: blur(0px);
	    filter: blur(0px); */
 	}
 	#child-div-2 { 
	  	box-shadow: 0 0 30px #6a6a6a;
		border: 1px solid #2f72ac;
	    opacity: 1;
/*	    -webkit-filter: blur(0px);
	    -moz-filter: blur(0px);
	    -ms-filter: blur(0px);
	    -o-filter: blur(0px);
	    filter: blur(0px); */
 	}
 	.pre-scrollable-div {
	     max-height: 90%; 
	    overflow-y: scroll;
	}
    </style>
<div class="row" id="main-div"  >
	<div id="child-div-1" class="col-md-7 container border specialBackground" >
		<div class="col-md-6 text-right">
			<button type="button" class="btn btn-danger .navbar-right" id="btnRestart">Restart</button>
		</div>
		<div class="col" id="startInfoCnt" style="display:none;">
			<input type="text" name="username" class="username" placeholder="Enter Your Name">
			<div class="col" style='font-size:20px;font-family: Arial Black;'>
				<div >
					Choose Round(s) For Game:
				</div>
			  	<input type="radio" name="round" value="1" class="1" checked="true"> 1||
			  	<input type="radio" name="round" value="3" class="3"> 3||
			  	<input type="radio" name="round" value="5" class="5"> 5
			</div>
		</div>
		<div class="col" id="bodyCnt" style="display:none;">
			<div class="roundCount" style='font-size:20px;font-family: Arial Black;'></div>
			<div class="row">
				<div class="col">
					<div class="row">
						<input type="text" name="user1-name" class="user1-name" placeholder="First Player Name">
						<div class="user1-count-div"></div>
					</div>
					<div class="row">
						<input type="text" name="user2-name" class="user2-name" placeholder="Second Player Name">
						<div class="user2-count-div"></div>
					</div>
				</div>
				<div>
					<div class="countdown_msg"></div>
					<div class="countdown"></div>
				</div>
			</div>
			<div class="row-md-6">
				<div class="winner-wrapper-div" style="min-height:240px;">
					<div class="row">
						<div class="col-md" id="user1-selected-div">
							<img src='<?php echo $bImg; ?>' alt="Loading" title="Loading" class='img-fluid' height="100%" width="100%"/>
						</div>
						<div class="col-md" id="winner-div">
							<img src='<?php echo $bImg; ?>' alt="Loading" title="Loading" class='img-fluid' height="100%" width="100%"/>
						</div>
						<div class="col-md" id="user2-selected-div">
							<img src='<?php echo $bImg; ?>' alt="Loading" title="Loading" class='img-fluid' height="100%" width="100%"/>
						</div>
					</div>
				</div>
			</div>
			<div class="row-md-3">
				<div class="user1_child_div" style="display:none;">
					<table class="user1" border="1px">
						<tr>
							<td height="200px" width="340px" class="Scissors">
								<img src='<?php echo $scissorsImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
							<td height="200px" width="340px" class="Paper">
								<img src='<?php echo $paperImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
							<td height="200px" width="340px" class="Rock">
								<img src='<?php echo $rockImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="row-md-3">
				<div class="user2_child_div" style="display:none;">
					<table class="user2" border="1px">
						<tr>
							<td height="200px" width="340px" class="Scissors">
								<img src='<?php echo $scissorsImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
							<td height="200px" width="340px" class="Paper">
								<img src='<?php echo $paperImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
							<td height="200px" width="340px" class="Rock">
								<img src='<?php echo $rockImg; ?>' class='img-fluid' height="100%" width="100%"/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div id="child-div-2" class="col-md-5 container border specialBackground" >
		<div class="col">
		<button type="button" class="btn btn-warning .navbar-right" id="btnClearMsg" style="display:none;">Clear Message</button>
		</div>
		<div class="row-md-7 pre-scrollable-div"  >
			<ul id="messages" style="height: 80vh;"></ul>
		</div>
		<div class="row-md-2">
			<input id="m" autocomplete="off" /><button class="btnSend">Send</button>
		</div>
	    <!--
		<form >
		  <textarea id="m" name="message" rows="10" cols="76"></textarea>
		  <br>
		  <button class="btnSend">Send</button>
		  <input type="submit">
		</form>
	    -->
	</div>
</div>
<!-- ends agreement modal  -->
<link rel="stylesheet" href="<?php echo $localhost; ?>/home_project/scissor_paper_rock/_include/css/bootstrap.min.css">
<script src="<?php echo $localhost; ?>/home_project/scissor_paper_rock/_include/js/jquery-3.3.1.min.js" ></script>
<script src="<?php echo $localhost; ?>/home_project/scissor_paper_rock/_include/js/bootstrap.min.js" ></script>
<!-- socket.io -->
<script src="<?php echo $localhost; ?>/home_project/scissor_paper_rock/node_modules/socket.io-client/dist/socket.io.js"></script>
<script src="<?php echo $localhost; ?>/home_project/scissor_paper_rock/_include/js/jquery.countdown.min.js"></script> 

<script type="text/javascript" src="_node/node-client/event.js"></script>
<script type="text/javascript" src="_node/node-client/node-client.js"></script>
<script type="text/javascript" src="_node/node-client/main.js"></script>