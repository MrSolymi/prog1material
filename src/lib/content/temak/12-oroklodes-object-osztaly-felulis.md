# 12. Öröklődés (folyt.), az Object osztály, metódus felülírása

Az előző témakörben megismertük az öröklődés alapjait. Most a fontosabb részletekkel folytatjuk: a metódusok felülírásával (overriding), az `Object` osztállyal, amely minden Java osztály közvetlen vagy közvetett őse, és a `toString`, `equals` és `hashCode` metódusokkal.

## Metódus felülírása

A gyermek osztály újra definiálhatja a szülő egy metódusát, ha azonos a neve, a paraméterlistája és a visszatérési típusa. Ezt nevezzük felülírásnak (overriding). A futás közben mindig a tényleges objektum típusának megfelelő változat hívódik meg.

```java
public class Allat {
    public void hangotAd() {
        System.out.println("Az állat hangot ad.");
    }
}

public class Macska extends Allat {
    @Override
    public void hangotAd() {
        System.out.println("Nyávog!");
    }
}
```

```java
public class FelulirasTeszt {
    public static void main(String[] args) {
        Allat a = new Macska();
        a.hangotAd(); // Nyávog!
    }
}
```

**Magyarázat:** A `@Override` annotáció nem kötelező, de segít: ha elírjuk a metódus nevét, a fordító hibát jelez, mert nem lenne mit felülírni. A változóunk típusa `Allat`, mégis a `Macska` változata fut, mert az objektum valódi típusa `Macska`.

## Az Object osztály

Minden Java osztály az `Object` osztályból származik, akkor is, ha ezt nem írjuk ki. Az `Object` osztály néhány fontos metódust ad minden objektumnak:

- `toString()` – az objektum szöveges leírását adja.
- `equals(Object o)` – az objektumok egyenlőségét vizsgálja.
- `hashCode()` – egész számot ad az objektumhoz, amelyet hash-alapú gyűjteményekben használnak.

Az alapértelmezett `toString` nem túl beszédes (például `Konyv@1b6d3586`), ezért érdemes felülírni:

```java
public class Konyv {
    private String cim;
    private int ar;

    public Konyv(String cim, int ar) {
        this.cim = cim;
        this.ar = ar;
    }

    @Override
    public String toString() {
        return "Konyv{cim='" + cim + "', ar=" + ar + "}";
    }
}
```

```java
public class KonyvTeszt {
    public static void main(String[] args) {
        Konyv k = new Konyv("Az öreg halász", 3500);
        System.out.println(k); // Konyv{cim='Az öreg halász', ar=3500}
    }
}
```

**Magyarázat:** A `println` automatikusan meghívja az objektum `toString` metódusát. A felülírt változat így olvasható kimenetet ad.

## Az equals és a hashCode

Alapértelmezetten az `equals` csak a referenciákat hasonlítja össze (ugyanaz-e az objektum), nem a tartalmat. Ha két objektum tartalmilag egyenlő lehet, az `equals` metódust felül kell írni. Ilyenkor a `hashCode`-ot is felül kell írni úgy, hogy az egyenlő objektumok azonos hash-kódot kapjanak.

```java
import java.util.Objects;

public class Pont {
    private int x;
    private int y;

    public Pont(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pont)) return false;
        Pont masik = (Pont) o;
        return x == masik.x && y == masik.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
```

```java
public class PontTeszt {
    public static void main(String[] args) {
        Pont a = new Pont(1, 2);
        Pont b = new Pont(1, 2);
        System.out.println(a.equals(b));      // true
        System.out.println(a == b);           // false
    }
}
```

**Magyarázat:** Az `equals` először azt vizsgálja, hogy ugyanarról az objektumról van-e szó, majd a típust, végül a mezők értékét hasonlítja össze. A `==` továbbra is a referenciákat hasonlítja, ezért `false` az eredmény, míg az `equals` tartalmi egyenlőséget mutat.

## Összefoglalás

- A felülírt metódus a futás közben az objektum tényleges típusának változatát hívja meg; a `@Override` segít elkerülni az elírásokat.
- Minden osztály az `Object` leszármazottja, így örökli a `toString`, `equals` és `hashCode` metódusokat.
- A `toString` felülírásával olvasható szöveget adhatunk az objektumnak.
- Az `equals` és a `hashCode` együtt, összhangban kell felülírni.

## Ellenőrző kérdések

1. Mi a különbség a felülírás (overriding) és a túlterhelés (overloading) között?
2. Miért érdemes a `@Override` annotációt kiírni?
3. Miért kell a `hashCode`-ot is felülírni, ha az `equals`-t felülírjuk?
4. Mit ír ki a `System.out.println(obj)` hívás, ha a `toString` nincs felülírva?
