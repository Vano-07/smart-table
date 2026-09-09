export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }));
        });
    };

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action && action.target && action.target.name === 'clear') {
            const button = action.target;
            const parent = button.parentElement;
            const input = parent.querySelector('input');
            if (input) {
                const fieldName = button.dataset.field;
                input.value = '';
                if (state[fieldName] !== undefined) {
                    state[fieldName] = '';
                }
            }
        }

        // Формируем объект фильтра для запроса к серверу
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}