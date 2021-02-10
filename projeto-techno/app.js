const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    singleProduct: false,
    car: [],
  },
  computed: {
    totalCar() {
      let total = 0;

      if (this.car.length) {
        this.car.forEach((element) => {
          total += element.preco;
        });
      }

      return total;
    },
  },
  methods: {
    pullTheProducts() {
      fetch("./api/produtos.json")
        .then((response) => response.json())
        .then((json) => {
          this.products = json;
        });
    },
    pullSingleProduct(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((response) => response.json())
        .then((json) => {
          this.singleProduct = json;
        });
    },
    openModal(id) {
      this.pullSingleProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.singleProduct = false;
      }
    },
    addInCar() {
      this.singleProduct.estoque--;
      const { id, nome, preco } = this.singleProduct;
      this.car.push({ id, nome, preco });
    },
    itemRemove(index) {
      this.car.splice(index, 1);
    },
    checkLocalStorage() {
      if (window.localStorage.car) {
        this.car = JSON.parse(window.localStorage.car);
      }
    },
  },
  watch: {
    car() {
      window.localStorage.car = JSON.stringify(this.car);
    },
  },
  created() {
    this.pullTheProducts();
    this.checkLocalStorage();
  },
  filters: {
    //para tratar os dados de preço
    priceNumber(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
});
