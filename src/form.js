'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  /**
   * блок с перемеными для работы с формой review-form
   */
  var reviewForm = document.querySelector('.review-form');

  var rating = reviewForm.elements['review-mark'];

  var nameField = reviewForm.elements['review-name'];
  var feedbackField = reviewForm.elements['review-text'];

  var hintsContainer = reviewForm.querySelector('.review-fields');
  var hintName = hintsContainer.querySelector('.review-fields-name');
  var hintFeedback = hintsContainer.querySelector('.review-fields-text');

  var submitBtn = reviewForm.querySelector('.review-submit');

  /**
   * начальные значения формы review-form
   */
  nameField.required = true;

  function validateForm() {

    /**
     * делаем поле отзыва обязательным в зависимости от
     * выставленной оценки
     */
    // true только, если рейтинг ниже 3
    feedbackField.required = rating.value < 3;

    /**
     * создаем переменные isNameValid и isFeedbackValid, равные true,
     * если соответствующие поля заполнены, и false, если не заполнены
     */
    var isNameValid = nameField.value;

    var isFeedbackValid = !feedbackField.required || feedbackField.value;

    /**
     * убираем подсказку в блоке hintsContainer (или блок целиком) в зависимости от
     * соответствия условию:
     * добавляем класс 'invisible', когда поле будет заполнено, вне зависимости от рейтинга
     * ( это поле обязательно для заполнения всегда)
     */
    hintName.classList.toggle('invisible', isNameValid);

    /**
     * добавляем класс 'invisible' только в том случае, если поле перестанет быть обязательным
     * для заполнения, или уже заполнено
     */
    hintFeedback.classList.toggle('invisible', isFeedbackValid);

    /**
     * добавляем класс 'invisible', если:
     * поле имени заполено, а поле отзыва заполнять не обязательно, или
     * заполнены оба поля (имени и отзыва), и поле отзыва обязательно для заполнения
     */
    hintsContainer.classList.toggle('invisible', isNameValid && isFeedbackValid);

    /**
     * добавляем атрибут 'disabled', если:
     * поле имени не заполено (при этом поле отзыва не обязательно для заполнения), или
     * не заполнены оба поля (имени и отзыва), при этом поле отзыва обязательно для заполнения
     */
    submitBtn.disabled = !(isNameValid && isFeedbackValid);
  }

  validateForm();

  nameField.addEventListener('input', validateForm);

  feedbackField.addEventListener('input', validateForm);

  for (var i = 0; i < rating.length; i++) {
    rating[i].addEventListener('change', validateForm);
  }

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
