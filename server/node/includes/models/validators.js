var moment = require('moment');

var isEmpty = exports.isEmpty = function(test) {
	return (test == null);
	//return (typeof(test) === "undefined" || test === null);
};
var isNumber = exports.isNumber = function(test) {
	// Allow numeric strings to be considered as numbers
	return (!isEmpty(test) && !isNaN(test));
};
var isInt = exports.isInt = function(test) {
	return (!isEmpty(test) && isNumber(test) && test%1===0)
};
var isPositive = exports.isPositive = function(test) {
	return (!isEmpty(test) && isNumber(test) && test>0);
};
var isNegative = exports.isNegative = function(test) {
	return (!isEmpty(test) && isNumber(test) && test<0);
};
var isDate = exports.isDate = function(test) {
	return (!isEmpty(test) && moment(test).isValid());
};

var date = exports.date = function(min_date, max_date) {
	min_date = moment(String(min_date));
	max_date = moment(String(max_date));
	if(!min_date.isValid())
	{
		min_date = 0;
	} else {
		min_date = +min_date;
	}
	if(!max_date.isValid())
	{
		max_date = Infinity;
	} else {
		max_date = +max_date;
	}
	
	return (function(test) {
		test = moment(test);
		return !(!isDate(test) || +test < min_date || +test > max_date)
	});
};

var enum = exports.enum = function(fields) {
	return (function(test) {
		return (fields.indexOf(test) > -1);
	});
};

var string = exports.string = function(min_length, max_length) {
	if(isEmpty(min_length))
	{
		min_length = 0;
	}
	if(isEmpty(max_length))
	{
		max_length = Infinity;
	}
	
	return (function(test) {
		return !(isEmpty(test) || test.length < min_length || test.length > max_length)
	});
};

var number = exports.number = function(min, max) {
	if(isEmpty(min))
	{
		min = -Infinity;
	}
	if(isEmpty(max))
	{
		max = Infinity;
	}
	
	return (function(test) {
		return !(!isNumber(test) || test < min || test > max)
	});
};

var int = exports.int = function(min, max) {
	if(isEmpty(min))
	{
		min = -Infinity;
	}
	if(isEmpty(max))
	{
		max = Infinity;
	}
	
	return (function(test) {
		return !(!isInt(test) || test < min || test > max)
	});
};