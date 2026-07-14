export type Priority = "ALTA" | "MEDIA" | "BASSA";

export type RaccomandataSeed = {
  code: string;
  metaTitle: string;
  metaDescription: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  mittente: string;
  tipologia: string;
  stato: string;
  priority: Priority;
  steps: { title: string; description: string }[];
  details: { title: string; body: string }[];
  faq: { title: string; items: { q: string; a: string }[] };
  authorBox: { name: string; avatarUrl: string; updatedAt: string };
  _createdAt: string;
  _updatedAt: string;
};

export type CodiceTributoSeed = {
  slug: string;
  code?: string;
  kind: "code" | "guide";
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  sections: { title: string; paragraphs: string[] }[];
  highlights: string[];
  faq: { q: string; a: string }[];
  updatedAt: string;
};

const SEED_DATE = "2026-07-14T00:00:00Z";

function raccomandataDefaultFaq(code: string, topic: string) {
  return {
    title: `Domande frequenti sul codice ${code}`,
    items: [
      {
        q: `Il codice ${code} indica sempre la stessa cosa?`,
        a: `No. La scheda è orientativa e va letta insieme al mittente, al contesto e all'avviso ricevuto. Per il codice ${code} abbiamo raccolto il tema ${topic} come ipotesi più frequente.`,
      },
      {
        q: `Cosa devo controllare subito?`,
        a: "Controlla mittente, ufficio di ritiro, data sull'avviso e l'eventuale presenza di un termine da rispettare.",
      },
      {
        q: `Posso ignorare la notifica?`,
        a: "Meglio di no: anche quando sembra una comunicazione ordinaria, conviene verificare il contenuto prima possibile.",
      },
    ],
  };
}

function codiceTributoDefaultFaq(label: string) {
  return [
    {
      q: `A cosa serve ${label}?`,
      a: "La scheda spiega il contesto più comune del codice, come leggerlo nel modello F24 e quali controlli fare prima del pagamento.",
    },
    {
      q: `Devo verificare un anno o un comune?`,
      a: "Sì, quando il tributo è collegato a IMU, TARI o imposte locali conviene controllare sempre anno, sezione e ente di riferimento.",
    },
    {
      q: `Questa pagina sostituisce le istruzioni ufficiali?`,
      a: "No. È una guida editoriale pensata per aiutarti a orientarti prima di verificare il modello ufficiale o il supporto del commercialista.",
    },
  ];
}

function buildRaccomandataSeed(input: {
  code: string;
  topic: string;
  mittente: string;
  priority?: Priority;
  heroTitleSuffix?: string;
  heroSubtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
}): RaccomandataSeed {
  const code = input.code.trim();
  const topic = input.topic.trim();
  const priority = input.priority ?? "MEDIA";
  const heroTitleSuffix = input.heroTitleSuffix ?? "Guida aggiornata al 2026";
  const heroSubtitle =
    input.heroSubtitle ??
    `Secondo il cluster di ricerca, il codice ${code} viene cercato soprattutto per capire se la notifica riguarda ${topic}.`;

  return {
    code,
    metaTitle:
      input.metaTitle ?? `Raccomandata Market ${code}: significato, mittente e cosa fare`,
    metaDescription:
      input.metaDescription ??
      `Guida al codice ${code} con focus su ${topic}. Controlla mittente, urgenza e termini di ritiro prima di agire.`,
    heroTitleSuffix,
    heroSubtitle,
    mittente: input.mittente,
    tipologia: "Raccomandata Market",
    stato: "È di natura legale",
    priority,
    steps: [
      {
        title: "Controlla il codice e il mittente",
        description:
          `Verifica che il codice ${code} coincida con quello sull'avviso e confronta il mittente con il contesto più frequente: ${topic}.`,
      },
      {
        title: "Leggi i termini di ritiro",
        description:
          "Se c'è un avviso di giacenza, controlla subito i giorni disponibili e dove si trova l'ufficio postale indicato.",
      },
      {
        title: "Prepara una risposta rapida",
        description:
          "Quando la notifica riguarda pagamenti, carte, solleciti o documenti richiesti, conviene muoversi prima della scadenza.",
      },
    ],
    details: [
      {
        title: "Perché questa scheda esiste",
        body:
          `Il codice ${code} compare spesso nelle ricerche di chi vuole capire in anticipo se la comunicazione riguarda ${topic}. La pagina aiuta a orientarsi senza dare per scontato il contenuto ufficiale.`,
      },
      {
        title: "Cosa verificare prima di ritirare",
        body:
          "Guarda sempre avviso, data, ufficio di ritiro e ogni riferimento presente sul piego. Se il messaggio arriva da banca, ente o fornitore, confronta anche eventuali canali ufficiali.",
      },
    ],
    faq: raccomandataDefaultFaq(code, topic),
    authorBox: {
      name: "Arauze Editorial Team",
      avatarUrl: "/images/author.jpg",
      updatedAt: SEED_DATE,
    },
    _createdAt: SEED_DATE,
    _updatedAt: SEED_DATE,
  };
}

