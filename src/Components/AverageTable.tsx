import React from "react";
import { CropAverageData } from "../utils/dataProcessor";
import { Table, Title } from "@mantine/core";
interface AverageTableProps {
  data: CropAverageData[];
}
const AverageTable: React.FC<AverageTableProps> = ({ data }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "30px" }}
      className="shadow-xl rounded-md  p-8 bg-white"
    >
      <Title order={3} style={{ textAlign: "center" }}>
        Crop Averages (1950-2020)
      </Title>
      <Table
        horizontalSpacing="sm"
        highlightOnHover
        withColumnBorders
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center" }}>Crop</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Average Yield</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>
              Average Cultivation Area
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.Crop}>
              <Table.Td>{item.Crop}</Table.Td>
              <Table.Td>{item.AverageYield}</Table.Td>
              <Table.Td>{item.AverageArea}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default AverageTable;
