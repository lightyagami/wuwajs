"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordChallengeModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class GreatSwordChallengeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.FXc = undefined;
    this.hLt = 0;
    this.gJc = 0;
    this.CJc = false;
  }
  InitChallenge(e) {
    this.FXc = e;
  }
  GetSubChallenges() {
    return this.FXc?.SubChallenges ?? [];
  }
  SetSubChallengeState(e, t, s) {
    if (this.FXc && this.FXc.SubChallenges[e]) {
      this.FXc.SubChallenges[e].Unlocked = t;
      this.FXc.SubChallenges[e].Completed = s;
    }
  }
  SetActionIncId(e) {
    this.gJc = e;
  }
  SetIsStartChallenge(e) {
    this.CJc = e;
  }
  GetActionIncId() {
    return this.gJc;
  }
  GetIsStartChallenge() {
    return this.CJc;
  }
  GetChallenge() {
    return this.FXc;
  }
  GetSelectedIndex() {
    return this.hLt;
  }
  SetSelectedIndex(e) {
    this.hLt = e;
  }
  ClearData() {
    this.FXc = undefined;
    this.hLt = 0;
    this.gJc = 0;
    this.CJc = false;
  }
}
exports.GreatSwordChallengeModel = GreatSwordChallengeModel;
//# sourceMappingURL=GreatSwordChallengeModel.js.map