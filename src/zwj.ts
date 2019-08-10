// zwj stands for Zero Width Joiner. https://en.wikipedia.org/wiki/Zero-width_joiner

function convertHTMLEntity(text: string) {
  const span = document.createElement("span");

  return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
    span.innerHTML = entity;
    return span.innerText;
  });
}

export const zwj = convertHTMLEntity("&zwj;");
