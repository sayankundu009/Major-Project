function createh1() {
  let html = `<h1>Text</h1>`
  return html;
}

function createp() {
  let html = `<p>Text</p>`
  return html;
}


function createjumbotron() {
  let html = ` <div class="jumbotron m-0">
                    <h1 class="display-4" id="h1">Hello, world!</h1>
                    <p class="lead" >This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p class="lead" >
                    <button  class="btn btn-primary btn-lg" role="button">Learn more</button>
                    </p>
                </div>`;

  return html;

}

function createnavbar() {
  let html = ` <nav class="navbar navbar-expand-sm navbar-light">
    <a class="navbar-brand" href="javascript:void(0)">Brand</a>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="javascript:void(0)">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Contact</a>
        </li>
      </ul>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" >
        <button class="btn btn-outline-info my-2 my-sm-0" type="button">Search</button>
      </form>
    </div>
  </nav>`;

  return html;
}

function createheader() {
  let html = ` <header class="main-header">
                        <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 text-center">
                            <h1 class="font-weight-light">Vertically Centered Masthead Content</h1>
                            <p class="lead">A great starter layout for a landing page</p>
                            </div>
                        </div>
                        </div>
                </header>
                `;

  return html;


}



function createcol2() {
  let html = `
    <div class="container-fluid">
      <div class="row">
          <div class="col-6 bg-grey">
            <p class="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rerum libero, harum omnis mollitia obcaecati dolore vitae consequuntur veniam cupiditate error ullam maiores quam impedit et! Dolores maxime laborum sunt!
            </p>
          </div>
          <div class="col-6 bg-grey">
            <p class="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rerum libero, harum omnis mollitia obcaecati dolore vitae consequuntur veniam cupiditate error ullam maiores quam impedit et! Dolores maxime laborum sunt!
            </p>
          </div>
      </div>
    </div>
    `;

  return html;

}

function createbutton() {
  let html = `<button type="button" class="btn">Click me</button>`;
  return html;
}

function createcard() {
  let html = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://via.placeholder.com/286x180" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
  return html;
}
