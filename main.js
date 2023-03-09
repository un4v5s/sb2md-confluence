(function () {
  /** 対応記法
   * - ノーマルテキスト
   * - 多段箇条書き
   * - 見出し
   * - 画像
   * - リンク
   * - 単一行コード
   **/

  var writer = (title = "Title", texts = []) => {
    var res = `# ${title}\n`;
    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];
      res += "\n" + text;
    }

    var win = window.open();
    win.document.open();
    win.document.write(`<title>${title}</title>`);
    win.document.write("<pre>");
    win.document.write(escapeHtml(res));
    win.document.write("</pre>");
    win.document.close();
  };

  var escapeHtml = (str) => {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
    return str;
  };

  var markdownIndent = (level = 0) => {
    return "  ".repeat(level);
  };

  var headlineMark = (level = 1, MAX_LEVEL = 5) => {
    var numMarks = MAX_LEVEL + 1 - level;
    return "#".repeat(numMarks);
  };

  var headline = (text = "", maxHeadingLevel = 5) => {
    var div = document.createElement("div");
    div.innerHTML = text;
    var strongTags = div.querySelectorAll("strong");
    for (var i = 0; i < strongTags.length; i++) {
      var strong = strongTags[i];
      var level = +strong.className.split("level-")[1];
      var title = strong.innerHTML;
      strong.innerHTML = `${headlineMark(level, maxHeadingLevel)} ${title}`;
    }
    return div.innerHTML;
  };

  var getHeadingLevel = (text = "") => {
    const mch = text.match(/class=\".*level-([0-9]{1,})\"/);
    if(mch){
      return +mch[1];
    }
    return null;
  };

  var links = (text = "") => {
    var div = document.createElement("div");
    div.innerHTML = text;

    var aTags = div.querySelectorAll("a");
    for (var i = 0; i < aTags.length; i++) {
      var a = aTags[i];
      var aHtml = a.innerText.trim();
      var aHref = a.href;
      var linkMarkdown = `[${aHtml}](${aHref})`;

      // 画像対応
      var img = a.querySelector("img");
      if (img !== null) {
        linkMarkdown = `[![Image](${img.src})](${aHref})`;
      }
      a.innerText = linkMarkdown;
    }
    return div.innerText;
  };

  var lineToText = (line) => {
    var html = line.innerHTML.replace(/<span>/g, "");
    html = html.replace(/<span.+?>/g, "").replace(/<\/span>/g, "");
    html = html.replace(/<br.+?>/g, "");
    var text = html.replace(/\n/gi, "").replace(/\t/gi, "").trim();
    return text;
  };

  // start line processing
  var firstLine = document.querySelector(".lines");
  var pageTitle = firstLine.querySelector(".line-title .text").innerText;
  var indentUnitWidthEm = 1.5;
  
  var lines = firstLine.querySelectorAll(".line");
  var texts = [...lines].map(e => lineToText(e));
  var maxHeadingLevel = Math.max(...texts.map(e => getHeadingLevel(e)));
  console.log("maxHeadingLevel: ", maxHeadingLevel);

  pageTexts = [];
  for (var i = 1; i < lines.length; i++) {
    if (!lines[i].querySelector(".text")) continue;

    var line = lines[i].querySelector(".text").cloneNode(true);

    // 空白文字を持つ要素を除去
    var emptyChars = line.querySelectorAll("span.empty-char-index");
    for (var j = 0; j < emptyChars.length; j++) {
      var e = emptyChars[j];
      e.innerText = "";
    }

    // バッククオートを有効化
    var backQuos = line.querySelectorAll("span.backquote");
    for (var j = 0; j < backQuos.length; j++) {
      var e = backQuos[j];
      e.innerText = "`";
    }

    // textを整形
    var text = lineToText(line);
    text = headline(text, maxHeadingLevel);
    text = links(text);

    // 箇条書き対応
    var liDot = line.querySelector(".indent-mark");
    if (liDot !== null) {
      // 箇条書きの入れ子構造を取得
      var width = +liDot.style.width.split("em")[0];
      var indentLevel = width / indentUnitWidthEm - 1;
      text = markdownIndent(indentLevel) + "- " + text;
    }

    // 2行連続で空白行の場合は水平線を挿入
    if (i + 1 < lines.length && lines[i + 1].querySelector(".text")) {
      var nextLine = lines[i + 1].querySelector(".text").cloneNode(true);
      var nextText = lineToText(nextLine);
      // console.log("nextText: ", nextText);
      if (liDot === null && text.length == 0 && nextText.length == 0) {
        text += "\n\n---";
      }
    }

    // 2行連続で水平線の場合はpushしない
    if (
      text != "\n\n---" ||
      (text == "\n\n---" && pageTexts[pageTexts.length - 1] != "\n\n---")
    ) {
      pageTexts.push(text);
    }
  }
  writer(pageTitle, pageTexts);
})();
