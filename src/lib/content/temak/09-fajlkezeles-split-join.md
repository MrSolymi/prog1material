# 9. Fájlkezelés (röviden), split és join

Ebben a témakörben röviden áttekintjük, hogyan olvashatunk szöveges fájlt Java-ban, majd a sztringek felbontásának (`split`) és összefűzésének (`join`) eszközeit nézzük meg. Ezek együtt gyakran használatosak, például egy CSV-szerű fájl feldolgozásánál.

## Fájl olvasása (röviden)

A szöveges fájlok olvasására a `java.nio.file` csomag `Files` osztálya a legegyszerűbb. Az `IOException` kivételt kezelni kell, ezért `try` blokkba tesszük (a kivételekről a 16. és 18. témakörben részletesebben lesz szó).

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FajlOlvasas {
    public static void main(String[] args) {
        try {
            List<String> sorok = Files.readAllLines(Path.of("adatok.txt"));
            for (String sor : sorok) {
                System.out.println(sor);
            }
        } catch (IOException e) {
            System.out.println("Nem sikerült beolvasni a fájlt: " + e.getMessage());
        }
    }
}
```

**Magyarázat:** A `Files.readAllLines` a fájl minden sorát egy listába olvassa. Ha a fájl nem létezik vagy nem olvasható, `IOException` keletkezik, amelyet a `catch` ágban kezelünk.

Fájlba írni hasonlóan lehet a `Files.write` metódussal:

```java
Files.write(Path.of("kimenet.txt"), List.of("első sor", "második sor"));
```

## A split metódus

A `split` egy sztringet a megadott határoló (reguláris kifejezés) mentén darabokra bont, és egy `String[]` tömböt ad vissza:

```java
public class SplitPelda {
    public static void main(String[] args) {
        String sor = "Kovács;Anna;22;5";
        String[] mezok = sor.split(";");

        System.out.println(mezok[0]); // Kovács
        System.out.println(mezok[1]); // Anna
        System.out.println(mezok.length); // 4

        String[] szavak = "alma  körte szilva".split("\\s+");
        System.out.println(szavak.length); // 3
    }
}
```

**Magyarázat:** A `split(";")` pontosvessző mentén vágja a sztringet. Mivel a határoló egy reguláris kifejezés, a speciális karakterek (például a pont vagy a vonal) előtt `\\` jelet kell tenni. A `\\s+` bármilyen hosszúságú szóköz-sorozatot jelent, így a többszörös szóköz sem ad üres elemet.

## A join metódus

A `String.join` a tömb vagy gyűjtemény elemeit összefűzi, és közéjük a megadott elválasztót teszi:

```java
import java.util.List;

public class JoinPelda {
    public static void main(String[] args) {
        String[] gyumolcsok = {"alma", "körte", "szilva"};
        System.out.println(String.join(", ", gyumolcsok)); // alma, körte, szilva

        List<String> nevek = List.of("Anna", "Béla");
        System.out.println(String.join(" | ", nevek));     // Anna | Béla
    }
}
```

**Magyarázat:** A `join` az ellentéte a `split`-nek: a `split` darabol, a `join` összefűz. A `split` és a `join` együtt tipikusan úgy használható, hogy egy sort feldarabolunk, feldolgozzuk az elemeit, majd újra összeállítjuk.

## Összefoglalás

- A `Files.readAllLines` egyszerűen beolvassa a szöveges fájl sorait; a hibákat `IOException` kezeli.
- A `split` egy sztringet határoló mentén tömbbe bont; a határolóban lévő speciális karaktereket escape-elni kell.
- A `String.join` egy elemgyűjteményt elválasztóval fűz össze.

## Ellenőrző kérdések

1. Miért kell a `split` határolóját `\\.` alakban megadni, ha pontot szeretnénk választóként?
2. Mit ad vissza a `"a,,b".split(",")` hívás tömb hossza? (Gondolj át az üres elemekre!)
3. Miért kell `try` blokkba tenni a `Files.readAllLines` hívást?
4. Hogyan lehet egy tömb elemeit szóközzel elválasztva egy sztringbe fűzni?
