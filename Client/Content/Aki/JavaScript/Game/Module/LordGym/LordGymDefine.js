"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NONE_FILTER_TYPE = exports.LordGymChallengeRecord = undefined;
class LordGymChallengeRecord {
  constructor() {
    this.Uc = new Map();
  }
  GetLordChallengeRecord(e, r) {
    if (this.Uc.has(e)) {
      return this.Uc.get(e)[r];
    }
  }
}
exports.LordGymChallengeRecord = LordGymChallengeRecord;
exports.NONE_FILTER_TYPE = 0; //# sourceMappingURL=LordGymDefine.js.map