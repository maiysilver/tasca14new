// fichero xml que está en el servidor rawgit
var url="xml/preguntas.xml";

//Variables
var i = 0;
var z = 0;
var x =0;
var a=0;
var b=0;
var c=0;
var pregunta = 0;
var numRespuestas = [];
var respuestas = [];
var nota = 0;


var xhttp = new XMLHttpRequest();
window.onload = function(){
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// función personalizada que gestiona la respuesta a la petición de fichero
			gestionarXml(this);
		}
	};
	xhttp.open("GET", url, true); //url del fichero
	xhttp.send();
	//************************************************************************************************************************

	//CORREGIR al apretar el botón
	formElement=document.getElementById("formulario");
	formElement.onsubmit=function(){
		inicializar();
		if (comprobar()){
			corregirText();
			corregirSelect();
			corregirMultiple();
			corregirCheckbox();
			corregirRadio();
			mostrarNota();


		}
		return false;
	}

}
//************************************************************************************************************************
// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML;
	//Text
	for(pregunta=0;pregunta<2;pregunta++){
		var tituloInput=xmlDoc.getElementsByTagName("title")[pregunta].innerHTML;
		ponerDatosInputHtml(tituloInput);
	}
	//Select Normal
	for (pregunta=2; pregunta<4; pregunta++) {
		var opcionesSelect = [];
		var nopt = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("option").length;
		var tituloSelect=xmlDoc.getElementsByTagName("title")[pregunta].innerHTML;
		for (i = 0; i < nopt; i++) {
			opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("option")[i].innerHTML;
		}
		ponerDatosSelectHtml(tituloSelect,opcionesSelect,pregunta);
	}
	//Select Multiples
	for (pregunta=4; pregunta<6; pregunta++) {
		var opcionesSelect = [];
		var nopt = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("option").length;
		var tituloMultiple=xmlDoc.getElementsByTagName("title")[pregunta].innerHTML;
		for (i = 0; i < nopt; i++) {
			opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("option")[i].innerHTML;
		}
		ponerDatosSelectHtml(tituloMultiple,opcionesSelect,pregunta);
	}
	//Checkbox

	for (pregunta=6; pregunta<8; pregunta++) {
        var opcionesSelect = [];
        var nopt = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName('option').length;
		var tituloCheckbox=xmlDoc.getElementsByTagName("title")[pregunta].innerHTML;
        for (i = 0; i < nopt; i++) {
			opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName('option')[i].innerHTML;
		}
        ponerDatosCheckboxHtml(tituloCheckbox,opcionesSelect, pregunta);
	}
	//Radio

	for (pregunta=8; pregunta<10; pregunta++) {
        var opcionesSelect = [];
        var nopt = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName('option').length;
		var tituloRadio=xmlDoc.getElementsByTagName("title")[pregunta].innerHTML;
        for (i = 0; i < nopt; i++) {
			opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName('option')[i].innerHTML;
		}

        ponerDatosRadioHtml(tituloRadio,opcionesSelect, pregunta);
	}
	//Respuestas

	for (pregunta = 0; pregunta < 10; pregunta++) {

		numRespuestas[pregunta] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("answer").length;
		respuestas[pregunta] = [];

		for (i = 0; i < numRespuestas[pregunta]; i++) {

			respuestas[pregunta][i] = xmlDoc.getElementsByTagName("question")[pregunta].getElementsByTagName("answer")[i].innerHTML;

		}

	}
}
//Imprimir Respuestas
function ponerDatosInputHtml(t){
	document.getElementsByTagName("h2")[pregunta].innerHTML = t;
}
//Imprimir Select normal
function ponerDatosSelectHtml(t,opcionesSelect,pregunta) {
	document.getElementsByTagName("h2")[pregunta].innerHTML = t;
	var select = document.getElementsByTagName("select")[pregunta-2];
	for (i = 0; i < opcionesSelect.length; i++) {
        var option = document.createElement("option");
        option.text = opcionesSelect[i];
        option.value = i;
        select.options.add(option);
	}

}
//Imprimir Select  multiple
function ponerDatosMultipleHtml(t,opcionesSelect,pregunta) {
	document.getElementsByTagName("h2")[pregunta].innerHTML = t;
	var select = document.getElementsByTagName("select")[pregunta-2];
	for (i = 0; i < opcionesSelect.length; i++) {
        var option = document.createElement("option");
        option.text = opcionesSelect[i];
        option.value = i;
        select.options.add(option);

	}

}
//Imprimir Checkbox
function ponerDatosCheckboxHtml(t,opt, pregunta) {
	document.getElementsByTagName("h2")[pregunta].innerHTML = t;
	var checkboxCont = document.getElementsByClassName("checkbox")[pregunta-6];
	for (i = 0; i < opt.length; i++,z++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.htmlFor=("checkbox"+z);
		input.type="checkbox";
		input.id=("checkbox"+z);
		input.name=("checkbox"+c);
		input.value=i;
		checkboxCont.appendChild(input);
		checkboxCont.appendChild(label);
		checkboxCont.appendChild(document.createElement("br"));
		checkboxCont.appendChild(document.createElement("br"));
	}
	checkboxCont.appendChild(document.createElement("br"));
	c++;
}
//Imprimir Radio
function ponerDatosRadioHtml(t,opt,pregunta) {
	document.getElementsByTagName("h2")[pregunta].innerHTML = t;
	var radioCont = document.getElementsByClassName("radio")[pregunta-8];
	for (i = 0; i < opt.length; i++,x++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.htmlFor=("radio"+x);
		input.type="radio";
		input.name=("nombre"+a);
		input.id=("radio"+b,"radio"+x);
		input.value=i;
		radioCont.appendChild(input);
		radioCont.appendChild(label);
		radioCont.appendChild(document.createElement("br"));
		radioCont.appendChild(document.createElement("br"));
		b++
	}
	radioCont.appendChild(document.createElement("br"));
	a++;
}
//************************************************************************************************************************
//Corregir text
function corregirText(){

	for(pregunta=0; pregunta<2; pregunta++){

		if(respuestas[pregunta][0]==document.getElementsByTagName("input")[pregunta].value){

			darExplicacion("La respuesta " + (pregunta+1) + ": Es correcta +1 punto");

			nota+=1;

			}else{

			darExplicacion("La respuesta " + (pregunta+1) + ": Es incorrecta");

		}
	}
}
//Corregir select normal
function corregirSelect(){

	for(pregunta=2; pregunta<4; pregunta++){

		if(respuestas[pregunta][0]==document.getElementsByTagName("select")[pregunta-2].value){

			darExplicacion("La respuesta " + (pregunta+1) + ": Es correcta +1 punto");

			nota+=1;

			}else{

			darExplicacion("La respuesta " + (pregunta+1) + ": Es incorrecta");


		}
	}
}
//Select Multiple
function corregirMultiple(){
	for(pregunta=4;pregunta<6;pregunta++){

        var sel = document.getElementsByTagName("select")[pregunta-2];

        var Acertada=[];

        for(i=0; i<(sel.length); i++){

            var opt=sel.options[i];

            if(opt.selected){

            	Acertada[i]=false;

            	for(j=0; j<numRespuestas[pregunta]; j++){

            		if(i==respuestas[pregunta][j]) {

						Acertada[i]=true;
					}
				}
            	if(Acertada[i]){

					darExplicacion("La respuesta " + (pregunta+1) + ": Opción: " + i + " Es correcta +" + (1.0/numRespuestas[pregunta]).toFixed(2) + " puntos");

            		nota +=1.0/numRespuestas[pregunta];

					}else{

                	nota -=1.0/numRespuestas[pregunta];

					darExplicacion("La respuesta " + (pregunta+1) + ": Opción: " + i + " Es incorrecta -" + (1.0/numRespuestas[pregunta]).toFixed(2) + " puntos");


				}
			}
		}
	}
}
//Corregir checkbox
function corregirCheckbox(){

	var checkbox;

	for(pregunta=6;pregunta<8;pregunta++){

		var Acertada=[];

		if(pregunta==6){

			checkbox=document.getElementsByName("checkbox0");

			}else{

			checkbox=document.getElementsByName("checkbox1");
		}

		for(i=0; i<(checkbox.length); i++){

			if(checkbox[i].checked){

				Acertada[i]=false;

				for (j = 0; j<numRespuestas[pregunta]; j++) {

					if(i==respuestas[pregunta][j]) Acertada[i]=true;
				}

				if(Acertada[i]){

					darExplicacion("La respuesta " + (pregunta+1) + ": Opción: " + (i+1) + " Es correcta +" + (1.0/numRespuestas[pregunta]).toFixed(2) + " puntos");

					nota +=1.0/numRespuestas[pregunta];

					}else{

					darExplicacion("La respuesta " + (pregunta+1) + ": Opción: " + (i+1) + " Es incorrecta -" + (1.0/numRespuestas[pregunta]).toFixed(2) + " puntos");

					nota -=1.0/numRespuestas[pregunta];

					// incorrecto=true;
				}
			}
		}
	}
}
//Corregir radio
function corregirRadio(){

	var f=formElement;

	for (pregunta=8; pregunta<10; pregunta++) {

		var radio;

		if(pregunta==8){

			radio=f.nombre0;

			}else{

			radio=f.nombre1;
		}
		if(radio.value==respuestas[pregunta][0]){

			darExplicacion("La respuesta " + (pregunta+1) + ": Es correcta +1 punto");

			nota+=1;

			}else{

			darExplicacion("La respuesta " + (pregunta+1) + ": Es incorrecta");

		}
	}
}

