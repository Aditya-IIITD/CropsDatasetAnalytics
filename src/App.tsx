import React, { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { Title } from "@mantine/core";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "./App.css";
import processAgricultureData, {
  AggregatedData,
  CropAverageData,
} from "./utils/dataProcessor";
import data from "./assets/dataset.json";
import AverageTable from "./Components/AverageTable";
import ProductionTable from "./Components/ProductionTable";

function App() {
  const [aggregatedData, setAggregatedData] = useState<AggregatedData[]>([]);
  const [cropsAverageData, setCropsAverageData] = useState<CropAverageData[]>(
    []
  );
  // processAgricultureData();
  useEffect(() => {
    const { aggregatedByYear, cropAverageData } = processAgricultureData(data);
    setAggregatedData(aggregatedByYear);
    setCropsAverageData(cropAverageData);
  }, []);
  return (
    <div className="App bg-[#339AF0] flex flex-col gap-12 p-12">
      <MantineProvider>
        <p className="text-[35px] font-bold text-white">
          Indian Agriculture Analytics
        </p>
        <ProductionTable data={aggregatedData} />
        <AverageTable data={cropsAverageData} />
      </MantineProvider>
    </div>
  );
}

export default App;
