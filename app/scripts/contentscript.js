// identifier is a selector used to find the links
// list is an array of blocked users
// container is a selector to select which ancenstral element should be removed from the DOM
function remove(identifier, list, container = identifier) {
	let els = document.querySelectorAll(`${identifier} a`);
	if (els.length === 0) return;
	let users = [...list];
	for (let i = 0; i < els.length; i++) {
		for (let j = users.length - 1; j >= 0; j--) {
			if (els[i].getAttribute('href').indexOf('/' + users[j] + '/') !== -1) {
				console.log('Removed content by', users[j]);
				els[i].closest(container).remove();
				users.splice(j, 1);
			}
		}
	}
}

function removeAll() {
	chrome.storage.sync.get({
		blockedUsers: '[]',
	}, items => {
		if (items.blockedUsers.length > 0) {
			let wait = [50, 100, 200, 500, 1000, 1500, 2500, 5000];
			for (let i = 0; i < 8; i++) {
				setTimeout(() => {
					var users = JSON.parse(items.blockedUsers);
					remove('.review-tile', users);
					remove('.film-detail', users);
					remove('.list', users);
					remove('.poster-container', users);
					remove('.people-shortlist', users, 'li');
					remove('.person-summary', users, 'tr');
					remove('.featured-person', users);
				}, wait[i]);
			}
		}
	});
}
document.addEventListener('DOMContentLoaded', removeAll);