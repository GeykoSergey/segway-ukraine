const ratings = document.querySelectorAll(".rating");

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive;
  let ratingValue;

  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    console.log(rating);
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);

    setActiveRatingWidth();

    if (rating.classList.contains("rating__set")) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  function setActiveRatingWidth(index = ratingValue.innerHTML) {
    console.log(index);
    const ratingActiveWidth = index / 0.05;
    console.log(ratingActiveWidth);
    ratingActive.style.width = `${ratingActiveWidth}%`;
    // console.log(ratingActive);
  }

  
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");

    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      console.log(ratingItem);
      ratingItem.addEventListener("mouseenter", function (event) {
        console.log("mouseenter");
        initRatingVars(rating);
        setActiveRatingWidth(ratingItem.value);
      });

      ratingItem.addEventListener("mouseleave", function (event) {
        setActiveRatingWidth();
      });

      ratingItem.addEventListener("click", function (event) {
        initRatingVars(rating);

        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setActiveRatingWidth();
        }
      });
    }
  }

  // =============================================================

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains("rating__sending")) {
      rating.classList.add("rating__sending");

      let response = await fetch("rating.json", {
        method: "GET",

        //body: JSON.stringify({
        //	userRating: value
        //}),
        //headers: {
        //	'content-type': 'application/json'
        //}
      });

      if (response.ok) {
        const result = await response.json();
        const newRating = result.newRating;
        ratingValue.innerHTML = newRating;
        setActiveRatingWidth();

        rating.classList.remove("rating__sending");
      } else {
        alert("Ошибка!!!");
        rating.classList.remove("rating__sending");
      }
    }
  }
}
