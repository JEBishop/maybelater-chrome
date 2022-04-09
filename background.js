chrome.contextMenus.create({
	id: 'maybelater', 
	title: 'Add to MaybeLater queue', 
	contexts:['link']
});

chrome.contextMenus.onClicked.addListener(() => {
	var email = '';
	chrome.identity.getProfileUserInfo(function(userInfo) {
		email = userInfo.email;
	});
	fetch('http://localhost:3000/graphql', {
		method: 'POST',
		body: { query: '{ entriesByUser(userid:"12345") { entryid,userid,title,link } }' },
		headers: {
			'Content-type': 'form'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
	}).then(function (data) {
		console.log(data);
	}).catch(function (error) {
		console.warn('Something went wrong.', error);
	});
});