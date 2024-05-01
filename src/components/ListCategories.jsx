import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

const ListCategories = ({
  changeCategory,
  categoriYangDipilih,
  categories,
}) => {
  return (
    <Col md={2} className="mt-3">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={
                categoriYangDipilih === category.nama && "category-aktif"
              }
              style={{ cursor: "pointer" }}
            >
              <h5>
                <Icon nama={category.nama} /> {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategories;
