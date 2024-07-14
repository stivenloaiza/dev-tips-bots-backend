export const messages = {
    spanish: (tip) => `
      <b>💡 Título del Tip:</b> ${tip.title}\n\n
      <b>🧠 Descripción:</b> ${tip.body}\n\n
      <b>🏷️ Nivel:</b> ${tip.level}\n
      <b>🌐 Lenguaje:</b> ${tip.lang}\n
      <b>🔧 Tecnología:</b> ${tip.technology}\n
      <b>🔍 Subtecnología:</b> ${tip.subtechnology}
      ${tip.link ? `\n\n<b>📚 Recurso:</b> <a href="${tip.link}">¡Consulta más información aquí!</a>` : ''}
      ${tip.multimedia_url ? `\n\n<img src="${tip.multimedia_url}" />` : ''}
    `,
    english: (tip) => `
      <b>💡 Tip Title:</b> ${tip.title}\n\n
      <b>🧠 Description:</b> ${tip.body}\n\n
      <b>🏷️ Level:</b> ${tip.level}\n
      <b>🌐 Language:</b> ${tip.lang}\n
      <b>🔧 Technology:</b> ${tip.technology}\n
      <b>🔍 Subtechnology:</b> ${tip.subtechnology}
      ${tip.link ? `\n\n<b>📚 Resource:</b> <a href="${tip.link}">Check out more info here!</a>` : ''}
      ${tip.multimedia_url ? `\n\n<img src="${tip.multimedia_url}" />` : ''}
    `,
    unsupported: (tip) => `
      <b>Sorry, we have no tips available in the requested language. 😢</b>\n\n
      <b>Here is the tip in English:</b>\n\n
      ${messages.english(tip)}
    `,
  };