function buildCodiceTributoSeed(input: {
  slug: string;
  code?: string;
  kind: "code" | "guide";
  title: string;
  topic: string;
  metaTitle?: string;
  metaDescription?: string;
  heroSubtitle?: string;
  highlights: string[];
  intro?: string;
}): CodiceTributoSeed {
  const label = input.code ? `codice tributo ${input.code}` : input.title;
  return {
    slug: input.slug,
    code: input.code,
    kind: input.kind,
    title: input.title,
    metaTitle:
      input.metaTitle ??
      `${input.title} – guida pratica, F24 e casi d'uso`,
    metaDescription:
      input.metaDescription ??
      `Guida al ${label}: spiegazione chiara, contesto d'uso e controlli da fare prima del pagamento.`,
    heroSubtitle:
      input.heroSubtitle ??
      `Un aiuto pratico per capire quando compare ${label} nel modello F24 e quali controlli fare prima di pagare.`,
    sections: [
      {
        title: "In breve",
        paragraphs: [
          input.intro ??
            `Questa pagina raccoglie il contesto più utile su ${label}, con un taglio editoriale orientato alla lettura rapida e ai controlli essenziali.`,
        ],
      },
      {
        title: "Cosa controllare",
        paragraphs: [
          "Verifica la sezione del modello, l'anno di riferimento, l'eventuale ente di destinazione e la coerenza con la tua situazione fiscale.",
        ],
      },
    ],
    highlights: input.highlights,
    faq: codiceTributoDefaultFaq(label),
    updatedAt: SEED_DATE,
  };
}

