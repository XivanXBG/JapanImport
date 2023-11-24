
import './formSearch.css';
import useForm from "../../hooks/useForm";
import { loadCars, loadModels } from '../../carsDB/carsDb';



const SearchFormKeys = {
    Make: 'make',
    Model: 'model',
    MinPrice: 'minPrice',
    MaxPrice: 'maxPrice',
    MinYear: 'minYear',
    MaxYear: 'maxYear'

}

export default function FormSearch() {

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

    });





    return (
        <>
            
            <form onSubmit={onSubmit} className="form">


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
        </>

    );
}
