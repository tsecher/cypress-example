"use strict";

export const GTM_SCRIPT_LOAD_ID = 'gtm_script_load';
export const ALIAS_GTM_SCRIPT_LOAD = `@${GTM_SCRIPT_LOAD_ID}`;

/**
 * Init the GTM script loader listener.
 *
 * GTM data layer test cannot be made before script has load.
 * Therefor, we have to intercept the request and use the
 * ALIAS_GTM_SCRIPT_LOAD before testing GTM behaviors.
 */
export const listenGTMScriptLoad = (url = 'https://www.googletagmanager.com/gtm.js?*') => {
    cy.intercept(
        url,
        {middleware: true},
        (req) => {
            req.on('before:response', (res) => {
                // force all API responses to not be cached
                res.headers['cache-control'] = 'no-cache';
            });
        }
    ).as(GTM_SCRIPT_LOAD_ID);
};


/**
 * Test the GTM behavior.
 *
 * Check window.dataLayer object keys and value.
 *
 * @param data
 *   The DataLayer attempted object part
 */
export const dataLayerShouldContain = (data) => {
    cy.window().then(win => {
        assert.isDefined(win.dataLayer);

        // Change data in json.
        const search = {};
        const keys = Object.keys(data);
        keys.forEach(key => {
            search[key] = JSON.stringify(data[key]);
        });

        // Look into window.dataLayer
        assert.isDefined(win.dataLayer.find(x => {
            const includes = keys.filter(key => x[key] && JSON.stringify(x[key]) && search[key]);

            return includes.length === keys.length;
        }));
    });
};
