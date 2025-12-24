"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class AutoPilotInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  constructor() {
    super(...arguments);
    this.tZf = [];
  }
  OnRefresh() {
    return !!ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot() && (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode() ? (this.tZf.length = 0, this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag), this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInput.VehicleMusicInputTag), this.SetInputDistributeTags(this.tZf), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 87, "[InputDistribute] 自动巡航电影模式下允许的输入", ["tagNames", this.tZf])) : (this.tZf.length = 0, this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag), this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInputTag), this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInput.VehicleMusicInputTag), ModelManager_1.ModelManager.AutoPilotModel.IsAllowExitByMove && this.tZf.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag), this.SetInputDistributeTags(this.tZf), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 87, "[InputDistribute] 自动巡航下允许的输入", ["tagNames", this.tZf])), true);
  }
}
exports.AutoPilotInputDistribute = AutoPilotInputDistribute;
//# sourceMappingURL=AutoPilotInputDistribute.js.map