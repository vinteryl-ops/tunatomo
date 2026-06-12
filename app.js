/* ==========================================================================
   つなとも (Tunatomo) - アプリケーション ロジック (app.js)
   ========================================================================== */

// Blacklisted words — warning + admin notification + 30s timeout
const BLACKLIST_WORDS = [
  "nigga","nigger","niggas","niggers","pajeet","pajeets","chink","kike","spic","wetback","raghead","sandnigger","coon","cracker","faggot","fag","retard","tranny","dyke","whore","slut"
];

// Tier system based on cumulative XP (totalXP)
const TIERS = [
  { name: "Golden Whale", emoji: "🏆", min: 1000, color: "#f59e0b", bg: "#fef9c3", border: "#fcd34d", css: "tier-golden-whale" },
  { name: "Whale",        emoji: "🐋", min: 500,  color: "#0e7490", bg: "#cffafe", border: "#67e8f9", css: "tier-whale" },
  { name: "Shark",        emoji: "🦈", min: 200,  color: "#0D6EFD", bg: "#dbeafe", border: "#93c5fd", css: "tier-shark" },
  { name: "Tuna",         emoji: "🐟", min: 0,    color: "#16a34a", bg: "#dcfce7", border: "#86efac", css: "tier-tuna" }
];

function getTier(user) {
  const xp = user.totalXP || user.points || 0;
  return TIERS.find(t => xp >= t.min) || TIERS[TIERS.length - 1];
}

function tierBadgeHTML(user, size = "sm") {
  const t = getTier(user);
  const pad = size === "lg" ? "8px 18px" : "4px 10px";
  const fs  = size === "lg" ? "0.9rem" : "0.72rem";
  return `<span class="tier-badge ${t.css}" style="padding:${pad};font-size:${fs};">${t.emoji} ${t.name}</span>`;
}

function containsBlacklist(text) {
  const lower = text.toLowerCase();
  return BLACKLIST_WORDS.some(w => {
    const re = new RegExp(`\\b${w}\\b`, "i");
    return re.test(lower);
  });
}

const TRANSLATIONS = {
  en: {
    "nav-home": "Home",
    "nav-matching": "Find Supporters",
    "nav-booking": "Book Support",
    "nav-events": "Local Events",
    "nav-board": "Q&A Board",
    "nav-info": "Helpful Info",
    "nav-chat": "Chat",
    "nav-admin": "Admin Dashboard",
    "hero-badge": "Multicultural Coexistence Platform",
    "hero-title": "Start your new life in Japan, with friends.",
    "hero-description": "\"Tunatomo\" is a matching and community service for international students, Japanese students, and local residents to connect and support each other.",
    "hero-find-btn": "Find Supporters",
    "hero-book-btn": "Book Support",
    "quick-booking-title": "Companion Support",
    "quick-booking-desc": "Book companion support for municipal procedures, bank account openings, and more.",
    "quick-board-title": "Q&A Board",
    "quick-board-desc": "Post questions and ask everyone for advice about daily life difficulties.",
    "quick-events-title": "Local Events",
    "quick-events-desc": "Join local exchange events and make friends with students and residents!",
    "quick-info-title": "Helpful Guide",
    "quick-info-desc": "Guides on municipal procedures, SIM cards, National Health Insurance, etc.",
    "fish-banner-badge": "Fish Growth & Costumes",
    "fish-banner-title": "Grow your \"Fish\" through active participation!",
    "fish-banner-desc": "Earn points by participating in support, attending events, and answering questions. Unlock cute hats, accessories, and customization items for your fish!",
    "fish-banner-btn": "View My Fish",
    "home-announcements-title": "Latest Announcements",
    "home-events-title": "Recommended Events",
    "home-events-more": "View All →",
    "line-promo-tag": "Consult on LINE",
    "line-promo-title": "Ask us anything on LINE whenever you need help!",
    "line-promo-desc": "The Tunatomo office and supporters will answer your questions and help with minor daily life issues via LINE. Add us by scanning the QR code or clicking the button.",
    "line-promo-btn": "💬 Add Tunatomo on LINE",
    "line-promo-qr-label": "Tunatomo Official LINE",
    "footer-subtitle": "Support network connecting international students and regions",
    "footer-contact": "Contact Us",
    "footer-social-line": "Official LINE Account"
  },
  ja: {
    "nav-home": "ホーム",
    "nav-matching": "サポーターを探す",
    "nav-booking": "支援同行予約",
    "nav-events": "地域交流",
    "nav-board": "相談掲示板",
    "nav-info": "お役立ち情報",
    "nav-chat": "チャット",
    "nav-admin": "管理画面",
    "hero-badge": "多文化共生プラットフォーム",
    "hero-title": "日本での新しい生活を、仲間と共に。",
    "hero-description": "「つなとも」は、日本に住む国際学生と、日本人学生や地域住民がつながり、支え合うためのマッチング・コミュニティサービスです。",
    "hero-find-btn": "サポーターを探す",
    "hero-book-btn": "同行サポートを予約",
    "quick-booking-title": "同行予約",
    "quick-booking-desc": "役所手続きや口座開設などの同行サポートを予約できます。",
    "quick-board-title": "相談掲示板",
    "quick-board-desc": "日々の困りごとや質問を投稿して、みんなに相談できます。",
    "quick-events-title": "地域交流",
    "quick-events-desc": "交流イベントに参加して、他の学生や地域住民と仲良くなろう！",
    "quick-info-title": "お役立ち情報",
    "quick-info-desc": "役所手続き、SIM契約、国民健康保険など各種ガイドを提供。",
    "fish-banner-badge": "魚育成 & コスチューム",
    "fish-banner-title": "活動してあなたの「お魚」を成長させよう！",
    "fish-banner-desc": "サポートへの参加、イベントの出席、相談への回答など、サイト内での活動でポイントを獲得できます。ポイントを集めると、可愛い帽子やアクセサリーなどのコスチュームを解放できます！",
    "fish-banner-btn": "マイフィッシュを見る",
    "home-announcements-title": "最新のお知らせ",
    "home-events-title": "おすすめイベント",
    "home-events-more": "すべて見る →",
    "line-promo-tag": "公式LINEで相談",
    "line-promo-title": "困ったときは、いつでもLINEで気軽にご相談ください！",
    "line-promo-desc": "つなとも事務局とサポートスタッフが、生活の些細な質問や急な困りごとにLINEでお答えします。下のQRコードを読み取るか、URLから友だち追加してください。",
    "line-promo-btn": "💬 LINE友だち追加はこちら",
    "line-promo-qr-label": "つなとも公式LINE",
    "footer-subtitle": "国際学生と地域を結ぶサポートネットワーク",
    "footer-contact": "お問い合わせ",
    "footer-social-line": "LINE公式アカウント"
  }
};

