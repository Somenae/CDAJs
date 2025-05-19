export default class ManageDom {
    /**
     * @param {String} markupName 
     * @param {String} text 
     * @param {String} parent 
     * @param {Object[]} attributes=[]
     */
    createMarkup(markupName, text, parent, attributes = []) {
        const markup = document.createElement(markupName);
        markup.textContent = text;
        parent.appendChild(markup);
        for (const attribute of attributes) {
            for (const key in attribute) {
                markup.setAttribute(key, attribute[key]);
            }
        }
        return markup;
    }
}