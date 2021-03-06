var theme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if (theme == 'light') {
	document.documentElement.setAttribute('theme', 'light');
};
if (theme == 'dark') {
	document.documentElement.setAttribute('theme','dark');
};
if (document.documentElement.getAttribute('theme') == '')
{
	document.documentElement.setAttribute('theme', 'light');
}
$(document).on('click','#switch-theme', function() {
	if (document.documentElement.hasAttribute('theme')) {
		if (document.documentElement.getAttribute('theme') == 'dark') {
			document.documentElement.setAttribute('theme', 'light');
			document.cookie = "theme=light; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT;";
		}
		else if (document.documentElement.getAttribute('theme') == 'light') {
			document.documentElement.setAttribute('theme', 'dark');
			document.cookie = "theme=dark; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT;";
		}
	}
})