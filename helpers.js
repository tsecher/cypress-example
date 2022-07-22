import * as _conf from './helpers/configuration/configuration';
import * as _didomi from './helpers/didomi/didomi';
import * as _gtm from './helpers/gtm/gtm';

export const conf = _conf;
export const didomi = _didomi;
export const gtm = _gtm;

/**
 * Aggregator.
 * @type {{gtm: {GTM_SCRIPT_LOAD_ID?: string, listenGTMScriptLoad?: function(*=): void, assertGTMDataLayer?: function(*): void, ALIAS_GTM_SCRIPT_LOAD?: string}, didomi: {testDidomi?: function(*=): void}, conf: {retry?: function(*=): {retries: {openMode: 1, runMode: 1}}}}}
 */
export const Helpers = {
  conf: _conf,
  didomi: _didomi,
  gtm: _gtm,
}
