export const PORTRAIT_FALLBACK_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a.png&w=1024&q=92';

export const ABOUT_STICKERS = ['funds', 'git-it-girl', 'cursor', 'coding-cat', 'engineer'] as const;

export const PROFILE = {
  name: 'Нандин-Эрдэнэ',
  role: 'Мэдээллийн системийн оюутан',
  tagline: 'Өдөр тутмын асуудлыг хялбарчлах вэб апп бүтээдэг.',
  githubUrl: 'https://github.com/nandydn555-cell',
  bio: {
    paragraphs: [
      'Би Мэдээллийн системийн чиглэлээр суралцдаг, дизайн болон технологийн огтлолцолд өөрийгөө хөгжүүлж буй оюутан.',
      'Санаагаа загвар болгон дүрслэхээс эхлээд код бичиж, бодит бүтээгдэхүүн болгох хүртэлх бүтээлч үйл явц надад хамгийн сонирхолтой санагддаг.',
      'Миний хувьд сайн дизайн гэдэг зөвхөн гоё харагдах биш, харин хэрэглэгчдэд ойлгомжтой, хүртээмжтэй, хэрэглэхэд таатай байхыг хэлнэ.',
    ],
    closing: 'Суралцаж, туршиж, бүтээж, өдөр бүр өчигдрийн өөрөөсөө нэг алхам урагшлахыг хичээдэг.',
  },
};

export const PUBLIC_CONTACT = {
  email: 'nandydn555@gmail.com',
  instagramUrl: 'https://www.instagram.com/nainiiyaa/',
};

interface CredentialBadge {
  name: string;
  issuer: string;
  imageSrc?: string;
  credentialUrl?: string;
}

export const CREDENTIAL_BADGES: readonly CredentialBadge[] = [
  {
    name: 'Step Up: Skills for Employability C1',
    issuer: 'Pearson English Language Learning',
    imageSrc: '/badges/pearson-employability-c1.png',
    credentialUrl: 'https://www.credly.com/badges/399e0d5a-8179-4c50-8658-4fe33164dcec/public_url',
  },
];

interface MicrosoftLearnModule {
  slug: string;
  name: string;
  completedOn: string;
  passedAssessment?: boolean;
}

export const MICROSOFT_LEARN_MODULES: readonly MicrosoftLearnModule[] = [
  {
    slug: 'csharp-format-strings',
    name: 'Format alphanumeric data for presentation in C#',
    completedOn: '2026-11-22',
    passedAssessment: true,
  },
  {
    slug: 'csharp-arrays-operations',
    name: 'Perform operations on arrays using helper methods in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'csharp-convert-cast',
    name: 'Convert data types using casting and conversion techniques in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'csharp-choose-data-type',
    name: 'Choose the correct data type in your C# code',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'csharp-evaluate-boolean-expressions',
    name: 'Evaluate Boolean expressions to make decisions in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'challenge-project-develop-branching-looping-structures-c-sharp',
    name: 'Challenge project - Develop branching and looping structures in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'guided-project-develop-conditional-branching-looping',
    name: 'Guided project - Develop conditional branching and looping structures in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'csharp-do-while',
    name: 'Add looping logic to your code using the do-while and while statements in C#',
    completedOn: '2026-11-17',
  },
  {
    slug: 'csharp-for',
    name: 'Iterate through a code block using for statement in C#',
    completedOn: '2026-11-17',
    passedAssessment: true,
  },
  {
    slug: 'csharp-switch-case',
    name: 'Branch the flow of code using the switch-case construct in C#',
    completedOn: '2026-11-17',
  },
  {
    slug: 'csharp-code-blocks',
    name: 'Control variable scope and logic using code blocks in C#',
    completedOn: '2026-11-17',
  },
  {
    slug: 'csharp-read-write-files',
    name: 'Read and write files in C#',
    completedOn: '2026-11-16',
    passedAssessment: true,
  },
];

export interface SkillItem {
  number: string;
  name: string;
  description: string;
}

interface ProjectImage {
  src: string;
  alt: string;
  portrait?: boolean;
  fit?: 'contain';
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  deliverables: string[];
  images: ProjectImage[];
  demoUrl?: string;
  repositoryUrl?: string;
}

export const SERVICES: SkillItem[] = [
  {
    number: '01',
    name: 'Вэб хөгжүүлэлт',
    description: 'React, JavaScript, HTML, CSS ашиглан Lensline камерын дэлгүүрийн вэб апп хөгжүүлсэн.',
  },
  {
    number: '02',
    name: 'Өгөгдлийн сан',
    description: 'SQL Server, Supabase ашиглаж, өгөгдлийн сангийн хүснэгт, SQL хүсэлт, мөрийн түвшний хандалтын бодлого (RLS) дээр ажилласан.',
  },
  {
    number: '03',
    name: 'Компьютерын сүлжээ',
    description: 'Cisco Packet Tracer дээр чиглүүлэгч болон DHCP, DNS, HTTP үйлчилгээг тохируулж, сүлжээний ажиллагааг шалгасан.',
  },
];

