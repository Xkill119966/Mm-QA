import React from "react";
import { Link } from "react-router-dom";
import Button, { ButtonGroup } from "./Button";

export const Pagination = ({ currentPage, totalPages, prependUrl }) => (
  <ButtonGroup gap="small" float="left">
    {totalPages > 0
      ? new Array(totalPages).fill(0).map((_, index) => {
          let pageNumber = index + 1;
          return (
            <Link to={`${prependUrl}?page=` + pageNumber}>
              <Button
                variant={currentPage === pageNumber ? "primary" : "secondary"}
                size="small"
              >
                {pageNumber}
              </Button>
            </Link>
          );
        })
      : null}
  </ButtonGroup>
);

export default Pagination;
