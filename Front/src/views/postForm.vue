<template>
  <div class="image">
    <img src="../assets/icon-left-font-monochrome-white.png" />
  </div>
  <h2 class="card__title3">Modifier votre publication:</h2>
  <div v-if="loading"> En Chargement . . .</div>
  <div v-else class="form-row-column">
    <div class="form-row__input">
      <label for="title"> Titre </label>
      <input id="title" class="form-control" v-model="postViewUp" type="title" />
    </div>
    <div class="form-row__input">
      <label for="message"> Description </label
      ><textarea id="message" class="form-control" v-model="postViewUp2" rows="4"></textarea>
      <div>
      <input type="file" @change="updateImagePost2" />
      <img v-bind:src="oldImage" alt="Ancienne image Post">
      </div>
      <button @click="updatePost()" class="button"> Mettre à jour </button>
    </div>
  </div>
</template>

<script>
export default {
    
        data: function () {
    return {
        id:null,
        oldImage:null,
      postViewUp: null,
      postViewUp2: null,
      postImageUp: null,
      loading:true,
    };
  },
  created(){
      fetch(process.env.VUE_APP_BASE_API + "post/" + this.$route.params.id, {
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
            this.postViewUp = data.title
            this.postViewUp2 = data.content
            this.oldImage= data.image
            this.id= data.id
            this.loading=false

            const isAdmin = localStorage.getItem("isAdmin") == 'true' ? true : false;
            if( !(isAdmin || localStorage.getItem("userId") == data.User.id)){
                this.$router.push('/forum')
            }
        })

  },
  methods:{
      updatePost() {
        let formData = new FormData();
        formData.append("title", this.postViewUp);
        formData.append("content", this.postViewUp2);
        if (this.postImageUp != null) {
          formData.append("image", this.postImageUp);
        }

        fetch(process.env.VUE_APP_BASE_API + "post/" + this.id, {
          method: "PUT",
          headers: {
            Authorization: "bearer: " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then(() => {
            this.postViewUp = "";
            this.postViewUp2 = "";
            this.postImageUp = "";

            this.$router.push("/forum");
          })
          .catch(() => alert("Veuillez re essayer plus tard "));
      
    },
    updateImagePost2(e) {
      this.postImageUp = e.target.files[0];
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