// 1. デモ用初期データ定義
const DEFAULT_SUPPORTERS = [
  {
    id: "supporter_1",
    name: "古川 柚葉",
    role: "student_japanese",
    avatar: "images/Tuna1.jpg",
    university: "Ritsumeikan Asia Pacific University (APU) - Social Studies",
    hometown: "京都府",
    languages: ["日本語", "英語"],
    learnLanguages: ["韓国語"],
    hobbies: ["旅行", "カフェ巡り", "カメラ"],
    skills: ["英会話", "京都案内", "写真撮影"],
    bio: "京都に住んで3年目になります！京都のお寺や美味しいカフェを案内するのが得意です。英語での日常会話ができますので、日本に来たばかりの留学生の方も気軽に相談してくださいね。"
  },
  {
    id: "supporter_2",
    name: "山田 太郎",
    role: "student_japanese",
    avatar: "images/Tuna2.jpg",
    university: "Ritsumeikan Asia Pacific University (APU) - Engineering",
    hometown: "滋賀県",
    languages: ["日本語", "英語", "中国語"],
    learnLanguages: ["中国語"],
    hobbies: ["アニメ", "プログラミング", "料理"],
    skills: ["PC初期設定", "SIM契約同行", "数学指導"],
    bio: "パソコンの設定や、SIMカードの契約、銀行口座の開設など、ちょっと難しい手続きのサポートが得意です。中国語も少し話せます。お気軽にどうぞ！"
  },
  {
    id: "supporter_3",
    name: "高橋 恵子",
    role: "resident_local",
    avatar: "images/Tuna3.jpg",
    university: "地域住民",
    hometown: "京都府京都市",
    languages: ["日本語"],
    learnLanguages: ["英語"],
    hobbies: ["茶道", "着付け", "ガーデニング"],
    skills: ["日本語指導", "家庭料理", "日本文化案内"],
    bio: "地元のボランティアグループで留学生支援をしています。日本の家庭料理を一緒に作ったり、ゴミの出し方などの日常のルールを教えたりできます。安心して日本で暮らせるようにお手伝いします。"
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  { id: 1, date: "2026.06.10", title: "春学期のウェルカムオリエンテーションを開催します！", desc: "国際交流プラザにて、新入留学生向けの交流会を実施します。お茶とお菓子を用意してお待ちしています。" },
  { id: 2, date: "2026.06.05", title: "【重要】国民健康保険の減額申請について", desc: "留学生の方は、役所で保険料の減額申請を行うことで月々の支払いを安くできます。ガイドブックを確認してください。" },
  { id: 3, date: "2026.05.28", title: "ゆうちょ銀行の口座開設サポート同行枠を追加しました", desc: "つなともサポーターと一緒に銀行へ行く予約枠が空いています。予約ページから申請してください。" }
];

const DEFAULT_EVENTS = [
  {
    id: "event_1",
    title: "🗣️ Language Exchange Study Group",
    date: "Every Saturday & Sunday — 14:00 - 17:00",
    location: "APU Campus — Student Hall (Room TBA)",
    cost: "Free 🆓",
    category: "Study",
    desc: "Japanese & English study group merged into one! Japanese students help internationals with Japanese, internationals help with English — everyone wins. All levels welcome. Bring your textbooks, questions, or just come chat. Held every Saturday and Sunday at APU.",
    image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800",
    participants: ["Marie", "古川 柚葉", "山田 太郎", "Kim"],
    recurring: true
  },
  {
    id: "event_2",
    title: "🏕️ Camping Trip — Kyushu Mountains",
    date: "2026年7月19日(日) 08:00 — 7月20日(月) 18:00",
    location: "Kuju Highland, Oita Prefecture (Bus departs from APU)",
    cost: "¥2,500 per person (includes transport & campsite)",
    category: "Outdoor",
    desc: "Escape the city for a night under the stars! We'll set up tents together, cook BBQ, stargaze, and hike trails in the morning. A mix of international and Japanese students. Gear can be shared — just bring your sleeping bag and good vibes.",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800",
    participants: ["古川 柚葉", "山田 太郎"]
  },
  {
    id: "event_3",
    title: "🔥 Beach Bonfire Night — Beppu Beach",
    date: "2026年7月25日(土) 18:00 - 23:00",
    location: "Beppu Shirahama Beach (Meet at APU bus stop 17:30)",
    cost: "¥500 per person (firewood & snacks included)",
    category: "Social",
    desc: "Chill beach night with a bonfire, music, snacks, and good company. We'll play beach games as the sun sets, then gather around the fire for stories and marshmallows. Open to everyone — bring friends! Limited to 30 people.",
    image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800",
    participants: ["Marie"]
  },
  {
    id: "event_4",
    title: "🎮 APU Game & Hangout Night",
    date: "2026年7月11日(土) 19:00 - 22:00",
    location: "APU Campus — Lounge Area",
    cost: "Free 🆓",
    category: "Hangout",
    desc: "Board games, card games, and chill conversation! No theme, no schedule — just show up, meet people, and have fun. Great for first-timers who want to make friends in a relaxed setting. Snacks provided.",
    image: "https://images.pexels.com/photos/1153929/pexels-photo-1153929.jpeg?auto=compress&cs=tinysrgb&w=800",
    participants: ["山田 太郎", "Kim"]
  },
  {
    id: "event_5",
    title: "🍜 Ramen Cook-Off Challenge",
    date: "2026年7月4日(土) 13:00 - 16:00",
    location: "APU Campus — Cooking Room",
    cost: "¥300 per person (ingredients split)",
    category: "Cultural",
    desc: "Teams of mixed nationalities compete to make the best ramen from scratch! Judges will taste and score each bowl. Prizes for the winners. No cooking experience needed — just enthusiasm and a love of ramen.",
    image: "https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&w=800",
    participants: ["古川 柚葉", "高橋 恵子"]
  }
];

const DEFAULT_THREADS = [
  {
    id: "thread_1",
    title: "京都で一番安いスーパーはどこですか？",
    category: "生活",
    author: "Marie (留学生)",
    date: "2026.06.08",
    content: "こんにちは！先週フランスから京都に来ました。大学の近くに住んでいますが、自炊をするために安くて品揃えが良いスーパーを探しています。みなさんのおすすめを教えてください！",
    replies: [
      { author: "古川 柚葉", date: "2026.06.09", content: "Marieさん、京都へようこそ！大学の近くなら「業務スーパー（Gyomu Super）」が圧倒的に安くておすすめです。調味料や冷凍食品がとてもお得ですよ！" },
      { author: "高橋 恵子", date: "2026.06.09", content: "新鮮なお野菜や果物なら、商店街の中にある八百屋さん（八百一など）も安くて質が良いので、ぜひ散歩がてら探してみてくださいね。" }
    ]
  },
  {
    id: "thread_2",
    title: "SIM契約で本人確認書類に何が必要ですか？",
    category: "手続き",
    author: "Kim (留学生)",
    date: "2026.06.05",
    content: "格安SIM（IIJmio）を店舗で契約しようと思っています。在留カードの他にパスポートや学生証も必要でしょうか？また、住所登録は事前に済ませておく必要がありますか？",
    replies: [
      { author: "山田 太郎", date: "2026.06.06", content: "Kimさん、こんにちは！格安SIMの契約には「在留カード（裏面に役所で登録した住所が印字されているもの）」が必須になります。ですので、事前に役所で住所登録をしてから契約に行く必要があります。パスポートも持参しておくと安心です。" }
    ]
  }
];

const SHOP_ITEMS = [
  { id: "straw_hat", name: "麦わら帽子", category: "hat", price: 100, previewClass: "preview-item-straw-hat" },
  { id: "student_hat", name: "学生帽", category: "hat", price: 150, previewClass: "preview-item-student-hat" },
  { id: "crown", name: "王冠", category: "hat", price: 300, previewClass: "preview-item-crown" },
  { id: "cool_sunglasses", name: "サングラス", category: "glasses", price: 80, previewClass: "preview-item-cool-sunglasses" },
  { id: "nerd_glasses", name: "丸メガネ", category: "glasses", price: 50, previewClass: "preview-item-nerd-glasses" },
  { id: "scarf", name: "赤いマフラー", category: "clothing", price: 70, previewClass: "preview-item-scarf" },
  { id: "tie", name: "ネクタイ", category: "clothing", price: 50, previewClass: "preview-item-tie" },
  { id: "kimono", name: "ミニ着物", category: "clothing", price: 250, previewClass: "preview-item-kimono" },
  // Digital Avatars — DiceBear SVG
  { id: "avatar_robot",  name: "🤖 Robot Avatar",     category: "avatar", price: 200, previewClass: "preview-avatar-robot",  dicebearUrl: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=robot01&backgroundColor=b6e3f4" },
  { id: "avatar_pixel",  name: "🎮 Pixel Art Avatar",  category: "avatar", price: 250, previewClass: "preview-avatar-pixel",  dicebearUrl: "https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=pixel01&backgroundColor=c0aede" },
  { id: "avatar_anime",  name: "🌸 Anime Avatar",      category: "avatar", price: 350, previewClass: "preview-avatar-anime",  dicebearUrl: "https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=lorelei01&backgroundColor=ffd5dc" },
  { id: "avatar_fun",    name: "😎 Fun Emoji Avatar",  category: "avatar", price: 150, previewClass: "preview-avatar-fun",    dicebearUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=fun01&backgroundColor=d1f4cc" },
  { id: "avatar_glass",  name: "🌐 Glass Avatar",      category: "avatar", price: 300, previewClass: "preview-avatar-glass",  dicebearUrl: "https://api.dicebear.com/7.x/glass/svg?seed=glass01" },
  // Profile Frames (CSS animated borders)
  { id: "frame_rainbow", name: "🌈 Rainbow Frame",     category: "frame",  price: 400, previewClass: "preview-frame-rainbow", frameClass: "frame-rainbow" },
  { id: "frame_golden",  name: "✨ Golden Frame",       category: "frame",  price: 600, previewClass: "preview-frame-golden",  frameClass: "frame-golden" },
  { id: "frame_neon",    name: "💜 Neon Frame",         category: "frame",  price: 500, previewClass: "preview-frame-neon",    frameClass: "frame-neon" },
  // Profile Effects
  { id: "effect_sparkle", name: "✨ Sparkle Effect",   category: "effect", price: 500, previewClass: "preview-effect-sparkle", effectClass: "effect-sparkle" },
  { id: "effect_holo",   name: "🌈 Holographic",       category: "effect", price: 800, previewClass: "preview-effect-holo",   effectClass: "effect-holo" }
];

// 2. アプリケーション状態管理クラス
class TunatomoApp {
  constructor() {
    this.state = {
      users: [],
      currentUser: null,
      bookings: [],
      events: [],
      threads: [],
      supporters: DEFAULT_SUPPORTERS,
      pointsHistory: [],
      lang: localStorage.getItem("tunatomo_lang") || "ja"
    };
    
    this.init();
  }

  // 初期化・データの読み込み
  init() {
    const savedState = localStorage.getItem("tunatomo_state");
    if (savedState) {
      try {
        this.state = JSON.parse(savedState);
        if (!this.state.chats) this.state.chats = [];
        if (!this.state.reports) this.state.reports = [];
        if (!this.state.pointRequests) this.state.pointRequests = [];
        if (!this.state.reviews) this.state.reviews = [];
        // Merge any new default events that aren't in saved state
        DEFAULT_EVENTS.forEach(def => {
          if (!this.state.events.find(e => e.id === def.id)) {
            this.state.events.unshift(def);
          }
        });
        // Merge hardcoded staff accounts into saved state
        const STAFF_ACCOUNTS = [
          { id: "user_yuzu_admin", email: "yuzu@admin.com", password: "admin", name: "Yuzu", role: "student_japanese", avatar: "images/Tuna8.jpg", university: "Ritsumeikan Asia Pacific University (APU)", college: "APM", semester: "4", hometown: "福岡県", speakLangs: ["日本語","英語"], learnLangs: ["スペイン語"], hobbies: ["音楽","ハイキング","料理"], skills: ["日本語指導","大分案内","英会話サポート"], bio: "Hi! I'm Yuzu, a 4th semester APM student at APU. I love helping international students settle into life in Beppu.", points: 180, level: 2, totalXP: 180, fishName: "YuzuFish", fishColor: "#f59e0b", fishTailColor: "#d97706", activeFishModel: "images/Tuna8.jpg", unlockedItems: [], equippedItems: { hat: null, glasses: null, clothing: null, accessory: null }, agreedToChatRules: true, onboardingDone: true },
          { id: "user_vinter_admin", email: "vinter@admin.com", password: "admin", name: "Vinter", role: "resident", avatar: "images/Tuna10.jpg", university: "一般地域住民", college: "APS", semester: "6", hometown: "大分県別府市", speakLangs: ["日本語","英語","タガログ語"], learnLangs: ["フランス語"], hobbies: ["サーフィン","写真撮影","カフェ開拓"], skills: ["生活手続きサポート","多言語対応","観光案内"], bio: "Hey! I'm Vinter, a local resident in Beppu. I speak English, Japanese, and Filipino. Happy to help with anything!", points: 250, level: 3, totalXP: 350, fishName: "VinterFish", fishColor: "#8b5cf6", fishTailColor: "#7c3aed", activeFishModel: "images/Tuna10.jpg", unlockedItems: ["crown"], equippedItems: { hat: "crown", glasses: null, clothing: null, accessory: null }, agreedToChatRules: true, onboardingDone: true }
        ];
        STAFF_ACCOUNTS.forEach(acc => {
          if (!this.state.users.find(u => u.id === acc.id)) {
            this.state.users.push(acc);
          }
        });
      } catch (e) {
        console.error("State parse error", e);
        this.loadDefaultState();
      }
    } else {
      this.loadDefaultState();
    }

    // ユーザー情報の整合性確認（デモ用にサポーターもユーザーリストに含める）
    this.ensureSupportersInUsers();
    
    this.state.lang = localStorage.getItem("tunatomo_lang") || "ja";
    this.updateLanguageUI();
    
    // イベントリスナーの登録
    this.registerEventListeners();
    this.initRouter();
  }

  // デフォルトデータを読み込み
  loadDefaultState() {
    this.state.users = [
      {
        id: "student_marie",
        email: "marie@example.com",
        password: "password",
        name: "Marie",
        role: "student_international",
        avatar: "images/Tuna4.jpg",
        country: "フランス",
        nativeLang: "フランス語",
        university: "Ritsumeikan Asia Pacific University (APU) - International Relations",
        japaneseLevel: "日常会話レベル",
        hobbies: ["映画鑑賞", "料理", "京都のカフェ巡り"],
        skills: ["フランス語指導", "お菓子作り"],
        bio: "こんにちは！フランスから来たマリーです。日本語を勉強中で、もっと日本の友達を作りたいです。お菓子作りが得意です！",
        points: 120,
        level: 1,
        fishName: "マリーフィッシュ",
        fishColor: "#ff7e5f",
        fishTailColor: "#ff7e5f",
        activeFishModel: "images/Tuna3.jpg",
        unlockedItems: ["nerd_glasses"],
        equippedItems: { hat: null, glasses: "nerd_glasses", clothing: null, accessory: null }
      },
      {
        id: "supporter_1_user",
        email: "yuzuha@example.com",
        password: "password",
        name: "古川 柚葉",
        role: "student_japanese",
        avatar: "images/Tuna1.jpg",
        university: "Ritsumeikan Asia Pacific University (APU) - Social Studies",
        hometown: "京都府",
        speakLangs: ["日本語", "英語"],
        learnLangs: ["韓国語"],
        hobbies: ["旅行", "カフェ巡り", "カメラ"],
        skills: ["英会話", "京都案内", "写真撮影"],
        bio: "京都に住んで3年目になります！京都のお寺や美味しいカフェを案内するのが得意です。英語での日常会話ができますので、日本に来たばかりの留学生の方も気軽に相談してくださいね。",
        points: 200,
        level: 2,
        fishName: "ユズフィッシュ",
        fishColor: "#0D6EFD",
        fishTailColor: "#00A3FF",
        activeFishModel: "images/Tuna6.jpg",
        unlockedItems: ["straw_hat"],
        equippedItems: { hat: "straw_hat", glasses: null, clothing: null, accessory: null },
        agreedToChatRules: true,
        onboardingDone: true
      },
      // yuzu@admin.com — Japanese student supporter
      {
        id: "user_yuzu_admin",
        email: "yuzu@admin.com",
        password: "admin",
        name: "Yuzu",
        role: "student_japanese",
        avatar: "images/Tuna8.jpg",
        university: "Ritsumeikan Asia Pacific University (APU)",
        college: "APM",
        semester: "4",
        hometown: "福岡県",
        speakLangs: ["日本語", "英語"],
        learnLangs: ["スペイン語"],
        hobbies: ["音楽", "ハイキング", "料理"],
        skills: ["日本語指導", "大分案内", "英会話サポート"],
        bio: "Hi! I'm Yuzu, a 4th semester APM student at APU. I love helping international students settle into life in Beppu. Ask me anything about campus life, local spots, or Japanese culture!",
        points: 180,
        level: 2,
        totalXP: 180,
        fishName: "YuzuFish",
        fishColor: "#f59e0b",
        fishTailColor: "#d97706",
        activeFishModel: "images/Tuna8.jpg",
        unlockedItems: [],
        equippedItems: { hat: null, glasses: null, clothing: null, accessory: null },
        agreedToChatRules: true,
        onboardingDone: true
      },
      // vinter@admin.com — local resident supporter
      {
        id: "user_vinter_admin",
        email: "vinter@admin.com",
        password: "admin",
        name: "Vinter",
        role: "resident",
        avatar: "images/Tuna10.jpg",
        university: "一般地域住民",
        college: "APS",
        semester: "6",
        hometown: "大分県別府市",
        speakLangs: ["日本語", "英語", "タガログ語"],
        learnLangs: ["フランス語"],
        hobbies: ["サーフィン", "写真撮影", "カフェ開拓"],
        skills: ["生活手続きサポート", "多言語対応", "観光案内"],
        bio: "Hey! I'm Vinter, a local resident in Beppu with experience helping international students with daily life procedures. I speak English, Japanese, and Filipino. Happy to help with anything from SIM cards to city hall visits!",
        points: 250,
        level: 3,
        totalXP: 350,
        fishName: "VinterFish",
        fishColor: "#8b5cf6",
        fishTailColor: "#7c3aed",
        activeFishModel: "images/Tuna10.jpg",
        unlockedItems: ["crown"],
        equippedItems: { hat: "crown", glasses: null, clothing: null, accessory: null },
        agreedToChatRules: true,
        onboardingDone: true
      }
    ];
    
    // デモ用予約データ
    this.state.bookings = [
      {
        id: "booking_demo_1",
        category: "市役所手続き",
        date: "2026-06-15",
        time: "10:00",
        details: "新しく借りたアパートの区役所で住民票登録と国民健康保険の申請を手伝ってほしいです。",
        studentId: "student_marie",
        studentName: "Marie",
        supporterId: "supporter_1", // 古川 柚葉
        supporterName: "古川 柚葉",
        status: "matched" // pending, matched, completed
      }
    ];

    this.state.events = DEFAULT_EVENTS;
    this.state.threads = DEFAULT_THREADS;
    this.state.pointRequests = [];
    this.state.reviews = [];
    
    // デモ用ポイント履歴
    this.state.pointsHistory = [
      { userId: "student_marie", action: "新規登録ボーナス", points: 50, date: "2026/06/01" },
      { userId: "student_marie", action: "質問投稿: スーパーについて", points: 20, date: "2026/06/08" },
      { userId: "student_marie", action: "イベント参加: たこ焼きパーティー", points: 50, date: "2026/06/10" }
    ];

    // デモ用チャット
    this.state.chats = [
      {
        id: "chat_supporter_1_student_marie",
        userIds: ["supporter_1", "student_marie"],
        messages: [
          { id: "msg_1", senderId: "student_marie", senderName: "Marie", text: "こんにちは！来週の市役所手続きの同行予約について相談したいです。", time: "10:02" },
          { id: "msg_2", senderId: "supporter_1", senderName: "古川 柚葉", text: "こんにちは、Marieさん！転入届と健康保険の手続きですね。喜んでお手伝いします！来週月曜日の午前10時でよろしいですか？", time: "10:05" },
          { id: "msg_3", senderId: "student_marie", senderName: "Marie", text: "はい！大丈夫です。よろしくお願いいたします！", time: "10:06" },
          { id: "msg_4", senderId: "supporter_1", senderName: "古川 柚葉", text: "確認しました。当日は区役所の正面入り口で待ち合わせしましょう。在留カードとパスポートをお忘れなく！", time: "10:07" }
        ]
      }
    ];

    // デモ用通報ログ
    this.state.reports = [
      {
        id: "report_1",
        reporterName: "山田 太郎",
        reportedName: "怪しいユーザー",
        reason: "不適切な出会い目的の発言",
        details: "チャットで執拗にLINEのID交換を迫られ、恋愛目的の発言を受けました。",
        chatRoomId: "chat_demo_report",
        timestamp: "2026/06/11 15:30:22"
      }
    ];

    this.saveState();
  }

  ensureSupportersInUsers() {
    DEFAULT_SUPPORTERS.forEach(sup => {
      const exists = this.state.users.some(u => u.name === sup.name);
      if (!exists) {
        this.state.users.push({
          id: sup.id,
          email: `${sup.id}@example.com`,
          password: "password",
          name: sup.name,
          role: sup.role,
          avatar: sup.avatar,
          university: sup.university,
          hometown: sup.hometown || "",
          speakLangs: sup.languages || [],
          learnLangs: sup.learnLanguages || [],
          hobbies: sup.hobbies || [],
          skills: sup.skills || [],
          bio: sup.bio || "",
          points: 150,
          level: 1,
          fishName: `${sup.name}のサカナ`,
          fishColor: "#00A3FF",
          fishTailColor: "#0d6efd",
          activeFishModel: "images/Tuna3.jpg",
          unlockedItems: [],
          equippedItems: { hat: null, glasses: null, clothing: null, accessory: null }
        });
      }
    });
    this.saveState();
  }

  saveState() {
    localStorage.setItem("tunatomo_state", JSON.stringify(this.state));
  }

  // 3. ルーターとナビゲーション
  initRouter() {
    const handleRoute = () => {
      const hash = window.location.hash || "#/home";
      const viewId = hash.replace("#/", "view-");
      
      // 全ビューを非表示にする
      document.querySelectorAll(".app-view").forEach(view => {
        view.classList.remove("active");
      });
      
      // 対象ビューを表示
      const targetView = document.getElementById(viewId);
      if (targetView) {
        targetView.classList.add("active");
      } else {
        document.getElementById("view-home").classList.add("active");
      }

      // ナビゲーションリンクのアクティブ状態更新
      const pageName = hash.split("/")[1] || "home";
      document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
        if (link.getAttribute("data-page") === pageName) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // モバイルメニューを閉じる
      const mobileNav = document.getElementById("mobile-nav");
      const mobileToggle = document.getElementById("mobile-menu-toggle");
      mobileNav.classList.remove("active");
      mobileToggle.classList.remove("active");

      // 各画面のレンダリング実行
      this.renderView(pageName);
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("load", handleRoute);
  }

  renderView(pageName) {
    this.updateHeader();
    
    switch (pageName) {
      case "home":
        this.renderHome();
        break;
      case "profile":
        this.renderProfile();
        break;
      case "matching":
        this.renderMatching();
        break;
      case "booking":
        this.renderBooking();
        break;
      case "events":
        this.renderEvents();
        break;
      case "board":
        this.renderBoard();
        break;
      case "game":
        this.renderGame();
        break;
      case "chat":
        this.renderChat();
        break;
      case "admin":
        this.renderAdmin();
        break;
      case "ranking":
        this.renderLeaderboard();
        break;
    }
  }

  // 4. イベントリスナー登録
  registerEventListeners() {
    // モバイルトグル
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });

    // ログイン・登録タブ切り替え
    document.getElementById("tab-login-btn").addEventListener("click", () => {
      document.getElementById("tab-login-btn").classList.add("active");
      document.getElementById("tab-signup-btn").classList.remove("active");
      document.getElementById("form-login").classList.add("active");
      document.getElementById("form-signup").classList.remove("active");
    });

    document.getElementById("tab-signup-btn").addEventListener("click", () => {
      document.getElementById("tab-signup-btn").classList.add("active");
      document.getElementById("tab-login-btn").classList.remove("active");
      document.getElementById("form-signup").classList.add("active");
      document.getElementById("form-login").classList.remove("active");
    });

    // ログイン送信
    document.getElementById("form-login").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const pass = document.getElementById("login-password").value;
      
      if (email === "admin@admin.com" && pass === "admin") {
        const adminUser = {
          id: "admin",
          email: "admin@tunatomo.com",
          name: "Admin",
          role: "admin",
          avatar: "images/Tuna11.jpg",
          points: 9999,
          level: 99,
          fishName: "キングシャーク",
          fishColor: "#ff0000",
          fishTailColor: "#990000",
          activeFishModel: "images/Tuna11.jpg",
          unlockedItems: [],
          equippedItems: { hat: null, glasses: null, clothing: null, accessory: null },
          agreedToChatRules: true
        };
        // Add admin user to users list if not already there
        if (!this.state.users.some(u => u.id === "admin")) {
          this.state.users.push(adminUser);
        }
        this.state.currentUser = adminUser;
        this.saveState();
        alert("管理者としてログインしました。 (Logged in as Admin)");
        window.location.hash = "#/admin";
        this.updateHeader();
        return;
      }
      
      const user = this.state.users.find(u => u.email === email && u.password === pass);
      if (user) {
        this.state.currentUser = user;
        this.saveState();
        alert(`おかえりなさい、${user.name}さん！`);
        window.location.hash = "#/profile";
        this.updateHeader();
      } else {
        alert("メールアドレスまたはパスワードが正しくありません。");
      }
    });

    // 新規登録送信
    document.getElementById("form-signup").addEventListener("submit", (e) => {
      e.preventDefault();
      const role = document.getElementById("signup-role").value;
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const avatar = document.querySelector('input[name="signup-avatar"]:checked').value;

      if (this.state.users.some(u => u.email === email)) {
        alert("このメールアドレスは既に登録されています。");
        return;
      }

      // ユーザー新規作成
      const newUser = {
        id: "user_" + Date.now(),
        email,
        password,
        name,
        role,
        avatar,
        points: 50, // 初期ボーナス
        level: 1,
        fishName: `${name}のサカナ`,
        fishColor: "#0D6EFD",
        fishTailColor: "#00A3FF",
        activeFishModel: "images/Tuna3.jpg",
        unlockedItems: [],
        equippedItems: { hat: null, glasses: null, clothing: null, accessory: null },
        hobbies: [],
        skills: [],
        bio: ""
      };

      // ユーザー区分固有のフィールド初期化
      if (role === "student_international") {
        newUser.country = "";
        newUser.nativeLang = "";
        newUser.japaneseLevel = "日常会話レベル";
        newUser.university = "";
      } else {
        newUser.hometown = "";
        newUser.speakLangs = [];
        newUser.learnLangs = [];
        newUser.university = role === "student_japanese" ? "" : "一般地域住民";
      }

      this.state.users.push(newUser);
      this.state.currentUser = newUser;

      // ポイント履歴登録
      this.state.pointsHistory.push({
        userId: newUser.id,
        action: "新規登録ボーナス / Sign-up Bonus",
        points: 50,
        date: new Date().toLocaleDateString()
      });

      this.saveState();
      this.updateHeader();

      // Launch onboarding instead of going straight to profile
      window.location.hash = "#/home";
      setTimeout(() => initOnboarding(this, newUser), 100);
    });

    // プロフィール編集・キャンセル
    document.getElementById("profile-edit-btn").addEventListener("click", () => {
      document.getElementById("profile-info-show").style.display = "none";
      document.getElementById("profile-edit-form").classList.add("active");

      const u = this.state.currentUser;
      document.getElementById("edit-name").value = u.name;
      document.getElementById("edit-university").value = u.university || "";
      document.getElementById("edit-hobbies").value = u.hobbies ? u.hobbies.join(", ") : "";
      document.getElementById("edit-skills").value = u.skills ? u.skills.join(", ") : "";
      document.getElementById("edit-bio").value = u.bio || "";

      // Set avatar radio
      const avatarRadios = document.querySelectorAll('input[name="edit-avatar"]');
      avatarRadios.forEach(r => { r.checked = r.value === (u.avatar || "images/Tuna1.jpg"); });

      // Set college/semester
      const collegeEl = document.getElementById("edit-college");
      const semesterEl = document.getElementById("edit-semester");
      if (collegeEl) collegeEl.value = u.college || "";
      if (semesterEl) semesterEl.value = u.semester || "";

      if (u.role === "student_international") {
        document.getElementById("student-intl-fields-container").style.display = "block";
        document.getElementById("supporter-fields-container").style.display = "none";
        document.getElementById("edit-country").value = u.country || "";
        document.getElementById("edit-native-lang").value = u.nativeLang || "";
        document.getElementById("edit-japanese-level").value = u.japaneseLevel || "日常会話レベル";
      } else {
        document.getElementById("student-intl-fields-container").style.display = "none";
        document.getElementById("supporter-fields-container").style.display = "block";
        document.getElementById("edit-hometown").value = u.hometown || "";
        document.getElementById("edit-speak-langs").value = u.speakLangs ? u.speakLangs.join(", ") : "";
        document.getElementById("edit-learn-langs").value = u.learnLangs ? u.learnLangs.join(", ") : "";
      }
    });

    document.getElementById("profile-cancel-btn").addEventListener("click", () => {
      document.getElementById("profile-info-show").style.display = "block";
      document.getElementById("profile-edit-form").classList.remove("active");
    });

    // プロフィール保存
    document.getElementById("profile-edit-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const u = this.state.currentUser;

      u.name = document.getElementById("edit-name").value;
      u.university = document.getElementById("edit-university").value;
      u.hobbies = document.getElementById("edit-hobbies").value.split(",").map(s => s.trim()).filter(Boolean);
      u.skills = document.getElementById("edit-skills").value.split(",").map(s => s.trim()).filter(Boolean);
      u.bio = document.getElementById("edit-bio").value;

      // Save avatar
      const selectedAvatar = document.querySelector('input[name="edit-avatar"]:checked');
      if (selectedAvatar) u.avatar = selectedAvatar.value;

      // Save college/semester
      const collegeEl = document.getElementById("edit-college");
      const semesterEl = document.getElementById("edit-semester");
      if (collegeEl) u.college = collegeEl.value;
      if (semesterEl) u.semester = semesterEl.value;

      if (u.role === "student_international") {
        u.country = document.getElementById("edit-country").value;
        u.nativeLang = document.getElementById("edit-native-lang").value;
        u.japaneseLevel = document.getElementById("edit-japanese-level").value;
      } else {
        u.hometown = document.getElementById("edit-hometown").value;
        u.speakLangs = document.getElementById("edit-speak-langs").value.split(",").map(s => s.trim()).filter(Boolean);
        u.learnLangs = document.getElementById("edit-learn-langs").value.split(",").map(s => s.trim()).filter(Boolean);
      }

      // 全体ユーザーリストの更新
      const index = this.state.users.findIndex(user => user.id === u.id);
      if (index !== -1) {
        this.state.users[index] = u;
      }

      this.saveState();
      alert("プロフィールを更新しました。");
      document.getElementById("profile-info-show").style.display = "block";
      document.getElementById("profile-edit-form").classList.remove("active");
      this.renderProfile();
    });

    // サポーター検索
    document.getElementById("form-search-supporter").addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderMatching();
    });

    document.getElementById("search-reset-btn").addEventListener("click", () => {
      document.getElementById("form-search-supporter").reset();
      this.renderMatching();
    });

    // 予約作成
    document.getElementById("form-create-booking").addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.state.currentUser) {
        alert("同行サポートの予約にはログインが必要です。");
        window.location.hash = "#/login";
        return;
      }

      const category = document.getElementById("booking-category").value;
      const date = document.getElementById("booking-date").value;
      const time = document.getElementById("booking-time").value;
      const supporterId = document.getElementById("booking-supporter").value;
      const details = document.getElementById("booking-details").value;

      let supporterName = "指定なし（自動マッチング）";
      let status = "pending";
      
      if (supporterId) {
        const found = this.state.users.find(u => u.id === supporterId);
        if (found) {
          supporterName = found.name;
          status = "matched";
        }
      }

      const newBooking = {
        id: "booking_" + Date.now(),
        category,
        date,
        time,
        details,
        studentId: this.state.currentUser.id,
        studentName: this.state.currentUser.name,
        supporterId,
        supporterName,
        status
      };

      this.state.bookings.push(newBooking);
      this.saveState();
      alert("同行予約を申請しました！進捗はプロフィール画面からご確認いただけます。");
      window.location.hash = "#/profile";
    });

    // 掲示板 新規質問のトグルと投稿
    document.getElementById("board-new-thread-btn").addEventListener("click", () => {
      if (!this.state.currentUser) {
        alert("掲示板への投稿にはログインが必要です。");
        window.location.hash = "#/login";
        return;
      }
      document.getElementById("new-thread-container").classList.toggle("active");
    });

    document.getElementById("board-cancel-thread-btn").addEventListener("click", () => {
      document.getElementById("new-thread-container").classList.remove("active");
    });

    document.getElementById("form-new-thread").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("thread-title").value;
      const category = document.getElementById("thread-category").value;
      const content = document.getElementById("thread-content").value;
      const user = this.state.currentUser;

      const newThread = {
        id: "thread_" + Date.now(),
        title,
        category,
        author: user.name + (user.role === "student_international" ? " (留学生)" : " (サポーター)"),
        date: new Date().toLocaleDateString(),
        content,
        replies: []
      };

      this.state.threads.unshift(newThread);
      
      // ポイント獲得 (+20pt)
      user.points += 20;
      this.state.pointsHistory.unshift({
        userId: user.id,
        action: `掲示板への質問投稿: ${title}`,
        points: 20,
        date: new Date().toLocaleDateString()
      });
      this.awardXP(user, 20);

      this.saveState();
      alert("質問を投稿しました！お魚のポイントが20pt貯まりました。");
      
      document.getElementById("form-new-thread").reset();
      document.getElementById("new-thread-container").classList.remove("active");
      this.renderBoard();
    });

    // お役立ち情報メニュー切り替え
    document.querySelectorAll(".info-menu-item").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".info-menu-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const targetId = btn.getAttribute("data-target");
        document.querySelectorAll(".info-tab-content").forEach(content => {
          content.classList.remove("active");
        });
        
        // ターゲットを表示
        const target = document.getElementById(`info-${targetId}`);
        if (target) {
          target.classList.add("active");
        }
      });
    });

    // ゲームのタブ切り替え
    document.querySelectorAll(".shop-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".shop-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const panelId = `panel-${tab.getAttribute("data-tab")}`;
        document.querySelectorAll(".shop-panel").forEach(panel => {
          panel.classList.remove("active");
        });
        document.getElementById(panelId).classList.add("active");
        if (panelId === "panel-market") this.renderPointsMarket();
      });
    });

    // 言語切り替えボタンのリスナー
    const handleLangToggle = () => {
      this.state.lang = this.state.lang === "ja" ? "en" : "ja";
      localStorage.setItem("tunatomo_lang", this.state.lang);
      this.updateLanguageUI();
      const hash = window.location.hash || "#/home";
      const pageName = hash.split("/")[1] || "home";
      this.renderView(pageName);
    };

    const toggleBtn = document.getElementById("lang-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", handleLangToggle);
    }
    const mobileToggleBtn = document.getElementById("mobile-lang-toggle-btn");
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener("click", handleLangToggle);
    }

    // Custom language picker
    const pickerBtn = document.getElementById("lang-picker-btn");
    const langDropdown = document.getElementById("lang-dropdown");
    if (pickerBtn && langDropdown) {
      pickerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("open");
      });
      document.addEventListener("click", () => langDropdown.classList.remove("open"));
      langDropdown.querySelectorAll(".lang-opt").forEach(opt => {
        opt.addEventListener("click", (e) => {
          e.stopPropagation();
          const lang = opt.dataset.lang;
          const label = opt.textContent.trim();
          document.getElementById("lang-picker-label").textContent = label;
          langDropdown.classList.remove("open");
          // Trigger Google Translate
          const combo = document.querySelector(".goog-te-combo");
          if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event("change"));
          }
        });
      });
    }

    // スクロールインジケーターのクリックイベント
    const scrollInd = document.getElementById("scroll-indicator");
    if (scrollInd) {
      scrollInd.addEventListener("click", () => {
        const target = document.querySelector(".quick-grid") || document.querySelector(".content-container");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // LINE modal open/close
    const lineModalOverlay = document.getElementById("line-modal-overlay");
    const openLineModal = () => {
      if (lineModalOverlay) lineModalOverlay.style.display = "flex";
    };
    const closeLineModal = () => {
      if (lineModalOverlay) lineModalOverlay.style.display = "none";
    };
    ["open-line-modal-btn", "footer-line-btn", "home-qr-box", "footer-qr-img"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", openLineModal);
    });
    ["close-line-modal", "close-line-modal-2"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", closeLineModal);
    });
    if (lineModalOverlay) {
      lineModalOverlay.addEventListener("click", (e) => {
        if (e.target === lineModalOverlay) closeLineModal();
      });
    }

    // スクロールエフェクト（ヒーローパララックス＆ヘッダー変化）
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const hero = document.querySelector(".hero-section");
      if (hero) {
        const heroHeight = hero.offsetHeight;
        // Scroll fade-out for hero content
        const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.6)));
        const translate = scrollY * 0.35;
        
        const slideContent = document.querySelector(".slide-content");
        if (slideContent) {
          slideContent.style.opacity = opacity;
          slideContent.style.transform = `translateY(${translate}px)`;
        }
        
        // Header style update on scroll
        const header = document.querySelector(".global-header");
        if (header) {
          if (scrollY > 50) {
            header.style.background = "rgba(255, 255, 255, 0.85)";
            header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1), var(--shadow-glass)";
            header.style.border = "1px solid rgba(255, 255, 255, 0.6)";
          } else {
            header.style.background = "rgba(255, 255, 255, 0.65)";
            header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05), var(--shadow-glass)";
            header.style.border = "1px solid rgba(255, 255, 255, 0.4)";
          }
        }
      }
    });

    // 管理者タブの切り替え
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab-btn").forEach(b => {
          b.classList.remove("btn-primary");
          b.classList.add("btn-outline");
        });
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-outline");

        const targetTab = btn.getAttribute("data-tab");
        document.querySelectorAll(".admin-panel").forEach(panel => {
          panel.style.display = "none";
        });
        const activePanel = document.getElementById(`admin-panel-${targetTab}`);
        if (activePanel) {
          activePanel.style.display = "block";
        }
      });
    });
  }

  // 4.5 翻訳機能の更新
  updateLanguageUI() {
    const lang = this.state.lang || "ja";
    const dict = TRANSLATIONS[lang];
    
    // Update all elements with data-t
    document.querySelectorAll("[data-t]").forEach(el => {
      const key = el.getAttribute("data-t");
      if (dict && dict[key]) {
        el.innerText = dict[key];
      }
    });

    // Update buttons text
    const toggleBtn = document.getElementById("lang-toggle-btn");
    if (toggleBtn) {
      toggleBtn.innerText = lang === "ja" ? "English" : "日本語";
    }
    const mobileToggleBtn = document.getElementById("mobile-lang-toggle-btn");
    if (mobileToggleBtn) {
      mobileToggleBtn.innerText = lang === "ja" ? "English" : "日本語";
    }

    // Toggle body class
    if (lang === "en") {
      document.body.classList.add("lang-en");
      document.body.classList.remove("lang-ja");
    } else {
      document.body.classList.add("lang-ja");
      document.body.classList.remove("lang-en");
    }
  }

  // 5. グローバルヘッダーの更新
  updateHeader() {
    const statusEl = document.getElementById("header-user-status");
    const mobileNavUserEl = document.getElementById("mobile-nav-user");
    const user = this.state.currentUser;
    const isEn = this.state.lang === "en";

    const navAdmin = document.getElementById("nav-admin");
    const mobileNavAdmin = document.getElementById("mobile-nav-admin");
    const navChat = document.getElementById("nav-chat");
    const mobileNavChat = document.getElementById("mobile-nav-chat");

    if (user) {
      // Show/Hide admin/chat links
      if (user.role === "admin") {
        if (navAdmin) navAdmin.style.display = "block";
        if (mobileNavAdmin) mobileNavAdmin.style.display = "block";
        if (navChat) navChat.style.display = "block";
        if (mobileNavChat) mobileNavChat.style.display = "block";
      } else {
        if (navAdmin) navAdmin.style.display = "none";
        if (mobileNavAdmin) mobileNavAdmin.style.display = "none";
        if (navChat) navChat.style.display = "block";
        if (mobileNavChat) mobileNavChat.style.display = "block";
      }

      const roleText = user.role === "admin"
        ? (isEn ? "Admin" : "管理者")
        : user.role === "student_international" 
          ? (isEn ? "International Student" : "国際学生") 
          : user.role === "student_japanese" 
            ? (isEn ? "Japanese Supporter" : "日本人学生") 
            : (isEn ? "Local Resident" : "地域住民");
      const badgeClass = user.role === "admin" ? "badge-admin" : user.role === "student_international" ? "badge-student-intl" : user.role === "student_japanese" ? "badge-student-jp" : "badge-resident";

      const tier = getTier(user);
      const html = `
        <div class="header-user-badge">
          <a href="#/profile">
            <img src="${user.avatar || 'images/Tuna1.jpg'}" alt="${user.name}" class="header-user-avatar">
          </a>
          <div class="header-user-meta">
            <span class="header-username">${user.name}</span>
            <div class="header-points-level">
              <span class="tier-badge ${tier.css}" style="padding:2px 8px;font-size:0.68rem;">${tier.emoji} ${tier.name}</span>
              <span class="header-level-val">Lv.${user.level || 1}</span>
              <a href="#/game" class="header-points-val">${user.points || 0} 🐟</a>
            </div>
          </div>
        </div>
        <a href="#/home" class="logout-btn-header" id="logout-btn">${isEn ? "Logout" : "ログアウト"}</a>
      `;
      statusEl.innerHTML = html;

      // モバイル用メニュー項目
      let mobileNavHtml = "";
      if (user.role === "admin") {
        mobileNavHtml = `
          <a href="#/admin" class="mobile-nav-link" data-page="admin">${isEn ? "Admin Dashboard" : "管理者ダッシュボード"}</a>
          <a href="#/chat" class="mobile-nav-link" data-page="chat">${isEn ? "Chat Monitor" : "チャット監視"}</a>
        `;
      } else {
        mobileNavHtml = `
          <a href="#/profile" class="mobile-nav-link" data-page="profile">${isEn ? "Profile & Bookings" : "プロフィール・予約管理"}</a>
          <a href="#/game" class="mobile-nav-link" data-page="game">${isEn ? "Fish Grow Game" : "お魚育成ゲーム"} (${user.points} pt)</a>
          <a href="#/chat" class="mobile-nav-link" data-page="chat">${isEn ? "Chat Rooms" : "チャット一覧"}</a>
        `;
      }
      mobileNavHtml += `<a href="#/home" class="mobile-nav-link" id="mobile-logout-btn">${isEn ? "Logout" : "ログアウト"}</a>`;
      mobileNavUserEl.innerHTML = mobileNavHtml;

      // ログアウト処理アタッチ
      const logoutAction = (e) => {
        e.preventDefault();
        this.state.currentUser = null;
        this.saveState();
        alert(isEn ? "Logged out successfully." : "ログアウトしました。");
        window.location.hash = "#/home";
        this.updateHeader();
      };
      
      document.getElementById("logout-btn").addEventListener("click", logoutAction);
      document.getElementById("mobile-logout-btn").addEventListener("click", logoutAction);

    } else {
      if (navAdmin) navAdmin.style.display = "none";
      if (mobileNavAdmin) mobileNavAdmin.style.display = "none";
      if (navChat) navChat.style.display = "none";
      if (mobileNavChat) mobileNavChat.style.display = "none";

      statusEl.innerHTML = `
        <a href="#/login" class="btn btn-primary btn-sm login-btn">Sign In / Sign Up</a>
      `;
      mobileNavUserEl.innerHTML = `
        <a href="#/login" class="btn btn-primary btn-block">Sign In / Sign Up</a>
      `;
    }
  }

  // 6. ホーム画面の描画
  renderHome() {
    // Guard: only run if home DOM elements are present
    const announceEl = document.getElementById("home-announcements");
    if (!announceEl) return;
    let announceHtml = "";
    DEFAULT_ANNOUNCEMENTS.forEach(ann => {
      announceHtml += `
        <div class="announcement-item">
          <div class="announce-date">${ann.date}</div>
          <div class="announce-content">
            <h3>${ann.title}</h3>
            <p>${ann.desc}</p>
          </div>
        </div>
      `;
    });
    announceEl.innerHTML = announceHtml;

    // おすすめイベント一覧 (Side)
    const eventsEl = document.getElementById("home-events-side");
    let eventsHtml = "";
    this.state.events.slice(0, 2).forEach(ev => {
      eventsHtml += `
        <a href="#/events" class="card" style="padding: 12px; margin-bottom: 12px; display: flex; gap: 12px; border-radius: var(--radius-sm);">
          <img src="${ev.image}" alt="${ev.title}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;">
          <div>
            <h4 style="font-size: 0.9rem; font-weight: 800; color:var(--color-text-dark);">${ev.title}</h4>
            <p style="font-size: 0.75rem; color:var(--color-text-muted);">${ev.date.split(" ")[0]}</p>
          </div>
        </a>
      `;
    });
    eventsEl.innerHTML = eventsHtml;

    // 魚育成のプレビュー切り替え
    const bannerContainer = document.getElementById("home-fish-banner-container");
    const user = this.state.currentUser;

    if (user) {
      bannerContainer.style.display = "grid";
      // ユーザーの装備に合わせてSVGを変更
      const fishWrapper = document.getElementById("home-floating-fish");
      
      let hatHTML = "";
      if (user.equippedItems.hat === "straw_hat") hatHTML = `<div style="position:absolute; top: -5px; left: 35px; width: 40px; height: 20px; background:radial-gradient(ellipse at bottom, #f3b05a 60%, transparent 62%); border-bottom: 3px solid #ea580c; border-radius:50% 50% 0 0;"></div>`;
      if (user.equippedItems.hat === "student_hat") hatHTML = `<div style="position:absolute; top: 0px; left: 40px; width: 30px; height: 15px; background:#000; border-bottom: 2px solid #ff0; clip-path:polygon(0% 100%, 100% 100%, 80% 0%, 20% 0%);"></div>`;
      if (user.equippedItems.hat === "crown") hatHTML = `<div style="position:absolute; top: 0px; left: 38px; width: 35px; height: 20px; background:#ffd700; clip-path:polygon(0% 100%, 100% 100%, 90% 20%, 70% 50%, 50% 0%, 30% 50%, 10% 20%);"></div>`;

      let glassesHTML = "";
      if (user.equippedItems.glasses === "cool_sunglasses") glassesHTML = `<div style="position:absolute; top: 25px; left: 60px; width: 30px; height: 12px; background:rgba(0,0,0,0.85); border:1px solid #fff; border-radius:10px;"></div>`;
      if (user.equippedItems.glasses === "nerd_glasses") glassesHTML = `<div style="position:absolute; top: 22px; left: 58px; width: 14px; height: 14px; border:2px solid #000; border-radius:50%; background:rgba(255,255,255,0.3); box-shadow: 10px 0 0 -2px #000, 10px 0 0 0 #000;"></div>`;

      fishWrapper.innerHTML = `
        <div style="position:relative; width: 100px; height: 100px;">
          ${hatHTML}
          ${glassesHTML}
          <img src="${user.activeFishModel || 'images/Tuna3.jpg'}" alt="マイフィッシュ" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 2.5px solid #fff; box-shadow: var(--shadow-md);">
        </div>
      `;
    } else {
      bannerContainer.style.display = "none";
    }
  }

  // 7. プロフィール画面の描画
  renderProfile() {
    const user = this.state.currentUser;
    if (!user) {
      alert("プロフィールを見るにはログインが必要です。");
      window.location.hash = "#/login";
      return;
    }

    // 基本表示項目の更新
    document.getElementById("profile-display-avatar").src = user.avatar || "images/Tuna1.jpg";
    document.getElementById("profile-display-name").innerText = user.name;
    document.getElementById("profile-display-email").innerText = user.email;
    document.getElementById("profile-display-points").innerText = user.points;

    const badgeEl = document.getElementById("profile-display-badge");
    badgeEl.innerText = user.role === "student_international" ? "国際学生" : user.role === "student_japanese" ? "日本人学生" : "地域住民";
    badgeEl.className = "badge " + (user.role === "student_international" ? "badge-student-intl" : user.role === "student_japanese" ? "badge-student-jp" : "badge-resident");

    // Tier badge
    const tierContainer = document.getElementById("profile-tier-badge");
    if (tierContainer) tierContainer.innerHTML = tierBadgeHTML(user, "lg");

    // Tier progress info
    const tier = getTier(user);
    const xp = user.totalXP || user.points || 0;
    const nextTier = TIERS[TIERS.indexOf(tier) - 1];
    const tierProgressEl = document.getElementById("profile-tier-progress");
    if (tierProgressEl) {
      if (nextTier) {
        const pct = Math.min(100, Math.round(((xp - tier.min) / (nextTier.min - tier.min)) * 100));
        tierProgressEl.innerHTML = `
          <div style="font-size:0.8rem;color:var(--color-text-muted);margin-top:6px;">
            ${xp} / ${nextTier.min} XP to ${nextTier.emoji} ${nextTier.name}
            <div style="height:6px;background:#e5e7eb;border-radius:99px;margin-top:4px;">
              <div style="height:100%;width:${pct}%;background:${tier.color};border-radius:99px;transition:width 0.5s;"></div>
            </div>
          </div>`;
      } else {
        tierProgressEl.innerHTML = `<div style="font-size:0.8rem;color:${tier.color};font-weight:700;margin-top:6px;">🏆 Max Tier Reached!</div>`;
      }
    }

    // 詳細表示用HTMLの組み立て
    const infoShowEl = document.getElementById("profile-info-show");
    let infoHtml = `
      <div class="profile-info-row"><span class="label">ニックネーム / Name</span><span class="val">${user.name}</span></div>
      <div class="profile-info-row"><span class="label">大学 / University</span><span class="val">${user.university || "Ritsumeikan Asia Pacific University (APU)"}</span></div>
      <div class="profile-info-row"><span class="label">カレッジ / College</span><span class="val">${user.college || "—"}</span></div>
      <div class="profile-info-row"><span class="label">セメスター / Semester</span><span class="val">${user.semester || "—"}</span></div>
      <div class="profile-info-row">
        <span class="label">趣味</span>
        <div class="val tags-list-style">${user.hobbies && user.hobbies.length ? user.hobbies.map(h => `<span class="tag-badge">${h}</span>`).join("") : "未記入"}</div>
      </div>
      <div class="profile-info-row">
        <span class="label">特技</span>
        <div class="val tags-list-style">${user.skills && user.skills.length ? user.skills.map(s => `<span class="tag-badge">${s}</span>`).join("") : "未記入"}</div>
      </div>
    `;

    if (user.role === "student_international") {
      infoHtml += `
        <div class="profile-info-row"><span class="label">出身国</span><span class="val">${user.country || "未記入"}</span></div>
        <div class="profile-info-row"><span class="label">母語</span><span class="val">${user.nativeLang || "未記入"}</span></div>
        <div class="profile-info-row"><span class="label">日本語レベル</span><span class="val">${user.japaneseLevel || "日常会話レベル"}</span></div>
      `;
    } else {
      infoHtml += `
        <div class="profile-info-row"><span class="label">出身地/在住地</span><span class="val">${user.hometown || "未記入"}</span></div>
        <div class="profile-info-row">
          <span class="label">話せる言語</span>
          <div class="val tags-list-style">${user.speakLangs && user.speakLangs.length ? user.speakLangs.map(l => `<span class="tag-badge">${l}</span>`).join("") : "未記入"}</div>
        </div>
        <div class="profile-info-row">
          <span class="label">学習中の言語</span>
          <div class="val tags-list-style">${user.learnLangs && user.learnLangs.length ? user.learnLangs.map(l => `<span class="tag-badge">${l}</span>`).join("") : "未記入"}</div>
        </div>
      `;
    }

    infoHtml += `
      <div class="profile-info-row" style="border:none;"><span class="label">自己紹介</span><span class="val" style="white-space:pre-wrap;">${user.bio || "こんにちは！よろしくね。"}</span></div>
    `;
    infoShowEl.innerHTML = infoHtml;

    // 予約一覧の描画
    this.renderProfileBookings();
  }

  renderProfileBookings() {
    const user = this.state.currentUser;
    const bookingsEl = document.getElementById("profile-bookings-list");
    
    // ユーザーに関係のある予約を抽出
    // 国際学生の場合は自分が申請した予約。日本人学生/地域住民の場合はサポーターに自分が指名された、または自動マッチング枠
    const myBookings = this.state.bookings.filter(b => b.studentId === user.id || b.supporterId === user.id);
    
    if (myBookings.length === 0) {
      bookingsEl.innerHTML = `<p class="text-muted" style="text-align:center; padding: 20px;">現在登録されている同行サポート予約はありません。</p>`;
      return;
    }

    let html = "";
    myBookings.forEach(b => {
      const statusText = b.status === "pending" ? "マッチング中" : b.status === "matched" ? "マッチング完了" : "サポート完了";
      const statusClass = b.status === "pending" ? "status-pending" : b.status === "matched" ? "status-matched" : "status-completed";
      
      const partnerName = user.role === "student_international" ? b.supporterName : b.studentName;
      const partnerLabel = user.role === "student_international" ? "サポーター" : "依頼者";
      
      let actionBtn = "";
      // サポーター視点：マッチング済みかつ未完了の場合、完了ボタンを表示する
      if (user.role !== "student_international" && b.status === "matched") {
        actionBtn = `<button class="btn btn-primary btn-sm complete-booking-btn" data-id="${b.id}" style="align-self: flex-end; margin-top:8px;">サポート完了を報告</button>`;
      }
      // 国際学生視点：完了済みかつ未レビューの場合、レビューボタンを表示
      if (user.role === "student_international" && b.status === "completed" && !b.reviewed) {
        const supUser = this.state.users.find(u => u.name === b.supporterName || u.id === b.supporterId);
        if (supUser) {
          actionBtn += `<button class="btn btn-outline btn-sm review-booking-btn" data-booking-id="${b.id}" data-reviewed-id="${supUser.id}" data-reviewed-name="${supUser.name}" style="margin-top:8px;color:#f59e0b;border-color:#f59e0b;">⭐ Leave a Review</button>`;
        }
      }

      html += `
        <div class="booking-item-card">
          <div class="booking-item-header">
            <span class="booking-item-title">${b.category}</span>
            <span class="booking-status ${statusClass}">${statusText}</span>
          </div>
          <div class="booking-item-details">
            <p><strong>希望日時:</strong> ${b.date} ${b.time}</p>
            <p><strong>依頼詳細:</strong> ${b.details}</p>
          </div>
          <div class="booking-item-meta">
            <div class="booking-item-partner">
              <span>${partnerLabel}: <strong>${partnerName}</strong></span>
            </div>
            ${actionBtn}
          </div>
        </div>
      `;
    });
    bookingsEl.innerHTML = html;

    // 「サポート完了を報告」イベントアタッチ
    document.querySelectorAll(".complete-booking-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.completeBooking(id);
      });
    });
    // Review buttons
    document.querySelectorAll(".review-booking-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openReviewModal(btn.dataset.bookingId, btn.dataset.reviewedId, btn.dataset.reviewedName);
      });
    });
  }

  completeBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    booking.status = "completed";

    // 両者（国際学生＆サポーター）にポイントを付与 (+50pt)
    const student = this.state.users.find(u => u.id === booking.studentId);
    const supporter = this.state.users.find(u => u.id === booking.supporterId || u.name === booking.supporterName);

    if (student) {
      student.points += 50;
      this.state.pointsHistory.unshift({
        userId: student.id,
        action: `同行サポート完了報酬（${booking.category}）`,
        points: 50,
        date: new Date().toLocaleDateString()
      });
      this.awardXP(student, 50);
    }

    if (supporter) {
      supporter.points += 50;
      this.state.pointsHistory.unshift({
        userId: supporter.id,
        action: `同行サポート提供報酬（${booking.category}）`,
        points: 50,
        date: new Date().toLocaleDateString()
      });
      this.awardXP(supporter, 50);
    }

    // ログイン中のユーザーの状態をメモリに反映
    if (this.state.currentUser.id === student?.id) {
      this.state.currentUser = student;
    } else if (this.state.currentUser.id === supporter?.id) {
      this.state.currentUser = supporter;
    }

    this.saveState();
    alert("サポート完了報告を受領しました！お互いにお魚育成用の50ポイントが加算されました。ご協力ありがとうございました！");
    this.renderProfile();
  }

  // 8. サポーター検索（マッチング）の描画
  renderMatching() {
    const listEl = document.getElementById("supporters-list");
    const keyword = document.getElementById("search-keyword").value.toLowerCase();
    const lang = document.getElementById("search-language").value;
    const hometown = document.getElementById("search-hometown").value.toLowerCase();
    const hobby = document.getElementById("search-hobby").value.toLowerCase();
    const skill = document.getElementById("search-skill").value.toLowerCase();

    // フィルタリング処理
    // サポーターユーザーのみ（role = student_japanese or resident_local）
    const filtered = this.state.users.filter(u => {
      if (u.role === "student_international") return false;

      // 検索条件チェック
      if (keyword && !u.name.toLowerCase().includes(keyword) && !u.bio.toLowerCase().includes(keyword)) return false;
      if (lang && u.speakLangs && !u.speakLangs.includes(lang)) return false;
      if (hometown && u.hometown && !u.hometown.toLowerCase().includes(hometown)) return false;
      
      if (hobby) {
        const hobbyMatch = u.hobbies && u.hobbies.some(h => h.toLowerCase().includes(hobby));
        if (!hobbyMatch) return false;
      }
      
      if (skill) {
        const skillMatch = u.skills && u.skills.some(s => s.toLowerCase().includes(skill));
        if (!skillMatch) return false;
      }

      return true;
    });

    document.getElementById("results-count").innerText = filtered.length;

    if (filtered.length === 0) {
      listEl.innerHTML = `<p class="text-muted" style="grid-column: 1 / -1; text-align:center; padding: 40px;">${this.state.lang === "en" ? "No supporters found matching the criteria." : "条件に合うサポーターが見つかりませんでした。"}</p>`;
      return;
    }

    let html = "";
    filtered.forEach(sup => {
      const isEn = this.state.lang === "en";
      const roleText = sup.role === "student_japanese" 
        ? (isEn ? "Japanese Supporter" : "日本人学生") 
        : (isEn ? "Local Resident" : "地域住民");
      const badgeClass = sup.role === "student_japanese" ? "badge-student-jp" : "badge-resident";

      const supTier = getTier(sup);
      html += `
        <div class="card supporter-card">
          <div class="supporter-card-top">
            <img src="${sup.avatar || 'images/Tuna1.jpg'}" alt="${sup.name}" class="supporter-avatar">
            <div class="supporter-meta">
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;">
                <span class="badge ${badgeClass}" style="width:fit-content;">${roleText}</span>
                <span class="tier-badge ${supTier.css}" style="padding:3px 9px;font-size:0.68rem;">${supTier.emoji} ${supTier.name}</span>
              </div>
              <h3>${sup.name}</h3>
              <span class="uni">${sup.university || (isEn ? "Local Supporter" : "地域サポーター")}</span>
            </div>
          </div>
          ${(() => { const r = this.getAverageRating(sup.id); return r ? `<div style="font-size:0.82rem;color:#f59e0b;margin-bottom:4px;">${"★".repeat(Math.round(r.avg))}${"☆".repeat(5-Math.round(r.avg))} <span style="color:var(--color-text-muted);">${r.avg} (${r.count} reviews)</span></div>` : ""; })()}
          <p class="supporter-bio">${sup.bio || (isEn ? "Happy to help you." : "よろしくお願いいたします。")}</p>
          <div class="supporter-tags">
            <div class="supporter-tag-row">
              <span class="tag-lbl">${isEn ? "Languages:" : "対応言語:"}</span>
              <div class="tag-vals">${sup.speakLangs ? sup.speakLangs.map(l => `<span class="tag-badge">${l}</span>`).join("") : (isEn ? "Japanese" : "日本語")}</div>
            </div>
            <div class="supporter-tag-row">
              <span class="tag-lbl">${isEn ? "Hobbies:" : "趣味:"}</span>
              <div class="tag-vals">${sup.hobbies ? sup.hobbies.map(h => `<span class="tag-badge">${h}</span>`).join("") : (isEn ? "Not set" : "未設定")}</div>
            </div>
          </div>
          <button class="btn btn-outline btn-block select-supporter-btn" data-id="${sup.id}" data-name="${sup.name}">${isEn ? "Request Companion Support" : "この人に同行サポートを頼む"}</button>
        </div>
      `;
    });
    listEl.innerHTML = html;

    // 同行サポート指名予約アクション
    document.querySelectorAll(".select-supporter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        window.location.hash = "#/booking";
        
        // 予約画面ロード時にサポーターが選択されるように遅延設定
        setTimeout(() => {
          const selectEl = document.getElementById("booking-supporter");
          if (selectEl) {
            selectEl.value = id;
          }
        }, 100);
      });
    });
  }

  // 9. 予約画面の更新（サポータードロップダウンの構築）
  renderBooking() {
    const selectEl = document.getElementById("booking-supporter");
    if (!selectEl) return;

    // 現在選択されている値を保持
    const currentVal = selectEl.value;

    let html = `<option value="">指定なし（自動マッチング）</option>`;
    // サポーターリスト（ユーザーリストから抽出）を挿入
    this.state.users.forEach(u => {
      if (u.role !== "student_international") {
        const roleText = u.role === "student_japanese" ? "日本人学生" : "地域住民";
        html += `<option value="${u.id}">${u.name} (${roleText} - ${u.university})</option>`;
      }
    });

    selectEl.innerHTML = html;
    selectEl.value = currentVal;
  }

  // 10. 地域交流イベント画面の描画
  renderEvents() {
    const listEl = document.getElementById("events-list");
    const createFormEl = document.getElementById("create-event-container");
    const user = this.state.currentUser;

    // Show/hide create button
    const createBtn = document.getElementById("create-event-btn");
    if (createBtn) {
      createBtn.style.display = user ? "inline-flex" : "none";
    }

    const categoryColors = {
      "Study": "#0D6EFD", "Outdoor": "#16a34a", "Social": "#f59e0b",
      "Hangout": "#8b5cf6", "Cultural": "#ef4444"
    };

    let html = "";
    this.state.events.forEach(ev => {
      const isParticipating = user && ev.participants.includes(user.name);
      const btnText = isParticipating ? "✓ Joined!" : "Join Event";
      const btnClass = isParticipating ? "btn-outline" : "btn-primary";
      const count = ev.participants.length;
      const catColor = categoryColors[ev.category] || "#0D6EFD";
      const costBadge = ev.cost && ev.cost.toLowerCase().includes("free")
        ? `<span class="event-cost-badge free">🆓 Free</span>`
        : ev.cost ? `<span class="event-cost-badge paid">💴 ${ev.cost}</span>` : "";
      const recurBadge = ev.recurring ? `<span class="event-recurring-badge">🔁 Recurring</span>` : "";

      html += `
        <div class="card event-card" style="padding:0; overflow:hidden;">
          <div class="event-img-wrapper" style="position:relative;">
            <img src="${ev.image}" alt="${ev.title}" class="event-img">
            <span class="event-date-badge">${ev.date.split("—")[0].split("年")[0] ? ev.date.split(" ")[0] : ev.date.split("—")[0]}</span>
            ${ev.category ? `<span class="event-category-badge" style="background:${catColor};">${ev.category}</span>` : ""}
          </div>
          <div class="event-body">
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px;">
              ${costBadge}${recurBadge}
            </div>
            <h3 class="event-title">${ev.title}</h3>
            <p class="event-desc">${ev.desc}</p>
            <div class="event-info-row">
              <span class="event-info-icon">📅</span>
              <span><strong>When:</strong> ${ev.date}</span>
            </div>
            <div class="event-info-row">
              <span class="event-info-icon">📍</span>
              <span><strong>Where:</strong> ${ev.location}</span>
            </div>
            ${ev.cost ? `<div class="event-info-row">
              <span class="event-info-icon">💴</span>
              <span><strong>Cost:</strong> ${ev.cost}</span>
            </div>` : ""}
            <div class="event-info-row" style="margin-bottom:12px;">
              <span class="event-info-icon">👥</span>
              <span><strong>Going:</strong> ${count} people${count > 0 ? ` (${ev.participants.join(", ")})` : ""}</span>
            </div>
            <button class="btn ${btnClass} btn-block join-event-btn" data-id="${ev.id}" ${isParticipating ? 'disabled' : ''}>${btnText}</button>
            ${ev.createdBy ? `<p style="font-size:0.75rem; color:var(--color-text-muted); margin-top:8px; text-align:center;">Created by ${ev.createdBy}</p>` : ""}
          </div>
        </div>
      `;
    });

    if (html === "") {
      html = `<p class="text-muted" style="grid-column:1/-1; text-align:center; padding:40px;">No events yet. Be the first to create one!</p>`;
    }

    listEl.innerHTML = html;

    // Join buttons
    document.querySelectorAll(".join-event-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!user) {
          alert("Please sign in to join events.");
          window.location.hash = "#/login";
          return;
        }
        this.joinEvent(btn.getAttribute("data-id"));
      });
    });

    // Create event form submission
    const EVENT_POST_COST = 100;
    const createForm = document.getElementById("form-create-event");
    if (createForm) {
      createForm.onsubmit = (e) => {
        e.preventDefault();
        if (!user) { window.location.hash = "#/login"; return; }

        // Check fish points balance
        if ((user.points || 0) < EVENT_POST_COST) {
          alert(`🐟 You need ${EVENT_POST_COST} Fish Points to post an event.\nYou currently have ${user.points || 0} pts.\n\nEarn more by joining events, answering Q&A posts, and participating in the community!`);
          return;
        }

        const title    = document.getElementById("ev-title").value.trim();
        const date     = document.getElementById("ev-date").value;
        const location = document.getElementById("ev-location").value.trim();
        const cost     = document.getElementById("ev-cost").value.trim() || "Free 🆓";
        const category = document.getElementById("ev-category").value;
        const desc     = document.getElementById("ev-desc").value.trim();
        const photoUrl = document.getElementById("ev-photo").value.trim() ||
                         "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800";

        // Deduct 100 fish points
        user.points -= EVENT_POST_COST;
        this.state.pointsHistory.unshift({
          userId: user.id,
          action: `🎉 イベント投稿: ${title}`,
          points: -EVENT_POST_COST,
          date: new Date().toLocaleDateString()
        });

        const newEv = {
          id: "event_" + Date.now(),
          title, date, location, cost, category, desc,
          image: photoUrl,
          participants: [user.name],
          createdBy: user.name
        };
        this.state.events.unshift(newEv);
        this.awardXP(user, 20);

        const idx = this.state.users.findIndex(u => u.id === user.id);
        if (idx !== -1) this.state.users[idx] = user;
        this.saveState();
        createForm.reset();
        if (createFormEl) createFormEl.classList.remove("active");
        alert(`🎉 Event "${title}" posted!\n100 Fish Points spent. Keep participating to earn more!`);
        this.renderEvents();
      };
    }

    // Toggle create form — show points balance on button
    if (createBtn) {
      const pts = user ? (user.points || 0) : 0;
      const canAfford = pts >= 100;
      createBtn.innerHTML = canAfford
        ? `＋ Create Event <span style="font-size:0.75rem;opacity:0.85;margin-left:6px;">(-100 🐟)</span>`
        : `＋ Create Event <span style="font-size:0.75rem;opacity:0.75;margin-left:6px;">(need 100 🐟 · you have ${pts})</span>`;
      createBtn.onclick = () => {
        if (!user) { window.location.hash = "#/login"; return; }
        if (createFormEl) createFormEl.classList.toggle("active");
      };
    }
    const cancelCreate = document.getElementById("cancel-create-event");
    if (cancelCreate) {
      cancelCreate.onclick = () => {
        if (createFormEl) createFormEl.classList.remove("active");
      };
    }
  }

  joinEvent(eventId) {
    const event = this.state.events.find(e => e.id === eventId);
    const user = this.state.currentUser;
    if (!event || !user) return;

    if (!event.participants.includes(user.name)) {
      event.participants.push(user.name);
      
      // 参加報酬 (+30pt)
      user.points += 30;
      this.state.pointsHistory.unshift({
        userId: user.id,
        action: `イベント参加登録: ${event.title}`,
        points: 30,
        date: new Date().toLocaleDateString()
      });
      this.awardXP(user, 30);

      // 全体ユーザーリストの更新
      const index = this.state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.state.users[index] = user;
      }

      this.saveState();
      alert(`イベント「${event.title}」に参加登録しました！お魚のポイントが30pt加算されました。`);
      this.renderEvents();
    }
  }

  // 11. 相談掲示板画面の描画
  renderBoard() {
    const listEl = document.getElementById("threads-list");
    
    let html = "";
    this.state.threads.forEach(t => {
      const activeClass = this.activeThreadId === t.id ? "active" : "";
      html += `
        <div class="thread-item ${activeClass}" data-id="${t.id}">
          <div class="thread-item-meta">
            <span class="thread-category-tag">${t.category}</span>
            <span class="thread-author">${t.author}</span>
            <span class="thread-date">${t.date}</span>
          </div>
          <h3>${t.title}</h3>
          <p class="thread-item-preview">${t.content}</p>
          <div class="thread-item-footer">
            <span>💬 回答 ${t.replies.length} 件</span>
          </div>
        </div>
      `;
    });
    listEl.innerHTML = html;

    // スレッドクリックイベントアタッチ
    document.querySelectorAll(".thread-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        this.selectThread(id);
      });
    });

    // アクティブなスレッドがあれば詳細パネルを描画
    if (this.activeThreadId) {
      this.renderThreadDetail(this.activeThreadId);
    } else {
      document.getElementById("thread-detail-empty").style.display = "flex";
      document.getElementById("thread-detail-active").style.display = "none";
    }
  }

  selectThread(threadId) {
    this.activeThreadId = threadId;
    document.querySelectorAll(".thread-item").forEach(item => {
      if (item.getAttribute("data-id") === threadId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    this.renderThreadDetail(threadId);
  }

  renderThreadDetail(threadId) {
    const thread = this.state.threads.find(t => t.id === threadId);
    if (!thread) return;

    document.getElementById("thread-detail-empty").style.display = "none";
    const activePanel = document.getElementById("thread-detail-active");
    activePanel.style.display = "flex";

    // 返信一覧のHTML構築
    let repliesHtml = "";
    thread.replies.forEach(r => {
      repliesHtml += `
        <div class="reply-item">
          <div class="reply-meta">
            <span class="reply-author">${r.author}</span>
            <span class="reply-date">${r.date}</span>
          </div>
          <p class="reply-content">${r.content}</p>
        </div>
      `;
    });

    if (thread.replies.length === 0) {
      repliesHtml = `<p class="text-muted" style="text-align:center; padding:16px;">まだ回答がありません。アドバイスしてみましょう！</p>`;
    }

    activePanel.innerHTML = `
      <div class="thread-detail-header">
        <span class="thread-category-tag">${thread.category}</span>
        <h3>${thread.title}</h3>
        <p class="text-muted" style="font-size:0.8rem;">投稿者: ${thread.author} | ${thread.date}</p>
      </div>
      <div class="thread-detail-body">
        <p>${thread.content}</p>
      </div>
      
      <div class="answers-section">
        <h4>💬 回答・コメント (${thread.replies.length})</h4>
        <div class="replies-list">${repliesHtml}</div>
        
        <!-- コメント入力エリア -->
        <form id="form-add-reply" style="margin-top:20px;">
          <div class="form-group">
            <label for="reply-input-text">あなたの回答・アドバイス</label>
            <textarea id="reply-input-text" rows="3" required placeholder="困りごとに対して親切に教えてあげましょう。コミュニティに貢献すると10pt貰えます。"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">回答を投稿する</button>
        </form>
      </div>
    `;

    // コメント投稿ハンドラーアタッチ
    document.getElementById("form-add-reply").addEventListener("submit", (e) => {
      e.preventDefault();
      const user = this.state.currentUser;
      if (!user) {
        alert("回答を投稿するにはログインが必要です。");
        window.location.hash = "#/login";
        return;
      }

      const text = document.getElementById("reply-input-text").value;
      
      // 返信データ追加
      thread.replies.push({
        author: user.name + (user.role === "student_international" ? " (留学生)" : " (サポーター)"),
        date: new Date().toLocaleDateString(),
        content: text
      });

      // 回答者へのポイント付与 (+10pt)
      user.points += 10;
      this.state.pointsHistory.unshift({
        userId: user.id,
        action: `掲示板での回答投稿: ${thread.title}`,
        points: 10,
        date: new Date().toLocaleDateString()
      });
      this.awardXP(user, 10);

      // 全体ユーザーリストの更新
      const index = this.state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.state.users[index] = user;
      }

      this.saveState();
      alert("回答を投稿しました！お魚のポイントが10pt貯まりました。");
      this.renderBoard();
    });
  }

  // 12. 魚育成・コスチュームシステムの描画
  renderGame() {
    const user = this.state.currentUser;
    if (!user) {
      alert("マイフィッシュ育成ゲームにはログインが必要です。");
      window.location.hash = "#/login";
      return;
    }

    // 魚の情報描画
    document.getElementById("game-fish-name").innerText = user.fishName || `${user.name}のサカナ`;
    document.getElementById("game-fish-level").innerText = user.level || 1;

    // Tier display on game page
    const gameTierEl = document.getElementById("game-tier-badge");
    if (gameTierEl) gameTierEl.innerHTML = tierBadgeHTML(user, "lg");
    const gameTierNextEl = document.getElementById("game-tier-next");
    if (gameTierNextEl) {
      const t = getTier(user);
      const xp = user.totalXP || user.points || 0;
      const next = TIERS[TIERS.indexOf(t) - 1];
      gameTierNextEl.innerHTML = next
        ? `<span style="font-size:0.8rem;color:var(--color-text-muted);">${xp} XP · Next tier: ${next.emoji} ${next.name} at ${next.min} XP</span>`
        : `<span style="font-size:0.8rem;color:#f59e0b;font-weight:700;">🏆 Maximum tier reached!</span>`;
    }
    
    // XP計算とレベルバー (based on totalXP)
    const totalXP = user.totalXP || user.points || 0;
    const currentLevel = user.level || 1;
    // Compute XP threshold at start of current level
    let xpBase = 0;
    for (let lv = 1; lv < currentLevel; lv++) xpBase += lv * 100;
    const xpForNextLevel = currentLevel * 100;
    const xpInCurrentLevel = totalXP - xpBase;
    const percent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));
    document.getElementById("game-xp-fill").style.width = `${percent}%`;
    document.getElementById("game-xp-current").innerText = xpInCurrentLevel;
    document.getElementById("game-xp-next").innerText = xpForNextLevel;
    document.getElementById("game-xp-needed").innerText = Math.max(0, xpForNextLevel - xpInCurrentLevel);

    // 水槽アクターの見た目の更新
    const actorEl = document.getElementById("fish-actor");
    // 全ての装備クラスをクリア
    actorEl.className = "aquarium-fish-actor";
    
    // 各パーツが装備されている場合はCSSクラスを追加
    if (user.equippedItems.hat) actorEl.classList.add(`equipped-${user.equippedItems.hat}`);
    if (user.equippedItems.glasses) actorEl.classList.add(`equipped-${user.equippedItems.glasses}`);
    if (user.equippedItems.clothing) actorEl.classList.add(`equipped-${user.equippedItems.clothing}`);

    // お魚のモデル画像の更新
    const bodyImgEl = document.getElementById("fish-body-img");
    if (bodyImgEl) {
      bodyImgEl.src = user.activeFishModel || "images/Tuna3.jpg";
    }

    // お魚のモデル選択ドロップダウンの状態更新とイベントアタッチ
    const modelSelectEl = document.getElementById("select-fish-model");
    if (modelSelectEl) {
      modelSelectEl.value = user.activeFishModel || "images/Tuna3.jpg";
      
      modelSelectEl.onchange = (e) => {
        user.activeFishModel = e.target.value;
        
        // 全体ユーザーリストの更新
        const index = this.state.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.state.users[index] = user;
        }
        
        this.saveState();
        this.renderGame();
        this.renderHome();
      };
    }

    // 1) クローゼット（所持品一覧）描画
    this.renderCloset();

    // 2) ショップ描画
    this.renderShop();

    // 3) ポイント履歴
    this.renderPointsHistory();
  }

  renderCloset() {
    const user = this.state.currentUser;
    const closetEl = document.getElementById("closet-grid");
    
    // 所持品抽出
    const myItems = SHOP_ITEMS.filter(item => user.unlockedItems.includes(item.id));
    
    if (myItems.length === 0) {
      closetEl.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; text-align:center; padding: 20px;">まだ所持しているアイテムがありません。ショップで解放しましょう！</p>`;
      return;
    }

    let html = "";
    myItems.forEach(item => {
      const isEquipped = user.equippedItems[item.category] === item.id;
      const btnText = isEquipped ? "はずす" : "装備する";
      const btnClass = isEquipped ? "btn-outline" : "btn-primary";
      
      html += `
        <div class="item-card">
          <div class="item-card-preview">
            <div class="${item.previewClass}"></div>
          </div>
          <h4>${item.name}</h4>
          ${isEquipped ? '<span class="equipped-text">装備中</span>' : ''}
          <button class="btn ${btnClass} btn-sm equip-btn" data-id="${item.id}" data-category="${item.category}">${btnText}</button>
        </div>
      `;
    });
    closetEl.innerHTML = html;

    // 装備・解除ボタンイベント
    document.querySelectorAll(".equip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const category = btn.getAttribute("data-category");
        this.toggleEquip(id, category);
      });
    });
  }

  toggleEquip(itemId, category) {
    const user = this.state.currentUser;
    if (user.equippedItems[category] === itemId) {
      user.equippedItems[category] = null; // 解除
    } else {
      user.equippedItems[category] = itemId; // 装備
    }

    this.saveState();
    this.renderGame();
    this.renderHome(); // ホーム画面のお魚プレビューも更新
  }

  renderShop(activeTab) {
    const user = this.state.currentUser;
    const shopEl = document.getElementById("shop-grid");
    document.getElementById("shop-points-val").innerText = user.points;
    if (!user.equippedItems) user.equippedItems = {};

    const CATS = [
      { key: "costume", label: "🎭 Costumes" },
      { key: "avatar",  label: "🎨 Avatars" },
      { key: "frame",   label: "🖼 Frames" },
      { key: "effect",  label: "✨ Effects" },
    ];
    const tab = activeTab || user._shopTab || "costume";
    user._shopTab = tab;

    // Tab bar
    const tabBar = document.getElementById("shop-tab-bar") || (() => {
      const el = document.createElement("div");
      el.id = "shop-tab-bar";
      el.style.cssText = "display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap;";
      shopEl.parentElement.insertBefore(el, shopEl);
      return el;
    })();
    tabBar.innerHTML = CATS.map(c => `
      <button class="btn ${tab === c.key ? "btn-primary" : "btn-outline"} btn-sm shop-tab-btn" data-cat="${c.key}" style="font-size:0.82rem;">${c.label}</button>
    `).join("");
    tabBar.querySelectorAll(".shop-tab-btn").forEach(b => b.onclick = () => this.renderShop(b.dataset.cat));

    const items = SHOP_ITEMS.filter(i => (i.category || "costume") === tab);
    if (!items.length) { shopEl.innerHTML = `<p class="text-muted" style="grid-column:1/-1;text-align:center;padding:20px;">No items in this category yet.</p>`; return; }

    let html = "";
    items.forEach(item => {
      const owned   = user.unlockedItems.includes(item.id);
      const canBuy  = user.points >= item.price;
      const equippedFrame  = user.equippedItems.frame  === item.id;
      const equippedEffect = user.equippedItems.effect === item.id;
      const equippedAvatar = user.equippedItems.avatar === item.id;

      let previewContent = "";
      if (item.dicebearUrl) {
        previewContent = `<img src="${item.dicebearUrl}" alt="${item.name}" style="width:64px;height:64px;border-radius:50%;">`;
      } else {
        previewContent = `<div class="${item.previewClass || ""}" style="width:64px;height:64px;border-radius:50%;background:var(--color-bg-secondary);"></div>`;
      }

      let actionBtn = "";
      if (!owned) {
        actionBtn = `<button class="btn btn-primary btn-sm buy-btn" data-id="${item.id}" data-price="${item.price}" ${canBuy ? "" : "disabled"}>🐟 ${item.price} pts</button>`;
      } else if (item.category === "avatar") {
        actionBtn = equippedAvatar
          ? `<button class="btn btn-outline btn-sm equip-btn" data-id="${item.id}" data-cat="avatar" style="border-color:#dc3545;color:#dc3545;">Unequip</button>`
          : `<button class="btn btn-primary btn-sm equip-btn" data-id="${item.id}" data-cat="avatar">Equip</button>`;
      } else if (item.category === "frame") {
        actionBtn = equippedFrame
          ? `<button class="btn btn-outline btn-sm equip-btn" data-id="${item.id}" data-cat="frame" style="border-color:#dc3545;color:#dc3545;">Unequip</button>`
          : `<button class="btn btn-primary btn-sm equip-btn" data-id="${item.id}" data-cat="frame">Equip</button>`;
      } else if (item.category === "effect") {
        actionBtn = equippedEffect
          ? `<button class="btn btn-outline btn-sm equip-btn" data-id="${item.id}" data-cat="effect" style="border-color:#dc3545;color:#dc3545;">Unequip</button>`
          : `<button class="btn btn-primary btn-sm equip-btn" data-id="${item.id}" data-cat="effect">Equip</button>`;
      } else {
        actionBtn = `<span style="font-size:0.75rem;color:#16a34a;font-weight:600;">✅ Owned</span>`;
      }

      html += `
        <div class="item-card" style="position:relative;">
          ${owned ? `<span style="position:absolute;top:8px;right:8px;font-size:0.7rem;background:#d1fae5;color:#065f46;padding:2px 7px;border-radius:10px;">Owned</span>` : ""}
          <div class="item-card-preview">${previewContent}</div>
          <h4 style="font-size:0.9rem;margin:8px 0 4px;">${item.name}</h4>
          ${actionBtn}
        </div>`;
    });
    shopEl.innerHTML = html;

    // Buy
    shopEl.querySelectorAll(".buy-btn").forEach(btn => {
      btn.onclick = () => this.unlockItem(btn.dataset.id, parseInt(btn.dataset.price));
    });

    // Equip / Unequip
    shopEl.querySelectorAll(".equip-btn").forEach(btn => {
      btn.onclick = () => {
        const item = SHOP_ITEMS.find(i => i.id === btn.dataset.id);
        if (!item) return;
        const cat = btn.dataset.cat;
        if (user.equippedItems[cat] === item.id) {
          // Unequip
          delete user.equippedItems[cat];
          if (cat === "avatar" && user._originalAvatar) {
            user.avatar = user._originalAvatar;
            delete user._originalAvatar;
          }
        } else {
          // Equip
          if (cat === "avatar") {
            if (!user._originalAvatar) user._originalAvatar = user.avatar;
            user.avatar = item.dicebearUrl;
          }
          user.equippedItems[cat] = item.id;
        }
        const idx = this.state.users.findIndex(u => u.id === user.id);
        if (idx !== -1) this.state.users[idx] = user;
        this.saveState();
        this.renderShop(tab);
      };
    });
  }

  unlockItem(itemId, price) {
    const user = this.state.currentUser;
    if (user.points >= price) {
      user.points -= price;
      user.unlockedItems.push(itemId);
      
      // 履歴追加 (マイナス表示)
      this.state.pointsHistory.unshift({
        userId: user.id,
        action: `アイテム解放: ${SHOP_ITEMS.find(i => i.id === itemId).name}`,
        points: -price,
        date: new Date().toLocaleDateString()
      });

      // レベル再計算 (ポイント消費してもレベルは下がらない仕様にするため、レベル判定は別管理にするか、総獲得ポイント基準にすることも可能ですが、ここでは簡易的に「レベル＝points/100の切り捨て＋1」ではなく、現在の総ポイントをベースにします。一度上がったレベルは下がらないようにします)
      
      // 全体ユーザーリスト更新
      const index = this.state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.state.users[index] = user;
      }

      this.saveState();
      alert("コスチュームを解放しました！クローゼットから着せ替えてみましょう！");
      this.renderGame();
      this.renderHome();
    }
  }

  renderPointsHistory() {
    const user = this.state.currentUser;
    const historyEl = document.getElementById("points-history-list");
    
    const myHistory = this.state.pointsHistory.filter(h => h.userId === user.id);

    if (myHistory.length === 0) {
      historyEl.innerHTML = `<p class="text-muted" style="text-align:center; padding: 20px;">ポイント履歴はまだありません。</p>`;
      return;
    }

    let html = "";
    myHistory.forEach(h => {
      const isPositive = h.points >= 0;
      const pointsText = isPositive ? `+${h.points}` : `${h.points}`;
      const pointsStyle = isPositive ? "color:#16a34a;" : "color:#ef4444;";
      
      html += `
        <div class="history-item">
          <div class="history-item-left">
            <span class="history-action-name">${h.action}</span>
            <span class="history-action-date">${h.date}</span>
          </div>
          <span class="history-points-earned" style="${pointsStyle}">${pointsText} pt</span>
        </div>
      `;
    });
    historyEl.innerHTML = html;
  }

  // レベルアップと経験値計算ロジック (uses cumulative XP so spending pts doesn't lower level)
  awardXP(user, amount) {
    user.totalXP = (user.totalXP || 0) + amount;
    const oldLevel = user.level || 1;
    // XP required per level increases: level N needs N*100 cumulative XP
    let newLevel = 1;
    let xpNeeded = 100;
    let xpAccum = 0;
    while (user.totalXP >= xpAccum + xpNeeded) {
      xpAccum += xpNeeded;
      newLevel++;
      xpNeeded = newLevel * 100;
    }
    if (newLevel > oldLevel) {
      user.level = newLevel;
      alert(`🎉 Level Up! Lv.${oldLevel} → Lv.${newLevel}!\nレベルアップしました！お魚が成長しました！`);
    }
  }

  // 自動的チャットルーム確保
  ensureChatRooms() {
    this.state.bookings.forEach(b => {
      if (b.status === "matched" || b.status === "completed") {
        if (b.supporterId && b.studentId) {
          const roomId = `chat_${b.supporterId}_${b.studentId}`;
          const altRoomId = `chat_${b.studentId}_${b.supporterId}`;
          const exists = this.state.chats.some(c => c.id === roomId || c.id === altRoomId);
          if (!exists) {
            this.state.chats.push({
              id: roomId,
              userIds: [b.supporterId, b.studentId],
              messages: [
                { id: "msg_auto_" + Date.now(), senderId: "system", senderName: "System", text: `同行サポート「${b.category}」がマッチングされました。チャットを開始してください。(Matching Completed for ${b.category}.)`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
              ]
            });
          }
        }
      }
    });
    this.saveState();
  }

  // 13. ネイティブチャット画面の描画
  renderChat() {
    const user = this.state.currentUser;
    if (!user) {
      alert("チャットを利用するにはログインが必要です。");
      window.location.hash = "#/login";
      return;
    }

    this.ensureChatRooms();

    const agreementEl = document.getElementById("chat-rules-agreement");
    const activeConvEl = document.getElementById("chat-conversation-active");
    const noSelectionEl = document.getElementById("chat-no-selection");

    // 規約のチェック
    if (!user.agreedToChatRules) {
      agreementEl.style.display = "flex";
      activeConvEl.style.display = "none";
      noSelectionEl.style.display = "none";

      const checkEl = document.getElementById("chat-rules-check");
      const agreeBtn = document.getElementById("chat-agree-btn");

      checkEl.checked = false;
      agreeBtn.disabled = true;

      checkEl.onchange = () => {
        agreeBtn.disabled = !checkEl.checked;
      };

      agreeBtn.onclick = () => {
        user.agreedToChatRules = true;
        // ユーザーリストの中身も更新
        const idx = this.state.users.findIndex(u => u.id === user.id);
        if (idx !== -1) {
          this.state.users[idx] = user;
        }
        this.saveState();
        this.renderChat();
      };
      return;
    }

    // 同意済みの場合、チャット画面表示
    agreementEl.style.display = "none";

    // チャット相手（ルーム）の抽出
    // 管理者の場合はすべてのチャットルーム。一般ユーザーは所属しているルームのみ。
    const myRooms = this.state.chats.filter(room => user.role === "admin" || room.userIds.includes(user.id));
    const roomsListEl = document.getElementById("chat-rooms-list");

    if (myRooms.length === 0) {
      roomsListEl.innerHTML = `<p class="text-muted" style="text-align:center; padding: 12px; font-size: 0.85rem;">進行中のチャットはありません。</p>`;
      activeConvEl.style.display = "none";
      noSelectionEl.style.display = "flex";
    } else {
      let roomsHtml = "";
      myRooms.forEach(room => {
        // 相手の名前とアバターを取得
        let partnerName = "つなともユーザー";
        let partnerAvatar = "images/Tuna1.jpg";
        let partnerRole = "";
        
        // 相手のIDを特定
        const partnerId = room.userIds.find(id => id !== user.id);
        const partner = this.state.users.find(u => u.id === partnerId);
        
        if (partner) {
          partnerName = partner.name;
          partnerAvatar = partner.avatar || "images/Tuna1.jpg";
          partnerRole = partner.role === "student_international" ? "国際学生" : partner.role === "student_japanese" ? "日本人学生" : "地域住民";
        } else if (user.role === "admin") {
          // 管理者が全部屋を見る場合、二人の参加者を明記
          const user1 = this.state.users.find(u => u.id === room.userIds[0]);
          const user2 = this.state.users.find(u => u.id === room.userIds[1]);
          partnerName = `${user1 ? user1.name : room.userIds[0]} & ${user2 ? user2.name : room.userIds[1]}`;
        }

        const lastMsg = room.messages[room.messages.length - 1];
        const lastText = lastMsg ? lastMsg.text : "";
        const lastTime = lastMsg ? lastMsg.time : "";

        const isActive = this.activeChatRoomId === room.id ? "active" : "";

        roomsHtml += `
          <div class="chat-room-item ${isActive}" data-id="${room.id}" style="display: flex; gap: 10px; padding: 10px; border-radius: var(--radius-sm); cursor: pointer; border-bottom: 1px solid var(--color-border); align-items: center; background: ${isActive ? 'var(--gradient-soft)' : 'transparent'};">
            <img src="${partnerAvatar}" alt="${partnerName}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
            <div style="flex:1; min-width: 0;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight: 700; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${partnerName}</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">${lastTime}</span>
              </div>
              <p style="font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top:2px;">${lastText}</p>
            </div>
          </div>
        `;
      });
      roomsListEl.innerHTML = roomsHtml;

      // 部屋クリックイベント
      document.querySelectorAll(".chat-room-item").forEach(item => {
        item.addEventListener("click", () => {
          this.activeChatRoomId = item.getAttribute("data-id");
          this.renderChat();
        });
      });
    }

    // トーク画面の描画
    if (this.activeChatRoomId) {
      const activeRoom = this.state.chats.find(r => r.id === this.activeChatRoomId);
      if (activeRoom) {
        activeConvEl.style.display = "flex";
        noSelectionEl.style.display = "none";

        // 相手の名前特定
        let partnerName = "トーク相手";
        let partnerId = activeRoom.userIds.find(id => id !== user.id);
        let partner = this.state.users.find(u => u.id === partnerId);
        if (partner) {
          partnerName = partner.name;
        } else if (user.role === "admin") {
          const u1 = this.state.users.find(u => u.id === activeRoom.userIds[0]);
          const u2 = this.state.users.find(u => u.id === activeRoom.userIds[1]);
          partnerName = `${u1 ? u1.name : "ユーザー1"} & ${u2 ? u2.name : "ユーザー2"}`;
        }
        document.getElementById("chat-partner-name").innerText = partnerName;

        // メッセージ描画
        const msgContainer = document.getElementById("chat-messages-container");
        let msgHtml = "";
        activeRoom.messages.forEach(msg => {
          if (msg.senderId === "system") {
            msgHtml += `
              <div style="text-align: center; margin: 8px 0;">
                <span style="background: #e9ecef; color: var(--color-text-muted); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem;">${msg.text}</span>
              </div>
            `;
          } else if (msg.senderId === user.id) {
            // 送信メッセージ (自分)
            msgHtml += `
              <div class="chat-message sent" style="align-self: flex-end; display: flex; flex-direction: column; align-items: flex-end; max-width: 70%; margin-bottom: 8px;">
                <div style="background: var(--color-primary); color: #fff; padding: 10px 16px; border-radius: 16px 16px 0 16px; font-size: 0.9rem; box-shadow: var(--shadow-sm);">${msg.text}</div>
                <span style="font-size: 0.7rem; color: var(--color-text-muted); margin-top: 2px;">${msg.time}</span>
              </div>
            `;
          } else {
            // 受信メッセージ (相手)
            let senderAvatar = "images/Tuna1.jpg";
            let sender = this.state.users.find(u => u.id === msg.senderId);
            if (sender) senderAvatar = sender.avatar || "images/Tuna1.jpg";

            msgHtml += `
              <div class="chat-message received" style="align-self: flex-start; display: flex; gap: 8px; max-width: 70%; margin-bottom: 8px;">
                <img src="${senderAvatar}" alt="${msg.senderName}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 2px;">${msg.senderName}</span>
                  <div style="background: #e9ecef; color: var(--color-text-dark); padding: 10px 16px; border-radius: 0 16px 16px 16px; font-size: 0.9rem; box-shadow: var(--shadow-sm);">${msg.text}</div>
                  <span style="font-size: 0.7rem; color: var(--color-text-muted); margin-top: 2px;">${msg.time}</span>
                </div>
              </div>
            `;
          }
        });
        msgContainer.innerHTML = msgHtml;
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // メッセージ送信
        const msgForm = document.getElementById("chat-message-form");
        msgForm.onsubmit = (e) => {
          e.preventDefault();
          const inputEl = document.getElementById("chat-input-text");
          const text = inputEl.value.trim();
          if (!text) return;

          // Check timeout
          const now = Date.now();
          if (user.timeoutUntil && user.timeoutUntil > now) {
            const remaining = Math.ceil((user.timeoutUntil - now) / 1000);
            alert(`⚠️ You are timed out for ${remaining} more second(s) due to a community rule violation.`);
            inputEl.value = "";
            return;
          }

          // Blacklist check
          if (containsBlacklist(text)) {
            // Warn user
            alert("⚠️ Your message contains offensive language. This is a warning. Repeated violations may result in a ban.\n\nあなたのメッセージに不適切な言葉が含まれています。警告が発行されました。");
            // 30-second timeout
            user.timeoutUntil = Date.now() + 30000;
            user.warnings = (user.warnings || 0) + 1;
            // Update user in list
            const uIdx = this.state.users.findIndex(u2 => u2.id === user.id);
            if (uIdx !== -1) this.state.users[uIdx] = user;
            // Notify admin
            this.state.reports.unshift({
              id: "report_auto_" + Date.now(),
              reporterName: "⚠️ System (Auto)",
              reportedName: user.name,
              reason: `Blacklisted word used in chat (Warning #${user.warnings})`,
              details: `Message: "${text}"  |  Chat room: ${this.activeChatRoomId}`,
              chatRoomId: this.activeChatRoomId,
              timestamp: new Date().toLocaleString()
            });
            this.saveState();
            inputEl.value = "";
            // Disable input for 30s
            inputEl.disabled = true;
            const submitBtn = msgForm.querySelector("button[type='submit']");
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => {
              inputEl.disabled = false;
              if (submitBtn) submitBtn.disabled = false;
              inputEl.placeholder = "You can chat again now.";
            }, 30000);
            return;
          }

          const newMsg = {
            id: "msg_" + Date.now(),
            senderId: user.id,
            senderName: user.name,
            text: text,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
          activeRoom.messages.push(newMsg);
          inputEl.value = "";
          this.saveState();
          this.renderChat();

          // 自動返信 (相手がサポーターや留学生の模擬ボットの場合)
          if (partner && partner.id !== "admin") {
            setTimeout(() => {
              if (this.activeChatRoomId !== activeRoom.id) return;
              let replyText = "メッセージありがとうございます！何か困ったことがあればいつでも聞いてくださいね。";
              const lowerText = text.toLowerCase();
              if (lowerText.includes("こんにちは") || lowerText.includes("hello") || lowerText.includes("hi")) {
                replyText = `こんにちは！つなともへようこそ！日本での生活はいかがですか？何かお手伝いできることはありますか？`;
              } else if (lowerText.includes("役所") || lowerText.includes("登録") || lowerText.includes("住民票") || lowerText.includes("保険") || lowerText.includes("city hall") || lowerText.includes("ward")) {
                replyText = `役所での住民登録や国民健康保険の手続きですね！同行サポートの予約を申請していただければ、一緒に行って書類の記入などもお手伝いしますよ！`;
              } else if (lowerText.includes("銀行") || lowerText.includes("口座") || lowerText.includes("ゆうちょ") || lowerText.includes("bank") || lowerText.includes("account")) {
                replyText = `銀行口座の開設ですね！留学生には「ゆうちょ銀行」が一番作りやすくておすすめです。必要書類（在留カード、学生証など）を揃えて一緒に行きましょう！`;
              } else if (lowerText.includes("携帯") || lowerText.includes("電話") || lowerText.includes("sim") || lowerText.includes("mobile")) {
                replyText = `スマートフォンのSIMカード契約ですね！MobalやIIJmioなど、留学生向けの格安SIMがおすすめです。契約手続きの同行も可能ですよ！`;
              } else if (lowerText.includes("ありがとう") || lowerText.includes("thank")) {
                replyText = `どういたしまして！お役に立てて嬉しいです。他にも気になることがあれば、いつでも聞いてください。`;
              }

              const partnerMsg = {
                id: "msg_reply_" + Date.now(),
                senderId: partner.id,
                senderName: partner.name,
                text: replyText,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
              };
              activeRoom.messages.push(partnerMsg);
              this.saveState();
              this.renderChat();
            }, 1500);
          }
        };

        // 通報ボタン処理
        const reportBtn = document.getElementById("chat-report-btn");
        if (user.role === "admin") {
          reportBtn.style.display = "none";
        } else {
          reportBtn.style.display = "block";
          reportBtn.onclick = () => {
            if (!partner) return;
            const reason = prompt("通報理由を入力してください（ハラスメント、スパム、出会い目的等）:\nEnter the reason for report (harassment, spam, dating request):");
            if (reason) {
              const newReport = {
                id: "report_" + Date.now(),
                reporterName: user.name,
                reportedName: partner.name,
                reason: reason,
                details: `チャットルーム ID: ${activeRoom.id} での発言`,
                chatRoomId: activeRoom.id,
                timestamp: new Date().toLocaleString()
              };
              this.state.reports.unshift(newReport);
              this.saveState();
              alert("通報が管理者に送信されました。ご協力ありがとうございます。");
            }
          };
        }
      }
    } else {
      activeConvEl.style.display = "none";
      noSelectionEl.style.display = "flex";
    }
  }

  // 14. 管理者ダッシュボードの描画
  renderAdmin() {
    const user = this.state.currentUser;
    if (!user || user.role !== "admin") {
      alert("管理者権限が必要です。");
      window.location.hash = "#/home";
      return;
    }

    // 1) 予約一覧テーブル
    const bookingsTable = document.getElementById("admin-bookings-table-body");
    let bookingsHtml = "";
    this.state.bookings.forEach(b => {
      const statusText = b.status === "pending" ? "承認待ち" : b.status === "matched" ? "マッチ完了" : "完了";
      const statusClass = b.status === "pending" ? "status-pending" : b.status === "matched" ? "status-matched" : "status-completed";
      
      let assignBtn = "";
      if (b.status === "pending") {
        assignBtn = `<button class="btn btn-primary btn-sm assign-supporter-btn" data-id="${b.id}" style="padding: 2px 8px; font-size: 0.8rem; margin-right: 4px;">割り当て</button>`;
      } else if (b.status === "matched") {
        assignBtn = `<button class="btn btn-outline btn-sm admin-complete-booking-btn" data-id="${b.id}" style="padding: 2px 8px; font-size: 0.8rem; border-color: green; color: green; margin-right: 4px;">完了にする</button>`;
      }

      bookingsHtml += `
        <tr style="border-bottom: 1px solid var(--color-border); padding: 12px 0;">
          <td style="padding: 12px;">${b.id.substring(8, 14)}</td>
          <td style="padding: 12px;">${b.studentName}</td>
          <td style="padding: 12px;">${b.supporterName}</td>
          <td style="padding: 12px;">${b.category}</td>
          <td style="padding: 12px;">${b.date} ${b.time}</td>
          <td style="padding: 12px;"><span class="booking-status ${statusClass}">${statusText}</span></td>
          <td style="padding: 12px;">
            ${assignBtn}
            <button class="btn btn-outline btn-sm admin-delete-booking-btn" data-id="${b.id}" style="padding: 2px 8px; font-size: 0.8rem; border-color:#dc3545; color:#dc3545;">削除</button>
          </td>
        </tr>
      `;
    });
    bookingsTable.innerHTML = bookingsHtml || `<tr><td colspan="7" style="text-align:center; padding:20px;">予約はありません。</td></tr>`;

    // 予約ボタンイベントアタッチ
    document.querySelectorAll(".assign-supporter-btn").forEach(btn => {
      btn.onclick = () => {
        const bid = btn.getAttribute("data-id");
        // サポーター一覧を作成
        const supporters = this.state.users.filter(u => u.role !== "student_international" && u.role !== "admin");
        let listText = "サポーターの番号を入力してください:\n";
        supporters.forEach((s, i) => {
          listText += `${i + 1}. ${s.name} (${s.role === "student_japanese" ? "日本人学生" : "地域住民"})\n`;
        });
        const ans = prompt(listText);
        const idx = parseInt(ans) - 1;
        if (supporters[idx]) {
          const b = this.state.bookings.find(bk => bk.id === bid);
          b.supporterId = supporters[idx].id;
          b.supporterName = supporters[idx].name;
          b.status = "matched";
          this.saveState();
          alert(`${supporters[idx].name}を割り当てました！`);
          this.renderAdmin();
        }
      };
    });

    document.querySelectorAll(".admin-complete-booking-btn").forEach(btn => {
      btn.onclick = () => {
        const bid = btn.getAttribute("data-id");
        this.completeBooking(bid);
        this.renderAdmin();
      };
    });

    document.querySelectorAll(".admin-delete-booking-btn").forEach(btn => {
      btn.onclick = () => {
        const bid = btn.getAttribute("data-id");
        if (confirm("本当にこの予約を削除しますか？")) {
          this.state.bookings = this.state.bookings.filter(b => b.id !== bid);
          this.saveState();
          this.renderAdmin();
        }
      };
    });

    // 2) ユーザー一覧テーブル
    const usersTable = document.getElementById("admin-users-table-body");
    let usersHtml = "";
    this.state.users.forEach(u => {
      usersHtml += `
        <tr style="border-bottom: 1px solid var(--color-border);">
          <td style="padding: 12px; display:flex; gap: 8px; align-items:center;">
            <img src="${u.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover;">
            <span>${u.name}</span>
          </td>
          <td style="padding: 12px;">${u.email}</td>
          <td style="padding: 12px;">${u.role}</td>
          <td style="padding: 12px;"><strong>${u.points}</strong> pt</td>
          <td style="padding: 12px;">
            <button class="btn btn-outline btn-sm admin-edit-points-btn" data-id="${u.id}" style="padding: 2px 8px; font-size: 0.8rem; margin-right:4px;">Pt調整</button>
            <button class="btn btn-outline btn-sm admin-delete-user-btn" data-id="${u.id}" style="padding: 2px 8px; font-size: 0.8rem; border-color:#dc3545; color:#dc3545;" ${u.role === 'admin' ? 'disabled' : ''}>削除</button>
          </td>
        </tr>
      `;
    });
    usersTable.innerHTML = usersHtml;

    // ユーザーアクションアタッチ
    document.querySelectorAll(".admin-edit-points-btn").forEach(btn => {
      btn.onclick = () => {
        const uid = btn.getAttribute("data-id");
        const targetUser = this.state.users.find(u => u.id === uid);
        const pts = prompt(`現在のポイントは ${targetUser.points} pt です。新しいポイントを入力してください:`, targetUser.points);
        if (pts !== null && !isNaN(pts)) {
          targetUser.points = parseInt(pts);
          this.saveState();
          alert("ポイントを更新しました。");
          this.renderAdmin();
        }
      };
    });

    document.querySelectorAll(".admin-delete-user-btn").forEach(btn => {
      btn.onclick = () => {
        const uid = btn.getAttribute("data-id");
        if (confirm("本当にこのユーザーを削除しますか？")) {
          this.state.users = this.state.users.filter(u => u.id !== uid);
          this.saveState();
          this.renderAdmin();
        }
      };
    });

    // 3) チャット監視 & 通報ログ
    // (a) 通報ログ一覧の描画
    const reportsContainer = document.getElementById("admin-reports-container");
    let reportsHtml = "";
    this.state.reports.forEach(r => {
      reportsHtml += `
        <div style="background:#fff; border: 1.5px solid #ffccd5; border-radius: var(--radius-sm); padding: 10px; display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; margin-bottom: 8px;">
          <div>
            <span style="color:#e63946; font-weight:700;">[通報]</span> 通報者: <strong>${r.reporterName}</strong> | 対象: <strong style="color:#e63946;">${r.reportedName}</strong><br>
            理由: <span style="background:#ffe3e3; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">${r.reason}</span><br>
            <span style="font-size:0.75rem; color:var(--color-text-muted);">${r.timestamp}</span>
          </div>
          <div style="display:flex; gap: 8px;">
            <button class="btn btn-primary btn-sm view-reported-chat-btn" data-room-id="${r.chatRoomId}" style="padding: 4px 8px; font-size:0.75rem;">チャット確認</button>
            <button class="btn btn-outline btn-sm delete-report-btn" data-id="${r.id}" style="padding: 4px 8px; font-size:0.75rem; border-color:#999; color:#999;">却下</button>
          </div>
        </div>
      `;
    });
    reportsContainer.innerHTML = reportsHtml || `<p class="text-muted" style="text-align:center; padding:10px; margin: 0;">現在届いている通報はありません。</p>`;

    document.querySelectorAll(".view-reported-chat-btn").forEach(btn => {
      btn.onclick = () => {
        const rid = btn.getAttribute("data-room-id");
        this.selectAdminChatRoom(rid);
      };
    });

    document.querySelectorAll(".delete-report-btn").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        this.state.reports = this.state.reports.filter(r => r.id !== id);
        this.saveState();
        this.renderAdmin();
      };
    });

    // (b) アクティブチャット一覧
    const adminChatsList = document.getElementById("admin-chats-list");
    let adminChatsHtml = "";
    this.state.chats.forEach(room => {
      const user1 = this.state.users.find(u => u.id === room.userIds[0]);
      const user2 = this.state.users.find(u => u.id === room.userIds[1]);
      const name = `${user1 ? user1.name : room.userIds[0]} & ${user2 ? user2.name : room.userIds[1]}`;
      const lastMsg = room.messages[room.messages.length - 1];
      const lastText = lastMsg ? lastMsg.text : "";

      const isActive = this.activeAdminChatRoomId === room.id ? "active" : "";

      adminChatsHtml += `
        <div class="admin-chat-item ${isActive}" data-id="${room.id}" style="padding:10px; border-radius: var(--radius-sm); border: 1.5px solid var(--color-border); cursor:pointer; background: ${isActive ? 'var(--gradient-soft)' : 'transparent'}; margin-bottom: 8px;">
          <div style="font-weight:700; font-size:0.85rem;">${name}</div>
          <div style="font-size:0.75rem; color:var(--color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:4px;">${lastText}</div>
        </div>
      `;
    });
    adminChatsList.innerHTML = adminChatsHtml || `<p class="text-muted">進行中のチャットはありません。</p>`;

    document.querySelectorAll(".admin-chat-item").forEach(item => {
      item.onclick = () => {
        const rid = item.getAttribute("data-id");
        this.selectAdminChatRoom(rid);
      };
    });

    // アクティブな監視チャット詳細
    this.renderAdminChatDetail();
  }

  selectAdminChatRoom(roomId) {
    this.activeAdminChatRoomId = roomId;
    // チャット監視タブをアクティブにする
    document.querySelectorAll(".admin-tab-btn").forEach(b => {
      if (b.getAttribute("data-tab") === "chats") {
        b.classList.add("btn-primary");
        b.classList.remove("btn-outline");
      } else {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
      }
    });
    document.querySelectorAll(".admin-panel").forEach(panel => {
      panel.style.display = "none";
    });
    document.getElementById("admin-panel-chats").style.display = "block";

    this.renderAdmin();
  }

  renderAdminChatDetail() {
    const detailPanel = document.getElementById("admin-chat-detail-panel");
    if (!detailPanel) return;

    if (!this.activeAdminChatRoomId) {
      detailPanel.innerHTML = `
        <p class="text-muted" style="text-align: center; margin-top: 100px;">
          <span class="lang-ja">チャットルームを選択すると履歴が表示されます。</span>
          <span class="lang-en">Select a chat room to view message log.</span>
        </p>
      `;
      return;
    }

    const activeRoom = this.state.chats.find(r => r.id === this.activeAdminChatRoomId);
    if (!activeRoom) {
      detailPanel.innerHTML = `<p class="text-muted" style="text-align:center; padding:20px;">チャットルームが見つかりません。</p>`;
      return;
    }

    const u1 = this.state.users.find(u => u.id === activeRoom.userIds[0]);
    const u2 = this.state.users.find(u => u.id === activeRoom.userIds[1]);
    const roomTitle = `${u1 ? u1.name : activeRoom.userIds[0]} & ${u2 ? u2.name : activeRoom.userIds[1]}`;

    let msgHtml = `
      <div style="border-bottom:1.5px solid var(--color-border); padding-bottom:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <strong style="font-size:0.95rem;">${roomTitle}</strong>
        <span style="font-size:0.75rem; color:#dc3545; border:1px solid #dc3545; padding: 2px 8px; border-radius:12px; font-weight:700;">監査ログ (Audit View)</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px;">
    `;

    activeRoom.messages.forEach(msg => {
      const isSystem = msg.senderId === "system";
      if (isSystem) {
        msgHtml += `
          <div style="text-align:center;">
            <span style="background:#e9ecef; color:var(--color-text-muted); padding:2px 8px; border-radius:10px; font-size:0.7rem;">${msg.text}</span>
          </div>
        `;
      } else {
        msgHtml += `
          <div style="background:#fff; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 12px; font-size:0.85rem; margin-bottom: 8px;">
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.75rem; color:var(--color-text-muted); margin-bottom:4px;">
              <span>${msg.senderName}</span>
              <span>${msg.time}</span>
            </div>
            <div>${msg.text}</div>
          </div>
        `;
      }
    });

    msgHtml += "</div>";
    detailPanel.innerHTML = msgHtml;
  }
}

