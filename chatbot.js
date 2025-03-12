const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js");

const client = new Client();

// Gera o QR Code para autenticação no WhatsApp Web
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on("ready", () => {
  console.log("✅ Bot da João dos Trajes está ONLINE!");
});

client.initialize();

// Função para criar um atraso entre as respostas
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lógica de atendimento automatizado
client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const contato = await msg.getContact();
  const nome = contato.pushname.split(" ")[0];

  // Apresentação ao receber uma saudação
  if (
    msg.body.match(
      /(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|bom dia|Bom dia|boa tarde|Boa tarde|boa noite|Boa noite)/g
    ) &&
    msg.from.endsWith("@c.us")
  ) {
    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);

    await client.sendMessage(
      msg.from,
      `🏅 Olá, ${nome}! Seja bem-vindo à *João dos Trajes*! Como posso te ajudar hoje?\n\nEscolha uma opção:\n\n1️⃣ Trajes masculinos\n2️⃣ Trajes femininos\n3️⃣ Óculos esportivos\n4️⃣ Atendimento com um vendedor\n5️⃣ Outras dúvidas`
    );

    await delay(2000);
    await chat.sendStateTyping();
  }

  // Respostas para cada opção escolhida
  const respostas = {
    1: `🏃‍♂️ *Trajes Masculinos*\n🔗 Confira: [Clique aqui](http://joaodostrajes.com.br/masculino)`,

    2: `🏃‍♀️ *Trajes Femininos*\n🔗 Confira: [Clique aqui](http://joaodostrajes.com.br/feminino)`,

    3: `🕶️ *Óculos Esportivos*\n🔗 Confira: [Clique aqui](https://www.joaodostrajes.com.br/oculos)`,

    4: `📞 *Atendimento com um vendedor*\nSe você precisa de ajuda para escolher o melhor produto, fale com um dos nossos especialistas! Responderemos em breve! 😊`,
  };

  if (respostas[msg.body] && msg.from.endsWith("@c.us")) {
    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, respostas[msg.body]);
  }
});
