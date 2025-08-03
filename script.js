function valueSetteras() {
    gsap.set('#nav a', {y: "-100%", opacity: 0})
    gsap.set("#home span .child", {y: '100%'})  
    gsap.set("#home .row img", {opacity: 0})

    document.querySelectorAll('#Visual > g').forEach(function (group) {
        // group ke andar <g> hoga, uske andar <path> ya <polyline>
        const innerGroup = group.querySelector('g');
        const character = innerGroup?.querySelector('path, polyline');
      
        if (character && typeof character.getTotalLength === 'function') {
          const length = character.getTotalLength();
          character.style.strokeDasharray = length + "px";
          character.style.strokeDashoffset = length + "px";
        }
      });

}

function cardAnimation () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".imgrig .imgcntr:nth-child(1)", {
    x: "-30%",
    y: "-12%",
    rotate: -15
  }, {
    x: 70,
    y: 0,
    rotate: 4,
    scrollTrigger: {
      trigger: ".imgrig",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      scroller: "#main"
    }
  });

  gsap.fromTo(".imgrig .imgcntr:nth-child(2)", {
    x: "0%",
    y: "-4%",
    rotate: -4
  }, {
    x: 30,
    y: 0,
    rotate: 3,
    scrollTrigger: {
      trigger: ".imgrig",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      scroller: "#main"
    }
  });

  gsap.fromTo(".imgrig .imgcntr:nth-child(3)", {
    x: "24%",
    y: "14%",
    rotate: 6
  }, {
    x: 12,
    y: 0,
    rotate: 2,
    scrollTrigger: {
      trigger: ".imgrig",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      scroller: "#main"
    }
  });
}

function revealToSspan() {
    document.querySelectorAll('.reveal').forEach(function(elem){
        let parent = document.createElement('span');
        let child = document.createElement('span');
    
        parent.classList.add('parent');
        child.classList.add('child');
    
        child.innerHTML = elem.innerHTML;
        parent.appendChild(child);
        console.log(parent);
    
        elem.innerHTML = "";
        elem.appendChild(parent);
    
    })
}

function loaderAnimation() {
    var tl = gsap.timeline();
tl.from('#loader .child span', {
    x: 100,
    duration: .5,
    stagger: .2,
    delay: 0.4,
    ease: Power3.easeInOut
})
.to('#loader .parent .child', {
    y: "-100%",
    duration: 0.5,
    delay: 0.2,
    ease: Circ.easeInOut,
    onComplete: function () {
      animateHomePage();
    } 
})
.to('#loader', {
    height: 0,
    duration: 0.6,  
    delay: -.2,
    ease: Circ.easeInOut,

})
.to('#green', {
    height: "100%",
    top: 0,
    duration: 0.5,
    delay: -.8,
    ease: Circ.easeInOut
})
.to('#green', {
    height: '0%',
    duration: .8,
    delay: -.3,
    ease: Circ.easeInOut,

    
})
.to('#black', {
    height: "100%",
    top: 0,
    duration: 0.5,
    delay: -.8,
    ease: Circ.easeInOut,

})
.to("#home .parent .child", {
        y: 0,
        stagger: .1,
        duration: 0.5,
        ease: Expo.easeInOut
    })
.to('#black', {
    height: '0%',
    duration: .6,
    delay: -.3,
    ease: Circ.easeInOut
});
}

function animateSvg() { 
      gsap.set('#Visual > g > g > path, #Visual > g > g > polyline', function (i, target) {
        const length = target.getTotalLength();
        target.style.strokeDasharray = length;
        target.style.strokeDashoffset = length;
      });
      
      gsap.to('#Visual > g > g > path, #Visual > g > g > polyline', {
        strokeDashoffset: 0,
        duration: 3,
        ease: "expo.inOut",
        delay: -0.6 ,
      });
      
}

function animateHomePage () {
    var tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: .05,
        ease: Expo.easeInOut
    })

    tl.to("#home .row img", {
        opacity: 1,
        duration:  0.5,    
        ease: Expo.easeInOut,
        onComplete: function(){
            animateSvg();
        }
    })  
}


// function locomotive() {
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true,
// });
// }

function locomotiveScrollInit() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  scroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  // ❗❗ Important: Give a tiny delay to let locomotive finish
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}
function cardShow() {
  const cursorChildren = document.querySelector("#cursor").children;

  document.querySelectorAll('.cnt').forEach(function (cnt) {
    let showingImg = null;

    cnt.addEventListener("mousemove", function (e) {
      const index = e.target.dataset.index;

      if (index !== undefined) {
        // Hide all cursor children first
        for (let i = 0; i < cursorChildren.length; i++) {
          cursorChildren[i].style.opacity = 0;
        }

        // Show and move the current one
        const activeCursor = cursorChildren[index];
        activeCursor.style.opacity = 1;
        activeCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;



        showingImg = activeCursor;
      }
    });

    cnt.addEventListener("mouseleave", function (e) {
      if (showingImg) {
        showingImg.style.opacity = 0;
        showingImg = null;
        e.target.style.filter = "grayscale(0)";
      }
    });
  });
}
cardShow();

function hoverEffect0() {
  const images = document.querySelector("#images-flex");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#B4BACF";
  document.querySelectorAll(".cnt1").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
    });
  });
}
hoverEffect0();

