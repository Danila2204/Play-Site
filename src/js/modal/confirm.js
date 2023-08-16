$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy();
      }
    })

    setTimeout(modal.open, 100);
  })
}