//************************************************************************************************************************
//Comprobar que las preguntas estan respondidas
function comprobar(){
	var f=formElement;
	// text
	for(pregunta=0;pregunta<2;pregunta++){

		if (f.elements[pregunta].value=="") {

			f.elements[pregunta].focus();

			alert("Tienes que contestar la pregunta "+(pregunta +1));

			return false;
		}
	}
    //select normal
	for(pregunta=2;pregunta<4;pregunta++){

		if (f.elements[pregunta].selectedIndex==0) {

			f.elements[pregunta].focus();

			alert("Tienes que contestar toda la pregunta "+(pregunta +1));

			return false;
		}
	}


	//select multiple
	for(pregunta=4;pregunta<6;pregunta++){
		var multipleRespondido=false;
        for(i=0;i<(f.elements[pregunta].length);i++){
            var opt=f.elements[pregunta].options[i];
            if(opt.selected){
                multipleRespondido=true;
			}
		}
        if (!multipleRespondido) {
			f.elements[pregunta].focus();
			alert("Tienes que contestar la pregunta "+(pregunta +1));
			return false;
		}
	}
	//Checkbox
    for(pregunta=6;pregunta<8;pregunta++){
        var checked=false;
        var nombre;
        if (pregunta==6){
            nombre=f.checkbox0;
			} else {
			nombre=f.checkbox1;
		}
        for (i = 0; i < nombre.length; i++) {
            if (nombre[i].checked) {
				checked=true;
			}
		}
        if (!checked) {
			nombre[0].focus();
			alert("Tienes que contestar la pregunta "+(pregunta +1));
			return false;
		}
	}
	// radio
	for(pregunta=8;pregunta<10;pregunta++){
		var nombreRadio;
        if (pregunta==8){
            nombreRadio=f.nombre0;
			} else {
            nombreRadio=f.nombre1;
		}
        if (nombreRadio.value=="") {
            nombreRadio[0].focus();
            alert("Tienes que contestar la pregunta "+(pregunta +1));
            return false;
		}
	}
	return true;
}

//************************************************************************************************************************
//Presentacion respuestas
function mostrarNota(){
	var p = document.createElement("h2");
	if(nota<0){
		nota=0;
	}
	var node = document.createTextNode("Tu nota es: " + nota.toFixed(2));
	p.appendChild(node);
	document.getElementById("nota").appendChild(p);
	document.getElementById("preguntas").style.display="none";
	document.getElementById("contenedor").style.display="inline-block";
	window.location.hash = "#nota";
}

function darExplicacion(e) {
    var p = document.createElement("h4");
    var node = document.createTextNode(" - " + e);
    p.appendChild(node);
    document.getElementById("Resultado").appendChild(p);
}


//Inicializar
function inicializar(){
	nota=0;
}
//***************************************************************************************************************************
