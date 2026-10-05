# 19. Generikus osztályok, a Java vége

A generikus programozás lehetővé teszi, hogy osztályokat és metódusokat típusparaméterrel írjunk meg, így ugyanaz a kód különböző típusokkal is működik, a típusbiztonságot pedig a fordító ellenőrzi. Ezzel a témakörrel a tananyag záró része is elkészül: a generikus osztályok után röviden áttekintjük, mire érdemes továbblépni a Java tanulásában.

## Generikus osztályok

A generikus osztály a névben szögletes zárójelben kapja a típusparamétert, például `<T>`. A `T` egy helyőrző, amelyet a példányosításkor konkrét típusra cserélünk.

```java
public class Doboz<T> {
    private T tartalom;

    public void tesz(T elem) {
        this.tartalom = elem;
    }

    public T kivesz() {
        return tartalom;
    }
}
```

```java
public class DobozTeszt {
    public static void main(String[] args) {
        Doboz<String> szoveges = new Doboz<>();
        szoveges.tesz("Szia");
        String s = szoveges.kivesz(); // nincs szükség típusátalakításra

        Doboz<Integer> szamos = new Doboz<>();
        szamos.tesz(42);
        int n = szamos.kivesz();

        System.out.println(s + " " + n);
    }
}
```

**Magyarázat:** A `Doboz<String>` csak sztringet tárolhat, a `Doboz<Integer>` csak egész számot (wrapper típust, mert a primitív `int` nem lehet típusparaméter). A fordító ellenőrzi a típusokat: `szoveges.tesz(42)` fordítási hiba lenne. A `<>` (diamond operátor) a jobb oldalon a típusparamétereket a fordító következteti a bal oldalról.

## Generikus metódusok

A metódusnak is lehet saját típusparamétere, amelyet a visszatérési típus elé írunk:

```java
public class Segedeszkoz {
    public static <T> void kiir(T[] tomb) {
        for (T elem : tomb) {
            System.out.print(elem + " ");
        }
        System.out.println();
    }
}
```

```java
public class GenerikusMetodus {
    public static void main(String[] args) {
        Segedeszkoz.kiir(new String[] {"alma", "körte"});
        Segedeszkoz.kiir(new Integer[] {1, 2, 3});
    }
}
```

**Magyarázat:** A `<T>` jelzi, hogy a metódus bármilyen típusú tömbbel működik. A két hívás más-más típusú tömböket kap, a kód mégis egy és ugyanaz.

## Korlátozások és a gyűjtemények

A generikus gyűjtemények (például `ArrayList<String>`, `HashMap<String, Integer>`) ugyanezen az elven működnek, amelyekkel már korábban is dolgoztunk. A generikus típusok ezért teszik lehetővé, hogy a gyűjtemények típusbiztosak legyenek, és ne kelljen kézzel átalakítani az elemeket.

## A Java tanulása után

Ezzel a tananyag alapjait áttekintettük: a típusoktól és a metódusoktól az öröklődésen, interfészeken és kivételkezelésen át a gyűjteményekig és a generikus programozásig. Ezekre építve érdemes továbbhaladni az alábbi témák felé:

- **Stream API és lambda kifejezések** – a gyűjtemények funkcionális, tömör feldolgozásához.
- **Fejlesztői eszközök** – IDE (például IntelliJ IDEA, Eclipse), és a Maven vagy Gradle buildelő rendszerek.
- **Tesztelés** – a JUnit és a mock-olás mélyebb használata, valamint a tesztvezérelt fejlesztés (TDD).
- **Adatbázis-kapcsolat** – a JDBC alapjai és később az ORM-keretrendszerek.
- **Szerveroldali fejlesztés** – például a Spring keretrendszer, webes alkalmazások készítéséhez.

A legjobb módja a tanulásnak a rendszeres gyakorlás: írj kis programokat, próbáld ki a példákat, és változtass rajtuk, hogy lásd, mi történik.

## Összefoglalás

- A generikus osztály típusparamétert használ (például `<T>`), így egy kód több típussal is működik.
- A generikus metódus a visszatérési típus előtt deklarálja a saját típusparaméterét.
- A típusparaméter csak referencia típus lehet; primitív helyett wrapper osztályt használunk.
- A generikus gyűjtemények típusbiztonságot és kényelmes használatot biztosítanak.

## Ellenőrző kérdések

1. Miért nem lehet `Doboz<int>` típust használni?
2. Mit jelent a `<>` (diamond) operátor a `new Doboz<>()` kifejezésben?
3. Mi a különbség egy generikus osztály és egy generikus metódus között?
4. Melyik témakört érdemes elsőként elmélyíteni a Java tanulása után, és miért?
