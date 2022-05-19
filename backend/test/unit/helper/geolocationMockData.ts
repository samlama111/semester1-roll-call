import { Location } from '../../../src/shared/models/Location'

export const validLocation: Location = {
    lat: 43.55222,
    long: -87.9617585
}
export const validData = [{
    place_id: 287417400,
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
    osm_type: 'relation',
    osm_id: 251940,
    boundingbox: [
        '43.54603',
        '43.564832',
        '-87.978283',
        '-87.935454'
    ],
    lat: '43.55222',
    lon: '-87.9617585',
    display_name: 'Random Lake, Sheboygan County, Wisconsin, 53075, United States',
    class: 'boundary',
    type: 'administrative',
    importance: 0.5597933343486425
}]

export const invalidData = [{
    place_id: 73590283,
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
    osm_type: 'node',
    osm_id: 6839672886,
    boundingbox: [
        '25.254739',
        '25.254839',
        '51.5537919',
        '51.5538919'
    ],
    lat: '25.254789',
    lon: '51.5538419',
    display_name: 'wrong, Ammar Bin Yasser, Old Airport, Doha, 63686, Qatar',
    class: 'tourism',
    type: 'apartment',
    importance: 0.11100000000000002
}]
