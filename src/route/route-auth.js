'use strict';

import {Router} from 'express';
import User from '../model/user.js';
import parserBody from '../middleware/parser-body.js';
import {basicAuth} from '../middleware/parser-auth.js';
import {log, daysToMilliseconds} from '../lib/util.js';

export default new Router()
  .post('/signup', parserBody, (req, res, next) => {
    log('__ROUTE__ POST /signup');
    new User.create(req.body)
      .then(user => user.tokenCreate())
      .then(token => {
        res.cookie('X-Cloud-Life-Token', token, {maxAge: 900000});
        res.send(token);
      })
      .catch(next);
  })
  .get('/usernames/:username', (req, res, next) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if(!user)
          return res.sendStatus(200);
        return res.sendStatus(409);
      })
      .catch(next);
  })
  .get('/login', basicAuth, (req, res, next) => {
    log('__ROUTE__ GET /login');
    req.user.tokenCreate()
      .then((token) => {
        let cookieOptions = {maxAge: daysToMilliseconds(7)};
        res.cookie('X-Cloud-Life-Token', token, cookieOptions);
        res.send(token);
      })
      .catch(next);
  });
