export class Filter {

    constructor() {
    }

    filterByPrice(data, from, to, fieldKey){
     return  data.filter((item)=>item[fieldKey] > from && item[fieldKey]< to)
    }
    filterByColor(){

    }

    filterByMemory(){

    }

    filterByOS(){

    }

    filterByDisplay(){

    }

}
