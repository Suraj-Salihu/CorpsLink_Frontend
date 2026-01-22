// Format State Code
export const formatStateCode = (input) => {
    // Auto-format as user types: AA/00A/0000
    let formatted = input.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
    }
    if (formatted.length > 5) {
        formatted = formatted.substring(0, 5) + '/' + formatted.substring(5);
    }
    if (formatted.length > 10) {
        formatted = formatted.substring(0, 10);
    }
    
    return formatted;
};

// Validate State Code Format
export const validateStateCode = (code) => {
    const regex = /^[A-Z]{2}\/\d{2}[A-Z]\/\d{4}$/;
    return regex.test(code);
};

// Format Time
export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get Batch Badge Color
export const getBatchBadgeColor = (batch) => {
    const colors = {
        'A': 'bg-nysc-green',
        'B': 'bg-blue-500',
        'C': 'bg-purple-500'
    };
    return colors[batch] || 'bg-gray-500';
};