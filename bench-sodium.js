var crypto        = require('crypto');
var assert        = require('assert');

var sodium        = require('sodium');
var ROUNDS = 10;
var SIGNATURES = 5000;

var base64_to_Uint8Array = function(input) {
  var raw = new Buffer(input, 'base64');
  var arr = new Uint8Array(new ArrayBuffer(raw.length));
  for(i = 0; i < raw.length; i++) {
    arr[i] = raw[i];
  }
  return arr;
};

/*
var string_to_Uint8Array = function(str) {
  var raw = new Buffer(str, 'utf8');
  var arr = new Uint8Array(new ArrayBuffer(raw.length));
  for(i = 0; i < raw.length; i++) {
    arr[i] = raw[i];
  }
  return arr;
};
*/

var _seed     = 'Aav6yqemxoPNNqxeKJXMlruKxXEHLD931S8pXzxt4mk=';
var _pubkey   = 'DsWygyoTcB7/NT5OqRzT0eaFf+6bJBSSBRfDOyU3x9k=';
var _message  = "Hi, this is a string that I want signed, will keep it short";
var _sig      = 'IvmJ8ntaMtcoVaU3lDToeQPdG/CdL7an4r013gYgJbY+eXJiwVZ9IxU/OC5htH41x2ezZRd83rTwe2+jf1f3CQ==';

var test_sodium = function() {
  this._seed    = base64_to_Uint8Array(_seed);
  this.key      = null;
};

test_sodium.prototype.fromSeed = function() {
  this.key = new sodium.Key.Sign.fromSeed(_seed, 'base64');
};

test_sodium.prototype.sign = function(message) {
  // Detached signatures: https://github.com/paixaop/node-sodium/issues/22
  var signer = new sodium.Sign(this.key);
  var sig = signer.sign(message, 'utf8');
  this.sig = sig.sign.slice(0, 64).toString('base64');
};

test_sodium.prototype.verify = function(message) {
  for (var i=0;i<SIGNATURES;i++) {
  var input = {
    sign:         Buffer.concat([
      new Buffer(this.sig, 'base64'),
      new Buffer(message, 'utf8')
    ]),
    publicKey:    new Buffer(_pubkey, 'base64')
  };
    var r = sodium.Sign.verify(input);
    assert(r, "Verification failed!");
  }
};

console.log(" - testing sodium", ROUNDS, "rounds of", SIGNATURES, "signatures");
var sod = new test_sodium();
sod.fromSeed();
for (var i=0;i<ROUNDS;i++) {
sod.sign(_message + i);
sod.verify(_message + i);
}
