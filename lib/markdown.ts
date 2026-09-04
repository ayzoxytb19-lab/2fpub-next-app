// Convertisseur "markdown" maison volontairement limité : pas de dépendance
// externe, et surtout pas de HTML brut injectable puisque tout le texte est
// échappé avant d'appliquer les quelques transformations supportées
// (gras, italique, titres H2/H3, liens, images, listes à puces, paragraphes).
// La barre d'outils de components/admin/ContentEditor.tsx n'insère que cette
// syntaxe, donc l'utilisateur n'a jamais besoin d'en connaître les détails.

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isSafeUrl(escapedUrl: string): boolean {
  const decoded = escapedUrl.replace(/&amp;/g, "&");
  return /^(https?:\/\/|\/|mailto:|#)/i.test(decoded);
}

function renderInline(escapedText: string): string {
  let html = escapedText;

  // Images: ![alt](url) — traité avant les liens (même syntaxe de crochets).
  html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (match, alt: string, url: string) => {
    if (!isSafeUrl(url)) return match;
    return `<img src="${url}" alt="${alt}" loading="lazy" />`;
  });

  // Liens: [texte](url)
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, text: string, url: string) => {
    if (!isSafeUrl(url)) return match;
    return `<a href="${url}" rel="noopener noreferrer">${text}</a>`;
  });

  // Gras puis italique (dans cet ordre pour ne pas casser **texte**).
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return html;
}

export function renderMarkdown(source: string): string {
  const escaped = escapeHtml(source ?? "").replace(/\r\n/g, "\n");
  const lines = escaped.split("\n");

  const blocks: string[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      blocks.push(`<p>${paragraphLines.map(renderInline).join("<br />")}</p>`);
      paragraphLines = [];
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push(`<ul>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const h3 = line.match(/^###\s+(.*)$/);
    const h2 = line.match(/^##\s+(.*)$/);
    const listItem = line.match(/^[-*]\s+(.*)$/);

    if (h3) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${renderInline(h3[1])}</h3>`);
    } else if (h2) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${renderInline(h2[1])}</h2>`);
    } else if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
    } else {
      flushList();
      paragraphLines.push(line);
    }
  }

  flushParagraph();
  flushList();

  return blocks.join("\n");
}
