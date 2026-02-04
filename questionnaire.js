<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>问卷</title>
  <style>
    body{
      margin:0; background:#ffffff;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",Arial,sans-serif;
      color:#111;
    }
    .wrap{
      min-height: 100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding: 18px;
      box-sizing:border-box;
    }
    .card{
      width: min(900px, 92vw);
      padding: 24px 18px;
      box-sizing:border-box;
      text-align:center;
    }
    .q{
      font-size: 22px;
      line-height: 1.8;
      margin: 10px 0 18px;
    }
    .opts{
      display:grid;
      gap: 12px;
      width: min(680px, 92vw);
      margin: 0 auto;
      text-align:left;
    }
    label.opt{
      display:flex;
      align-items:center;
      gap: 12px;
      border: 1px solid #e6e6e6;
      padding: 14px 14px;
      border-radius: 14px;
      cursor:pointer;
      user-select:none;
      font-size: 16px;
    }
    label.opt:hover{ border-color:#cfcfcf; }
    .btnrow{
      margin-top: 18px;
      display:flex;
      gap: 10px;
      justify-content:center;
      flex-wrap:wrap;
    }
    button{
      padding: 10px 14px;
      border: 0;
      border-radius: 12px;
      background:#111827;
      color:#fff;
      cursor:pointer;
      font-size: 14px;
    }
    button.secondary{
      background:#f3f4f6;
      color:#111;
      border: 1px solid #e5e7eb;
    }
    button:disabled{ opacity:.45; cursor:not-allowed; }
    input[type="text"]{
      padding: 10px 12px;
      border:1px solid #ddd;
      border-radius: 12px;
      width: 240px;
      font-size: 14px;
      text-align:center;
    }
    .muted{ color:#666; font-size:14px; line-height:1.8; }
    .err{ color:#b91c1c; margin-top: 10px; font-size:14px; }
    .ok{ color:#15803d; margin-top: 10px; font-size:14px; }
    .tiny{ color:#888; font-size: 12px; margin-top: 10px; line-height:1.6; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card" id="screen"></div>
  </div>

  <!-- 你的题库脚本：必须包含 AQ_AdultScale__TimeLineVariables 和 EmojiUse_TimeLineVariables -->
  <script src="questionnaire.js"></script>

  <script>
    function $(id){ return document.getElementById(id); }
    function nowISO(){ return new Date().toISOString(); }
    function safeStr(x){ return (x===undefined || x===null) ? "" : String(x); }

    // AQ 默认选项（你的 AQ 题库没写 OP1/OP2 文本，所以这里补上）
    const AQ_DEFAULT_OPTIONS = [
      { key:"OP1", text:"完全同意" },
      { key:"OP2", text:"少许同意" },
      { key:"OP3", text:"少许不同意" },
      { key:"OP4", text:"完全不同意" }
    ];

    function extractOptions(item){
      // 若题库自带 OP1/OP2... 文本就用题库；否则用 AQ 默认四选项
      const ops = [];
      for (let k=1; k<=6; k++){
        const key = "OP"+k;
        if (item[key] !== undefined) ops.push({ key, text: item[key] });
      }
      return ops.length ? ops : AQ_DEFAULT_OPTIONS;
    }

    function scoreOf(item, opKey){
      const s = item[opKey + "Score"];
      if (s === undefined) return "";
      const n = Number(s);
      return Number.isFinite(n) ? String(n) : "";
    }

    // CSV 工具：转义字段（处理逗号/引号/换行）
    function csvEscape(value){
      const s = safeStr(value);
      if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
      return s;
    }

    // 生成文件名：pid_YYYYMMDD_HHMMSS.csv
    function makeCSVFileName(pid){
      const d = new Date();
      const pad = (n)=> String(n).padStart(2,"0");
      const stamp = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate()) + "_" +
                    pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
      return `${pid}_${stamp}.csv`;
    }

    function downloadText(text, filename, mime){
      const blob = new Blob([text], {type: mime || "text/plain;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(url), 1000);
    }

    function buildTrialsCSV(meta, trials){
      // ✅ 每个 trial 一行：多少题 = 多少行
      // 你需要哪些列可以再加。这里给常用最稳的：
      const header = [
        "pid","scale","itemID","type","question",
        "response","responseText","score","rt_ms","ts",
        "startTime","endTime","userAgent","page"
      ];

      const lines = [];
      lines.push(header.join(","));

      for(const r of trials){
        const row = [
          meta.pid,
          r.scale,
          r.itemID,
          r.type,
          r.question,
          r.response,
          r.responseText,
          r.score,
          r.rt_ms,
          r.ts,
          meta.startTime,
          meta.endTime,
          meta.ua,
          meta.page
        ].map(csvEscape).join(",");
        lines.push(row);
      }
      return lines.join("\n");
    }

    class Runner{
      constructor(screenEl){
        this.el = screenEl;
        this.blocks = [];
        this.blockIndex = 0;
        this.itemIndex = 0;
        this.itemStartMs = 0;
        this.records = [];
        this.meta = {
          startTime: nowISO(),
          endTime: "",
          pid: "",
          ua: navigator.userAgent,
          page: location.href
        };
      }

      setBlocks(blocks){ this.blocks = blocks; }

      welcome(){
        // 不显示 AQ 字样，页面就写“请输入编号”
        this.el.innerHTML = `
          <div class="q">请输入被试编号</div>
          <div class="btnrow">
            <input id="pid" type="text" placeholder="PID" />
            <button id="startBtn">开始</button>
          </div>
          <div class="err" id="err"></div>
        `;
        $("startBtn").onclick = () => {
          const pid = $("pid").value.trim();
          if(!pid){ $("err").textContent = "编号不能为空"; return; }
          this.meta.pid = pid;
          this.start();
        };
      }

      start(){
        this.blockIndex = 0;
        this.itemIndex = 0;
        this.records = [];
        this.renderItem();
      }

      renderItem(){
        const block = this.blocks[this.blockIndex];
        if(!block){ this.finish(); return; }

        const items = block.items;
        const item = items[this.itemIndex];

        if(!item){
          this.blockIndex += 1;
          this.itemIndex = 0;
          this.renderItem();
          return;
        }

        const opts = extractOptions(item);
        this.itemStartMs = performance.now();

        // ✅ 不显示“AQ”、不显示提示语；题目居中
        this.el.innerHTML = `
          <div class="q">${safeStr(item.Question)}</div>
          <div class="opts">
            ${opts.map(o=>`
              <label class="opt">
                <input type="radio" name="ans" value="${o.key}" />
                <span>${o.text}</span>
              </label>
            `).join("")}
          </div>
          <div class="err" id="err"></div>
        `;

        const radios = this.el.querySelectorAll('input[name="ans"]');
        radios.forEach(r=>r.addEventListener("change", ()=>{
          // 选了就直接下一题（更“问卷化”，也更省事）
          this.commitAndNext(r.value, opts);
        }));
      }

      commitAndNext(opKey, opts){
        const block = this.blocks[this.blockIndex];
        const item = block.items[this.itemIndex];

        const rt = Math.round(performance.now() - this.itemStartMs);
        const optionText = (opts.find(x=>x.key===opKey)||{}).text || "";

        this.records.push({
          scale: block.dataLabel,            // 数据里可以留 AQ/EmojiUse，但屏幕不显示
          itemID: safeStr(item.ItemID),
          type: safeStr(item.Type),
          question: safeStr(item.Question),
          response: opKey,
          responseText: optionText,
          score: scoreOf(item, opKey),
          rt_ms: String(rt),
          ts: nowISO()
        });

        this.itemIndex += 1;
        this.renderItem();
      }

      finish(){
        this.meta.endTime = nowISO();

        const csvName = makeCSVFileName(this.meta.pid);
        const csvText = buildTrialsCSV(this.meta, this.records);

        // 自动下载
        try{
          downloadText(csvText, csvName, "text/csv;charset=utf-8");
        }catch(e){
          console.error(e);
        }

        // ✅ 最后一页：让被试把文件发给主试（你要求的）
        this.el.innerHTML = `
          <div class="q">问卷已完成</div>
          <div class="muted">
            数据文件已自动保存为 <b>${csvName}</b>（通常在“下载/Downloads”文件夹）。<br>
            请将该文件发送给主试（如通过微信/邮件/QQ）完成提交。
          </div>

          <div class="btnrow">
            <button id="dlBtn">如果没有下载，点这里重新保存</button>
            <button class="secondary" id="copyBtn">复制文件名</button>
          </div>

          <div class="ok" id="ok"></div>
          <div class="err" id="err"></div>
          <div class="tiny">
            如果浏览器提示“阻止自动下载”，请选择“允许”。<br>
            仍找不到文件时：打开浏览器的“下载记录”查看保存位置。
          </div>
        `;

        $("dlBtn").onclick = () => {
          try{
            downloadText(csvText, csvName, "text/csv;charset=utf-8");
            $("ok").textContent = "已重新触发保存";
          }catch(e){
            console.error(e);
            $("err").textContent = "保存失败：" + (e && e.message ? e.message : String(e));
          }
        };

        $("copyBtn").onclick = async () => {
          try{
            await navigator.clipboard.writeText(csvName);
            $("ok").textContent = "已复制文件名";
          }catch(e){
            $("err").textContent = "复制失败（可能浏览器不允许剪贴板）";
          }
        };

        console.log("CSV_NAME", csvName);
        console.log("TRIALS", this.records);
      }
    }

    (function(){
      if (!Array.isArray(window.AQ_AdultScale__TimeLineVariables)) {
        $("screen").innerHTML = "<div class='err'>找不到 AQ_AdultScale__TimeLineVariables（请检查 questionnaire.js）</div>";
        return;
      }
      if (!Array.isArray(window.EmojiUse_TimeLineVariables)) {
        $("screen").innerHTML = "<div class='err'>找不到 EmojiUse_TimeLineVariables（请检查 questionnaire.js）</div>";
        return;
      }

      const runner = new Runner($("screen"));
      runner.setBlocks([
        { name: "Section1", dataLabel: "AQ",       items: window.AQ_AdultScale__TimeLineVariables },
        { name: "Section2", dataLabel: "EmojiUse", items: window.EmojiUse_TimeLineVariables }
      ]);
      runner.welcome();
    })();
  </script>
</body>
</html>