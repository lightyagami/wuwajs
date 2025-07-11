"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionRolePhantomNum = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRolePhantomNum extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (e.LimitParams) {
      var a = Number(e.LimitParams.get("RoleId"));
      if (a !== undefined) {
        var o = Number(e.LimitParams.get("Value"));
        var n = e.LimitParams.get("Op");
        if (n) {
          if (a > 0) {
            return this.mLe(a, o, n);
          }
          for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
            if (this.mLe(t.GetRoleId(), o, n)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  mLe(e, r, a) {
    return !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) && this.CheckCompareValue(a, ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetEquippedNum(), r);
  }
}
exports.LevelConditionRolePhantomNum = LevelConditionRolePhantomNum;
//# sourceMappingURL=LevelConditionRolePhantomNum.js.map