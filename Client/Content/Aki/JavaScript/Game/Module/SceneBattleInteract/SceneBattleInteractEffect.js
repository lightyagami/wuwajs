"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneBattleInteractEffect = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  ColorUtils_1 = require("../../Utils/ColorUtils"),
  SceneBattleInteractPool_1 = require("./SceneBattleInteractPool"),
  PROFILE_BATLLE_INTERACT_WATER_TRACE = "BattleInteractWaterTrace";
class SceneBattleInteractEffect {
  constructor() {
    this.Id = 0, this.WI = !1, this.E0 = 0, this.TFc = 0, this.Lqc = -1, this.MW = 0, this.$W1 = !1, this.wqc = void 0, this.Znl = 0, this.SIa = 0, this.Rqc = 0, this.OC = void 0, this.yen = void 0, this.g1t = FNameUtil_1.FNameUtil.EMPTY, this.mWi = void 0, this.Aqc = 0, this.Pqc = !0, this.cz = Vector_1.Vector.Create(), this.Ls1 = Vector_1.Vector.Create(0, 0, -1), this.r$t = !1, this.Vln = Vector_1.Vector.Create(), this.Wnr = Vector_1.Vector.Create(), this.xqc = void 0, this.ws1 = !1, this.As1 = !1, this.l$l = 0, this._$l = 0, this.c$l = void 0, this.u$l = (t, e, s, h) => {
      if (this.wqc && !(s < this.l$l) && !(s === this.l$l && h < this._$l) && 0 === this.Lqc && !this.r$t && t) {
        var a = e.HitResult;
        let i = !1;
        var o = this.cz;
        if (a?.bBlockingHit) {
          var r = a.GetHitCount();
          for (let t = 0; t < r; t++) {
            var n = a.Components.Get(t).GetCollisionProfileName();
            if (RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(n)) {
              o.X = a.ImpactPointX_Array.Get(t), o.Y = a.ImpactPointY_Array.Get(t), o.Z = a.ImpactPointZ_Array.Get(t), i = !0;
              break
            }
          }
        }
        i && (this.l$l = s, this._$l = h, GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(o.ToUeVector(), this.wqc, this.Wnr.ToUeVector(), this.Id), this.MW <= 0 ? this.r$t = !0 : this.Lqc = this.MW)
      }
    }
  }
  Init(t, i = 0, e = 0) {
    this.wqc = t, this.Znl = 0 < this.wqc.CollisionRadius ? this.wqc.CollisionRadius : i, this.SIa = 0 < this.wqc.CollisionHalfHeight ? this.wqc.CollisionHalfHeight : e, this.Pqc = this.wqc.CollisionOffset.IsZero(), this.MW = this.wqc.Interval, this.koe()
  }
  SetDispatchWeaponEventEnable(t) {
    this.$W1 = t
  }
  BindEntityId(t) {
    this.E0 = t
  }
  SetUpdateLocationFunc(t) {
    this.Rqc = 0, this.xqc = t
  }
  SetUpdateLocationActor(t) {
    this.Rqc = 1, this.OC = t
  }
  SetUpdateLocationSocket(t, i) {
    this.Rqc = 2, this.yen = t, this.g1t = i ?? FNameUtil_1.FNameUtil.EMPTY
  }
  SetDownVector(t) {
    this.Ls1.FromUeVector(t)
  }
  koe() {
    switch (this.Aqc = this.wqc.ShapeType, this.ws1 = !0, this.As1 = !0, this.Aqc) {
      case 0:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceSphereElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water), this.mWi.Radius = this.Znl;
        break;
      case 1:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceCapsuleElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water), this.mWi.Radius = this.Znl, this.mWi.HalfHeight = this.SIa;
        break;
      case 2:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceLineElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water), this.As1 = !1;
        break;
      default:
        this.ws1 = !1, this.As1 = !1
    }
    this.ws1 && (this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l), this.SetDebug(ModelManager_1.ModelManager.SceneBattleInteractModel.Debug))
  }
  OnTick(t) {
    if (!this.r$t && this.WI && !(0 < this.E0 && this.E0 !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()))
      if (0 < this.TFc && (this.TFc -= t, this.TFc <= 0)) this.WI = !1;
      else if (this.wVs(this.Vln), !(-1 === this.Lqc && (this.Wnr.FromUeVector(this.Vln), this.Lqc = 0, this.As1) || (this.Lqc -= t, 0 < this.Lqc))) {
      if (this.Lqc = 0, this.$W1 && GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Broadcast(this.Vln.ToUeVector(), this.wqc, this.Id), !this.ws1) return this.Wnr.Equals(this.Vln) ? void 0 : (GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(Vector_1.Vector.ZeroVectorDouble, this.wqc, this.Vln.ToUeVector(), this.Id), this.nT1(this.Vln), this.Lqc = this.MW, void this.Wnr.FromUeVector(this.Vln));
      if (this.c$l && this.mWi) {
        switch (this.Aqc) {
          case -1:
            break;
          case 0:
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Wnr), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.Vln), TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l);
            break;
          case 1:
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Wnr), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.Vln), TraceElementCommon_1.TraceElementCommon.AsyncCapsuleTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l);
            break;
          case 2:
            this.Vln.Z += this.SIa, this.cz.X = this.Vln.X + this.Ls1.X * this.Znl, this.cz.Y = this.Vln.Y + this.Ls1.Y * this.Znl, this.cz.Z = this.Vln.Z + this.Ls1.Z * this.Znl, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Vln), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.cz), TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l)
        }
        this.Wnr.FromUeVector(this.Vln)
      }
    }
  }
  wVs(t) {
    switch (this.Rqc) {
      case 0:
        this.Pqc ? this.xqc?.(t) : this.xqc?.(t, this.wqc.CollisionOffset);
        break;
      case 1:
        this.OC && (this.Pqc ? t.FromUeVector(this.OC.D_K2_GetActorLocation()) : (i = this.OC.D_GetTransform(), t.FromUeVector(i.TransformPosition(this.wqc.CollisionOffset))));
        break;
      case 2:
        var i;
        this.yen && (this.Pqc ? t.FromUeVector(this.yen.D_GetSocketLocation(this.g1t)) : (i = this.yen.D_GetSocketTransform(this.g1t), t.FromUeVector(i.TransformPosition(this.wqc.CollisionOffset))))
    }
  }
  SetEnable(t, i = 0) {
    this.TFc = i, this.WI !== t && (this.WI = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "SceneBattleInteractEffect SetEnable", ["", t], ["Id", this.Id]), this.Lqc = -1)
  }
  SetIgnoreCommonWeapon(t) {}
  SetDebug(t) {
    this.mWi && (0 === t ? this.mWi.SetDrawDebugTrace(0) : 1 === t ? (this.mWi.SetTraceColor(0, 1, 0, 0), this.mWi.SetTraceHitColor(1, 0, 0, 0), this.mWi.SetDrawDebugTrace(1)) : 2 === t && (this.mWi.DrawTime = 3, this.mWi.SetTraceColor(0, 1, 0, 0), this.mWi.SetTraceHitColor(1, 0, 0, 0), this.mWi.SetDrawDebugTrace(2)))
  }
  nT1(t, i) {
    ModelManager_1.ModelManager.SceneBattleInteractModel.Debug <= 0 || UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t.ToUeVector(), 5, void 0, i ?? ColorUtils_1.ColorUtils.LinearRed, 1)
  }
  Destroy() {
    if (this.wqc = void 0, this.xqc = void 0, this.OC = void 0, this.yen = void 0, this.c$l && ((0, puerts_1.releaseManualReleaseDelegate)(this.u$l), this.c$l = void 0), this.mWi) {
      switch (this.Aqc) {
        case -1:
          break;
        case 0:
          SceneBattleInteractPool_1.SceneBattleInteractPool.RecycleTraceSphereElement(this.mWi);
          break;
        case 1:
          SceneBattleInteractPool_1.SceneBattleInteractPool.RecycleTraceCapsuleElement(this.mWi);
          break;
        case 2:
          SceneBattleInteractPool_1.SceneBattleInteractPool.RecycleTraceLineElement(this.mWi)
      }
      this.mWi = void 0
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "SceneBattleInteractEffect Destroy", ["Id", this.Id])
  }
}
exports.SceneBattleInteractEffect = SceneBattleInteractEffect;
//# sourceMappingURL=SceneBattleInteractEffect.js.map