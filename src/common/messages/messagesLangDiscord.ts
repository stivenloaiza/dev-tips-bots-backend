export const messages = {
  spanish: (tip) => `
  **💡 Título del Tip:** ${tip.title}
  
  **🧠 Descripción:** ${tip.body}
  
  **🏷️ Nivel:** ${tip.level}
  **🌐 Lenguaje:** ${tip.lang}
  **🔧 Tecnología:** ${tip.technology}
  **🔍 Subtecnología:** ${tip.subtechnology}
  ${tip.link ? `\n**📚 Recurso:** [¡Consulta más información aquí!](${tip.link})` : ''}
  ${tip.multimedia_url ? `\n\n![Multimedia](${tip.multimedia_url})` : ''}
    `,
  english: (tip) => `
  **💡 Tip Title:** ${tip.title}
  
  **🧠 Description:** ${tip.body}
  
  **🏷️ Level:** ${tip.level}
  **🌐 Language:** ${tip.lang}
  **🔧 Technology:** ${tip.technology}
  **🔍 Subtechnology:** ${tip.subtechnology}
  ${tip.link ? `\n**📚 Resource:** [Check out more info here!](${tip.link})` : ''}
  ${tip.multimedia_url ? `\n\n![Multimedia](${tip.multimedia_url})` : ''}
    `,
  unsupported: (tip) => `
  **Sorry, we have no tips available in the requested language. 😢**
  
  **Here is the tip in English:**
  
  ${messages.english(tip)}
    `,
};