export const SKILLS: SkillItem[] = [
  ...SERVICES,
  {
    number: '04',
    name: 'UI/UX дизайн',
    description: 'Figma, Canva ашиглан хэрэглэгчийн интерфэйс, дэлгэцийн бүдүүвч (wireframe), портфолиогийн загвар боловсруулдаг.',
  },
  {
    number: '05',
    name: 'Системийн шинжилгээ',
    description: 'Системийн шаардлага тодорхойлж, хэрэглээний тохиолдол (Use Case), өгөгдлийн холбоосын диаграм (ERD) болон үйл явцыг загварчилсан.',
  },
  {
    number: '06',
    name: 'Программчлал',
    description: 'JavaScript, SQL, C, Java хэлний суурь мэдлэгтэй.',
  },
  {
    number: '07',
    name: 'Төслийн менежмент',
    description: 'Төслийн төлөвлөгөө боловсруулж, Fishbone диаграм болон Паретогийн шинжилгээгээр асуудлын шалтгааныг тодорхойлсон.',
  },
  {
    number: '08',
    name: 'Дижитал контент бүтээх',
    description: 'TikTok видео, Reels, визуал контент болон илтгэлийн материал бүтээдэг.',
  },
  {
    number: '09',
    name: 'Судалгаа, тайлагнал',
    description: 'Судалгаа хийж, мэдээлэл нэгтгэн, үр дүнг тайлан болгон боловсруулдаг.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'feeling-tracker',
    name: 'Petal & Ink',
    category: 'Вэб апп',
    summary: 'Хуудас эргүүлж болдог 3D өдрийн тэмдэглэл. Өдөр бүрийн сэтгэл санаа, онцлох мөчөө бичиж, сарын тоймоо графикаар харж болно. Дэвтрээ стикерээр чимэглэж, хуудасныхаа зургийг PNG файлаар татах боломжтой. Тэмдэглэлүүд хөтөч дээр хадгалагддаг.',
    deliverables: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'D3.js', 'localStorage'],
    images: [
      { src: '/projects/petal-and-ink.webp', alt: 'Petal & Ink-ийн 3D дэвтэр, сарын сэтгэл санааны хуанли', fit: 'contain' },
    ],
    demoUrl: 'https://feeling-tracker.vercel.app/',
  },
  {
    id: 'celestial-planner',
    name: 'Celestial Planner',
    category: 'Вэб апп',
    summary: 'Өдрийн ажлаа эрэмбэлж, дуусаагүй ажлаа маргааш руу шилжүүлэх боломжтой төлөвлөгч. Цагийн хуваарь, өдрийн тэмдэглэл, зорилгоо зураг, бичвэрээр цуглуулах Vision Board-той. Төлөвлөгөөг хөтөч дээр хадгалж, JSON файлаар нөөцөлж болно.',
    deliverables: ['React', 'Vite', 'Tailwind CSS', 'localStorage'],
    images: [
      { src: '/projects/celestial-planner.webp', alt: 'Celestial Grace төлөвлөгчийн өдрийн ажлын жагсаалт, тэмдэглэл ба хавтаснууд', fit: 'contain' },
    ],
    demoUrl: 'https://celestial-planner-sigma.vercel.app/',
  },
  {
    id: 'lensline',
    name: 'Lensline камерын дэлгүүр',
    category: 'Цахим худалдаа',
    summary: 'Камер, дагалдах хэрэгслийн онлайн дэлгүүрийн туршилтын хувилбар. Би хайлттай каталог, хэрэглэгчийн бүртгэл, сагс, төлбөрийн туршилтын урсгал болон бараа, захиалга удирдах хэсгийг хийсэн.',
    deliverables: ['React', 'Vite', 'TypeScript', 'Supabase'],
    images: [
      { src: '/projects/lensline-storefront.jpg', alt: 'Lensline дэлгүүрийн нүүр хуудас' },
      { src: '/projects/lensline-products.jpg', alt: 'Lensline дэлгүүрийн бүтээгдэхүүний каталог, хайлт болон шүүлтүүрүүд' },
      { src: '/projects/lensline-product-detail.jpg', alt: 'Lensline дэлгүүр дэх Nikon Z f камерын зураг, үнэ болон үзүүлэлт' },
      { src: '/projects/lensline-phone.jpg', alt: 'Lensline дэлгүүрийн нүүр хуудас гар утсан дээр', portrait: true },
    ],
    repositoryUrl: 'https://github.com/nandydn555-cell/camera',
  },
  {
    id: 'museum',
    name: 'ISM цахим музей',
    category: 'Цахим архив',
    summary: 'Мэдээллийн системийн менежментийн тэнхимийн цахим архив. Би архив үзэх, хайх, оюутнууд бүтээл илгээх, админ хянаж нийтлэх хэсгүүд дээр ажилласан.',
    deliverables: ['React', 'Vite', 'PostgreSQL', 'Supabase Auth', 'Supabase Storage'],
    images: [
      { src: '/projects/museum-home.png', alt: 'ISM цахим музейн нүүр хуудас' },
    ],
    demoUrl: 'https://swe-hw-9f89.vercel.app/',
    repositoryUrl: 'https://github.com/nandydn555-cell/swe-hw',
  },
  {
    id: 'sakura-zen',
    name: 'Sakura Zen',
    category: 'Судоку тоглоом',
    summary: 'Сакура цэцэг, усан будгийн луугаар чимэглэсэн судоку тоглоом. Шинэчилсэн дэлгэцэд 9×9 самбар, тоглолтын хугацаа, алдааны тоо, тэмдэглэл, сэжүүр болон үйлдэл буцаах товчнууд нэг дор харагдана.',
    deliverables: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
    images: [
      { src: '/projects/sakura-blossom.png', alt: 'Сакура цэцэг, лууны зурагтай шинэ Zen Sudoku дэлгэц', fit: 'contain' },
    ],
  },
  {
    id: 'packet-tracer',
    name: 'Cisco Packet Tracer',
    category: 'Сүлжээний симуляци',
    summary: 'Хоёр дотоод сүлжээг чиглүүлэгчээр холбож, төхөөрөмжүүдэд IP хаяг автоматаар оноох DHCP үйлчилгээг тохируулсан. Дараа нь төхөөрөмжүүд DNS-ээр вэб серверээ олж, HTTP-ээр холбогдохыг шалгасан.',
    deliverables: ['Cisco Packet Tracer', 'DHCP', 'DNS', 'HTTP'],
    images: [],
  },
];
