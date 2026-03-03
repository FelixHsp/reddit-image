export interface VocabItem {
  word: string;       // 英文单词或短语
  wordZh: string;     // 本评论翻译中对应的中文词语
  phonetic?: string;  // 音标（可选）
  trans: string;      // 完整中文释义
}

export interface ContentData {
  id: string;
  author: string;
  textEn: string;
  textZh: string;
  vocab?: VocabItem[]; // 本条评论中需要学习的词汇
}

export interface ThreadData {
  mainQuestionZh: string;
  subreddit: string;
  time: string;
  author: string;
  titleEn: string;
  quoteEn?: string;
  upvotes: string;
  comments: string;
  contents: ContentData[];
  postUrl?: string;       // 原帖链接（仅作元数据，不渲染）
  timeCalcBase?: string;  // 时间计算基准（仅作元数据，不渲染）
}

export const defaultData: ThreadData = {
  mainQuestionZh: "你有没有过一种毫无逻辑的直觉，后来被证明 100% 正确？",
  subreddit: "r/AskReddit",
  time: "约24小时前",
  author: "u/PsychologicalTea3149",
  titleEn: "What is a \"gut feeling\" you had that turned out to be 100% accurate, even though it made no logical sense at the time?",
  quoteEn: "\"Sometimes your body notices risk before your brain can explain it.\"",
  upvotes: "6639",
  comments: "1558",
  postUrl: "https://www.reddit.com/r/AskReddit/comments/1riop3a/",
  timeCalcBase: "2026-03-03 18:45 (Asia/Shanghai)",
  contents: [
    {
      id: "1",
      author: "nosmigon",
      textEn: "What travelling in Thailand i had been travelling together with another backpacker for a couple of weeks, taking busses around. We were going to get the bus from Chiang mai to Bangkok and for some reason. I got a very bad feeling about it. I told him I think we should fly and he insisted he wanted to get the bus. I still decided to fly due to a gut feeling. The bus crashed and flipped over. The person sitting in the seat opposite died and my friend had to be cut out of the bus with angle grinders whilst he had a broken foot.",
      textZh: "我在泰国旅行时，和一位背包客一起坐了几周大巴。那次我们打算从清迈去曼谷，不知道为什么我突然有很强的不安感。我建议改坐飞机，他坚持坐大巴。我最后还是跟着直觉改了航班。后来那辆车翻了，坐在他对面的乘客去世了，我朋友也受了伤。",
      vocab: [
        { word: "gut feeling", wordZh: "不安感", phonetic: "/ɡʌt ˈfiːlɪŋ/", trans: "直觉；本能感应" }
      ]
    },
    {
      id: "2",
      author: "BunnyWhiskerGlow",
      textEn: "I once refused to get into an elevator with a guy who looked normal but made my skin crawl for no reason. I felt like an idiot and walked up the stairs instead. Found out the next morning he'd been arrested for assaulting someone in that same building an hour later.",
      textZh: "有一次我拒绝和一个看起来很正常的男人同乘电梯，只因为直觉非常不舒服。当时我还觉得自己是不是反应过度，于是改走楼梯。结果第二天得知，他在一个小时后就在同一栋楼里因袭击他人被抓。",
      vocab: [
        { word: "skin crawl", wordZh: "不舒服", phonetic: "/skɪn krɔːl/", trans: "令人起鸡皮疙瘩；浑身不自在" },
        { word: "assaulting", wordZh: "袭击他人", phonetic: "/əˈsɔːltɪŋ/", trans: "袭击；攻击" }
      ]
    },
    {
      id: "3",
      author: "NutellaBananaBread",
      textEn: "This reminds me of that book \"The Gift of Fear\". Basically, if you get that feeling, believe it.",
      textZh: "这让我想到《The Gift of Fear》这本书。核心意思是：如果你出现那种强烈警觉感，先相信它。"
    },
    {
      id: "4",
      author: "WampaCat",
      textEn: "This kind of thing makes me wonder if the other people were brushing off their own similar instincts because they seemed irrational, or if some people just don't have any intuition for that stuff at all",
      textZh: "这种经历让我在想，是不是很多人其实也有类似直觉，只是因为看起来不理性就把它压下去了；或者有些人确实对这类信号不敏感。",
      vocab: [
        { word: "brushing off", wordZh: "压下去", phonetic: "/ˈbrʌʃɪŋ ɒf/", trans: "忽视；置之不理" },
        { word: "instincts", wordZh: "直觉", phonetic: "/ˈɪnstɪŋkts/", trans: "本能；直觉反应" },
        { word: "irrational", wordZh: "不理性", phonetic: "/ɪˈræʃənl/", trans: "不理性的；无逻辑依据的" },
        { word: "intuition", wordZh: "信号", phonetic: "/ˌɪntjuˈɪʃn/", trans: "直觉力；第六感" }
      ]
    },
    {
      id: "5",
      author: "Tango_Owl",
      textEn: "Tell her. Or at least ask her questions about him? One day she will need a way out and she will need to know who will believe her.",
      textZh: "告诉她，或者至少多问问她关于那个人的情况。也许有一天她需要一个出口，也需要知道谁会相信她。",
      vocab: [
        { word: "a way out", wordZh: "出口", phonetic: "/ə weɪ aʊt/", trans: "出路；脱身的办法" }
      ]
    },
    {
      id: "6",
      author: "Nice-Blueberry18",
      textEn: "Yes. The book helps the victim understand the mechanics of the abuse by angry partner. Hope it helps more people in need.",
      textZh: "是适用的。这本书的作用是帮助当事人理解关系中伤害行为的运作机制。希望能帮到更多需要的人。",
      vocab: [
        { word: "mechanics", wordZh: "运作机制", phonetic: "/məˈkænɪks/", trans: "（事物运作的）机制；原理" }
      ]
    },
    {
      id: "7",
      author: "PM_ME_WHATEVES",
      textEn: "For a long time they will be the first thing you think of when you wake up. But eventually they will be the second thing, then the third. Then you'll get to the point where you go most of the day without thinking about them. Then you go a whole day.",
      textZh: "很长一段时间里，你一醒来第一个想到的都会是那件事。后来会变成第二个、第三个。再后来，你会有大半天不再想起它，直到有一天整天都没想起。",
      vocab: [
        { word: "eventually", wordZh: "后来", phonetic: "/ɪˈventʃuəli/", trans: "最终；终究" }
      ]
    },
    {
      id: "8",
      author: "community_summary",
      textEn: "Gut feelings are often subtle pattern recognition from past experience, not magic.",
      textZh: '很多所谓"直觉"，本质是过往经验累积出的细微信号识别，不是玄学。',
      vocab: [
        { word: "subtle", wordZh: "细微", phonetic: "/ˈsʌtl/", trans: "细微的；不易察觉的" },
        { word: "pattern recognition", wordZh: "信号识别", phonetic: "/ˈpætən ˌrekəɡˈnɪʃn/", trans: "模式识别；规律识别" }
      ]
    }
  ]
};
