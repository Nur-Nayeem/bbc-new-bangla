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
        <li id="${categoy.id}" class="hover:border-b-4 border-red-600 cursor-pointer">${categoy.title}</li>
        `
    })

    categoriesContainer.addEventListener("click", (e) => {

        if (e.target.localName === 'li') {
            const allLi = document.querySelectorAll('li');
            allLi.forEach(li => li.classList.remove("border-b-4"))
            e.target.classList.add("border-b-4")
            loadNewsByCategory(e.target.id)
        }

    })

}


//news showing functionality

const loadNewsByCategory = (categoryId) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
        .then(res => res.json())
        .then(news => {
            displayNewsByCategory(news.articles);
        })
}

const displayNewsByCategory = (articles) => {
    newsContainer.innerHTML = ""
    articles.forEach(article => {
        newsContainer.innerHTML += `
             <div class="border border-gray-100 p-2">
                <img src='${article.image.srcset[5].url}' alt="news-img">
                <h2 class="text-xl font-medium my-2">${article.title}}</h2>
                <p class="font-light">${article.time}</p>
            </div>
        `
        console.log(article);

    })
}


loadNewsByCategory("main")
