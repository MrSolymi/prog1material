# 14. Random számok (részletesen), egyszerű unit tesztek

Ebben a témakörben két dologgal foglalkozunk: a véletlen számok részletesebb előállításával a `java.util.Random` osztállyal, majd az egyszerű unit tesztek írásának alapjaival az `assert` kulcsszó és a JUnit keretrendszer segítségével.

## Random számok részletesen

A `Random` osztály a `java.util` csomagban található. Egy `Random` példány több véletlen számot ad egymás után, a `Math.random()` is ezt használja a háttérben.

```java
import java.util.Random;

public class VeletlenPelda {
    public static void main(String[] args) {
        Random rnd = new Random();

        int egesz = rnd.nextInt();           // bármilyen int érték
        int tizig = rnd.nextInt(10);         // 0 és 9 közötti egész (10 nem szerepel)
        int dobas = rnd.nextInt(6) + 1;      // 1 és 6 közötti egész
        double tort = rnd.nextDouble();      // 0.0 és 1.0 közötti tizedestört
        boolean igazHamis = rnd.nextBoolean();

        System.out.println(dobas);
    }
}
```

**Magyarázat:** A `nextInt(n)` a 0 (beleértve) és az `n` (kizárva) közötti számot ad. Ha egy adott tartományt szeretnénk, a `+` eltolással érhetjük el: `nextInt(6) + 1` adja az 1 és 6 közötti dobást. A `Random` objektum újrahasznosítható, ne hozzunk létre minden híváshoz újat.

### Reprodukálható sorozat

Ha a `Random` konstruktorának egy kezdőértéket (seed) adunk, mindig ugyanazt a számsorozatot kapjuk. Ez teszteléshez hasznos:

```java
Random a = new Random(42);
Random b = new Random(42);
System.out.println(a.nextInt(100) == b.nextInt(100)); // true
```

## Egyszerű unit tesztek

A unit teszt egy kis kódegység (általában egy metódus) helyes működését ellenőrzi. Egyszerű esetben az `assert` kulcsszóval is írhatunk ellenőrzéseket, de a gyakorlatban a JUnit keretrendszert használjuk.

Tesztelendő osztály:

```java
public class Matek {
    public static int osszead(int a, int b) {
        return a + b;
    }

    public static int faktorialis(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Negatív szám nem megengedett");
        }
        int eredmeny = 1;
        for (int i = 2; i <= n; i++) {
            eredmeny *= i;
        }
        return eredmeny;
    }
}
```

JUnit 5 tesztek:

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class MatekTest {

    @Test
    void osszeadasHelyes() {
        assertEquals(5, Matek.osszead(2, 3));
    }

    @Test
    void faktorialisHelyes() {
        assertEquals(120, Matek.faktorialis(5));
        assertEquals(1, Matek.faktorialis(0));
    }

    @Test
    void negativFaktorialisHibat0Dob() {
        assertThrows(IllegalArgumentException.class, () -> Matek.faktorialis(-1));
    }
}
```

**Magyarázat:** Minden `@Test` jelölésű metódus egy önálló tesztesetet jelent. Az `assertEquals(elvart, kapott)` ellenőrzi, hogy a várt és a kapott érték megegyezik-e. Az `assertThrows` azt ellenőrzi, hogy a megadott kód a várt kivételt dobja. A tesztek futtatását általában az IDE vagy a Maven/Gradle végzi.

## Összefoglalás

- A `Random` osztály a `nextInt`, `nextDouble` és `nextBoolean` metódusokkal ad véletlen értékeket; a seed teszteléshez reprodukálhatóvá teszi a sorozatot.
- Egy unit teszt egy kis egység helyességét ellenőrzi, egy-egy elvárt eredménnyel.
- A JUnit 5 `@Test` annotációval jelölt metódusai tesztesetek; az `assertEquals` és `assertThrows` a leggyakoribb ellenőrzések.

## Ellenőrző kérdések

1. Mit ad vissza a `new Random().nextInt(5)` hívás? Milyen tartományban van az eredmény?
2. Miért hasznos a `Random` konstruktorának megadni egy seed értéket tesztelésnél?
3. Mi a különbség az `assertEquals` és az `assertThrows` között?
4. Miért érdemes minden tesztet önállóan, egymástól függetlenül megírni?