export const RACCOMANDATA_SEEDS: RaccomandataSeed[] = [
  buildRaccomandataSeed({
    code: "647",
    topic: "multe e atti giudiziari",
    mittente: "Multa / Verbale di contestazione",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "648",
    topic: "comunicazioni bancarie e assicurative",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "649",
    topic: "avvisi fiscali o amministrativi",
    mittente: "Agenzia delle Entrate / Fisco",
  }),
  buildRaccomandataSeed({
    code: "664",
    topic: "verifiche documentali e pratiche pubbliche",
    mittente: "Ente pubblico / Ufficio amministrativo",
  }),
  buildRaccomandataSeed({
    code: "684",
    topic: "INPS e pratiche previdenziali",
    mittente: "INPS / Previdenza",
  }),
  buildRaccomandataSeed({
    code: "6848",
    topic: "INPS e avvisi previdenziali",
    mittente: "INPS / Previdenza",
  }),
  buildRaccomandataSeed({
    code: "6849",
    topic: "INPS e comunicazioni amministrative",
    mittente: "INPS / Previdenza",
  }),
  buildRaccomandataSeed({
    code: "685",
    topic: "banca e recupero crediti",
    mittente: "Banca / Recupero crediti",
  }),
  buildRaccomandataSeed({
    code: "6856",
    topic: "variazioni bancarie e carte",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "6857",
    topic: "carte e comunicazioni bancarie",
    mittente: "Banca / Finanziaria",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "6858",
    topic: "operazioni bancarie e verifiche interne",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "689",
    topic: "bollo auto e comunicazioni fiscali",
    mittente: "Agenzia delle Entrate / Fisco",
  }),
  buildRaccomandataSeed({
    code: "695",
    topic: "comunicazioni amministrative e di ritiro",
    mittente: "Ente pubblico / Servizio amministrativo",
  }),
  buildRaccomandataSeed({
    code: "696",
    topic: "banca, carte di credito e servizi",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "6967",
    topic: "comunicazioni bancarie di supporto",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "6968",
    topic: "carte di credito e verifiche finanziarie",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "699",
    topic: "comunicazioni miste di natura legale",
    mittente: "Ente pubblico / Ufficio amministrativo",
  }),
  buildRaccomandataSeed({
    code: "572",
    topic: "avviso di cortesia e Agenzia delle Entrate",
    mittente: "Agenzia delle Entrate",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "5727",
    topic: "varianti RKE e avvisi di cortesia",
    mittente: "Agenzia delle Entrate",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "618",
    topic: "solleciti fiscali e pagamenti",
    mittente: "Agenzia delle Entrate / Fisco",
  }),
  buildRaccomandataSeed({
    code: "785",
    topic: "comunicazioni amministrative secondarie",
    mittente: "Ente pubblico / Servizio postale",
  }),
  buildRaccomandataSeed({
    code: "1-g30",
    topic: "avviso di cortesia e tracciamento postale",
    mittente: "Poste Italiane",
  }),
  buildRaccomandataSeed({
    code: "07a",
    topic: "avviso di cortesia e comunicazione interna",
    mittente: "Poste Italiane",
  }),
  buildRaccomandataSeed({
    code: "200",
    topic: "avvisi fiscali e comunicazioni amministrative",
    mittente: "Agenzia delle Entrate / Poste Italiane",
  }),
  buildRaccomandataSeed({
    code: "201",
    topic: "notifiche fiscali e pagamenti da verificare",
    mittente: "Agenzia delle Entrate / Fisco",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "386",
    topic: "atti giudiziari e multe",
    mittente: "Tribunale / Polizia locale",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "529",
    topic: "recupero crediti e comunicazioni amministrative",
    mittente: "Recupero crediti / Ufficio notifiche",
  }),
  buildRaccomandataSeed({
    code: "549",
    topic: "comunicazioni fiscali e pratiche amministrative",
    mittente: "Agenzia delle Entrate / Fisco",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "616",
    topic: "controlli bancari e comunicazioni amministrative",
    mittente: "Banca / Finanziaria",
  }),
  buildRaccomandataSeed({
    code: "617",
    topic: "atti giudiziari e solleciti amministrativi",
    mittente: "Ente pubblico / Ufficio notifiche",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "619",
    topic: "atti giudiziari e comunicazioni fiscali",
    mittente: "Agenzia delle Entrate / Ufficio notifiche",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "665",
    topic: "raccomandate market e comunicazioni postali",
    mittente: "Poste Italiane / Raccomandata Market",
  }),
  buildRaccomandataSeed({
    code: "669",
    topic: "multe, atti giudiziari e notifiche amministrative",
    mittente: "Polizia locale / Ufficio notifiche",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "697",
    topic: "avvisi fiscali e notifiche postali importanti",
    mittente: "Agenzia delle Entrate / Poste Italiane",
    priority: "ALTA",
  }),
  buildRaccomandataSeed({
    code: "786",
    topic: "atti giudiziari e notifiche legali",
    mittente: "Tribunale / Ufficio notifiche",
  }),
  buildRaccomandataSeed({
    code: "788",
    topic: "atti giudiziari e raccomandate market",
    mittente: "Tribunale / Poste Italiane",
  }),
];

