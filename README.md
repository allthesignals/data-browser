# Carto Data Catalog

The Data Catalog is an instant data catalog built primarily for Carto users who want a single public viewing space for all their datasets. It provides a configurable interface for users to navigate through different groupings of public datasets on a user's Carto account. [See it in action](http://datacatalog.planninglabs.nyc/).

## Preview
![data_catalog](https://github.com/allthesignals/data-browser/blob/master/CRMha02VYb.gif?raw=true)

You can also try this against your own account by visiting http://datacatalog.planninglabs.nyc and appending the following URL parameter: `?endpoint=YOUR_CARTO_ACCOUNT_URL`. For example, Planning Labs' account would be: https://datacatalog.planninglabs.nyc/?endpoint=https%3A%2F%2Fplanninglabs.carto.com. 

## Features
 - Public, searchable, and customizable catalog for you, your team, or your organizations Carto accounts
 - Groups your Carto datasets' tags together for automatic filtering in the interface
 - Sophisticated tagging system - categorize tags with metadata like so `fruit:banana` - the Data Catalog will only display the relevant values
 - Point to multiple Carto accounts 
 - Preview dataset and download link
 - Search all datasets
 - Datasets marked Private in Carto are only visible to those who are logged in
 
## Coming Soon
 - Support for S3
   - The Data Catalog will soon allow you to point to an S3 bucket on AWS or Digital Ocean. It will infer dataset "tags" from the dataset folders. 
 - Box
 - Dropbox
 - Github

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd data-browser`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
