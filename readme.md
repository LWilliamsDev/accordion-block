## WordPress Gutenberg Accordion Block
This WordPress plugin allows users to add accordions to their pages. The base accordion script does not use external libraries.

Essentially, I took my [vanilla JS accordion](https://github.com/LWilliamsDev/accordion) script and made a Gutenberg block out of it.

## Changes to Base JS Script
The one change I made to the base JS:
* Currently, there is not a good way to add classes to links in the Gutenberg editor. Due to this, I added a special class to all paragraph tags, button tags, and heading tags that contain a link to an accordion. Wheras the original script targets "a.accordion__open-link", this script targets ".accordion__open-link > a."

## Caution
To add the functionality that allows users to link to an accordion on the same page, I added a custom attribute to the core paragraph, core heading, and core button block. There may be conflicts if you have other plugins that add custom attributes to core blocks.

## Packages Used
* [WordPress Create Block](https://www.npmjs.com/package/@wordpress/create-block)
