$(document).ready(function () {
	$('footer').load('html/footer.html');
	$('header').load('html/header.html');
});

function urlGet(string) {
	let url = new URLSearchParams(window.location.search);
	return url.get(string)
}