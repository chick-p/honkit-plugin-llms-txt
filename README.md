# honkit-plugin-llms-txt

Generate `/llms.txt` file for your Honkit Documentation.

## Install

Install with npm:

```shell
npm install -D chick-p/honkit-plugin-llms-txt
```

## Usage

Install with npm and use it for your book with in the `book.json`:

```json
{
  "plugins": ["llms-txt"],
  "pluginsConfig": {
    "llms-txt": {
      "url": "https://example.com"
    }
  }
}
```

## Options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| url | string | `https://example.com` | The base URL of your book. |

## License

Apache-2.0 License
