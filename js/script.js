class FormValidate {
    constructor(form, options) {
        const defaultOptions = {
            classError : 'error'
        };

        this.form = form;
        this.options = Object.assign({}, defaultOptions, options);

        this.form.setAttribute('novalidate', 'novalidate');

        this.prepareElements();
    }

    getFields() {
        return this.form.querySelectorAll('[required]');
    }

    prepareElements() {
        const elements = this.getFields();

        elements.forEach(el => {
            if (el.nodeName.toLowerCase() === 'input') {
                const type = element.type.toLowerCase();

                switch (type) {
                    case "text":
                        el.addEventListener('input', e => this.testInputText(e.target));
                    break;
                    case "email":
                        el.addEventListener('input', e => this.testInputEmail(e.target));
                    break;
                    case 'url':
                        el.addEventListener('input', e => this.testInputURL(e.target));
                    break;
                    case 'checkbox':
                        el.addEventListener('click', e => this.testInputCheckbox(e.target));
                    break;
                    case 'radio':
                        el.addEventListener('click', e => this.testInputCheckbox(e.target));
                    break;
                }
            }

            if (el.nodeName.toLowerCase() === 'textarea') {
                el.addEventListener('input', e => this.testInputText(e.target));
            }

            if (el.nodeName.toLowerCase() === 'select') {
                el.addEventListener('change', e => this.testInputSelect(e.target));
            }
        });
    }

    testInputText(input) {
        let inputIsValid = true;
        const pattern = input.getAttribute('pattern');

        if (pattern !== null) {
            //tutaj moglibyśmy skorzystać z checkValidity()
            const reg = new RegExp(pattern, 'gi');

            if (!reg.test(input.value)) {
                inputIsValid = false;
            }
        } else {
            if (input.value === '') {
                inputIsValid = false;
            }
        }

        if (inputIsValid) {
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
        }
    }

    showFieldValidation(input, inputIsValid) {
        if (!inputIsValid) {
            input.parentElement.classList.add(this.options.classError);
        } else {
            input.parentElement.classList.remove(this.options.classError);
        }
    }

    testInputEmail(input) {
        const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

        if (!mailReg.test(input.value)) {
            this.showFieldValidation(input, false);
            return false;
        } else {
            this.showFieldValidation(input, true);
            return true;
        }
    }

    testInputURL(input) {
        const urlReg = new RegExp('^https?:\/\/.+', 'i');
        if (!urlReg.test(input.value)) {
            this.showFieldValidation(input, false);
            return false;
        } else {
            this.showFieldValidation(input, true);
            return true;
        }
    }

    testInputSelect(select) {
        if (select.value === '' || select.value === '-1') {
            this.showFieldValidation(select, false);
            return false;
        } else {
            this.showFieldValidation(select, true);
            return true;
        }
    }

    testInputCheckbox(input) {
        const name = input.getAttribute('name');
        const group = input.form.querySelectorAll(`input[name="${name}"]:checked`);

        if (group.length) {
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
        }
    }
}