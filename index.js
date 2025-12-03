const express = require("express");
const crypto = require("crypto");
const app = express();

// ==== DATA KAMU ====
const merchantCode = "bagibagi-U89XVVIZaL";
const secretKey = "bagibagi-FRg7iREJ0OaGgVxy14hv";

// ==== ENDPOINT ====
const endpoint = "/api/partnerintegration/top-donator";

// ==== GENERATE TOKEN ====
function generateToken() {
    const toHash = merchantCode + secretKey + endpoint;
    return crypto.createHash("md5").update(toHash).digest("hex");
}

// ==== ROUTE SERVER ====
app.get("/", (req, res) => {
    res.send({
        merchantCode: merchantCode,
        token: generateToken(),
        exampleURL:
            `https://bagibagi.co/api/partnerintegration/top-donator?merchantCode=${merchantCode}&token=${generateToken()}`
    });
});

// ==== RUN SERVER ====
app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});
