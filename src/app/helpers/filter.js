export class Filter {
    filter = {
        price: {from: 0, to: 0},
        color: [],
        storage: [],
        os: [],
        display: [],
    }
    filterParmsHandler = {
        color: (val) => ({id: val}),
        storage: (val) => ({id: val}),
        os: (val) => ({id: val}),
        display: (val) => ({id: val, from: val.split("-")[0], to: val.split("-")[1]}),
    }

    constructor() {
    }

    filterInputUpdate(value, key, prop) {
        this.filter[key][prop] = value;
    }

    filterUpdate(el, key) {
        let defaultValue = el.value;
        if (el.checked) {
            let index = this.filter[key].findIndex(filterValue => filterValue.id === defaultValue)
            if (index === -1) {
                this.filter[key].push(this.filterParmsHandler[key](defaultValue));
            }
        } else {
            let index = this.filter[key].findIndex(filterValue => filterValue.id === defaultValue)
            if (index > -1) {
                this.filter[key].splice(index,1);
            }
        }
    }

    isFilterEmpty() {
        return false
    }

    filtration(items) {
        return this.isFilterEmpty() ? items : items.filter(device => this.filteredData(device));
    }

    filteredData(device) {
        let res = 0
        for (let key in this.filter) {
            switch (key) {
                case 'price':
                    if (this.filter[key].from && this.filter[key].to) {
                        res = (this.filter[key].from <= device.price && this.filter[key].to >= device.price) ? 1 : -1;
                    }
                    break;
                case 'storage':
                case 'os':
                    if (this.filter[key].length > 0) {
                        res = this.filter[key].findIndex(filterStorage => String(device[key]) === filterStorage.id);
                    }
                    break;
                case 'color':
                    if (this.filter[key].length > 0) {
                        res = this.filter[key].findIndex(filterColor => device.color.includes(filterColor.id));
                    }
                    break;

                case 'display':
                    if (this.filter[key].length > 0) {
                        res = this.filter[key].findIndex(filterItem => device.display > filterItem.from && device.display < filterItem.to)
                    }
                    break
            }

            if (res === -1) {
                break
            }
        }
        return (res > -1);
    }
}
