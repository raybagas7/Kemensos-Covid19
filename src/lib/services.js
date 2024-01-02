export const services = (() => {
  const getCivilsData = async () => {
    const response = await fetch(`${process.env.BASE_API_URL}/civils`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Something happened to our server");
    }

    const responseJson = await response.json();
    return {
      error: false,
      data: responseJson,
      message: "success",
    };
  };

  return {
    getCivilsData,
  };
})();
