## Commands

* `npm run start`        - Starts Gulp watcher on `scripts` and `styles` directories.
* `npm run build`        - Gulp builds the .min files from `scripts` and `styles`, but doesn't watch.
* `npm run watch`        - Runs theme deploy and theme watch on development config.
* `npm run test`         - Runs Cypress open and will start any tests.
* `npm run deploy-dev`   - Runs `theme deploy --env=development`
* `npm run deploy-stage` - Runs `theme deploy --env=staging`

## Themkit Setup

To build this project:

1. Clone repo locally

2. Install Shopify tooling:
   **Using Homebrew**

   - `brew tap shopify/shopify`
   - `brew install themekit`

3. Install [Themekit](https://shopify.github.io/themekit/)

4. Run `npm install`

5. Set up config.yml

``` yaml
# Password, theme_id, and store variables are required.
#
# For more information on this config file:
# https://shopify.github.io/themekit/commands/#configure

development:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json  
  
staging: 
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json  
  
production: 
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  timeout: 100s
  readonly: true
```

6. Setup Private app to link local dev environment to Shopify  

- **Setup Private App**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => Create New
    Private App
    - Enter App Name (Taproom Development) & Contact Email (kelly@thetaproom.com)
    - _Theme templates and theme assets_ set to **Read Write** access.
    - Save
    - Copy **Password**

    Gif for walkthrough:
    ![Custom App Walkthrough](./setup-docs/shopify-local-theme-development-generate-api.gif)

7. Add password to `config.yml` file
8. Go to Shopify Admin -> Online Store -> Themes -> Actions -> Edit Code
9. Grab Theme Id from URL
10. Add Theme Id to `theme_id` field in `config.yml` (should be a number)
11. Run `theme deploy`
12. Shopify Admin -> Online Store -> Themes Actions -> Previe