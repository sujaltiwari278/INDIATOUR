require("dotenv").config();

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const mongoose = require("mongoose");

const Phrase = require("../models/Phrase");

const phrases = [
  {
    category: "Transport",

    english: "Where is the railway station?",

    hindi: "रेलवे स्टेशन कहाँ है?",

    gujarati: "રેલવે સ્ટેશન ક્યાં છે?",

    telugu: "రైల్వే స్టేషన్ ఎక్కడ ఉంది?",

    marathi: "रेल्वे स्टेशन कुठे आहे?",
  },

  {
    category: "Emergency",

    english: "Call the police",

    hindi: "पुलिस को बुलाइए",

    gujarati: "પોલીસને બોલાવો",

    telugu: "పోలీసులను పిలవండి",

    marathi: "पोलीसांना बोलवा",
  },

  {
    category: "Food",

    english: "I want vegetarian food",

    hindi: "मुझे शाकाहारी भोजन चाहिए",

    gujarati: "મને શાકાહારી ભોજન જોઈએ",

    telugu: "నాకు శాకాహార భోజనం కావాలి",

    marathi: "मला शाकाहारी जेवण हवे आहे",
  },

  {
    category: "Shopping",

    english: "How much does this cost?",

    hindi: "इसकी कीमत कितनी है?",

    gujarati: "આની કિંમત કેટલી છે?",

    telugu: "దీని ధర ఎంత?",

    marathi: "याची किंमत किती आहे?",
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    await Phrase.deleteMany();

    await Phrase.insertMany(phrases);

    console.log(
      `${phrases.length} phrases inserted`
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();