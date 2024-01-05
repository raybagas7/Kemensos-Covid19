import { services } from "@/lib/services";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const proviceData = async () => {
      const { kecamatanId } = req.query;

      const { error, data, message } =
        await services.getDataKelurahan(kecamatanId);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const response = await proviceData();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
