# Helper : Didomi

## Use
```javascript
import {didomi} from 'cypress-example'
```

## Methods
### testDidomi(url)
Test Didomi popup only if it appears in DOM.

#### Use
```javascript
describe('Description', () => {
    // Visit page and test didomi.
    didomi.testDidomi('/');
})
```

#### Options
| Param | Type | Description |
| ----- | :--: | ----------- |
| url | `string` | Url to visit. |
