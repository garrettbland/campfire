/**
 * Takes an object (or array of blocks) and id of block
 * you want to locate. Will loop through all deep objects
 * and return object that has matching id to the id passed
 * into the function
 */

const deepSearch = (object, id) => {
    if (object.hasOwnProperty('id') && object['id'] === id)
        return object

    for (let i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] === 'object') {
            let o = deepSearch(object[Object.keys(object)[i]], id)
            if (o != null) return o
        }
    }
    return null
}

export default deepSearch
