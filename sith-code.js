const apiUrl = 'https://swapi.dev/api/people/';
let currentPage = 1;

// Function to fetch characters
function fetchCharacters(page = 1, query = '') {
  const url = query ? `${apiUrl}?search=${query}` : `${apiUrl}?page=${page}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCharacters(data.results);
      setupPagination(data.count, page);
    });
}

// Function to display character cards
function displayCharacters(characters) {
  const characterList = document.getElementById('galactic-character-list');
  characterList.innerHTML = characters
    .map(
      (character) => `
    <div class="character-card">
      <h3>${character.name}</h3>
      <button onclick="fetchCharacterDetails('${character.url}')">View Details</button>
    </div>
  `
    )
    .join('');
}

// Function to display character details
function fetchCharacterDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((character) => {
      const details = document.getElementById('holocron-details');
      document.getElementById('character-name').textContent = character.name;
      document.getElementById('character-height').textContent = character.height;
      document.getElementById('character-mass').textContent = character.mass;
      document.getElementById('character-gender').textContent = character.gender;
      document.getElementById('character-birth').textContent = character.birth_year;
      document.getElementById('character-eyes').textContent = character.eye_color;
      document.getElementById('character-skin').textContent = character.skin_color;

      document.getElementById('character-films').textContent = character.films.join(', ');
      document.getElementById('character-vehicles').textContent = character.vehicles.join(', ');
      document.getElementById('character-starships').textContent = character.starships.join(', ');

      details.classList.remove('hidden');
    });
}

// Toggles to show more info and show less info if wanted
document.getElementById('toggle-death-star').addEventListener('click', () => {
  const complexData = document.getElementById('complex-data');
  const button = document.getElementById('toggle-death-star');

  if (complexData.classList.contains('hidden')) {
    complexData.classList.remove('hidden');
    button.textContent = 'Show Less';
  } else {
    complexData.classList.add('hidden');
    button.textContent = 'Show More';
  }
});

// pagination
function setupPagination(totalItems, currentPage) {
  const totalPages = Math.ceil(totalItems / 10);
  const pagination = document.getElementById('galactic-pagination');
  pagination.innerHTML = `
  <div class="motofBTNS">
    <button class="nextBTN" ${currentPage === 1 ? 'disabled' : ''} onclick="fetchCharacters(${currentPage - 1})">Previous</button>
    <button class="previousBTN" ${currentPage === totalPages ? 'disabled' : ''} onclick="fetchCharacters(${currentPage + 1})">Next</button>
  </div>
    `;
}

// for search bar to become functional
document.getElementById('search-jedi').addEventListener('click', () => {
  const query = document.getElementById('force-search').value.trim();
  fetchCharacters(1, query);
});

fetchCharacters();
