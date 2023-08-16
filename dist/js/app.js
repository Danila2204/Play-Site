const [questionButton, helpButton, errorButton] = document.querySelectorAll(".button_primary");

const joinModal = $.modal({
  title: "Свяжитесь с нами",
  content: `
  <p class="text text_modal">
      Связаться с нами можно через разные соцсети, нажав кнопку “Вступить”. Вступая в наше движение вы себя ничем не обязываете,
      а лишь имеете возможность обоснованно покритиковать нашу работу и помочь в исправление неточностей в ней. Особо желающие
      могут вступить в нашу команду и быть создателями следующих продуктов. Наше движение - товарищество, поэтому мы против любого
      угнетения и предпологаем равный раздел результатов труда.
  </p>
  `,
  closable: true,
  footerButtons: [
  {
    text: "Вступить",
    type: "modal",
    textType: "a",
    hrefText: "https://t.me/+7AENvxC6HCphMjAy",
    handler() {
        joinModal.close();
      }
    }
  ],
  onOpen: true,
  onClose: true
});

helpButton.addEventListener("click", joinModal.open);