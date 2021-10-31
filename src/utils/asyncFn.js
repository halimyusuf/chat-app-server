export default function (request) {
  return async function (req, res, next) {
    try {
      await request(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
