// ======================= scrolling =======================

// ======================= scroll to up ====================

// let hashElement = document.getElementById(this.hash.substring(1))

const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1500) {
      upElem.classList.add("to-up-hidden");
    } else {
      upElem.classList.remove("to-up-hidden");
    }
  });

  const element = document.documentElement;
  const body = document.body;

  const calcScroll = () => {
    upElem.addEventListener("click", function (event) {
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);
      if (this.hash !== "") {
        event.preventDefault();
        let hashElement = document.querySelector(this.hash);
        console.log(this.hash);
        let hashElementTop = 0;

        while (hashElement.offsetParent) {
          hashElementTop += hashElement.offsetTop;
          hashElement = hashElement.offsetParent;
          // console.log(hashElement); - body
        }
        hashElementTop = Math.round(hashElementTop);
        smoothScroll(scrollTop, hashElementTop, this.hash);
      }
    });
  };

  const smoothScroll = (from, to, hash) => {
    let timeInterval = 1;
    let prevScrollTop;
    let speed;

    if (to > from) {
      speed = 30;
    } else {
      speed = -30;
    }

    let move = setInterval(function () {
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      if (
        prevScrollTop === scrollTop ||
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <= to)
      ) {
        clearInterval(move);
        history.replaceState(
          history.state,
          document.title,
          location.href.replace(/#.*$/g, "") + hash
        );
      } else {
        body.scrollTop += speed;
        element.scrollTop += speed;
        prevScrollTop = scrollTop;
      }
    }, timeInterval);
  };
  calcScroll();
};

scrolling(".to-up");
