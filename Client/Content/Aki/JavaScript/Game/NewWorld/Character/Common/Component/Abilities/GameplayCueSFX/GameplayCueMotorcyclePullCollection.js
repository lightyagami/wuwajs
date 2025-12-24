"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMotorcyclePullCollection = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueMotorcyclePullCollection extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.$$o = undefined;
    this.Ptg = undefined;
    this.Wnr = undefined;
  }
  OnInit() {}
  OnTick(e) {
    var t;
    if (this.$$o && this.Ptg?.Valid && this.Ptg.Active && this.Ptg.PullCollectionWithProgress) {
      if (t = this.Ptg.TriggerLocation.ToUeVector()) {
        this.$$o.Tick(t);
        this.Wnr = t;
      } else if (this.Wnr) {
        this.$$o.Tick(this.Wnr);
      }
    }
  }
  OnCreate() {
    var e = this.EntityHandle.Entity?.GetComponent(57);
    if (e?.Valid) {
      if ((e = e.PullingTarget)?.Valid && e.Active) {
        this.Ptg = e;
        this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), e.TriggerLocation.ToUeVector(), this.CueConfig.Resources);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 79, "GameplayCueMotorcyclePullCollection播放失败, 当前探索组件正在交互实体已失效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 79, "GameplayCueMotorcyclePullCollection播放失败, 当前探索组件已失效");
    }
  }
  OnDestroy() {
    if (this.$$o) {
      this.$$o.Destroy();
      this.$$o = undefined;
    }
  }
}
exports.GameplayCueMotorcyclePullCollection = GameplayCueMotorcyclePullCollection;
//# sourceMappingURL=GameplayCueMotorcyclePullCollection.js.map