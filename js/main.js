if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.log('service Worker: Registered'))
      .catch(err => console.log('Service Worker: Error: ${error}'));
  });
}


function initMap() {

  const loc = {
    lat: 29.760427,
    lng: -95.369804
  };

  const map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc
  });

  const marker = new google.maps.Marker({
    position: loc,
    map: map
  });
}

window.addEventListener('scroll', function () {
  if (window.scrollY > 150) {
    document.querySelector('#navbar').style.opacity = 0.9;
  } else {
    document.querySelector('#navbar').style.opacity = 1;
  }
});




$('#navbar a, .btn').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate({
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});