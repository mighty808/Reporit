import React from 'react'
import Results from './Results'

const CheckForm = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Check Transaction</h1>
                    <p className="text-gray-600 mt-1">Verify transaction safety in real-time</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                {/* Sender Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Your Phone Number (Sender)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📱</span>
                    </div>
                    <input 
                      type="text" 
                      name="senderPhone" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                      placeholder="0244123456"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Enter Your Phone Number</p>
                </div>

                {/* Recipient Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Recipient Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">👤</span>
                    </div>
                    <input 
                      type="text" 
                      name="recipientPhone" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                      placeholder="e.g., 0551234567"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Enter the Reciepient's Number</p>
                </div>

                {/* Amount and Transaction Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Amount (GHS)
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">₵</span>
                      </div>
                      <input 
                        type="number" 
                        name="amount" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="e.g., 100.00"
                        step="0.01"
                      />
                    </div>
                    <p className="text-sm text-gray-500">Enter amount in Ghana Cedis</p>
                  </div>

                  {/* Transaction Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Transaction Type
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        name="transactionType"
                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none appearance-none"
                        defaultValue="mobile_money"
                      >
                        <option value="mobile_money">Mobile Money Transfer</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Select transaction method</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="button"
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Check Now
                  </button>
                </div>
              </form>
              
              <Results />
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white h-full">
              <div className="mb-8">
                <div className="bg-white/20 p-4 rounded-2xl inline-block mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                <p className="text-blue-100">Our AI-powered system analyzes transactions in real-time to protect you from fraud.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4 shrink-0">
                    <span className="text-xl">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Real-time Database Check</h3>
                    <p className="text-blue-100 text-sm">Instant verification against known fraud numbers and patterns</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4 shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pattern Analysis</h3>
                    <p className="text-blue-100 text-sm">AI analysis of transaction frequency, amounts, and behavior</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4 shrink-0">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Community Reports</h3>
                    <p className="text-blue-100 text-sm">Cross-reference with user-submitted fraud reports</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4 shrink-0">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Risk Assessment</h3>
                    <p className="text-blue-100 text-sm">Comprehensive risk scoring for transaction safety</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">99.8%</div>
                    <div className="text-sm text-blue-200">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.1s</div>
                    <div className="text-sm text-blue-200">Avg. Check Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm">Our support team is available 24/7 to assist you</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                View Recent Reports
              </button>
              <button className="px-5 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors text-sm font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckForm