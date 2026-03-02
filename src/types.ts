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
      textEn: "Decided to go to subway instead of dairy queen. They were across the street from each other and I was passing through town during lunch time. Ended up **hitting it off** with the woman making my sandwich. Next week is our 11 year **anniversary**.",
      textZh: "我当时决定去赛百味而不是 Dairy Queen。两家店就在街对面，那天正好是午饭时间，我只是路过这个小镇。结果我和给我做三明治的那位女士聊得特别投机。下周就是我们结婚 11 周年纪念日。"
    }
  ]
};
