import marked from 'marked';
import hljs from 'highlight.js';
import "../css/github.css";
import "../css/markdown.css"

const renderer = new marked.Renderer();
renderer.code = function (code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            escaped = true;
            code = out;
        }
    }
    if (!lang) {
        return (
            "<pre class='hljs codeBox'><code>" +
            (escaped ? code : escape(code, true)) +
            "</code></pre>"
        );
    }
    return (
        '<pre class="hljs codeBox"><code class="' +
        this.options.langPrefix +
        escape(lang, true) +
        '">' +
        (escaped ? code : escape(code, true)) +
        "</code></pre>\n"
    );
};


renderer.codespan = function (text) {
    return '<code class="codespanBox">' + text + '</code>';
};


renderer.blockquote = function (quote) {
    return '<blockquote class="blockquoteBox">\n' + quote + '</blockquote>\n';
};


renderer.heading = function (text, level, raw, slugger) {
    switch (level) {
        case 1:
            return '<h' + level + ' class="h1-text">' + text + '</h' + level + '>\n';
        case 2:
            return '<h' + level + ' class="h2-text">' + text + '</h' + level + '>\n';
        case 3:
            return '<h' + level + ' class="h3-text">' + text + '</h' + level + '>\n';
        case 4:
            return '<h' + level + ' class="h4-text">' + text + '</h' + level + '>\n';
        case 5:
            return '<h' + level + ' class="h5-text">' + text + '</h' + level + '>\n';
        case 6:
            return '<h' + level + ' class="h6-text">' + text + '</h' + level + '>\n';
    }
};
renderer.listitem = function (text) {
    if (text.substring(1, 6) == 'input') {
        return '<li style="list-style: none;">' + text + '</li>\n';
    }
    return '<li>' + text + '</li>\n';
};
renderer.image = function (href, title, text) {
    //href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
        return text;
    }

    let out = '<p class="imgBox"><img src="' + href + '" alt="' + text + '"';
    if (title) {
        out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/><p>\n' : '><p>\n';
    return out;
};
renderer.link = function(href, title, text) {
    //href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a class="aBox" href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

marked.setOptions({
    renderer: renderer,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});
function markedxx(content) {
    return marked(content);
}

export { markedxx }