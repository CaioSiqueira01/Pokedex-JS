const pokemonList = document.querySelector('#pokemonList')
const loadMoreButton = document.querySelector('#loadMoreButton')
const limit = 100
let offset = 0
const textInput = document.querySelector('#search')

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=> {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`).join('')
    })
}

function filterPokemons(searchTerm) {
    const pokemons = pokemonList.querySelectorAll('.pokemon');
    
    pokemons.forEach(pokemon => {
        const name = pokemon.querySelector('.name').textContent.toLowerCase();
        
        if (name.includes(searchTerm)) {
            pokemon.style.display = 'block';
        } else {
            pokemon.style.display = 'none';
        }
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

textInput.addEventListener('input', () => {
    const searchTerm = textInput.value.toLowerCase();
    filterPokemons(searchTerm);
});