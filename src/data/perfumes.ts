import { Perfume, Testimonial, PillarItem } from '../types'

export const PERFUMES: Perfume[] = [
  {
    id: 'oud-royal',
    ar: 'عود رويال',
    en: 'Oud Royal',
    fam: 'Eau de Parfum',
    notes: 'عود · زعفران · عنبر',
    price: '١٢٥٠',
    tag: 'الأكثر مبيعًا',
    tint: '#B68A35',
    opacity: 0.34,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 15 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 12 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 8 },
    ],
    description:
      'عطر أيقوني في مجموعة ناسامات. يبدأ بعود نقي ثم يستقر على دفء عنبري غني يترك أثرًا واضحًا وراقيًا.',
    story:
      'مستوحى من أساطير العود العربي القديم، صُمّم هذا العطر ليعكس فخامة الحضارة العربية بصياغة معاصرة.',
  },
  {
    id: 'rose-damascus',
    ar: 'ورد دمشقي',
    en: 'Rose Damascus',
    fam: 'Eau de Parfum',
    notes: 'ورد دمشقي · مسك · عسل',
    price: '١١٠٠',
    tag: '',
    tint: '#B5687A',
    opacity: 0.4,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 18 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 14 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 10 },
    ],
    description:
      'أنوثة هادئة وناعمة في تركيبة وردية مخملية تذوب تدريجيًا في دفء مسك نظيف ولمسة عسلية شفافة.',
    story:
      'مستوحى من حدائق دمشق القديمة، حيث يزهر الورد كأنّه يكتبه الضوء كل صباح.',
  },
  {
    id: 'musk-nowar',
    ar: 'مسك نوار',
    en: 'Musk Nowar',
    fam: 'Eau de Parfum',
    notes: 'مسك أبيض · فانيليا · أرز',
    price: '٩٨٠',
    tag: 'جديد',
    tint: '#9A8A6E',
    opacity: 0.34,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 20 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 16 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 12 },
    ],
    description:
      'نظافة دافئة وحنين هادئ. مسك أبيض نقي يلتقي بحلاوة الفانيليا وخشب الأرز في أثر ناعم وحميم.',
    story:
      'صُمّم تكريمًا للنور الهادئ الذي يرافق اليوم بلا ضجيج، مثل حضور لطيف يظل قريبًا.',
  },
  {
    id: 'amber-oud',
    ar: 'عنبر وعود',
    en: 'Amber & Oud',
    fam: 'Extrait de Parfum',
    notes: 'عنبر · عود · أرز',
    price: '١٣٥٠',
    tag: '',
    tint: '#A6642B',
    opacity: 0.4,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 10 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 8 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 5 },
    ],
    description:
      'تركيز عالٍ من الفخامة والثبات. تركيب استثنائي يجمع ثقل العود الملكي مع دفء عنبر غني ومتوازن.',
    story:
      'الخيار المفضل لمن يريد حضورًا قويًا واثقًا يدوم طوال اليوم ويوقّع المكان قبل أن يغادره.',
  },
  {
    id: 'night',
    ar: 'ليل',
    en: 'Night',
    fam: 'Eau de Parfum',
    notes: 'بخور · جلد · باتشولي',
    price: '١٢٠٠',
    tag: '',
    tint: '#3A3550',
    opacity: 0.46,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 14 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 11 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 7 },
    ],
    description:
      'غموض ناعم داخل زجاجة. بخور شرقي قديم يمتزج مع جلد طبيعي وباتشولي داكن لصياغة ليلية عميقة.',
    story:
      'مستوحى من ليالي الصحراء واتساعها، صُمّم لمن يحب العطر الذي يهمس أكثر مما يتكلم.',
  },
  {
    id: 'nasamah',
    ar: 'نسمة',
    en: 'Nasamah',
    fam: 'Eau de Toilette',
    notes: 'نيرولي · حمضيات · مسك',
    price: '٨٩٠',
    tag: '',
    tint: '#C9A94E',
    opacity: 0.34,
    image: '/assets/bottle-shot.png',
    sizes: [
      { size: '50ml', ml: 50, priceMultiplier: 1, stock: 22 },
      { size: '100ml', ml: 100, priceMultiplier: 1.8, stock: 18 },
      { size: '250ml', ml: 250, priceMultiplier: 4, stock: 14 },
    ],
    description:
      'خفيفة وحيوية وواضحة. بداية حمضية مشرقة تتحول تدريجيًا إلى مسك ناعم يلازم البشرة بلطف.',
    story:
      'تحية صباحية من ناسامات، عطر حرّ ومنتعش يرافقك بخفة وأناقة طوال اليوم.',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    rating: 5,
    quote:
      'ثباته مدهش، والعطر بيظل معايا طول اليوم. الفخامة هنا حقيقية، وفي نفس الوقت السعر معقول جدًا.',
    author: 'ليلى عبد الرحمن',
    location: 'القاهرة',
    avatar: 'ل',
  },
  {
    id: '2',
    rating: 5,
    quote:
      'عود رويال بقى توقيعي. التغليف يوصل كأنه هدية، والرائحة عربية أصيلة بمعنى الكلمة.',
    author: 'خالد المنصوري',
    location: 'دبي',
    avatar: 'خ',
  },
  {
    id: '3',
    rating: 5,
    quote:
      'اشتريته هدية لأمي وعجبها جدًا. النسمة ناعمة وراقية، ومش تقيلة ولا مبالغ فيها.',
    author: 'منة فؤاد',
    location: 'الإسكندرية',
    avatar: 'م',
  },
]

export const PILLARS: PillarItem[] = [
  { ar: 'الأصالة', en: 'Authenticity' },
  { ar: 'الرقي', en: 'Refinement' },
  { ar: 'القيمة', en: 'Value' },
  { ar: 'الثبات', en: 'Consistency' },
]

export const NOTES = [
  {
    glyph: 'ع',
    ar: 'العود',
    en: 'Oud',
    desc: 'قلب ملكي دافئ، عمق دخاني يبقى طويلًا على البشرة ويمنح التركيبة حضورها.',
  },
  {
    glyph: 'م',
    ar: 'المسك',
    en: 'Musk',
    desc: 'نعومة قريبة من الجلد، حضور حميمي صافٍ وهادئ يوازن ثقل التركيبة.',
  },
  {
    glyph: 'و',
    ar: 'الورد',
    en: 'Rose',
    desc: 'ورد دمشقي مخملي، تفتح راقٍ يوازن دفء المكونات ويمنح العطر أنوثة واضحة.',
  },
  {
    glyph: 'ع',
    ar: 'العنبر',
    en: 'Amber',
    desc: 'عنبر دافئ على فراش من الخشب، أثر طويل البقاء يضفي عمقًا وفخامة.',
  },
]
