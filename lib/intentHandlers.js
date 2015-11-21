/**
    Copyright 2015 Tom Warne. All Rights Reserved.

    Licensed under the ISC License (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is in the
    LICENSE.txt file accompanying this file.

    This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

var bank = require('./bank'),
    identityHelper = require('./identityHelper');

(function() {
    'use strict';
    
    var registerIntentHandlers = function (intentHandlers, skillContext) {
        
        intentHandlers.GetAllowanceIntent = function (intent, session, response) {
            var name = intent.slots.Name.value;
            if(!name) {
                response.ask('Whose allowance do you want to hear?',
                'Please tell me the name of the person whose allowance you want to know.');
                return;
            }

            var identity = identityHelper.resolveIdentity(name);

            bank.loadBalance(identity, function(err, balance) {
                if(err) {
                    return response.tell('I\'m sorry, but I can\'t see how much you have right now.');
                }

                return response.tell(identity.name + ' has $' + balance + ' in ' + identity.pronoun  + ' allowance.');
            });
        };

        intentHandlers.IdentifyIntent = function (intent, session, response) {
            var name = intent.slots.Name.value;
            if(!name) {
                response.ask('Whose allowance do you want to hear?',
                'Please tell me the name of the person whose allowance you want to know.');
                return;
            }

            var identity = identityHelper.resolveIdentity(name);

            bank.loadBalance(identity, function(err, balance) {
                if(err) {
                    return response.tell('I\'m sorry, but I can\'t see how much you have right now.');
                }

                return response.tell(identity.name + ' has $' + balance + ' in ' + identity.pronoun  + ' allowance.');
            });
        };
        
        intentHandlers.HelpIntent = function (intent, session, response) {
            var speechOutput = textHelper.completeHelp;
            if (skillContext.needMoreHelp) {
                response.ask(textHelper.completeHelp + ' So, how can I help?', 'How can I help?');
            } else {
                response.tell(textHelper.completeHelp);
            }
        };
        
        intentHandlers.ExitIntent = function (intent, session, response) {
            response.tell('');
        };
    };
    exports.register = registerIntentHandlers;
})();