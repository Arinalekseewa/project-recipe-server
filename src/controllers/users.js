export const getCurrentUserController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Current user info',
    data: req.user,
  });
};
