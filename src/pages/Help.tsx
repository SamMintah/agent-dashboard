import React from 'react';
import { MessageSquare, Mail, FileText, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I create a new task?',
    answer: 'To create a new task, go to the Tasks page and click the "Create Task" button in the top right corner. Fill in the required information and click "Save" to create the task.'
  },
  {
    question: 'How are agent performance scores calculated?',
    answer: 'Agent performance scores are calculated based on several factors including completed tasks, client satisfaction ratings, and revenue generated. The score is updated monthly.'
  },
  {
    question: 'Can I export financial reports?',
    answer: 'Yes, you can export financial reports in both CSV and PDF formats. Go to the Financials page and use the export buttons in the top right corner.'
  },
  {
    question: 'How do I update my notification preferences?',
    answer: 'You can update your notification preferences in the Settings page under the "Notifications" section. Toggle the switches to enable or disable different types of notifications.'
  }
];

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Live Chat</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Get instant help from our support team</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Chat
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Email Support</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Send us an email for detailed assistance</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Contact Support
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Documentation</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Browse our detailed documentation</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            View Docs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="w-6 h-6 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-blue-100">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Still need help?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;