// ==========================================================================
// ONBOARDING FLOW
// ==========================================================================
function initOnboarding(app, user) {
  const overlay = document.getElementById("onboarding-overlay");
  if (!overlay) return;
  overlay.style.display = "flex";

  // Pre-select role radio based on user role
  const roleRadio = document.querySelector(`input[name="ob-role"][value="${user.role}"]`);
  if (roleRadio) roleRadio.checked = true;

  // Toggle country field based on role
  function updateCountryField() {
    const role = document.querySelector('input[name="ob-role"]:checked')?.value;
    const cg = document.getElementById("ob-country-group");
    if (cg) cg.style.display = role === "student_international" ? "block" : "none";
  }
  document.querySelectorAll('input[name="ob-role"]').forEach(r => r.addEventListener("change", updateCountryField));
  updateCountryField();

  // Step navigation helpers
  function goToStep(n) {
    document.querySelectorAll(".ob-panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".ob-step").forEach((s, i) => {
      s.classList.remove("active", "done");
      if (i + 1 < n) s.classList.add("done");
      if (i + 1 === n) s.classList.add("active");
    });
    document.getElementById(`ob-panel-${n}`).classList.add("active");
  }

  document.querySelectorAll(".ob-next").forEach(btn => {
    btn.onclick = () => goToStep(parseInt(btn.dataset.next));
  });
  document.querySelectorAll(".ob-back").forEach(btn => {
    btn.onclick = () => goToStep(parseInt(btn.dataset.back));
  });

  // Finish button
  document.getElementById("ob-finish-btn").onclick = () => {
    // Save all onboarding data to the user
    const role = document.querySelector('input[name="ob-role"]:checked')?.value || user.role;
    const avatar = document.querySelector('input[name="ob-avatar"]:checked')?.value || user.avatar;
    const college = document.getElementById("ob-college").value;
    const semester = document.getElementById("ob-semester").value;
    const country = document.getElementById("ob-country").value;
    const bio = document.getElementById("ob-bio").value;

    user.role = role;
    user.avatar = avatar;
    if (college) user.college = college;
    if (semester) user.semester = semester;
    if (country) user.country = country;
    if (bio) user.bio = bio;
    user.onboardingDone = true;

    // Sync into users list
    const idx = app.state.users.findIndex(u => u.id === user.id);
    if (idx !== -1) app.state.users[idx] = user;
    app.state.currentUser = user;
    app.saveState();

    overlay.style.display = "none";
    app.updateHeader();
    window.location.hash = "#/profile";
  };
}

