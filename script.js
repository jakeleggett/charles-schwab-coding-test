console.log('script.js is running...');

let cardContainer = document.querySelector('.js-card-container-wrapper');

fetch("data.json")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        console.log("response: ", responseJson);

        let theContent = `<h1>${responseJson.deck_heading}</h1>`;


        theContent += `<div class="cards-container">`;
        for (let i = 0; i < responseJson.cards.length; i++) {

            let linksContent = "";
            if (responseJson.cards[i].links.length > 0) {
                linksContent = `<div class="card-link-outer-wrap">`;

                for (let j = 0; j < responseJson.cards[i].links.length; j++) {
                    linksContent += `
                        <a href="${responseJson.cards[i].links[j].href}">${responseJson.cards[i].links[j].text}</a>
                    `;
                }

                linksContent += `</div>`;
            }

            theContent += `
                <div class="card-wrapper">
                    <div class="card-img-wrap">
                        <img src="${responseJson.cards[i].image}" alt="${responseJson.cards[i].title}">
                    </div>
                    <div class="card-title-wrap">
                        ${responseJson.cards[i].title}
                    </div>
                    <p class="card-description-wrap">
                        ${responseJson.cards[i].body}
                    </p>
                    ${linksContent}
                </div>
            `;
        }
        theContent += `</div>`;

        cardContainer.innerHTML = theContent;
    })
    .catch((error) => {
        console.error(`ERROR: ${error}`)
    });