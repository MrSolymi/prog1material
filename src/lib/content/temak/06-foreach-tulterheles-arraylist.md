# 6. Foreach ciklus, metódusok túlterhelése, ArrayList

Ebben a témakörben három hasznos eszközt ismerünk meg: a tömbök és gyűjtemények egyszerű bejárására szolgáló `foreach` ciklust, a metódus-túlterhelést, és a dinamikus méretű `ArrayList` osztályt.

## Foreach ciklus

A `foreach` (más néven növelt `for`) ciklus minden elemet egyszer bejár egy tömbön vagy gyűjteményen. Nem kell indexet kezelni, ezért kevesebb hibalehetőséget rejt.

```java
public class ForeachPelda {
    public static void main(String[] args) {
        int[] jegyek = {5, 4, 4, 3, 5};

        int osszeg = 0;
        for (int jegy : jegyek) {
            osszeg += jegy;
        }
        System.out.println("Jegyek összege: " + osszeg);
    }
}
```

**Magyarázat:** A `for (int jegy : jegyek)` jelentése: minden `jegy` változóba sorban a `jegyek` tömb egy eleme kerül. A ciklusban az elemek csak olvashatók, az indexük nem érhető el. Ha az index is kell, vagy az elemet módosítani szeretnénk, a hagyományos `for` ciklust használjuk.

## Metódusok túlterhelése

A túlterhelés (overloading) azt jelenti, hogy egy osztályban több, azonos nevű metódus szerepelhet, ha a paraméterlistájuk különbözik (más számú vagy más típusú paraméterekkel). A visszatérési típus önmagában nem elegendő a megkülönböztetéshez.

```java
public class Osszeado {
    public static int osszead(int a, int b) {
        return a + b;
    }

    public static int osszead(int a, int b, int c) {
        return a + b + c;
    }

    public static double osszead(double a, double b) {
        return a + b;
    }
}
```

```java
public class TulterhelesTeszt {
    public static void main(String[] args) {
        System.out.println(Osszeado.osszead(2, 3));       // 5
        System.out.println(Osszeado.osszead(2, 3, 4));    // 9
        System.out.println(Osszeado.osszead(2.5, 3.5));   // 6.0
    }
}
```

**Magyarázat:** A fordító a hívás paraméterei alapján választja ki a megfelelő változatot. Ez hasznos, mert ugyanazt a műveletet különböző bemenetekre is elérhetővé teszi, név-ütközés nélkül.

## Függvényből több érték visszaadása

Java-ban egy metódus csak egy értéket adhat vissza. Több érték együttes visszaadására több lehetőség van: egy tömb, egy saját osztály, vagy egy gyűjtemény. Egyszerű esetben a tömb a legkényelmesebb:

```java
public class MinMax {
    public static int[] minMax(int[] szamok) {
        int min = szamok[0];
        int max = szamok[0];
        for (int szam : szamok) {
            if (szam < min) min = szam;
            if (szam > max) max = szam;
        }
        return new int[] {min, max};
    }
}
```

```java
public class MinMaxTeszt {
    public static void main(String[] args) {
        int[] eredmeny = MinMax.minMax(new int[] {7, 2, 9, 4});
        System.out.println("Min: " + eredmeny[0] + ", Max: " + eredmeny[1]);
    }
}
```

**Magyarázat:** A metódus egy kételemű tömböt ad vissza, amelynek első eleme a minimum, második eleme a maximum. Ha ennél több adatot kell visszaadni, érdemes saját osztályt készíteni, amely a kapcsolódó mezőket egyben tartja.

## Dinamikus tömb: ArrayList

Az `ArrayList` a `java.util` csomag osztálya, amely automatikusan nő és csökken az elemek számának megfelelően. Használatához importálni kell:

```java
import java.util.ArrayList;

public class ArrayListPelda {
    public static void main(String[] args) {
        ArrayList<String> nevek = new ArrayList<>();
        nevek.add("Anna");
        nevek.add("Béla");
        nevek.add("Cecília");

        System.out.println("Első: " + nevek.get(0));
        System.out.println("Méret: " + nevek.size());

        nevek.remove("Béla");

        for (String nev : nevek) {
            System.out.println(nev);
        }
    }
}
```

**Magyarázat:** Az `ArrayList<String>` csak sztringeket tárol; a szögletes zárójelben adjuk meg az elem típusát. Az `add` új elemet fűz a végére, a `get(index)` indexszel olvas, a `size()` az elemek számát adja, a `remove` pedig eltávolítja az adott elemet. Fontos, hogy az `ArrayList` csak referencia típusokat tárol, primitív típusok helyett a wrapper osztályokat (például `Integer`) kell használni, erről a 7. témakörben lesz szó.

## Összefoglalás

- A `foreach` ciklus sorban bejárja a tömb vagy gyűjtemény elemeit, indexkezelés nélkül.
- A metódus-túlterhelés azonos nevű metódusok használatát teszi lehetővé, eltérő paraméterlistával.
- Több érték visszaadására tömböt vagy saját osztályt használhatunk.
- Az `ArrayList` dinamikusan változtatja a méretét; az elemeket `add`, `get`, `remove` és `size` metódusokkal kezeljük.

## Ellenőrző kérdések

1. Mikor nem használható a `foreach` ciklus egy tömb bejárására?
2. Mi szükséges ahhoz, hogy két metódus túlterhelt legyen? Elég-e csak a visszatérési típus eltérése?
3. Miért kell az `ArrayList`-ben `Integer` típust használni `int` helyett?
4. Mi a különbség a `remove(int index)` és a `remove(Object o)` metódusok között?
