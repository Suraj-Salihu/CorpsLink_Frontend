import React from 'react';
import { formatStateCode, validateStateCode } from '../../utils/helpers';

const StateCodeInput = ({ value, onChange, error, className = '' }) => {
    const handleChange = (e) => {
        const formatted = formatStateCode(e.target.value);
        onChange(formatted);
    };
    
    const isValid = value ? validateStateCode(value) : true;
    
    return (
        <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-[#2E2E2E]">
                NYSC State Code
            </label>
            <input
                type="text"
                value={value || ''}
                onChange={handleChange}
                placeholder="e.g., JG/25A/1234"
                className={`w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] transition-colors ${
                    error 
                    ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]' 
                    : isValid 
                      ? 'border-[#C2B280]' 
                      : 'border-[#FFB300] focus:border-[#FFB300] focus:ring-[#FFB300]'
                } ${className}`} 
            />
            {error && <p className="text-[#F44336] text-sm mt-1">{error}</p>}
            <p className="text-[#6B6B6B] text-xs">Format: State/Batch/Year/Number (e.g., JG/25A/1234)</p>
        </div>
    );
};

export default StateCodeInput;