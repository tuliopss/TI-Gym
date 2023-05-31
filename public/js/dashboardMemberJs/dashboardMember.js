const url = 'http://localhost:3000/member';

const showAllMembers = () => {      
    axios.get(url)
    .then((response) => {
      document.getElementById('getMember').innerHTML = response.data.map((aluno) => {
        
        return (
        `<tr>
        <td>${aluno.name}</td>
        <td>${aluno.age}</td>
        <td>${aluno.objective}</td>
        <td><a class='btn btn-sm btn-outline-secondary' href='http://localhost:3000/member/edit/${aluno._id}' style='font-size:100px height: 10px'>&#9997;</a></td>    
        <td><button class='btn btn-sm btn-outline-secondary'onclick='removeMember("${aluno._id}")' style='font-size:100px height: 10px'>X</button></td>
        
        `
      )
      }).join('')
      const editButtons = document.getElementsByClassName('editButton');
          for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener('click', () => {
              const memberId = response.data[i]._id;
              openPopupEdit(memberId);
            });
          }
    })
   
   
    
}
showAllMembers();


const removeMember = (alunoId) => {
  axios.get(`${url}/${alunoId}`)
  .then((response) => {
    const aluno = response.data;
    axios.delete(`${url}/${alunoId}`, aluno);
    location.reload()
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


