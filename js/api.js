// Función para mostrar de manera aleatoria los pokemon
      function shuffle(array) {
        let currentIndex = array.length, randomIndex;
    
        // Mientras queden elementos por mezclar
        while (currentIndex !== 0) {
    
          // Seleccionar un elemento restante...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          // Y cambiarlo con el elemento actual.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
      }
  
      // Obtener datos de la API de Pokémon
      fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Poner en aleatorio el orden de los Pokémon
          const shuffledData = shuffle(data.results);
          const results = document.getElementById('results');
          
          // Procesar y mostrar cada Pokémon
          shuffledData.forEach(pokemon => {
            fetch(pokemon.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                return response.json();
              })
              .then(pokemonData => {
                // Crear un contenedor para cada Pokémon
                const pokemonContainer = document.createElement('div');
                pokemonContainer.classList.add('pokemon-container');
  
                // Crear una imagen para mostrar Pokémon
                const img = document.createElement('img');
                img.src = pokemonData.sprites.front_default;
                pokemonContainer.appendChild(img);
                
                // Crear el nombre del Pokémon
                const p = document.createElement('p');
                p.textContent = pokemon.name;
                pokemonContainer.appendChild(p);
  
         
                results.appendChild(pokemonContainer);
              });
          });
        })
        .catch(e => {
          console.error('Error al cargar ' + e.message);
        });