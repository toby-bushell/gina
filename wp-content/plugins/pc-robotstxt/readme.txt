=== Virtual Robots.txt ===
Contributors: Marios Alexandrou
Donate link: http://infolific.com/technology/software-worth-using/robots-txt-plugin-for-wordpress
Tags: robots, robots.txt, robot, crawler
Requires at least: 4.0
Tested up to: 4.6.1
License: GPLv2 or later

Virtual Robots.txt automatically creates a robots.txt file for your site. Your robots.txt file can be easily edited from the plugin settings page.

== Description ==

Virtual Robots.txt is an easy (i.e. automated) solution to creating and managing a robots.txt file for your site. Instead of mucking about with FTP, files, permissions ..etc, just upload and activate the plugin and you're done.

By default, the Virtual Robots.txt plugin has a bunch of spam-bots disallowed, the Google bots specifically allowed, and a few of the standard WordPress folders and files disallowed. If you want to change what appears in your robots.txt file, you can easily edit the contents from the plugin settings page under Settings, Robots.txt in your blog administration.

If the plugin detects an existing XML sitemap file, a reference to it will be automatically added to your robots.txt file.

== Installation ==

1. Upload pc-robotstxt folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Once you have the plugin installed and activated, you'll see a new Robots.txt menu link under the Settings menu. Click that menu link to see the plugin settings page. From there you can edit the contents of your robots.txt file.

== Frequently Asked Questions ==

= Will it conflict with any existing robots.txt file? =

If a physical robots.txt file exists on your site, WordPress won't process any request for one, so there will be no conflict.

= Will this work for sub-folder installations of WordPress? =

Out of the box, no. Because WordPress is in a sub-folder, it won't "know" when someone is requesting the robots.txt file which must be at the root of the site.

== Changelog ==

= 1.8 =
* Undoing last fixes as they had unintended side-effects.

= 1.7 =
* Further fixes to issue with newlines being removed. Thanks to FAMC for reporting and for providing the code fix.
* After upgrading, visit and re-save your settings and confirm they look correct.

= 1.6 =
* Fixed bug where newlines were being removed. Thanks to FAMC for reporting.

= 1.5 =
* Fixed bug where plugin assumed robots.txt would be at http when it may reside at https. Thanks to jeffmcneill for reporting.

= 1.4 =
* Fixed bug for link to robots.txt that didn't adjust for sub-folder installations of WordPress.
* Updated default robots.txt directives to match latest practices for WordPress.
* Plugin development and support transferred to Marios Alexandrou.

= 1.3 =
* Now uses do_robots hook and checks for is_robots() in plugin action.

= 1.2 =
* Added support for existing sitemap.xml.gz file.

= 1.1 =
* Added link to settings page, option to delete settings.

= 1.0 =
* Initial release.
