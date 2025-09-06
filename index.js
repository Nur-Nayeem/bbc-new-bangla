console.log("connencted");

const categoriesContainer = document.getElementById("categories-container")
const newsContainer = document.getElementById("news-container");
const bookMarksContainer = document.getElementById("book-marks-container");

let bookMarks = [];


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
             <div id="${article.id}" class="border border-gray-100 p-2 flex flex-col justify-between">
             <div>
                <img src='${article.image.srcset[5].url}' alt="news-img">
                <h2 class="text-xl font-medium my-2">${article.title}</h2>
            </div>
                <div class="flex justify-between items-center px-2">
                    <p class="font-light">${article.time}</p>
                    <i class="fa-regular fa-bookmark cursor-pointer" id="bookmark-icon"></i>
                </div>
            </div>
        `


    })
}

newsContainer.addEventListener("click", (e) => {
    if (e.target.id === "bookmark-icon") {
        // bookMarks.push()
        const img = e.target.parentNode.parentNode.children[0].children[0].src;
        const title = e.target.parentNode.parentNode.children[0].children[1].innerText;
        const id = e.target.parentNode.parentNode.id

        // const id = e.target.parentNode[0];
        const isPresent = bookMarks.find(obj => title === obj.title)
        if (isPresent === undefined) {
            bookMarks.push({
                id: id,
                img: img,
                title: title
            });
        }
        console.log(bookMarks);

        displayBookMarks(bookMarks)
        // console.log(bookMarks);


    }

})


const displayBookMarks = (bookMarks) => {
    bookMarksContainer.innerHTML = ""
    bookMarks.forEach(news => (
        bookMarksContainer.innerHTML += `
            <div class="bg-slate-50 rounded-sm">
                    <div class="flex gap-2">
                        <img class="w-2/5" src="${news.img}" alt="">
                        <a href="">
                            <h2 class="text-2xl">${news.title.toString().slice(0, 32).concat("...")}</h2>
                        </a>
                    </div>
                    <div class="w-full flex justify-end">
                        <button onclick="handleDeleteBookmark('${news.id}')" class="py-1 px-2 bg-gray-100 rounded-sm text-red-600 cursor-pointer">delete</button>
                    </div>
                </div>
        `
    ))

}

const handleDeleteBookmark = (id) => {
    const filterBookmarks = bookMarks.filter(deletNew => deletNew.id !== id
    )
    bookMarks = filterBookmarks;
    console.log(bookMarks);

    displayBookMarks(bookMarks);
    console.log("succes");

}

loadNewsByCategory("main")




