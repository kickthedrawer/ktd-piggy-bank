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
    AlexaSkill = require('./lib/AlexaSkill'),
    eventHandlers = require('./lib/eventHandlers'),
    intentHandlers = require('./lib/intentHandlers');

(function() {
    'use strict';

    var appId = config.get('alexa.app_id');
    var skillContext = {};
    
    /**
     * PiggyBank is a child of AlexaSkill.
     */
    var PiggyBank = function () {
        AlexaSkill.call(this, appId);
        skillContext.needMoreHelp = true;
    };
    
    // Extend AlexaSkill
    PiggyBank.prototype = Object.create(AlexaSkill.prototype);
    PiggyBank.prototype.constructor = PiggyBank;
    
    eventHandlers.register(PiggyBank.prototype.eventHandlers, skillContext);
    intentHandlers.register(PiggyBank.prototype.intentHandlers, skillContext);
    
    module.exports = PiggyBank;
})();
