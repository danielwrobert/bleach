( function( bleach ) {

	var link = document.getElementsByTagName( "a" )[0];

	var linkClick = function( evt ) {
		console.log( "Clicked!" ); // DEBUGGING
		console.log( bleach ); // DEBUGGING
		console.log( bleach.ajax ); // DEBUGGING

		evt.preventDefault();

		bleach.ajax( "example-data/ajax.txt", {
			method: "GET",
			cache: false,
			complete: function( response ) {
				console.log( response );

				console.log( "HALP!" ); // DEBUGGING
			}
		});
		//return false;
	};

	link.addEventListener( 'click', linkClick, false );

	var form = document.getElementsByTagName( "form" )[0];

	form.onsubmit = function() {
		var emailVal = document.getElementById( "email" ).value;
		var url = form.getAttribute( "action" );
		var body = document.getElementsByTagName( "body" )[0];
		var div = document.createElement( "div" );

		body.appendChild( div );
		var divElem = document.getElementsByTagName( "div" )[0];

		bleach.ajax( url, {
			method: "POST",
			data: {
				email: emailVal
			},
			before: function() {
				div.innerHTML = "<p>Loading...</p>";
			},
			complete: function( response ) {
				divElem.innerHTML = response;
			}
		} );

		return false;
	};

} )( BLEACH );