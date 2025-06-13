import API from './api';

// Submit a new waste report with image
export const createWasteReport = async (reportData) => {
  const formData = new FormData();
  for (const key in reportData) {
    if (key === 'location') {
      formData.append(key, JSON.stringify(reportData[key])); // Stringify complex objects
    } else {
      formData.append(key, reportData[key]);
    }
  }

  const response = await API.post('/waste-reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  });
  return response.data;
};


// Get all waste reports (with optional status filter)
export const getWasteReports = async (status = '') => {
  const params = status ? { status } : {};
  const response = await API.get('/waste-reports', { params });
  return response.data;
};

// Get a single waste report by ID
export const getWasteReportById = async (id) => {
  const response = await API.get(`/waste-reports/${id}`);
  return response.data;
};

// Update waste report status
export const updateWasteReportStatus = async (id, statusData) => {
  const response = await API.put(`/waste-reports/${id}/status`, statusData);
  return response.data;
};