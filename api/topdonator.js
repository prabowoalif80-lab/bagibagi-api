const crypto = require("crypto");
const axios = require("axios");

// ==== DATA DARI KAMU ====
const merchantCode = "bagibagi-U89XVVIZaL";
const secretKey = "bagibagi-FRg7iREJ0OaGgVxy14hv";
const endpoint = "/api/partnerintegration/top-donator";

// Fungsi buat token
function makeToken() {
  const raw = merchantCode + secretKey + endpoint;
  return crypto.createHash("md5").update(raw).digest("hex");
}

// Handler untuk Serverless Function di Vercel
module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = makeToken();
  const url = `https://bagibagi.co${endpoint}?merchantCode=${merchantCode}&token=${token}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};


