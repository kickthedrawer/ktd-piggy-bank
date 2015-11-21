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
    config = require('config'),
    request = require('request'),
    should = require('should'),
    sinon = require('sinon'),
    bank = require('../lib/bank');

describe('bank', function() {
    before(function(done) {
        sinon
            .stub(request, 'get')
            .yields(null, 200, JSON.stringify({
                id: '12345',
                label: 'piggy bank',
                value: '12.45'
        }));
        done();
    });

    after(function(done) {
        request.get.restore();
        done();
    });

    describe('#loadBalance()', function() {
        it('should return a balance for a valid identity', function(done) {
            var identity = config.get('identities')[0];
            bank.loadBalance(identity, function(err, balance) {
                should(err).not.be.ok();
                should(balance).be.ok();
                balance.should.equal('12.45');
                done();
            });
        });
    });
});
