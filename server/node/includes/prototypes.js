Function.prototype.inherits = function(parent) {
	if(parent instanceof Function)
	{
		this.prototype = Object.create(parent.prototype);
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	} else {
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}
};