export interface ContentData {
  id: string;
  author: string;
  textEn: string;
  textZh: string;
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
}

export const defaultData: ThreadData = {
  mainQuestionZh: "你因为什么小事影响了整个人生？",
  subreddit: "r/AskReddit",
  time: "20小时前",
  author: "u/nathannnate01",
  titleEn: "What's a decision you made in under 10 seconds that changed your life forever?",
  quoteEn: "\"Oftentimes, change comes not from what we start doing, but from what we choose to stop.\"",
  upvotes: "6.4K",
  comments: "2.1K",
  contents: [
    {
      id: "1",
      author: "jesusinatre2x4",
      textEn: "Decided to go to subway instead of dairy queen. Ended up **hitting it off** with the woman making my sandwich. Next week is our 11 year **anniversary**.",
      textZh: "我决定去赛百味，结果和给我做三明治的女士聊得特别投机。下周就是我们结婚 11 周年纪念日。"
    },
    {
      id: "2",
      author: "throwaway_midwest",
      textEn: "I was 19 and broke, standing in line at a job fair for a factory position. Some random dude in line **told me to apply** for the company two booths down instead — said the factory would ruin my back. I thought he was nuts. Turns out that company was a small software firm. They **hired me on the spot**, paid for my night school, and I ended up as a senior engineer 12 years later. Never caught that guy's name.",
      textZh: "我19岁，身无分文，在工厂招聘摊位前排队。旁边一个陌生人劝我去旁边的公司投简历，说工厂会毁了我的腰。我以为他在说废话。结果那家公司是个小软件公司，当场录用了我，还资助我上夜校。12年后，我成了高级工程师。我至今不知道那个人叫什么名字。"
    },
    {
      id: "3",
      author: "perpetual_overthinker",
      textEn: "Junior year of college. I had already **accepted an offer** at a consulting firm — decent pay, safe path, parents were thrilled. Then, on a complete whim, I went to a startup panel nobody else from my major attended. Some founder was talking about building tools for **underserved communities**. I walked up afterward, told her I wanted in, handed her a one-page project I had done for class. She read it on the spot and said 'come in Monday.' I turned down the consulting offer that night. My parents didn't speak to me for two weeks. That startup failed after 18 months. But the second one I joined because of **the network I built there** just IPO'd last year.",
      textZh: "大三那年，我已经接受了一家咨询公司的 offer，薪水不错，路子稳妥，父母非常开心。然后某天我心血来潮，去参加了一个没有人报名的创业论坛。有个创始人在讲为弱势群体做产品的故事，我会后走过去说我想加入，递上了一份课堂作业。她当场读完，说'周一来上班'。那天晚上我拒绝了咨询 offer，父母两周没跟我说话。那家创业公司 18 个月后倒了。但我在那里积累的人脉，让我加入了另一家公司——去年刚上市。"
    },
    {
      id: "4",
      author: "deleted_account_8812",
      textEn: "I was driving home from a night shift, completely exhausted, and I almost ran a red light. I stopped just in time. While I was sitting there waiting, I glanced over and saw a **'Help Wanted'** sign in the window of a small diner. On impulse I pulled over, walked in still wearing my work uniform, and asked about the job. The owner — this tiny older woman — looked me up and down and said 'You look honest. Start Saturday.' I worked there weekends for two years. I met my wife there on my third shift. She was a regular who always ordered the same thing — **black coffee, no sugar, and the blueberry pie**. I asked her once why she always got the same order and she said, 'Because some things are perfect the way they are.' I proposed to her at that same counter six months later. We have three kids now. All because I almost ran a red light.",
      textZh: "我下夜班开车回家，累到极点，差点闯了红灯，最后刚好刹住。等红灯的时候，我无意间瞄到路边一家小餐馆橱窗上贴着'招人'的纸。我鬼使神差地把车停了，穿着工作服走进去问工作的事。老板娘是个小个子老太太，上下打量了我一眼说：'你看起来老实。周六来上班。'我在那里兼职了两年。第三个班，我认识了我现在的妻子。她是常客，每次都点一样的东西——黑咖啡不加糖，再来一块蓝莓派。我问过她为什么总点一样的，她说：'因为有些东西本来就是完美的。'六个月后，我在那个吧台向她求婚。我们现在有三个孩子。这一切，就因为我差点闯了个红灯。"
    }
  ]
};
