import * as XLSX from "xlsx";

export const flattenData = (data: any[]): any[] => {
  return data.map((item) => {
    const flattenedItem = { ...item };
    for (const key in item.details) {
      flattenedItem[key] = item.details[key];
    }
    delete flattenedItem.details;
    return flattenedItem;
  });
};

export const writeToSheet = (tableDom: any) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  // Convert flattened data to worksheet
  const ws = XLSX.utils.table_to_sheet(tableDom);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Period Details");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "nested_table_data.xlsx";

  return downloadLink;
  // Write workbook to file
  //   XLSX.writeFile(wb, "PA_Period_Details.xlsx");
};
