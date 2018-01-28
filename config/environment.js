/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'data-browser',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    dataBrowserIndex: 'configuration.json',
    dataBrowserEndpoint: 'https://planninglabs.carto.com/api/v2/sql?q=',
    spatialJoinFields: [  { field: 'ct10_id', table: 'census_2010_tracts'}, 
                          { field: 'muni_id', table: 'ma_municipalities'}
                        ],
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-d3': {
      only: ['d3-collection']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
