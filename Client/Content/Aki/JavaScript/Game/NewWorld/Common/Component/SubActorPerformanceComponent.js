"use strict";

var SubActorPerformanceComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, r) {
  var o;
  var i = arguments.length;
  var s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, n, r);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (o = t[c]) {
        s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(e, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubActorPerformanceComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
class OrientActorData {
  constructor(t, e) {
    this.OriginActor = t;
    this.TargetActor = e;
  }
}
let SubActorPerformanceComponent = SubActorPerformanceComponent_1 = class SubActorPerformanceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.y0l = [];
    this.E0l = new Set();
    this.I0l = new Set();
    this.Rnn = () => {
      if (this.Lo?.TowardEntity && this.Lo.TowardEntity.length > 0) {
        for (const n of this.Lo.TowardEntity) {
          var t;
          var e = this.Hte?.GetInteractionMainActor();
          if (e &&= e.ReferenceActors?.Get(n.ReferenceActorKey)) {
            if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.TargetEntityId)) {
              if (t = t?.Entity?.GetComponent(1)) {
                this.y0l.push(new OrientActorData(e, t));
                this.T0l(e);
                this.L0l(n.TargetEntityId);
              }
            } else {
              this.R0l(n.TargetEntityId);
            }
          }
        }
      }
    };
    this.GUe = (t, e, n) => {
      const r = e.PbDataId;
      if (this.E0l.has(r) && (this.E0l.delete(r), this.Lo.TowardEntity?.forEach(t => {
        var e;
        if (t.TargetEntityId === r && (e = (this.Hte?.GetInteractionMainActor()).ReferenceActors?.Get(t.ReferenceActorKey), t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.TargetEntityId)?.Entity?.GetComponent(1), e) && t) {
          this.T0l(e);
          this.y0l.push(new OrientActorData(e, t));
          this.L0l(r);
        }
      }), this.E0l.size === 0)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
      }
    };
    this.zpe = (t, e) => {
      var n;
      if (this.I0l.has(e.PbDataId)) {
        this.I0l.delete(e.PbDataId);
        n = this.y0l.find(t => t.TargetActor.CreatureData.GetPbDataId() === e.PbDataId && (this.U0l(t.OriginActor), true));
        this.y0l.splice(this.y0l.indexOf(n), 1);
        this.R0l(e.PbDataId);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SubActorPerformanceComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
  OnTick(t) {
    this.D0l();
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
    return true;
  }
  D0l() {
    if (this.y0l && this.y0l.length > 0) {
      this.y0l.forEach(t => {
        var e = t.OriginActor.D_K2_GetActorLocation();
        var n = t.TargetActor.ActorLocation;
        var e = UE.KismetMathLibrary.D_FindLookAtRotation(e, n);
        t.OriginActor.K2_SetActorRotation(e, false);
      });
    }
  }
  T0l(e) {
    var t = (0, puerts_1.$ref)(undefined);
    e.GetAttachedActors(t, true);
    var n = (0, puerts_1.$unref)(t);
    for (let t = 0; t < n.Num(); ++t) {
      var r = n.Get(t);
      if (r instanceof UE.StaticMeshActor) {
        r.SetActorHiddenInGame(false);
      } else if (r instanceof UE.BP_EffectActor_C) {
        r.Play("[SubActorPerformanceComp]ShowOrientActor");
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["refActor", e.GetName()], ["subActor", r.GetName()]);
      }
    }
  }
  U0l(e) {
    var t = (0, puerts_1.$ref)(undefined);
    e.GetAttachedActors(t, true);
    var n = (0, puerts_1.$unref)(t);
    for (let t = 0; t < n.Num(); ++t) {
      var r = n.Get(t);
      if (r instanceof UE.StaticMeshActor) {
        r.SetActorHiddenInGame(true);
      } else if (r instanceof UE.BP_EffectActor_C) {
        r.Stop("[SubActorPerformanceComp]ShowOrientActor", false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["refActor", e.GetName()], ["subActor", r.GetName()]);
      }
    }
  }
  R0l(t) {
    this.E0l.add(t);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
  }
  L0l(t) {
    this.I0l.add(t);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
};
SubActorPerformanceComponent = SubActorPerformanceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(269)], SubActorPerformanceComponent);
exports.SubActorPerformanceComponent = SubActorPerformanceComponent; //# sourceMappingURL=SubActorPerformanceComponent.js.map