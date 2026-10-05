# 2. A String osztály

A `String` a Java leggyakrabban használt referencia típusa: szöveges adatok tárolására szolgál. Fontos tudni róla, hogy **megváltoztathatatlan** (immutable) – egy létrehozott sztring tartalma később nem módosítható. Minden „módosító” művelet új sztring objektumot hoz létre.

## Sztringek létrehozása

A sztringeket dupla idézőjelek között írjuk. Létrehozhatjuk literálként, vagy a `new` operátorral is, de a literál a gyakoribb és az egyszerűbb forma.

```java
public class SztringLetrehozas {
    public static void main(String[] args) {
        String udvozlet = "Helló, világ!";
        String masik = new String("Helló, világ!");

        System.out.println(udvozlet);
        System.out.println(udvozlet.equals(masik)); // true
    }
}
```

**Magyarázat:** A `equals` metódussal tartalmi egyenlőséget vizsgálunk. A `==` operátor ezzel szemben azt nézi, hogy két referencia ugyanarra az objektumra mutat-e, ezért sztringek összehasonlításánál a `==` általában hibás eredményt ad.

## Gyakori sztring műveletek

A `String` osztály számos hasznos metódust tartalmaz:

```java
public class SztringMuveletek {
    public static void main(String[] args) {
        String szoveg = "  Java programozás  ";

        System.out.println(szoveg.length());          // a karakterek száma
        System.out.println(szoveg.trim());            // a szóközök eltávolítása a szélekről
        System.out.println(szoveg.toUpperCase());     // nagybetűs változat
        System.out.println(szoveg.contains("prog"));  // true
        System.out.println(szoveg.indexOf("a"));      // az első "a" pozíciója
        System.out.println(szoveg.charAt(2));         // a 2. indexű karakter: J
        System.out.println(szoveg.substring(2, 6));   // részsztring: Java
        System.out.println(szoveg.replace("a", "A")); // csere
    }
}
```

**Magyarázat:** A sztring karaktereinek indexelése nullától kezdődik. A `substring(kezdo, veg)` a kezdő indextől a vég előtti indexig tartó részt adja vissza. Mivel a sztring megváltoztathatatlan, a `trim`, `replace` és a többi metódus mindig új sztringet ad vissza, az eredeti változatlan marad.

## Sztringek összehasonlítása és összefűzése

```java
public class SztringOsszefuzes {
    public static void main(String[] args) {
        String vezeteknev = "Kovács";
        String keresztnev = "Eszter";

        String teljes = vezeteknev + " " + keresztnev;
        System.out.println(teljes);

        System.out.println("kovács".equalsIgnoreCase(vezeteknev)); // false, a kisbetű-nagybetű számít
        System.out.println("Kovács".compareTo("Kovacs") > 0);     // abc-sorrend szerinti összehasonlítás
    }
}
```

**Magyarázat:** A `+` operátorral sztringeket fűzhetünk össze. Az `equalsIgnoreCase` figyelmen kívül hagyja a kis- és nagybetű különbséget. A `compareTo` egész számot ad vissza: 0, ha a két sztring egyenlő, negatív, ha az első kisebb, pozitív, ha nagyobb a sorrendben.

## Összefoglalás

- A `String` megváltoztathatatlan; minden módosító művelet új objektumot hoz létre.
- Tartalmi összehasonlításhoz az `equals` (vagy `equalsIgnoreCase`) metódust használjuk, ne a `==` operátort.
- A főbb műveletek: `length`, `charAt`, `substring`, `indexOf`, `contains`, `trim`, `toUpperCase`, `replace`.
- Sok összefűzésnél a `StringBuilder` hatékonyabb, erről a 8. témakörben lesz szó.

## Ellenőrző kérdések

1. Miért nem használhatjuk biztonságosan a `==` operátort két sztring tartalmának összehasonlítására?
2. Mit ad vissza a `"Java".substring(1, 3)` kifejezés?
3. Mi történik az eredeti sztringgel, ha meghívjuk rá a `toUpperCase()` metódust?
4. Mire használható a `compareTo` metódus?
