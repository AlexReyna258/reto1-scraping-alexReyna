let btnscrap = document.getElementById('scrap-profile')

btnscrap.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
})

const scrapingProfile = () => {
  const wait = function (milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };


  const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")//nombre del perfil
  const elementWorkstation = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")//puesto de trabajo
  const elementLocation = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li.t-16.t-black.t-normal.inline-block")//locación
  
  const name = elementNameProfile ? elementNameProfile.innerText : '';
  const workstation = elementWorkstation ? elementWorkstation.innerText : '';
  const location  = elementLocation ? elementLocation.innerText : '';
  

  /*sobre mi - about*/
  window.scroll(0,1000);
  wait(2000);
  const elementMoreResume = document.getElementById('line-clamp-show-more-button')
  if (elementMoreResume) elementMoreResume.click();
  const elementAbout = document.querySelector('.pv-about__summary-text.mt4.t-14.ember-view > .lt-line-clamp__raw-line')
  const aboutme = elementAbout ? elementAbout.textContent : '';

  console.log({ name, workstation, location, aboutme });

  /*eduacion*/
  window.scroll(0,2000);
  wait(2000);
  const elementEducationEscuela = document.querySelectorAll('.pv-entity__degree-info>h3.pv-entity__school-name ')
  const elementEducationCarrera = document.querySelectorAll('.pv-entity__degree-info>p>span.pv-entity__comma-item ')
  const elementEducationPeriodo = document.querySelectorAll('.pv-entity__dates>span:nth-child(2)')
  
  for (let i = 0; i < elementEducationEscuela.length; i++) {
    let escuela = elementEducationEscuela[i] ? elementEducationEscuela[i].innerText : '-1';
    let carrera = elementEducationCarrera[i] ? elementEducationCarrera[i].innerText : '-2';
    let periodo = elementEducationPeriodo[i] ? elementEducationPeriodo[i].innerText : '-3';
    console.log({escuela,carrera,periodo});
  }

  /*Experiencias laborales*/
  const elementEmpresaNombre = document.querySelectorAll('.pv-entity__summary-info>p.pv-entity__secondary-title')
  const elementEmpresaFuncion = document.querySelectorAll('.pv-entity__summary-info>h3.t-16')
  
  for (let i = 0; i < elementEmpresaNombre.length; i++) {
    let empresaNombre = elementEmpresaNombre[i] ? elementEmpresaNombre[i].innerText : '-1';
    let empresaFuncion = elementEmpresaFuncion[i] ? elementEmpresaFuncion[i].innerText : '-2';
    console.log({empresaNombre,empresaFuncion});
  }
}