// ============================================================
//  LEADERBOARD
// ============================================================
TunatomoApp.prototype.renderLeaderboard = function() {
  const listEl = document.getElementById("ranking-list");
  const guideEl = document.getElementById("ranking-tier-guide");
  const searchEl = document.getElementById("ranking-search");
  if (!listEl) return;

  const me = this.state.currentUser;
  const filter = searchEl ? searchEl.value.toLowerCase() : "";

  const sorted = [...this.state.users]
    .filter(u => u.role !== "admin")
    .sort((a, b) => ((b.totalXP || b.points || 0) - (a.totalXP || a.points || 0)));

  const medals = ["🥇", "🥈", "🥉"];

  let html = "";
  sorted.forEach((u, i) => {
    if (filter && !u.name.toLowerCase().includes(filter)) return;
    const xp = u.totalXP || u.points || 0;
    const t = getTier(u);
    const roleText = u.role === "student_international" ? "International" : u.role === "student_japanese" ? "Japanese Supporter" : "Local Resident";
    const roleClass = u.role === "student_international" ? "badge-student-intl" : u.role === "student_japanese" ? "badge-student-jp" : "badge-resident";
    const isMe = me && u.id === me.id;
    html += `
      <div class="ranking-row${isMe ? " is-me" : ""}">
        <span class="ranking-rank">${i < 3 ? medals[i] : `#${i + 1}`}</span>
        <img class="ranking-avatar" src="${u.avatar || 'images/Tuna1.jpg'}" alt="${u.name}">
        <div class="ranking-name">${u.name}${isMe ? " <span style='font-size:0.75rem;color:var(--color-primary);'>(You)</span>" : ""}</div>
        <span class="tier-badge ${t.css}" style="padding:3px 10px;font-size:0.7rem;">${t.emoji} ${t.name}</span>
        <span class="badge ${roleClass}" style="font-size:0.7rem;">${roleText}</span>
        <span class="ranking-xp">Lv.${u.level || 1} · ${xp} XP</span>
      </div>`;
  });
  listEl.innerHTML = html || `<p class="text-muted" style="padding:20px;text-align:center;">No results found.</p>`;

  // Tier guide
  if (guideEl) {
    guideEl.innerHTML = TIERS.slice().reverse().map(t => `
      <div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid var(--color-border);">
        <span class="tier-badge ${t.css}" style="padding:6px 16px;font-size:0.9rem;min-width:130px;text-align:center;">${t.emoji} ${t.name}</span>
        <span style="font-size:0.85rem;color:var(--color-text-muted);">${t.min === 0 ? "0 – 199 XP (Starter)" : t.min === 200 ? "200 – 499 XP" : t.min === 500 ? "500 – 999 XP" : "1000+ XP (Max Tier)"}</span>
      </div>`).join("");
  }

  // Live search
  if (searchEl) searchEl.oninput = () => this.renderLeaderboard();
};

// ============================================================
//  POINTS MARKET (send / request)
// ============================================================
TunatomoApp.prototype.renderPointsMarket = function() {
  const el = document.getElementById("panel-market");
  if (!el) return;
  const user = this.state.currentUser;
  if (!user) { el.innerHTML = `<p class="text-muted" style="text-align:center;padding:20px;">Please sign in.</p>`; return; }

  const othersOptions = this.state.users
    .filter(u => u.id !== user.id && u.role !== "admin")
    .map(u => `<option value="${u.id}">${u.name}</option>`).join("");

  const pendingForMe = (this.state.pointRequests || []).filter(r => r.toId === user.id && r.status === "pending");
  const mySent      = (this.state.pointRequests || []).filter(r => r.fromId === user.id && r.status === "pending");

  const pendingHtml = pendingForMe.length ? pendingForMe.map(r => `
    <div class="pending-request-card">
      <div>
        <strong>${r.fromName}</strong> requests <strong>${r.amount} 🐟</strong>
        ${r.message ? `<br><span style="font-size:0.8rem;color:var(--color-text-muted);">"${r.message}"</span>` : ""}
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary btn-sm accept-req-btn" data-id="${r.id}">Accept</button>
        <button class="btn btn-outline btn-sm decline-req-btn" data-id="${r.id}" style="border-color:#dc3545;color:#dc3545;">Decline</button>
      </div>
    </div>`).join("") : `<p class="text-muted" style="font-size:0.85rem;">No pending requests.</p>`;

  const sentHtml = mySent.length ? mySent.map(r => `
    <div class="pending-request-card" style="background:#f0fdf4;">
      <div>Waiting for <strong>${r.toName}</strong> · <strong>${r.amount} 🐟</strong></div>
      <span style="font-size:0.75rem;color:var(--color-text-muted);">Pending</span>
    </div>`).join("") : `<p class="text-muted" style="font-size:0.85rem;">No sent requests.</p>`;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
      <!-- Send Points -->
      <div class="market-section">
        <h3>💸 Send Points</h3>
        <p style="font-size:0.82rem;color:var(--color-text-muted);margin-bottom:12px;">Your balance: <strong>${user.points} 🐟</strong> · Min transfer: 100 pts</p>
        <div class="form-group"><label>To</label><select id="send-to-user">${othersOptions}</select></div>
        <div class="form-group"><label>Amount</label><input type="number" id="send-amount" min="100" max="${user.points}" placeholder="e.g. 100"></div>
        <div class="form-group"><label>Message (optional)</label><input type="text" id="send-message" placeholder="Thanks for your help!"></div>
        <button class="btn btn-primary btn-block" id="send-pts-btn">Send Points 💸</button>
      </div>
      <!-- Request Points -->
      <div class="market-section">
        <h3>🙏 Request Points</h3>
        <p style="font-size:0.82rem;color:var(--color-text-muted);margin-bottom:12px;">Ask another user to send you points.</p>
        <div class="form-group"><label>From</label><select id="req-from-user">${othersOptions}</select></div>
        <div class="form-group"><label>Amount</label><input type="number" id="req-amount" min="100" placeholder="e.g. 100"></div>
        <div class="form-group"><label>Reason (optional)</label><input type="text" id="req-message" placeholder="For helping with my move!"></div>
        <button class="btn btn-outline btn-block" id="req-pts-btn">Request Points 🙏</button>
      </div>
    </div>
    <!-- Incoming Requests -->
    <div class="market-section">
      <h3>📬 Requests For You</h3>
      ${pendingHtml}
    </div>
    <!-- Sent Requests -->
    <div class="market-section">
      <h3>📤 Your Sent Requests</h3>
      ${sentHtml}
    </div>`;

  // Send
  document.getElementById("send-pts-btn").onclick = () => {
    const toId  = document.getElementById("send-to-user").value;
    const amt   = parseInt(document.getElementById("send-amount").value);
    const msg   = document.getElementById("send-message").value.trim();
    if (!toId) { alert("Please select a user."); return; }
    if (!amt || amt < 100) { alert("Minimum transfer is 100 🐟 Fish Points."); return; }
    if (user.points < amt) { alert(`Not enough points. You have ${user.points} 🐟.`); return; }
    const toUser = this.state.users.find(u => u.id === toId);
    if (!toUser) return;
    user.points -= amt;
    toUser.points += amt;
    this.state.pointsHistory.unshift({ userId: user.id, action: `💸 Sent to ${toUser.name}`, points: -amt, date: new Date().toLocaleDateString() });
    this.state.pointsHistory.unshift({ userId: toUser.id, action: `💸 Received from ${user.name}${msg ? ` — "${msg}"` : ""}`, points: amt, date: new Date().toLocaleDateString() });
    const uIdx = this.state.users.findIndex(u => u.id === user.id);
    const tIdx = this.state.users.findIndex(u => u.id === toId);
    if (uIdx !== -1) this.state.users[uIdx] = user;
    if (tIdx !== -1) this.state.users[tIdx] = toUser;
    this.saveState();
    alert(`✅ Sent ${amt} 🐟 to ${toUser.name}!`);
    this.renderPointsMarket();
  };

  // Request
  document.getElementById("req-pts-btn").onclick = () => {
    const fromId = document.getElementById("req-from-user").value;
    const amt    = parseInt(document.getElementById("req-amount").value);
    const msg    = document.getElementById("req-message").value.trim();
    if (!fromId) { alert("Please select a user."); return; }
    if (!amt || amt < 100) { alert("Minimum request is 100 🐟 Fish Points."); return; }
    const fromUser = this.state.users.find(u => u.id === fromId);
    if (!fromUser) return;
    const req = { id: "req_" + Date.now(), fromId: user.id, fromName: user.name, toId: fromId, toName: fromUser.name, amount: amt, message: msg, status: "pending", date: new Date().toLocaleDateString() };
    this.state.pointRequests.push(req);
    this.saveState();
    alert(`📤 Request sent to ${fromUser.name} for ${amt} 🐟!`);
    this.renderPointsMarket();
  };

  // Accept / Decline
  el.querySelectorAll(".accept-req-btn").forEach(btn => {
    btn.onclick = () => {
      const req = this.state.pointRequests.find(r => r.id === btn.dataset.id);
      if (!req) return;
      const requester = this.state.users.find(u => u.id === req.fromId);
      if (!requester) return;
      if (user.points < req.amount) { alert(`You don't have enough points to send ${req.amount} 🐟.`); return; }
      user.points -= req.amount;
      requester.points += req.amount;
      req.status = "accepted";
      this.state.pointsHistory.unshift({ userId: user.id, action: `💸 Sent to ${requester.name} (request)`, points: -req.amount, date: new Date().toLocaleDateString() });
      this.state.pointsHistory.unshift({ userId: requester.id, action: `💸 Received from ${user.name} (request)`, points: req.amount, date: new Date().toLocaleDateString() });
      const uIdx = this.state.users.findIndex(u => u.id === user.id);
      const rIdx = this.state.users.findIndex(u => u.id === requester.id);
      if (uIdx !== -1) this.state.users[uIdx] = user;
      if (rIdx !== -1) this.state.users[rIdx] = requester;
      this.saveState();
      alert(`✅ Sent ${req.amount} 🐟 to ${requester.name}!`);
      this.renderPointsMarket();
    };
  });
  el.querySelectorAll(".decline-req-btn").forEach(btn => {
    btn.onclick = () => {
      const req = this.state.pointRequests.find(r => r.id === btn.dataset.id);
      if (req) { req.status = "declined"; this.saveState(); this.renderPointsMarket(); }
    };
  });
};

// ============================================================
//  RATINGS & REVIEWS
// ============================================================
TunatomoApp.prototype.getAverageRating = function(userId) {
  const reviews = (this.state.reviews || []).filter(r => r.reviewedId === userId);
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  return { avg: Math.round(avg * 10) / 10, count: reviews.length };
};

TunatomoApp.prototype.starsHTML = function(rating, interactive = false) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    html += interactive
      ? `<span class="star${filled ? " active" : ""}" data-star="${i}" style="cursor:pointer;font-size:1.6rem;">${filled ? "⭐" : "☆"}</span>`
      : `<span style="color:${filled ? "#f59e0b" : "#d1d5db"};">${filled ? "★" : "☆"}</span>`;
  }
  return html;
};

