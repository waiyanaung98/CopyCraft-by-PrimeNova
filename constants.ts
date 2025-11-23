import { Framework, Language, Tone, ContentPillar, TranslationResource, BrandProfile, AppMode } from './types';
import { 
  Megaphone, 
  AlertCircle, 
  ArrowRight, 
  Gift, 
  HelpCircle, 
  Sparkles,
  BookOpen,
  Clapperboard,
  Youtube,
  Film,
  ListVideo,
  Mic
} from 'lucide-react';

export const MODE_LABELS: TranslationResource = {
  [AppMode.COPYWRITING]: { [Language.EN]: 'Copywriting', [Language.MY]: 'ကြော်ငြာစာရေးရန်', [Language.TH]: 'เขียนคำโฆษณา' },
  [AppMode.SCRIPTWRITING]: { [Language.EN]: 'Scriptwriting', [Language.MY]: 'ဗီဒီယိုဇာတ်ညွှန်းရေးရန်', [Language.TH]: 'เขียนบทวิดีโอ' }
};

export const COPY_FRAMEWORKS_LIST = [
  Framework.AIDA, Framework.PAS, Framework.BAB, Framework.FAB, 
  Framework.QUEST, Framework.FOUR_P, Framework.PASTOR, Framework.FREESTYLE
];

export const SCRIPT_FRAMEWORKS_LIST = [
  Framework.HOOK_VALUE_CTA, Framework.HERO_JOURNEY, Framework.EXPLAINER, 
  Framework.PROBLEM_SOLUTION_STORY, Framework.LISTICLE_VIDEO
];

export const FRAMEWORK_DETAILS = {
  // --- COPYWRITING FRAMEWORKS ---
  [Framework.AIDA]: {
    title: 'AIDA Model',
    description: 'Attention, Interest, Desire, Action. The classic copywriting formula.',
    icon: Megaphone
  },
  [Framework.PAS]: {
    title: 'PAS Formula',
    description: 'Problem, Agitation, Solution. Perfect for addressing pain points.',
    icon: AlertCircle
  },
  [Framework.BAB]: {
    title: 'Before-After-Bridge',
    description: 'Show the current pain, the future benefit, and how to get there.',
    icon: ArrowRight
  },
  [Framework.FAB]: {
    title: 'Feature-Advantage-Benefit',
    description: 'Turn technical features into desirable benefits.',
    icon: Gift
  },
  [Framework.QUEST]: {
    title: 'QUEST',
    description: 'Qualify, Understand, Educate, Stimulate, Transition.',
    icon: HelpCircle
  },
  [Framework.FOUR_P]: {
    title: 'The 4 Ps',
    description: 'Promise, Picture, Proof, Push. Persuasive and visual.',
    icon: BookOpen
  },
  [Framework.PASTOR]: {
    title: 'PASTOR',
    description: 'Problem, Amplify, Story, Transformation, Offer, Response.',
    icon: BookOpen
  },
  [Framework.FREESTYLE]: {
    title: 'Freestyle / Social',
    description: 'Creative, engaging posts for social media without a strict structure.',
    icon: Sparkles
  },

  // --- SCRIPTWRITING FRAMEWORKS ---
  [Framework.HOOK_VALUE_CTA]: {
    title: 'Hook-Value-CTA (Shorts)',
    description: 'Fast-paced 15-60s script. Grab attention, deliver value, call to action.',
    icon: Film
  },
  [Framework.HERO_JOURNEY]: {
    title: 'Hero\'s Journey',
    description: 'Classic storytelling: Call to adventure, challenges, and transformation.',
    icon: Clapperboard
  },
  [Framework.EXPLAINER]: {
    title: 'The Explainer',
    description: 'What is it? Who is it for? How does it work? Why do you need it?',
    icon: Youtube
  },
  [Framework.PROBLEM_SOLUTION_STORY]: {
    title: 'VSL (Video Sales Letter)',
    description: 'Detailed problem analysis, emotional story, and logical solution.',
    icon: Mic
  },
  [Framework.LISTICLE_VIDEO]: {
    title: 'Listicle / Top X',
    description: 'Structured list format (e.g., "5 Ways to...") perfect for engagement.',
    icon: ListVideo
  }
};

