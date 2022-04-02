chrome.contextMenus.create({
	id: 'maybelater', 
	title: 'Add to MaybeLater queue', 
	contexts:['link']}
);

chrome.contextMenus.onClicked.addListener(() => {
	// send to backend
});

