import "./product.scss";
import { getCase } from "../../utils/get-case";

const CLASS_NAMES = {
  hovered: "product--hovered",
  selected: "product--selected",
  disabled: "product--disabled",
};

const TASTES = {
  with: {
    "foie-gras": "с фуа-гра",
    chicken: "с курой",
    fish: "с рыбой",
  },
  description: {
    "foie-gras": "Печень утки разварная с артишоками.",
    chicken: "Филе из цыплят с трюфелями в бульоне.",
    fish: "Головы щучьи с чесноком да свежайшая сёмгушка.",
  },
};

document.querySelectorAll(".product").forEach((product) => {
  const _thisEl = product;
  const _cardEl = _thisEl.querySelector(".product__card");
  const _headingEl = _thisEl.querySelector(".product__heading");
  const _tasteEl = _thisEl.querySelector(".product__taste");
  const _detailsEl = _thisEl.querySelector(".product__details");
  const _portionsEl = _detailsEl.children[0];
  const _giftEl = _detailsEl.children[1];
  const _weightEl = _thisEl.querySelector(".product__weight-value");
  const _descriptionEl = _thisEl.querySelector(".product__description");
  const _selectBtn = _thisEl.querySelector(".product__select-btn");

  const taste = _thisEl.dataset.taste;
  const weight = _thisEl.dataset.weight;
  const headingDefaultText = _headingEl.textContent;
  const portions = weight * 20;
  const giftNumber = weight < 1 ? 1 : weight;
  const description = TASTES.description[taste];
  const descriptionDisabled = `Печалька, ${TASTES.with[taste]} закончился.`;

  let isDisabled = _thisEl.className.includes(CLASS_NAMES.disabled);
  let isSelected = _thisEl.className.includes(CLASS_NAMES.selected);
  let isHovered = false;

  [_cardEl, _selectBtn].forEach((el) =>
    el.addEventListener("mouseenter", cardMouseEnterEventHandler)
  );
  [_cardEl, _selectBtn].forEach((el) =>
    el.addEventListener("mouseleave", cardMouseLeaveEventHandler)
  );

  [_cardEl, _selectBtn].forEach((el) =>
    el.addEventListener("click", cardClickEventHandler)
  );

  function cardMouseEnterEventHandler() {
    if (isDisabled) return;
    if (isSelected) {
      _headingEl.textContent = "Котэ не одобряет?";
    }
    _thisEl.classList.add(CLASS_NAMES.hovered);
    isHovered = true;
  }

  function cardMouseLeaveEventHandler() {
    if (isSelected && isHovered) {
      _headingEl.textContent = headingDefaultText;
    }
    _thisEl.classList.remove(CLASS_NAMES.hovered);
    isHovered = false;
  }

  function cardClickEventHandler() {
    if (!isSelected) {
      _thisEl.classList.remove(CLASS_NAMES.hovered);
      isHovered = false;
    } else {
      _headingEl.textContent = headingDefaultText;
    }
    _thisEl.classList.toggle(CLASS_NAMES.selected);
    isSelected = !isSelected;
  }

  function fillHtml() {
    _tasteEl.textContent = TASTES.with[taste];
    _portionsEl.innerHTML = `<span class="product__detail-items">${portions}</span> порций`;
    _giftEl.innerHTML =
      (giftNumber > 1
        ? `<span class="product__detail-items">${giftNumber}</span> `
        : "") + `${getCase(giftNumber, ["мышь", "мыши", "мышей"])} в подарок`;
    _weightEl.textContent = weight.toString().replace(".", ",");
    _descriptionEl.textContent = isDisabled ? descriptionDisabled : description;
  }

  fillHtml();
});
