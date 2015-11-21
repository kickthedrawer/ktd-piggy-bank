/**
    Copyright 2015 Tom Warne. All Rights Reserved.

    Licensed under the ISC License (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is in the
    LICENSE.txt file accompanying this file.

    This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

(function() {
    var registerEventHandlers = function (eventHandlers, skillContext) {
        eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
            //if user said a one shot command that triggered an intent event,
            //it will start a new session, and then we should avoid speaking too many words.
            skillContext.needMoreHelp = false;
        };
        
        eventHandlers.onLaunch = function (launchRequest, session, response) {
            var speechOutput = 'PiggyBank! Whose piggy bank do you want to look at?';
            var reprompt = 'Please tell me whose piggy bank you want to look at.';
            response.ask(speechOutput, reprompt);
        };
    };
    exports.register = registerEventHandlers;
})();