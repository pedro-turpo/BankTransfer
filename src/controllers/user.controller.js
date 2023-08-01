const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateAccountNumber = require('../utils/generateAccountNumber');

exports.signup = catchAsync(async (req, res, next) => {
  const accountNumber = generateAccountNumber();
  const { name, password } = req.body;

  const user = await User.create({
    name: name.toLowerCase().trim(),
    password,
    accountNumber,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: {
      accountNumber,
      password: password.toLowerCase().trim(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('Incorrect Account Numer or password', 401));
  }

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.history = catchAsync(async (req, res, next) => {});
