// export interface cropData {
//   Country: string;
//   Year: string;
//   "Crop Name": string;
//   "Crop Production (UOM:t(Tonnes))": number;
//   "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
//   "Area Under Cultivation (UOM:Ha(Hectares))": number;
// }

export interface AggregatedData {
  year: string;
  MaxProductionCrop: string;
  MinProductionCrop: string;
}

export interface CropAverageData {
  Crop: string;
  AverageYield: number;
  AverageArea: number;
}

const extractYear = (year: string) => {
  const match = year.match(/\d{4}/);
  return match ? match[0] : "";
};
const processAgricultureData = (
  data: any[]
): {
  aggregatedByYear: AggregatedData[];
  cropAverageData: CropAverageData[];
} => {
  const formattedData = data.map((item) => ({
    Country: item.Country,
    Year: extractYear(item.Year),
    CropName: item["Crop Name"],
    CropProduction: item["Crop Production (UOM:t(Tonnes))"]
      ? Number(item["Crop Production (UOM:t(Tonnes))"])
      : 0,
    YieldOfCrops: item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
      ? Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
      : 0,
    AreaUnderCultivation: item["Area Under Cultivation (UOM:Ha(Hectares))"]
      ? Number(item["Area Under Cultivation (UOM:Ha(Hectares))"])
      : 0,
  }));
  const aggregatedByYear: AggregatedData[] = [];
  const cropAverages: {
    [key: string]: { totalYield: number; totalArea: number; count: number };
  } = {};

  const years = Array.from(new Set(formattedData.map((item) => item.Year)));

  years.forEach((year) => {
    const cropsInYear = formattedData.filter((crop) => crop.Year == year);
    let maxProduction = -Infinity;
    let minProduction = Infinity;
    let maxCrop = "";
    let minCrop = "";

    cropsInYear.forEach((crop) => {
      if (crop.CropProduction > maxProduction) {
        maxProduction = crop.CropProduction;
        maxCrop = crop.CropName;
      }
      if (crop.CropProduction < minProduction) {
        minProduction = crop.CropProduction;
        minCrop = crop.CropName;
      }
    });

    aggregatedByYear.push({
      year: year,
      MaxProductionCrop: maxCrop,
      MinProductionCrop: minCrop,
    });
  });

  formattedData.forEach((crop) => {
    const yieldOfCrops = crop.YieldOfCrops;
    const areaUnderCultivation = crop.AreaUnderCultivation;

    if (!cropAverages[crop.CropName]) {
      cropAverages[crop.CropName] = { totalArea: 0, totalYield: 0, count: 0 };
    }

    cropAverages[crop.CropName].totalYield += yieldOfCrops;
    cropAverages[crop.CropName].totalArea += areaUnderCultivation;
    cropAverages[crop.CropName].count += 1;
  });

  const cropAverageData: CropAverageData[] = Object.keys(cropAverages).map(
    (crop) => ({
      Crop: crop,
      AverageYield: parseFloat(
        (cropAverages[crop].totalYield / cropAverages[crop].count).toFixed(3)
      ),
      AverageArea: parseFloat(
        (cropAverages[crop].totalArea / cropAverages[crop].count).toFixed(3)
      ),
    })
  );

  return { aggregatedByYear, cropAverageData };
};

export default processAgricultureData;
