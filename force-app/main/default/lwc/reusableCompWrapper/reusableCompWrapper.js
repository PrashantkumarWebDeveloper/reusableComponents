import { LightningElement } from 'lwc';

export default class ReusableCompWrapper extends LightningElement {
    handleChange(event) {
        console.log("Custom Input field value: ", event.detail.value);
    }
}