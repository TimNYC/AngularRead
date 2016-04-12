//var exampleMinErr = minErr('example');
//throw exampleMinErr('one', 'This {0} is {1}', foo, bar);

var message = 7;
var temp = minErr("test");
if (message > 6) throw temp('one', 'This {0} is {1}', "foo", "bar");

/**
 * var exampleMinErr = minErr('example');
 * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
 *
 * If fewer arguments are specified than necessary for interpolation, the extra
 * interpolation markers will be preserved in the final string.
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErr(name) {
	return function(code, template) {
		if (arguments.length < 2) return "Error Can not be generated for" + name;
		var errCode = code;
		var errTemplate = template;
		for (var i = 2; i < arguments.length; i++) {
			errTemplate = errTemplate.replace("{" + (i - 2) + "}", arguments[i]);	
		}
		console.log(errTemplate);
		return errTemplate;
	};
}
