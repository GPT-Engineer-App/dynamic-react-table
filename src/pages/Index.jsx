import { Container, Text, VStack, Input, Button } from "@chakra-ui/react";
import MaterialReactTable from 'material-react-table';
import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.length > 0) {
      setColumns(Object.keys(data[0]).map((key) => ({ accessorKey: key, header: key })));
      setTableData(data);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Upload CSV and View Data</Text>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
        {tableData.length > 0 && <MaterialReactTable columns={columns} data={tableData} />}
      </VStack>
    </Container>
  );
};

export default Index;