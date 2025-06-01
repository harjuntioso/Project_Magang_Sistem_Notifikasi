// src/Components/Layout/StatCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon, border, text, valueColor, bg, loading }) => {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 flex flex-col items-center border-t-4 ${border} ${bg} transition-all duration-300 ease-in-out hover:shadow-2xl`}
    >
      <h2 className={`text-lg font-bold mb-1 flex items-center gap-2 ${text}`}>
        {icon}
        {title}
      </h2>
      {loading ? (
        <div className="animate-pulse bg-gray-200 h-8 w-20 mt-2 rounded"></div>
      ) : (
        <p className={`text-3xl font-mono mt-2 ${valueColor}`}>{value}</p>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.element.isRequired,
  border: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  valueColor: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

StatCard.defaultProps = {
  loading: false,
};

export default StatCard;