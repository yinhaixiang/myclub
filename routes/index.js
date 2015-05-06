var express = require('express');
var router = express.Router();

exports.index = function (req, res) {
  res.render('index', {title: 'Index'});
};
exports.login = function (req, res) {
  res.render('login', {title: '用户登陆'});
};
exports.doLogin = function (req, res) {
  var user = {
    username: 'aa',
    password: 'bb'
  }
  if (req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    return res.redirect('/home');
  } else {
    req.session.error = '用户名或密码不正确';
    return res.redirect('/login');
  }
};
exports.logout = function (req, res) {
  req.session.user = null;
  res.redirect('/');
};
exports.home = function (req, res) {
  res.render('home', {title: 'Home'});
};

exports.authentication = function (req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/login');
  }
  next();
}

exports.notAuthentication = function (req, res, next) {
  if (req.session.user) {
    req.session.error='已登陆';
    return res.redirect('/home');
  }
  next();
}