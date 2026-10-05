# 4. Láthatósági szintek, getter és setter, statikus attribútumok

Az objektumorientált programozás egyik alapelve az **egységbezárás** (encapsulation): az objektum belső adatait el kell rejteni, és csak meghatározott módon, metódusokon keresztül szabad elérni. A láthatósági módosítókkal (`public`, `private`) szabályozhatjuk, hogy mely tagok érhetők el kívülről.

## Public és private

- A `public` tag bárhonnan elérhető.
- A `private` tag csak abban az osztályban látható.

```java
public class BankSzamla {
    private double egyenleg;

    public void befizet(double osszeg) {
        if (osszeg > 0) {
            egyenleg += osszeg;
        }
    }

    public double getEgyenleg() {
        return egyenleg;
    }
}
```

```java
public class SzamlaTeszt {
    public static void main(String[] args) {
        BankSzamla szamla = new BankSzamla();
        szamla.befizet(5000);
        System.out.println(szamla.getEgyenleg());

        // szamla.egyenleg = -100; // fordítási hiba: az egyenleg private
    }
}
```

**Magyarázat:** Az `egyenleg` mezőt `private`-ként jelöltük, így kívülről nem lehet közvetlenül módosítani. A `befizet` metódus ellenőrzi a bemenetet (csak pozitív összeg fogadható el), ezzel védi az adat érvényességét.

## Getter és setter metódusok

A getter a mező értékét adja vissza, a setter pedig beállítja. A konvenció szerint a nevük `get` vagy `set` előtaggal kezdődik, utána a mező neve nagy kezdőbetűvel szerepel.

```java
public class Diak {
    private String nev;
    private int eletkor;

    public String getNev() {
        return nev;
    }

    public void setNev(String nev) {
        this.nev = nev;
    }

    public int getEletkor() {
        return eletkor;
    }

    public void setEletkor(int eletkor) {
        if (eletkor >= 0) {
            this.eletkor = eletkor;
        }
    }
}
```

**Magyarázat:** A setter nem feltétlenül engedi meg a közvetlen módosítást: a `setEletkor` metódus ellenőrzi, hogy a kor ne legyen negatív. Ha csak getter van és setter nincs, az adat csak olvasható marad kívülről.

## Osztályváltozók (statikus attribútumok)

A `static` kulcsszóval jelölt mező az osztályhoz tartozik, nem egy konkrét objektumhoz. Az összes példány ugyanazt az értéket látja.

```java
public class Diak {
    private static int letszam = 0;
    private String nev;

    public Diak(String nev) {
        this.nev = nev;
        letszam++;
    }

    public static int getLetszam() {
        return letszam;
    }
}
```

```java
public class DiakTeszt {
    public static void main(String[] args) {
        new Diak("Anna");
        new Diak("Béla");
        System.out.println(Diak.getLetszam()); // 2
    }
}
```

**Magyarázat:** A `letszam` változó egy közös számláló: minden új `Diak` létrehozásakor eggyel nő. Az osztályváltozót az osztály nevén keresztül érjük el (`Diak.getLetszam()`), nem egy objektumon keresztül.

## Összefoglalás

- A `private` tagok csak az osztályon belül érhetők el, ezzel védjük az objektum belső állapotát.
- A getter és setter metódusok szabályozott hozzáférést biztosítanak az adatokhoz.
- A `static` mező az osztályhoz tartozik, és minden példány közösen használja.

## Ellenőrző kérdések

1. Mi az egységbezárás (encapsulation) lényege?
2. Miért jobb a setter metódust használni a mező közvetlen beállítása helyett?
3. Hogyan érjük el egy `static` mezőt?
4. Mi a különbség egy példányváltozó és egy osztályváltozó között?
