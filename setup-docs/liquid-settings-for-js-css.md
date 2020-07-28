# Handling Theme Settings in Javascript and SCSS Files

Shopify projects rely on settings which are often referenced by javascript or scss
for different functionality. To use processors like Babel on a project, we can't
have liquid tags on the file, but we don't want to lose the flexibility to
reference settings made from the Theme Editor.

The solution is to expose settings globally by using a snippet, then
reference them in a more javascript-y or scss-y way throughout our project.

Some themes may already be implementing this concept (we learned it from Out of
the Sandbox), others you may need to add it in first. With all the tooling in
the javascript and scss/css ecosystems, keeping liquid out of non-liquid files
allows us to actually use tooling to help our development process instead of
failing because of liquid tags.

## Examples:

**CSS -**

Add snippet `css-variables.liquid` to snippets folder
    - This file allow us to sanitize our scss files from any liquid 

Code for file: 
```
{% comment %}

:root {
--color-body-text: {{ settings.color_body_text }};
--color-background: {{ settings.color_background_color }}
}
{% endcomment %}

<style>
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
  }
</style>
```

**Javascript -**

Add snippet `js-variables.liquid` to snippets folder
    - This file allow us to sanitize our javascript files from any liquid 

Code for file: 
```
{% capture js_variables %}
  <script>
  Shopify = window.Shopify || {};
  {% comment %} /* # Theme settings
  ================================================== */ {% endcomment %}
  Shopify.theme_settings = {};
  {% comment %} Example: {% endcomment %}
  {% comment %} Cart 
  Shopify.theme_settings.display_tos_checkbox = {{ settings.display_tos_checkbox | json }};
  Shopify.theme_settings.go_to_checkout = {{ settings.go_to_checkout | json }};
  Shopify.theme_settings.cart_action = {{ settings.cart_action | json }};
  {% endcomment %}
  </script>
{% endcapture %}

{%- assign js_variables = js_variables | split: 'Shopify.' -%}

{%- for variable in js_variables -%}
  {%- assign variableblock = variable | strip -%}
  {% if forloop.first %}
    {{ variableblock }}
  {% else %}
    {{ variableblock | prepend: 'Shopify.' }}
  {% endif %}
{%- endfor -%}
```
