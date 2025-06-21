"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleMorphInputDistribute = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeDefine_1 = require("../InputDistributeDefine"),
  InputDistributeSetup_1 = require("./InputDistributeSetup");
class RoleMorphInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !!ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.OnlyBattleInput && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]尝试刷新战斗输入时，处于OnlyBattleInput，只允许战斗输入"), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag]), !0)
  }
}
exports.RoleMorphInputDistribute = RoleMorphInputDistribute;
//# sourceMappingURL=RoleMorphInputDistribute.js.map