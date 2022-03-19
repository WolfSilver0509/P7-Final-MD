<template>
  <div class="card2">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <img :src="image" />
    <p>
      <i>Publication créé par {{ User.firstName }} </i>
    </p>
    <i class="fa-solid fa-comment" @click="comData = !comData"></i>
    <div class="cardCreate2" v-if="comData">
      <div class="form">
        <div class="form-row-column">
          <input
            class="form-row__input_Des"
            v-model="comView"
            type="text"
            placeholder="Ecrivez votre commentaire"
          />
          <input type="file" @change="updateImageCom" />
        </div>
        <button @click="createCom()" class="button">Envoie Com</button>
      </div>
    </div>
    <div v-for="comment in Comments" class="card" v-bind:key="comment.id">
      <p>{{ comment.content }}</p>
      <img :src="comment.image" />
      <div class="placement">
        <p class="userCom"><i> by </i> {{ comment.User.firstname }}</p>
      </div>
      <div v-if="(Boolean(isAdmin) || userId == comment.User.id)" class="placement2">
        <a v-bind:href="'/comForm/'+comment.id"> <i class="fa-solid fa-pencil"></i> </a>

        <i class="fa-solid fa-xmark" @click="suppCom(comment.id)"></i>
      </div>
    </div>
    <div v-if="(Boolean(isAdmin) || (userId == User.id))" class="form-row">
      <a v-bind:href="'/postForm/'+id" class="buttonModif"> Modification Publication </a>
      <button @click="suppPost()" class="buttonSupp">Supression de Post</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "content", "User", "Comments", "image"],
  emits: ["commentCreated"],
  data() {
    return {
      comData: false,
      userId: null,
      isAdmin: false,
      comView: null,
      comImage: null,

    };
  },
  created() {
    this.isAdmin = localStorage.getItem("isAdmin") == 'true' ? true : false;
    console.log(this.isAdmin)
    this.userId = Number(localStorage.getItem("userId"));

  },
  methods: {
    suppPost() {
      fetch(process.env.VUE_APP_BASE_API + "post/" + this.id, {
        method: "DELETE",
        headers: {
          Authorization: "bearer: " + localStorage.getItem("token"),
        },
      }).then(() => {
        this.$emit("commentCreated");

      });
    },
    createCom() {
      if (this.comView != null) {
        let formData = new FormData();
        formData.append("content", this.comView);
        if (this.comImage != null) {
          formData.append("image", this.comImage);
        }

        formData.append("postId", this.id);
        formData.append("UserId", this.userId);

        fetch(process.env.VUE_APP_BASE_API + "comment", {
          method: "POST",
          headers: {
            Authorization: "bearer: " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then(() => {
            this.comView = "";
            this.comImage = "";
            this.$emit("commentCreated");
          })
          .catch(() => alert("Veuillez re essayer plus tard "));
      }
    },
    updateImageCom(e) {
      this.comImage = e.target.files[0];
    },
    suppCom(id){  
      fetch(process.env.VUE_APP_BASE_API + "comment/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "bearer: " + localStorage.getItem("token"),
        },
      }).then(() => {
        console.log("Supprimer un commentaire");
        this.$emit("commentCreated");
      });
    }
  },
};
</script>

<style scoped>
.card2 {
  max-width: 100%;
  width: 540px;
  background: linear-gradient(90deg, #d1515a 80%, #091f43 100%);
  border-radius: 16px;
  padding: 32px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.cardCreate2 {
  max-width: 100%;
  width: 540px;
  background: #b4b4b4;
  border-radius: 16px;
  padding: 32px;
  margin: 20px;
}

.buttonModif {
  background: #df8e93;
  color: rgb(5, 2, 2);
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  width: 40%;
  padding: 16px;
  transition: 0.4s background-color;
  margin: 10px;
}
.buttonModif:hover {
  cursor: pointer;
  background: #b4b4b4;
}
.buttonSupp {
  background: #091f43;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  width: 40%;
  padding: 16px;
  transition: 0.4s background-color;
  margin: 10px;
}
.buttonSupp:hover {
  cursor: pointer;
  color: black;
  background: #b4b4b4;
}
.placement {
  display: flex;
  justify-content: end;
}
.placement2 {
  display: flex;
  justify-content: space-around;
}
@media only screen and (min-width: 280px) and (max-width:800px) { 
 


 .buttonModif {
  font-weight: 600;
  font-size: 10px;
  width: 40%;
  padding: 16px;
  margin-top: 30px;
}

.buttonSupp {
  font-weight: 600;
  font-size: 10px;
  width: 60%;
  padding: 16px;
  margin-top: 30px;
}

}
</style>
