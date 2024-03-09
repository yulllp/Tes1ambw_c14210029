var shareImageButton = document.querySelector('#install');
// var createPostArea = document.querySelector('#create-post');
// var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#det');
var id = sessionStorage.getItem('var')

function openCreatePostModal() {
  // createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.getRegistrations()
  //     .then(function(registrations) {
  //       for (var i = 0; i < registrations.length; i++) {
  //         registrations[i].unregister();
  //       }
  //     })
  // }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

// shareImageButton.addEventListener('click', openCreatePostModal);

// closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// Currently not in use, allows to save assets in cache on demand otherwise
function onSaveButtonClicked(event) {
  console.log('clicked');
  if ('caches' in window) {
    caches.open('user-requested')
      .then(function (cache) {
        cache.add('https://httpbin.org/get');
        cache.add('/src/images/sf-boat.jpg');
      });
  }
}

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  console.log(data)
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'col-12 col-lg-4';
  cardWrapper.innerHTML = `<img src="/src/images/${data.image}" class="img-fluid rounded custom-img" alt="...">`;

  var cardText = document.createElement('div');
  cardText.className = "col-12 col-lg-8";
  cardText.innerHTML = `<div class="title-text">
  ${data.title}
<div class="sub-text">
${data.detail}
</div>
<a href="index.html#workout" style="font-size: 15px; text-decoration: none; color: white;">
  Back to other Workouts
</a>
<div class="sub-text">
  To get our latest information, feel free to install our app on right top corner!
</div>`
  // var cardTitle = document.createElement('div');
  // cardTitle.className = 'mdl-card__title';
  // cardTitle.style.backgroundImage = 'url(' + data.image + ')';
  // cardTitle.style.backgroundSize = 'cover';
  // cardTitle.style.height = '180px';
  // cardWrapper.appendChild(cardTitle);
  // var cardTitleTextElement = document.createElement('h2');
  // cardTitleTextElement.style.color = 'white';
  // cardTitleTextElement.className = 'mdl-card__title-text';
  // cardTitleTextElement.textContent = data.title;
  // cardTitle.appendChild(cardTitleTextElement);
  // var cardSupportingText = document.createElement('div');
  // cardSupportingText.className = 'mdl-card__supporting-text';
  // cardSupportingText.textContent = data.location;
  // cardSupportingText.style.textAlign = 'center';
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = 'Save';
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  // cardWrapper.appendChild(cardSupportingText);
  // componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
  sharedMomentsArea.appendChild(cardText);
}

// function updateUI(data) {
//   clearCards();
//   createCard(data[id])
// }

console.log(!navigator.onLine)
console.log(localStorage.getItem(id) !== null)
clearCards();
if (!navigator.onLine || localStorage.getItem(id) !== null) {
  var storage_data = JSON.parse(localStorage.getItem(id));
  createCard(storage_data)
}

else {
  var url = `https://tes1ambw-30911-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      createCard(data)
      localStorage.setItem(id, JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(error)
      window.location.href = "offline.html"
    });
}