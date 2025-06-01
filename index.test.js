import path from "node:path";
import { expect, test } from "vitest";

import tester from "honkit-tester";

const llmsTxtContent = `# Test Book

## Docs
- [Introduction](https://example.com/)
- [second](https://example.com/second.html)`;

test("Generate llms.txt", async () => {
  const result = await tester
    .builder()
    .withContent("First page content")
    .withPage("second", "Second page content")
    .withLocalPlugin(path.join(__dirname, "."))
    .withBookJson({
      title: "Test Book",
      plugins: ["llms-txt"],
      pluginsConfig: {
        "llms-txt": {
          url: "https://example.com",
        },
      },
    })
    .create();
  const content = result.get("llms.txt").content;
  expect(content).toEqual(llmsTxtContent);
});
