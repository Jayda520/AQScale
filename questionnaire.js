/* questionnaire.js
 * 仅保留：AQ + Emoji
 * 注意：不要在 GitHub Pages 上用中文全角符号（比如中文逗号），确保都是英文符号
 */

// ===============================
// AQ 量表（四选项）
// OP1/OP2 计 1；OP3/OP4 计 0（按你给的编码）
// ===============================
var AQ_AdultScale__TimeLineVariables= [
        {"ItemID":"1","Type":"social_skill","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我喜欢和别人一起做事多于单独处事"},
        {"ItemID":"2","Type":"attention_switching","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我较喜欢以相同方式重复做事"},
        {"ItemID":"3","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"如要想象事情，我觉得在脑海中构想该事情的画面是容易的"},
        {"ItemID":"4","Type":"attention_switching","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我常常太沉醉于某事情而忽略了其他东西"},
        {"ItemID":"5","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我常常留意到一些别人不为意的细微声音"},
        {"ItemID":"6","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我常常留意车牌号码或类似的数列资料"},
        {"ItemID":"7","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"即使我认为自己的说话很有礼貌，但别人常常告诉我那是很无礼的"},
        {"ItemID":"8","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"在阅读故事时，我能轻易地想象出角色的模样"},
        {"ItemID":"9","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我对日期很着迷"},
        {"ItemID":"10","Type":"attention_switching","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"在社交场合中，我能轻易听懂不同人的对话"},
        {"ItemID":"11","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得身处社交场合是轻松自在的事"},
        {"ItemID":"12","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我倾向留意一些别人不为意的细节"},
        {"ItemID":"13","Type":"social_skill","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我喜欢去图书馆多于宴会"},
        {"ItemID":"14","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得虚构故事是容易的"},
        {"ItemID":"15","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"相对于物件，我对人有更大兴趣"},
        {"ItemID":"X","Type":"Polygraph","OP1Score":"0","OP2Score":"0","OP3Score":"0","OP4Score":"1","Question":"此题请选完全不同意"},
        {"ItemID":"16","Type":"attention_switching","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我容易有强烈的喜好，如不能从事这些喜好，我会感到不开心"},
        {"ItemID":"17","Type":"communication","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我喜爱与别人闲谈"},
        {"ItemID":"18","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我说话时别人不容易插嘴"},
        {"ItemID":"19","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我对数字很着迷"},
        {"ItemID":"20","Type":"imagination","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"在阅读故事时，我觉得很难明白故事人物的意图"},
        {"ItemID":"21","Type":"imagination","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我并不特别喜欢阅读小说"},
        {"ItemID":"22","Type":"social_skill","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我觉得很难结识新朋友"},
        {"ItemID":"23","Type":"attention_to_detail","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我常常留意事物的规律模式"},
        {"ItemID":"24","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我喜欢去戏院多于博物馆"},
        {"ItemID":"25","Type":"attention_switching","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"如我的日常生活程序被扰乱，我不会感到不开心"},
        {"ItemID":"26","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我不懂得怎样持续一段对话"},
        {"ItemID":"27","Type":"communication","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得理解对方说话的背后含意是容易的"},
        {"ItemID":"28","Type":"attention_to_detail","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我通常留意事情的整体多于其细节"},
        {"ItemID":"29","Type":"attention_to_detail","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我不善于牢记电话号码"},
        {"ItemID":"30","Type":"attention_to_detail","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我很少留意身处境地或别人外表的细微转变"},
        {"ItemID":"31","Type":"communication","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"如别人对我的说话感到厌烦，我会知道"},
        {"ItemID":"32","Type":"attention_switching","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得同时处理不同的事情是容易的"},
        {"ItemID":"X","Type":"Polygraph","OP1Score":"1","OP2Score":"0","OP3Score":"0","OP4Score":"0","Question":"此题请选完全同意"},
        {"ItemID":"33","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"在电话对谈中，我不肯定应该何时发言"},
        {"ItemID":"34","Type":"attention_switching","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我喜爱自发地做事"},
        {"ItemID":"35","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我常常是最后一个才明白笑话意思的人"},
        {"ItemID":"36","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得从察看别人表情去了解他们的想法或感受是容易的"},
        {"ItemID":"37","Type":"attention_switching","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"若正进行的活动被打断，我可以很快恢复进行该事情"},
        {"ItemID":"38","Type":"communication","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我善于与别人闲谈"},
        {"ItemID":"39","Type":"communication","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"别人常常告知我，我不断重复做或说同一件事情"},
        {"ItemID":"40","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"当我较年幼时，我喜欢和小朋友玩假装游戏"},
        {"ItemID":"41","Type":"imagination","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我喜欢收集某个种类的资料(如车类、雀鸟类、火车类、植物类等)"},
        {"ItemID":"42","Type":"imagination","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我很难想象自己成为别人会是怎样的"},
        {"ItemID":"43","Type":"attention_switching","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我喜欢仔细计划自己参与的每一项活动"},
        {"ItemID":"44","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我喜欢社交场合"},
        {"ItemID":"45","Type":"social_skill","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"我觉得理解别人意图是困难的"},
        {"ItemID":"46","Type":"attention_switching","OP1Score":"1","OP2Score":"1","OP3Score":"0","OP4Score":"0","Question":"新环境令我紧张"},
        {"ItemID":"47","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我喜欢认识新朋友"},
        {"ItemID":"48","Type":"social_skill","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我是个善于交际的人"},
        {"ItemID":"49","Type":"attention_to_detail","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我不善于牢记别人的出生日期"},
        {"ItemID":"50","Type":"imagination","OP1Score":"0","OP2Score":"0","OP3Score":"1","OP4Score":"1","Question":"我觉得和小朋友玩假装游戏是容易的"}
    ];

// 兼容另一种变量名（有的页面可能引用这个）
var AQ_AdultScale_TimeLineVariables = AQ_AdultScale__TimeLineVariables;


// ===============================
var EmojiUse_TimeLineVariables = [
    {"ItemID":"1","OP1":"从不","OP2":"偶尔","OP3":"有时","OP4":"经常","OP5":"总是",
        "OP1Score":"1","OP2Score":"2","OP3Score":"3","OP4Score":"4","OP5Score":"5",
        "Question":"你平时在网络和生活中，有多大频率接触到Emoji（系统自带表情图，黄色小圆脸符号）？"},
    {"ItemID":"2","OP1":"从不","OP2":"偶尔","OP3":"有时","OP4":"经常","OP5":"总是",
        "OP1Score":"1","OP2Score":"2","OP3Score":"3","OP4Score":"4","OP5Score":"5",
        "Question":"你平时在网络和生活中，有多大频率使用Emoji（系统自带表情图，黄色小圆脸符号）？"},
];
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
