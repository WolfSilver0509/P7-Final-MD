<template>
  <div class="cardForum">
    <h1 class="card__title">Forum</h1>
    <p class="card__subtitle">Bienvenue sur le Forum de Groupomania !!!</p>
    <h2 class="card__title2">Crée votre publication:</h2>
    <div class="cardCreate">
      <div class="form">
        <div class="form-row-column">
          <input
            class="form-row__input"
            v-model="postView"
            type="text"
            placeholder="Titre"
          />
          <input
            class="form-row__input_Des"
            v-model="postView2"
            type="text"
            placeholder="Description du post"
          />
          <input type="file" @change="updateImagePost" />
        </div>
        <button @click="createPost()" class="button">Crée un Post</button>
      </div>
    </div>
    <h2 class="card__title2">Nos publications :</h2>
    <Post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind="post"
      @comment-created="reloadPost"
    >
    </Post>
    <div class="form-row">
      <button @click="logOut()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import Post from "./../components/Post.vue";
export default {
  
  name: "Forum",
  components: {
    Post,
  },
  data: function () {
    return {
      posts: [],
      comData: false,
      postView: null,
      postView2: null,
      postImage: null,
    };
  },
  created() {
    this.reloadPost();
  },
  methods: {
    reloadPost() {
      fetch(process.env.VUE_APP_BASE_API + "post/", {
        method: "GET",
        headers: {
          Authorization: "bearer: " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.posts = data;
          console.log(data);
        });
    },

    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },
    createPost() {
      if (this.postView != null && this.postView2 != null) {
        let formData = new FormData();
        formData.append("title", this.postView);
        formData.append("content", this.postView2);
        if (this.postImage != null) {
          formData.append("image", this.postImage);
        }

        formData.append("postId", this.id);
        formData.append("UserId", this.userId);

        fetch(process.env.VUE_APP_BASE_API + "post", {
          method: "POST",
          headers: {
            Authorization: "bearer: " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then(() => {
            this.postView = "";
            this.postView2 = "";
            this.postImage = "";
            this.reloadPost();

            
          })
          .catch(() => alert("Veuillez re essayer plus tard "));
      }
    },
    updateImagePost(e) {
      this.postImage = e.target.files[0];
    },
    
  },
};
</script>

<style scoped>
.cardCreate {
  max-width: 100%;
  width: 540px;
  background: linear-gradient(90deg, #091f43 4%, #d1515a 100%);
  border-radius: 16px;
  padding: 32px;
  margin: 20px;
}

.buttonAddImage {
  background: white;
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
.buttonAddImage:hover {
  cursor: pointer;
  background: #b4b4b4;
  color: black;
}
.cardForum {
  max-width: 100%;
  width: auto;
  background: white;
  border-radius: 16px;
  padding: 32px;
}

.form-row__input_Des::placeholder {
  color: #aaaaaa;
}

.card__title2 {
  text-align: start;
  font-weight: 600;
}
.userCom {
  text-align: end;
  font-weight: 500;
}

.buttonAddImage2 {
  background: #cfdd0c;
  color: rgb(5, 2, 2);
  border-radius: 50px;
  font-weight: 200;
  font-size: 15px;
  border: none;
  width: 30%;
  padding: 16px;
  transition: 0.4s background-color;
  margin: 10px;
}
.buttonAddImage2:hover {
  cursor: pointer;
  background: #8a0696;
  color: rgb(255, 255, 255);
}


</style>
