import React from 'react';
import SubmitComplaint from './SubmitComplaint'; // Import the new component

const Dashboard = () => {
  // In the future, we will check the user's role here.
  // If the role is 'citizen', we show SubmitComplaint.
  // If the role is 'sarpanch', we show a list of all complaints.

  return (
    <div>
      {/* For now, we'll just show the citizen's view */}
      <SubmitComplaint />
    </div>
  );
};

export default Dashboard;