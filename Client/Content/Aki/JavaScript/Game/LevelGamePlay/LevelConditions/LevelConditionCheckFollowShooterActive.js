"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFollowShooterActive = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowUtils_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFollowShooterActive extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o, l) {
    if (!e) {
      return false;
    }
    let r = false;
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (l?.Type === 11) {
      if (!(i = l.GetContextByType(10))) {
        return !e.Active;
      }
      if (i?.Type !== 10) {
        return !e.Active;
      }
      var i = i.Params;
      r = i[0];
    } else if (l?.Type === 1) {
      r = FollowUtils_1.FollowUtils.IsFollowShooterEnable(t);
    }
    i = FollowUtils_1.FollowUtils.GetPlayerFollowShooter(t);
    l = i !== undefined;
    if (l = l && i.Entity?.GetComponent(0)?.SummonCfgId === e.Id) {
      return r === e.Active;
    } else {
      return l === e.Active;
    }
  }
}
exports.LevelConditionCheckFollowShooterActive = LevelConditionCheckFollowShooterActive;
//# sourceMappingURL=LevelConditionCheckFollowShooterActive.js.map