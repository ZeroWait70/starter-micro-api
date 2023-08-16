const express = require("express");
const app = express();
const axios = require("axios");
const ping = require("ping");
const mongoose = require("mongoose");
const db = require("./Models/CheckStatus.js");
mongoose.connect("mongodb+srv://test31:u3aG3TiQyUhTTF5L@cluster0.bnaox.mongodb.net/checkstats?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).catch((err) => {
    console.error("Erreur lors de la connexion à MongoDB :", err);
  });

  var hosts = ["83.150.217.148"];
  setInterval(async () => {
    for (let host of hosts) {
      let res = await ping.promise.probe(host);
      let data = await db.findOne({Host: res.host});
      if (res.alive == true) {
        if(!data) return await new db({Host: res.host, HostName: "VPS", Uptime: "93.71%", Latency: `${res.max.split(".")[0]} ms`, isOnline: true}).save() && OnlineStatus();
        if(data.isOnline == true) return;
        if(data.isOnline == false) return await data.updateOne({Host: res.host, HostName: "VPS", Uptime: "93.71%", Latency: `${res.max.split(".")[0]} ms`, isOnline: true}) && OnlineStatus();
        async function OnlineStatus() {
        let webhook = await axios.post(
          "https://discord.com/api/webhooks/934920046625554533/etNIuBe0sx28nOZlz8xoZLxqmxEIS-WdM0FSYJeO3TClcHktKkhhnupsuvB5637L5-ZY",
          {
            content: `<@688664117073936436>`,
            embeds: [
              {
                color: 65338,
                fields: [
                  {
                    name: "Nom du service :",
                    value: "🆔 VPS",
                  },
                  {
                    name: "Adresse IP/Nom de domaine :",
                    value: `💻 ${res.host}`,
                  },
                  {
                    name: "Uptime :",
                    value: "📊 93,71%",
                  },
                  {
                    name: "Ping :",
                    value: `✅ ${res.max.split(".")[0]} ms`,
                  },
                  {
                    name: "Lien API :",
                    value: "🚧 [API Statut](http://localhost:3000/)",
                  },
                ],
                author: {
                  name: "🟢 VPS EN LIGNE 🟢",
                },
                footer: {
                  text: "Statut",
                  icon_url:
                    "https://cdn.discordapp.com/attachments/1007614049019756605/1140706703067856947/image.png",
                },
                timestamp: new Date(),
              },
            ],
            attachments: [],
          }
        );
        let webhook1 = await axios.post(
          "https://discord.com/api/webhooks/1141124832348606626/QfREjDTuQmjaWxFiXvghY_GdgGq4M9wQ1yJUd4LFxHuWoHx55yhypc5MQiW5sFieROCO",
          {
            content: `<@688664117073936436>`,
            embeds: [
              {
                color: 65338,
                fields: [
                  {
                    name: "Nom du service :",
                    value: "🆔 VPS",
                  },
                  {
                    name: "Uptime :",
                    value: "📊 93,71%",
                  },
                  {
                    name: "Ping :",
                    value: `✅ ${res.max.split(".")[0]} ms`,
                  },
                  {
                    name: "Lien API :",
                    value: "🚧 [API Statut](http://localhost:3000/)",
                  },
                ],
                author: {
                  name: "🟢 VPS EN LIGNE 🟢",
                },
                footer: {
                  text: "Statut",
                  icon_url:
                    "https://cdn.discordapp.com/attachments/1007614049019756605/1140706703067856947/image.png",
                },
                timestamp: new Date(),
              },
            ],
            attachments: [],
          }
        );
        }
        OnlineStatus();
      } else {
        if(!data) return await new db({Host: res.host, HostName: "VPS", Uptime: "93.71%", Latency: 'Error', isOnline: false}).save() && OfflineStatus();
        if(data.isOnline == false) return;
        if(data.isOnline == true) return await data.updateOne({Host: res.host, HostName: "VPS", Uptime: "93.71%", Latency: `${res.max.split(".")[0]} ms`, isOnline: false}) && OfflineStatus();
        async function OfflineStatus() {
        let webhook = await axios.post(
          "https://discord.com/api/webhooks/934920046625554533/etNIuBe0sx28nOZlz8xoZLxqmxEIS-WdM0FSYJeO3TClcHktKkhhnupsuvB5637L5-ZY",
          {
            content: `<@688664117073936436>`,
            embeds: [
              {
                color: 12124160,
                fields: [
                  {
                    name: "Nom du service :",
                    value: "🆔 VPS",
                  },
                  {
                    name: "Adresse IP/Nom de domaine :",
                    value: `💻 ${res.host}`,
                  },
                  {
                    name: "Uptime :",
                    value: "📊 45,73%",
                  },
                  {
                    name: 'Paquets perdus :',
                    value: `📡 ${res.packetLoss.split('.')[0]}%`
                  },
                  {
                    name: "Erreur :",
                    value: "❌ Delai d'attente dépassé",
                  },
                  {
                    name: "Lien API :",
                    value: "🚧 [API Statut](http://localhost:3000/)",
                  },
                ],
                author: {
                  name: "🔴 VPS HORS LIGNE 🔴",
                },
                footer: {
                  text: "Statut",
                  icon_url:
                    "https://cdn.discordapp.com/attachments/1007614049019756605/1140706703067856947/image.png",
                },
                timestamp: new Date(),
              },
            ],
            attachments: [],
          }
        );
        let webhook1 = await axios.post(
          "https://discord.com/api/webhooks/1141124832348606626/QfREjDTuQmjaWxFiXvghY_GdgGq4M9wQ1yJUd4LFxHuWoHx55yhypc5MQiW5sFieROCO",
          {
            content: `<@688664117073936436>`,
            embeds: [
              {
                color: 12124160,
                fields: [
                  {
                    name: "Nom du service :",
                    value: "🆔 VPS",
                  },
                  {
                    name: "Uptime :",
                    value: "📊 45,73%",
                  },
                  {
                    name: 'Paquets perdus :',
                    value: `📡 ${res.packetLoss.split('.')[0]}%`
                  },
                  {
                    name: "Erreur :",
                    value: "❌ Delai d'attente dépassé",
                  },
                  {
                    name: "Lien API :",
                    value: "🚧 [API Statut](http://localhost:3000/)",
                  },
                ],
                author: {
                  name: "🔴 VPS HORS LIGNE 🔴",
                },
                footer: {
                  text: "Statut",
                  icon_url:
                    "https://cdn.discordapp.com/attachments/1007614049019756605/1140706703067856947/image.png",
                },
                timestamp: new Date(),
              },
            ],
            attachments: [],
          }
        );
      }
      }
      OfflineStatus();
    }
  }, 60000);

app.get("/", async (req, res) => {
  let data = await db.findOne({HostName: "VPS"});
  if(!data) return res.json([]);
  if(data) return res.json({Host: data.Host, HostName: data.HostName, Uptime: data.uptime, Latency: res.Latency, isOnline: data.isOnline});
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Ready ! http://localhost:${process.env.PORT || 3000}/`);
});
