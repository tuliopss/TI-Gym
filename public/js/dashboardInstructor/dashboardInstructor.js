const url = 'http://localhost:3000/instructor';
//<td>${instructor._id}</td>
const showAllInstructors = () => {
    axios.get(url)
    .then((response) => {
        document.getElementById('getInstructor').innerHTML = response.data.map((instructor) => {
            return (
            `<tr>
            <td>${instructor.name}</td>
            <td>${instructor.salary}</td>
            <td>${instructor.department}</td>
            
            <td><a class='btn btn-sm btn-outline-secondary' href='http://localhost:3000/instructor/edit/${instructor._id}' style='font-size:100px height: 10px'>&#9997;</a></td>    
            <td><button class='btn btn-sm btn-outline-secondary' onclick='removeInstructor("${instructor._id}")' style='font-size:100px height: 10px'>X</button></td>    

            `
          )
          }).join('')
          
          const editButtons = document.getElementsByClassName('editButton');
          for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener('click', () => {
              const instructorId = response.data[i]._id;
              openPopupEdit(instructorId);
            });
          }
        })
}
showAllInstructors()

const removeInstructor = (instructorId) => {
  axios.get(`${url}/${instructorId}`)
 .then((response) => {
     const instructor = response.data;
     axios.delete(`${url}/${instructorId}`, instructor)
     location.reload()
     
 })
}


const openPopupAdd = () => {
    let popup = document.getElementById("myPopupAdd");
    popup.style.display = "block";
}



const closePopupEdit = () => {
    let popup = document.getElementById("popupEdit");
    popup.style.display = "none";
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