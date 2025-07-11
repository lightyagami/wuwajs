"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangeShareData = exports.ExchangeRewardData = undefined;
class ExchangeRewardData {
  constructor() {
    this.xe = 0;
    this.t6 = 0;
  }
  GetId() {
    return this.xe;
  }
  GetCount() {
    return this.t6;
  }
  Phrase(t, e) {
    this.xe = t;
    this.t6 = e;
  }
}
exports.ExchangeRewardData = ExchangeRewardData;
class ExchangeShareData {
  constructor() {
    this.xe = 0;
    this.t6 = 0;
  }
  GetId() {
    return this.xe;
  }
  GetCount() {
    return this.t6;
  }
  Phrase(t, e) {
    this.xe = t;
    this.t6 = e;
  }
}
exports.ExchangeShareData = ExchangeShareData;
//# sourceMappingURL=ExchangeRewardData.js.map