function hoverEffect1() {
  const images = document.querySelector("#images-flex");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#F3A2B0";
  document.querySelectorAll(".cnt2").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
    });
  });
}
hoverEffect1();

// New Section Second 
function cardShownew() {
  const cursorChildren = document.querySelector("#cursornew").children;

  document.querySelectorAll('.cntnew').forEach(function (cnt) {
    let showingImg = null;

    cnt.addEventListener("mousemove", function (e) {
      const index = e.target.dataset.index;

      if (index !== undefined) {
        // Hide all cursor children first
        for (let i = 0; i < cursorChildren.length; i++) {
          cursorChildren[i].style.opacity = 0;
        }

        // Show and move the current one
        const activeCursor = cursorChildren[index];
        activeCursor.style.opacity = 1;
        activeCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;



        showingImg = activeCursor;
      }
    });

    cnt.addEventListener("mouseleave", function (e) {
      if (showingImg) {
        showingImg.style.opacity = 0;
        showingImg = null;
        e.target.style.filter = "grayscale(0)";
      }
    });
  });
}
cardShownew();

function hoverEffectnew0() {
  const imagesone = document.querySelector("#images-flexnew-one");
  const images = document.querySelector("#images-flexnew");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#DCCCC0";
  document.querySelectorAll(".cntnew1").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
        imagesone.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
      imagesone.style.backgroundColor = "";
    });
  });
}
hoverEffectnew0();

function hoverEffectnew1() {
  const images = document.querySelector("#images-flexnew");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#F3A2B0";
  document.querySelectorAll(".cntnew2").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
    });
  });
}
hoverEffectnew1();

// new one animation 3rd

function cardShowOne() {
  const cursorChildren = document.querySelector("#cursornew-one").children;

  document.querySelectorAll('.cntnew-one').forEach(function (cnt) {
    let showingImg = null;

    cnt.addEventListener("mousemove", function (e) {
      const index = e.target.dataset.index;

      if (index !== undefined) {
        // Hide all cursor children first
        for (let i = 0; i < cursorChildren.length; i++) {
          cursorChildren[i].style.opacity = 0;
        }

        // Show and move the current one
        const activeCursor = cursorChildren[index];
        activeCursor.style.opacity = 1;
        activeCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;



        showingImg = activeCursor;
      }
    });

    cnt.addEventListener("mouseleave", function (e) {
      if (showingImg) {
        showingImg.style.opacity = 0;
        showingImg = null;
        e.target.style.filter = "grayscale(0)";
      }
    });
  });
}
cardShowOne();

function hoverEffect0One() {
  const imagesone = document.querySelector("#images-flexnew");
  const images = document.querySelector("#images-flexnew-one");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#F3A2B0";
  document.querySelectorAll(".cnt1new-one").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
        imagesone.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
      imagesone.style.backgroundColor = "";
    });
  });
}
hoverEffect0One();

function hoverEffect1One() {
  const images = document.querySelector("#images-flexnew-one");
  let work = document.querySelector('#work');
  let feat = document.querySelector('#feat-work');

  let color = "#F8BB99";
  document.querySelectorAll(".cnt2new-one").forEach(function (cnt) {
    cnt.addEventListener("mouseenter", function (e) {
      
        images.style.backgroundColor = color;
        work.style.backgroundColor = color;
        feat.style.backgroundColor = color;
      
    });

    cnt.addEventListener("mouseleave", function () {
      images.style.backgroundColor = "";
      work.style.backgroundColor = "";
      feat.style.backgroundColor = "";
    });
  });
}
hoverEffect1One();



// locomotive boxes anmation 
function boxed() {
  // locomotive instance
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),  // or the main scroll container
  smooth: true
});

// tell ScrollTrigger to use these proxy methods
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed"
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

gsap.from(".ar-box", {
  scrollTrigger: {
    trigger: "#archive",
    scroller: "#main", // important if using locomotive
    start: "top 80%",
    end: "bottom 30%",
    scrub: 1,
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out",
  duration: 1.2
});
}
boxed();

function anc() {
  document.querySelectorAll(".recent-work-anc").forEach((anchor) => {
    anchor.addEventListener("mouseenter", () => {
      gsap.to(anchor, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    anchor.addEventListener("mouseleave", () => {
      gsap.to(anchor, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}
anc();

  // All anchor links inside .talk-btns
  const buttons = document.querySelectorAll(".talk-btns a");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.05,
        backgroundColor: "#fff",
        color: "#000",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        backgroundColor: "transparent",
        color: "#fff",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // time 

  
  




revealToSspan();
valueSetteras();
loaderAnimation();
locomotiveScrollInit()
cardAnimation();
// cardShow();
(function() {
  const el = document.getElementById("lc-time");
  if (!el) return;

  function updateLocalTime() {
    // option‑based formatting بہتر ہے کیونکہ locale‑sensitive
    const timeText = new Date().toLocaleTimeString(undefined,
      { hour: "2-digit", minute: "2-digit", hour12: false }
    );

    el.textContent = `My local Time ${timeText}`;
  }

  updateLocalTime();              // پہلی بار replace کریں
  setInterval(updateLocalTime, 1000);  // ہر ایک سیکنڈ بعد update کریں
})();







