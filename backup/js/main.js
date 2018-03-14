console.log('Starting up');

var gProjs;


initPage();
function initPage() {
    gProjs = createProjs();
    console.log(createProjs());
    renderProjs();
}


function createProj(id, name, title, desc, imgFormat,publishedAT, labels,link) {
    return {
        "id": id,
        "name": name,
        "title": title,
        "desc": desc,
        "url": "img/portfolio/" + id + "." + imgFormat,
        "publishedAt": publishedAT,
        "labels": labels,
        "link": link,
    }

}

function createProjs() {
    var projs = [];
    projs.push(createProj('balloons', 'Balloons Pop', 'Pop the balloons', 'Balloon pop really boring game',
        'png','01/03/2018', ['Games', 'mouse event'],'projs/balloon-pop/index.html'));
    projs.push(createProj('inPic', 'In Picture', 'Choose the correct picture', 'Another really boring game',
        'png','02/03/2018', ['Games', 'mouse event'],'projs/05 - Ex05-in-picture/index.html'));
        projs.push(createProj('Sokoban', 'Sokoban', 'Move the boxes to the right spot!', 'Took long time to bulid it!',
        'gif','03/03/2018', ['Games', 'mouse event'],'projs/Sokoban/sokoban.html'));

    return projs;
}



function renderProjs() {
    var proj;

    gProjs.forEach(function (proj, idx) {
        //inset the portfolio
        var strHtml = `<div class="col-md-4 col-sm-6 portfolio-item">
        
     <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx+1}">
     <div class="portfolio-hover">
     <div class="portfolio-hover-content">
     <i class="fa fa-plus fa-3x"></i>
     </div>
    </div>
    <img class="img-fluid roundedGa stretchedBorder" src="${proj.url}" alt="">
     </a>
     <div class="portfolio-caption">
     <h4>${proj.name}</h4>
     <p class="badge badge-primary">${proj.labels[0]}</p>
    </div>
    <img class="img-fluid" src="img/style/shadow.png">
     </div>`
        console.log(proj.name);
        var portfolioContainer = $('.projs');
        portfolioContainer.append(strHtml);
        
        //insert the modals
        var strModal = ` <div class="portfolio-modal modal fade" id="portfolioModal${idx+1}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto maxSize" src="${proj.url}" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${proj.publishedAt}</li>
                  <li>Category: ${proj.labels[0]}</li>
                </ul>
                <div class="d-block">
                <a href="${proj.link}" class="btn btn-success text-dark btn-lg active mb-4" role="button" aria-pressed="true">Enter!</a>
                </div>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
        var modalContainer = $('.modalContainer');
        modalContainer.append(strModal);
    });

}

function sendMailto() {
    var valEmail = $('#form_email').val();
    var valSubject = $('#form_subject').val();
    var valMsg = $('#form_message').val();

    window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+valEmail+'&su='+valSubject+'&body='+valMsg+'','_blank');
}


