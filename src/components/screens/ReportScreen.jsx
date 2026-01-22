import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useApp } from '../../context/AppContext';

const ReportScreen = () => {
    const { setCurrentScreen, report } = useApp();
    const [reportType, setReportType] = useState('user');
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            report(reportType, 'target-id', reason);
            setIsSubmitting(false);
            setCurrentScreen('chats');
        }, 1500);
    };
    
    return (
        <div className="h-screen flex flex-col bg-off-white">
            <header className="bg-nysc-green text-white p-4">
                <div className="flex items-center">
                    <button 
                        onClick={() => setCurrentScreen('chat')}
                        className="mr-4"
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h1 className="text-xl font-bold">Report</h1>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl p-4 mb-4">
                        <h3 className="font-semibold text-text-dark mb-3">What would you like to report?</h3>
                        <div className="space-y-2">
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                <input
                                    type="radio"
                                    name="reportType"
                                    value="user"
                                    checked={reportType === 'user'}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="mr-3"
                                />
                                <div>
                                    <p className="font-medium">Report User</p>
                                    <p className="text-sm text-text-muted">Report inappropriate behavior from a user</p>
                                </div>
                            </label>
                            
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                <input
                                    type="radio"
                                    name="reportType"
                                    value="message"
                                    checked={reportType === 'message'}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="mr-3"
                                />
                                <div>
                                    <p className="font-medium">Report Message</p>
                                    <p className="text-sm text-text-muted">Report a specific inappropriate message</p>
                                </div>
                            </label>
                            
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                <input
                                    type="radio"
                                    name="reportType"
                                    value="group"
                                    checked={reportType === 'group'}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="mr-3"
                                />
                                <div>
                                    <p className="font-medium">Report Group</p>
                                    <p className="text-sm text-text-muted">Report an inappropriate group</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 mb-4">
                        <h3 className="font-semibold text-text-dark mb-3">Reason for report</h3>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nysc-green"
                        >
                            <option value="">Select a reason</option>
                            <option value="spam">Spam</option>
                            <option value="harassment">Harassment or bullying</option>
                            <option value="inappropriate">Inappropriate content</option>
                            <option value="impersonation">Impersonation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 mb-4">
                        <h3 className="font-semibold text-text-dark mb-3">Additional details (optional)</h3>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Please provide any additional information that might be helpful..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nysc-green h-32"
                        />
                    </div>
                    
                    <div className="p-4">
                        <button
                            type="submit"
                            disabled={!reason || isSubmitting}
                            className={`w-full font-semibold py-3 rounded-lg ${
                                reason && !isSubmitting
                                    ? 'bg-nysc-green text-white hover:bg-nysc-green'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <LoadingSpinner size="small" />
                                    <span className="ml-2">Submitting report...</span>
                                </span>
                            ) : (
                                'Submit Report'
                            )}
                        </button>
                        
                        <p className="text-xs text-text-muted mt-4 text-center">
                            Reports are reviewed by our moderation team. We take appropriate action against violations of our community guidelines.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportScreen;