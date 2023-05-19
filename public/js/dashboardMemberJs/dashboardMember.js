const url = 'http://localhost:3000/member';
const btnAddExercise = document.getElementById('addExercise')

const showAllMembers = () => {      
    axios.get(url)
    .then((response) => {
      document.getElementById('getMember').innerHTML = response.data.map((aluno) => {
        
        return (
        `<tr>
        <td>${aluno.name}</td>
        <td>${aluno.age}</td>
        <td>${aluno._id}</td>
        <td><a href= '${url}/${aluno._id}/workout'>View workout</a></td>
        
        
        `
      )
      }).join('')
      console.log(response);
    })
   
   
    
}
showAllMembers();

let workout = []
const postExercise = (e) => {
  e.preventDefault()

  let exerciseName = document.getElementById('exerciseName').value
  let exerciseSet = document.getElementById('exerciseSets').value
  let exerciseRep = document.getElementById('exerciseReps').value
  let userName = document.getElementById('exampleInputUsername').value
  let userAge = document.getElementById('exampleInputAge1').value

  console.log(exerciseName, exerciseSet, exerciseRep);
  
  const exercise = {
    exerciseName,
    exerciseSet,
    exerciseRep
  }
  
  workout.push(exercise)
  console.log(exercise);
  console.log(workout)

  const newMember = {
    userName,
    userAge,
    workout : workout || []
  }
  axios.post(url, newMember)
  .then(response => console.log(response))
  .catch(error => console.log('erro'+error))
}



btnAddExercise.addEventListener('click', postExercise)




// const showWorkout = () => {
//   //Requisiçao p pegar ID
//   axios.get(url)
//   .then((response) => {
//     response.data.map((member) => {
//       const memberId = member._id;
    
//       //Requisicao p pegar o workout baseado no id
//       axios.get(`${url}/${memberId}/workout`)
//       .then((response) => {
        
//         document.getElementById('popupWorkout').innerHTML = response.data.map((exercise) => {
//           console.log(`click no id ${exercise}`);

//           return (
//             `
//             <span>Exercicio</span
//             <p>${exercise.name}</p>
//              <span>Séries</span
//              <p>${exercise.set}</p>
//              <span>Repetições</span
//              <p>${exercise.rep}</p>
//              <hr>
             
//             `
//           )
        
//           }).join('')
          
//         })  
//     })
// })

// }


    
  
  


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


