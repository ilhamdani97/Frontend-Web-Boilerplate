# SCSS Structures, Explanation, and Example

main.scss import sequential:
vendor - base - helper - project - temp

## Folder Explanation

### base
Base styling that can be used on other projects

### helper
Styling for mixin (including z-index), spacing, utilities, etc

### vendor
All styling that taken from other repo that can be updated (ie: plugins, bootstrap, etc)

### project
This folder is consisting of child folders:
*init*: initial styling (ie: body font size, main anchor styling, etc)
*elements*: reusable elements (ie: buttons, form inputs, typographies, etc)
*components*: reusable independent components that including elements styling (components DOES NOT HAVE outer spacing) (ie: card, hero banner, etc)
*layout*: reusable layout that oftentimes depend on components and have spacing between components (ie: main header, main footer, section, etc)
*pages*: unique styling for each page

### temp
temporary _folder_ for style littering if you confused where you should put the styling on correspondent folder (you need to tidy up the styling on this folder later)