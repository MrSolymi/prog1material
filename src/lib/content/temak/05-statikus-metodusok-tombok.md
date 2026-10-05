# 5. Statikus metódusok, Math osztály, final, tömbök

Ebben a témakörben a statikus tagok és a `final` kulcsszó használatát nézzük meg, majd részletesen foglalkozunk az egydimenziós tömbökkel és azok műveleteivel.

## Statikus metódusok

A `static` metódus az osztályhoz tartozik, nem egy objektumhoz, ezért objektum létrehozása nélkül meghívható. Nem férhet hozzá a példányváltozókhoz, mert nincs „aktuális objektum”.

```java
public class Segedeszkozok {
    public static int negyzet(int szam) {
        return szam * szam;
    }
}
```

```java
public class StatikusHivas {
    public static void main(String[] args) {
        System.out.println(Segedeszkozok.negyzet(7)); // 49
    }
}
```

**Magyarázat:** A `negyzet` metódust az osztály nevén keresztül hívjuk meg. Hasznos segédfüggvényekhez, amelyek nem igényelnek objektum állapotot. A `main` metódus is statikus, ezért tud a program indulásakor futni objektum nélkül.

## A Math osztály

A `java.lang.Math` osztály statikus matematikai függvényeket tartalmaz, amelyeket külön importálás nélkül használhatunk:

```java
public class MathPelda {
    public static void main(String[] args) {
        System.out.println(Math.abs(-12));        // 12
        System.out.println(Math.max(3, 9));       // 9
        System.out.println(Math.pow(2, 10));      // 1024.0
        System.out.println(Math.sqrt(144));       // 12.0
        System.out.println(Math.round(2.6));      // 3
        System.out.println(Math.PI);              // 3.141592653589793
    }
}
```

**Magyarázat:** A `Math.pow` és a `Math.sqrt` `double` értéket ad vissza, míg a `Math.round` egész számra kerekít. A `Math.PI` konstans a pi közelítő értékét adja.

## A final kulcsszó

A `final` jelzi, hogy egy változó értéke nem módosítható a kezdeti értékadás után. Konstansok készítésére használjuk, és a nagybetűs elnevezés a szokásos.

```java
public class Kor {
    public static final double PI = 3.14159;

    public static double terulet(double sugar) {
        return PI * sugar * sugar;
    }
}
```

**Magyarázat:** A `final` mezőt egyszer kell értékkel ellátni, utána nem írható felül. A `static final` kombináció az osztályhoz tartozó, állandó értéket jelöli.

## Egydimenziós tömb részletesen

A tömb rögzített méretű, azonos típusú elemek sorozata. A tömb létrehozása után a mérete nem változtatható meg.

```java
public class TombLetrehozas {
    public static void main(String[] args) {
        int[] a = new int[5];          // 5 nulla érték
        String[] b = new String[3];    // 3 null érték
        double[] c = {1.5, 2.5, 3.5};  // inicializált tömb

        System.out.println(a.length);  // 5
        System.out.println(a[0]);      // 0
        System.out.println(b[0]);      // null
        System.out.println(c[2]);      // 3.5
    }
}
```

**Magyarázat:** A `new` operátorral megadott méretű tömb minden eleme a típus alapértelmezett értékét kapja (számoknál 0, referenciáknál `null`). Ha a tömböt kapcsos zárójelekkel inicializáljuk, az elemek értékét mi adjuk meg. Az indexelés nullától kezdődik, a legnagyobb érvényes index a `length - 1`.

Ha a tömb érvénytelen indexre hivatkozik, `ArrayIndexOutOfBoundsException` hiba keletkezik:

```java
int[] t = new int[3];
t[3] = 10; // ArrayIndexOutOfBoundsException
```

## Tömb műveletek

A tömbökön gyakran végzünk bejárást, keresést és összegzést. Az alábbi példa ezeket mutatja be:

```java
public class TombMuveletek {
    public static void main(String[] args) {
        int[] szamok = {4, 8, 15, 16, 23, 42};

        int osszeg = 0;
        int maximum = szamok[0];

        for (int i = 0; i < szamok.length; i++) {
            osszeg += szamok[i];
            if (szamok[i] > maximum) {
                maximum = szamok[i];
            }
        }

        System.out.println("Összeg: " + osszeg);
        System.out.println("Maximum: " + maximum);
        System.out.println("Átlag: " + (double) osszeg / szamok.length);
    }
}
```

**Magyarázat:** A `for` ciklus a tömb minden elemét végigjárja. Az összegzésnél és a maximum kereséseknél az első elemet kezdőértékként használjuk. Az átlagnál a `(double)` típuskonverzióval biztosítjuk, hogy az osztás tizedestörtet adjon, ne egész osztást.

## Összefoglalás

- A `static` metódus osztályszintű, objektum nélkül meghívható; a `Math` osztály statikus függvényeket kínál.
- A `final` változó értéke a kezdeti értékadás után nem módosítható.
- A tömb rögzített méretű; az elemek alapértelmezett értéke típusfüggő.
- A tömbök bejárására a `for` ciklus a leggyakoribb eszköz; érvénytelen index kivételt dob.

## Ellenőrző kérdések

1. Miért nem használhat egy statikus metódus példányváltozót közvetlenül?
2. Mi lesz a `new boolean[2]` tömb elemeinek értéke?
3. Mit ír ki a `Math.round(-2.5)` kifejezés? (Gondolj át a kerekítés szabályaira!)
4. Miért adja az `(double) osszeg / szamok.length` kifejezés tizedestörtet?
