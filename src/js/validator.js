const mainForm = document.querySelector(".main__form");
const typeMessage = document.querySelector(".input__datalist");
const typesMessage = document.querySelectorAll(".type-question__item");
const valueMessage = document.querySelector(".form__input");
const submit = document.querySelector(".form__submit");

const errorMessage = document.createElement("p");
errorMessage.classList.add("text");
errorMessage.style.color = "#f00";
errorMessage.innerText = "Введено неккоректное сообщение или не указан тип сообщения!";

const condition = /[а-яa-z]/i;
let isType = false;

mainForm.onsubmit = event => {
	for (let itemTypeMessage of typesMessage) {
		if (itemTypeMessage.value === typeMessage.value) {
			isType = true;
			break;
		}
	}

	if (!(condition.test(valueMessage.value) && isType)) {
		mainForm.appendChild(errorMessage);
		event.preventDefault();
		return false;
	}

	mainForm.submit();
	return true;
}