//var exampleMinErr = minErr('example');
//throw exampleMinErr('one', 'This {0} is {1}', foo, bar);

var message = 7;
var temp = minErrCopy("test");
try {
	if (message > 6) throw temp('one', 'This {0} is {1}', "foo", "bar");
} catch(err) {
	console.log(err);
}
/**
 * var exampleMinErr = minErr('example');
 * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
 *
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErrCopy(name, ErrorConstructor) {
	ErrorConstructor = ErrorConstructor || Error;
	return function(code, template) {
		var SKIP_INDEXES = 2;
		if (arguments.length < 2) return "Error Can not be generated for" + name;
		var errCode = code;
		var errTemplate = template;
		for (var i = 2; i < arguments.length; i++) {
			errTemplate = errTemplate.replace("{" + (i - 2) + "}", arguments[i]);	
		}
		
		console.log(errTemplate);
		return new ErrorConstructor(errTemplate);
	};
}

function minErr(module, ErrorConstructor) {
  ErrorConstructor = ErrorConstructor || Error;
  return function() {
    var SKIP_INDEXES = 2;

    var templateArgs = arguments,
      code = templateArgs[0],
      message = '[' + (module ? module + ':' : '') + code + '] ',
      template = templateArgs[1],
      paramPrefix, i;

    message += template.replace(/\{\d+\}/g, function(match) {
      var index = +match.slice(1, -1),
        shiftedIndex = index + SKIP_INDEXES;

      if (shiftedIndex < templateArgs.length) {
        return toDebugString(templateArgs[shiftedIndex]);
      }

      return match;
    });

    message += '\nhttp://errors.angularjs.org/1.5.3/' +
      (module ? module + '/' : '') + code;

    for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
      message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
        encodeURIComponent(toDebugString(templateArgs[i]));
    }

    return new ErrorConstructor(message);
  };
}

//console.log(toDebugString({}));
var test = {
	test1 : function(name) {
		console.log(name);
	},
	name : "name1",
	toString : function() {
		return this.name;
	}
};

var testFunc = function(name) {
	return name;
}
document = {};
console.log(testFunc.toString());

function toDebugString(obj) {
  if (typeof obj === 'function') {
    return obj.toString().replace(/ \{[\s\S]*$/, '');
  } else if (isUndefined(obj)) {
    return 'undefined';
  } else if (typeof obj !== 'string') {
    return serializeObject(obj);
  }
  return obj;
}

function isUndefined(value) {
	return typeof value === 'undefined';
}

function serializeObject(obj) {
  var seen = [];

  return JSON.stringify(obj, function(key, val) {
    val = toJsonReplacer(key, val);
    if (isObject(val)) {

      if (seen.indexOf(val) >= 0) return '...';

      seen.push(val);
    }
    return val;
  });
}

function toJsonReplacer(key, value) {
  var val = value;

  if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    val = undefined;
  } else if (isWindow(value)) {
    val = '$WINDOW';
  } else if (value &&  document === value) {
    val = '$DOCUMENT';
  } else if (isScope(value)) {
    val = '$SCOPE';
  }

  return val;
}

function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}


function isWindow(obj) {
  return obj && obj.window === obj;
}

function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}
