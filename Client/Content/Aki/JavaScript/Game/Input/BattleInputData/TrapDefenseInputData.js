"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseInputData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const InputEnums_1 = require("../InputEnums");
const BattleInputData_1 = require("./BattleInputData");
class TrapDefenseInputData extends BattleInputData_1.BattleInputData {
  constructor() {
    super(...arguments);
    this.Q9u = new Map([[InputMappingsDefine_1.actionMappings.塔防跳跃, InputEnums_1.EInputAction.跳跃], [InputMappingsDefine_1.actionMappings.塔防走跑切换, InputEnums_1.EInputAction.走跑切换], [InputMappingsDefine_1.actionMappings.塔防射击, InputEnums_1.EInputAction.攻击], [InputMappingsDefine_1.actionMappings.塔防冲刺, InputEnums_1.EInputAction.闪避], [InputMappingsDefine_1.actionMappings.塔防道具, InputEnums_1.EInputAction.幻象1]]);
    this.K9u = new Map([[InputMappingsDefine_1.axisMappings.LookUp, InputEnums_1.EInputAxis.LookUp], [InputMappingsDefine_1.axisMappings.Turn, InputEnums_1.EInputAxis.Turn], [InputMappingsDefine_1.axisMappings.TrapDefenseMoveForward, InputEnums_1.EInputAxis.MoveForward], [InputMappingsDefine_1.axisMappings.TrapDefenseMoveRight, InputEnums_1.EInputAxis.MoveRight], [InputMappingsDefine_1.axisMappings.TrapDefenseZoom, InputEnums_1.EInputAxis.Zoom], [InputMappingsDefine_1.axisMappings.WheelAxis, InputEnums_1.EInputAxis.WheelAxis]]);
    this.X9u = [InputMappingsDefine_1.actionMappings.塔防轮盘, InputMappingsDefine_1.actionMappings.塔防道具, InputMappingsDefine_1.actionMappings.塔防旋转, InputMappingsDefine_1.actionMappings.塔防回收机关];
    this.Y9u = [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag];
  }
  OnGetActionMap() {
    return this.Q9u;
  }
  OnGetAxisMap() {
    return this.K9u;
  }
  OnCheckActionInAllowFightActionNameList(n, e) {
    return !!this.Q9u.has(n) || !(e = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(e, this.Y9u, true) || !!this.X9u.includes(n);
  }
  OnCheckAxisInAllowFightAxisNameList(n, e) {
    return !!this.K9u.has(n) || !(n = e.GetInputDistributeTag()) || !ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchInputDistributeTags(n, this.Y9u, true);
  }
}
exports.TrapDefenseInputData = TrapDefenseInputData;
//# sourceMappingURL=TrapDefenseInputData.js.map