var map = L.map('mapa').setView([51.112, 17.034], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 20,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addPopUpBudynki(feature, layer) {
	//console.log(feature)
	var nazwa = "<b>" + feature.properties.nazwa_ob + "</b>";
	var opis = feature.properties.opis;
	var popup_content = nazwa + "<br>" + opis;
	
	layer.bindPopup(popup_content);
}

function addPopUpGastro(feature, layer) {
	var pr = feature.properties;
	var nazwa = pr.nazwa;
	var link = pr.link;
	var opis = pr.opis;
	var fotka = pr.fotka;
	
	var tekst = "<b>" + nazwa + "</b><br>"
	tekst += ("<a href=\"" + link + "\">" + "Odwiedź stronę!<\a><br>");

	
	if (fotka && fotka.length > 1) {
		// tekst += ("<img alt=\"zdjęcie: " + fotka + "\" src=\"img/" + fotka + "\">");
		tekst += ("<p><img class=\"obrazek\" alt=\"zdjęcie: " + nazwa + "\" src=\"img/" + fotka + "\" onerror=\"this.onerror=null; this.remove();\"></p>");
	}
	tekst += ("<p>" + opis + "<\p>");
	
	layer.bindPopup(tekst);
}


//function gatro_style(feature) {
	//return {color: "#b87700"}
//}

var budynki_lyr = L.geoJSON(budynki_igrr, {onEachFeature: addPopUpBudynki}).addTo(map);
var gastro_lyr = L.geoJSON(gastrowro, {
	pointToLayer: function(feature, latlng) {
		//#b87700
		return L.circleMarker(latlng, {color: '#dd8800', fill: true})
	},
	onEachFeature: addPopUpGastro
}).addTo(map);

var warstwy = {
	"budynki Instytutu": budynki_lyr,
	"gastroWrocław by ŁP": gastro_lyr
}
var layerControl = L.control.layers(null, warstwy).addTo(map);

new L.Control.SimpleLocate({
    position: "topleft",
    className: "button-locate",
    afterClick: (result) => {
        // Do something after the button is clicked.
    },
    afterMarkerAdd: () => {
        // Do something after the marker (displaying the device's location and orientation) is added.
    },
    afterDeviceMove: (event) => {
        // Do something after the device moves.
    }
}).addTo(map);

