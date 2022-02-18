export class FilterComponent {
    min;
    max;
    colorFilters
    os

    constructor(filter, devices = []) {
        this.filterContainer = document.getElementById("filter");
        this.filterButton();
        this.filter = filter
        this.initDefaultValue(devices)
        this.renderFilter('color', this.colorFilters)
        this.renderFilter('os', this.os)
    }

    filterButton(){
        const imgFilter = document.querySelector('.img-filter-container');
        imgFilter.addEventListener('click', () => {
            const items = document.getElementById('items');
            if (items.classList.contains("display-filter")) {
                items.classList.remove('display-filter');
                this.filterContainer.classList.add('display-none')

            } else {
                items.classList.add('display-filter');
                this.filterContainer.classList.remove('display-none')

            }
        })
    }

    renderFilter(filterSelector, filtersProp) {
        let filterContent = this.filterContainer.querySelector(`.filter-${filterSelector}`)
        filterContent.innerHTML = '';
        filtersProp.forEach(item => {
            let filterRow = document.createElement("div");
            filterRow.classList.add('filter-row-col1')
            filterRow.innerHTML = `<span><input type="checkbox" data-filter-type="${filterSelector}" value="${item}">${item}</span>`
            filterContent.appendChild(filterRow)
        })
    }

    initDefaultValue(devices) {
        let colors = []
        let os = []
        devices.forEach(device => {
            if (!this.min) {
                this.min = device.price
            }
            if (!this.max) {
                this.max = device.price
            }
            if (this.min > device.price) {
                this.min = device.price
            }
            if (this.max < device.price) {
                this.max = device.price
            }
            colors = [...colors, ...device.color]
            if (device.os) {
                os.push(device.os)
            }
        })
        this.colorFilters = new Set(colors);
        this.os = new Set(os);
        const from = document.getElementById("price-from");
        const to = document.getElementById("price-to");
        from.value = this.min;
        from.max = this.max;
        from.min = this.min;
        to.value = this.max;
        to.max = this.max;
        to.min = this.min;

        this.filterContainer.querySelectorAll('.filter-section').forEach(filterSection => {
            let title = filterSection.querySelector('.filter-title')
            title.addEventListener('click', () => {
                let content = filterSection.querySelector('.filter-content')
                if (content.style.display === 'none') {
                    title.querySelector('img').style.transform = 'rotateZ(0deg)';
                    content.style.display = 'block';
                } else {
                    title.querySelector('img').style.transform = 'rotateZ(90deg)';
                    content.style.display = 'none';
                }
            })
        })
    }

    filterActionHandler(callback) {
        this.filterContainer.querySelectorAll("input").forEach(item => {
            item.onchange = (item.type === 'number') ?
                () => {
                    this.updateAndRenderInput(item);
                    callback();
                } :
                () => {
                    this.updateAndRender(item)
                    callback();
                };

        })
    }


    updateAndRenderInput(element) {
        this.filter.filterInputUpdate(element.value, element.dataset.filterType, element.dataset.filterProp)
    }


    updateAndRender(element) {
        this.filter.filterUpdate(element, element.dataset.filterType)
    }


}
