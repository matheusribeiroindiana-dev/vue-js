const vm = new Vue({
  el: "#app",
  data: {
    products: [], 
  },
  methods: {
    pullTheProducts() {
      fetch("./api/produtos.json")
        .then((response) => response.json())
        .then((json) => {
          this.products = json;
        });
    },
  },
  created() {
    this.pullTheProducts();
  },
});
