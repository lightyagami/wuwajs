"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsActionHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const StatDefine_1 = require("../Common/StatDefine");
class TsActionHandle extends UE.Object {
  constructor() {
    super(...arguments);
    this.PlayerController = undefined;
    this.ActionName = undefined;
    this.OnInputActionCallback = undefined;
    this.OnPressStat = undefined;
    this.OnReleaseStat = undefined;
  }
  Constructor() {
    this.OnInputActionCallback = undefined;
    this.OnPressStat = undefined;
    this.OnReleaseStat = undefined;
  }
  Initialize(t) {
    this.PlayerController = t;
    this.OnPressStat = Stats_1.Stat.Create("TsActionHandle.OnPressAction", "", StatDefine_1.BATTLESTAT_GROUP);
    this.OnReleaseStat = Stats_1.Stat.Create("TsActionHandle.OnReleaseAction", "", StatDefine_1.BATTLESTAT_GROUP);
  }
  Reset() {
    this.PlayerController = undefined;
    this.ActionName = undefined;
    this.OnInputActionCallback = undefined;
  }
  AddActionBinding(t, i) {
    if (i) {
      this.ActionName = t;
      this.OnInputActionCallback = i;
      i = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      this.PlayerController.AddActionBinding(i, 0, this, new UE.FName(this.OnPressAction.name));
      this.PlayerController.AddActionBinding(i, 1, this, new UE.FName(this.OnReleaseAction.name));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "添加Action输入绑定时，回调不存在", ["actionName", t]);
    }
  }
  OnPressAction(t) {
    this.OnPressStat.Start();
    if (this.OnInputActionCallback) {
      this.OnInputActionCallback(this.ActionName, true, t);
    }
    this.OnPressStat.Stop();
  }
  OnReleaseAction(t) {
    this.OnReleaseStat.Start();
    if (this.OnInputActionCallback) {
      this.OnInputActionCallback(this.ActionName, false, t);
    }
    this.OnReleaseStat.Stop();
  }
}
exports.TsActionHandle = TsActionHandle;
exports.default = TsActionHandle; //# sourceMappingURL=TsActionHandle.js.map