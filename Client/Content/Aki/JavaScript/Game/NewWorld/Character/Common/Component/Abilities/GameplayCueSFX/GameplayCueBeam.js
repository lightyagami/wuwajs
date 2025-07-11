"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueBeam = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueBeamCommonItem_1 = require("./CommonItem/GameplayCueBeamCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.NBa = undefined;
    this.p$o = undefined;
    this.v$o = undefined;
  }
  OnInit() {
    this.p$o = new Array();
    var s = this.CueConfig.Socket.split("#");
    for (let e = 0, t = s?.length; e < t; e++) {
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[e]));
    }
    this.NBa = this.Instigator?.Entity?.CheckGetComponent(3)?.Actor;
    if (!this.Instigator) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 28, "无法获取Buff特效连线创建者");
      }
    }
    if (this.NBa === this.ActorInternal && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 28, "Buff特效连线两端不能是同一个人");
    }
  }
  OnTick(e) {
    var t;
    var s;
    if (this.NBa.bHidden || this.ActorInternal.bHidden) {
      this.v$o.GetOwner().SetActorHiddenInGame(true);
    } else {
      if (!this.NBa.bHidden && !this.ActorInternal.bHidden) {
        this.v$o.GetOwner().SetActorHiddenInGame(false);
      }
      t = this.p$o[0] ? this.NBa.Mesh.D_GetSocketLocation(this.p$o[0]) : this.NBa.D_K2_GetActorLocation();
      s = this.p$o[1] ? this.ActorInternal.Mesh.D_GetSocketLocation(this.p$o[1]) : this.ActorInternal.D_K2_GetActorLocation();
      this.v$o.Tick([t, s], e);
    }
  }
  OnCreate() {
    this.v$o = GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(this.NBa, this.CueConfig.Path);
  }
  OnDestroy() {
    this.v$o.Destroy();
  }
  static IsSingleInstance() {
    return false;
  }
}
exports.GameplayCueBeam = GameplayCueBeam;
//# sourceMappingURL=GameplayCueBeam.js.map