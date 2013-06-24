/*
var Model = require("models/Model");
var User = require("models/community/User");

a = new User();
console.log(a.validate());
console.log(User.validate(a));
console.log(Model.validate(a));
console.log(a);
console.log(JSON.stringify(a));
*/

var flat = require("flat");
var o1 = {
	"flatten": "ing",
	"that": [
		"object",
		"123",
		{
			"another": "object",
			"to": "flatten",
			"a": 1
		}
	],
	"object": {
		"a": 1,
		"object": {
			"b": 1,
			"object": {
				"c": 1
			}
		}
	}
};
var o2 = [
	"test",
	"ing",
	{
		"flatten": "ing",
		"that": [
			"object",
			"123",
			[
				1,
				2,
				3
			]
		]
	}
];
var a1 = flat.flatten(o1);
var a2 = flat.flatten(o2);
var u1 = flat.unflatten(a1);
var u2 = flat.unflatten(a2);

console.log(o1);
console.log(a1);
console.log(u1);
console.log(o2);
console.log(a2);
console.log(u2);