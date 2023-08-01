const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.amountTransfer = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;

  const senderUser = await User.findOne({
    where: {
      id: senderUserId,
      status: 'active',
    },
  });

  if (!senderUser) {
    return next(new AppError(`User with id: ${senderUserId} not found`, 404));
  }

  const receiverUser = await User.findOne({
    where: {
      id: receiverUserId,
      status: 'active',
    },
  });

  if (!receiverUser) {
    return next(new AppError(`User with id: ${receiverUserId} not found`, 404));
  }

  if (amount <= senderUser.amount === false) {
    return next(
      new AppError(`User with id: ${senderUserId} amount is insufficient`, 404)
    );
  }

  await senderUser.update({
    amount: senderUser.amount - amount,
  });

  await receiverUser.update({
    amount: receiverUser.amount + amount,
  });

  res.status(200).json({
    status: 'success',
    senderUser: {
      id: senderUser.id,
      name: senderUser.name,
      accountNumber: senderUser.accountNumber,
      amount: senderUser.amount,
    },
    receiverUser: {
      id: receiverUser.id,
      name: receiverUser.name,
      accountNumber: receiverUser.accountNumber,
      amount: receiverUser.amount,
    },
  });
});
