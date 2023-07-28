const URL = "https://kind-cyan-abalone-sari.cyclic.app/"


Render(`${URL}/employees`)
function Render(url) {
    fetch(url)
        .then(async (res) => {
            try {
                let data = await res.json()
                return { data, status: res.status }
            } catch (error) {
                console.log(error.message)
                alert(error)
            }
        })
        .then((res) => {
            console.log(res)
            if (res.status == 200) {
                RenderTable(res.data)
               
            } else {
                alert(res.data.msg)
            }
        })
}

function RenderTable(data) {
    let list = CreateList(data.employees, data.page)
    document.getElementById("data-cont").innerHTML = list.join(" ")
}

function CreateList(employees, page) {
    let count = 1
    let list = employees.map((el) => {
        return `
    <tr>
        <td>${count++}</td>
        <td>${el.name}</td>
        <td>${el.title}</td>
        <td>${el.department}</td>
        <td>RS. ${el.annualSalary}</td>
        <td> <button class="Edit-btn" onclick="Edit('${el._id}','${el.name}','${el.title}','${el.department}','${el.annualSalary}')"> Edit </button><button class="Del-btn" onclick="Delete('${el._id}')" >Delete</button></td>
    </tr>
        `
    })

    return list
}


// .......................Add Employee.............................
const addEmployeeBtn = document.getElementById('add-employee-btn');
const addEmployeeForm = document.getElementById('add-employee-form');
const employeeForm = document.getElementById('employee-form');



function showAddEmployeeForm() {
    addEmployeeForm.style.display = 'block';
    addEmployeeBtn.style.display = 'none';
}

function hideAddEmployeeForm() {
    addEmployeeForm.style.display = 'none';
    addEmployeeBtn.style.display = 'block';
}

function addEmployee(event) {
    event.preventDefault();

    const name = document.getElementById('first-name').value;
    const title = document.getElementById('title-name').value;
    const department = document.getElementById('department').value;
    const annualSalary = document.getElementById('salary').value;

    
 

    fetch(`${URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, title, department, annualSalary }),
    })
        .then(async (res) => {
            try {
                let data = await res.json()
                return { data, status: res.status }
            } catch (error) {
                console.log(error)
                alert(error)
            }

        })
        .then((res) => {
            if (res.status == 201) {
                alert(res.data.msg)
                hideAddEmployeeForm();
                employeeForm.reset();
                Render(`${URL}/employees`)
            }else{
                alert(res.data.msg)
                employeeForm.reset();
            }

        })
        .catch((error) => console.error(error));
}

addEmployeeBtn.addEventListener('click', showAddEmployeeForm);
employeeForm.addEventListener('submit', addEmployee);




// .......................Edit Employee.............................
const editEmployeediv = document.getElementById('edit-employee');
const editemployeeForm = document.getElementById('edit-employee-form');



function Edit(id,name,title,department,salary) {
    editEmployeediv.style.display = 'block';
    document.getElementById('e-first-name').value=name;
    document.getElementById('e-title-name').value=title;
    document.getElementById('e-department').value=department;
    document.getElementById('e-salary').value=salary;
    document.getElementById("edit-submit").setAttribute("data-id",id)
}

function hideAddEmployeeForm() {
    editEmployeediv.style.display = 'none';
}

function editEmployee(event) {
    event.preventDefault();

    const name = document.getElementById('e-first-name').value;
    const title = document.getElementById('e-title-name').value;
    const department = document.getElementById('e-department').value;
    const annualSalary = document.getElementById('e-salary').value;
    const id=document.getElementById("edit-submit").dataset.id

    fetch(`${URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, title, department, annualSalary }),
    })
        .then(async (res) => {
            try {
                let data = await res.json()
                return { data, status: res.status }
            } catch (error) {
                console.log(error)
                alert(error)
            }

        })
        .then((res) => {
            if (res.status == 201) {
                alert(res.data.msg)
                hideAddEmployeeForm();
                employeeForm.reset();
                Render(`${URL}/employees`)
            }else{
                alert(res.data.msg)
                employeeForm.reset();
            }

        })
        .catch((error) => console.error(error));
}

editemployeeForm.addEventListener('submit', editEmployee);



// ......................Delete A Employee.................

function Delete(id){
    let res=window.confirm("Do You Really Want to Delete The User?")
    if(res){
        fetch(`${URL}/employees/${id}`, {
            method: 'DELETE'
        })
            .then(async (res) => {
                try {
                    let data = await res.json()
                    return { data, status: res.status }
                } catch (error) {
                    console.log(error)
                    alert(error)
                }
    
            })
            .then((res) => {
                if (res.status == 201) {
                    alert(res.data.msg)
                    Render(`${URL}/employees`)
                }else{
                    alert(res.data.msg)
                }
    
            })
            .catch((error) => console.error(error));
    }
}

