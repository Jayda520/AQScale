/* questionnaire.js
 * 仅保留：AQ + Emoji
 * 注意：不要在 GitHub Pages 上用中文全角符号（比如中文逗号），确保都是英文符号
 */

// ===============================
// AQ 量表（四选项）
// OP1/OP2 计 1；OP3/OP4 计 0（按你给的编码）
// ===============================
var AQ_AdultScale__TimeLineVariables= [
  /* 你原来的 1-50 题内容保持不变 —— 这里请直接放你现有的完整数组 */
];

// 兼容另一种变量名（有的页面可能引用这个）
var AQ_AdultScale_TimeLineVariables = AQ_AdultScale__TimeLineVariables;

// ===============================
// Emoji 使用频率（五选项）
// ===============================
var EmojiUse_TimeLineVariables = [
  {"ItemID":"1",
    "OP1":"从不","OP2":"偶尔","OP3":"有时","OP4":"经常","OP5":"总是",
    "OP1Score":"1","OP2Score":"2","OP3Score":"3","OP4Score":"4","OP5Score":"5",
    "Question":"你平时在网络和生活中，有多大频率接触到Emoji（系统自带表情图，黄色小圆脸符号）？"
  },
  {"ItemID":"2",
    "OP1":"从不","OP2":"偶尔","OP3":"有时","OP4":"经常","OP5":"总是",
    "OP1Score":"1","OP2Score":"2","OP3Score":"3","OP4Score":"4","OP5Score":"5",
    "Question":"你平时在网络和生活中，有多大频率使用Emoji（系统自带表情图，黄色小圆脸符号）？"
  }
];

// 兼容另一种变量名
var EmojiUse_TimeLineVariable = EmojiUse_TimeLineVariables;
