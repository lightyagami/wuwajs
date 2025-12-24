"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueSkillTargetBeam = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueBeamCommonItem_1 = require("./CommonItem/GameplayCueBeamCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueSkillTargetBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.u$o = undefined;
    this.v$o = undefined;
    this.dLl = undefined;
    this.xzi = undefined;
    this.ITl = undefined;
    this.ZQl = undefined;
  }
  OnInit() {
    this.u$o = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket);
    this.dLl = new UE.VectorDouble(this.CueConfig.Location.X, this.CueConfig.Location.Y, this.CueConfig.Location.Z);
    this.xzi = new UE.VectorDouble(this.CueConfig.Rotation.X, this.CueConfig.Rotation.Y, this.CueConfig.Rotation.Z);
    this.ITl = this.ActorInternal.D_GetTransform().TransformPositionNoScale(this.dLl);
  }
  OnTick(t) {
    var i = this.u$o ? this.ActorInternal.Mesh.D_GetSocketLocation(this.u$o) : this.ActorInternal.D_K2_GetActorLocation();
    let e = undefined;
    let s = "";
    var h;
    var a = this.EntityHandle.Entity.GetComponent(33);
    var m = this.EntityHandle.Entity.GetComponent(3);
    s = a && m?.IsAutonomousProxy ? (e = a.GetCurrentTarget(), a.GetCurrentTargetSocketName()) : (m = this.EntityHandle.Entity.GetComponent(41), e = m.SkillTarget, m.SkillTargetSocket);
    if (e) {
      if (s) {
        m = (a = e.Entity.GetComponent(3)).Actor.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(s));
        h = a.ActorQuat;
        a = a.ActorScale;
        if (this.ZQl) {
          this.ZQl.SetLocation(m);
          this.ZQl.SetRotation(h);
          this.ZQl.SetScale3D(a);
        } else {
          this.ZQl = new UE.TransformDouble(h, m, a);
        }
        this.ITl = this.ZQl.TransformPositionNoScale(this.xzi);
      } else {
        h = e.Entity.GetComponent(1);
        this.ITl = h.ActorTransform.TransformPositionNoScale(this.xzi);
      }
    }
    this.v$o.Tick([i, this.ITl], t);
  }
  OnCreate() {
    this.v$o = GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(this.ActorInternal, this.CueConfig.Path);
  }
  OnDestroy() {
    this.v$o.Destroy();
  }
  OnEnable() {
    this.v$o.GetOwner().SetActorHiddenInGame(false);
  }
  OnDisable() {
    this.v$o.GetOwner().SetActorHiddenInGame(true);
  }
}
exports.GameplayCueSkillTargetBeam = GameplayCueSkillTargetBeam;
//# sourceMappingURL=GameplayCueSkillTargetBeam.js.map