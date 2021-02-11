const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    singleProduct: false,
    car: [],
    alertMessageString: "",
    activeAlert: false,
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

      this.alertMessage(`${nome} foi adicionado ao carrinho.`);
    },
    itemRemove(index) {
      this.car.splice(index, 1);
    },
    checkLocalStorage() {
      if (window.localStorage.car) {
        this.car = JSON.parse(window.localStorage.car);
      }
    },
    alertMessage(message) {
      this.alertMessageString = message;
      this.activeAlert = true;

      setTimeout(() => {
        this.activeAlert = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      console.log(hash);
      if (hash) {
        this.pullSingleProduct(hash.replace("#", ""));
      }
    },
  },
  watch: {
    singleProduct() {
      document.title = this.singleProduct.nome || "Techno";
      const hash = this.singleProduct.id || "";
      history.pushState(null, null, `#${hash}`);
    },
    car() {
      window.localStorage.car = JSON.stringify(this.car);
    },
  },
  created() {
    this.pullTheProducts();
    this.checkLocalStorage();
    this.router();
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
