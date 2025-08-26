"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossChallengeData = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
class LineCrossChallengeData {
  constructor() {
    this.xe = 0;
    this.Tvc = false;
    this.APu = 0;
    this.Jkt = 0;
    this.HYo = 0;
    this.Mxu = false;
  }
  GetId() {
    return this.xe;
  }
  GetHasGetReward() {
    return this.Tvc;
  }
  GetOpenTime() {
    return this.APu / 1000;
  }
  GetRewardId() {
    return this.Jkt;
  }
  GetEntityConfigId() {
    return this.HYo;
  }
  GetPreChallengeState() {
    return this.Mxu;
  }
  Phrase(t) {
    this.xe = t.e8n;
    this.Tvc = t.mLs;
    this.APu = Number(MathUtils_1.MathUtils.LongToBigInt(t.pDs));
    this.Jkt = t.N6n;
    this.HYo = t.A5n;
    this.Mxu = t.hAu;
  }
}
exports.LineCrossChallengeData = LineCrossChallengeData;
//# sourceMappingURL=LineCrossDataDefine.js.map