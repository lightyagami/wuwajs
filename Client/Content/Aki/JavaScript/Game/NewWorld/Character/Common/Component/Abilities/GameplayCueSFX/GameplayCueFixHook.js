"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueFixHook = undefined;
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFixHook extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.$$o = undefined;
    this.VWs = undefined;
    this._1n = () => {
      var t;
      if (this.IsActive && this.VWs) {
        if (this.$$o) {
          this.$$o.Destroy();
          this.$$o = undefined;
        }
        t = this.MTl();
        this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), t, this.CueConfig.Resources);
      }
    };
  }
  OnInit() {}
  OnTick(t) {
    if (this.$$o) {
      this.$$o.Tick(this.STl());
    }
  }
  OnCreate() {
    var t = this.EntityHandle.Entity?.GetComponent(1)?.IsAutonomousProxy;
    var e = t ? this.MTl() : this.STl();
    this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), e, this.CueConfig.Resources);
    if (t && !this.yTl() && (this.VWs = this.ETl(), this.VWs)) {
      this.VWs.RoleTeleport.Add(this._1n);
    }
  }
  OnDestroy() {
    if (this.$$o) {
      this.$$o.Destroy();
      this.$$o = undefined;
    }
    this.VWs?.RoleTeleport.Remove(this._1n);
    this.VWs = undefined;
  }
  STl() {
    return this.EntityHandle.Entity.GetComponent(100).GetCurrentTargetLocation().ToUeVector();
  }
  MTl() {
    return this.EntityHandle.Entity.GetComponent(100).GetCurrentPathwayEndLocation().ToUeVector();
  }
  yTl() {
    return this.EntityHandle.Entity.GetComponent(100).GetIsInLastPathway();
  }
  ETl() {
    return this.EntityHandle.Entity.GetComponent(100).GetCurrentTargetEnterPortalCapture();
  }
}
exports.GameplayCueFixHook = GameplayCueFixHook;
//# sourceMappingURL=GameplayCueFixHook.js.map