"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionDisableKey4Func = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionDisableKey4Func extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationSkillButtonEnable(false);
  }
}
exports.GuaranteeActionDisableKey4Func = GuaranteeActionDisableKey4Func;
//# sourceMappingURL=GuaranteeActionDisableKey4Func.js.map