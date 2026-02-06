"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbLightBeamItemLogic = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const GameSplineUtils_1 = require("../../Common/GameSplineUtils");
const RbItemLogicBase_1 = require("./RbItemLogicBase");
const LIGHT_BEAM_BOX_EXTENT_WIDTH = 5;
const LIGHT_BEAM_BOX_EXTENT_HEIGHT = 5;
class RbLightBeamItemLogic extends RbItemLogicBase_1.RbItemLogicBase {
  constructor() {
    super(...arguments);
    this.zln = undefined;
    this.rvi = undefined;
    this.jUn = undefined;
    this.h3g = undefined;
    this.lsg = UE.NewArray(UE.VectorDouble);
    this.UAe = Vector_1.Vector.Create(0, 0, 0);
    this.mWi = undefined;
    this.vtn = undefined;
    this._sg = Vector_1.Vector.Create(0, LIGHT_BEAM_BOX_EXTENT_WIDTH, LIGHT_BEAM_BOX_EXTENT_HEIGHT);
    this.usg = UE.NewArray(UE.VectorDouble);
    this.GAg = UE.NewArray(UE.VectorDouble);
    this.l3g = new UE.VectorDouble();
    this.csg = false;
    this.Nmn = (t, e) => {
      var i;
      if (!this.csg && (!(i = this.ftn(e)) || i.Id !== this.Owner.Entity.Id)) {
        this._3g();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RollBlock", 93, "[RbLightBeamItemLogic] OnActorOverlapCallback", ["CreatureDataId", this.Owner.CreatureDataId], ["actor", e.GetName()], ["selfEntity", this.Owner.Entity.Id], ["actorEntity", i?.Id], ["impactPoint", this.l3g]);
        }
      }
    };
    this.F0n = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RollBlock", 93, "[RbLightBeamItemLogic] SceneItemLockPropChange", ["isLock", t], ["CreatureDataId", this.Owner.CreatureDataId], ["selfEntity", this.Owner.Entity.Id]);
      }
      if (t) {
        this.u3g();
        this.lsg.Empty();
        this.usg.Empty();
        this.v$m();
      } else {
        this._3g();
        this.p$m();
      }
    };
  }
  Start(t) {
    var e = this.Owner.ActorTransform;
    this.zln = e.GetLocation();
    this.vtn = this.Owner.Entity.GetComponent(91);
    var e = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RollBlock", 93, "[RbLightBeamItemLogic.Start] 激光机关初始化", ["CreatureDataId", this.Owner.CreatureDataId], ["selfEntity", this.Owner.Entity.Id], ["LaserPoints", e.rYf]);
    }
    this.gsg(e.rYf);
    if (this.lsg.Num() > 1) {
      this.Csg();
      this._3g();
    }
    this.p$m();
    EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
  }
  End() {
    this.u3g();
    this.lsg.Empty();
    this.usg.Empty();
    this.mWi = undefined;
    this.v$m();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
  }
  OnStateChange(t) {
    if (t === -1278190765) {
      this.u3g();
      this.v$m();
      this.lsg.Empty();
      this.usg.Empty();
      this.mWi = undefined;
    }
  }
  OnRbItemUpdate(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RollBlock", 93, "[RbLightBeamItemLogic.OnRbItemUpdate] 激光机关更新", ["CreatureDataId", this.Owner.CreatureDataId], ["selfEntity", this.Owner.Entity.Id], ["LaserPoints", t.rYf]);
    }
    t = this.gsg(t.rYf);
    this.csg = true;
    if (this.lsg.Num() > 1) {
      if (t) {
        this.Csg();
      }
      this._3g();
      this.c3g();
    }
    this.csg = false;
  }
  gsg(t) {
    if (t.length > 0) {
      var e = Vector_1.Vector.Create(t[0]);
      var t = Vector_1.Vector.Create(t[t.length - 1]);
      if (this.usg.Num() > 0) {
        var i = Vector_1.Vector.Create(this.GAg.Get(0));
        var s = Vector_1.Vector.Create(this.GAg.Get(this.GAg.Num() - 1));
        if (e.Equals(i, MathCommon_1.MathCommon.KindaSmallNumber) && t.Equals(s, MathCommon_1.MathCommon.KindaSmallNumber)) {
          return false;
        }
      }
      this.lsg.Empty();
      this.usg.Empty();
      this.GAg.Empty();
      this.lsg.Add(new UE.VectorDouble(e.X - this.zln.X, e.Y - this.zln.Y, e.Z - this.zln.Z));
      i = new UE.VectorDouble(e.X, e.Y, e.Z);
      this.usg.Add(i);
      this.GAg.Add(i);
      if (!e.Equals(t, MathCommon_1.MathCommon.KindaSmallNumber)) {
        this.lsg.Add(new UE.VectorDouble(t.X - this.zln.X, t.Y - this.zln.Y, t.Z - this.zln.Z));
        s = new UE.VectorDouble(t.X, t.Y, t.Z);
        this.usg.Add(s);
        this.GAg.Add(s);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RollBlock", 93, "[RbLightBeamItemLogic.UpdatePoints] 激光点更新", ["CreatureDataId", this.Owner.CreatureDataId], ["FirstPoint", e], ["LastPoint", t]);
      }
      return true;
    }
    return false;
  }
  _3g() {
    this.d3g();
    if (!this.l3g.Equals(this.usg.Get(this.usg.Num() - 1), MathCommon_1.MathCommon.KindaSmallNumber) || !this.rvi) {
      this.usg.Set(this.usg.Num() - 1, this.l3g);
      this.lsg.Set(this.lsg.Num() - 1, this.l3g.op_Subtraction(this.zln));
      this.fsg();
    }
  }
  Csg() {
    var t = this.usg.Get(0);
    var e = this.usg.Get(this.usg.Num() - 1);
    var i = MathUtils_1.MathUtils.GetCenterOfPoints([Vector_1.Vector.Create(t), Vector_1.Vector.Create(e)]);
    var i = this.Owner.ActorComp.ActorTransform.InverseTransformPosition(i.ToUeVector());
    var t = t.op_Subtraction(e).Size();
    this._sg.X = t * 0.5;
    this.vtn.UpdateBoxRange(i, this._sg.ToUeVector());
  }
  d3g() {
    this.WYr(this.GAg.Get(0), this.GAg.Get(this.GAg.Num() - 1));
    TraceElementCommon_1.TraceElementCommon.BoxTrace(this.mWi, "[RbLightBeamItemLogic.UpdateLightBeam]");
    var t = this.mWi.HitResult;
    if (t && t.bBlockingHit && t.Actors.Get(0)?.IsValid()) {
      this.l3g.X = t.ImpactPointX_Array.Get(0);
      this.l3g.Y = t.ImpactPointY_Array.Get(0);
      this.l3g.Z = t.ImpactPointZ_Array.Get(0);
      return;
    }
    t = this.GAg.Num() - 1;
    this.l3g.X = this.GAg.Get(t).X;
    this.l3g.Y = this.GAg.Get(t).Y;
    this.l3g.Z = this.GAg.Get(t).Z;
  }
  c3g() {
    var t;
    var e;
    var i;
    var s;
    var h;
    if (!this.h3g) {
      if (this.lsg.Num() !== 0 && (t = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.LightBeamStartEffect.ToAssetPathName())) {
        e = new UE.TransformDouble();
        s = this.usg.Get(0);
        h = this.usg.Get(this.usg.Num() - 1);
        (h = Vector_1.Vector.Create(h.op_Subtraction(s))).Normalize();
        i = MathUtils_1.MathUtils.GetAngleByVectorDot(Vector_1.Vector.LeftVectorProxy, h);
        i = new UE.Rotator(0, i, 0);
        s = s.op_Addition(h.ToUeVector().op_Multiply(50));
        e.SetTranslation(s);
        e.SetRotation(i.Quaternion());
        h = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, t, "[RbLightBeamItemLogic] HitEffect]", new EffectContext_1.EffectContext(this.Owner.Entity.Id));
        EffectSystem_1.EffectSystem.GetEffectActor(h).K2_AttachToActor(this.Owner.ActorComp.Owner, undefined, 1, 1, 1, false);
        this.h3g = h;
      }
    }
  }
  fsg() {
    this.m3g();
    if (this.lsg?.Num() !== 0) {
      var e = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.LightBeamEffect.ToAssetPathName();
      this.UAe.FromUeVector(this.zln);
      if (e) {
        var i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(this.UAe, this.lsg, e);
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 93, "[RbLightBeamItemLogic] GenerateGuideEffect failed", ["CreatureDataId", this.Owner.CreatureDataId], ["EffectPath", e]);
          }
          return;
        }
        this.rvi = i.EffectHandle;
        var s = i.SplineComp;
        if (s) {
          var h = s.GetNumberOfSplinePoints();
          for (let t = 0; t < h; t++) {
            s.SetSplinePointType(t, 0, false);
          }
          s.UpdateSpline();
        }
      }
      e = this.GAg.Get(this.GAg.Num() - 1);
      i = this.usg.Get(this.usg.Num() - 1);
      let t = undefined;
      var r = new UE.TransformDouble();
      if (e.Equals(i, MathCommon_1.MathCommon.KindaSmallNumber)) {
        t = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.LightBeamHitWallEffect.ToAssetPathName();
        e = this.usg.Get(0);
        (e = Vector_1.Vector.Create(e.op_Subtraction(i))).Normalize();
        i = MathUtils_1.MathUtils.GetAngleByVectorDot(Vector_1.Vector.RightVectorProxy, e);
        e = new UE.Rotator(0, i, 0);
        r.SetRotation(e.Quaternion());
      } else {
        t = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.LightBeamHitEffect.ToAssetPathName();
      }
      if (t) {
        r.SetTranslation(this.usg.Get(this.usg.Num() - 1));
        i = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, r, t, "[RbLightBeamItemLogic] HitEffect]", new EffectContext_1.EffectContext(this.Owner.Entity.Id));
        EffectSystem_1.EffectSystem.GetEffectActor(i).K2_AttachToActor(this.Owner.ActorComp.Owner, undefined, 1, 1, 1, false);
        this.jUn = i;
      }
    }
  }
  WYr(t, e) {
    if (!this.mWi) {
      this.mWi = UE.NewObject(UE.TraceBoxElement.StaticClass());
      this.mWi.bIgnoreSelf = true;
      this.mWi.bIsSingle = true;
      this.mWi.ActorsToIgnore.Empty();
      var i = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Owner.ActorComp.GetSceneInteractionLevelHandleId());
      for (let t = 0; t < i.Num(); t++) {
        this.mWi.ActorsToIgnore.Add(i.Get(t));
      }
      this.mWi.SetBoxHalfSize(LIGHT_BEAM_BOX_EXTENT_WIDTH, LIGHT_BEAM_BOX_EXTENT_WIDTH, LIGHT_BEAM_BOX_EXTENT_HEIGHT);
      var s = UE.NewArray(UE.BuiltinByte);
      s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      var s = (0, puerts_1.$ref)(s);
      this.mWi.SetObjectTypesQuery(s);
      this.mWi.WorldContextObject = this.Owner.ActorComp.Owner;
    }
    this.mWi.SetStartLocation(t.X, t.Y, t.Z);
    this.mWi.SetEndLocation(e.X, e.Y, e.Z);
  }
  ftn(t) {
    if (t?.IsValid()) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
    }
  }
  p$m() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
  }
  v$m() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
  }
  u3g() {
    this.m3g();
    if (this.h3g) {
      EffectSystem_1.EffectSystem.StopEffectById(this.h3g, "RbLightBeamItemLogic StopAllEffect", true);
      this.h3g = undefined;
    }
  }
  m3g() {
    if (this.rvi) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "RbLightBeamItemLogic StopBeamEffect", true);
      this.rvi = undefined;
    }
    if (this.jUn) {
      EffectSystem_1.EffectSystem.StopEffectById(this.jUn, "RbLightBeamItemLogic StopBeamEffect", true);
      this.jUn = undefined;
    }
  }
}
exports.RbLightBeamItemLogic = RbLightBeamItemLogic;
//# sourceMappingURL=RbLightBeamItemLogic.js.map