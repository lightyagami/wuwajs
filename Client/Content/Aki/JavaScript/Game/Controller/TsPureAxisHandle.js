"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPureAxisHandle = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const StatDefine_1 = require("../Common/StatDefine");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
class TsPureAxisHandle {
  constructor() {
    this.R$e = undefined;
    this.sEe = undefined;
    this.fDa = undefined;
    this.pDa = undefined;
    this.ABo = i => {
      this.fDa.Start();
      this.pDa(this.sEe, i, false);
      this.fDa.Stop();
    };
    this.BDa = i => {
      this.fDa.Start();
      this.pDa(this.sEe, i, true);
      this.fDa.Stop();
    };
  }
  Initialize(i) {
    this.R$e = i;
    this.fDa = Stats_1.Stat.Create("TsPureAxisHandle.OnInputAxis", "", StatDefine_1.BATTLESTAT_GROUP);
  }
  Reset() {
    this.R$e = undefined;
    this.sEe = undefined;
    this.pDa = undefined;
  }
  AddAxisBinding(i, e) {
    if (e) {
      this.sEe = i;
      this.pDa = e;
      if (TsPureAxisHandle.bDa.includes(i)) {
        cpp_1.FKuroInputInterface.RegisterAxisBinding(FNameUtil_1.FNameUtil.GetDynamicFName(i), this.R$e, this, this.ABo);
      } else {
        cpp_1.FKuroInputInterface.RegisterAxisBinding(FNameUtil_1.FNameUtil.GetDynamicFName(i), this.R$e, this, this.BDa);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "添加Axis输入绑定时，回调不存在", ["axisName", i]);
    }
  }
}
(exports.TsPureAxisHandle = TsPureAxisHandle).bDa = [InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.LookUpRate, InputMappingsDefine_1.axisMappings.MoveForward, InputMappingsDefine_1.axisMappings.MoveRight, InputMappingsDefine_1.axisMappings.Turn, InputMappingsDefine_1.axisMappings.Zoom, InputMappingsDefine_1.axisMappings.MouseMove, InputMappingsDefine_1.axisMappings.WheelAxis, InputMappingsDefine_1.axisMappings.TrapDefenseMoveForward, InputMappingsDefine_1.axisMappings.TrapDefenseMoveRight, InputMappingsDefine_1.axisMappings.TrapDefenseZoom];
//# sourceMappingURL=TsPureAxisHandle.js.map