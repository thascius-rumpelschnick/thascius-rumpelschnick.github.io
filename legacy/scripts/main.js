'use strict'

// Close mobile menu on click outside of X
const mobileMenu = document.getElementById('mobile-menu')
mobileMenu.addEventListener('click', event => {
    let target = event.target
    let input = document.querySelector('#mobile-menu input')
    if (target !== input) input.click();
})

// Validate form
const handleForm = event => {
    event.preventDefault()
    clearFeedback('success')
    clearFeedback('error')

    let valid = true
    let formData = new FormData(form)

    for (let formField of formData) {
        let label = document.querySelector(`label[for="${formField[0]}"]`)

        if ('' === formField[1]) {
            renderValidationDiv(
                getFormField(formField[0]),
                `${label.textContent.charAt(0).toUpperCase() + label.textContent.substring(1, label.textContent.length - 1)} must not be empty!`
            )
            valid = false

        } else if (('email' === formField[0]) && !(formField[1].match('^[^@]+@[^@]+\.[^@]+$'))) {
            renderValidationDiv(
                getFormField(formField[0]),
                `"${formField[1]}" is no valid e-mail!`
            )
            valid = false

        } else if (('password' === formField[0]) && (8 > formField[1].length)) {
            renderValidationDiv(
                getFormField(formField[0]),
                `${label.textContent.charAt(0).toUpperCase() + label.textContent.substring(1, label.textContent.length - 1)} must contain at least 8 characters!`
            )
            valid = false

        }
    }

    if (valid) renderValidationDiv(form.lastChild)
}

const clearFeedback = className => {
    let errors = document.querySelectorAll(`div.${className}`)
    for (let error of errors) error.remove()
}

const getFormField = fieldName => document.querySelector(`form [name="${fieldName}"]`)

const renderValidationDiv = (formField, errorMessage = '') => {
    let feedbackDiv = document.createElement('div')
    feedbackDiv.className = 'feedback ' + ((errorMessage) ? 'error' : 'success')
    let feedbackText = document.createTextNode((errorMessage) ? errorMessage : 'I\'ll come back to you soon!');
    feedbackDiv.appendChild(feedbackText)
    formField.parentNode.appendChild(feedbackDiv)
}

const form = document.querySelector('form')

form.addEventListener('submit', handleForm)

form.addEventListener('reset', () => {
    form.reset()
    clearFeedback('success')
    clearFeedback('error')
})

// Date
const date = new Date();

const dateInput = document.getElementById('date')
dateInput.value = date.toISOString().substring(0, 10)

const currentYear = document.querySelector('footer span')
currentYear.innerHTML = date.getFullYear()
