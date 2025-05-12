let pages = [];

const pluginName = "llms-txt";

function pageHookHandler(page) {
  if (this.output.name !== "website") {
    return page;
  }

  let lang = "";
  if (this.isLanguageBook()) {
    lang = this.book.config.get("language");
  }
  if (lang) {
    lang = `${lang}/`;
  }

  let path = this.output.toURL(lang + page.path);
  // root page is always `./`
  if (path.startsWith("./")) {
    path = "";
  }

  const title = page.title;
  pages = pages.concat({ title, path });
  return page;
}

function makeLLMsTxt(bookTitle, baseUrl) {
  let linkList = [];
  for (const { title, path } of pages) {
    const url = new URL(path, baseUrl);
    linkList = linkList.concat(`- [${title}](${url.toString()})`);
  }
  return `# ${bookTitle}\n\n## Docs\n${linkList.join("\n")}`;
}

function finishHookHandler() {
  const pluginConfig = this.config.get(`pluginsConfig.${pluginName}`);
  const bookTitle = this.book.config.get("title");
  const content = makeLLMsTxt(bookTitle, pluginConfig.url);
  return this.output.writeFile("llms.txt", content);
}

module.exports = {
  hooks: {
    page: pageHookHandler,
    finish: finishHookHandler,
  },
};
