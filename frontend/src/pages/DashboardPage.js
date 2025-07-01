import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [readings, setReadings] = useState([]);
  const [newReading, setNewReading] = useState({
    glucoseLevel: '',
    date: '',
    time: ''
  });
  const [insights, setInsights] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/login';
        return;
      }

      try {
        const userRes = await axios.get(`${API_URL}/users/profile`, {
          headers: { 'x-auth-token': token }
        });
        setUser(userRes.data);

        const readingsRes = await axios.get(`${API_URL}/data/readings`, {
          headers: { 'x-auth-token': token }
        });
        setReadings(readingsRes.data);

        const insightsRes = await axios.get(`${API_URL}/data/insights`, {
          headers: { 'x-auth-token': token }
        });
        setInsights(insightsRes.data.message);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle token expiry or invalid token
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, [API_URL]);

  const handleInputChange = (e) => {
    setNewReading({ ...newReading, [e.target.name]: e.target.value });
  };

  const handleAddReading = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${API_URL}/data/readings`, newReading, {
        headers: { 'x-auth-token': token }
      });
      setReadings([response.data, ...readings]);
      setNewReading({ glucoseLevel: '', date: '', time: '' }); // Clear form
    } catch (error) {
      console.error('Error adding reading:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>

      {insights && (
        <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow mb-6" role="alert">
          <p className="font-bold">Personalized Insight:</p>
          <p>{insights}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Log New Reading</h2>
        <form onSubmit={handleAddReading} className="bg-white p-6 rounded-lg shadow-md">
          <InputField
            label="Glucose Level (mmol/L or mg/dL)"
            type="number"
            name="glucoseLevel"
            value={newReading.glucoseLevel}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Date"
            type="date"
            name="date"
            value={newReading.date}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Time"
            type="time"
            name="time"
            value={newReading.time}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Add Reading
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Readings</h2>
        {readings.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Glucose Level</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readings.map(reading => (
                  <tr key={reading.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(reading.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium {
                        reading.glucoseLevel < 70 || reading.glucoseLevel > 180 ? 'text-red-600' : 'text-green-600'
                      }"> {reading.glucoseLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No readings logged yet. Start by adding your first reading!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
