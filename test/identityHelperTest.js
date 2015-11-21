/**
    Copyright 2015 Tom Warne. All Rights Reserved.

    Licensed under the ISC License (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is in the
    LICENSE.txt file accompanying this file.

    This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

var assert = require('assert'),
    should = require('should'),
    identityHelper = require('../lib/identityHelper');

describe('identityHelper', function() {
    describe('#resolveIdentity()', function() {
        it('should return Sally when given Sal', function() {
            var identity = identityHelper.resolveIdentity('Sal');
            should(identity).be.ok();
            identity.should.have.property('name', 'Sally');
        });
        it('should return undefined when given Michael', function() {
            var identity = identityHelper.resolveIdentity('Michael');
            should(identity).not.be.ok();
        });
    });
});