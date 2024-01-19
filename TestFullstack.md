⁃	U postojećem repositoriju FullStack aplikacije pullati zadnji main branch
⁃	Kreirati novi branch naziva FinalTest-ImePrezime

1.	Frontend: kreirati layout kao sa slike, sa sljedećim funkcionalnostima:

-	Toggle button: definira state da li je semafor aktivan, ako je OFF svake 2 sekunde žuto svjetlo se pali i gasi (light-yellow, dark-yellow). Ako je ON, simlacija semafora je upaljena: 5 sekundi crveno, 2 sekunde crveno i žuto, 5 sekundi crveno, 3 sekunde žuto. Button Next odmah aktivira sljedeći korak(ako je crveno, onda crveno+žuto itd.). Padajući izbornik (Select) definira na kojem jeziku se prikazuje tekst stranice. Lista jezika se dobiva fetchom sa Backenda, methodom GET rute '/languages'. Text statusa semafora se dobiva fetch metodom POST rute 'languages/translate' gdje se u payloadu šalje sljedeći json {„language“: „<izabrani_jezik>“; „translationName“: „<naziv_translacije>“}.


![Test Fullstack Frontend2](https://github.com/markoduspara/Globalsoft_CodeCamp_Fullstack_vol1/assets/37013131/2c1076b2-00f1-44dd-a81b-e586311f6484)


2.
BACKEND: kreirati semafor.sql file koji će kreirati strukturu ER diagrama na slici. Kreirati dvije backend rute koje će podržavati frontend funkcionalnosti:
-	GET /languages – vraća sve jezike definirane u tablici „Languages“
-	POST /languages/translate – vraća tekst translacije za primljeni payload naveden u Frontend zadatku.
  
![Test Fullstack ER drawio](https://github.com/markoduspara/Globalsoft_CodeCamp_Fullstack_vol1/assets/37013131/59e45f9c-d756-467a-84b5-ad5f5f0cec2f)


3.

DOCKER: Kreirati Docker file koji će excutati kreirani semafor.sql file, te insertati predefinirane podatke:

Languages: EN, DE,HR
Translation_names: semafor_red,semafor_red_yellow, semafor_green, semafor_yellow, semafor_off
Translations: proizvoljne translacije za names!
