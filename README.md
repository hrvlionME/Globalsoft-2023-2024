# Globalsoft_CodeCamp_Fullstack_vol1

Inicijalna folder struktura

React uz vite i css module kao izbor css
Express uz mysql2 kao driver i mysql bazu

Upute:

1. Unutar backend foldera db_schema se nalazi schema za sql koju importate u Vaš mysql workbench ili pasteate u terminal mysql-a, kreirajući bazu i testnu tablicu koja služi samo za testiranje povezivosti sa bazom te će u budućnosti biti izbrisana.

2. "cd Globalsoft_CodeCamp_Fullstack_vol1/backend/" Vas pozicionira u direktorij za backend gdje je server.js entry point programa što se tiče backend strane. Npm install kako bi ste povukli sve potrebne dependencies, te pokrećete server uz skriptu : **npm run backend**

3. Unutar "config/" foldera se nalaze .env koji sadrži podatke za pristup bazi ( kasnije će biti sakriveno), i db.js koji exporta funkciju za povezivanje sa bazom.

4. Nakon što je baza kreirana da bi ste bili sigurni da je sve dobro spojeno pokrenite **npm run backend** i odite na "localhost:4000/test", ukoliko se kojim slučajem taj port već koristi promijenite u .env PORT. Ukoliko ste sve dobro napravili dobiti će te json sav sadržaj testne tablice (3 unosa).

5. Frontend dio se nalazi u direktoriju cd Globalsoft_CodeCamp_Fullstack_vol1/frontend/ . Npm install kako bi ste povukli sve potrebne dependencies, zatim skriptom **npm run frontend** koja pokreće vite.

6. Odlaskom na "localhost:3000" se pristupa našoj "aplikaciji" gdje renderamo naš App component koji u biti sadrži samo testnu Login komponentu i pripadajući css reset.
