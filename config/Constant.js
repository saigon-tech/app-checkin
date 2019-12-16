const hostname = 'http://192.168.0.103:8080';
export default Constant = {
  apiLogin: hostname + '/symfony/web/index.php/api/v1/login',
  apiGetAvatar: hostname + '/symfony/web/index.php/api/v1/employee/{employeeId}/photo',
  apiGetStatus: hostname + '/symfony/web/index.php/api/v1/employee/{employeeId}/punch-in-status',
  apiCheckIn: hostname + '/symfony/web/index.php/api/v1/employee/{employeeId}/punch-in',
  apiCheckOut: hostname + '/symfony/web/index.php/api/v1/employee/{employeeId}/punch-out'
};
