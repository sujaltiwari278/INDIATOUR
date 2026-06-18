const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.indiatourcluster.s0tfrok.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("DNS Error:", err);
      return;
    }

    console.log(addresses);
  }
);