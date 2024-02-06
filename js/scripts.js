$(document).ready(function () {
	/* determinamos ancho y alto de la pantalla del usuario */
	var ancho = $(window).width();
	var alto = $(window).height();

	/* si la pantalla es mayor a móviles cargamos los scrollbar y googleMaps */
	if(ancho > 768){
		scrollBar();
	}

	/* si la pantalla es mayor al tamaño más chico desktop cargamos el efecto parallax */
	function parallax(){
	  	if(ancho>1025){
			$('.parallax').each(function(){
		      var $bgobj = $(this);
		      $(window).scroll(function() {
		          var yPos = -($(window).scrollTop() / $bgobj.data('speed')); 
		          var coords = '50% '+ yPos + 'px';
		          $bgobj.css({ backgroundPosition: coords });
		      }); 
		    });
			$('.parallaxDos').each(function(){
		      var $bgobj = $(this);
		      $(window).scroll(function() {
		          var yPos = -($(window).scrollTop() / $bgobj.data('speed') - alto/2); 
		          var coords = '0% '+ yPos + 'px';
		          $bgobj.css({ backgroundPosition: coords });
		      }); 
		    });	                                
	  	}
	}
	parallax();

  	/* determinados eventos al redimensionar pantalla */
	$(window).resize(function() {
		var ancho = $(window).width();
		var alto = $(window).height();	
		if(ancho > 1025){
  		  parallax();
		}			
	});  	

	/* animamos anclas en el evento click de la botonera */
    $('#menu li a').click(function(event){  
        var seccion = $(this).attr("href");
        $.scrollTo(seccion,1000);
        event.preventDefault();
    }); 
	
	/* seteamos scrollbar plugin */
	function scrollBar(){
		$(".scroll, .scroll2").mCustomScrollbar({
	 		autoDraggerLength:false
		});
	}

	$('#in, #out').click(function(){
		$('#ui-datepicker-div').append('<p>Check In</p>');
	});	
					
	/* agregamos datepicker */
    $("#in, #out").datepicker({ 
		minDate: 0, 
		showAnim: "show",
		prevText: "",
		nextText: ""
	});

    /* agregamos evento touch al carousel */
	$('.carousel').hammer().on('swipeleft', function(){
		$('.carousel').carousel('next'); 
	});
	$('.carousel').hammer().on('swiperight', function(){
		$('.carousel').carousel('prev'); 
	});

    $('#contactoform').each(function () {
        this.reset();
    });

    var optContacto = {
        target: '#respuesta',
        type: 'post',
        clearForm: true,
        resetForm: true,
        beforeSubmit: validaContacto,
        success: respuestaContacto
    };

    $('#contactoform').ajaxForm(optContacto);

    function validaContacto(formData, jqForm, optContacto) {
        var nombre = $('input[name=nombre]').fieldValue();
        var emailreg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $('input[name=mail]').fieldValue();
        var mensaje = $('textarea[name=consulta]').fieldValue();

        if (!nombre[0]) {
            $('input[name=nombre]').focus();
            $("#respuesta").addClass("encender").html("¡Debe ingresar un nombre!");
            return false;
        } else {
            $("#respuesta").removeClass("encender").html();
        }

        if ($('#email').val() == "" || !emailreg.test($("#email").val())) {
            $('input[name=mail]').focus();
            $("#respuesta").addClass("encender").html("¡Debe ingresar un email!");
            return false;
        } else {
            $("#respuesta").removeClass("encender").html();
        }

        if (!mensaje[0]) {
            $('textarea[name=consulta]').focus();
            $("#respuesta").addClass("encender").html("¡Debe ingresar una consulta!");
            return false;
        } else {
            $("#respuesta").removeClass("encender").html();
        }

        $("#respuesta").addClass("encender").html("Enviando...");
    }

    function respuestaContacto(responseText, statusText, xhr, $form) {

        setTimeout(function () {
            $("#respuesta").removeClass("encender");
        }, 5000);
    }

});