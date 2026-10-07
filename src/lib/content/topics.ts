// A témakörök egyetlen forrása. Új témakör hozzáadásához:
// 1. Tegyél egy új .md fájlt a `temak/` mappába (a `file` mező nevével, kiterjesztés nélkül).
// 2. Vegyél fel egy új elemet ebbe a listába, a megfelelő sorrendi számmal.

export type Topic = {
	order: number;
	slug: string;
	title: string;
	file: string;
};

export const topics: Topic[] = [
	{ order: 1, slug: 'ismerkedes-a-java-nyelvvel', title: 'Ismerkedés a Java nyelvvel', file: '01-ismerkedes-a-java-nyelvvel' },
	{ order: 2, slug: 'a-string-osztaly', title: 'A String osztály', file: '02-a-string-osztaly' },
	{ order: 3, slug: 'osztalyok-es-objektumok', title: 'Osztályok, objektumok', file: '03-osztalyok-es-objektumok' },
	{ order: 4, slug: 'lathatosag-getter-setter-statikus-attributumok', title: 'Láthatósági szintek, getter/setter, statikus attribútumok', file: '04-lathatosag-getter-setter-statikus-attributumok' },
	{ order: 5, slug: 'statikus-metodusok-tombok', title: 'Statikus metódusok, Math osztály, tömbök', file: '05-statikus-metodusok-tombok' },
	{ order: 6, slug: 'foreach-tulterheles-arraylist', title: 'Foreach, metódus-túlterhelés, ArrayList', file: '06-foreach-tulterheles-arraylist' },
	{ order: 7, slug: 'lista-muveletek-wrapper-osztalyok', title: 'Lista műveletek, wrapper osztályok, típuskonverziók', file: '07-lista-muveletek-wrapper-osztalyok' },
	{ order: 8, slug: 'parancssori-argumentumok-character-stringbuilder', title: 'Parancssori argumentumok, Character, StringBuilder', file: '08-parancssori-argumentumok-character-stringbuilder' },
	{ order: 9, slug: 'fajlkezeles-split-join', title: 'Fájlkezelés, split/join', file: '09-fajlkezeles-split-join' },
	{ order: 10, slug: 'zh1-felkeszules', title: 'ZH #1 – Felkészülés', file: '10-zh1-felkeszules' },
	{ order: 11, slug: 'jvm-tobbdimenzios-tombok-jar', title: 'A JVM, többdimenziós tömbök, JAR fájlok', file: '11-jvm-tobbdimenzios-tombok-jar' },
	{ order: 12, slug: 'oroklodes-assert', title: 'Öröklődés, assert-ek', file: '12-oroklodes-assert' },
	{ order: 13, slug: 'oroklodes-object-osztaly-felulis', title: 'Öröklődés (folyt.), Object osztály, felülírás', file: '13-oroklodes-object-osztaly-felulis' },
	{ order: 14, slug: 'polimorfizmus-absztrakt-final', title: 'Polimorfizmus, absztrakt és final osztályok', file: '14-polimorfizmus-absztrakt-final' },
	{ order: 15, slug: 'random-szamok-unit-tesztek', title: 'Random számok, unit tesztek', file: '15-random-szamok-unit-tesztek' },
	{ order: 16, slug: 'egysegteszteles-csomagok', title: 'Egységtesztelés, csomagok', file: '16-egysegteszteles-csomagok' },
	{ order: 17, slug: 'lathatosag-kivetelek', title: 'Protected és default láthatóság, kivételkezelés', file: '17-lathatosag-kivetelek' },
	{ order: 18, slug: 'set-map-kollekciok', title: 'Kollekciók: Set, Map', file: '18-set-map-kollekciok' },
	{ order: 19, slug: 'interfeszek-kivetelek-fajlkezeles-rendezes', title: 'Interfészek, kivételfajták, fájlkezelés, rendezés', file: '19-interfeszek-kivetelek-fajlkezeles-rendezes' },
	{ order: 20, slug: 'generikus-osztalyok', title: 'Generikus osztályok, Java vége', file: '20-generikus-osztalyok' }
];

export const topicModules = import.meta.glob<{ default: import('svelte').Component }>(
	'/src/lib/content/temak/*.md'
);
