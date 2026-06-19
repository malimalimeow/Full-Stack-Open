import React from "react";
import Blog from "./Blog";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title & Author</TableCell>
              <TableCell>creator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}-{blog.author}
                    </Link>
                  </TableCell>
                  <TableCell>{blog.user.username}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
