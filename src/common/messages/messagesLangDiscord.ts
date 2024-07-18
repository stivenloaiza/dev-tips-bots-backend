export const messages = {
  spanish: (tip) => `
  📝 **Título del Tip:**\n ${tip.title}\n
  🧠 **Descripción:**\n ${tip.body}\n
  ⚡ **Nivel:**\n ${tip.level}\n
  ❓ **Lenguaje:**\n ${tip.lang}\n
  🔧 **Tecnología:** \n ${tip.technology}\n
  **🔍 Subtecnología:** \n ${tip.subtechnology}
  ${tip.link ? `\n**📚 Recurso:** \n[¡Consulta más información aquí!](${tip.link})` : ''}
  ${tip.img_url ? `\n**📷 Recurso multimedia:** \n[Multimedia](${tip.img_url})\n` : ''}
    `,
  english: (tip) => `
  📝 **Tip title:**\n ${tip.title}\n
  🧠 **Description:**\n ${tip.body}\n
  ⚡ **Level:**\n ${tip.level}\n
  ❓ **Language:**\n ${tip.lang} \n
  🔧 **Technology:** \n ${tip.technology} \n
   **🔍 Subtechnology:** \n ${tip.subtechnology}
  ${tip.link ? `\n**📚 Resource:** \n[¡Check out more info here!](${tip.link})` : ''}
  ${tip.img_url ? `\n**📷 Multimedia resource:** \n[Multimedia](${tip.img_url})\n` : ''}
    `,
  unsupported: (tip) => `
  **Sorry, we have no tips available in the requested language. 😢**
  
  **Here is the tip in English:**
  
  ${messages.english(tip)}
    `,
};
