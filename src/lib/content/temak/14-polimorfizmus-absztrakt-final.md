# 14. Objektumok összehasonlítása, polimorfizmus, absztrakt és final osztályok

Ebben a témakörben három fontos objektumorientált fogalmat nézünk meg: a polimorfizmust, amely lehetővé teszi, hogy különböző típusú objektumokat egységesen kezeljünk, az absztrakt osztályokat és metódusokat, valamint a `final` kulcsszó osztályra és metódusra vonatkozó jelentését. Előtte röviden áttekintjük az objektumok összehasonlítását.

## Objektumok összehasonlítása

Az `==` operátor referenciákat hasonlít össze, az `equals` metódus pedig a tartalmat (ha megfelelően felül van írva). A tartalmi összehasonlítás részleteit az előző témakörben, a `Pont` példán láttuk. Rendezéshez a `Comparable` interfészt használjuk, amelyről a 19. témakörben lesz szó.

## Polimorfizmus

A polimorfizmus azt jelenti, hogy egy szülő típusú hivatkozáson keresztül különböző gyermek objektumok viselkedését hívhatjuk meg. A futás közben mindig az objektum tényleges típusának megfelelő metódus fut le.

```java
public class Alakzat {
    public double terulet() {
        return 0;
    }
}

public class Teglalap extends Alakzat {
    private double a, b;

    public Teglalap(double a, double b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public double terulet() {
        return a * b;
    }
}

public class Kor extends Alakzat {
    private double r;

    public Kor(double r) {
        this.r = r;
    }

    @Override
    public double terulet() {
        return Math.PI * r * r;
    }
}
```

```java
public class PolimorfizmusTeszt {
    public static void main(String[] args) {
        Alakzat[] alakzatok = {new Teglalap(3, 4), new Kor(1)};

        for (Alakzat a : alakzatok) {
            System.out.println(a.terulet()); // 12.0, majd 3.14159...
        }
    }
}
```

**Magyarázat:** Az `alakzatok` tömb elemei `Alakzat` típusúak, mégis mindegyiknek a saját `terulet` metódusa fut le. Ez a dinamikus kötés: a hívott metódust a futás közben, az objektum valódi típusa alapján választja ki a JVM. Így új alakzat hozzáadásakor a ciklus kódját nem kell módosítani.

## Absztrakt osztályok és metódusok

Az absztrakt osztály nem példányosítható, közös alapot ad a gyermek osztályoknak. Az absztrakt metódusnak nincs törzse, a gyermek osztálynak kötelező megvalósítania. Az osztályt az `abstract` kulcsszóval jelöljük.

```java
public abstract class Dolgozo {
    private String nev;

    public Dolgozo(String nev) {
        this.nev = nev;
    }

    public String getNev() {
        return nev;
    }

    public abstract double berSzamitas();
}

public class OraBer extends Dolgozo {
    private double oraDij;
    private int ora;

    public OraBer(String nev, double oraDij, int ora) {
        super(nev);
        this.oraDij = oraDij;
        this.ora = ora;
    }

    @Override
    public double berSzamitas() {
        return oraDij * ora;
    }
}
```

**Magyarázat:** A `Dolgozo` osztályból nem készíthetünk objektumot (`new Dolgozo(...)` fordítási hiba). A `berSzamitas` absztrakt metódus, ezért minden leszármazottnak meg kell adnia a saját változatát. Az absztrakt osztály közös részeket (például a `nev` mezőt és a `getNev` metódust) biztosít.

## A final osztályok és metódusok

A `final` kulcsszóval két dolgot tilthatunk meg:

- **final osztály** – nem lehet belőle öröklést készíteni.
- **final metódus** – a gyermek osztály nem írhatja felül.

```java
public final class Penznem {
    private final String kod;

    public Penznem(String kod) {
        this.kod = kod;
    }

    public String getKod() {
        return kod;
    }
}

// public class Forint extends Penznem { } // fordítási hiba: final osztályból nem lehet öröklődni
```

**Magyarázat:** A `final` használata akkor hasznos, ha az osztály belső működését szeretnénk védeni a módosításoktól, vagy ha biztosítani szeretnénk, hogy egy metódus viselkedése minden esetben ugyanaz marad. A `String` osztály is `final`, ezért nem lehet örökölni tőle.

## Összefoglalás

- A polimorfizmus lehetővé teszi, hogy szülő típusú hivatkozáson keresztül a gyermek objektumok saját metódusai fussanak le.
- A dinamikus kötés miatt a futás közben az objektum valódi típusa dönt a hívott metódusról.
- Az absztrakt osztály nem példányosítható; absztrakt metódusát a leszármazottaknak meg kell valósítaniuk.
- A `final` osztályból nem lehet öröklődni, a `final` metódust nem lehet felülírni.

## Ellenőrző kérdések

1. Mi a különbség az absztrakt osztály és a `final` osztály között?
2. Miért nem lehet absztrakt osztályból objektumot létrehozni?
3. Mit jelent a dinamikus kötés?
4. Miért nem lehet a `String` osztályból örökölni?
