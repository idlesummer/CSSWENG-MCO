import React from 'react';
import { useSnackbar } from 'notistack';

function MyComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar( <div>
      Line 1<br />
      Line 2<br />
      Line 3
      </div>, 
      {
      variant: 'success',
      action: key => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={{ marginRight: 8 }}
            onClick={() => {
              console.log('Custom action!');
              closeSnackbar(key);
            }}
          >
            Click Me
          </button>
          <span onClick={() => console.log('Snackbar clicked!')} style={{ cursor: 'pointer' }}>
            Dismiss
          </span>
        </div>
      ),
      autoHideDuration: null, // Custom auto-hide duration
    });
  };

  const handleAction = (key) => {
    // Perform your action here
    console.log('Action performed!');
    // Optionally close the snackbar
    enqueueSnackbar.closeSnackbar(key);
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
    </div>
  );
}

export default MyComponent;