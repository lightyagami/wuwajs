"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPureActionHandle = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const StatDefine_1 = require("../Common/StatDefine");
class TsPureActionHandle {
  constructor() {
    this.R$e = undefined;
    this.ZMe = undefined;
    this.dDa = undefined;
    this.CDa = undefined;
    this.gDa = undefined;
    this.OnPressAction = t => {
      this.CDa.Start();
      if (this.dDa) {
        this.dDa(this.ZMe, true, t);
      }
      this.CDa.Stop();
    };
    this.OnReleaseAction = t => {
      this.gDa.Start();
      if (this.dDa) {
        this.dDa(this.ZMe, false, t);
      }
      this.gDa.Stop();
    };
  }
  Initialize(t) {
    this.R$e = t;
    this.CDa = Stats_1.Stat.Create("TsPureActionHandle.OnPressAction", "", StatDefine_1.BATTLESTAT_GROUP);
    this.gDa = Stats_1.Stat.Create("TsPureActionHandle.OnReleaseAction", "", StatDefine_1.BATTLESTAT_GROUP);
  }
  AddActionBinding(t, i) {
    if (i) {
      this.ZMe = t;
      this.dDa = i;
      i = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      cpp_1.FKuroInputInterface.RegisterActionBinding(i, 0, this.R$e, this, this.OnPressAction);
      cpp_1.FKuroInputInterface.RegisterActionBinding(i, 1, this.R$e, this, this.OnReleaseAction);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "添加Action输入绑定时，回调不存在", ["actionName", t]);
    }
  }
  Reset() {
    this.R$e = undefined;
    this.ZMe = undefined;
    this.dDa = undefined;
  }
}
exports.TsPureActionHandle = TsPureActionHandle;
//# sourceMappingURL=TsPureActionHandle.js.map