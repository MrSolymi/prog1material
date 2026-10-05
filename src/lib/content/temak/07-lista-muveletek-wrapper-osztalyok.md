# 7. Lista műveletek, wrapper osztályok, típuskonverziók

Ebben a témakörben az `ArrayList` gyakoribb műveleteit nézzük meg, majd a primitív típusok objektum-megfelelőit, a wrapper osztályokat. Ezek azért fontosak, mert a gyűjtemények csak objektumokat tárolhatnak, nem primitív értékeket. Végül a típuskonverziókat tekintjük át.

## Lista műveletek

Az `ArrayList` a `List` interfész egyik megvalósítása. A lista műveletei közül a leggyakoribbak:

```java
import java.util.ArrayList;

public class ListaMuveletek {
    public static void main(String[] args) {
        ArrayList<Integer> szamok = new ArrayList<>();
        szamok.add(10);
        szamok.add(20);
        szamok.add(30);
        szamok.add(1, 15);                 // beszúrás az 1. indexre

        szamok.set(0, 5);                  // az első elem cseréje
        System.out.println(szamok);        // [5, 15, 20, 30]
        System.out.println(szamok.contains(20)); // true
        System.out.println(szamok.indexOf(30));  // 3

        szamok.remove(Integer.valueOf(15)); // elem eltávolítása érték alapján
        szamok.remove(0);                  // elem eltávolítása index alapján
        System.out.println(szamok);        // [20, 30]
        System.out.println(szamok.isEmpty()); // false
    }
}
```

**Magyarázat:** Az `add(index, elem)` a megadott helyre szúr be elemet, a többi elem egyel hátrébb csúszik. A `set` felülírja az adott indexen lévő elemet. A `remove` kétféleképpen használható: index alapján (`remove(0)`), vagy érték alapján. Mivel a `remove(15)` egészként értelmezné a paramétert indexként, az értékek szerinti törléshez a `Integer.valueOf` segítségével kell egy objektumot átadni.

## Wrapper osztályok

A primitív típusokhoz tartozó objektum-megfelelőket wrapper osztályoknak nevezzük:

| Primitív | Wrapper |
|---|---|
| `int` | `Integer` |
| `double` | `Double` |
| `boolean` | `Boolean` |
| `char` | `Character` |
| `long` | `Long` |

```java
import java.util.ArrayList;

public class WrapperPelda {
    public static void main(String[] args) {
        Integer a = 42;               // automatikus csomagolás (autoboxing)
        int b = a;                    // automatikus kicsomagolás (unboxing)

        ArrayList<Double> arak = new ArrayList<>();
        arak.add(12.5);
        arak.add(7.0);

        double osszeg = 0;
        for (Double ar : arak) {
            osszeg += ar;             // unboxing
        }
        System.out.println(osszeg);   // 19.5
        System.out.println(Integer.MAX_VALUE);
    }
}
```

**Magyarázat:** A fordító automatikusan elvégzi a csomagolást (`int` → `Integer`) és a kicsomagolást (`Integer` → `int`), ha szükséges. A wrapper osztályok hasznos statikus metódusokat is tartalmaznak, például `Integer.MAX_VALUE` a legnagyobb `int` értéket adja.

Figyelj arra, hogy a wrapper objektum `null` lehet. Ha `null` értéket próbálunk kicsomagolni, `NullPointerException` keletkezik:

```java
Integer x = null;
int y = x; // NullPointerException
```

## Típuskonverziók

Az értékek típusát két módon alakíthatjuk át: **implicit** (automatikus) és **explicit** (kiírt) konverzióval.

Implicit konverzió akkor történik, ha az átalakítás nem veszít adatot, például `int` → `double`:

```java
int egesz = 7;
double tort = egesz;   // implicit: 7.0
```

Explicit konverzió kell, ha adatvesztéssel járhat, például `double` → `int`. Ilyenkor a típust zárójelben kell megadni:

```java
double pi = 3.99;
int egesz = (int) pi;  // 3, a tizedesrész elvész
```

Sztring és szám között a wrapper osztályok statikus metódusai segítenek:

```java
int szam = Integer.parseInt("123");
double tort = Double.parseDouble("2.5");
String szoveg = String.valueOf(99);
```

**Magyarázat:** A `parseInt` sztringet alakít számmá; hibás tartalom esetén `NumberFormatException` keletkezik. A `String.valueOf` számot alakít sztringgé.

## Összefoglalás

- Az `ArrayList` olyan műveleteket kínál, mint a beszúrás (`add(index, elem)`), a csere (`set`), a keresés (`contains`, `indexOf`) és a törlés (`remove`).
- A wrapper osztályok (`Integer`, `Double`, `Boolean`, `Character`, `Long`) a primitív típusok objektum-megfelelői.
- A gyűjtemények objektumokat tárolnak; a csomagolás és kicsomagolás automatikusan történik.
- A típuskonverzió lehet implicit (adatvesztés nélkül) vagy explicit (zárójeles típusmegadással); sztring és szám között a `parse` és a `valueOf` metódusok segítenek.

## Ellenőrző kérdések

1. Miért nem lehet `ArrayList<int>` típust használni?
2. Mi a különbség a `list.remove(2)` és a `list.remove(Integer.valueOf(2))` hívás között?
3. Mikor keletkezik `NullPointerException` a wrapper osztályokkal kapcsolatban?
4. Mit ad vissza a `(int) 9.99` kifejezés, és miért?
