const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    singleProduct: false,
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
  },
  created() {
    this.pullTheProducts();
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