export const TONE_LABELS: TranslationResource = {
  [Tone.PROFESSIONAL]: { [Language.EN]: 'Professional', [Language.MY]: 'ပရော်ဖက်ရှင်နယ်', [Language.TH]: 'มืออาชีพ' },
  [Tone.FRIENDLY]: { [Language.EN]: 'Friendly', [Language.MY]: 'ရင်းနှီးသော', [Language.TH]: 'เป็นกันเอง' },
  [Tone.URGENT]: { [Language.EN]: 'Urgent', [Language.MY]: 'အရေးကြီးသော', [Language.TH]: 'เร่งด่วน' },
  [Tone.WITTY]: { [Language.EN]: 'Witty', [Language.MY]: 'ဟာသဉာဏ်ရှိသော', [Language.TH]: 'ชาญฉลาด' },
  [Tone.EMOTIONAL]: { [Language.EN]: 'Emotional', [Language.MY]: 'ခံစားချက်ပါသော', [Language.TH]: 'มีอารมณ์ร่วม' },
  [Tone.LUXURY]: { [Language.EN]: 'Luxury', [Language.MY]: 'ခန့်ညားထည်ဝါသော', [Language.TH]: 'หรูหรา' },
  [Tone.DRAMATIC]: { [Language.EN]: 'Dramatic', [Language.MY]: 'ဒရာမာဆန်သော', [Language.TH]: 'ดราม่า' },
  [Tone.EXCITED]: { [Language.EN]: 'Excited', [Language.MY]: 'စိတ်လှုပ်ရှားဖွယ်', [Language.TH]: 'ตื่นเต้น' }
};

export const PILLAR_LABELS: TranslationResource = {
  [ContentPillar.EDUCATIONAL]: { [Language.EN]: 'Educational', [Language.MY]: 'ပညာပေး', [Language.TH]: 'การศึกษา' },
  [ContentPillar.PROMOTIONAL]: { [Language.EN]: 'Promotional', [Language.MY]: 'ကြော်ငြာ', [Language.TH]: 'โปรโมชั่น' },
  [ContentPillar.INSPIRATIONAL]: { [Language.EN]: 'Inspirational', [Language.MY]: 'စိတ်ဓာတ်ခွန်အား', [Language.TH]: 'สร้างแรงบันดาลใจ' },
  [ContentPillar.ENTERTAINMENT]: { [Language.EN]: 'Entertainment', [Language.MY]: 'ဖျော်ဖြေရေး', [Language.TH]: 'บันเทิง' },
  [ContentPillar.BEHIND_SCENES]: { [Language.EN]: 'Behind the Scenes', [Language.MY]: 'နောက်ကွယ်', [Language.TH]: 'เบื้องหลัง' },
  [ContentPillar.COMMUNITY]: { [Language.EN]: 'Community/Reviews', [Language.MY]: 'သုံးသပ်ချက်များ', [Language.TH]: 'ชุมชน/รีวิว' }
};

