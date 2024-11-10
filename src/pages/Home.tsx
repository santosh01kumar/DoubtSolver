import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Smart Search',
    description: 'Find answers quickly with our intelligent search system'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Subject Expertise',
    description: 'Get help across various academic subjects'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community Support',
    description: 'Learn from peers and experts in our community'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Answers',
    description: 'AI-powered responses for immediate assistance'
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Instant Help with Your Academic Questions
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Connect with AI and experts to solve your academic doubts in minutes
            </p>
            <Link
              to="/ask"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Ask Your Question
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DoubtSolver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students getting help with their academic questions
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;