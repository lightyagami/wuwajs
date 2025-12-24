"use strict";

var SubActorPerformanceComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var r;
  var s = arguments.length;
  var o = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        o = (s < 3 ? r(o) : s > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
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
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
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
    this.EIe = undefined;
    this.y0l = [];
    this.E0l = new Set();
    this.I0l = new Set();
    this.o3f = new UE.FName("01");
    this.n3f = new UE.FName("02");
    this.s3f = new UE.FName("03");
    this.a3f = new UE.FName("04");
    this.h3f = new UE.FName("05");
    this.l3f = new UE.FName("06");
    this.Rnn = () => {
      var t;
      var e = this.Hte?.GetInteractionMainActor();
      if (e) {
        if (this.Lo?.TowardEntity && this.Lo.TowardEntity.length > 0) {
          for (const r of this.Lo.TowardEntity) {
            var i;
            var n = e.ReferenceActors?.Get(r.ReferenceActorKey);
            if (n) {
              if (i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.TargetEntityId)) {
                if (i = i?.Entity?.GetComponent(1)) {
                  this.y0l.push(new OrientActorData(n, i));
                  this.T0l(n);
                  this.L0l(r.TargetEntityId);
                }
              } else {
                this.R0l(r.TargetEntityId);
              }
            }
          }
        }
        if (this.Lo?.PrefabParams && (t = this._3f(this.Lo.PrefabParams)) && (t = this.EIe?.GetEntityVar(t))) {
          this.u3f(this.Lo.PrefabParams.ReferenceActorKey, t);
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.c3f);
        }
      }
    };
    this.GUe = (t, e, i) => {
      const n = e.PbDataId;
      if (this.E0l.has(n) && (this.E0l.delete(n), this.Lo.TowardEntity?.forEach(t => {
        var e;
        if (t.TargetEntityId === n && (e = (this.Hte?.GetInteractionMainActor()).ReferenceActors?.Get(t.ReferenceActorKey), t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.TargetEntityId)?.Entity?.GetComponent(1), e) && t) {
          this.T0l(e);
          this.y0l.push(new OrientActorData(e, t));
          this.L0l(n);
        }
      }), this.E0l.size === 0)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
      }
    };
    this.zpe = (t, e) => {
      var i;
      if (this.I0l.has(e.PbDataId)) {
        this.I0l.delete(e.PbDataId);
        i = this.y0l.find(t => t.TargetActor.CreatureData.GetPbDataId() === e.PbDataId && (this.U0l(t.OriginActor), true));
        this.y0l.splice(this.y0l.indexOf(i), 1);
        this.R0l(e.PbDataId);
      }
    };
    this.c3f = (t, e) => {
      var i = this.Lo?.PrefabParams;
      if (i && this._3f(i) === t) {
        this.u3f(i.ReferenceActorKey, e);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SubActorPerformanceComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(212);
    this.EIe = this.Entity.GetComponent(0);
    EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.Rnn);
    return true;
  }
  OnTick(t) {
    this.D0l();
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.Rnn);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.EntityVarUpdate, this.c3f)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityVarUpdate, this.c3f);
    }
    return true;
  }
  D0l() {
    if (this.y0l && this.y0l.length > 0) {
      this.y0l.forEach(t => {
        var e = t.OriginActor.D_K2_GetActorLocation();
        var i = t.TargetActor.ActorLocation;
        var e = UE.KismetMathLibrary.D_FindLookAtRotation(e, i);
        t.OriginActor.K2_SetActorRotation(e, false);
      });
    }
  }
  T0l(e) {
    var t = (0, puerts_1.$ref)(undefined);
    e.GetAttachedActors(t, true);
    var i = (0, puerts_1.$unref)(t);
    for (let t = 0; t < i.Num(); ++t) {
      var n = i.Get(t);
      if (n instanceof UE.StaticMeshActor) {
        n.SetActorHiddenInGame(false);
      } else if (n instanceof UE.BP_EffectActor_C) {
        n.Play("[SubActorPerformanceComp]ShowOrientActor");
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["refActor", e.GetName()], ["subActor", n.GetName()]);
      }
    }
  }
  U0l(e) {
    var t = (0, puerts_1.$ref)(undefined);
    e.GetAttachedActors(t, true);
    var i = (0, puerts_1.$unref)(t);
    for (let t = 0; t < i.Num(); ++t) {
      var n = i.Get(t);
      if (n instanceof UE.StaticMeshActor) {
        n.SetActorHiddenInGame(true);
      } else if (n instanceof UE.BP_EffectActor_C) {
        n.Stop("[SubActorPerformanceComp]ShowOrientActor", false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["refActor", e.GetName()], ["subActor", n.GetName()]);
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
  _3f(t) {
    if (t.Params.Type === "TimeDisplayMaterial") {
      t = t.Params.TimeDisplayParams;
      if (t.Type === "Var" && t.Var.Source === "Self") {
        return t.Var.Name;
      }
    }
  }
  u3f(t, e) {
    var i;
    var n;
    var r;
    var e = e.nTs;
    if (e && !StringUtils_1.StringUtils.IsBlank(e) && (i = this.Hte?.GetInteractionMainActor()) && (i = i.ReferenceActors?.Get(t)) && (n = i.GetComponentByClass(UE.MeshComponent.StaticClass())) && (r = e.split(":")) && !(r.length < 3)) {
      n.SetScalarParameterValueOnMaterials(this.o3f, Number(r[0][0]));
      n.SetScalarParameterValueOnMaterials(this.n3f, Number(r[0][1]));
      n.SetScalarParameterValueOnMaterials(this.s3f, Number(r[1][0]));
      n.SetScalarParameterValueOnMaterials(this.a3f, Number(r[1][1]));
      n.SetScalarParameterValueOnMaterials(this.h3f, Number(r[2][0]));
      n.SetScalarParameterValueOnMaterials(this.l3f, Number(r[2][1]));
    }
  }
};
SubActorPerformanceComponent = SubActorPerformanceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(291)], SubActorPerformanceComponent);
exports.SubActorPerformanceComponent = SubActorPerformanceComponent; //# sourceMappingURL=SubActorPerformanceComponent.js.map