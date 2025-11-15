# CHANGELOG

## [Unreleased]

### Rocket Pages Implementation
- Added a new `rocket-pages` section with custom list and single layouts, sidebar TOC, and support for `rocket-tag` and `rocket-category` taxonomies.
- Refactored layouts to use Hugo's block system and a single global HTML skeleton in `_default/baseof.html`.
- Ensured all CSS classes are generic and reusable, following best practices for maintainable two-column layouts.
- Theme and density are now controlled via `data-theme` and `data-density` params in `config.yaml`, mapped to the root HTML element.
- All changes follow Hugo and modern CSS best practices: no hacks, no duplication, fully modular.
