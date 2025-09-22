"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueInputData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const InputEnums_1 = require("../InputEnums");
const BattleInputData_1 = require("./BattleInputData");
class SurvivorsRogueInputData extends BattleInputData_1.BattleInputData {
  constructor() {
    super(...arguments);
    this.dYu = new Map([[InputMappingsDefine_1.actionMappings.技能1, InputEnums_1.EInputAction.技能1], [InputMappingsDefine_1.actionMappings.闪避, InputEnums_1.EInputAction.闪避]]);
    this.mYu = new Map([[InputMappingsDefine_1.axisMappings.MoveForward, InputEnums_1.EInputAxis.MoveForward], [InputMappingsDefine_1.axisMappings.MoveRight, InputEnums_1.EInputAxis.MoveRight]]);
    this.lQc = [InputMappingsDefine_1.actionMappings.轮盘2, InputMappingsDefine_1.actionMappings.幻象探索选择界面, InputMappingsDefine_1.actionMappings.角色选择界面];
    this._Qc = [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag];
  }
  OnGetActionMap() {
    return this.dYu;
  }
  OnGetAxisMap() {
    return this.mYu;
  }
  OnCheckActionInAllowFightActionNameList(t, e) {
    return !!this.dYu.has(t) || !(e = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(e, this._Qc, true) || !!this.lQc.includes(t);
  }
  OnCheckAxisInAllowFightAxisNameList(t, e) {
    return !!this.mYu.has(t) || !(t = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(t, this._Qc, true);
  }
}
exports.SurvivorsRogueInputData = SurvivorsRogueInputData;
//# sourceMappingURL=SurvivorsRogueInputData.js.map