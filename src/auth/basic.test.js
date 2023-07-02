const middleware = require('../auth/middleware/basic');
const User = require('../auth/models/index');
const bcrypt = require('bcrypt');

describe.skip('middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Basic ' + Buffer.from('username:password').toString('base64')
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('should call next if user is authenticated', async () => {
    const user = { username: 'username', password: await bcrypt.hash('password', 10) };
    User.findOne = jest.fn().mockResolvedValue(user);
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    await middleware(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'username' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
    expect(req.userData).toEqual(user);
    expect(next).toHaveBeenCalled();
  });

  it.skip('should send an error message if user is not authenticated', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    await middleware(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'username' } });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid Login');
  });
});
