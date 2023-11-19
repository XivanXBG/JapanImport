import { useState } from "react";
import './formSearch.css';

export default function FormSearch() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [yearRange, setYearRange] = useState([2000, 2022]);
    const [priceRange, setPriceRange] = useState([0, 50000]);

    // Handlers for make and model selection
    const handleMakeChange = (event) => {
        setMake(event.target.value);
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    // Handlers for year and price range sliders
    const handleYearChange = (values) => {
        setYearRange(values);
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    // Form submit handler
    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle form submission logic here
        console.log('Form submitted:', { make, model, yearRange, priceRange });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="link-container">
                <span onClick={() => console.log('Search clicked')} className="link">
                    Search
                </span>
                <span onClick={() => console.log('Advanced Search clicked')} className="link">
                    Advanced Search
                </span>
            </div>

            <div className="row">
                <label className="label">
                    Make:
                </label>
                <select value={make} onChange={handleMakeChange} className="select">
                    <option value="">Select Make</option>
                    {/* Add make options */}
                </select>

                <label className="label">
                    Model:
                </label>
                <select value={model} onChange={handleModelChange} className="select">
                    <option value="">Select Model</option>
                    {/* Add model options */}
                </select>
            </div>

            <div className="row">
                <label className="label">
                    Year Range:
                </label>
                <div className="range-container">
                    <span>{yearRange[0]}</span>
                    <input
                        type="range"
                        min={2000}
                        max={2022}
                        step={1}
                        value={yearRange[0]}
                        onChange={(e) => handleYearChange([parseInt(e.target.value, 10), yearRange[1]])}
                    />
                    <span>{yearRange[1]}</span>
                </div>

                <label className="label">
                    Price Range:
                </label>
                <div className="range-container">
                    <span>${priceRange[0]}</span>
                    <input
                        type="range"
                        min={0}
                        max={50000}
                        step={1000}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange([parseInt(e.target.value, 10), priceRange[1]])}
                    />
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}