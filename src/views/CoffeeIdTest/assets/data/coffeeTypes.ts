import A1Img from '../img/CoffeeID-animals/BrightRaccoon.webp';
import A2Img from '../img/CoffeeID-animals/BerryFox.webp';
import A3Img from '../img/CoffeeID-animals/AdventureCat.webp';
import A4Img from '../img/CoffeeID-animals/CitrusTanukiThinker.webp';
import B1Img from '../img/CoffeeID-animals/CitrusFawn.webp';
import B2Img from '../img/CoffeeID-animals/CaramelHippo.webp';
import B3Img from '../img/CoffeeID-animals/HoneyBear.webp';
import B4Img from '../img/CoffeeID-animals/GlowingDolphin.webp';
import C1Img from '../img/CoffeeID-animals/PantherRunner.webp';
import C2Img from '../img/CoffeeID-animals/CreamyBuffalo.webp';
import C3Img from '../img/CoffeeID-animals/DeepwoodBear.webp';
import C4Img from '../img/CoffeeID-animals/GreyWolfAnalyst.webp';
import D1Img from '../img/CoffeeID-animals/IndieOwl.webp';
import D2Img from '../img/CoffeeID-animals/CocoaSloth.webp';
import D3Img from '../img/CoffeeID-animals/OldSoulBlackBear.webp';
import D4Img from '../img/CoffeeID-animals/MistDeer.webp';
import E1Img from '../img/CoffeeID-animals/DawnlightFox.webp';
import E2Img from '../img/CoffeeID-animals/CloudglowRabbit.webp';
import E3Img from '../img/CoffeeID-animals/MistwoodHound.webp';
import E4Img from '../img/CoffeeID-animals/HazeplumeCrane.webp';

