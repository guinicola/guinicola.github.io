(function () {
    var toggler = document.querySelector('.theme-toggler input[type="checkbox"]'),
        root = document.documentElement,
        currentTheme = localStorage.getItem('theme') || "dark";
    
        if (currentTheme == "light") toggler.removeAttribute('checked');
              
      else toggler.checked = "true"; 
              root.setAttribute('data-theme', currentTheme);
              
              toggler.addEventListener('change', toggleTheme, false);
              
      function toggleTheme(e) {
        if (this.checked) {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
                }
            
                else {
                    root.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');

                }
        }
})();



const listProjects = (data) => {
    return data.map((project) => {
        return (
        `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-5">
            <article onclick="getProjectData('${ project.id }')">
                <h2>
                    ${ project.name }
                </h2>
                <img src='${ project.cover }' alt=''/>
            </article>
        </div>
        `
        )
    }).join('')
}

const projects = document.querySelector('.projects');
projects.innerHTML = listProjects(dataProjects);


function getProjectData(id) { 
    const title = document.querySelector('.modal-title');
    const image = document.querySelector('.modal-body .image');
    const descrip = document.querySelector('.modal-body .description');
    const techs = document.querySelector('.modal-body .techs span');
    const url = document.querySelector('.modal-footer .linkUrl');

    title.innerHTML = dataProjects[id].name;
    image.innerHTML = "<img src='"+dataProjects[id].cover+"'>";
    descrip.innerHTML = dataProjects[id].description;
    url.setAttribute('href',dataProjects[id].url);
    techs.innerHTML = "";

    dataProjects[id].techs.forEach(function(nome, i) {
        console.log("assets/icons/"+nome);
        techs.innerHTML+="<img title='"+nome.toUpperCase()+"' src='assets/icons/"+nome+".svg'> ";
    })
    

    var myModal = new bootstrap.Modal(document.getElementById('projectModal'))
    myModal.show();
    gtag("event", "view_item", {
        // Parâmetros no nível do evento
        items: [
          {
            item_id: id,
            item_name: title,
          }
        ]
      });
}