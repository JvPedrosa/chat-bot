const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js");

const client = new Client();

// Gera o QR Code para autenticação no WhatsApp Web
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on("ready", () => {
  console.log("✅ Bot da João dos Trajes - Esportes está ONLINE!");
});

client.initialize();

// Função para criar um atraso entre as respostas
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lógica de atendimento automatizado
client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const contato = await msg.getContact();
  const nome = contato.pushname.split(" ")[0];

  // Apresentação ao receber uma saudação
  if (
    msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) &&
    msg.from.endsWith("@c.us")
  ) {
    await esperar(2000);
    await chat.sendStateTyping();
    await esperar(2000);

    await client.sendMessage(
      msg.from,
      `🏅 Olá, ${nome}! Seja bem-vindo à *João dos Trajes - Artigos Esportivos*! Como posso te ajudar hoje?\n\nEscolha uma opção:\n\n1️⃣ Roupas e acessórios masculinos\n2️⃣ Roupas e acessórios femininos\n3️⃣ Óculos esportivos\n4️⃣ Atendimento com um vendedor\n5️⃣ Outras dúvidas`
    );

    await esperar(2000);
    await chat.sendStateTyping();
  }

  // Respostas para cada opção escolhida
  const respostas = {
    1: `🏃‍♂️ *Roupas e Acessórios Masculinos*\nAqui você encontra camisetas, bermudas, tênis, mochilas e muito mais para a prática esportiva!\n🔗 Confira: [Clique aqui](http://joaodostrajes.com.br/masculino)`,

    2: `🏃‍♀️ *Roupas e Acessórios Femininos*\nModa esportiva com conforto e desempenho! Escolha entre leggings, tops, camisetas, tênis e muito mais!\n🔗 Confira: [Clique aqui](http://joaodostrajes.com.br/feminino)`,

    3: `🕶️ *Óculos Esportivos*\nProteja seus olhos com estilo! Óculos de sol e lentes especiais para esportes ao ar livre.\n🔗 Confira: [Clique aqui](https://www.joaodostrajes.com.br/oculos)`,

    4: `📞 *Atendimento com um vendedor*\nSe você precisa de ajuda para escolher o melhor produto, fale com um dos nossos especialistas! Responderemos em breve! 😊`,

    5: `❓ *Dúvidas Frequentes*\nPara mais informações, visite nosso site ou fale diretamente com um de nossos atendentes!\n🔗 Site: [João dos Trajes](https://www.joaodostrajes.com.br/)`,
  };

  if (respostas[msg.body] && msg.from.endsWith("@c.us")) {
    await esperar(2000);
    await chat.sendStateTyping();
    await esperar(2000);
    await client.sendMessage(msg.from, respostas[msg.body]);
  }
});
