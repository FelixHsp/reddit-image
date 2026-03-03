# Reddit Image Generator

将 Reddit 帖子数据生成封面图与内容滑动图，并支持批量导出为 ZIP 包。

## 快速开始

```bash
npm install
npm run dev
```

## 使用方式

在左侧 JSON 输入框中粘贴符合格式的数据，点击 **Load Data**，右侧预览区将实时渲染封面图和每条评论的内容滑动图。点击 **Export ZIP** 可将所有图片打包下载。

---

## 数据格式

输入数据为一个 `ThreadData` JSON 对象。

### `ThreadData`

```json
{
  "mainQuestionZh": "你因为什么小事改变了整个人生？",
  "subreddit": "r/AskReddit",
  "time": "20小时前",
  "author": "u/nathannnate01",
  "titleEn": "What's a decision you made in under 10 seconds that changed your life forever?",
  "quoteEn": "\"Oftentimes, change comes not from what we start doing, but from what we choose to stop.\"",
  "upvotes": "6.4K",
  "comments": "2.1K",
  "contents": [
    {
      "id": "1",
      "author": "jesusinatre2x4",
      "textEn": "Ended up **hitting it off** with the woman making my sandwich.",
      "textZh": "结果我和给我做三明治的那位女士聊得特别投机。"
    }
  ]
}
```

### `ThreadData` 字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `mainQuestionZh` | `string` | ✅ | 封面图大标题（中文） |
| `subreddit` | `string` | ✅ | 子版块名，含前缀，如 `r/AskReddit` |
| `time` | `string` | ✅ | 发帖时间，如 `20小时前`、`3天前` |
| `author` | `string` | ✅ | 楼主用户名，含前缀，如 `u/username` |
| `titleEn` | `string` | ✅ | 帖子英文原标题，显示在封面卡片中 |
| `quoteEn` | `string` | ❌ | 可选引用语，显示在封面卡片底部 |
| `upvotes` | `string` | ✅ | 点赞数，如 `6.4K`、`12.3K` |
| `comments` | `string` | ✅ | 评论数，如 `2.1K`、`834` |
| `contents` | `ContentData[]` | ✅ | 评论条目数组，每条生成一张内容滑动图 |

---

### `ContentData` 字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `id` | `string` | ✅ | 唯一标识符，用于列表渲染 key |
| `author` | `string` | ✅ | 评论者用户名（不含 `u/` 前缀） |
| `textEn` | `string` | ✅ | 英文原文，支持 `**文字**` 语法高亮显示 |
| `textZh` | `string` | ✅ | 对应中文翻译 |

#### `textEn` 高亮语法

在英文正文中用 `**...**` 包裹的文字会以高亮色块形式渲染，用于标注关键词或短语：

```
"Ended up **hitting it off** with the woman making my sandwich."
```

---

### `VocabItem` 字段说明（可选）

在 `ThreadData` 中添加 `vocab` 数组后，会在所有内容图末尾**额外生成一张词汇学习图**。

| 字段 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `word` | `string` | ✅ | 英文单词或短语 |
| `phonetic` | `string` | ❌ | 音标，如 `/ɡʌt ˈfiːlɪŋ/` |
| `trans` | `string` | ✅ | 中文释义 |
| `note` | `string` | ❌ | 用法备注或例句说明 |

**示例：**

```json
"vocab": [
  {
    "word": "gut feeling",
    "phonetic": "/ɡʌt ˈfiːlɪŋ/",
    "trans": "直觉；本能感应",
    "note": "指无法用逻辑解释的强烈预感"
  },
  {
    "word": "brush off",
    "phonetic": "/brʌʃ ɒf/",
    "trans": "忽视；置之不理"
  }
]
```

> 不填 `vocab` 字段（或设为空数组）时，不会生成词汇图。

---

## 项目结构

```
src/
├── types.ts              # 类型定义 (ThreadData, ContentData) 及默认示例数据
├── App.tsx               # 根组件，管理状态与导出逻辑
└── components/
    ├── Cover.tsx         # 封面图组件 (800×1066px)
    ├── ContentSlide.tsx  # 内容滑动图组件 (800×1066px)
    └── JSONInput.tsx     # JSON 数据输入面板
```

## 技术栈

| 包 | 用途 |
|---|---|
| React 19 + TypeScript | UI 框架 |
| Vite + Tailwind CSS v4 | 构建工具与样式 |
| `html-to-image` | DOM 节点转 PNG |
| `jszip` + `file-saver` | 批量打包下载 ZIP |
| `lucide-react` | 图标库 |
