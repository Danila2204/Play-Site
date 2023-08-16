let closable;

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }

  const wrap = document.createElement("div");
  wrap.classList.add("modal__footer");

  buttons.forEach(button => {
    const $button = document.createElement("button");
    $button.classList.add(`button`);
    $button.classList.add(`button_${button.type}`);
  
    const textButton = document.createElement(`${button.textType || "p"}`);
    textButton.classList.add("button__text");
    textButton.classList.add(`button__text_${button.type}`);
    textButton.textContent = button.text;
    
    $button.addEventListener("click", button.handler || noop);
    wrap.appendChild($button);
    $button.appendChild(textButton);

    console.log(textButton.tagName)

    if (textButton.tagName.toLowerCase() == "a") textButton.setAttribute("href", button.hrefText);
  })

  return wrap;
}

function _createModal(options) {
  const modal = document.createElement("div");

  modal.classList.add("modal");
  modal.insertAdjacentHTML("afterbegin", `
      <div class="modal__overlay" data-close="true">
          <div class="modal__window">
              <div class="modal__header">
                  <h2 class="modal__title">${options.title || "Окно"}</h2>
                  ${options.closable ? `<span class=modal__close data-close="true">&times;</span>` : ""}
              </div>
              <div class="modal__content" data-content>
                  ${options.content || ""}
              </div>
          </div>
      </div>
  `);

  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));

  document.body.appendChild(modal);
  return modal;
}

function onClose() {
  console.log("Окно закрывается.");
}

function onOpen() {
  console.log("Окно открывается.");
}

function beforeClose() {
  return closable;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  closable = options.closable;

  const $modal = _createModal(options);

  let closing = false;

  const listener = event => {
    if (event.target.dataset.close) modal.close();
  }

  $modal.addEventListener("click", listener);

  const modal = {
    open() {
      !closing && $modal.classList.add("open");
      setTimeout(() => {
        if (typeof options.onOpen === "function") {
          onOpen();
        }
      }, 200)
    },
    close() {
      closing = true;

      $modal.classList.remove("open");
      $modal.classList.add("hide");

      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;

        if (typeof options.onClose === "function") {
          onClose();
        }
      }, ANIMATION_SPEED)
    },
    destroy() {
      closing = false;
      closable = false;
      $modal.classList.remove("open");
      $modal.classList.remove("hide");
      $modal.removeEventListener("click", listener);

      $modal.parentNode.removeChild($modal);
    },
    setContent(html = ``) {
      $modal.querySelector("[data-content]").innerHTML = html;

      return html;
    }
  }

  return modal;
};