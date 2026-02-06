"use strict";

var SubActorPerformanceComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, r) {
  var n;
  var s = arguments.length;
  var o = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, r);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        o = (s < 3 ? n(o) : s > 3 ? n(e, i, o) : n(e, i)) || o;
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
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
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
    this.Rnn = () => {
      var t;
      var e = this.Hte?.GetInteractionMainActor();
      if (e) {
        if (this.Lo?.TowardEntity && this.Lo.TowardEntity.length > 0) {
          for (const n of this.Lo.TowardEntity) {
            var i;
            var r = e.ReferenceActors?.Get(n.ReferenceActorKey);
            if (r) {
              if (i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.TargetEntityId)) {
                if (i = i?.Entity?.GetComponent(1)) {
                  this.y0l.push(new OrientActorData(r, i));
                  this.T0l(r);
                  this.L0l(n.TargetEntityId);
                }
              } else {
                this.R0l(n.TargetEntityId);
              }
            }
          }
        }
        if (this.Lo?.PrefabParams && (t = this.ZHf(this.Lo.PrefabParams)) && (t = this.EIe?.GetEntityVar(t))) {
          this.ejf(this.Lo.PrefabParams.ReferenceActorKey, t);
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.tjf);
        }
      }
    };
    this.GUe = (t, e, i) => {
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
      var i;
      if (this.I0l.has(e.PbDataId)) {
        this.I0l.delete(e.PbDataId);
        i = this.y0l.find(t => t.TargetActor.CreatureData.GetPbDataId() === e.PbDataId && (this.U0l(t.OriginActor), true));
        this.y0l.splice(this.y0l.indexOf(i), 1);
        this.R0l(e.PbDataId);
      }
    };
    this.tjf = (t, e) => {
      var i = this.Lo?.PrefabParams;
      if (i && this.ZHf(i) === t) {
        this.ejf(i.ReferenceActorKey, e);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SubActorPerformanceComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(214);
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
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.EntityVarUpdate, this.tjf)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityVarUpdate, this.tjf);
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
      var r = i.Get(t);
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
    var i = (0, puerts_1.$unref)(t);
    for (let t = 0; t < i.Num(); ++t) {
      var r = i.Get(t);
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
  ZHf(t) {
    if (t.Params.Type === "TimeDisplayMaterial") {
      t = t.Params.TimeDisplayParams;
      if (t.Type === "Var" && t.Var.Source === "Self") {
        return t.Var.Name;
      }
    }
  }
  ejf(t, e) {
    var i;
    var r;
    var n;
    var e = e.nTs;
    if (e && !StringUtils_1.StringUtils.IsBlank(e) && (i = this.Hte?.GetInteractionMainActor()) && (i = i.ReferenceActors?.Get(t)) && (r = i.GetComponentByClass(UE.MeshComponent.StaticClass())) && (n = e.split(":")) && !(n.length < 3)) {
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("01"), Number(n[0][0]));
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("02"), Number(n[0][1]));
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("03"), Number(n[1][0]));
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("04"), Number(n[1][1]));
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("05"), Number(n[2][0]));
      r.SetScalarParameterValueOnMaterials(FNameUtil_1.FNameUtil.GetDynamicFName("06"), Number(n[2][1]));
    }
  }
};
SubActorPerformanceComponent = SubActorPerformanceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(293)], SubActorPerformanceComponent);
exports.SubActorPerformanceComponent = SubActorPerformanceComponent; //# sourceMappingURL=SubActorPerformanceComponent.js.map