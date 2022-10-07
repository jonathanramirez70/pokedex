var page = 1;
var itemsPerPage = 20;
let promiseList = [];
let loading = false;
const getList = () => {
	const limit = itemsPerPage;
	const offset = (page - 1) * itemsPerPage; 
	axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
		.then(response => {
			response.data.results.forEach(item => promiseList.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)));
			Promise.all(promiseList).then(response => {
				response.forEach(item => {
					draw(item.data);
				});
				loading = false;
				promiseList = [];
				loader(false);
			});
		});
}

const draw = (pokemon) => {
	let dg = document.getElementById('dgList');
	dg.innerHTML += `
		<div class="col-3 mb-2">
			<a href="details.html?pokemon=${pokemon.id}" class="text-decoration-none">
				<div class="card bg-black">
					<h5 class="card-title text-center text-light">${pokemon.name}</h5>
					<img src="${pokemon.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="...">
				</div>
			</a>
		</div>
	`;
}

const getPokemonData =  async (name) => {
	const pokemon =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
	return pokemon.data;
}

const loader = (show) => {
	let loaderDiv = document.getElementById('loader');
	if(show) {
		loaderDiv.classList.remove('d-none');
	} else {
		loaderDiv.classList.add('d-none');
	}
}

const handleInfiniteScroll = () => {
	const endOfPage = (window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
	console.log((window.innerHeight + window.pageYOffset)  +"==>"+document.body.offsetHeight );
	if (endOfPage && !loading) {
		loading = true;
		  page ++;
		  loader(true);
	  	getList();
	}
};

window.addEventListener("scroll", handleInfiniteScroll);
window.addEventListener('load', async () => {
	getList();
	//list.sort((a,b) => a.id - b.id );
	//draw(list);
});
