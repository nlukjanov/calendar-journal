const logger = require('../lib/logger');

describe('Testing logger middleware', () => {
  it('should call next() once', function () {
    process.env.NODE_ENV = 'test';
    const nextSpy = jest.fn();
    logger({ method: 'test', url: 'test' }, {}, nextSpy);
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should console log correct message', () => {
    process.env.NODE_ENV = 'nottest';
    const nextSpy = jest.fn();
    const req = { method: 'GET', url: '/' };
    const log = jest.spyOn(global.console, 'log');
    logger(req, {}, nextSpy);
    expect(log).toHaveBeenCalledWith('Incoming GET to /');
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    jest.clearAllMocks();
  });
});
