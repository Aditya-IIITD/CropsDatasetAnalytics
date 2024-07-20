import React from "react";
import { AggregatedData } from "../utils/dataProcessor";
import { Center, Table, Title } from "@mantine/core";

interface ProductionTableProps {
  data: AggregatedData[];
}

const ProductionTable: React.FC<ProductionTableProps> = ({ data }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "30px" }}
      className="shadow-xl rounded-md  p-8 bg-white"
    >
      <Title order={3}>Yearly Crop Production</Title>

      <Table
        horizontalSpacing="sm"
        highlightOnHover
        withColumnBorders
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center" }}>Year</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>
              Crop with Maximum Production
            </Table.Th>
            <Table.Th style={{ textAlign: "center" }}>
              Crop with Minimum Production
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.year}>
              <Table.Td>{item.year}</Table.Td>
              <Table.Td>{item.MaxProductionCrop}</Table.Td>
              <Table.Td>{item.MinProductionCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default ProductionTable;
