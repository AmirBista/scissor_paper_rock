<?php
$localhost = 'http://'.$_SERVER['HTTP_HOST'];
$bImg = $localhost.'/mi_node_project/Project-A/_include/img/PleaseWait.png';
$paperImg = $localhost.'/mi_node_project/Project-A/_include/img/Paper.png';
$rockImg = $localhost.'/mi_node_project/Project-A/_include/img/Rock.png';
$scissorsImg = $localhost.'/mi_node_project/Project-A/_include/img/Scissors.png';
// echo $_SERVER['REMOTE_ADDR'];
?>
<style type="text/css">
</style>
<div class="container">
	<div class="countdown_msg"></div>
	<div class="countdown"></div>
	<div class="row">
		<div class="col-md-3">
			<div class="child_div_1">
				

				<!-- <span class="user1-name">Aamir</span> -->
				<div class="row">
					<input type="text" name="user1-name" class="user1-name" placeholder="First Player Name">
					<div class="user1-count-div"></div>
				</div>
				<br>
				<table class="user1" border="1px">
					<tr>
						<td height="200px" width="200px" class="Scissors">
							<img src='<?php echo $scissorsImg; ?>' class='img-fluid'/>
						</td>
					</tr>
					<tr>
						<td height="200px" width="200px" class="Paper">
							<img src='<?php echo $paperImg; ?>' class='img-fluid'/>
						</td>
					</tr>
					<tr>
						<td height="200px" width="200px" class="Rock">
							<img src='<?php echo $rockImg; ?>' class='img-fluid'/>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="col-md-6">
			<div class="winner-wrapper-div">
				<div class="row">
					<div class="col-md" id="user1-selected-div">
						<img src='<?php echo $bImg; ?>' class='img-fluid'/>
					</div>
					<div class="col-md" id="winner-div">
						<img src='<?php echo $bImg; ?>' class='img-fluid'/>
					</div>
					<div class="col-md" id="user2-selected-div">
						<img src='<?php echo $bImg; ?>' class='img-fluid'/>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="child_div_2" >
				
				<!-- <span class="user2-name">Kril</span> -->
				<div class="row">
					<input type="text" name="user2-name" class="user2-name" placeholder="Second Player Name">
					<div class="user2-count-div"></div>
				</div>
				<br>
				<table class="user2" border="1px">
					<tr>
						<td height="200px" width="200px" class="Scissors">
							<img src='<?php echo $scissorsImg; ?>' class='img-fluid'/>
						</td>
					</tr>
					<tr>
						<td height="200px" width="200px" class="Paper">
							<img src='<?php echo $paperImg; ?>' class='img-fluid'/>
						</td>
					</tr>
					<tr>
						<td height="200px" width="200px" class="Rock">
							<img src='<?php echo $rockImg; ?>' class='img-fluid'/>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- ends agreement modal  -->
<link rel="stylesheet" href="<?php echo $localhost; ?>/mi_node_project/Project-A/_include/css/bootstrap.min.css">
<script src="<?php echo $localhost; ?>/mi_node_project/Project-A/_include/js/jquery-3.3.1.min.js" ></script>
<script src="<?php echo $localhost; ?>/mi_node_project/Project-A/_include/js/bootstrap.min.js" ></script>
<!-- socket.io -->
<script src="<?php echo $localhost; ?>/mi_node_project/Project-A/node_modules/socket.io-client/dist/socket.io.js"></script>
<script src="<?php echo $localhost; ?>/mi_node_project/Project-A/_include/js/jquery.countdown.min.js"></script> 

<script type="text/javascript" src="_node/node-client/event.js"></script>
<script type="text/javascript" src="_node/node-client/node-client.js"></script>
<script type="text/javascript" src="_node/node-client/main.js"></script>