import useForm from "../../hooks/useForm";
import { loadCars, loadModels } from '../../carsDB/carsDb';

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
        [SearchFormKeys.Transmission]: '',
        [SearchFormKeys.Killomenters]: 0,
        [SearchFormKeys.Category]: '',
        [SearchFormKeys.EngineType]: '',


    });

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
                        {loadCars().map((make) => (
                            <option key={make} value={make}>
                                {make}
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
                        {/* Add options for categories */}
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
                            loadModels(values[SearchFormKeys.Make]).map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <div className="input-container">
                    <label className="label">
                        Transmission:
                    </label>
                    <select
                        name={SearchFormKeys.Transmission}
                        onChange={onChange}
                        value={values[SearchFormKeys.Transmission]}
                        className="select"
                    >
                        <option value="">Select transmission type</option>

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