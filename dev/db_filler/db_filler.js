var mysql	= require("../../node/node_modules/database/mysql.js"),
	mongo	= require("../../node/node_modules/database/mongo.js"),
	async	= require("async");

var random_vowels = "aeiou";
var random_consonants = "bcdfghjklmnpqrstvwxyz";
var random_extended_characters = ".,?:;!";
function random_string(min, max)
{
	var out = "", i, l=Math.random()*(max-min)+min, r, a=random_consonants.length, b=random_vowels.length, c_streak=1;
	for(i=0;i<l;i++)
	{
		if(Math.pow(Math.random(), c_streak) < .4)
		{
			r=Math.floor(Math.random()*b);
			out += random_vowels[r];
			c_streak = 1;
		} else {
			r=Math.floor(Math.random()*a);
			out += random_consonants[r];
			c_streak++;
		}
	}
	return out;
}
function random_url()
{
	return "http://www."+random_string(5,16)+".com/"+random_string(5,16);
}
function random_text(min, max)
{
	var out = "", max=Math.min(5000, Math.floor(Math.pow(Math.random()*Math.random(),2)*(max-min)+min));
	var b=random_extended_characters.length, s;
	while(out.length<max)
	{
		s = random_string(2,8+Math.floor(Math.random()*6)).toLowerCase();
		if(Math.random()<.05 || out == "")
		{
			s = random_string(1,1).toUpperCase() + s;
		}
		if(Math.random()<.1 && out != "")
		{
			s = random_string(1,1).toUpperCase() + s;
			s = random_extended_characters[Math.floor(Math.random()*b)] + " " + s;
		} else {
			s = " " + s;
		}
		if(Math.random()<.01)
		{
			s = s + "\r\n";
		}
		out += s;
	}
	return out.substr(0,max-1)+".";
}
function random_int(precision)
{
	return Math.floor(Math.pow(10, precision) * Math.random());
}
function random_decimal(precision, scale)
{
	return Math.floor(Math.random()*Math.pow(10, precision))/Math.pow(10, scale);
}
function random_date()
{
	var d = new Date();
	return new Date(d.getTime() + Math.ceil(Math.random()*10000000000-2000000000));
}
function random_data(field)
{
	if(field.default != null)
	{
		if(field.default != "CURRENT_TIMESTAMP")
		{
			return field.default;
		}
	}
	switch(field.name)
	{
		case "category":
		case "fid":
		case "tid":
		case "sid":
		case "uid":
		case "owner":
		case "artist":
		case "moved_from":
		case "editor":
		case "ban_until":
		case "ban_level":
		case "mod_level":
		case "charter_level":
		case "topic_id":
			return null;
			break;
	}
	switch(field.data_type)
	{
		case "smalltext":
		case "text":
		case "mediumtext":
		case "varchar":
			if(field.name == "name")
			{
				return random_string(6, 32);
			} else if(field.name == "url" || field.name == "image")
			{
				return random_url();
			} else {
				return random_text(10, field.length);
			}
			break;
		case "int":
			return random_int(field.precision);
			break;
		case "decimal":
			return random_decimal(field.precision, field.scale);
			break;
		case "timestamp":
		case "date":
			if(field.name == "moved_date" || field.name == "date_edited")
			{
				return (Math.random()<.05)?null:random_date();
			}
			return random_date();
			break;
	}
}

var tables = [];
async.series([
	function(next) {
		var ignore = ["Genres", "frm_Categories", "frm_Forums", "GroupMembers", "Tournaments"];
		mysql.query("SHOW TABLES", function(err, rows) {
			var key = Object.keys(rows[0])[0];
			var i, l=rows.length;
			for(i=0;i<l;i++)
			{
				if(ignore.indexOf(rows[i][key]) > -1)
				{
					continue;
				}
				tables.push({
					"name": rows[i][key],
					"fields": [],
					"data": []
				});
			}
			next();
		});
	},
	function(next) {
		var load_table_fields = function(i, next) {
			mysql.query("SELECT COLUMN_NAME, COLUMN_DEFAULT, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE FROM information_schema.COLUMNS WHERE TABLE_NAME = ?", [tables[i].name], function(err, rows) {
				var fields = tables[i].fields;
				var j, l=rows.length, field;
				for(j=1;j<l;j++)
				{
					field = rows[j];
					fields.push({
						"name": field.COLUMN_NAME,
						"default": field.COLUMN_DEFAULT,
						"data_type": field.DATA_TYPE,
						"length": field.CHARACTER_MAXIMUM_LENGTH,
						"precision": field.NUMERIC_PRECISION,
						"scale": field.NUMERIC_SCALE
					});
				}
				next();
			});
		};
		var i, l=tables.length, load_table_fields_functions = [];
		for(i=0;i<l;i++)
		{
			(function() {
				var j = i;
				load_table_fields_functions[j] = function(next) {
					load_table_fields(j, next);
				};
			})();
		}
		
		async.parallel(load_table_fields_functions, function(err) {
			next();
		});
	},
	function(next) {
		var i, l=tables.length;
		var j, jl, datas, data, fields, rows=Math.random()*100+50;
		var field_question_marks, question_marks, value_question_marks;
		for(i=0;i<l;i++)
		{
			fields = tables[i].fields;
			jl = fields.length;
			datas = [];
			
			field_question_marks = [];
			question_marks = [];
			for(j=0;j<jl;j++)
			{
				datas.push(fields[j].name);
				field_question_marks.push("??");
				question_marks.push("?");
			}
			field_question_marks = field_question_marks.join(", ");
			question_marks = question_marks.join(", ");
			
			rows=Math.random()*100+50;
			value_question_marks = [];
			for(r=0;r<rows;r++)
			{
				value_question_marks.push("("+question_marks+")");
				for(j=0;j<jl;j++)
				{
					datas.push(random_data(fields[j]));
				}
			}
			value_question_marks = value_question_marks.join(", ");
			
			mysql.query("INSERT INTO "+tables[i].name+" ("+field_question_marks+") VALUES"+value_question_marks, datas, function(err, result) {
				console.log(err);
			});
		}
	}
]);