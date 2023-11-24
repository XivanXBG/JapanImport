const Cars = {
    Mitsubishi: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2381px-Mitsubishi_logo.svg.png', models: ['Lancer', 'Grandis', "Galant", "Colt", "Outlander"] },
    Nissan: { image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.png', models: ["GT-R", "Model1", "model2"] },
    Toyota: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_EU.svg/2560px-Toyota_EU.svg.png', models: [] },
    Honda: { image: 'https://purepng.com/public/uploads/large/purepng.com-honda-car-logologocar-brand-logoscarshonda-car-logo-1701527428101lhn2z.png', models: [] },
    Mazda: { image: 'https://1000logos.net/wp-content/uploads/2019/12/Mazda_Logo.png', models: [] },
    Subaru: { image: 'https://1000logos.net/wp-content/uploads/2018/03/Subaru-Logo-1999.jpg', models: [] },
    Suzuki: { image: 'https://e7.pngegg.com/pngimages/1012/147/png-clipart-suzuki-car-logo-subaru-suzuki-angle-logo.png', models: [] },
    Lexus: { image: 'https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/brand/Lexus_logo_4E4ABD922583A135140CD1AC3C6CAFF83B074DF4-864x600.jpg?wid=680&hei=452', models: [] },

}


export const loadCars = () => {

    return Object.keys(Cars)
}
export const loadModels = (make) => {
    return Cars[make].models;
}

export const loadCarFullInfo = () => {
    return Cars
}