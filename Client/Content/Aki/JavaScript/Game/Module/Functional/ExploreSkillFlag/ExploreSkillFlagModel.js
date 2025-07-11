"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillFlagModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ExploreSkillFlagDefine_1 = require("./ExploreSkillFlagDefine");
class ExploreSkillFlagModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Cd_ = new Map();
  }
  OnInit() {
    for (var [e, l] of ExploreSkillFlagDefine_1.levelExploreSkillFlagDefaultVal) {
      this.Cd_.set(e, l);
    }
    return true;
  }
  OnClear() {
    this.Cd_.clear();
    return true;
  }
  GetExploreSkillFlagEnable(e) {
    return this.Cd_.get(e) ?? true;
  }
  SetExploreSkillFlagEnable(e, l) {
    if (this.Cd_.get(e) !== l && (this.Cd_.set(e, l), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Functional", 31, "探索技能标记更新", ["skillType", e], ["enable", l]);
    }
  }
  DisableAllExploreSkillFlag() {
    for (var [e] of this.Cd_) {
      this.SetExploreSkillFlagEnable(e, false);
    }
  }
  EnableAllExploreSkillFlag() {
    for (var [e] of this.Cd_) {
      this.SetExploreSkillFlagEnable(e, true);
    }
  }
}
exports.ExploreSkillFlagModel = ExploreSkillFlagModel;
//# sourceMappingURL=ExploreSkillFlagModel.js.map