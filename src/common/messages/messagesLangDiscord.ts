export const messages = {
  spanish: (tip) => `
  📝 **Título del Tip:**\n ${tip.title}\n
  🧠 **Descripción:**\n ${tip.body}\n
  ⚡ **Nivel:**\n ${tip.levels}\n
  ❓ **Lenguaje:**\n ${tip.lang} \n
  🔧 **Tecnología:** \n ${tip.technology}
  ${tip.link ? `\n**📚 Recurso:** \n[¡Consulta más información aquí!](${tip.link})` : ''}
  ${tip.multimedia_url ? `\n**📷 Recurso multimedia:** \n[Multimedia](${tip.multimedia_url})\n` : ''}
    `,
  english: (tip) => `
  📝 **Tip title:**\n ${tip.title}\n
  🧠 **Description:**\n ${tip.body}\n
  ⚡ **Level:**\n ${tip.levels}\n
  ❓ **Language:**\n ${tip.lang} \n
  🔧 **Technology:** \n ${tip.technology}
  ${tip.link ? `\n**📚 Resource:** \n[¡Check out more info here!](${tip.link})` : ''}
  ${tip.multimedia_url ? `\n**📷 Multimedia resource:** \n[Multimedia](${tip.multimedia_url})\n` : ''}
    `,
  unsupported: (tip) => `
  **Sorry, we have no tips available in the requested language. 😢**
  
  **Here is the tip in English:**
  
  ${messages.english(tip)}
    `,
};
