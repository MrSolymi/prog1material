# 11. Öröklődés, assert-ek

Az öröklődés az objektumorientált programozás egyik alapelve: egy osztály átveheti egy másik osztály tulajdonságait és metódusait, és ezekre új funkciókat építhet. Ebben a témakörben az öröklődés alapjait nézzük meg, majd az `assert` kulcsszóval történő ellenőrzés használatát.

## Öröklődés alapjai

Az öröklődést az `extends` kulcsszóval fejezzük ki. Az örökölt osztály a **gyermek** (leszármazott), az örökített osztály a **szülő** (ősosztály). A gyermek osztály a szülő nem privát tagjait eléri, és saját tagokat is hozzáadhat.

```java
public class Allat {
    protected String nev;

    public Allat(String nev) {
        this.nev = nev;
    }

    public void mozog() {
        System.out.println(nev + " mozog.");
    }
}

public class Kutya extends Allat {
    public Kutya(String nev) {
        super(nev);
    }

    public void ugat() {
        System.out.println(nev + " ugat: vau!");
    }
}
```

**Magyarázat:** A `Kutya` osztály az `Allat` gyermeke, ezért megkapja a `mozog()` metódust is. A `protected` láthatóság miatt a `nev` mező a leszármazottból is elérhető. A `super(nev)` hívás a szülő konstruktorát hívja meg, hiszen a `nev` értékét az `Allat` osztály kezeli.

```java
public class Teszt {
    public static void main(String[] args) {
        Kutya rex = new Kutya("Rex");
        rex.mozog();   // az örökölt metódus
        rex.ugat();    // a Kutya saját metódusa
    }
}
```

## Metódusok és a konstruktorok öröklődése

A konstruktorok nem öröklődnek. Ha a szülő osztálynak van paraméteres konstruktora, a gyermek konstruktorában a `super(...)` hívással kell azt meghívni. Ha a gyermek konstruktorában nincs explicit `super` hívás, a Java automatikusan a paraméter nélküli `super()` hívást illeszti be, ami hibát ad, ha a szülőben nincs ilyen konstruktor.

Java-ban egy osztálynak csak **egy** közvetlen szülője lehet (egyszeres öröklődés), de egy osztály több interfészt is megvalósíthat (ezt a 18. témakörben tárgyaljuk).

## Assert-ek használata

Az `assert` kulcsszóval feltételeket ellenőrizhetünk a futás közben. Ha a feltétel hamis, a program `AssertionError` hibát dob. Az assert-ek alapértelmezetten ki vannak kapcsolva, és a `-ea` (enable assertions) kapcsolóval lehet őket bekapcsolni a JVM indításakor:

```java
public class AssertPelda {
    public static void main(String[] args) {
        int kor = 17;
        assert kor >= 18 : "A kor nem lehet 18 évnél kisebb";
        System.out.println("Az ellenőrzés sikeres volt.");
    }
}
```

Futtatás:

```bash
java AssertPelda        # az assert kikapcsolva, a program lefut
java -ea AssertPelda    # az assert bekapcsolva, AssertionError dobódik
```

**Magyarázat:** A kettőspont utáni szöveg a hibaüzenet, amely segít megérteni, mi volt a hiba. Az assert-eket elsősorban fejlesztés és hibakeresés során használjuk a programozói feltevések (például „ez a változó sosem lehet negatív”) ellenőrzésére. Éles működésben a bemeneti adatok validálására ne assert-et, hanem kivételkezelést vagy feltételes elágazást használjunk, mert az assert kikapcsolható.

## Összefoglalás

- Az `extends` kulcsszóval egy osztály örökölhet egy másik osztálytól.
- A gyermek osztály eléri a szülő nem privát tagjait, és saját metódusokat adhat hozzá.
- A konstruktorok nem öröklődnek; a szülő konstruktorát a `super(...)` hívással kell meghívni.
- Java-ban egy osztálynak csak egy közvetlen szülője lehet.
- Az `assert` feltételt ellenőriz futás közben, `-ea` kapcsolóval engedélyezhető, és hamis feltétel esetén `AssertionError` hibát dob.

## Ellenőrző kérdések

1. Mit jelent az `extends` kulcsszó, és melyik osztály lesz a gyermek?
2. Miért kell a `Kutya` konstruktorában a `super(nev)` hívás?
3. Miért nem szabad éles működésben bemenet-ellenőrzésre assert-et használni?
4. Hogyan lehet bekapcsolni az assert-eket a futtatáskor?
