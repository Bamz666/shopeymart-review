import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import swal from "sweetalert";
import { API_URL } from "../utils/constants";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categories: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  clearKeranjangs = () => {
    this.setState({ keranjangs: [] });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      this.updateData();
    }
  }

  changeCategory = (value) => {
    this.setState({ categoriYangDipilih: value });
  };

  masukKeranjang = (value) => {
    const { keranjangs } = this.state;
    const keranjangProduct = keranjangs.find(
      (item) => item.product.id === value.id
    );

    if (!keranjangProduct) {
      const keranjang = {
        jumlah: 1,
        total_harga: value.harga,
        product: value,
      };

      this.setState({ keranjangs: [...keranjangs, keranjang] }, () => {
        this.updateData();
      });
    } else {
      const updatedKeranjangs = keranjangs.map((item) =>
        item.product.id === value.id
          ? {
              ...item,
              jumlah: item.jumlah + 1,
              total_harga: item.total_harga + value.harga,
            }
          : item
      );

      this.setState({ keranjangs: updatedKeranjangs }, () => {
        this.updateData();
      });
    }
  };

  fetchData = () => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => {
        const menus = data.products;
        const categories = data.categories;
        const keranjangs = data.keranjangs;
        this.setState({ menus, categories, keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  updateData = () => {
    const { keranjangs } = this.state;
    fetch(`${API_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keranjangs }),
    })
      .then(() => {
        swal({
          title: "Sukses Update Keranjang",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs, categories } = this.state;
    const filteredMenus = menus.filter(
      (menu) => menu.category.nama === categoriYangDipilih
    );

    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              categories={categories}
              changeCategory={this.changeCategory}
              categoriYangDipilih={categoriYangDipilih}
            />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {filteredMenus &&
                  filteredMenus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              clearKeranjangs={this.clearKeranjangs}
              {...this.props}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
