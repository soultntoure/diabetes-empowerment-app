// Placeholder for utility functions
// e.g., date formatting, validation helpers, etc.

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

module.exports = { formatDate, formatTime };
