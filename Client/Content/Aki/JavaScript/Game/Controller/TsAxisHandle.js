"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsAxisHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const StatDefine_1 = require("../Common/StatDefine");
class TsAxisHandle extends UE.Object {
  constructor() {
    super(...arguments);
    this.PlayerController = undefined;
    this.AxisName = undefined;
    this.OnInputStat = undefined;
    this.OnInputAxisCallback = undefined;
  }
  Constructor() {
    this.OnInputStat = undefined;
    this.OnInputAxisCallback = undefined;
  }
  Initialize(i) {
    this.PlayerController = i;
    this.OnInputStat = Stats_1.Stat.Create("TsAxisHandle.OnInputAxis", "", StatDefine_1.BATTLESTAT_GROUP);
  }
  Reset() {
    this.PlayerController = undefined;
    this.AxisName = undefined;
    this.OnInputAxisCallback = undefined;
  }
  AddAxisBinding(i, t) {
    if (t) {
      this.AxisName = i;
      this.OnInputAxisCallback = t;
      this.PlayerController.AddAxisBinding(FNameUtil_1.FNameUtil.GetDynamicFName(i), this, new UE.FName(this.OnInputAxis.name));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "添加Axis输入绑定时，回调不存在", ["axisName", i]);
    }
  }
  OnInputAxis(i) {
    this.OnInputStat.Start();
    this.OnInputAxisCallback(this.AxisName, i);
    this.OnInputStat.Stop();
  }
}
exports.TsAxisHandle = TsAxisHandle;
exports.default = TsAxisHandle; //# sourceMappingURL=TsAxisHandle.js.map