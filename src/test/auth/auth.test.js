// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { describe, it } = require('mocha');

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha'

const expect = chai.expect;

chai.use(chaiHttp);

const serverUrl = 'http://localhost:7003/api/v1';

describe('Authentication APIs', () => {
  describe('Login API', () => {
    it('should return 200 and a token when valid email and password are provided', (done) => {
      chai.request(serverUrl)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('Send OTP API', () => {
    it('should return 200 and a success message when a valid email is provided', (done) => {
      chai.request(serverUrl)
        .post('/auth/send-otp')
        .send({ email: 'test@example.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('OTP sent successfully');
          done();
        });
    });
  });

  describe('Verify OTP API', () => {
    it('should return 200 and a success message when a valid email and OTP are provided', (done) => {
      chai.request(serverUrl)
        .post('/auth/verify-otp')
        .send({ email: 'test@example.com', otp: '123456' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('OTP verified successfully');
          done();
        });
    });
  });

  describe('Forgot Password API', () => {
    it('should return 200 and a success message when a valid email and new password are provided', (done) => {
      chai.request(serverUrl)
        .put('/auth/forgot-password')
        .send({ email: 'test@example.com', password: 'newpassword123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('Password reset link sent successfully');
          done();
        });
    });
  });

  describe('Reset Password API', () => {
    it('should return 200 and a success message when a valid old password and new password are provided', (done) => {
      chai.request(serverUrl)
        .put('/auth/reset-password')
        .send({ oldPassword: 'password123', newPassword: 'newpassword123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('Password reset successfully');
          done();
        });
    });
  });
});
