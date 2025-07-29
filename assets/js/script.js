const sideMobNav = document.querySelector('.mobile-navigation');
const sideNav = document.querySelector('.side-nav-mobile');

function sideNavTangle() {

    //   if sideNav.style:'flex' then set it to 'none' else set it to 'flex'
    if (sideMobNav.style.display === 'flex') {
        sideMobNav.style.opacity = '0';
        sideNav.style.transform = 'translate(100%)';
        setTimeout(() => {
            sideMobNav.style.display = 'none';

        }, 100);

    } else {
        sideMobNav.style.display = 'flex';

        setTimeout(() => {
            sideMobNav.style.opacity = '1';
            sideNav.style.transform = 'translate(0%)';
        }, 100);
    }

}
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

fetch('assets/js/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {

        console.log(data.Shows[0].Title);
        let CurrentIndex = 0;
        function updateHeroContent() {
            heroImage.style.transition = 'background 0.5s ease-in-out';
            // linear-gradient(to right, var(--secondary-color), transparent), url('${data.Shows[CurrentIndex].Image}') center/cover
            heroImage.style.background = `url('${data.Shows[CurrentIndex].Image}')  center/cover `;
            heroContent.style.opacity = '0';
            heroContent.style.transition = 'opacity 0.5s ease-in-out';

            setTimeout(() => {
                heroContent.innerHTML = `
                <h1 class="title">${data.Shows[CurrentIndex].Title}</h1>
                <span class="date">${data.Shows[CurrentIndex].Date}</span>
                <span class="type">${data.Shows[CurrentIndex].Type}</span>
                <div class="buttons">
                <a target="_blank" href="${data.Shows[CurrentIndex].Link}" class="youtube-btn">
                    <i class="fa fa-play"></i>
                    Play On YouTube
                </a>
                <a target="_blank" href="${data.Shows[CurrentIndex].Link}" class="btn">
                    Show More
                    <i class="fa fa-angle-right"></i>
                </a>
                </div>
                <p class="description">
                ${data.Shows[CurrentIndex].Description}
                </p>
                `;
                heroContent.style.opacity = '1';
            }, 300);
        }

        updateHeroContent();

        setInterval(() => {
            CurrentIndex = (CurrentIndex + 1) % data.Shows.length;
            updateHeroContent();
        }, 10000);

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });