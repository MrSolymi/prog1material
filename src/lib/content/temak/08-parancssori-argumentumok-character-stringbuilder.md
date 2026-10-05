# 8. Parancssori argumentumok, Character, StringBuilder

Ebben a témakörben három hasznos eszközt nézünk meg: a programnak átadott parancssori argumentumokat, a karakterek vizsgálatára szolgáló `Character` osztályt, és a sok módosítást hatékonyan kezelő `StringBuilder` osztályt.

## Parancssori argumentumok

A `main` metódus paramétere, a `String[] args` tömb, a programnak indításkor átadott argumentumokat tartalmazza. Ezek szóközzel elválasztva írhatók a program neve után.

```java
public class Udvozlo {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Nem adtál meg nevet.");
            return;
        }
        System.out.println("Szia, " + args[0] + "!");
        System.out.println("Argumentumok száma: " + args.length);
    }
}
```

Futtatás:

```bash
java Udvozlo Anna
# Szia, Anna!
# Argumentumok száma: 1

java Udvozlo
# Nem adtál meg nevet.
```

**Magyarázat:** Az `args` tömb elemei sztringek, így számként használáshoz konvertálni kell őket (például `Integer.parseInt(args[0])`). Mindig ellenőrizzük az `args.length` értékét, mielőtt egy indexre hivatkoznánk, különben `ArrayIndexOutOfBoundsException` keletkezik.

## A Character osztály

A `Character` wrapper osztály statikus metódusokat tartalmaz egy karakter vizsgálatára és átalakítására:

```java
public class KarakterVizsgalat {
    public static void main(String[] args) {
        char c = 'a';

        System.out.println(Character.isLetter(c));      // true
        System.out.println(Character.isDigit('7'));     // true
        System.out.println(Character.isWhitespace(' ')); // true
        System.out.println(Character.isUpperCase(c));   // false
        System.out.println(Character.toUpperCase(c));   // A
    }
}
```

**Magyarázat:** A `Character` metódusok karakterkódot vizsgálnak, így a magyar ékezetes betűk is betűnek számítanak. Mivel a metódusok `char` típust várnak, a `toUpperCase` is új karaktert ad vissza, az eredeti változatlan marad.

## A StringBuilder osztály

A `String` megváltoztathatatlan, ezért ciklusban történő sztring-összefűzésnél minden lépésnél új objektum keletkezik, ami lassú lehet. A `StringBuilder` egy módosítható karaktersorozatot tárol, és helyben bővíti.

```java
public class StringBuilderPelda {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();

        for (int i = 1; i <= 5; i++) {
            sb.append(i).append(" ");
        }
        System.out.println(sb.toString());   // 1 2 3 4 5

        sb.insert(0, "Számok: ");           // beszúrás az elejére
        sb.reverse();                        // karakterek megfordítása
        System.out.println(sb);

        sb.setLength(0);                     // a tartalom törlése
        sb.append("Kész");
        System.out.println(sb.length());     // 4
    }
}
```

**Magyarázat:** Az `append` a végére fűz, az `insert` adott pozícióra szúr be, a `reverse` megfordítja a karaktereket, a `setLength(0)` pedig kiüríti a tartalmat. A `toString()` adja vissza a végeredményt `String` típusként, ha arra van szükség.

Sok összefűzés esetén a `StringBuilder` lényegesen gyorsabb, mint a `+` operátor ismételt használata.

## Összefoglalás

- A `main` argumentumai a `String[] args` tömbben érhetők el; használat előtt ellenőrizzük a számukat.
- A `Character` osztály statikus metódusai karakterek típusát vizsgálják (`isLetter`, `isDigit`, `isWhitespace`) és alakítják át.
- A `StringBuilder` módosítható, ezért sok összefűzésnél hatékonyabb, mint a `String`.
- Végeredményt a `toString()` metódussal kérhetünk `String` formában.

## Ellenőrző kérdések

1. Mi a típusa az `args` paraméternek, és miért kell ellenőrizni a hosszát?
2. Miért hatékonyabb a `StringBuilder` a `String` összefűzésnél ciklusban?
3. Mit ad vissza a `Character.isDigit('a')` hívás?
4. Mi a különbség az `append` és az `insert` metódus között?
