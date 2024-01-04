export const services = (() => {
  const getCivilsData = async (sort, order) => {
    const params = {
      _sort: sort,
      _order: order,
    };

    const stringParams = new URLSearchParams(params).toString();

    const response = await fetch(
      `${process.env.BASE_API_URL}/civils?${stringParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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

  const getProvinsiData = async () => {
    const response = await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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

  const getDataKota = async (provinceId) => {
    const response = await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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
    getProvinsiData,
    getDataKota,
  };
})();
