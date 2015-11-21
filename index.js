/**
    Copyright 2015 Tom Warne. All Rights Reserved.

    Licensed under the ISC License (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is in the
    LICENSE.txt file accompanying this file.

    This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

var PiggyBank = require('./piggyBank');

(function() {
    'use strict';

    exports.handler = function(event, context) {
        var piggyBank = new PiggyBank();
        piggyBank.execute(event, context);
    };
})();