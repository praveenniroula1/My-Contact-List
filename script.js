const apiUrl = "https://randomuser.me/api?";
let userArg = [];

const fetchUsers = async (params = "results=20") =>
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      userArg = data.results;
      displayUser();
    })
    .catch((error) => console.log(error));

const displayUser = (args = userArg) => {
  let str = "";
  args.map((user, i) => {
    str += ` <div class="col-md-6 col-lg-3 ">
    <div class="card bg-secondary text-light">
      <img src="${user.picture.large}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <div class="card-text">
        <ul class="list-group contact-icons">
            <li class="list-group-item"><i class="fa-solid fa-mobile-screen bg-success"> </i> ${user.cell}</li>
            <li class="list-group-item"><i class="fa-solid fa-envelope bg-secondary"></i> ${user.email}</li>
            <li class="list-group-item"><i class="fa-solid fa-location-dot"></i> ${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.country} ${user.location.postcode}</li>
           
        </ul>
        </div>
      </div>
    </div>
     </div>`;
  });

  document.getElementById("user-list").innerHTML = str;
  document.getElementById("user-count").innerText = args.length;
};

const handleOnChange = (e) => {
  console.log(e.value);
  const qryString = "results=20&gender=" + e.value;
  fetchUsers(qryString);
};

const handleOnSearch = (e) => {
  console.log(e.value);
  const str = e.value;
  const selectedUsers = userArg.filter((user) => {
    const name = user.name.first + " " + user.name.last;
    return name.toLowerCase().includes(str.toLowerCase());
  });
  displayUser(selectedUsers);
};

fetchUsers();
