const SUBREDDIT_ICONS: Record<string, string> = {
  'r/nostupidquestions': '/no-stupid-questions.png',
};

export function getSubredditIcon(subreddit: string): string {
  return SUBREDDIT_ICONS[subreddit.trim().toLowerCase()] ?? '/ask.webp';
}
