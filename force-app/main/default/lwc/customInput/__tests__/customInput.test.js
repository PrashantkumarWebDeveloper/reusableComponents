import { createElement } from 'lwc';
import CustomInput from 'c/customInput';

describe('c-custom-input', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Checks if label populated correctly', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        const label = "Test Label";
        element.label = label;
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();
        const labelElem = element.shadowRoot.querySelector('label');
        expect(labelElem).not.toBeNull();
        expect(labelElem.textContent).toBe(label);
    });

    it('Checks helptext element only apears when help text is provided', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();
        const helpTextElemNotAvailable = element.shadowRoot.querySelector('lightning-helptext');
        expect(helpTextElemNotAvailable).toBeNull();

        element.helpText = "I'm help text";

        //wait for component rendering
        await Promise.resolve();
        const helpTextElemAvailable = element.shadowRoot.querySelector('lightning-helptext');
        expect(helpTextElemAvailable).not.toBeNull();
    });

    it('Checks helptext shows correct value', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        const helpText = "I'm help text";
        element.helpText = helpText;
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();

        const helpTextElem = element.shadowRoot.querySelector('lightning-helptext');
        expect(helpTextElem).not.toBeNull();
        expect(helpTextElem.content).toBe(helpText);
    });

    it('Checks input change event generates change event on component', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        const inputValue = "Test Value";
        element.value = inputValue;
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();

        const inputElem = element.shadowRoot.querySelector('input');
        const changeHandler = jest.fn();
        element.addEventListener('change', changeHandler);

        inputElem.dispatchEvent(new CustomEvent('change'));

        expect(changeHandler).toHaveBeenCalled();
        expect(changeHandler.mock.calls[0][0].detail.value).toBe(inputValue);
    });

    it('Checks accessibility of label', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();

        const labelElem = element.shadowRoot.querySelector('label');
        await expect(labelElem).toBeAccessible();
    });

    it('Checks accessibility of help text', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        element.helpText = "I'm help text"
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();

        const helpTextElem = element.shadowRoot.querySelector('lightning-helptext');
        await expect(helpTextElem).toBeAccessible();
    });

    it('Checks accessibility of input', async () => {
        const element = createElement('c-custom-input', {
            is: CustomInput
        });

        element.label = "Test Label";
        element.helpText = "I'm help text"
        document.body.appendChild(element);

        //wait for component rendering
        await Promise.resolve();

        const inputElem = element.shadowRoot.querySelector('input');
        await expect(inputElem).toBeAccessible();
    });
});