export const coffeePersonas = [
  {
    id: 'A1',
    name: '果香浣熊',
    en: 'Bright Raccoon',
    image: A1Img,
    flavor1: '酸',
    flavor2: '澄澈',
    roasting: '淺焙',
    description: '清新敏捷，觀察力強，擁有旺盛好奇心，是天生的探索者與創作者。',
    beans: ['耶加雪菲', '肯亞', '水洗豆'],
    brew: ['V60', 'Kalita', '冰手沖'],
  },

  {
    id: 'A2',
    name: '莓果狐狸',
    en: 'Berry Fox',
    image: A2Img,
    flavor1: '酸',
    flavor2: '甜',
    roasting: '淺焙',
    description: '活潑直覺、魅力高，是走到哪都能帶來能量與笑容的人。',
    beans: ['衣索比亞果香', '日曬豆'],
    brew: ['手沖', '艾樂壓'],
  },

  {
    id: 'A3',
    name: '探險野貓',
    en: 'Adventure Cat',
    image: A3Img,
    flavor1: '酸',
    flavor2: '醇厚',
    roasting: '中淺焙',
    description: '果斷行動派，在創意與現實之間切換自如，是領導者類型。',
    beans: ['哥倫比亞蜜處理', '肯亞 AA'],
    brew: ['錐形濾杯', '摩卡壺'],
  },

  {
    id: 'A4',
    name: '沉思貍貓',
    en: 'Citrus Tanuki Thinker',
    image: A4Img,
    flavor1: '酸',
    flavor2: '餘韻',
    roasting: '中焙',
    description: '感性與理性並存的深度思考者，擅長品味生活的細節。',
    beans: ['水洗耶加', '瓜地馬拉'],
    brew: ['蒂莫西', '手沖'],
  },

  {
    id: 'B1',
    name: '柑橘小鹿',
    en: 'Citrus Fawn',
    image: B1Img,
    flavor1: '甜',
    flavor2: '酸',
    roasting: '淺焙',
    description: '溫柔可愛又帶點靈氣，能讓人放鬆與感到安心。',
    beans: ['日曬豆', '水洗果香'],
    brew: ['手沖', '冷萃'],
  },

  {
    id: 'B2',
    name: '焦糖河馬',
    en: 'Caramel Hippo',
    image: B2Img,
    flavor1: '甜',
    flavor2: '醇厚',
    roasting: '中〜中深焙',
    description: '慢活療癒型人格，穩定可靠，是朋友的心靈靠山。',
    beans: ['巴西', '哥倫比亞', '甜感豆'],
    brew: ['義式', '美式', '奶咖'],
  },

  {
    id: 'B3',
    name: '蜂蜜熊',
    en: 'Honey Bear',
    image: B3Img,
    flavor1: '甜',
    flavor2: '餘韻',
    roasting: '中淺〜中焙',
    description: '柔和內斂，感性豐富，是讓人安心的暖心存在。',
    beans: ['蜜處理', '衣索比亞', '瓜地馬拉'],
    brew: ['手沖', '浸泡式'],
  },

  {
    id: 'B4',
    name: '微光海豚',
    en: 'Glowing Dolphin',
    image: B4Img,
    flavor1: '甜',
    flavor2: '澄澈',
    roasting: '淺焙',
    description: '自由清爽、感受力強，像海風一般柔軟與靈動。',
    beans: ['水洗豆', '肯亞'],
    brew: ['手沖', '冰釀'],
  },

  {
    id: 'C1',
    name: '黑豹衝鋒者',
    en: 'Panther Runner',
    image: C1Img,
    flavor1: '醇厚',
    flavor2: '酸',
    roasting: '中深焙',
    description: '衝勁十足的行動者，遇到事情總是第一個跳下去做。',
    beans: ['印尼系列', '曼特寧', '蘇門答臘'],
    brew: ['摩卡壺', '義式'],
  },

  {
    id: 'C2',
    name: '奶油水牛',
    en: 'Creamy Buffalo',
    image: C2Img,
    flavor1: '醇厚',
    flavor2: '甜',
    roasting: '中深焙',
    description: '厚實可靠，節奏穩定，是朋友群中的安全感來源。',
    beans: ['巴西', '哥倫比亞'],
    brew: ['法壓', '義式', '美式'],
  },

  {
    id: 'C3',
    name: '深森棕熊',
    en: 'Deepwood Bear',
    image: C3Img,
    flavor1: '醇厚',
    flavor2: '餘韻',
    roasting: '中深〜深焙',
    description: '哲學系人格，喜歡深思、沉靜且有內在力量。',
    beans: ['曼特寧', '蘇門答臘', '印尼深焙'],
    brew: ['義式', '浸泡式'],
  },

  {
    id: 'C4',
    name: '冷靜灰狼',
    en: 'Grey Wolf Analyst',
    image: C4Img,
    flavor1: '醇厚',
    flavor2: '澄澈',
    roasting: '中焙',
    description: '策略高手，專注理性，喜歡精準與效率。',
    beans: ['哥倫比亞水洗', '中焙豆'],
    brew: ['金屬濾杯', '手沖'],
  },

  {
    id: 'D1',
    name: '文青貓頭鷹',
    en: 'Indie Owl',
    image: D1Img,
    flavor1: '餘韻',
    flavor2: '酸',
    roasting: '中焙',
    description: '節奏慢、觀察細膩、具有深度的文青型人格。',
    beans: ['水洗耶加', '衣索比亞', '肯亞'],
    brew: ['手沖', '浸泡式', '冷萃'],
  },

  {
    id: 'D2',
    name: '可可樹懶',
    en: 'Cocoa Sloth',
    image: D2Img,
    flavor1: '餘韻',
    flavor2: '甜',
    roasting: '中焙',
    description: '放鬆療癒型，感性深沉，喜歡慢慢體驗生活。',
    beans: ['蜜處理豆', '巴西甜感豆', '中淺焙豆'],
    brew: ['手沖', '法壓', '冷萃'],
  },

  {
    id: 'D3',
    name: '老靈魂黑熊',
    en: 'Old Soul Black Bear',
    image: D3Img,
    flavor1: '餘韻',
    flavor2: '醇厚',
    roasting: '中深焙',
    description: '內斂、有故事感、智慧型人格。',
    beans: ['曼特寧', '蘇門答臘', '印尼深焙'],
    brew: ['義式', '摩卡壺', '浸泡式'],
  },

  {
    id: 'D4',
    name: '山嵐白鹿',
    en: 'Mist Deer',
    image: D4Img,
    flavor1: '餘韻',
    flavor2: '澄澈',
    roasting: '中淺焙',
    description: '靜謐冷靜、安定感強，如山林間的白鹿。',
    beans: ['水洗豆', '瓜地馬拉', '肯亞'],
    brew: ['手沖', 'V60', '冰手沖'],
  },
  {
    id: 'E1',
    name: '晨光白狐',
    en: 'Dawnlight Fox',
    image: E1Img,
    flavor1: '澄澈',
    flavor2: '酸',
    roasting: '淺焙',
    description: '思緒敏捷、清晰明亮，如晨光般帶著冷靜與靈巧的氣質。',
    beans: ['水洗耶加', '肯亞', '中南美水洗豆'],
    brew: ['V60', 'Kalita', '冰手沖'],
  },

  {
    id: 'E2',
    name: '雲光小兔',
    en: 'Cloudglow Rabbit',
    image: E2Img,
    flavor1: '澄澈',
    flavor2: '甜',
    roasting: '淺〜中淺焙',
    description: '溫柔細膩，感受力敏銳，喜歡純粹自然的甜感與乾淨風味。',
    beans: ['日曬豆', '瓜地馬拉', '水洗甜香豆'],
    brew: ['手沖', '冰釀', '浸泡式'],
  },

  {
    id: 'E3',
    name: '玄霧山犬',
    en: 'Mistwood Hound',
    image: E3Img,
    flavor1: '澄澈',
    flavor2: '醇厚',
    roasting: '中焙',
    description: '踏實冷靜、專注理性，喜歡兼具厚度與透明度的均衡風味。',
    beans: ['哥倫比亞水洗', '印尼豆（輕深焙）', '中焙均衡豆'],
    brew: ['金屬濾杯', '手沖', '法壓'],
  },

  {
    id: 'E4',
    name: '霧羽白鶴',
    en: 'Hazeplume Crane',
    image: E4Img,
    flavor1: '澄澈',
    flavor2: '餘韻',
    roasting: '中淺焙',
    description: '寧靜沉著，喜歡乾淨透明且帶有優雅延伸感的風味。',
    beans: ['瓜地馬拉', '水洗耶加', '肯亞'],
    brew: ['手沖', '冰手沖', '浸泡式'],
  },
];
