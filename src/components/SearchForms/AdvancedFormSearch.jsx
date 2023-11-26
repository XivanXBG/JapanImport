import useForm from "../../hooks/useForm";


import { useEffect, useState } from 'react'


import { loadCars } from '../../utills/firebase';

const SearchFormKeys = {
    Make: 'make',
    Model: 'model',
    MinPrice: 'minPrice',
    MaxPrice: 'maxPrice',
    MinYear: 'minYear',
    MaxYear: 'maxYear',
    TransmissionType: 'transmission',
    Killomenters: 'killometers',
    Category: 'category',
    EngineType: 'engine'

}

export default function AdvancedSearch() {
    const submitHandler = (e) => {
        e.preventDefault();

    }
    const { values, onChange, onSubmit } = useForm(submitHandler, {
        [SearchFormKeys.Make]: "",
        [SearchFormKeys.Model]: "",
        [SearchFormKeys.MinPrice]: 10,
        [SearchFormKeys.MaxPrice]: 500000,
        [SearchFormKeys.MaxYear]: 2023,
        [SearchFormKeys.MinYear]: 1960,
        [SearchFormKeys.TransmissionType]: '',
        [SearchFormKeys.Killomenters]: 0,
        [SearchFormKeys.Category]: '',
        [SearchFormKeys.EngineType]: '',


    });

    const [cars, setCars] = useState([])

    useEffect(() => {
        loadCars().then(cars => setCars(cars));
        console.log(cars);
    }, [])

    const getModelsForCarId = (carId) => {
        const car = cars.find(car => car.id === carId);
        return car ? car.models : null;
    };

    return (
        <form onSubmit={onSubmit} className="adForm">

            <div className="row">
                <div className="input-container">
                    <label className="label">
                        Make:
                    </label>
                    <select
                        name={SearchFormKeys.Make}
                        onChange={onChange}
                        value={values[SearchFormKeys.Make]}
                        className="select"
                    >
                        <option value="">Select make</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-container">
                    <label className="label">
                        Engine Type:
                    </label>
                    <select
                        name={SearchFormKeys.EngineType}
                        onChange={onChange}
                        value={values[SearchFormKeys.EngineType]}
                        className="select"
                    >
                        <option value="">Select engine type</option>
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="electric">Electric</option>

                    </select>
                </div>
                <div className="input-container">
                    <label className="label">
                        Category:
                    </label>
                    <select
                        name={SearchFormKeys.Category}
                        onChange={onChange}
                        value={values[SearchFormKeys.Category]}
                        className="select"
                    >
                        <option value="">Select category</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="coupe">Coupe</option>
                        <option value="convertible">Convertible</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="wagon">Wagon</option>
                        <option value="pickup">Pickup Truck</option>
                        <option value="minivan">Minivan</option>
                        <option value="crossover">Crossover</option>
                        <option value="sportsCar">Sports Car</option>
                    </select>
                </div>
                <div className="input-container">

                    <label className="label">
                        Price:
                    </label>
                    <input
                        type="number"
                        name={SearchFormKeys.MinPrice}
                        onChange={onChange}
                        value={values[SearchFormKeys.MinPrice]}

                    />
                    -
                    <input
                        type="number"
                        name={SearchFormKeys.MaxPrice}
                        onChange={onChange}
                        value={values[SearchFormKeys.MaxPrice]}

                    />




                </div>
            </div>

            <div className="row">

                <div className="input-container">
                    <label className="label">
                        Model:
                    </label>
                    <select name={SearchFormKeys.Model} onChange={onChange} className="select">
                        {values[SearchFormKeys.Make] === "" ? (
                            <option value="">Select a model</option>
                        ) : (
                            <>
                                <option value="">Select a model</option>
                                {getModelsForCarId(values[SearchFormKeys.Make]).map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                <div className="input-container">
                    <label className="label">
                        Transmission:
                    </label>
                    <select
                        name={SearchFormKeys.TransmissionType}
                        onChange={onChange}
                        value={values[SearchFormKeys.TransmissionType]}
                        className="select"
                    >
                        <option value="">Select transmission type</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>



                    </select>
                </div>
                <div className="input-container">
                    <label className="label">
                        Max Kilometers:
                    </label>
                    <select
                        name={SearchFormKeys.Killomenters}
                        onChange={onChange}
                        value={values[SearchFormKeys.Killomenters]}
                        className="select"
                    >
                        <option value="">Select max km</option>
                        <option value="10000">Under 10,000 km</option>
                        <option value="30000">Under 30,000 km</option>
                        <option value="50000">Under 50,000 km</option>
                        <option value="100000">Under 100,000 km</option>
                        <option value="200000">Under 200,000 km</option>


                    </select>

                </div>
                <div className="input-container">

                    <label className="label">
                        Year:
                    </label>
                    <input
                        type="number"
                        name={SearchFormKeys.MinYear}
                        onChange={onChange}
                        value={values[SearchFormKeys.MinYear]}
                    />
                    -
                    <input
                        type="number"
                        name={SearchFormKeys.MaxYear}
                        onChange={onChange}
                        value={values[SearchFormKeys.MaxYear]}

                    />




                </div>
            </div>


            <button type="submit" className="button">
                Submit
            </button>
        </form>

    )

}