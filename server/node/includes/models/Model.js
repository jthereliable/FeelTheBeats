require("prototypes");

var Model = function() {
	var attr;
	for(attr in this.defaults)
	{
		if(this[attr] === null)
		{
			this[attr] = this.defaults[attr];
		}
	}
};
Model.prototype.model = {};
Model.prototype.defaults = {};
Model.prototype.validate = function() {
	for(attr in this.model)
	{
		if(this.model[attr].required)
		{
			
		}
	}
};
module.exports = exports = Model;