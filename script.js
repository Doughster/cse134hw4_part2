class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
    :host {
      display: block;
    }

    .project-card {
      background-color: var(--card-bg-color, #eda7a7);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    img {
      max-width: 100%;
      height: auto;
      max-height: var(--image-max-height, 250px);
      margin-bottom: 15px;
    }

    </style>
      <div class="project-card">
        <h2></h2>
        <img src="" alt="Project Image">
        <p></p>
        <a href="#">Read More</a>
      </div>
    `;
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector('h2').textContent = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('image');
    this.shadowRoot.querySelector('img').alt = this.getAttribute('name');
    this.shadowRoot.querySelector('p').textContent = this.getAttribute('description');
    this.shadowRoot.querySelector('a').href = this.getAttribute('url');
  }
}
  
customElements.define('project-card', ProjectCard);
const cardContainer = document.getElementById('cardContainer');
const loadLocalButton = document.getElementById('loadLocal');
const loadRemoteButton = document.getElementById('loadRemote');
  
loadLocalButton.addEventListener('click', loadLocalData);
loadRemoteButton.addEventListener('click', loadRemoteData);
  
function loadLocalData() {
  const localData = JSON.parse(localStorage.getItem('projectData')) || [];
  displayCards(localData);
}
  
async function loadRemoteData() {
  try {
    const response = await fetch('https://my-json-server.typicode.com/Doughster/cse134b/db'); 
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    const remoteData = await response.json();
  
    if (Array.isArray(remoteData.projects)) {
      displayCards(remoteData.projects);
    } else {
      console.error('Fetched data is in the wrong format:', remoteData);
    }
  } catch (error) {
    console.error('Error fetching the remote data:', error);
  }
}
  
function displayCards(data) {
  cardContainer.innerHTML = '';
  data.forEach(project => {
    const card = document.createElement('project-card');
    card.setAttribute('name', project.name);
    card.setAttribute('image', project.image);
    card.setAttribute('description', project.description);
    card.setAttribute('url', project.url);
    cardContainer.appendChild(card);
  });
  
}