// const renderWorkout = () => {
//   axios.get('http://localhost:3000/member')
//   .then((response) => {
//     for (let i = 0; i < response.data.length; i++) {
//       document.getElementById('getMember').innerHTML = response.data[i].workout
    
//     }
//   })
// }

const showAllMembers = () => {
    axios.get('http://localhost:3000/member')
    .then((response) => {
      document.getElementById('getMember').innerHTML = response.data.map((aluno) => {
        return (
        `<tr>
        <td>${aluno.name}</td>
        <td>${aluno.age}</td>
        <td></td>
        `
      )
      }).join('')
      console.log(response);
    })
}
showAllMembers()

const openModal = () => {
  var modal = document.getElementById("myPopup");
  modal.style.display = "block";
}

const closeModal = () => {
  var modal = document.getElementById("myPopup");
  modal.style.display = "none";
}

window.onclick = (event) => {
  var modal = document.getElementById("myPopup");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
