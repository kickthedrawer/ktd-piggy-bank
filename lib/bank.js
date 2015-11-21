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
    request = require('request');

(function() {
    'use strict';

    var loadBalance = function(identity, cb) {
        console.log('Loading balance for ' + identity.name);
        var bankMetricId = identity.piggyBankId;
        if(bankMetricId) {
            var req = {
                uri: 'https://api.numerousapp.com/v2/metrics/' + bankMetricId,
                auth: {
                    user: config.get('numerous.token'),
                    sendImmediate: true
                }
            };
            request.get(req, function(err, httpResponse, body) {
                if(err) {
                    console.log('Failed to load metric data');
                    cb(err);
                }

                if(httpResponse.statusCode !== 200 || body === null) {
                    console.log('Failed to load metric data');
                    var respErr = {
                        code: httpResponse.statusCode,
                        message: 'Failed to load metric data'
                    };
                    cb(respErr);
                }

                var bankMetric = JSON.parse(body);
                cb(null, bankMetric.value);
            });
        } else {
            nextTick(function() {
                var err = {
                    id: 'NO_BANK',
                    message: 'No bank id found'
                };
                cb(err);
            });
        }

    };

    module.exports = exports = {
        loadBalance: loadBalance
    };
})();