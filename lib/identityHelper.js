/**
    Copyright 2015 Tom Warne. All Rights Reserved.

    Licensed under the ISC License (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is in the
    LICENSE.txt file accompanying this file.

    This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

var config = require('config'),
    _ = require('lodash');

(function() {
    'use strict';

    var resolveIdentity = function(name) {
        if(!name) {
            return undefined;
        }

        var identities = config.get('identities');
        var filteredIdentities = _.filter(identities, function(item) {
            return item.nicknames.indexOf(name) !== -1;
        });
        if(filteredIdentities.length === 0) {
            console.log('No identity found; return undefined');
            return undefined;
        }
        if(filteredIdentities.length > 1) {
            console.log('Multiple identities matched input; returning the first');
        }
        return filteredIdentities[0];
    };

    module.exports = exports = {
        resolveIdentity: resolveIdentity
    };

})();