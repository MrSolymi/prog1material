# 1. Ismerkedés a Java nyelvvel

A Java egy objektumorientált, erősen típusos programozási nyelv. Ebben a témakörben a nyelv alapjait nézzük meg: milyen típusokat ismer, hogyan tárolhatunk benne több azonos típusú értéket, és hogyan szervezzük a kódot metódusokba.

## Primitív és referencia típusok

A Java típusai két nagy csoportba sorolhatók.

A **primitív típusok** a legegyszerűbb értékeket tárolják közvetlenül a változóban. A leggyakoribbak:

- `int` – egész szám (32 bit), például `int db = 10;`
- `long` – nagyobb egész szám, a számhoz `L` utótag kell: `long nagy = 9000000000L;`
- `double` – tizedestört, például `double pi = 3.14;`
- `boolean` – logikai érték: `true` vagy `false`
- `char` – egyetlen karakter, aposztrófok között: `char betu = 'A';`

```java
public class Primitivek {
    public static void main(String[] args) {
        int kor = 21;
        double atlag = 4.75;
        boolean vizsgazott = true;
        char osztaly = 'B';

        System.out.println("Kor: " + kor);
        System.out.println("Átlag: " + atlag);
        System.out.println("Vizsgázott: " + vizsgazott);
        System.out.println("Osztály: " + osztaly);
    }
}
```

**Magyarázat:** Minden változónak meg kell adni a típusát (`int`, `double`, ...), és a változó neve után értéket adhatunk neki az `=` jellel. A `println` a képernyőre írja a megadott szöveget; a `+` jellel szöveget és értéket fűzhetünk össze.

A **referencia típusok** nem magát az értéket tárolják, hanem egy hivatkozást (referenciát) az objektumra. A legismertebb példa a `String`, amelyről a 2. témakörben részletesen lesz szó:

```java
String nev = "Anna";
```

Itt a `nev` változó egy `String` objektumra hivatkozik. A referencia típusú változónak az értéke lehet `null` is, ami azt jelenti, hogy jelenleg nem mutat semmilyen objektumra.

## Egydimenziós tömb (röviden)

A tömb rögzített méretű, azonos típusú elemek sorozata. Létrehozásához meg kell adni a típust, a szögletes zárójeleket és az elemek számát:

```java
public class TombBevezeto {
    public static void main(String[] args) {
        int[] jegyek = new int[3];
        jegyek[0] = 5;
        jegyek[1] = 4;
        jegyek[2] = 3;

        int[] szamok = {10, 20, 30};

        System.out.println("Első jegy: " + jegyek[0]);
        System.out.println("Tömb hossza: " + szamok.length);
    }
}
```

**Magyarázat:** Az elemekre nullától kezdve, indexel hivatkozunk (`jegyek[0]` az első elem). A `length` tulajdonság adja meg a tömb méretét. A részletes tömbkezelést az 5. témakörben tárgyaljuk.

## Metódusok

A metódus egy összefüggő feladatot végző kódrészlet, amelyet névvel látunk el, és szükség szerint többször is meghívhatunk. Felépítése: láthatóság, visszatérési típus, név, paraméterlista, majd a törzs kapcsos zárójelek között.

```java
public class Metodusok {
    public static void main(String[] args) {
        int osszeg = osszead(4, 7);
        System.out.println("Összeg: " + osszeg);
        udvozol("Péter");
    }

    // Két egész számot vár, és visszaadja az összegüket
    public static int osszead(int a, int b) {
        return a + b;
    }

    // Nincs visszatérési értéke (void), csak kiír valamit
    public static void udvozol(String nev) {
        System.out.println("Szia, " + nev + "!");
    }
}
```

**Magyarázat:** Az `osszead` metódus visszatérési típusa `int`, ezért a `return` utasítással egész számot ad vissza. Az `udvozol` metódus `void` típusú, azaz nem ad vissza értéket. A `main` metódus a program belépési pontja, ahonnan a futás elindul.

## Összefoglalás

- A Java primitív típusai (például `int`, `double`, `boolean`, `char`) közvetlenül az értéket tárolják.
- A referencia típusok (például `String`) egy objektumra mutató hivatkozást tárolnak, és lehetnek `null` értékűek.
- A tömb azonos típusú elemek rögzített méretű sorozata, indexelése nullától indul.
- A metódusok újrafelhasználható kódblokkok, paraméterekkel és visszatérési értékkel.

## Ellenőrző kérdések

1. Melyik primitív típus alkalmas egy tizedestört tárolására?
2. Mi a különbség a primitív és a referencia típus között az értéktárolás szempontjából?
3. Mi lesz a `jegyek[3]` kifejezés eredménye, ha a tömbnek csak három eleme van?
4. Miért kell a `void` kulcsszó az `udvozol` metódusnál?
