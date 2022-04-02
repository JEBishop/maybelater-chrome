htmlString = "";
document.addEventListener('DOMContentLoaded', function () {
	//var bg = chrome.extension.getBackgroundPage();
	//var myURL = bg.url;
	//var htmlS = bg.htmlString;
	//$('#tablebody').after(htmlS);
	
	function updateTable() {
		for(var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var val = localStorage.getItem(key);
			$("#tablebody").after('<tr><td>' + key + '</td><td><a href="' + val + '">' + val + '</a></td><td><input id="btnDelete" type="button" class="btn btn-success" value="Delete"/></td></tr>');
		}		
	}

	// do this to find user ID

	//chrome.identity.getProfileUserInfo((userInfo) => {
	//	var email = userInfo.email;
	//	var userId = userInfo.id;
	//});
	
	updateTable();
	
	$(document).on("click", '#btnDelete', function() {
		$(this).parents('tr').remove();
		var k = $(this).closest('tr').children('td:first').text();
		localStorage.removeItem(k);
	});
	
	$("#btnClear").on("click", function() {
		for(var i = 0; i < localStorage.length; i++) {
			localStorage.clear();
		}
		chrome.runtime.reload();
	});
	
	chrome.runtime.onMessageExternal.addListener(
		function(request, sender, sendResponse) {
		if (request.openUrlInEditor) {
			openUrl(request.openUrlInEditor);
			alert("received");
		}
	});
});