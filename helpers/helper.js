function formatRupiah(value){
    let result = value.toLocaleString('id-ID')
    result = `Rp. ${result}, 00`

    return result;
}


module.exports = formatRupiah