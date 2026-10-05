# 16. További láthatósági szintek (protected és default), kivételek, kivételkezelés

A 4. témakörben a `public` és `private` láthatóságot néztük meg. Most a másik két szintet, a `protected`-et és a csomag-szintű (default) láthatóságot ismerjük meg, majd áttérünk a kivételek kezelésére, amellyel a váratlan helyzeteket szabályozottan tudjuk lekezelni.

## Láthatósági szintek összefoglalva

| Módosító | Osztályon belül | Csomagon belül | Leszármazottban (más csomagban) | Bárhol |
|---|---|---|---|---|
| `private` | igen | nem | nem | nem |
| (nincs, default) | igen | igen | nem | nem |
| `protected` | igen | igen | igen | nem |
| `public` | igen | igen | igen | igen |

## Protected és default láthatóság

A `protected` tag ugyanabban a csomagban lévő osztályokból is elérhető, és a más csomagban lévő leszármazott osztályokból is. A default (csomag-szintű) láthatóság, ha nincs módosító, csak ugyanabban a csomagban látszik.

```java
package hu.egyetem.allat;

public class Allat {
    protected String nev;      // leszármazottak is látják
    int kor;                   // default: csak ugyanebben a csomagban

    public Allat(String nev) {
        this.nev = nev;
    }
}
```

```java
package hu.egyetem.allat;

public class Kutya extends Allat {
    public void info() {
        System.out.println(nev); // protected: elérhető
        System.out.println(kor); // default: ugyanabban a csomagban, elérhető
    }
}
```

**Magyarázat:** Mivel a `Kutya` ugyanabban a csomagban van, mint az `Allat`, mindkét mező elérhető. Ha a `Kutya` egy másik csomagban lenne, a `kor` mező már nem lenne látható, a `nev` viszont továbbra is elérhető maradna, mert a `protected` a leszármazottaknak is nyitva áll.

## Kivételek és kivételkezelés

A kivétel (exception) egy futás közben fellépő hiba jelzése, amely megszakítja a normális végrehajtást. A hibát a `try` blokkban figyeljük, a `catch` ágban kezeljük, a `finally` ág pedig akkor is lefut, ha volt hiba vagy nem.

```java
public class KivetelPelda {
    public static void main(String[] args) {
        int[] tomb = {1, 2, 3};

        try {
            System.out.println(tomb[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Hibás index: " + e.getMessage());
        } finally {
            System.out.println("Ez mindig lefut.");
        }

        System.out.println("A program folytatódik.");
    }
}
```

**Magyarázat:** A `tomb[5]` érvénytelen index, ezért `ArrayIndexOutOfBoundsException` keletkezik. A `catch` ág elkapja, a program nem áll le, és a `finally` blokk is lefut. A `getMessage()` a hiba leírását adja vissza.

## Saját kivétel dobása

Saját hibatípust is létrehozhatunk, ha egy osztály valamilyen szabályt sértő állapotot talál. A `throw` kulcsszóval dobunk kivételt, a `throws` a metódus fejlécében jelzi, hogy egy kivétel továbbadható.

```java
public class ErvenytelenKorException extends Exception {
    public ErvenytelenKorException(String uzenet) {
        super(uzenet);
    }
}
```

```java
public class Ember {
    public static void korEllenoriz(int kor) throws ErvenytelenKorException {
        if (kor < 0) {
            throw new ErvenytelenKorException("A kor nem lehet negatív: " + kor);
        }
        System.out.println("Érvényes kor.");
    }

    public static void main(String[] args) {
        try {
            korEllenoriz(-5);
        } catch (ErvenytelenKorException e) {
            System.out.println("Hiba: " + e.getMessage());
        }
    }
}
```

**Magyarázat:** A `throws` a metódus szignatúrájában jelzi, hogy a hívónak kezelnie kell a kivételt. A `main` metódusban a `try-catch` elkapja és kiírja a hibaüzenetet. A saját kivétel az `Exception` osztályból származik, ezért ellenőrzött (checked) kivételnek számít.

## Összefoglalás

- A `protected` tag a csomagon belül és a leszármazottakból is elérhető; a default láthatóság csak a csomagon belül.
- A kivétel a futás közbeni hiba jelzése; a `try` blokkban figyeljük, a `catch`-ben kezeljük, a `finally` mindig lefut.
- A `throw` kivételt dob, a `throws` a metódus szignatúrájában jelzi a továbbadást.
- Saját kivételt az `Exception` vagy a `RuntimeException` osztályból származtatva készíthetünk.

## Ellenőrző kérdések

1. Melyik osztályok érik el a `protected` tagot, ha a leszármazott más csomagban van?
2. Mi történik a `finally` blokkal, ha a `try` ágban nincs hiba?
3. Mi a különbség a `throw` és a `throws` kulcsszó között?
4. Miért érdemes kivételt dobni a hibaüzenet kiírása helyett egy metódusban?
