# 10. ZH #1 – Felkészülés

Ez a témakör az első zárthelyi dolgozatra (ZH #1) készít fel, amely az 1–9. témakörök anyagára épül. A feladatkiírás négy fő készséget kér: objektumok létrehozását, parancssori argumentumok kezelését, a felhasználótól bekért adat feldolgozását, valamint fájlból olvasást és fájlba írást. Az első kettőt korábbról már ismerjük, a harmadikhoz egy új eszközt, a `Scanner` osztályt vezetjük be, a negyediket pedig a `Scanner` és a `PrintWriter` segítségével valósítjuk meg.

## 1. Példányosítás, osztályok létrehozása

A 3. témakörben láttuk, hogy egy osztályból a `new` kulcsszóval hozunk létre objektumot, és a konstruktor állítja be a kezdeti állapotot.

```java
public class Diak {
    private String nev;
    private int jegy;

    public Diak(String nev, int jegy) {
        this.nev = nev;
        this.jegy = jegy;
    }

    @Override
    public String toString() {
        return nev + " - " + jegy;
    }
}
```

**Magyarázat:** A `Diak` osztálynak két mezője van, amelyeket a konstruktor állít be. A `toString` felülírása (13. témakör) azért kerül bele már most, hogy a példányt egyszerűen ki tudjuk írni – ez a ZH-n is hasznos trükk.

## 2. Parancssori argumentumok kezelése

A 8. témakörben megismert `String[] args` tömb a `main` metódusnak átadott argumentumokat tartalmazza. A ZH-s feladatokban gyakori, hogy az egyik argumentum egy fájlnév, egy másik pedig egy beállítás (például hány elemet dolgozzon fel a program).

```java
public class ArgumentumKezeles {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Add meg a fájl nevét paraméterként!");
            return;
        }
        String fajlnev = args[0];
        System.out.println("Használt fájl: " + fajlnev);
    }
}
```

**Magyarázat:** A fájlnevet és egyéb beállításokat érdemes a program elején, egyetlen helyen kiolvasni az `args` tömbből, és a hosszát mindig ellenőrizni, mielőtt hozzáférnénk egy indexéhez.

## 3. A felhasználótól bekért adat – a Scanner osztály

Eddig a programjaink nem kértek adatot a felhasználótól futás közben. A `java.util.Scanner` osztály a billentyűzetről (`System.in`) olvas be adatokat.

```java
import java.util.Scanner;

public class BekeresPelda {
    public static void main(String[] args) {
        Scanner be = new Scanner(System.in);

        System.out.print("Add meg a neved: ");
        String nev = be.nextLine();

        System.out.print("Add meg a jegyed (1-5): ");
        int jegy = be.nextInt();

        System.out.println(nev + " jegye: " + jegy);
    }
}
```

**Magyarázat:** A `nextLine()` egy teljes sort olvas be sztringként, a `nextInt()` egy egész számot vár. Hasonlóan létezik `nextDouble()` is tizedestörtekhez. Fontos buktató: ha `nextInt()` (vagy `nextDouble()`) után közvetlenül `nextLine()`-t hívunk, az első `nextLine()` az `nextInt()` után a sorban maradt sortörést olvassa be, és üres sztringet ad vissza. Ha ez gondot okoz, egy felesleges `be.nextLine()` hívással „elnyelhetjük” a maradék sortörést, vagy a bekért számot is `nextLine()` és `Integer.parseInt(...)` kombinációval olvashatjuk be.

```java
Scanner be = new Scanner(System.in);
int kor = Integer.parseInt(be.nextLine().trim()); // számot is sorként olvasunk be
```

A `Scanner`-t egy objektumból egyszer hozzuk létre, és a program végéig ugyanazt használjuk – nem kell minden beolvasáshoz újat létrehozni.

## 4. Fájlból olvasás és írás

A 9. témakörben a `java.nio.file.Files` osztállyal olvastunk fájlt. A `Scanner` erre is használható, ha egy `File` objektumot adunk neki, írásra pedig a `PrintWriter` a legegyszerűbb eszköz.

### Olvasás Scanner-rel

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FajlOlvasasScannerrel {
    public static void main(String[] args) {
        try {
            Scanner olvaso = new Scanner(new File("diakok.txt"));
            while (olvaso.hasNextLine()) {
                String sor = olvaso.nextLine();
                System.out.println(sor);
            }
            olvaso.close();
        } catch (FileNotFoundException e) {
            System.out.println("Nem található a fájl: " + e.getMessage());
        }
    }
}
```

**Magyarázat:** A `hasNextLine()` igazat ad vissza, amíg van beolvasható sor. Ha a fájl nem létezik, `FileNotFoundException` keletkezik, amelyet a 17. témakörben tanult `try-catch`-csel kezelünk. A `close()` hívással zárjuk a `Scanner`-t, ha végeztünk.

### Írás PrintWriter-rel

```java
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class FajlIrasPrintWriterrel {
    public static void main(String[] args) {
        try {
            boolean hozzafuzes = true;
            PrintWriter iro = new PrintWriter(new FileWriter("diakok.txt", hozzafuzes));
            iro.println("Kovács Anna - 5");
            iro.println("Nagy Béla - 4");
            iro.close();
            System.out.println("Mentés kész.");
        } catch (IOException e) {
            System.out.println("Nem sikerült írni a fájlt: " + e.getMessage());
        }
    }
}
```

**Magyarázat:** A `FileWriter` második paramétere (`true`) azt jelenti, hogy a meglévő tartalom végére írunk (append), nem írjuk felül. A `println` új sorba írja a szöveget. Az írást is `try-catch`-csel kell körülvenni, mert a fájlművelet `IOException`-t dobhat. Ne feledjük `close()`-olni az írót, különben előfordulhat, hogy nem minden adat kerül ki a fájlba.

## Minta feladat – a négy elem együtt

Egy tipikus ZH-feladat mind a négy készséget egy programba sűríti: a program parancssori argumentumként kapja a fájl nevét, bekéri a felhasználótól egy diák adatait, létrehoz belőle egy `Diak` objektumot, hozzáfűzi a fájlhoz, majd kiírja a fájl teljes, addigi tartalmát.

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class ZhMintaFeladat {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Add meg a fájl nevét paraméterként!");
            return;
        }
        String fajlnev = args[0];

        Scanner be = new Scanner(System.in);
        System.out.print("Diák neve: ");
        String nev = be.nextLine();
        System.out.print("Diák jegye: ");
        int jegy = be.nextInt();

        Diak diak = new Diak(nev, jegy);

        try {
            PrintWriter iro = new PrintWriter(new FileWriter(fajlnev, true));
            iro.println(diak.toString());
            iro.close();
        } catch (IOException e) {
            System.out.println("Nem sikerült írni a fájlt: " + e.getMessage());
            return;
        }

        System.out.println("A fájl jelenlegi tartalma:");
        try {
            Scanner olvaso = new Scanner(new File(fajlnev));
            while (olvaso.hasNextLine()) {
                System.out.println(olvaso.nextLine());
            }
            olvaso.close();
        } catch (FileNotFoundException e) {
            System.out.println("Nem található a fájl: " + e.getMessage());
        }
    }
}
```

Futtatás:

```bash
java ZhMintaFeladat diakok.txt
```

**Magyarázat:** A program felépítése lépésről lépésre követi a négy követelményt: argumentum ellenőrzése, adat bekérése, objektum létrehozása, majd fájlba írás és fájlból olvasás. Ez a szerkezet – bemenet ellenőrzése, adatok begyűjtése, objektum építése, fájlművelet, végül visszajelzés – jó kiindulási minta egy hasonló ZH-feladathoz.

## Összefoglalás

- Objektumot a `new` kulcsszóval és egy konstruktorral hozunk létre; a `toString()` felülírásával egyszerűen kiírható.
- A parancssori argumentumok a `String[] args` tömbben érhetők el; a hosszukat mindig ellenőrizzük felhasználás előtt.
- A `Scanner` osztály `System.in`-ből olvas felhasználói bemenetet (`nextLine()`, `nextInt()`, `nextDouble()`); figyeljünk a `nextInt()` és `nextLine()` keveréséből adódó buktatóra.
- A `Scanner` fájlból is olvashat (`new Scanner(new File(...))`), a `PrintWriter` és a `FileWriter` pedig fájlba írásra használható; az `IOException` és a `FileNotFoundException` kezelése `try-catch`-csel történik.

## Gyakorló feladatok

1. Írj programot, amely parancssori argumentumként kap egy számot (`N`), majd bekér a felhasználótól `N` darab egész számot, és kiírja az összegüket és az átlagukat.
2. Készíts egy `Termek` osztályt (név, ár), kérd be a felhasználótól egy termék adatait, és írd a fájl végéhez egy sorban, "név;ár" formátumban.
3. Olvass be egy fájlt soronként, és számold meg, hány sora van. Mi történik, ha a megadott fájl nem létezik?
4. Bővítsd a mintafeladatot úgy, hogy a program induláskor kiírja, hány diák van már a fájlban, mielőtt az újat hozzáadná.
