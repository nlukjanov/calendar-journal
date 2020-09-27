function handleError(err, req, res, next) {
  if (err.name === 'ValidationError' || err.message === 'ValidationError') {
    const formattedErrors = {};

    for (const key in err.errors) {
      if (key === 'passwordConfirmation') {
        formattedErrors[key] = 'Passwords do not match';
      } else {
        formattedErrors[key] = `Field ${key} is required`;
      }
    }
    return res.status(422).json({ errors: formattedErrors });
  }

  if (err.message === 'User not found') {
    return res.status(404).json({ message: 'Incorrect credentials' });
  }

  if (err.message === 'Incorrect credentials') {
    return res.status(401).json({ message: 'Incorrect credentials' });
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (err.name === 'CastError') {
    const formattedErrors = {};

    for (const key in err.errors) {
      formattedErrors[key] = err.errors[key].message;
    }

    return res.status(406).json({
      message: 'Something is seriously wrong',
      errors: formattedErrors
    });
  }

  res.status(500).json({ message: 'Something is wrong with our servers' });
  next(err);
}

module.exports = handleError;
