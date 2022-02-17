export class Filter {
    filter = {
        price: {from: 0, to: 0},
        color: [],
        memory: [],
        os: [],
        display: [],
    }
    isFilterEmpty = true;
    filterParmsHandler = {
        color: (val) => ({id: val}),
        memory: (val) => ({id: val}),
        os: (val) => ({id: val}),
        display: (val) => ({id: val, from: val.split("-")[0], to: val.split("-")[1]}),
    }

    constructor() {
    }

    filterInputUpdate(el, key, prop) {
        this.filter[key][prop] = el.value;
    }

    filterUpdate(el, key) {
        let defaultValue = el.value;
        if (el.checked) {
            let index = this.filter[key].findIndex(filterValue => filterValue.id === defaultValue)
            if (!index) {
                this.filter[key].push(this.filterParmsHandler[key](defaultValue));
            }
        } else {
            let index = this.filter[key].findIndex(filterValue => filterValue.id === defaultValue)
            if (index > -1) {
                this.filter[key].splice(index);
            }
        }
        this.isFilterEmpty = (this.filter[key].length === 0);
    }

    filtration(items) {
        return this.isFilterEmpty ? items : items.filter(device => this.filteredData(device));
    }

    filteredData(device) {
        let res = 0
        for (let key in this.filter) {
            switch (key) {
                case 'price':
                    res = (this.filter[key].from < device.price && this.filter[key].to > device.price) ? 1 : -1;
                    break;
                case 'color':
                    res = filter[key].findIndex(filterColor => device.color.findIndex(color => filterColor === color) > -1);
                    break;
                case 'display':
                    res = filter[key].findIndex(filterItem => device.display > filterItem.from && device.display < filterItem.to)
                    break
            }

            if (res === -1) {
                break
            }
        }
        return (res > -1);
    }
}
