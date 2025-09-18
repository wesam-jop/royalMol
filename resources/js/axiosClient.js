import axios from 'axios';

const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    'Accept': 'application/json',
  },
});

export default axiosClient;