TunatomoApp.prototype.openReviewModal = function(bookingId, reviewedId, reviewedName) {
  const modal = document.getElementById("review-modal");
  if (!modal) return;
  document.getElementById("review-modal-supporter-name").textContent = `Reviewing: ${reviewedName}`;
  document.getElementById("review-booking-id").value = bookingId;
  document.getElementById("review-reviewed-id").value = reviewedId;
  document.getElementById("review-text").value = "";
  document.getElementById("review-anonymous").checked = false;
  // Reset stars
  let selectedStar = 0;
  const stars = document.querySelectorAll("#star-rating-input .star");
  const refreshStars = () => stars.forEach((s, i) => { s.textContent = i < selectedStar ? "⭐" : "☆"; });
  stars.forEach(s => {
    s.onclick = () => { selectedStar = parseInt(s.dataset.star); refreshStars(); };
    s.onmouseenter = () => stars.forEach((ss, i) => { ss.textContent = i < parseInt(s.dataset.star) ? "⭐" : "☆"; });
    s.onmouseleave = () => refreshStars();
  });
  document.getElementById("submit-review-btn").onclick = () => {
    if (!selectedStar) { alert("Please select a star rating."); return; }
    const text = document.getElementById("review-text").value.trim();
    const anon = document.getElementById("review-anonymous").checked;
    const user = this.state.currentUser;
    const review = {
      id: "rev_" + Date.now(),
      bookingId,
      reviewerId: user.id,
      reviewerName: anon ? "Anonymous 🎭" : user.name,
      reviewedId,
      reviewedName,
      stars: selectedStar,
      text,
      anonymous: anon,
      date: new Date().toLocaleDateString()
    };
    if (!this.state.reviews) this.state.reviews = [];
    this.state.reviews.unshift(review);
    // Mark booking as reviewed
    const bk = this.state.bookings.find(b => b.id === bookingId);
    if (bk) bk.reviewed = true;
    this.saveState();
    modal.style.display = "none";
    alert("⭐ Review submitted! Thank you.");
    this.renderProfile();
  };
  document.getElementById("close-review-modal").onclick = () => { modal.style.display = "none"; };
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
  modal.style.display = "flex";
};

// 起動
document.addEventListener("DOMContentLoaded", () => {
  window.app = new TunatomoApp();
});
