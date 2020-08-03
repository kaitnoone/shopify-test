(function () {
  const questions = document.querySelectorAll(".faqs dt");
  console.log(questions);
  Array.prototype.forEach.call(questions, (question) => {
    let btn = question.querySelector("button");
    let target = question.nextElementSibling;

    btn.onclick = () => {
      let expanded = btn.getAttribute("aria-expanded") === "true" || false;
      btn.setAttribute("aria-expanded", !expanded);
      btn.classList.toggle("open");
      target.hidden = expanded;
    };
  });
})();
