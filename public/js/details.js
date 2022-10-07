const getPokemonData =  async (id) => {
	const pokemon =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const {data} = pokemon;
    console.log (data);
    document.getElementById("lblName").innerText = data.name;
    document.getElementById("img").src = data.sprites.other['official-artwork'].front_default;
    let abilities = data.abilities.map(ability => '<span class="badge rounded-pill text-bg-warning fs-5">'+ability.ability.name+'</span>').join(" ");  
    document.getElementById("abilities").innerHTML = abilities;
    document.getElementById("lblWeight").innerText = data.weight+" lb";
   
    drawSprites(data.sprites.back_default);
    if (data.sprites.back_default_female){
        drawSprites(data.sprites.back_default_female);
    }

    drawSprites(data.sprites.back_shiny);
    if (data.sprites.back_shiny_female){
        drawSprites(data.sprites.back_shiny_female);
    }

    drawSprites(data.sprites.front_default);
    if (data.sprites.front_default_female){
        drawSprites(data.sprites.front_default_female);
    }
    
    drawSprites(data.sprites.front_shiny);
    if (data.sprites.front_shiny_female){
        drawSprites(data.sprites.front_shiny_female);
    }
       
    const characteristic = await getCharacteristics(id);
    document.getElementById('lblCharacteristics').innerText = characteristic.description;
}

    const getCharacteristics = async (pokemon) => {
    let characteristics = await axios.get(`https://pokeapi.co/api/v2/characteristic/${pokemon}`);
    let characteristic = characteristics.data.descriptions.find((p) => p.language.name == 'es');
    return characteristic;
}

const drawSprites = (url) =>{
    let dgSprites =document.getElementById("sprites");
    dgSprites.innerHTML += `
        <div class="col-md-3 col-lg-2">
            <img src="${url}" class="w-200" alt="">
        </div>
        
    `;

}

document.addEventListener( 'DOMContentLoaded', function() {
    let queryString = window.location.search;
    queryString = queryString.substring(1);
    let params = null;
    queryString.split("&").forEach(p => {
        const temp = p.split("=");
        if(temp.length == 2) {
            if(!params) {
                params = {};
            }
            params[temp[0]] = temp[1];
        }
    });
    if (params && params.pokemon) {
        getPokemonData (params.pokemon);
    }
} );




