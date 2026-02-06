"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalWorldInputData = undefined;
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const InputEnums_1 = require("../InputEnums");
const BattleInputData_1 = require("./BattleInputData");
class NormalWorldInputData extends BattleInputData_1.BattleInputData {
  constructor() {
    super(...arguments);
    this.dYu = new Map([[InputMappingsDefine_1.actionMappings.跳跃, InputEnums_1.EInputAction.跳跃], [InputMappingsDefine_1.actionMappings.攀爬, InputEnums_1.EInputAction.攀爬], [InputMappingsDefine_1.actionMappings.走跑切换, InputEnums_1.EInputAction.走跑切换], [InputMappingsDefine_1.actionMappings.攻击, InputEnums_1.EInputAction.攻击], [InputMappingsDefine_1.actionMappings.闪避, InputEnums_1.EInputAction.闪避], [InputMappingsDefine_1.actionMappings.技能1, InputEnums_1.EInputAction.技能1], [InputMappingsDefine_1.actionMappings.幻象1, InputEnums_1.EInputAction.幻象1], [InputMappingsDefine_1.actionMappings.大招, InputEnums_1.EInputAction.大招], [InputMappingsDefine_1.actionMappings.幻象2, InputEnums_1.EInputAction.幻象2], [InputMappingsDefine_1.actionMappings.通用交互, InputEnums_1.EInputAction.通用交互], [InputMappingsDefine_1.actionMappings.锁定目标, InputEnums_1.EInputAction.锁定目标], [InputMappingsDefine_1.actionMappings.瞄准, InputEnums_1.EInputAction.瞄准], [InputMappingsDefine_1.actionMappings.下降, InputEnums_1.EInputAction.下降]]);
    this.mYu = new Map([[InputMappingsDefine_1.axisMappings.LookUp, InputEnums_1.EInputAxis.LookUp], [InputMappingsDefine_1.axisMappings.Turn, InputEnums_1.EInputAxis.Turn], [InputMappingsDefine_1.axisMappings.MoveForward, InputEnums_1.EInputAxis.MoveForward], [InputMappingsDefine_1.axisMappings.MoveRight, InputEnums_1.EInputAxis.MoveRight], [InputMappingsDefine_1.axisMappings.Zoom, InputEnums_1.EInputAxis.Zoom], [InputMappingsDefine_1.axisMappings.WheelAxis, InputEnums_1.EInputAxis.WheelAxis]]);
  }
  OnGetActionMap() {
    return this.dYu;
  }
  OnGetAxisMap() {
    return this.mYu;
  }
}
exports.NormalWorldInputData = NormalWorldInputData;
//# sourceMappingURL=NormalWorldInputData.js.map