import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  TablePagination,
  Stack,
} from "@mui/material";
import ApiURlS from "../Service/ApiURl's";
import "../Css/Content.css";

const ProductTableList = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    ApiURlS.getAllProducts()
      .then((res) => {
        setproducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper className="paperStyle">
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1300 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="tableheader">
              <TableRow className="tablerow">
                <TableCell className="tblhd" align="left">
                  Product ID
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Name
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Category
                </TableCell>
                {/* <TableCell className="tblhd" align="left">
                  Product Image
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 ? "classEven" : "classOdd"}
                  >
                    <TableCell align="left">{value.productId}</TableCell>
                    <TableCell align="left">{value.productName}</TableCell>
                    <TableCell align="left">
                      {value.productCategory?.categoryName}
                    </TableCell>
                    {/* <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Avatar>
                          <img
                            alt="Product Image"
                            src={value.productImage}
                            style={{
                              position: "relative",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                        </Avatar>
                      </Stack>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <br />
          {/* <TablePagination
            className="contentPagination"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ProductTableList;
