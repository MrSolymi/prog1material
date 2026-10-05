# 3. Osztályok, objektumok

Az osztály egy tervrajz, amely leírja, milyen adatokat (példányváltozókat) és milyen műveleteket (példánymetódusokat) tartalmaz egy adott fogalom. Az objektum az osztály egy konkrét példánya, amelyet a `new` kulcsszóval hozunk létre. Ugyanabból az osztályból tetszőleges számú objektum készíthető, és mindegyiknek saját adatai lehetnek.

## Osztály és objektum

```java
public class Auto {
    String marka;
    int evjarat;

    void kiir() {
        System.out.println(marka + " (" + evjarat + ")");
    }
}
```

```java
public class AutoTeszt {
    public static void main(String[] args) {
        Auto a1 = new Auto();
        a1.marka = "Škoda";
        a1.evjarat = 2015;

        Auto a2 = new Auto();
        a2.marka = "Suzuki";
        a2.evjarat = 2019;

        a1.kiir();
        a2.kiir();
    }
}
```

**Magyarázat:** Az `Auto` osztály két példányváltozót (`marka`, `evjarat`) és egy metódust (`kiir`) tartalmaz. Az `a1` és az `a2` két külön objektum, amelyeknek saját, egymástól független adataik vannak. A pontos jelölés (`a1.marka`) az objektum adatának elérését jelenti.

## Példányváltozók és példánymetódusok

A példányváltozók az objektumhoz tartoznak: minden példánynak saját példánya van belőlük. A példánymetódusok ezekre az adatokra hivatkozhatnak, és az objektumon keresztül hívhatók meg. A metóduson belül a `this` kulcsszóval az aktuális objektumra hivatkozhatunk.

```java
public class Kor {
    double sugar;

    double terulet() {
        return 3.14159 * this.sugar * this.sugar;
    }
}
```

**Magyarázat:** A `terulet` metódus az adott objektum `sugar` mezőjét használja. Ha két `Kor` objektum van, mindegyik a saját sugarával számolja ki a területét.

## Konstruktor

A konstruktor olyan speciális metódus, amely az objektum létrehozásakor fut le. Neve megegyezik az osztály nevével, és nincs visszatérési típusa. Feladata, hogy az objektum adatait kezdeti értékre állítsa.

```java
public class Konyv {
    String cim;
    int oldalszam;

    public Konyv(String cim, int oldalszam) {
        this.cim = cim;
        this.oldalszam = oldalszam;
    }

    public void kiir() {
        System.out.println(cim + " – " + oldalszam + " oldal");
    }
}
```

```java
public class KonyvTeszt {
    public static void main(String[] args) {
        Konyv k = new Konyv("A Hobbit", 310);
        k.kiir();
    }
}
```

**Magyarázat:** A `this.cim = cim` sorban a `this.cim` az objektum mezőjére utal, míg a jobb oldali `cim` a paraméterre. Ha nincs megadva konstruktor, a Java egy paraméter nélküli alapértelmezett konstruktort készít automatikusan. Ha viszont mi írunk konstruktort, az alapértelmezett már nem jön létre automatikusan.

## Összefoglalás

- Az osztály tervrajz, az objektum a `new` kulcsszóval létrehozott példány.
- A példányváltozók példányonként külön léteznek; a példánymetódusok ezeken dolgoznak.
- A `this` az aktuális objektumra utal.
- A konstruktor az objektum létrehozásakor fut le, neve az osztály nevével egyezik, és nincs visszatérési típusa.

## Ellenőrző kérdések

1. Mi a különbség az osztály és az objektum között?
2. Miben különböznek két, ugyanabból az osztályból létrehozott objektum adatai?
3. Mire való a `this` kulcsszó egy konstruktorban?
4. Mi történik, ha egy osztályban nem írunk konstruktort?
