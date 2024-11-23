# TechTonic

---

## Despre Proiect:

### Acesta este un site de e-commerce care vinde componente de calculatoare.

### Acest site este proiectul final pentru cursul de Web Front End Development DigitalStack.

## Cerință proiect:

Creati 4 pagini html, in care sa includeti elemente de javascript si css (fisiere separate), care sa implementeze functionalitatile necesare unei aplicatii de genul magazin electronic (folositi tehnica AJAX si mapati raspunsul primit de la server pe clase javascript):

- index.html

  - [x] pagina ce afiseaza lista de prodose pe care le primeste de la un server in format JSON
  - [x] cererea catre server se face folosind tehnica AJAX
  - [x] in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini
        [tema_talcioc_index.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/d61754ef-cbb3-49ce-9c08-404845edc44f/a12687f9-70ee-4b12-9155-e55248f213f5/tema_talcioc_index.mp4)

- details.html

  - [x] acesata pagina primeste id-ul produsului ca si query parameter(ex: details.html?id=0, unde 0 este id-ul produsului)
  - [x] in aceasta pagina vor fi afisate: imaginea produsului, nume, descrierea, pretul, numarul de produse din stoc
  - [x] tot in pagina va fi afisat si un buton "adauga in cos": la apasarea acestui buton, in partea de sus a ecranului, va aparea un mesaj ce va avertiza utilizatorul ca produsul din imagine a fost adaugat in cosul de cumparaturi
  - [x] toate produsele adaugate in cos vor fi stocate in memoria browserului, folosind functionalitatea localstorage
  - [x] in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini
        [tema_talcioc_details.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/d61754ef-cbb3-49ce-9c08-404845edc44f/f385fef1-9e83-48b6-9d15-1cfc92bec4c8/tema_talcioc_details.mp4)

- cart.html

  - [x] aceasta pagina citeste toate elementele salvate in localstorage si le afiseaza sub forma unui tabel
  - [x] pe fiecare linie din tabel, ce reprezinta produsele cumparate se pot face mai multe actiuni:
    - [x] sa modificam cantitatea unui produs adaugat in cos (increase/decrease)
    - [x] sa renuntam la un produs adaugat in cos, printr-o functie de "Remove"
    - [ ] numele fiecarui produs din lista, contine un link catre pagina de detalii a produsului adaugat in cos
  - [x] de fiecare data cand continutul tabelului se modifica, totalul si subtotalurile vor fi calculate din nou
  - [x] in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini

  [tema_talcioc_cart.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/d61754ef-cbb3-49ce-9c08-404845edc44f/d56af4ef-f2eb-44e8-afb2-37287d0c7285/tema_talcioc_cart.mp4)

- admin.html
  - [x] din pagina de admin, se pot gestiona produsele afisate in paginile index.html si details.html
  - [x] acesata pagina este doar o interfata grafica, ce comunica prin cereri AJAX cu un server, folosind verbele GET, POST, PUT, DELETE pentru a adauga si a actualiza lista de produse disponibile
  - [x] tabelul de produse, contine pe coloana de nume produs, un link care atunci cand va fi actionat de catre utilizator, va afisa pe ecran un formular de adaugare/editare a produselor
  - [x] fiecare produs va contine urmatorele informatii: imagine, nume, descriere, pret, cantitate stoc
  - [x] elementele din lista pot fi sterse din lista de pe server, folosind un buton "Remove"
