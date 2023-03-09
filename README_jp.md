# Scrapbox2Markdown - Confluence

[English README.md](/README_jp.md)

daiiz氏のオリジナルのブックマークレットをConfluenceに貼り付ける際に自分が必要とする形式に変換できるようにカスタマイズしました。

心より感謝申し上げます。

<br>

## オリジナルからの変更点
- オリジナルがエラーで使えなかったので、linesのループ処理の最初に`if (!lines[i].querySelector(".text")) continue;`を追加
- indent数を4->2に変更
- 文字の大きさを、5（`*****`)からの差分ではなく、ページ内の最大をh1として書き出すように変更
- 2行以上連続する空白行を水平線（`---`）に置き換え
- `<br>`の追加を削除

<br>

## カスタムバージョン（main-custom.js）

さらに自分用に以下のカスタマイズを施したものです。
- Scrapboxをリンク先とするリンクを削除
- ScrapboxかGyazoをリンク先とする画像を`[画像]`というテキストに置き換え

<br>

## 使用方法

1. main.min.jsをコピーして、下記の形式でブックマークに登録

```
javascript:コピーしたコード
```

2. MarkdownにしたいScrapboxページでブックマークレットをクリック（実行）

3. 新しいでMarkdownに変換されたテキストが開きますので、全選択してコピー。

4. Confluenceに貼り付ける。

    ここで注意があって、Confluenceの新エディターはMarkdownの挿入機能がなくなりました。

    しかし、`右クリック→Paste and match style`で貼り付けるとちゃんとMDの内容が反映されます。

    Macで`cmd + shift + v`や`cmd + shift + opt + v`といったショートカットも試しましたがダメでした（なんで？）

<br>

## クレジット

- https://github.com/daiiz/sb2md
- https://scrapbox.io/daiiz/Scrapbox%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%82%92Markdown%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8BBookmarklet