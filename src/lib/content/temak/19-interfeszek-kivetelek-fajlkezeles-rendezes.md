# 19. Interfészek, a kivételek fajtái, fájlkezelés részletesen, saját objektumok rendezése

Ebben a témakörben négy témát járunk körül: az interfészeket, amelyek viselkedést írnak elő osztályoknak; a kivételek fajtáit; a fájlkezelés részletesebb eszközeit; végül a saját objektumok rendezését a `Comparable` és a `Comparator` segítségével.

## Interfészek

Az interfész olyan szerződés, amely megadja, milyen metódusokat kell egy osztálynak megvalósítania. Az osztály az `implements` kulcsszóval valósítja meg az interfészt. Egy osztály több interfészt is megvalósíthat, ami a Java többszörös öröklődés-szerű viselkedésének alapja.

```java
public interface Hangadó {
    void hangotAd();
}

public interface Mozgó {
    void mozog();
}

public class Robot implements Hangadó, Mozgó {
    @Override
    public void hangotAd() {
        System.out.println("Bíp-búp!");
    }

    @Override
    public void mozog() {
        System.out.println("A robot halad előre.");
    }
}
```

```java
public class InterfeszTeszt {
    public static void main(String[] args) {
        Hangadó h = new Robot();
        h.hangotAd(); // Bíp-búp!
    }
}
```

**Magyarázat:** Az interfész metódusai alapértelmezetten publikusak és absztraktak, törzs nélkül. A `Robot` osztály mindkettőt megvalósítja. A `Hangadó` típusú hivatkozáson keresztül csak az interfészben szereplő metódusokat hívhatjuk meg, de a futás közben a `Robot` megvalósítása fut le (polimorfizmus).

## A kivételek fajtái

A Java kivételei a `Throwable` osztály leszármazottai, két fő csoportra oszthatók:

- **Ellenőrzött (checked) kivételek** – az `Exception` osztályból származnak, például `IOException`. A fordító kényszeríti, hogy kezeljük vagy a `throws` klauzulával továbbadjuk őket.
- **Futásidejű (unchecked) kivételek** – a `RuntimeException` leszármazottai, például `NullPointerException`, `ArrayIndexOutOfBoundsException`. Nem kötelező elkapni őket, általában programozási hibát jeleznek.

Az `Error` osztály súlyos, a programból nem kezelhető hibákat jelöl (például `OutOfMemoryError`), ezeket nem szokás elkapni.

```java
public class KivetelFajtak {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length()); // NullPointerException (futásidejű)
        } catch (NullPointerException e) {
            System.out.println("Null értékkel próbáltunk műveletet végezni.");
        }
    }
}
```

**Magyarázat:** A `NullPointerException` futásidejű kivétel, ezért a fordító nem kéri a kezelését, de a `catch` ággal mégis elkaphatjuk. A jó gyakorlat az, hogy a futásidejű kivételeket inkább megelőzzük (például `null` ellenőrzéssel), nem pedig elkapjuk.

## Fájlkezelés részletesen

A `java.nio.file` csomag modern eszközöket kínál a fájlok kezelésére. A `Files` osztály statikus metódusai olvasásra, írásra, másolásra és törlésre is alkalmasak:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class FajlReszletes {
    public static void main(String[] args) throws IOException {
        Path fajl = Path.of("naplo.txt");

        Files.writeString(fajl, "Első sor\n");
        Files.writeString(fajl, "Második sor\n", StandardOpenOption.APPEND);

        List<String> sorok = Files.readAllLines(fajl);
        System.out.println("Sorok száma: " + sorok.size());

        if (Files.exists(fajl)) {
            Files.delete(fajl);
        }
    }
}
```

**Magyarázat:** A `Files.writeString` alapértelmezetten felülírja a fájlt, az `APPEND` opcióval viszont a végére fűzhetünk. A `Files.exists` ellenőrzi a fájl létezését, a `Files.delete` pedig törli. Ezek a metódusok `IOException` kivételt dobhatnak, ezért a `main` a `throws IOException` klauzulával továbbadja.

Érdemes a `try-with-resources` szerkezetet is ismerni, amely automatikusan lezárja az erőforrást:

```java
try (BufferedReader br = Files.newBufferedReader(Path.of("adatok.txt"))) {
    String sor;
    while ((sor = br.readLine()) != null) {
        System.out.println(sor);
    }
}
```

## Saját objektumok rendezése

Ahhoz, hogy objektumokat rendezni tudjunk (például a `Collections.sort` vagy a `List.sort` metódussal), meg kell mondanunk, mi alapján hasonlítsuk őket. Erre két lehetőség van:

**Comparable** – az osztály természetes sorrendjét adja meg, a `compareTo` metódussal:

```java
public class Diak implements Comparable<Diak> {
    private String nev;
    private double atlag;

    public Diak(String nev, double atlag) {
        this.nev = nev;
        this.atlag = atlag;
    }

    public String getNev() { return nev; }
    public double getAtlag() { return atlag; }

    @Override
    public int compareTo(Diak masik) {
        return Double.compare(this.atlag, masik.atlag);
    }
}
```

**Comparator** – külön, kívülről adott rendezési szabály, amelyet a rendezéskor adunk meg:

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class RendezesPelda {
    public static void main(String[] args) {
        List<Diak> diakok = new ArrayList<>();
        diakok.add(new Diak("Béla", 4.2));
        diakok.add(new Diak("Anna", 4.8));
        diakok.add(new Diak("Csaba", 3.9));

        diakok.sort(Comparator.comparing(Diak::getNev));
        for (Diak d : diakok) System.out.println(d.getNev());

        diakok.sort(Comparator.comparingDouble(Diak::getAtlag).reversed());
        for (Diak d : diakok) System.out.println(d.getNev() + " " + d.getAtlag());
    }
}
```

**Magyarázat:** A `Comparable` megvalósításával az osztálynak egyetlen természetes sorrendje van. A `Comparator` lehetővé teszi több különböző szempont szerinti rendezést is, és az osztály kódját nem kell módosítani hozzá. A `reversed()` megfordítja a sorrendet, így a legjobb átlagú diák kerül elöl.

## Összefoglalás

- Az interfész metódusokat ír elő, amelyeket az osztály az `implements` kulcsszóval valósít meg; egy osztály több interfészt is megvalósíthat.
- A kivételek ellenőrzött és futásidejű típusokra oszthatók; a futásidejű kivételek megelőzése jobb gyakorlat, mint az elkapásuk.
- A `Files` osztály modern, egyszerű fájlműveleteket kínál; az erőforrásokat `try-with-resources`-szal érdemes kezelni.
- Saját objektumokat a `Comparable` (természetes sorrend) vagy a `Comparator` (külön szabály) segítségével rendezhetünk.

## Ellenőrző kérdések

1. Miben különbözik az ellenőrzött és a futásidejű kivétel a fordító szempontjából?
2. Miért kell a `Diak` osztálynak `Comparable<Diak>`-ot implementálnia, ha rendezni szeretnénk?
3. Mit jelent a `try-with-resources` szerkezet?
4. Mi a különbség a `Comparable` és a `Comparator` használata között?
