var BLEACH = ( function() {
	// Create new XMLHttpRequest instance
	var xhr = new XMLHttpRequest();

	var createXHR = function( url, options ) {
		// Set up optional options data to pass to server
		options = options || {};
		options.method = options.method || "GET";
		options.data = options.data || null;

		if ( options.data ) {
			var qString = [];

			for ( var key in options.data ) {
				qString.push( encodeURIComponent( key ) + "=" + encodeURIComponent( options.data[key] ) );

				options.data = qString.join( "&" );
			}
		}

		if ( options.cache === false && options.method.toUpperCase() === "GET" ) {
			url += "?_=" + new Date().getTime();
		}

		console.log( "Logging xhr variable:" ); // DEBUGGING
		console.log( xhr ); // DEBUGGING
		xhr.onreadystatechange = function() {
			console.log( "Logging xhr.readyState:" ); // DEBUGGING
			console.log( xhr.readyState ); // DEBUGGING

			if ( xhr.readyState === 1 ) {
				if ( options.before ) {
					options.before.call( xhr );
				}
			}

			if ( ( xhr.readyState === 4 ) && ( xhr.status === 200 || xhr.status === 304 ) ) {
				var contentType = xhr.getResponseHeader( "Content-Type" );
				console.log( "Logging response header content-type:" ); // DEBUGGING
				console.log( contentType ); // DEBUGGING

				if ( options.complete ) {
					if ( contentType === "application/json;charset=UTF-8" ) {
						options.complete.call( xhr, JSON.parse( xhr.responseText ) );
					} else if ( contentType === "text/xml" || contentType === "application/xml;charset=UTF-8" ) {
						options.complete.call( xhr, xhr.responseXML );
					} else {
						options.complete.call( xhr, xhr.responseText );
					}
				}
			}
		};

		xhr.open( options.method, url, true );
		return xhr;
	};

	return {
		ajax: function( url, options ) {
			var newXHR = createXHR( url, options );

			newXHR.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );

			if ( options.method.toUpperCase() === "POST" ) {
				newXHR.setRequestHeader( "Content-Type", "application/x-www-form-urlencode" );
			}

			newXHR.send( options.data );

			console.log( "Logging newXHR variable from ajax method:" ); // DEBUGGING
			console.log( newXHR ); // DEBUGGING
			console.log( "Logging createXHR variable from ajax method:" ); // DEBUGGING
			console.log( createXHR ); // DEBUGGING
		}
	}
} )();
