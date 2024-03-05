import { LightningElement, api } from 'lwc';

export default class CustomInput extends LightningElement {
    @api label;
    @api helpText;
    @api value = null;
    @api name = "custom-input";

    //handling input change event, additionally focus, blur, input etc should also be handled for better user interaction
    handleChange(event) {
        this.dispatchEvent(new CustomEvent("change", { detail: { value: event.target.value, name: this.name } }));
    }

    get helpContent() {
        return `Help content for field ${this.label}`;
    }
}