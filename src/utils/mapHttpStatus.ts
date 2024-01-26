export const HTTP_STATUS = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessable: 422,
  badRequest: 400,
  deleted: 204,
  conflict: 409,
  unauthorized: 401,
};
export const mapHttpStatus = (code: keyof typeof HTTP_STATUS) => HTTP_STATUS[code] || 500;
