var page = 1;
var itemsPerPage = 20;
const getList = async () => {
	const limit = itemsPerPage;
	const offset = (page - 1) * itemsPerPage; 
	let pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	let dg = document.getElementById('dgList');
	pokemons.data.results.forEach(async item => {
		pokemon = await getPokemonData(item.name);
		dg.innerHTML += `
			<div class="col-3 mb-2">
				<div class="card">
					<img src="${pokemon.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="...">
				</div>
			</div>
		`;
	});
}

const getPokemonData =  async (name) => {
	const pokemon =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
	return pokemon.data;
}

window.addEventListener('load', () => {
	getList();
});