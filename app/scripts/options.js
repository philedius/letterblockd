function saveOptions() {
	var userList = document.getElementById('block-list').value.split('\n');
	for (let i = userList.length - 1; i >= 0; i--) {
		if (!userList[i]) userList.splice(i, 1);
	}
	chrome.storage.sync.set({
    blockedUsers: JSON.stringify(userList),
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Changes saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
    blockedUsers: '[]',
  }, function(items) {
		console.log(items);
		console.log('options restored, bitch');
		if (items.blockedUsers.length > 0) {
			var formatted = JSON.parse(items.blockedUsers).join('\n');
			document.getElementById('block-list').value = formatted;
		}
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('save').addEventListener('click', saveOptions);