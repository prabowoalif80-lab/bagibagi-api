// Webhook penerima notifikasi transaksi dari Bagibagi
// Set URL file ini di "Custom Webhook URL" pada halaman Stream Overlay Bagibagi

// Contoh payload yang dikirim Bagibagi (JSON):
// {
//   "transaction_id": "bagibagi-965b3d64-1f5e-4361-a01b-5b58df37190c",
//   "name": "Seseorang",
//   "amount": 10000,
//   "message": "Sukses selalu ya om ❤️",
//   "mediaShareUrl": "https://www.youtube.com/watch?v=jHonT8q2M0Q",
//   "created_at": "8/24/2024 10:30:00 AM"
// }

// Di sini kita hanya log dan langsung return status OK.
// Nanti di Roblox kamu bisa polling endpoint lain (misal /api/topdonator)
// untuk menampilkan efek donasi.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body || {};

    console.log("Webhook Bagibagi diterima:", body);

    // TODO (opsional): simpan ke database, kirim ke Discord, dsb.

    res.status(200).json({
      success: true,
      received: {
        transaction_id: body.transaction_id,
        name: body.name,
        amount: body.amount,
        message: body.message,
        mediaShareUrl: body.mediaShareUrl,
        created_at: body.created_at,
      },
    });
  } catch (err) {
    console.error("Error di webhook Bagibagi:", err);
    res.status(500).json({ success: false, error: err.message || "Internal server error" });
  }
};


