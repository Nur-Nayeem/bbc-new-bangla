console.log("connencted");

const categoriesContainer = document.getElementById("categories-container")
const newsContainer = document.getElementById("news-container");
const bookMarksContainer = document.getElementById("book-marks-container");
const detailNewsContainer = document.getElementById("detail-news-box");

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
    loader()
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
        .then(res => res.json())
        .then(news => {
            displayNewsByCategory(news.articles);
        })
        .catch(error => showError())
}

const displayNewsByCategory = (articles) => {
    console.log(articles.length);

    newsContainer.innerHTML = ""
    if (articles.length === 0) {
        showEmptyMessage()
        return
    }
    articles.forEach(article => {
        newsContainer.innerHTML += `
             <div id="${article.id}" class="border border-gray-100 p-2 flex flex-col justify-between w-full">
             <div onclick="displayDetaileNews('${article.id}')">
                <img class="w-full" src='${article.image.srcset[5].url}' alt="news-img">
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
        const img = e.target.parentNode.parentNode.children[0].children[0].src;
        const title = e.target.parentNode.parentNode.children[0].children[1].innerText;
        const id = e.target.parentNode.parentNode.id

        const isPresent = bookMarks.find(obj => title === obj.title)
        if (isPresent === undefined) {
            e.target.classList.remove('fa-regular')
            e.target.classList.add('fa-solid')
            bookMarks.push({
                id: id,
                img: img,
                title: title
            });
        }
        else {
            handleDeleteBookmark(id)
            e.target.classList.add('fa-regular')
            e.target.classList.remove('fa-solid')
        }

        displayBookMarks(bookMarks)
    }

})


const displayBookMarks = (bookMarks) => {
    bookMarksContainer.innerHTML = ""
    bookMarks.forEach(news => (
        bookMarksContainer.innerHTML += `
            <div class="bg-slate-50 rounded-sm">
                    <div class="flex gap-2" onclick="displayDetaileNews('${news.id}')">
                        <img class="w-2/5" src="${news.img}" alt="">
                        
                            <h2 class="text-2xl">${news.title.toString().slice(0, 32).concat("...")}</h2>
                        
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

    displayBookMarks(bookMarks);

}
const loader = () => {
    newsContainer.innerHTML = `
        <div class="h-[75vh] col-span-3 flex items-center justify-center"><span
                    class="loading loading-dots loading-xl"></span></div>
    `
}

const showError = () => {
    newsContainer.innerHTML = `
     <div class="h-[75vh] col-span-3 flex items-center justify-center text-red-600">Something went wrong</div>
    `
}

const showEmptyMessage = () => {
    newsContainer.innerHTML = `
     <div class="h-[75vh] col-span-3 flex items-center justify-center text-red-600">No news found for this category</div>
    `
}


const displayDetaileNews = (id) => {

    detailNewsContainer.innerHTML = `
    <div class="h-[75vh] col-span-3 flex items-center justify-center"><span
                    class="loading loading-dots loading-xl"></span></div>
    `
    fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
        .then(res => res.json())
        .then((news) => {
            console.log(news.article.content);
            let title = news.article.title;
            let img = news.article.images[0].url;
            let timestamp = news.article.timestamp;
            let content1st = news.article.content[0];

            let [, ...content] = news.article.content;


            detailNewsContainer.innerHTML = `
             <div id="modalContainer" class="w-full">
                    <h2 class="text-2xl font-bold">${title}</h2>
                    <img class="my-4 w-full" src="${img}" alt="news image">
                    <div class="my-2 text-xl font-medium">
                        <h3>নূর নাঈম</h3>
                        <p>বিবিসি নিউজ বাংলা</p>
                    </div>
                    <p class="my-2">${timestamp}</p>
                    <div>
                        <h4 class="text-lg font-medium my-2">${content1st}</h4>
                        <p class="text-lg text-justify">${content.join("<br><br>")}</p>
                    </div>
                </div>
                
     `
        }
        )


    detailsNews.showModal()
}


loader()

loadNewsByCategory("main")




