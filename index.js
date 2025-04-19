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

function makeLLMsTxt(bookTitle, currentUrl) {
  let linkList = [];
  for (const { title, path } of pages) {
    linkList = linkList.concat(`- [${title}](${currentUrl}${path})`);
  }
  return `# ${bookTitle}\n\n## Docs\n${linkList.join("\n")}`;
}

function finishHookHandler() {
  const pluginConfig = this.config.get(`pluginsConfig.${pluginName}`);
  const url = new URL("/", pluginConfig.url);
  const bookTitle = this.book.config.get("title");

  const content = makeLLMsTxt(bookTitle, url);
  return this.output.writeFile("llms.txt", content);
}

module.exports = {
  hooks: {
    page: pageHookHandler,
    finish: finishHookHandler,
  },
};
