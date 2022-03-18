<template>
  <div class="image">
    <img src="../assets/icon-left-font-monochrome-white.png" />
  </div>
  <h2 class="card__title3">Modifier votre Commentaire:</h2>
  <div v-if="loading"> En Chargement . . .</div>
  <div v-else class="form-row-column">
    <div class="form-row__input">
      <label for="description"> Description </label
      ><input id="description"  v-model="comView" type="description"  />
      <div>
      <input type="file" @change="updateImageCom2" />
      <img v-bind:src="oldImageCom" alt="Ancienne image de commentaire">
      </div>
      <button @click="updateCom()" class="button"> Mettre à jour </button>
    </div>
  </div>
</template>

<script>
export default {
    
        data: function () {
    return {
        id:null,
        oldImageCom:null,
      comView: null,
      comImage: null,
      loading:true,
    };
  },
  created(){
      fetch(process.env.VUE_APP_BASE_API + "comment/" + this.$route.params.id, {
        method: "GET",
        headers: {
          Authorization: "bearer: " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log(data);

            this.comView = data.content
            this.oldImageCom= data.image
            this.id= data.id
            this.loading=false 
            const isAdmin = localStorage.getItem("isAdmin") == 'true' ? true : false;
            if( !(isAdmin || localStorage.getItem("userId") == data.User.id)){
                this.$router.push('/forum')
            }
        })

  },
  methods:{
      updateCom() {
        let formData = new FormData();
        formData.append("content", this.comView);
        if (this.comImage != null) {
          formData.append("image", this.comImage);
        }
  console.log(this.comImage);
        fetch(process.env.VUE_APP_BASE_API + "comment/" + this.id, {
          method: "PUT",
          headers: {
            Authorization: "bearer: " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then(() => {
            this.comView = "";
            this.comImage = "";
            this.$router.push("/forum");
          })
          .catch(() => alert("Veuillez re essayer plus tard "));
      
    },
    updateImageCom2(e) {
      this.comImage = e.target.files[0];
    },
  }
    
};
</script>

<style scoped>
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form-row__input::placeholder {
  color: #aaaaaa;
}
.image {
  max-width: 50%;
  display: flex;
  justify-content: center;
  width: 80%;
}
.card__title3 {
  text-align: start;
  font-weight: 600;
  color: white;
}
</style>
