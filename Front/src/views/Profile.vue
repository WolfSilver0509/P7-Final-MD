<template>
  <div class="card">
    <h1 class="card__title"> Mon Espace</h1>
    <p class="card__subtitle"> Ma page de profil se constitue de : </p>
    <p>  <b class="term">Prenom :</b>  {{firstName}} </p>
    <p><b class="term">Nom :</b> {{lastName}}</p>
    <p> <b class="term">Email :</b> {{email}}</p>
  <div class="form-row">
    <a href="/forum" class="button3"> Accés au forum Groupomania </a>
      <button @click="deleteUser()" class="button2">
        Supprimer son compte
      </button>
  </div>
    <div class="form-row">
      <button @click="logOut()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
   data: function () {
    return {
      
      email: "",
      firstName: "",
      lastName: "",
     
    };
  },
  mounted(){
    
    this.email=localStorage.getItem("email")
    this.firstName=localStorage.getItem("firstname")
    this.lastName=localStorage.getItem("lastname")

  },
  methods:{
    deleteUser(){
      fetch(process.env.VUE_APP_BASE_API + "user/"+localStorage.getItem("userId"), {
          method: "DELETE", 
          headers: {
            Authorization: "bearer: "+localStorage.getItem("token")  ,
          },})
          .then(()=>{
            this.logOut();
          })
          
    },
    logOut(){

      localStorage.clear();
      this.$router.push('/');
    },

  }
}

</script>

<style scoped>

p{
  padding: 10px;
  margin: 30px;
}
.button3 {
    background: #d1515a;
    color:black;
    border-radius: 50px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 60%;
    padding: 16px;
    transition: .4s background-color;
    margin: auto;
  }
  .button3:hover {
    cursor:pointer;
    color: black;
    background: #b4b4b4;
  }
     .button2 {
    background: #091f43;
    color:white;
    border-radius: 50px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 60%;
    padding: 16px;
    transition: .4s background-color;
    margin: 30px;
  }
  .button2:hover {
    cursor:pointer;
    color: black;
    background: #b4b4b4;
  }
</style>>
