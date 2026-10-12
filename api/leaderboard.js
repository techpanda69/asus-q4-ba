export default async function handler(req, res) {

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbzVWZvu4QGFkVJUf5-F3pAuWe3BlU8ZKWXyaRDD4UatCF9pRviG00-s-eJTDLNZ7kvJCQ/exec";

  try {

    const response = await fetch(GAS_URL);

    if (!response.ok) {
      throw new Error(
        `Google Apps Script returned ${response.status}`
      );
    }

    const data = await response.json();

    res.setHeader(
      "Cache-Control",
      "s-maxage=5, stale-while-revalidate=10"
    );

    res.status(200).json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Unable to fetch leaderboard data"
    });

  }
}
