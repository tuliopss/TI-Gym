const url = 'http://localhost:3000/member';


const showAllMembers = () => {
    axios.get(url)
    .then((response) => {
      document.getElementById('getMember').innerHTML = response.data.map((aluno) => {
        
        return (
        `<tr>
        <td>${aluno.name}</td>
        <td>${aluno.age}</td>
        <td>${aluno._id}</td>
        
        <td><button class="btn btn-sm btn-outline-secondary" onclick=openPopupWorkout()>View workout</button></td>
        `
      )
      }).join('')
      console.log(response);
    })
}
showAllMembers();


const showWorkout = () => {
  //Requisiçao p pegar ID
  axios.get(url)
  .then((response) => {
    response.data.map((member) => {
      const memberId = member._id;
    
      //Requisicao p pegar o workout baseado no id
      axios.get(`${url}/${memberId}/workout`)
      .then((response) => {
        //console.log(response)
        document.getElementById('popupWorkout').innerHTML = response.data.map((exercise) => {
          console.log(exercise);
          return (
            `<span>Exercicio</span
            <p>${exercise.name}</p>
            <span>Séries</span
            <p>${exercise.set}</p>
            <span>Repetições</span
            <p>${exercise.rep}</p>
            <hr>
            `
          )
          
          }).join('')
        })  
    })
})

}


    
  
  


//http://localhost:3000/member/${aluno._id}/workout
const openPopupAdd = () => {
  let popup = document.getElementById("myPopupAdd");
  popup.style.display = "block";
}

const closePopupAdd = () => {
  let popup = document.getElementById("myPopupAdd");
  popup.style.display = "none";
}

window.onclick = (event) => {
  let popup = document.getElementById("myPopupAdd");
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

const openPopupWorkout = () => {
  let popup = document.getElementById("myPopupWorkout");
  popup.style.display = "block";
  showWorkout()
}

const closePopupWorkout = () => {
  let popup = document.getElementById("myPopupWorkout");
  popup.style.display = "none";
}

window.onclick = (event) => {
  let popup = document.getElementById("myPopupWorkout");
  if (event.target == popup) {
    popup.style.display = "none";
  }
};