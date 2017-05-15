POZYX-03
===========
Welkom op de repo voor het indoor positioning project in opdracht van POZYX. Hier vindt u onder andere de broncode en logboeken van de auteurs.


Auteurs
============

* Brecht Carnewal
* Rémy D'heygere
* Tom Dorchain
* Pieter-Jan Vandenberghe
* Jonas Vermassen 
 

Bestanden en Mappen
========

logboeken
------
Logboeken vindt u in de hoofdmap van deze repo. Dit zijn .csv-bestanden met naamgeving Voornaam_Achternaam.csv

src
------
De map src bevat de broncode voor het project samen met instructies om de code uit te kunnen voeren.

verslag
------
De laatste versie van ons verslag, geüpdatet per sprint.


Applicatie
============

_De laatste werkende versie is steeds beschikbaar op http://pozyx-03.project.tiwi.be_

Op de homepagina (dashboard) kan een plattegrond worden toegevoegd. Dit kan via de dropzone of via het menu rechtsboven.
Deze wordt gebruikt als ondergrond om de tags te visualiseren.

Rechtsboven kan via een button geswitched worden tussen de verschillende toegevoegde kaarten.

Links in de menu balk geeft 'Tags' een overzicht van de toegevoegde tags.
Tags kunnen worden gefilterd op basis van id, naam of label, relevante zoektermen kunnen in de zoekbalk worden ingetikt zonder specificatie van de zoekterm. Een overzicht van de labels is ook bovenaan beschikbaar en kunnen worden aangeklikt als filter met eenvoudige toegang. Verder kan er ook op batterijpercentage worden gefilterd met de schuifbar.

Het menu 'Anchors' geeft een overzicht van de anchors met hun eigenschappen. Anchors dienen op voorhand ingesteld te zijn en worden niet bewerkt via de userinterface. Door het gelimiteerd aantal anchors is er hier ook geen filtering- of zoeksysteem voorzien. 

Boven de plattegrond is er een menubalk die het beheren van zones mogelijk maakt.

De knop 'create zone' begint het aanmaken van een nieuwe zone. Per klik worden de hoekpunten van de nieuwe zone als polygon bepaald en men sluit de figuur door bij het laatste punt te dubbelklikken.
Het dialoogvenster om de zone op te slaan laat toe de zone te benoemen en een kleur toe te kennen.
De wijzigingen worden uiteindelijk bevestigt of verworpen met de 'create zone' of 'cancel' optie. 

Linksboven de menubalk van zones is er een toggle die zones kan verbergen. Verder is er nog een tweede toggle optie om zones te verwijderen. In deze modus krijgen de zones een kruis in de linkerbovenhoek om ze één per één op de plattegrond te verwijderen. Hiervoor moeten de zones eerst zichtbaar staan. 




