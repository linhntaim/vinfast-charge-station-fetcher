async function _fetch(url) {
    return await fetch(url).then(res => res.json())
}

const locators = (await _fetch('https://vinfastauto.com/vn_vi/get-locators')).data
console.log('Locators:', locators.length)

const stations = []

let i = 0
while(i < locators.length) {
    const locator = locators[i]

    console.log(`#${i} Entity ${locator.entity_id} ...`)

    const detail = (await _fetch(`https://vinfastauto.com/vn_vi/get-locator/${locator.entity_id}`)).data
    if(detail.bundle == 'charging_station') {
        stations.push({
            entity_id: locator.entity_id,

            province: detail.data.province,
            district: detail.data.district,
            commune: detail.data.commune,
            address: detail.data.address,

            name: detail.data.name,
            category_name: detail.category_name,
            access_type: detail.access_type,
            charging_publish: detail.charging_publish,
            charging_status: detail.charging_status,
            charging_avaiable_date: detail.charging_avaiable_date ? detail.charging_avaiable_date : '',
        })
    }

    ++i
}

console.log('Stations:')
//console.log(stations)
console.log(JSON.stringify(stations))
