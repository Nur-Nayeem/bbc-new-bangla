console.log("connencted");

const categoriesContainer = document.getElementById("categories-container")
const newsContainer = document.getElementById("news-container");



// categories functionality
const loadCategories = () => {
    fetch("https://news-api-fs.vercel.app/api/categories").then(res => res.json()).then(categories => {
        const allCategories = categories.categories;
        displayCategories(allCategories);
    }).catch(err => console.log(err)
    )

}

loadCategories();

const displayCategories = (categories) => {
    categories.forEach(categoy => {
        categoriesContainer.innerHTML += `
        <li class="hover:border-b-4 border-red-600 cursor-pointer">${categoy.title}</li>
        `
    })

}


