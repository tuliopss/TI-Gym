
const url = 'http://localhost:3000/instructor';

const showAllInstructors = () => {
    axios.get(url)
    .then((response) => {
        document.getElementById('getInstructor').innerHTML = response.data.map((instructor) => {
            return (
            `<tr>
            <td>${instructor.name}</td>
            <td>${instructor.salary}</td>
            <td>${instructor.department}</td>
            <td>${instructor._id}</td>
            <td><button class='btn btn-sm btn-outline-secondary' onclick='openPopupEdit("${instructor._id}")' style='font-size:100px height: 10px'>&#9997;</button></td>    
            <td><button class='btn btn-sm btn-outline-secondary' onclick='removeInstructor("${instructor._id}")' style='font-size:100px height: 10px'>X</button></td>    
            
            `
          )
          }).join('')
          console.log(response);
          
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

const openPopupAdd = () => {
    let popup = document.getElementById("myPopupAdd");
    popup.style.display = "block";
}
const openPopupEdit = (instructorId) => {
    let popup = document.getElementById("popupEdit");
    let nameInstructor = document.getElementById('nameInstructor')
    let salaryInstructor = document.getElementById('salaryInstructor')
    let departmentInstructor = document.getElementById('departmentInstructor')

    popup.style.display = "block";
    axios.get(`${url}/${instructorId}`)
    .then((response) => {
        const instructor = response.data;
                
        nameInstructor.value = instructor.name
        salaryInstructor.value = instructor.salary
        departmentInstructor.value = instructor.department
    })
}

const updatedInstructor = (instructorId) => {
    let newName = document.getElementById("nameInstructor").value;
    let newSalary = document.getElementById("salaryInstructor").value;
    let newDepartment = document.getElementById("departmentInstructor").value;

    const updateInstructor = {
        newName,
        newSalary,
        newDepartment
    }
    axios.patch(`${url}/${instructorId}`, updateInstructor)
    .then('Atualização realizada')
}

const editBtn = document.getElementById('editBtn');
editBtn.onsubmit = (event) => {
    event.preventDefault()
    updatedInstructor(instructorId)
}

const removeInstructor = (instructorId) => {
     axios.get(`${url}/${instructorId}`)
    .then((response) => {
        const instructor = response.data;
        axios.delete(`${url}/${instructorId}`, instructor)
        location.reload()
        
    })
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