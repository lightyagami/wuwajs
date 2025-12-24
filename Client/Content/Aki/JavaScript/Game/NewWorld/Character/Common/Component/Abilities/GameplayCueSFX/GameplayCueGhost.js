"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueGhost = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const EffectRuntimeGhostEffectContext_1 = require("../../../../../../Effect/EffectContext/EffectRuntimeGhostEffectContext");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../GlobalData");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueGhost extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.m$o = 0;
    this.rjm = 0;
    this.ojm = 20;
    this.njm = 0.25;
    this.sjm = true;
    this._0e = -1;
  }
  OnInit() {
    var t = this.CueConfig.Parameters;
    if (t.length > 0) {
      this.ojm = Number(t[0]);
    }
    if (t.length > 1) {
      this.njm = Number(t[1]);
    }
    if (t.length > 2) {
      this.sjm = Number(t[2]) === 1;
    }
    if (t.length > 3) {
      this._0e = Number(t[3]);
    }
  }
  OnCreate() {
    var t;
    if (this.IsInstant) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "瞬间型Buff不支持配置残影特效", ["BuffId", this.BuffId], ["CueId", this.CueConfig.Id]);
      }
    } else {
      (t = Transform_1.Transform.Create()).SetLocation(this.ActorInternal.D_K2_GetActorLocation());
      this.m$o = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t.ToUeTransform(), this.GetPath(), "[GameplayCueGhost.OnCreate]", this.z5a(), 0);
      this.rjm = this.D9u();
      this.CueComp.AddCueEffectToSet(this.m$o, this.rjm);
    }
  }
  OnDestroy() {
    if (this.m$o && EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.m$o, "[GameplayCueGhost.OnDestroy]", false);
      this.m$o = 0;
    }
  }
  z5a() {
    var t = new EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext(undefined);
    t.SkeletalMeshComp = this.ActorInternal.Mesh;
    t.EntityId = this.EntityHandle.Id;
    t.SpawnRate = this.ojm;
    t.UseSpawnRate = this.sjm;
    t.SpawnInterval = this._0e;
    t.GhostLifeTime = this.njm;
    t.SourceObject = this.ActorInternal;
    return t;
  }
  D9u() {
    var t;
    if (this.BuffHandleId > 0 && (t = this.EntityHandle.Entity?.GetComponent(220)?.GetBuffByHandle(this.BuffHandleId)) && t.GetInstigator()?.GetComponent(0)?.IsRole()) {
      return 1;
    } else {
      return 0;
    }
  }
}
exports.GameplayCueGhost = GameplayCueGhost;
//# sourceMappingURL=GameplayCueGhost.js.map