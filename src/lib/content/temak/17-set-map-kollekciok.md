# 17. További kollekciók: Set (HashSet), Map (HashMap)

Az `ArrayList` mellett a Java gyűjteménykerete (Collections Framework) további hasznos típusokat kínál. Ebben a témakörben két fontos gyűjteményt nézünk meg: a `Set`-et, amely egyedi elemeket tárol, és a `Map`-et, amely kulcs–érték párokat tárol.

## Set – HashSet

A `Set` olyan gyűjtemény, amelyben nem lehet ismétlődő elem. A `HashSet` a `Set` leggyakoribb megvalósítása. Nem garantál sorrendet, a keresés és a beszúrás gyors.

```java
import java.util.HashSet;

public class HashSetPelda {
    public static void main(String[] args) {
        HashSet<String> szinek = new HashSet<>();
        szinek.add("piros");
        szinek.add("zöld");
        szinek.add("piros"); // ismétlődő elem, nem kerül be újra

        System.out.println(szinek.size());            // 2
        System.out.println(szinek.contains("zöld"));  // true
        szinek.remove("piros");
        System.out.println(szinek);                   // [zöld]
    }
}
```

**Magyarázat:** Az `add` visszatérési értéke `false`, ha az elem már benne volt, ezért a második `"piros"` nem változtat a halmazon. A `contains` és a `remove` gyorsan működik, mert a `HashSet` belsőleg hash-táblát használ.

Mivel a `HashSet` a `hashCode` és az `equals` metódusokra épül, saját osztály esetén ezeket megfelelően fel kell írni (ahogy a 12. témakörben a `Pont` osztálynál láttuk). Különben két tartalmilag azonos objektum is bekerülhet a halmazba.

## Map – HashMap

A `Map` kulcs–érték párokat tárol. Minden kulcs egyedi, és egy kulcshoz egy érték tartozik. A `HashMap` a `Map` leggyakoribb megvalósítása, nem garantál sorrendet.

```java
import java.util.HashMap;

public class HashMapPelda {
    public static void main(String[] args) {
        HashMap<String, Integer> jegyek = new HashMap<>();
        jegyek.put("Anna", 5);
        jegyek.put("Béla", 3);
        jegyek.put("Anna", 4); // a régi érték felülíródik

        System.out.println(jegyek.get("Anna"));            // 4
        System.out.println(jegyek.get("Csaba"));           // null
        System.out.println(jegyek.getOrDefault("Csaba", 1)); // 1
        System.out.println(jegyek.containsKey("Béla"));    // true

        for (String nev : jegyek.keySet()) {
            System.out.println(nev + ": " + jegyek.get(nev));
        }
    }
}
```

**Magyarázat:** A `put` beszúr vagy felülír egy kulcs–érték párt. A `get` a kulcshoz tartozó értéket adja, ha a kulcs nem létezik, `null`-t ad vissza. A `getOrDefault` ilyen esetben alapértelmezett értéket ad, így a `null` ellenőrzés elkerülhető. A `keySet()` a kulcsok halmazát adja, amelyen bejárhatunk.

## Összefoglalás

- A `HashSet` egyedi elemeket tárol, gyors keresést és beszúrást biztosít, sorrendet nem garantál.
- A `HashMap` kulcs–érték párokat tárol; a kulcsok egyediek, az értékek ismétlődhetnek.
- A `put` beszúr vagy felülír, a `get` értéket kérdez le, a `getOrDefault` alapértelmezett értéket is megadhat.
- Saját osztályt kulcsként vagy halmazelemként használva a `hashCode` és az `equals` helyes felülírása elengedhetetlen.

## Ellenőrző kérdések

1. Mi történik, ha egy `HashSet`-hez kétszer ugyanazt az elemet adjuk hozzá?
2. Mit ad vissza a `HashMap.get` egy nem létező kulcsra?
3. Miért fontos a `hashCode` és az `equals` felülírása saját osztály kulcsként való használatakor?
4. Miben tér el a `put` és a `getOrDefault` metódus működése?
