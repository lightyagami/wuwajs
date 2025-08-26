"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordChallengeModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class GreatSwordChallengeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.zYu = undefined;
    this.hLt = 0;
    this.fYc = 0;
    this.gYc = false;
  }
  InitChallenge(e) {
    this.zYu = e;
  }
  GetSubChallenges() {
    return this.zYu?.SubChallenges ?? [];
  }
  SetSubChallengeState(e, t, s) {
    if (this.zYu && this.zYu.SubChallenges[e]) {
      this.zYu.SubChallenges[e].Unlocked = t;
      this.zYu.SubChallenges[e].Completed = s;
    }
  }
  SetActionIncId(e) {
    this.fYc = e;
  }
  SetIsStartChallenge(e) {
    this.gYc = e;
  }
  GetActionIncId() {
    return this.fYc;
  }
  GetIsStartChallenge() {
    return this.gYc;
  }
  GetChallenge() {
    return this.zYu;
  }
  GetSelectedIndex() {
    return this.hLt;
  }
  SetSelectedIndex(e) {
    this.hLt = e;
  }
  ClearData() {
    this.zYu = undefined;
    this.hLt = 0;
    this.fYc = 0;
    this.gYc = false;
  }
}
exports.GreatSwordChallengeModel = GreatSwordChallengeModel;
//# sourceMappingURL=GreatSwordChallengeModel.js.map