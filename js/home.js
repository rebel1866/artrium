document.addEventListener("DOMContentLoaded", init);

function init() {
  header.init();
  signIn.init();
  slideAnimation.initSlides();
  newPaintings.buildNewPaintings();
  tabs.buildTabs();
  feedbacks.buildFeedbacks();
  cart.init();
}
