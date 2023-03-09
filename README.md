# Scrapbox2Markdown - Confluence

This is a bookmarklet code.

I customized daiiz's wonderful original bookmarklet into my preferred format for use with Confluence.

<br>

## Changes from the original
- Added `if (!lines[i].querySelector(".text")) continue;` at the beginning of the lines loop process since the original was unusable due to an error
- Change the number of indent from 4->2
- changed the font size to write out the maximum on the page as h1 instead of the difference from 5 (`*****`)
- Replace blank lines that are more than 2 lines in a row with a horizontal line (`---`)
- Removed addition of `<br>`.

<br>

## Custom version

I added the following customization for my own use.
- Removed links to Scrapbox
- Replaced images that link to Scrapbox or Gyazo with the text `[image]`.

<br>

## Usage
1. copy `main.min.js` and bookmark it in the following format with javascript: added at the beginning

```
javascript:<copied code>
```

2. Click the bookmarklet on the Scrapbox page you want to convert to Markdown.

3. Select all the text you want to convert to Markdown and copy.

4. Paste it into Confluence.

    A note here, the new editor in Confluence no longer has the ability to insert Markdown.

    However, if you use `Right click -> Paste and match style`, the MD content will be reflected.

    I tried shortcuts like `cmd + shift + v` and `cmd + shift + opt + v` on the Mac, but no luck (why?).

<br>

## Credits

- https://github.com/daiiz/sb2md