/* eslint-disable no-extend-native */
import update from 'immutability-helper';
import moment from 'moment';

moment.locale('pt-br');

if (!Array.prototype.update) {
  Object.defineProperty(Array.prototype, 'update', {
    value(object) {
      return update(this, object);
    },
  });
}

if (!Object.prototype.update) {
  Object.defineProperty(Object.prototype, 'update', {
    value(object) {
      return update(this, object);
    },
  });
}

if (!Date.prototype.moment) {
  Object.defineProperty(Date.prototype, 'moment', {
    value() {
      return moment(this);
    },
  });
}

if (!String.prototype.moment) {
  Object.defineProperty(String.prototype, 'moment', {
    value() {
      return moment(this);
    },
  });
}

if (!Number.prototype.moment) {
  Object.defineProperty(Number.prototype, 'moment', {
    value() {
      return moment(this);
    },
  });
}
