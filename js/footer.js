
fetch(`${baseUrl}categories_news?limit=7`)
    .then((response) => response.json())
    .then((res) => {
        const footerMenu = res.data;
        const listFooter = document.getElementById('footer-main');

        let htmlFooter = '';
        footerMenu.forEach((footer) => {
            htmlFooter += `
                    <ul>
                  <li><a href="category.html?id=${footer.id}">${footer.name}</a></li>
                </ul>
            `;
        });
        listFooter.innerHTML = htmlFooter;
    });

fetch(`${baseUrl}categories_news?page=2&limit=7`)
    .then((response) => response.json())
    .then((res) => {
        const footerMenu = res.data;
        const listFooter = document.getElementById('footer-main2');

        let htmlFooter = '';
        footerMenu.forEach((footer) => {
            htmlFooter += `
                    <ul>
                  <li><a href="category.html?id=${footer.id}">${footer.name}</a></li>
                </ul>
            `;
        });
        listFooter.innerHTML = htmlFooter;
    });