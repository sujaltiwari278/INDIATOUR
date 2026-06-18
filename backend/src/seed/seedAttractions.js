require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const Attraction = require("../models/Attraction");

const attractions = [
  // Mysore
  {
    city: "Mysore",
    place: "Mysore Palace",
    category: "History",
    description: "Royal palace of Mysore",
    rating: 4.8,
  },
  {
    city: "Mysore",
    place: "Chamundi Hills",
    category: "Nature",
    description: "Hill overlooking Mysore",
    rating: 4.7,
  },
  {
    city: "Mysore",
    place: "Brindavan Gardens",
    category: "Nature",
    description: "Famous musical fountain",
    rating: 4.6,
  },

  // Bangalore
  {
    city: "Bangalore",
    place: "Lalbagh Botanical Garden",
    category: "Nature",
    description: "Historic botanical garden",
    rating: 4.8,
  },
  {
    city: "Bangalore",
    place: "Cubbon Park",
    category: "Nature",
    description: "Large city park",
    rating: 4.7,
  },
  {
    city: "Bangalore",
    place: "Bangalore Palace",
    category: "History",
    description: "Royal palace",
    rating: 4.5,
  },

  // Coorg
  {
    city: "Coorg",
    place: "Abbey Falls",
    category: "Nature",
    description: "Beautiful waterfall",
    rating: 4.7,
  },
  {
    city: "Coorg",
    place: "Raja's Seat",
    category: "Nature",
    description: "Popular viewpoint",
    rating: 4.6,
  },
  {
    city: "Coorg",
    place: "Dubare Elephant Camp",
    category: "Wildlife",
    description: "Elephant interaction center",
    rating: 4.8,
  },

  // Delhi
  {
    city: "Delhi",
    place: "Red Fort",
    category: "History",
    description: "UNESCO World Heritage Site",
    rating: 4.8,
  },
  {
    city: "Delhi",
    place: "India Gate",
    category: "History",
    description: "War memorial",
    rating: 4.7,
  },
  {
    city: "Delhi",
    place: "Qutub Minar",
    category: "History",
    description: "Historic minaret",
    rating: 4.8,
  },

  // Agra
  {
    city: "Agra",
    place: "Taj Mahal",
    category: "History",
    description: "One of the Seven Wonders",
    rating: 5.0,
  },
  {
    city: "Agra",
    place: "Agra Fort",
    category: "History",
    description: "Historic Mughal fort",
    rating: 4.8,
  },

  // Jaipur
  {
    city: "Jaipur",
    place: "Hawa Mahal",
    category: "History",
    description: "Palace of Winds",
    rating: 4.7,
  },
  {
    city: "Jaipur",
    place: "Amber Fort",
    category: "History",
    description: "Majestic hill fort",
    rating: 4.9,
  },
];
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Attraction.deleteMany();

    await Attraction.insertMany(attractions);

    console.log(
      `${attractions.length} attractions inserted`
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();