export const CODICE_TRIBUTO_SEEDS: CodiceTributoSeed[] = [
  buildCodiceTributoSeed({
    slug: "codice-tributo",
    kind: "guide",
    title: "Codice tributo",
    topic: "il significato generale dei codici tributo",
    highlights: [
      "Spiega la logica del codice tributo dentro il modello F24.",
      "Aiuta a distinguere fra tributi, sanzioni e interessi.",
      "Introduce i controlli base prima di pagare.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codici-tributo",
    kind: "guide",
    title: "Codici tributo",
    topic: "la ricerca di più codici tributo insieme",
    highlights: [
      "Raccoglie i casi più cercati dagli utenti.",
      "Serve come hub per i codici singoli più richiesti.",
      "Aiuta a orientarsi quando il tributo non è immediatamente chiaro.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-f24",
    kind: "guide",
    title: "Codice tributo F24",
    topic: "l'uso del codice tributo nel modello F24",
    highlights: [
      "Indica dove leggere il tributo nel modello.",
      "Spiega le sezioni e i campi da controllare.",
      "Aggiunge il collegamento con il pagamento corretto.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-per-f24",
    kind: "guide",
    title: "Codice tributo per F24",
    topic: "la ricerca del codice da inserire nel modello F24",
    highlights: [
      "Pensata per chi sta compilando il modello e vuole evitare errori.",
      "Spiega dove leggere il tributo e come confrontarlo con l'atto.",
      "Utile per i casi in cui il codice non è chiaro al primo sguardo.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codici-tributo-f24",
    kind: "guide",
    title: "Codici tributo F24",
    topic: "la ricerca dei codici tributo nell'F24",
    highlights: [
      "Raccoglie i codici più cercati per il modello F24.",
      "Aiuta a distinguere tributi, sanzioni e interessi.",
      "Funziona come hub di navigazione verso le pagine singole.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codici-tributo-per-f24",
    kind: "guide",
    title: "Codici tributo per F24",
    topic: "i codici da usare nel modello F24",
    highlights: [
      "Guida utile quando bisogna trovare il codice corretto.",
      "Mette in ordine le ricerche più frequenti.",
      "Aiuta a capire se il tributo va controllato con attenzione extra.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-imu",
    kind: "guide",
    title: "Codice tributo IMU",
    topic: "i pagamenti IMU",
    highlights: [
      "Hub per acconto, saldo e seconda casa.",
      "Contiene i controlli su comune, anno e importo.",
      "Raggruppa le ricerche più frequenti sull'IMU.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-imu-saldo",
    kind: "guide",
    title: "Codice tributo IMU saldo",
    topic: "il saldo IMU",
    highlights: [
      "Pensata per chi sta chiudendo il versamento di fine anno.",
      "Aiuta a controllare il comune e l'anno di riferimento.",
      "Perfetta per la ricerca del tributo corretto nel saldo IMU.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-imu-seconda-casa",
    kind: "guide",
    title: "Codice tributo IMU seconda casa",
    topic: "l'IMU sulla seconda casa",
    highlights: [
      "Guida molto richiesta per i versamenti IMU sugli immobili secondari.",
      "Spiega il contesto d'uso e i controlli prima del pagamento.",
      "Aiuta a evitare confusione con altre casistiche immobiliari.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-tari",
    kind: "guide",
    title: "Codice tributo TARI",
    topic: "i pagamenti TARI",
    highlights: [
      "Spiega dove compare la TARI nell'F24.",
      "Aiuta a controllare l'ente di destinazione.",
      "Raccoglie i dubbi più comuni sugli importi locali.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-acconto-cedolare-secca",
    kind: "guide",
    title: "Codice tributo acconto cedolare secca",
    topic: "l'acconto della cedolare secca",
    highlights: [
      "Raccoglie le ricerche legate all'acconto della cedolare secca.",
      "Aiuta a controllare saldo, acconto e anno di imposta.",
      "Utile per chi gestisce immobili in locazione.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-cedolare-secca",
    kind: "guide",
    title: "Codice tributo cedolare secca",
    topic: "la cedolare secca e gli acconti",
    highlights: [
      "Pensata per chi cerca il riferimento corretto in F24.",
      "Aiuta a distinguere saldo, acconto e sanzioni.",
      "Include il controllo sull'anno di imposta.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-ravvedimento-operoso",
    kind: "guide",
    title: "Codice tributo ravvedimento operoso",
    topic: "il ravvedimento operoso",
    highlights: [
      "Raccoglie i casi di sanzioni e interessi.",
      "Spiega come leggere il tributo correttamente.",
      "Utile per chi regolarizza un pagamento in ritardo.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-imposta-di-bollo-fatture-elettroniche",
    kind: "guide",
    title: "Codice tributo imposta di bollo fatture elettroniche",
    topic: "l'imposta di bollo sulle fatture elettroniche",
    highlights: [
      "Copre i casi più cercati su bollo e fatture elettroniche.",
      "Aiuta a distinguere il tributo principale da interessi o sanzioni.",
      "Riunisce le varianti con importo e fatturazione digitale.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-registrazione-contratto-di-locazione",
    kind: "guide",
    title: "Codice tributo registrazione contratto di locazione",
    topic: "la registrazione di un contratto di locazione",
    highlights: [
      "Guida pensata per contratti e adempimenti locativi.",
      "Aiuta a controllare il riferimento corretto dell'F24.",
      "Crea un ponte tra locazione e imposta da versare.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codice-tributo-credito-imposta-4-0",
    kind: "guide",
    title: "Codice tributo credito imposta 4.0",
    topic: "il credito d'imposta 4.0",
    highlights: [
      "Raggruppa le ricerche su industria, beni strumentali e investimenti 4.0.",
      "Aiuta a leggere i codici più tecnici del credito d'imposta.",
      "Utile per chi compila F24 con riferimenti agevolativi.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "codici-tributo-inail",
    kind: "guide",
    title: "Codici tributo INAIL",
    topic: "i pagamenti INAIL",
    highlights: [
      "Hub utile per i versamenti collegati a INAIL.",
      "Spiega come orientarsi tra tributi, premi e scadenze.",
      "Aiuta a leggere correttamente la sezione del modello.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "3918",
    kind: "code",
    code: "3918",
    title: "Codice tributo 3918",
    topic: "IMU e altri fabbricati",
    metaTitle: "Codice tributo 3918: cos'è e quando si usa per IMU",
    metaDescription:
      "Codice tributo 3918: guida rapida per capire il riferimento IMU, cosa controllare nel modello F24 e come leggere il versamento.",
    heroSubtitle:
      "Una scheda pensata per chi cerca il 3918 nel contesto IMU e vuole capire subito se sta leggendo un acconto, un saldo o un altro versamento.",
    highlights: [
      "Tra le query più forti del cluster IMU.",
      "Serve per capire il riferimento in F24.",
      "Va sempre verificato con comune e anno.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "3944",
    kind: "code",
    code: "3944",
    title: "Codice tributo 3944",
    topic: "TARI",
    metaTitle: "Codice tributo 3944: significato, TARI e controlli F24",
    metaDescription:
      "Scheda pratica sul codice tributo 3944, collegato alla TARI: cosa verificare nel modello F24 e quali errori evitare.",
    highlights: [
      "Cerca soprattutto chi sta pagando la TARI.",
      "È utile per controllare l'ente locale corretto.",
      "Aiuta a distinguere tributo e sanzioni.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "4001",
    kind: "code",
    code: "4001",
    title: "Codice tributo 4001",
    topic: "saldo IRPEF e imposte personali",
    metaTitle: "Codice tributo 4001: significato e uso nell'F24",
    metaDescription:
      "Guida al codice tributo 4001: contesto d'uso, controlli su saldo e sezione F24 e differenza rispetto ad altri codici vicini.",
    highlights: [
      "Tra le ricerche ad alto volume del cluster tributi.",
      "Richiede attenzione a saldo e anno di riferimento.",
      "Conviene verificarlo con il modello ufficiale.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "9001",
    kind: "code",
    code: "9001",
    title: "Codice tributo 9001",
    topic: "versamenti fiscali da verificare",
    metaTitle: "Codice tributo 9001: cos'è e come leggerlo",
    metaDescription:
      "Scheda orientativa sul codice tributo 9001, utile per capire la sezione di versamento e i controlli da fare prima di pagare.",
    highlights: [
      "Ha un volume consistente e molte varianti correlate.",
      "Va sempre letto nel contesto del modello F24.",
      "La pagina aiuta a non confondere tributo e causale.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "1001",
    kind: "code",
    code: "1001",
    title: "Codice tributo 1001",
    topic: "ritenute e versamenti da lavoro dipendente",
    metaTitle: "Codice tributo 1001: guida pratica e casi d'uso",
    metaDescription:
      "Il codice tributo 1001 ricorre spesso nei versamenti con F24: ecco come leggerlo, cosa controllare e quando verificare l'anno di riferimento.",
    highlights: [
      "Molto cercato nelle ricerche F24.",
      "Va letto con attenzione alla sezione corretta.",
      "Utile per controllare ritenute e versamenti periodici.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "8055",
    kind: "code",
    code: "8055",
    title: "Codice tributo 8055",
    topic: "imposte collegate a bollo e adempimenti tecnici",
    metaTitle: "Codice tributo 8055: cos'è e quando compare",
    metaDescription:
      "Scheda informativa sul codice tributo 8055, con focus sui casi più frequenti e sui controlli da fare nel modello F24.",
    highlights: [
      "Rientra tra le ricerche legate al bollo e al F24.",
      "Può comparire in contesti tecnici da verificare con attenzione.",
      "Conviene confrontarlo con l'atto o l'istruzione ufficiale.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "8056",
    kind: "code",
    code: "8056",
    title: "Codice tributo 8056",
    topic: "varianti collegate al bollo o a imposte tecniche",
    metaTitle: "Codice tributo 8056: significato e controlli",
    metaDescription:
      "Guida editoriale al codice tributo 8056, utile per capire in quale sezione F24 compare e quali verifiche fare prima del pagamento.",
    highlights: [
      "Spesso cercato insieme al 8055.",
      "Richiede la verifica della sezione del modello.",
      "Aiuta a distinguere tributo principale e interessi.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "9120",
    kind: "code",
    code: "9120",
    title: "Codice tributo 9120",
    topic: "imposta di bollo sulle fatture elettroniche",
    metaTitle: "Codice tributo 9120: imposta di bollo fatture elettroniche",
    metaDescription:
      "Il 9120 è tra i codici più cercati per l'imposta di bollo sulle fatture elettroniche: guida rapida per leggerlo correttamente.",
    highlights: [
      "Keyword molto vicina al tema bollo fatture elettroniche.",
      "Serve a controllare importo e periodicità.",
      "Utile per chi gestisce fatturazione digitale.",
    ],
  }),
  buildCodiceTributoSeed({
    slug: "3916",
    kind: "code",
    code: "3916",
    title: "Codice tributo 3916",
    topic: "IMU e fabbricati particolari",
    metaTitle: "Codice tributo 3916: significato e uso IMU",
    metaDescription:
      "Scheda sintetica per il codice tributo 3916, utile per orientarsi nelle pagine IMU e nei controlli sull'F24.",
    highlights: [
      "Collegato al cluster IMU.",
      "Va letto insieme a comune e anno di riferimento.",
      "Buona pagina di atterraggio per ricerche specifiche.",
    ],
  }),
];

export function getRaccomandataSeed(code: string): RaccomandataSeed | undefined {
  const normalized = code.trim().toLowerCase();
  return RACCOMANDATA_SEEDS.find((item) => item.code.toLowerCase() === normalized);
}

export function getCodiceTributoSeed(slug: string): CodiceTributoSeed | undefined {
  const normalized = slug.trim().toLowerCase();
  return CODICE_TRIBUTO_SEEDS.find((item) => item.slug.toLowerCase() === normalized);
}

