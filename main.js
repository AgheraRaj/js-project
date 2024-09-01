window.addEventListener("load",async()=>{

    let animeData = JSON.parse(localStorage.getItem("anime"));

    if(animeData){
        // console.log("Data from localstorage");
        // closed.log(animeData);
        createCard(animeData);
    }
    else{
        const url = 'https://anime-manga-and-novels-api.p.rapidapi.com/anime?page=1&pageSize=20';
        const options = {
	    method: 'GET',
	    headers: {
		'x-rapidapi-key': '947c3e8970mshc61d081a27ff1c0p1500cajsne2f385fe9d2a',
		'x-rapidapi-host': 'anime-manga-and-novels-api.p.rapidapi.com'
	    }
        };

        try {
	        const response = await fetch(url, options);
	        const result = await response.json();
             localStorage.setItem("anime",JSON.stringify(result.items));
             createCard(result.items);
	        // console.log(result);
        }   catch (error) {
	        console.error(error);
        }
    }
    
})

function createCard(data) {
    const container = document.getElementsByClassName("grid-container")[0];

    data.forEach((anime) => (
        container.innerHTML += `<div class="w-72 border-solid border-2 border-[#FFAB4C] rounded-xl p-2">
            <div class="border-solid border-2 border-orange-200 rounded-md overflow-hidden">
                <img src="./Images&videos/anime.jpeg" alt="Anime">
            </div>
            <div class="flex flex-col justify-start my-5">
                <h1 class="text-xl truncate">${anime.slug}</h1>
                <p class="text-sm text-gray-500 truncate">${anime.description}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <span class="text-sm bg-green-500 border-solid border-[3px] rounded-md border-green-900 flex justify-center items-center gap-x-1 px-2">
                    <i class="fa-solid fa-signal"></i>
                    <p class="truncate">${anime.status}</p>
                </span>

                <span class="text-sm bg-red-500 border-solid border-[3px] rounded-md border-red-900 flex justify-center items-center gap-x-1 px-2">
                    <i class="fa-solid fa-tv"></i>
                    <p class="truncate">${anime.episodes}</p>
                </span>

                <span class="text-sm bg-indigo-500 border-solid border-[3px] rounded-md border-indigo-900 flex justify-center items-center gap-x-1 px-2">
                    <i class="fa-solid fa-download"></i>
                    <p class="truncate">${anime.aired}</p>
                </span>

                <span class="text-sm bg-yellow-500 border-solid border-[3px] rounded-md border-yellow-900 flex justify-center items-center gap-x-1 px-2">
                    <i class="fa-solid fa-clock"></i>
                    <p class="truncate">${anime.duration}</p>
                </span>
            </div>
            <div class="flex justify-center items-center mt-5">
                <button class="h-11 w-full bg-[#FFAB4C] rounded-md text-black font-semibold hover:border-2 border-orange-200">
                    <a href="${anime.id}" target="_blank">Watch Now</a>
                </button>
            </div>
        </div>`
    ));
}