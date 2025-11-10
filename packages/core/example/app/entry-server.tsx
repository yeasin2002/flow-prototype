import { defineEventHandler } from "h3";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default defineEventHandler((event) => {
  const url = event.node.req.url || "/";

  // Render React to string
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // Generate full HTML
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>@flow App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/@id/__x00__virtual:vinxi/client"></script>
      </body>
    </html>
  `;

  return fullHtml;
});
