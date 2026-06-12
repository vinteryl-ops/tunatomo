/* ==========================================================================
   つなとも (Tunatomo) - アプリケーション ロジック (app.js)
   ========================================================================== */

// 1. デモ用初期データ定義
const DEFAULT_SUPPORTERS = [
  {
    id: "supporter_1",
    name: "古川 柚葉",
    role: "student_japanese",
    avatar: "images/Vinit.jpg",
    university: "立命館大学 産業社会学部",
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
    avatar: "images/Vinit2.jpg",
    university: "立命館大学 理工学部",
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
    avatar: "images/Vinit3.jpg",
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
    title: "手作りたこ焼きパーティー！",
    date: "2026年6月20日(土) 12:00 - 15:00",
    location: "京都市国際交流会館 調理室",
    desc: "みんなで一緒にたこ焼きを作って食べましょう！日本人学生や地域住民の方もたくさん参加します。初めてでも簡単です。",
    image: "images/img_slider_pc_20.jpg",
    participants: ["Marie", "古川 柚葉", "山田 太郎"]
  },
  {
    id: "event_2",
    title: "京都・嵐山 散策ツアー",
    date: "2026年6月28日(日) 10:00 - 16:00",
    location: "嵐山周辺（阪急嵐山駅集合）",
    desc: "嵐山の竹林や渡月橋を散策し、お寺を巡ります。抹茶アイスを食べながら、留学生とサポーターで楽しくおしゃべりしましょう！",
    image: "images/Vinit5.jpg",
    participants: ["古川 柚葉"]
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
  { id: "kimono", name: "ミニ着物", category: "clothing", price: 250, previewClass: "preview-item-kimono" }
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
      pointsHistory: []
    };
    
    this.init();
  }

  // 初期化・データの読み込み
  init() {
    const savedState = localStorage.getItem("tunatomo_state");
    if (savedState) {
      try {
        this.state = JSON.parse(savedState);
      } catch (e) {
        console.error("State parse error", e);
        this.loadDefaultState();
      }
    } else {
      this.loadDefaultState();
    }

    // ユーザー情報の整合性確認（デモ用にサポーターもユーザーリストに含める）
    this.ensureSupportersInUsers();
    
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
        avatar: "images/Vinit4.jpg",
        country: "フランス",
        nativeLang: "フランス語",
        university: "立命館大学 国際関係学部",
        japaneseLevel: "日常会話レベル",
        hobbies: ["映画鑑賞", "料理", "京都のカフェ巡り"],
        skills: ["フランス語指導", "お菓子作り"],
        bio: "こんにちは！フランスから来たマリーです。日本語を勉強中で、もっと日本の友達を作りたいです。お菓子作りが得意です！",
        points: 120,
        level: 1,
        fishName: "マリーフィッシュ",
        fishColor: "#ff7e5f",
        fishTailColor: "#ff7e5f",
        unlockedItems: ["nerd_glasses"],
        equippedItems: { hat: null, glasses: "nerd_glasses", clothing: null, accessory: null }
      },
      {
        id: "supporter_1_user",
        email: "yuzuha@example.com",
        password: "password",
        name: "古川 柚葉",
        role: "student_japanese",
        avatar: "images/Vinit.jpg",
        university: "立命館大学 産業社会学部",
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
        unlockedItems: ["straw_hat"],
        equippedItems: { hat: "straw_hat", glasses: null, clothing: null, accessory: null }
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
    
    // デモ用ポイント履歴
    this.state.pointsHistory = [
      { userId: "student_marie", action: "新規登録ボーナス", points: 50, date: "2026/06/01" },
      { userId: "student_marie", action: "質問投稿: スーパーについて", points: 20, date: "2026/06/08" },
      { userId: "student_marie", action: "イベント参加: たこ焼きパーティー", points: 50, date: "2026/06/10" }
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
      
      const user = this.state.users.find(u => u.email === email && u.password === pass);
      if (user) {
        this.state.currentUser = user;
        this.saveState();
        alert(`おかえりなさい、${user.name}さん！`);
        window.location.hash = "#/profile";
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
        action: "新規登録ボーナス",
        points: 50,
        date: new Date().toLocaleDateString()
      });

      this.saveState();
      alert(`アカウントを作成しました！新規登録ボーナスとして50ポイント獲得しました。`);
      window.location.hash = "#/profile";
    });

    // プロフィール編集・キャンセル
    document.getElementById("profile-edit-btn").addEventListener("click", () => {
      document.getElementById("profile-info-show").style.display = "none";
      document.getElementById("profile-edit-form").classList.add("active");
      
      // フォームに値をセット
      const u = this.state.currentUser;
      document.getElementById("edit-name").value = u.name;
      document.getElementById("edit-university").value = u.university || "";
      document.getElementById("edit-hobbies").value = u.hobbies ? u.hobbies.join(", ") : "";
      document.getElementById("edit-skills").value = u.skills ? u.skills.join(", ") : "";
      document.getElementById("edit-bio").value = u.bio || "";

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
      });
    });
  }

  // 5. グローバルヘッダーの更新
  updateHeader() {
    const statusEl = document.getElementById("header-user-status");
    const mobileNavUserEl = document.getElementById("mobile-nav-user");
    const user = this.state.currentUser;

    if (user) {
      const roleText = user.role === "student_international" ? "国際学生" : user.role === "student_japanese" ? "日本人学生" : "地域住民";
      const badgeClass = user.role === "student_international" ? "badge-student-intl" : user.role === "student_japanese" ? "badge-student-jp" : "badge-resident";

      const html = `
        <div class="header-user-badge">
          <a href="#/profile">
            <img src="${user.avatar || 'images/Vinit.jpg'}" alt="${user.name}" class="header-user-avatar">
          </a>
          <div class="header-user-meta">
            <span class="header-username">${user.name}</span>
            <div class="header-points-level">
              <span class="badge ${badgeClass}" style="transform: scale(0.85); margin-left:-5px;">${roleText}</span>
              <span class="header-level-val">Lv.${user.level || 1}</span>
              <a href="#/game" class="header-points-val">${user.points || 0} pt</a>
            </div>
          </div>
        </div>
        <a href="#/home" class="logout-btn-header" id="logout-btn">ログアウト</a>
      `;
      statusEl.innerHTML = html;

      // モバイル用メニュー項目
      mobileNavUserEl.innerHTML = `
        <a href="#/profile" class="mobile-nav-link" data-page="profile">プロフィール・予約管理</a>
        <a href="#/game" class="mobile-nav-link" data-page="game">お魚育成ゲーム (${user.points} pt)</a>
        <a href="#/home" class="mobile-nav-link" id="mobile-logout-btn">ログアウト</a>
      `;

      // ログアウト処理アタッチ
      const logoutAction = (e) => {
        e.preventDefault();
        this.state.currentUser = null;
        this.saveState();
        alert("ログアウトしました。");
        window.location.hash = "#/home";
        this.updateHeader();
      };
      
      document.getElementById("logout-btn").addEventListener("click", logoutAction);
      document.getElementById("mobile-logout-btn").addEventListener("click", logoutAction);

    } else {
      statusEl.innerHTML = `
        <a href="#/login" class="btn btn-primary btn-sm login-btn">ログイン / 登録</a>
      `;
      mobileNavUserEl.innerHTML = `
        <a href="#/login" class="btn btn-primary btn-block">ログイン / アカウント作成</a>
      `;
    }
  }

  // 6. ホーム画面の描画
  renderHome() {
    // お知らせ一覧
    const announceEl = document.getElementById("home-announcements");
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
          <svg viewBox="0 0 100 100" width="100" height="100">
            <path d="M 20,50 C 35,30 65,30 80,50 C 65,70 35,70 20,50 Z" fill="${user.fishColor || '#0D6EFD'}"/>
            <path d="M 20,50 L 5,38 L 10,50 L 5,62 Z" fill="${user.fishTailColor || '#0D6EFD'}"/>
            <circle cx="68" cy="45" r="4" fill="#fff"/><circle cx="70" cy="45" r="2" fill="#000"/>
          </svg>
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
    document.getElementById("profile-display-avatar").src = user.avatar || "images/Vinit.jpg";
    document.getElementById("profile-display-name").innerText = user.name;
    document.getElementById("profile-display-email").innerText = user.email;
    document.getElementById("profile-display-points").innerText = user.points;
    
    const badgeEl = document.getElementById("profile-display-badge");
    badgeEl.innerText = user.role === "student_international" ? "国際学生" : user.role === "student_japanese" ? "日本人学生" : "地域住民";
    badgeEl.className = "badge " + (user.role === "student_international" ? "badge-student-intl" : user.role === "student_japanese" ? "badge-student-jp" : "badge-resident");

    // 詳細表示用HTMLの組み立て
    const infoShowEl = document.getElementById("profile-info-show");
    let infoHtml = `
      <div class="profile-info-row"><span class="label">ニックネーム</span><span class="val">${user.name}</span></div>
      <div class="profile-info-row"><span class="label">大学・所属</span><span class="val">${user.university || "未記入"}</span></div>
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
      listEl.innerHTML = `<p class="text-muted" style="grid-column: 1 / -1; text-align:center; padding: 40px;">条件に合うサポーターが見つかりませんでした。</p>`;
      return;
    }

    let html = "";
    filtered.forEach(sup => {
      const roleText = sup.role === "student_japanese" ? "日本人学生" : "地域住民";
      const badgeClass = sup.role === "student_japanese" ? "badge-student-jp" : "badge-resident";

      html += `
        <div class="card supporter-card">
          <div class="supporter-card-top">
            <img src="${sup.avatar || 'images/Vinit.jpg'}" alt="${sup.name}" class="supporter-avatar">
            <div class="supporter-meta">
              <span class="badge ${badgeClass}" style="width: fit-content; margin-bottom:4px;">${roleText}</span>
              <h3>${sup.name}</h3>
              <span class="uni">${sup.university || "地域サポーター"}</span>
            </div>
          </div>
          <p class="supporter-bio">${sup.bio || "よろしくお願いいたします。"}</p>
          <div class="supporter-tags">
            <div class="supporter-tag-row">
              <span class="tag-lbl">対応言語:</span>
              <div class="tag-vals">${sup.speakLangs ? sup.speakLangs.map(l => `<span class="tag-badge">${l}</span>`).join("") : "日本語"}</div>
            </div>
            <div class="supporter-tag-row">
              <span class="tag-lbl">趣味:</span>
              <div class="tag-vals">${sup.hobbies ? sup.hobbies.map(h => `<span class="tag-badge">${h}</span>`).join("") : "未設定"}</div>
            </div>
          </div>
          <button class="btn btn-outline btn-block select-supporter-btn" data-id="${sup.id}" data-name="${sup.name}">この人に同行サポートを頼む</button>
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
    const user = this.state.currentUser;

    let html = "";
    this.state.events.forEach(ev => {
      const isParticipating = user && ev.participants.includes(user.name);
      const btnText = isParticipating ? "参加登録済み" : "イベントに参加する";
      const btnClass = isParticipating ? "btn-outline" : "btn-primary";
      
      // 参加人数
      const count = ev.participants.length;

      html += `
        <div class="card event-card" style="padding:0; overflow:hidden;">
          <div class="event-img-wrapper">
            <img src="${ev.image}" alt="${ev.title}" class="event-img">
            <span class="event-date-badge">${ev.date.split(" ")[0]}</span>
          </div>
          <div class="event-body">
            <h3 class="event-title">${ev.title}</h3>
            <p class="event-desc">${ev.desc}</p>
            <div class="event-info-row">
              <span class="event-info-icon">📅</span>
              <span><strong>日時:</strong> ${ev.date}</span>
            </div>
            <div class="event-info-row">
              <span class="event-info-icon">📍</span>
              <span><strong>場所:</strong> ${ev.location}</span>
            </div>
            <div class="event-info-row" style="margin-bottom:12px;">
              <span class="event-info-icon">👥</span>
              <span><strong>参加メンバー:</strong> ${count}名 (${ev.participants.join(", ")})</span>
            </div>
            <button class="btn ${btnClass} btn-block join-event-btn" data-id="${ev.id}" ${isParticipating ? 'disabled' : ''}>${btnText}</button>
          </div>
        </div>
      `;
    });
    listEl.innerHTML = html;

    // イベント参加登録イベントアタッチ
    document.querySelectorAll(".join-event-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!user) {
          alert("イベントへの参加申請にはログインが必要です。");
          window.location.hash = "#/login";
          return;
        }

        const id = btn.getAttribute("data-id");
        this.joinEvent(id);
      });
    });
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
    
    // XP計算とレベルバー
    const currentPoints = user.points || 0;
    const currentLevel = user.level || 1;
    const pointsForCurrentLevel = (currentLevel - 1) * 100;
    const pointsForNextLevel = currentLevel * 100;
    const xpInCurrentLevel = currentPoints - pointsForCurrentLevel;
    const xpNeededForLevelUp = 100; // 100ptごとに1レベルアップ
    
    const percent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevelUp) * 100));
    document.getElementById("game-xp-fill").style.width = `${percent}%`;
    document.getElementById("game-xp-current").innerText = xpInCurrentLevel;
    document.getElementById("game-xp-next").innerText = xpNeededForLevelUp;
    document.getElementById("game-xp-needed").innerText = Math.max(0, xpNeededForLevelUp - xpInCurrentLevel);

    // 水槽アクターの見た目の更新
    const actorEl = document.getElementById("fish-actor");
    // 全ての装備クラスをクリア
    actorEl.className = "aquarium-fish-actor";
    
    // 各パーツが装備されている場合はCSSクラスを追加
    if (user.equippedItems.hat) actorEl.classList.add(`equipped-${user.equippedItems.hat}`);
    if (user.equippedItems.glasses) actorEl.classList.add(`equipped-${user.equippedItems.glasses}`);
    if (user.equippedItems.clothing) actorEl.classList.add(`equipped-${user.equippedItems.clothing}`);

    // お魚の色をカスタマイズ（レベルに応じて変化など）
    const fishBodyColorMap = { 1: "#0D6EFD", 2: "#ea580c", 3: "#8b5cf6" };
    const levelColor = fishBodyColorMap[user.level] || "#0D6EFD";
    document.getElementById("fish-body-color").setAttribute("fill", levelColor);
    document.getElementById("fish-tail-color").setAttribute("fill", levelColor);

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

  renderShop() {
    const user = this.state.currentUser;
    const shopEl = document.getElementById("shop-grid");
    document.getElementById("shop-points-val").innerText = user.points;

    // 未解放のアイテムのみ抽出
    const availableItems = SHOP_ITEMS.filter(item => !user.unlockedItems.includes(item.id));

    if (availableItems.length === 0) {
      shopEl.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; text-align:center; padding: 20px;">すべてのコスチュームを解放済みです！</p>`;
      return;
    }

    let html = "";
    availableItems.forEach(item => {
      const canBuy = user.points >= item.price;
      const btnDisabled = !canBuy ? "disabled" : "";
      
      html += `
        <div class="item-card">
          <div class="item-card-preview">
            <div class="${item.previewClass}"></div>
          </div>
          <h4>${item.name}</h4>
          <span class="price">${item.price} pt</span>
          <button class="btn btn-primary btn-sm buy-btn" data-id="${item.id}" data-price="${item.price}" ${btnDisabled}>解放する</button>
        </div>
      `;
    });
    shopEl.innerHTML = html;

    // 解放（購入）ボタンイベント
    document.querySelectorAll(".buy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const price = parseInt(btn.getAttribute("data-price"));
        this.unlockItem(id, price);
      });
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

  // レベルアップと経験値計算ロジック
  awardXP(user, amount) {
    // レベル判定: 100ポイント増えるごとにレベルアップ
    const oldLevel = user.level || 1;
    // 総獲得ポイントなどではなく、現在のポイントで簡易計算
    const newLevel = Math.floor(user.points / 100) + 1;
    
    if (newLevel > oldLevel) {
      user.level = newLevel;
      alert(`🎉 レベルアップしました！Lv.${oldLevel} → Lv.${newLevel}! お魚のボディカラーが新しくなりました！`);
    }
  }
}

// 起動
document.addEventListener("DOMContentLoaded", () => {
  window.app = new TunatomoApp();
});
