"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorInputData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const InputEnums_1 = require("../InputEnums");
const BattleInputData_1 = require("./BattleInputData");
class SpringManorInputData extends BattleInputData_1.BattleInputData {
  constructor() {
    super(...arguments);
    this.dYu = new Map([[InputMappingsDefine_1.actionMappings.跳跃, InputEnums_1.EInputAction.跳跃], [InputMappingsDefine_1.actionMappings.走跑切换, InputEnums_1.EInputAction.走跑切换], [InputMappingsDefine_1.actionMappings.闪避, InputEnums_1.EInputAction.闪避], [InputMappingsDefine_1.actionMappings.通用交互, InputEnums_1.EInputAction.通用交互], [InputMappingsDefine_1.actionMappings.下降, InputEnums_1.EInputAction.下降]]);
    this.mYu = new Map([[InputMappingsDefine_1.axisMappings.LookUp, InputEnums_1.EInputAxis.LookUp], [InputMappingsDefine_1.axisMappings.Turn, InputEnums_1.EInputAxis.Turn], [InputMappingsDefine_1.axisMappings.MoveForward, InputEnums_1.EInputAxis.MoveForward], [InputMappingsDefine_1.axisMappings.MoveRight, InputEnums_1.EInputAxis.MoveRight], [InputMappingsDefine_1.axisMappings.Zoom, InputEnums_1.EInputAxis.Zoom], [InputMappingsDefine_1.axisMappings.WheelAxis, InputEnums_1.EInputAxis.WheelAxis]]);
    this.m5g = new Set([InputMappingsDefine_1.actionMappings.切换交互, InputMappingsDefine_1.actionMappings.任务, InputMappingsDefine_1.actionMappings.玩法放弃, InputMappingsDefine_1.actionMappings.幻象探索选择界面, InputMappingsDefine_1.actionMappings.轮盘2, InputMappingsDefine_1.actionMappings.切换角色1, InputMappingsDefine_1.actionMappings.切换角色2, InputMappingsDefine_1.actionMappings.切换角色3]);
    this._Qc = [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag];
  }
  OnGetActionMap() {
    return this.dYu;
  }
  OnGetAxisMap() {
    return this.mYu;
  }
  OnCheckActionInAllowFightActionNameList(n, e) {
    return !!this.dYu.has(n) || !(e = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(e, this._Qc, true) || !!this.m5g.has(n);
  }
  OnCheckAxisInAllowFightAxisNameList(n, e) {
    return !!this.mYu.has(n) || !(n = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(n, this._Qc, true);
  }
}
exports.SpringManorInputData = SpringManorInputData;
//# sourceMappingURL=SpringManorInputData.js.map