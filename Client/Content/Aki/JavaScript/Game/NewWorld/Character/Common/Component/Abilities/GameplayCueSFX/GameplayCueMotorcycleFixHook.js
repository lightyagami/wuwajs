"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMotorcycleFixHook = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueMotorcycleFixHook extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.$$o = undefined;
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    var e;
    var o = this.EntityHandle.Entity?.GetComponent(59);
    if (o?.Valid) {
      if (e = o.GetInteractingTargetLocation()) {
        this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), e.ToUeVector(), this.Qjg());
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 79, "GameplayCueMotorcycleFixHook播放失败, interactingTargetLocation为空", ["ClientEntityId", o.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 79, "GameplayCueMotorcycleFixHook播放失败, 当前探索组件已失效");
    }
  }
  Qjg() {
    var o = this.EntityHandle.Entity?.GetComponent(1);
    var t = this.CueConfig.Resources;
    if (!o?.Valid) {
      return t;
    }
    var a = [];
    for (let e = 0; e < t.length; e++) {
      a[e] = o.GetReplaceEffect(t[e]) ?? t[e];
    }
    return a;
  }
  OnDestroy() {
    if (this.$$o) {
      this.$$o.Destroy();
      this.$$o = undefined;
    }
  }
}
exports.GameplayCueMotorcycleFixHook = GameplayCueMotorcycleFixHook;
//# sourceMappingURL=GameplayCueMotorcycleFixHook.js.map