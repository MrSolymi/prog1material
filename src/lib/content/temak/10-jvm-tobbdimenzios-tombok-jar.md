# 10. A JVM működése, többdimenziós tömbök, random számok, JAR fájlok

Ebben a témakörben a Java futtatási környezetének (JVM) alapjait nézzük meg, majd a többdimenziós tömböket, a véletlen számok rövid kezelését, végül a JAR fájlok készítését.

## A JVM működése

A Java forráskód (`.java` fájl) a fordítás után **bájtkódra** (`.class` fájl) alakul. Ezt a bájtkódot a **Java Virtuális Gép** (JVM) futtatja. A JVM feladata, hogy a bájtkódot a konkrét operációs rendszeren futtassa, ezért a Java nyelv platformfüggetlen: ugyanaz a bájtkód Windows-on, Linuxon és macOS-en is működik.

A JVM főbb részei:

- **Class loader** – betölti a szükséges `.class` fájlokat.
- **Bájtkód-értelmező és JIT fordító** – a bájtkódot futtatja, a gyakran használt részeket gépi kódra fordítja a gyorsabb működés érdekében.
- **Memóriakezelés** – a szemétgyűjtő (garbage collector) automatikusan felszabadítja azokat az objektumokat, amelyekre már nincs hivatkozás.

```bash
javac Program.java    # fordítás: Program.class készül
java Program          # futtatás a JVM-mel
```

**Magyarázat:** A `javac` a forráskódot bájtkóddá fordítja, a `java` parancs elindítja a JVM-et, amely betölti és futtatja a `Program` osztályt. Az objektumok memóriáját nekünk nem kell kézzel felszabadítani, ezt a szemétgyűjtő végzi.

## Többdimenziós tömbök

A többdimenziós tömb tömbök tömbje. A leggyakoribb a kétdimenziós tömb, amely egy táblázatot vagy mátrixot modellez:

```java
public class KetdimenziosTomb {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.println(matrix.length);    // 2 (sorok száma)
        System.out.println(matrix[0].length); // 3 (oszlopok száma)
        System.out.println(matrix[1][2]);     // 6

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

**Magyarázat:** A `matrix[i]` az `i`-edik sort adja, amely maga is egy tömb. Ezért a `matrix[i].length` az adott sor hosszát adja. Mivel a sorok hossza különbözhet, a Java „szaggatott” (jagged) tömböket is támogat, ahol minden sor más hosszúságú.

## Random számok (röviden)

A véletlen számok egyik egyszerű forrása a `Math.random()` metódus, amely 0.0 (beleértve) és 1.0 (kizárva) közötti `double` értéket ad vissza. Egész számtartományra alakítva:

```java
public class VeletlenSzamok {
    public static void main(String[] args) {
        int kocka = (int) (Math.random() * 6) + 1; // 1 és 6 közötti egész
        System.out.println("Dobás: " + kocka);
    }
}
```

**Magyarázat:** A `Math.random() * 6` a 0 és 6 közötti tartományba esik, a `(int)` levágja a tizedesrészt, a `+ 1` pedig eltolja az eredményt 1 és 6 közé. A részletesebb használatot a 14. témakörben tárgyaljuk.

## JAR fájlok készítése

A JAR (Java ARchive) fájl egy ZIP alapú csomag, amely több `.class` fájlt és egyéb erőforrást egyben tartalmaz. Egy futtatható JAR-nak meg kell adni a belépési pontot (a `main` metódust tartalmazó osztályt) a `MANIFEST.MF` fájlban:

```bash
javac -d out Program.java          # a .class fájlok az out mappába kerülnek
jar --create --file program.jar --main-class Program -C out .
java -jar program.jar              # futtatás a JAR fájlból
```

**Magyarázat:** A `-d out` kapcsoló a fordítás kimeneti mappáját adja meg. A `jar --create` parancs becsomagolja a fordított fájlokat, a `--main-class` pedig beírja a belépési pontot a manifestbe, így a `java -jar` közvetlenül tudja futtatni.

## Összefoglalás

- A Java forráskód bájtkóddá fordul, amelyet a JVM futtat; ezért a program platformfüggetlen.
- A szemétgyűjtő automatikusan felszabadítja a már nem használt objektumokat.
- A többdimenziós tömb tömbök tömbje; sorok hossza eltérhet (szaggatott tömb).
- A `Math.random()` 0 és 1 közötti értéket ad; ebből egész tartomány állítható elő.
- A JAR fájl összecsomagolt, futtatható Java program; a belépési pont a manifestben van megadva.

## Ellenőrző kérdések

1. Melyik fájl keletkezik a `javac` fordítás után, és mit tartalmaz?
2. Mi a különbség a `matrix.length` és a `matrix[0].length` között egy kétdimenziós tömbnél?
3. Hogyan állítanánk elő 10 és 20 közötti egész véletlen számot?
4. Miért kell megadni a `--main-class` kapcsolót egy futtatható JAR készítésekor?
