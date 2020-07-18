const submitBtn = document.querySelector(`#submitBtn`);

$(document).ready(function () {

  $("#logForm").on("submit", (e) => {
    e.preventDefault();
    let pokemon = $("#nameInput").val();
    $("#nameInput").val("");
    $.ajax({
      type: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/ `,
      datatype: "JSON",
    }).then((response) => {
      console.log(response);
      //Name

      createLog(response.name)
        .then(() => renderLogs());


      //Type
      //console.log(response.types[0].type.name);
      // pokeType.textContent = `Type: ${response.types[0].type.name}`;
      //Image
      // pokeImage.src = response.sprites.front_default;
    });

  });

  const createLog = (name) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/logs/new",
        data: {
          name: name,
          // image: image,
          // type: type,
        },
      }).then((res) => {
        console.log(res);
        $("#nameInput").val("");
        logInstance.close();
        resolve("success");
      });
    });
  };

  const renderLogs = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/logs/user",
      }).then((logs) => {
        console.log(logs);
        $("#logsContainer").empty();
        logs.forEach((log) => {
          // , company, roast, description
          let { name } = log;
          if (name) {
            name = `<p>${name}</p>`;
          } else {
            name = "";
          }
          console.log(name);
          // $("#logsContainer").append(`
          // <div class="row">
          //   <div class="card brown darken-1">
          //     <div class="card-content white-text Pokemon-name"> 
          //     ${name}
          //     </div>
          //   </div>
          // </div>
          // `);

          $("#recent-cards").append(`
                  <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${name}<i class="material-icons right">more_vert</i></span>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
              <p></p>
            </div>
          </div>
                  `)
        });
        resolve("success");
      });
    });
  };

  $(".parallax").parallax();
  $(".sidenav").sidenav();

  const logModal = document.getElementById("newLogModal");
  const logInstance = M.Modal.init(logModal, { dismissible: true });

  renderLogs();

  $("#newLogBtn").on("click", () => logInstance.open());
  $("#logCancel").on("click", () => logInstance.close());


});
