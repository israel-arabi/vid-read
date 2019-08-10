export const lettersDataKeys: (keyof LetterData)[] = [
  "name",
  "transcription",
  "isolated",
  "initial",
  "centered",
  "final"
];

export type allowedLettersDataKeys = [
  "name" |
  "transcription" |
  "isolated" |
  "initial" |
  "centered" |
  "final"
];

export type valueof<T> = T[keyof T];

export interface LetterData {
  isolated: string;
  final: string;
  name: string;
  transcription: string;
  initial?: string;
  centered?: string;
}

export const letterDataKeysHebrew = {
  isolated: "מבודדת",
  initial: "תחילית",
  centered: "אמצעית",
  final: "סופית",
  name: "שם",
  transcription: "תעתיק"
};

export const lettersData: LetterData[] = [
  {
    isolated: "ا",
    initial: "",
    centered: "",
    final: "ﺎ",
    name: "אליף",
    transcription: "א"
  },
  {
    isolated: "ﻻ",
    final: "ـﻼ",
    name: "לאם+אליף",
    transcription: "לַא"
  },
  {
    isolated: "ﻻ",
    initial: "",
    centered: "",
    final: "ـﻼ",
    name: "לאם+אליף",
    transcription: "לַא"
  },
  {
    isolated: "ب",
    initial: "بـ",
    centered: "ـبـ",
    final: "ـب",
    name: "בַּא",
    transcription: "בּ"
  },
  {
    isolated: "ت",
    initial: "تـ",
    centered: "ـتـ",
    final: "ـت",
    name: "תַּא",
    transcription: "ת"
  },
  {
    isolated: "ث",
    initial: "ثـ",
    centered: "ـثـ",
    final: "ـث",
    name: "ת׳א",
    transcription: "ת׳"
  },
  {
    isolated: "ج",
    initial: "جـ",
    centered: "ـجـ",
    final: "ـج",
    name: "ג׳ים",
    transcription: "ג׳"
  },
  {
    isolated: "ح",
    initial: "حـ",
    centered: "ـحـ",
    final: "ـح",
    name: "חא",
    transcription: "ח"
  },
  {
    isolated: "خ",
    initial: "خـ",
    centered: "ـخـ",
    final: "ـخ",
    name: "ח׳א",
    transcription: 'ח׳ או כ"ף רפה'
  },
  {
    isolated: "د",
    initial: "",
    centered: "",
    final: "ـد",
    name: "דַאל",
    transcription: "ד"
  },
  {
    isolated: "ذ",
    initial: "",
    centered: "",
    final: "ـذ",
    name: "ד׳אל",
    transcription: "ד׳"
  },
  {
    isolated: "ر",
    initial: "",
    centered: "",
    final: "ـر",
    name: "רא",
    transcription: "ר"
  },
  {
    isolated: "ز",
    initial: "",
    centered: "",
    final: "ـز",
    name: "זאי",
    transcription: "ז"
  },
  {
    isolated: "س",
    initial: "سـ",
    centered: "ـسـ",
    final: "س",
    name: "סין",
    transcription: "ס"
  },
  {
    isolated: "ش",
    initial: "شـ",
    centered: "ـشـ",
    final: "ـش",
    name: "שׁין",
    transcription: "ש"
  },
  {
    isolated: "ص",
    initial: "صـ",
    centered: "ـصـ",
    final: "ـص",
    name: "סאד\nצאד",
    transcription: "פשוט: ס\nמדויק: צ/ץ"
  },
  {
    isolated: "ض",
    initial: "ضـ",
    centered: "ـضـ",
    final: "ـض",
    name: "דאד\nצ׳אד",
    transcription: "פשוט: ד\nמדויק: צ׳"
  },
  {
    isolated: "ط",
    initial: "طـ",
    centered: "ـطـ",
    final: "ـط",
    name: "טא",
    transcription: "ט"
  },
  {
    isolated: "ظ",
    initial: "ظـ",
    centered: "ـظـ",
    final: "ـظ",
    name: "זא\nט׳א",
    transcription: "פשוט: ז\nמדויק: ט׳"
  },
  {
    isolated: "ع",
    initial: "عـ",
    centered: "ـعـ",
    final: "ـع",
    name: "עַיְן",
    transcription: "ע"
  },
  {
    isolated: "غ",
    initial: "غـ",
    centered: "ـغـ",
    final: "ـغ",
    name: "רין או גין\nע׳ין",
    transcription: "פשוט: ר או ג\nמדויק: ע׳"
  },
  {
    isolated: "ف",
    initial: "فـ",
    centered: "ـفـ",
    final: "ـف",
    name: "פא",
    transcription: "פֿ"
  },
  {
    isolated: "ق",
    initial: "قـ",
    centered: "ـقـ",
    final: "ـق",
    name: "קאף",
    transcription: "ק"
  },
  {
    isolated: "ك",
    initial: "كـ",
    centered: "ـكـ",
    final: "ـك",
    name: "כאף",
    transcription: "כ (גם בסוף מילה)"
  },
  {
    isolated: "ل",
    initial: "لـ",
    centered: "ـلـ",
    final: "ـل",
    name: "לאם",
    transcription: "ל"
  },
  {
    isolated: "م",
    initial: "مـ",
    centered: "ـمـ",
    final: "ـم",
    name: "מים",
    transcription: "מ"
  },
  {
    isolated: "ن",
    initial: "نـ",
    centered: "ـنـ",
    final: "ـن",
    name: "נון",
    transcription: "נ או ן"
  },
  {
    isolated: "ه",
    initial: "هـ",
    centered: "ـهـ",
    final: "ـه",
    name: "הַא",
    transcription: "ה"
  },
  {
    isolated: "ة",
    initial: "",
    centered: "",
    final: "ـة",
    name: "תַּא מַרְבּוּטַה (לא ממש אות)",
    transcription: "בנפרד: ה, בנסמך: ת"
  },
  {
    isolated: "و",
    initial: "",
    centered: "",
    final: "ـو",
    name: "װַאוּ",
    transcription: "ו"
  },
  {
    isolated: "ى",
    initial: "",
    centered: "",
    final: "ـى",
    name: "אַלִיף מַקְצוּרַה (לא ממש אות)",
    transcription: "א"
  },
  {
    isolated: "ي",
    initial: "يـ",
    centered: "ـيـ",
    final: "ـي",
    name: "יא",
    transcription: "י"
  },
  {
    isolated: "لا",
    initial: "",
    centered: "",
    final: "ـﻼ",
    name: "לאם+אליף",
    transcription: "לַא"
  }
];
