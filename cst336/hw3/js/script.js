//Event listeners
document.querySelector("#searchBtn").addEventListener("click", displayPokemon);
document.querySelector("#pokemonInput").addEventListener("change", displayPokemon);

//functions
async function displayPokemon() {
    let pokemonName = document.querySelector("#pokemonInput").value.toLowerCase().trim();

    if(pokemonName.length == 0){
        document.querySelector("#pokedex").innerHTML = "<p>Please enter a Pokémon name or ID.</p>";
        return;
    }

    let url =`https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try{
        let response = await fetch(url);
        let data = await response.json();

        if(!data || data.detail == "Not found."){
            document.querySelector("#pokedex").innerHTML = "<p style='color:red;'>Pokémon not found.</p>";
            return;
        }

        let name = data.name;
        let id = data.id;
        let sprite = data.sprites.other["official-artwork"].front_default;

        let types = data.types.map(t=> t.type.name).join(", ");
        let abilities = data.abilities.map(a => a.ability.name).join(", ");

        let firstType = data.types[0].type.name;

        let stats = "";
        for (let s of data.stats){
            stats += `${s.stat.name}: ${s.base_stat}<br>`;
        }

        document.querySelector("#pokedex").innerHTML = `
            <h2>${name.toUpperCase()} (#${id})</h2>
            <div class="poke-container">
                <div class="poke-circle type-${firstType}">
                    <img src="${sprite}" alt="${name}">
                </div>
                <div class="poke-info type-${firstType}">
                    <p><strong>Type:</strong> ${types}</p>
                    <p><strong>Abilities:</strong> ${abilities}</p>
                    <p><strong>Height:</strong> ${data.height}</p>
                    <p><strong>Weight:</strong> ${data.weight}</p>
                    <h3>Stats</h3>
                    <p>${stats}</p>
                </div>
            </div>
        `;
    } catch(error){
        document.querySelector("#pokedex").innerHTML = "<p style='color:red;'>Error fetching Pokémon data.</p>";
    }
}
