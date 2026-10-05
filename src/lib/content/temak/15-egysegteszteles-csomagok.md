# 15. Egységtesztelés, csomagok használata

Ebben a témakörben két különböző dologgal foglalkozunk: az egységtesztelés elveivel és gyakorlati szerkezetével, valamint a Java csomagok (package) használatával, amelyekkel a kódot logikai egységekbe szervezhetjük.

## Egységtesztelés

Az egységtesztelés (unit testing) célja, hogy egy kis kódegység – általában egy metódus vagy egy osztály – működését izolálva ellenőrizzük. Egy jó teszt:

- **gyors**, mert nem használ valódi adatbázist vagy hálózatot,
- **független**, azaz nem függ más tesztek sorrendjétől vagy eredményétől,
- **ismételhető**, bármikor futtatva ugyanazt az eredményt adja,
- **egy dolgot ellenőriz**, így hiba esetén egyértelmű, mi romlott el.

A tesztelési minta gyakran három lépésből áll: előkészítés (Arrange), végrehajtás (Act), ellenőrzés (Assert).

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class SzamlaTest {

    @Test
    void befizetesNovelziAzEgyenleget() {
        // Arrange
        Szamla szamla = new Szamla(1000);

        // Act
        szamla.befizet(500);

        // Assert
        assertEquals(1500, szamla.getEgyenleg());
    }

    @Test
    void negativOsszegetNemFogadElfogad() {
        Szamla szamla = new Szamla(1000);
        szamla.befizet(-200);
        assertEquals(1000, szamla.getEgyenleg());
    }
}
```

Tesztelt osztály:

```java
public class Szamla {
    private double egyenleg;

    public Szamla(double kezdoEgyenleg) {
        this.egyenleg = kezdoEgyenleg;
    }

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

**Magyarázat:** A két teszt külön-külön egy viselkedést ellenőriz: a pozitív befizetés növeli az egyenleget, a negatív nem változtatja. Mindkét teszt önálló, egyik sem függ a másiktól, ezért bármilyen sorrendben futtatható.

## Csomagok (package)

A csomag (package) összefüggő osztályok logikai gyűjteménye, amely a névütközéseket is elkerüli. A csomag neve a fájl könyvtárszerkezetének felel meg. A fájl elején a `package` kulcsszóval adjuk meg, melyik csomagba tartozik:

```java
// src/hu/egyetem/pelda/Szamla.java
package hu.egyetem.pelda;

public class Szamla {
    // ...
}
```

Másik csomagban lévő osztályt az `import` kulcsszóval érhetünk el:

```java
package hu.egyetem.app;

import hu.egyetem.pelda.Szamla;

public class Program {
    public static void main(String[] args) {
        Szamla s = new Szamla(500);
        System.out.println(s.getEgyenleg());
    }
}
```

**Magyarázat:** A `hu.egyetem.pelda` csomagnév egy könyvtárszerkezetnek felel meg: `hu/egyetem/pelda/`. Az `import` után a teljes név (`hu.egyetem.pelda.Szamla`) áll, vagy használhatunk csillagot (`import hu.egyetem.pelda.*;`), amely a csomag összes osztályát beimportálja. A `java.lang` csomag automatikusan elérhető, ezért a `String` vagy a `Math` osztályhoz nem kell importálás.

Csomagon belül a `public` tagok más csomagból is elérhetők, a csomag-szintű (default) láthatóságról a 16. témakörben lesz szó.

## Összefoglalás

- Az egységtesztek gyorsak, függetlenek, ismételhetők, és egy-egy viselkedést ellenőriznek.
- Az Arrange–Act–Assert minta segít a tesztek felépítésében.
- A csomagok (package) logikailag rendezik az osztályokat; a csomagnév a könyvtárszerkezetnek felel meg.
- Másik csomag osztályát az `import` kulcsszóval érjük el; a `java.lang` automatikusan elérhető.

## Ellenőrző kérdések

1. Miért fontos, hogy egy unit teszt ne függjön más teszt eredményétől?
2. Mit jelent az Arrange–Act–Assert minta?
3. Hogyan kapcsolódik a csomag neve a könyvtárszerkezethez?
4. Miért nem kell importálni a `String` osztályt?
