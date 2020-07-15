$(document).ready(function () {
  const loginModal = document.getElementById("exampleModal1");
  const loginModalInstance = M.Modal.init(loginModal, { dismissible: true });

  const registerModal = document.getElementById("exampleModal");
  const registerModalInstance = M.Modal.init(registerModal, {
    dismissible: true,
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    console.log("hi");
    const newUser = {
      email: $("#exampleInputEmail1").val().trim(),
      password: $("#exampleInputPassword1").val().trim(),
    };
    loginUser(newUser).then(() => {
      console.log(newUser);
      window.location.replace("/collection")
    });
  });

  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    const newUser = {
      email: $("#exampleInputEmail").val().trim(),
      password: $("#exampleInputPassword").val().trim(),
    };
    registerUser(newUser).then(() => location.replace("/"));
  });

  $(".signupBtn").on("click", function () {
    registerModalInstance.open();
  });

  $(".loginBtn").on("click", function () {
    loginModalInstance.open();
  });

  $("#loginCancel").on("click", function () {
    loginModalInstance.close();
  });

  $("#registerCancel").on("click", function () {
    registerModalInstance.close();
  });
})

const loginUser = (userObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/auth/login",
      data: userObj,
    }).then(
      (res) => resolve({ msg: "success" }),
      (err) => reject(err)
    );
  });
};

const registerUser = (userObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/auth/register",
      data: userObj,
    }).then(
      (res) => resolve(res),
      (err) => reject(err)
    );
  });
};