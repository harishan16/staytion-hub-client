import { useState } from 'react';
import './Dropdown.scss'

function Dropdown ({label, options, className, name, value, onChange}) {
    
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onChange(name, selectedValue);
    }

    return (
        <div className={ `dropdown ${className}` }>
            <label className='dropdown__label'>{label}
                <select value={selectedOption} onChange={handleChange} className='dropdown__select'> 
                    {options.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })}  
                </select>
            </label>
        </div>
        
    );
}

export default Dropdown;