export const TRANSLATIONS = {
  appTitle: {
    [Language.EN]: 'CopyCraft AI',
    [Language.MY]: 'CopyCraft AI',
    [Language.TH]: 'CopyCraft AI'
  },
  appSubtitle: {
    [Language.EN]: 'Professional Content Generator',
    [Language.MY]: 'အဆင့်မြင့် စာရေးလက်ထောက်',
    [Language.TH]: 'ผู้ช่วยเขียนคอนเทนต์มืออาชีพ'
  },
  selectFramework: {
    [Language.EN]: 'Select Framework',
    [Language.MY]: 'Framework ရွေးချယ်ပါ',
    [Language.TH]: 'เลือกโครงสร้าง'
  },
  productTopic: {
    [Language.EN]: 'What are you writing about?',
    [Language.MY]: 'အကြောင်းအရာခေါင်းစဉ်',
    [Language.TH]: 'หัวข้อคอนเทนต์'
  },
  scriptTopic: {
    [Language.EN]: 'Video Topic / Title',
    [Language.MY]: 'ဗီဒီယို ခေါင်းစဉ်',
    [Language.TH]: 'หัวข้อวิดีโอ'
  },
  productDesc: {
    [Language.EN]: 'Product Details / Context',
    [Language.MY]: 'အကြောင်းအရာအသေးစိတ်',
    [Language.TH]: 'รายละเอียด'
  },
  scriptDesc: {
    [Language.EN]: 'Key Points to Cover',
    [Language.MY]: 'ပါဝင်ရမည့် အချက်အလက်များ',
    [Language.TH]: 'ประเด็นสำคัญ'
  },
  tone: {
    [Language.EN]: 'Tone of Voice',
    [Language.MY]: 'လေသံ (Tone)',
    [Language.TH]: 'น้ำเสียง'
  },
  targetAudience: {
    [Language.EN]: 'Target Audience',
    [Language.MY]: 'ဦးတည်ပရိသတ်',
    [Language.TH]: 'กลุ่มเป้าหมาย'
  },
  outputLanguage: {
    [Language.EN]: 'Output Language',
    [Language.MY]: 'ဘာသာစကားရွေးရန်',
    [Language.TH]: 'ภาษาผลลัพธ์'
  },
  generateBtn: {
    [Language.EN]: 'Generate Content',
    [Language.MY]: 'ဖန်တီးမည်',
    [Language.TH]: 'สร้างคอนเทนต์'
  },
  generating: {
    [Language.EN]: 'Creating magic...',
    [Language.MY]: 'ဖန်တီးနေပါသည်...',
    [Language.TH]: 'กำลังเขียน...'
  },
  resultTitle: {
    [Language.EN]: 'Generated Content',
    [Language.MY]: 'ရလဒ်',
    [Language.TH]: 'คอนเทนต์ที่ได้'
  },
  copyBtn: {
    [Language.EN]: 'Copy',
    [Language.MY]: 'ကူးယူမည်',
    [Language.TH]: 'คัดลอก'
  },
  copied: {
    [Language.EN]: 'Copied!',
    [Language.MY]: 'ကူးယူပြီး',
    [Language.TH]: 'คัดลอกแล้ว!'
  },
  clearBtn: {
    [Language.EN]: 'Clear',
    [Language.MY]: 'ရှင်းမည်',
    [Language.TH]: 'ล้าง'
  },
  pillar: {
    [Language.EN]: 'Content Pillar',
    [Language.MY]: 'Content အမျိုးအစား',
    [Language.TH]: 'ประเภทคอนเทนต์'
  },
  brandSection: {
    [Language.EN]: 'Brand Identity',
    [Language.MY]: 'Brand အချက်အလက်',
    [Language.TH]: 'ข้อมูลแบรนด์'
  },
  addNewBrand: {
    [Language.EN]: '+ Add New',
    [Language.MY]: '+ အသစ်ထည့်မည်',
    [Language.TH]: '+ เพิ่มใหม่'
  },
  selectBrand: {
    [Language.EN]: 'Select a Brand Profile (Optional)',
    [Language.MY]: 'Brand Profile ရွေးပါ (မရွေးလဲရသည်)',
    [Language.TH]: 'เลือกโปรไฟล์แบรนด์ (ไม่บังคับ)'
  }
};

export const DEFAULT_BRANDS: BrandProfile[] = [
  {
    id: 'demo-1',
    name: 'TechNova',
    industry: 'Consumer Electronics',
    description: 'Innovative gadgets for the modern lifestyle. High-tech meets minimal design.',
    defaultTone: Tone.WITTY,
    defaultAudience: 'Tech enthusiasts, Early adopters, Ages 18-35'
  },
  {
    id: 'demo-2',
    name: 'GreenLeaf Organics',
    industry: 'Health & Wellness',
    description: '100% organic supplements and superfoods sourced sustainably.',
    defaultTone: Tone.FRIENDLY,
    defaultAudience: 'Health-conscious individuals, Eco-friendly consumers'
  }
];