"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalWorldMotorInputData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const InputEnums_1 = require("../InputEnums");
const BattleInputData_1 = require("./BattleInputData");
class NormalWorldMotorInputData extends BattleInputData_1.BattleInputData {
  constructor() {
    super(...arguments);
    this.dYu = new Map([[InputMappingsDefine_1.actionMappings.载具漂移, InputEnums_1.EInputAction.跳跃], [InputMappingsDefine_1.actionMappings.载具氮气, InputEnums_1.EInputAction.闪避], [InputMappingsDefine_1.actionMappings.载具子弹跳, InputEnums_1.EInputAction.技能1], [InputMappingsDefine_1.actionMappings.载具子弹跳1, InputEnums_1.EInputAction.攻击], [InputMappingsDefine_1.actionMappings.载具退场技和下车, InputEnums_1.EInputAction.大招], [InputMappingsDefine_1.actionMappings.通用交互, InputEnums_1.EInputAction.通用交互], [InputMappingsDefine_1.actionMappings.载具探索工具, InputEnums_1.EInputAction.幻象1], [InputMappingsDefine_1.actionMappings.载具锁定目标, InputEnums_1.EInputAction.锁定目标], [InputMappingsDefine_1.actionMappings.载具视角切换, InputEnums_1.EInputAction.瞄准], [InputMappingsDefine_1.actionMappings.载具空中抬升, InputEnums_1.EInputAction.走跑切换], [InputMappingsDefine_1.actionMappings.载具辅助机攻击, InputEnums_1.EInputAction.攻击]]);
    this.mYu = new Map([[InputMappingsDefine_1.axisMappings.LookUp, InputEnums_1.EInputAxis.LookUp], [InputMappingsDefine_1.axisMappings.Turn, InputEnums_1.EInputAxis.Turn], [InputMappingsDefine_1.axisMappings.MotorMoveForward, InputEnums_1.EInputAxis.MoveForward], [InputMappingsDefine_1.axisMappings.MotorMoveRight, InputEnums_1.EInputAxis.MoveRight], [InputMappingsDefine_1.axisMappings.Zoom, InputEnums_1.EInputAxis.Zoom], [InputMappingsDefine_1.axisMappings.WheelAxis, InputEnums_1.EInputAxis.WheelAxis]]);
  }
  OnGetActionMap() {
    return this.dYu;
  }
  OnGetAxisMap() {
    return this.mYu;
  }
  OnCheckActionInAllowFightActionNameList(n, p) {
    if (n === InputMappingsDefine_1.actionMappings.载具辅助机攻击) {
      return ModelManager_1.ModelManager.SkillButtonUiModel.GetGamepadDataByType(1)?.ShootEnable;
    } else {
      return super.OnCheckActionInAllowFightActionNameList(n, p);
    }
  }
}
exports.NormalWorldMotorInputData = NormalWorldMotorInputData;
//# sourceMappingURL=NormalWorldMotorInputData.js.map