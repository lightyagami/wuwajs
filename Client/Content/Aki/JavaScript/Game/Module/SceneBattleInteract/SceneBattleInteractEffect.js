"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneBattleInteractEffect = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const SceneBattleInteractPool_1 = require("./SceneBattleInteractPool");
const PROFILE_BATLLE_INTERACT_WATER_TRACE = "BattleInteractWaterTrace";
class SceneBattleInteractEffect {
  constructor() {
    this.Id = 0;
    this.WI = false;
    this.E0 = 0;
    this.TFc = 0;
    this.Lqc = -1;
    this.MW = 0;
    this.LQ1 = false;
    this.wqc = undefined;
    this.Znl = 0;
    this.SIa = 0;
    this.Rqc = 0;
    this.OC = undefined;
    this.yen = undefined;
    this.g1t = FNameUtil_1.FNameUtil.EMPTY;
    this.mWi = undefined;
    this.Aqc = 0;
    this.Pqc = true;
    this.cz = Vector_1.Vector.Create();
    this.Ks1 = Vector_1.Vector.Create(0, 0, -1);
    this.r$t = false;
    this.Vln = Vector_1.Vector.Create();
    this.Wnr = Vector_1.Vector.Create();
    this.xqc = undefined;
    this.Xs1 = false;
    this.Ys1 = false;
    this.l$l = 0;
    this._$l = 0;
    this.c$l = undefined;
    this.XRu = false;
    this.YRu = false;
    this.u$l = (t, s, e, h) => {
      if (this.wqc && !(e < this.l$l) && (e !== this.l$l || !(h < this._$l)) && this.Lqc === 0 && !this.r$t && t) {
        var a = s.HitResult;
        let i = false;
        var o = this.cz;
        if (a?.bBlockingHit) {
          var r = a.GetHitCount();
          for (let t = 0; t < r; t++) {
            var n = a.Components.Get(t).GetCollisionProfileName();
            if (RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(n)) {
              o.X = a.ImpactPointX_Array.Get(t);
              o.Y = a.ImpactPointY_Array.Get(t);
              o.Z = a.ImpactPointZ_Array.Get(t);
              i = true;
              break;
            }
          }
        }
        if (i) {
          this.l$l = e;
          this._$l = h;
          GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(o.ToUeVector(), this.wqc, this.Wnr.ToUeVector(), this.Id);
          if (this.MW <= 0) {
            this.r$t = true;
          } else {
            this.Lqc = this.MW;
          }
        }
      }
    };
  }
  Init(t, i = 0, s = 0) {
    this.wqc = t;
    this.Znl = this.wqc.CollisionRadius > 0 ? this.wqc.CollisionRadius : i;
    this.SIa = this.wqc.CollisionHalfHeight > 0 ? this.wqc.CollisionHalfHeight : s;
    this.Pqc = this.wqc.CollisionOffset.IsZero();
    this.MW = this.wqc.Interval;
    this.LQ1 = this.wqc.SendWeaponEvent;
    this.koe();
  }
  SetDispatchWeaponEventEnable(t) {
    if (!this.wqc?.SendWeaponEvent) {
      this.LQ1 = t;
    }
  }
  BindEntityId(t) {
    this.E0 = t;
  }
  SetUpdateLocationFunc(t) {
    this.Rqc = 0;
    this.xqc = t;
  }
  SetUpdateLocationActor(t) {
    this.Rqc = 1;
    this.OC = t;
  }
  SetUpdateLocationSocket(t, i) {
    this.Rqc = 2;
    this.yen = t;
    this.g1t = i ?? FNameUtil_1.FNameUtil.EMPTY;
  }
  SetDownVector(t) {
    this.Ks1.FromUeVector(t);
  }
  SetIsCommonWeapon(t) {
    this.YRu = t;
  }
  koe() {
    this.Aqc = this.wqc.ShapeType;
    this.Xs1 = true;
    this.Ys1 = true;
    switch (this.Aqc) {
      case 0:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceSphereElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        this.mWi.Radius = this.Znl;
        break;
      case 1:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceCapsuleElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        this.mWi.Radius = this.Znl;
        this.mWi.HalfHeight = this.SIa;
        break;
      case 2:
        this.mWi = SceneBattleInteractPool_1.SceneBattleInteractPool.GetTraceLineElement(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        this.Ys1 = false;
        break;
      default:
        this.Xs1 = false;
        this.Ys1 = false;
    }
    if (this.Xs1) {
      this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l);
      this.SetDebug(ModelManager_1.ModelManager.SceneBattleInteractModel.Debug);
    }
  }
  OnTick(t) {
    if (!this.r$t && this.WI && (!this.YRu || !ModelManager_1.ModelManager.SceneBattleInteractModel.IgnoreCommonWeapon) && (!(this.E0 > 0) || this.E0 === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint())) {
      if (this.TFc > 0 && (this.TFc -= t, this.TFc <= 0)) {
        this.WI = false;
      } else {
        this.wVs(this.Vln);
        if ((this.Lqc !== -1 || !(this.Wnr.FromUeVector(this.Vln), this.Lqc = 0, this.Ys1)) && !(this.Lqc -= t, this.Lqc > 0)) {
          this.Lqc = 0;
          if (this.LQ1) {
            GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Broadcast(this.Vln.ToUeVector(), this.wqc, this.Id);
          }
          if (!this.Xs1) {
            if (this.Wnr.Equals(this.Vln)) {
              return undefined;
            } else {
              GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(Vector_1.Vector.ZeroVectorDouble, this.wqc, this.Vln.ToUeVector(), this.Id);
              this.PT1(this.Vln);
              this.Lqc = this.MW;
              this.Wnr.FromUeVector(this.Vln);
              return;
            }
          }
          if (this.c$l && this.mWi) {
            switch (this.Aqc) {
              case -1:
                break;
              case 0:
                TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Wnr);
                TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.Vln);
                TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l);
                break;
              case 1:
                TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Wnr);
                TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.Vln);
                TraceElementCommon_1.TraceElementCommon.AsyncCapsuleTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l);
                break;
              case 2:
                this.Vln.Z += this.SIa;
                this.cz.X = this.Vln.X + this.Ks1.X * this.Znl;
                this.cz.Y = this.Vln.Y + this.Ks1.Y * this.Znl;
                this.cz.Z = this.Vln.Z + this.Ks1.Z * this.Znl;
                TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.Vln);
                TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.cz);
                TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(this.mWi, PROFILE_BATLLE_INTERACT_WATER_TRACE, this.c$l);
            }
            this.Wnr.FromUeVector(this.Vln);
          }
        }
      }
    }
  }
  wVs(t) {
    switch (this.Rqc) {
      case 0:
        if (this.Pqc) {
          this.xqc?.(t);
        } else {
          this.xqc?.(t, this.wqc.CollisionOffset);
        }
        break;
      case 1:
        if (this.OC) {
          if (this.Pqc) {
            t.FromUeVector(this.OC.D_K2_GetActorLocation());
          } else {
            i = this.OC.D_GetTransform();
            t.FromUeVector(i.TransformPosition(this.wqc.CollisionOffset));
          }
        }
        break;
      case 2:
        var i;
        if (this.yen) {
          if (this.Pqc) {
            t.FromUeVector(this.yen.D_GetSocketLocation(this.g1t));
          } else {
            i = this.yen.D_GetSocketTransform(this.g1t);
            t.FromUeVector(i.TransformPosition(this.wqc.CollisionOffset));
          }
        }
    }
  }
  SetEnable(t, i = 0) {
    this.TFc = i;
    if (this.WI !== t) {
      this.WI = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "SceneBattleInteractEffect SetEnable", ["", t], ["Id", this.Id]);
      }
      this.Lqc = -1;
    }
  }
  SetIgnoreCommonWeapon(t) {
    if (this.XRu !== t) {
      this.XRu = t;
      ModelManager_1.ModelManager.SceneBattleInteractModel.RefreshIgnoreCommonWeapon(t);
    }
  }
  GetIgnoreCommonWeapon() {
    return this.XRu;
  }
  SetDebug(t) {
    if (this.mWi) {
      if (t === 0) {
        this.mWi.SetDrawDebugTrace(0);
      } else if (t === 1) {
        this.mWi.SetTraceColor(0, 1, 0, 0);
        this.mWi.SetTraceHitColor(1, 0, 0, 0);
        this.mWi.SetDrawDebugTrace(1);
      } else if (t === 2) {
        this.mWi.DrawTime = 3;
        this.mWi.SetTraceColor(0, 1, 0, 0);
        this.mWi.SetTraceHitColor(1, 0, 0, 0);
        this.mWi.SetDrawDebugTrace(2);
      }
    }
  }
  PT1(t, i) {
    if (!(ModelManager_1.ModelManager.SceneBattleInteractModel.Debug <= 0)) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t.ToUeVector(), 5, undefined, i ?? ColorUtils_1.ColorUtils.LinearRed, 1);
    }
  }
  Destroy() {
    this.SetIgnoreCommonWeapon(false);
    this.wqc = undefined;
    this.xqc = undefined;
    this.OC = undefined;
    this.yen = undefined;
    if (this.c$l) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.u$l);
      this.c$l = undefined;
    }
    if (this.mWi) {
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
          SceneBattleInteractPool_1.SceneBattleInteractPool.RecycleTraceLineElement(this.mWi);
      }
      this.mWi = undefined;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "SceneBattleInteractEffect Destroy", ["Id", this.Id]);
    }
  }
}
exports.SceneBattleInteractEffect = SceneBattleInteractEffect;
//# sourceMappingURL=SceneBattleInteractEffect.js.map