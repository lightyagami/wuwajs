"use strict";

var SceneItemFanComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var o = arguments.length;
  var n = o < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, s, h);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (e = t[r]) {
        n = (o < 3 ? e(n) : o > 3 ? e(i, s, n) : e(i, s)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(i, s, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemFanComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const FAN_DEFAULT_ROTATE_SPEED = 120;
const FAN_MAX_TRACE_LENGTH_OFFSET = 300;
const FAN_DEFAULT_SPLINE_LENGTH = 300;
const SPLINE_MOVE_SEPPD = 6000;
const FIRST_SPLINE_MOVE_SPEED = 30000;
const WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME = 1000;
const PROFILE_BULLECT_TRACK = "SceneItemFanComponent_StartTrace";
const FAN_SPHERE_TRACE_RADIUS = 10;
const ROTATE_ACTOR_KEY = "RotateActor";
const OFFSET_ACTOR_KEY = "OffsetActor";
const FAN_LOGIC_RANGE = 24000;
class SporeStruct {
  constructor() {
    this.Length = 0;
    this.SporeEntityIds = new Array();
    this.SporeEntityLength = new Array();
    this.gwe = 0;
    this.RootCreatureDataId = 0;
    this.Wsr = undefined;
  }
  Init(t) {
    this.Wsr = t;
  }
  Clear(t = false) {
    if (t) {
      for (let t = this.SporeEntityIds.length - 1; t > -1; t--) {
        var i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.SporeEntityIds[t]);
        if (i && this.Wsr) {
          this.Wsr(i.Entity, true, false);
        }
      }
    }
    this.Length = 0;
    this.SporeEntityIds.length = 0;
    this.SporeEntityLength.length = 0;
    this.gwe = 0;
  }
  NeedTick() {
    return this.SporeEntityIds.length > 0;
  }
  SetPreLength(t) {
    this.gwe = t + 0.01;
    for (let t = this.SporeEntityIds.length - 1; t > -1; t--) {
      if (this.gwe >= this.SporeEntityLength[t]) {
        this.SporeEntityLength.splice(t, 1);
        this.SporeEntityIds.splice(t, 1);
      }
    }
  }
  SpliceToEntity(i) {
    for (let t = this.SporeEntityIds.length - 1; t > -1 && this.SporeEntityIds[t] !== i; t--) {
      this.SporeEntityLength.splice(t, 1);
      this.SporeEntityIds.splice(t, 1);
    }
  }
  Tick(t, i) {
    this.gwe += t * TimeUtil_1.TimeUtil.Millisecond * (i ? FIRST_SPLINE_MOVE_SPEED : SPLINE_MOVE_SEPPD);
    for (let t = this.SporeEntityIds.length - 1; t > -1; t--) {
      var s;
      if (this.gwe > this.SporeEntityLength[t] && (s = this.SporeEntityIds[t], this.SporeEntityLength.splice(t, 1), this.SporeEntityIds.splice(t, 1), s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(s)) && this.Wsr) {
        this.Wsr(s.Entity, true, false);
      }
    }
  }
}
class SplinePoint {
  constructor() {
    this.Location = undefined;
    this.Rotator = undefined;
    this.Offset = undefined;
    this.EntityId = 0;
    this.EffectConfig = undefined;
    this.IsBlockInMiddle = false;
    this.HitLocation = undefined;
    this.HitRotator = undefined;
  }
}
let SceneItemFanComponent = SceneItemFanComponent_1 = class SceneItemFanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.MCn = 0;
    this.ECn = 0;
    this._se = 0;
    this.SCn = undefined;
    this.yCn = 0;
    this.ICn = 0;
    this.TCn = new Map();
    this.LCn = undefined;
    this.DCn = undefined;
    this.Pnr = FAN_DEFAULT_ROTATE_SPEED;
    this.RCn = 0;
    this.UCn = Vector_1.Vector.Create(0, 0, 0);
    this.ACn = undefined;
    this.PCn = undefined;
    this.xCn = undefined;
    this.n$t = undefined;
    this.wCn = undefined;
    this.hwe = undefined;
    this.Ome = undefined;
    this.BCn = undefined;
    this.bCn = undefined;
    this.pTa = undefined;
    this.cz = undefined;
    this.mWi = undefined;
    this._9r = undefined;
    this.qCn = undefined;
    this.GCn = undefined;
    this.NCn = undefined;
    this.OCn = 0;
    this.Xte = undefined;
    this.kCn = undefined;
    this.jnn = undefined;
    this.FCn = false;
    this.VCn = undefined;
    this.HCn = undefined;
    this.SceneInteractionLoadCompleted = false;
    this.Rnn = () => {
      var t;
      var i = !this.SceneInteractionLoadCompleted;
      this.SceneInteractionLoadCompleted = true;
      var s = this.n$t?.GetInteractionMainActor();
      this.HCn = s?.ReferenceActors?.Get(ROTATE_ACTOR_KEY);
      this.jCn();
      var s = s?.ReferenceActors?.Get(OFFSET_ACTOR_KEY);
      if (s) {
        this.UCn = Vector_1.Vector.Create(s.D_K2_GetActorLocation());
        this.UCn.SubtractionEqual(this.n$t.ActorLocationProxy);
        t = Quat_1.Quat.Create();
        this.n$t.ActorRotationProxy.Quaternion().Inverse(t);
        t.RotateVector(this.UCn, this.UCn);
      } else {
        this.UCn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      }
      this.WCn(s);
      this.KCn();
      if (i && !this.QCn && this.FCn) {
        this.Rtn();
      }
    };
    this.XCn = (i, s) => {
      if (!this.IsAnyRotating) {
        let t = undefined;
        if (t = this.QCn ? this : this.ACn) {
          if (!i) {
            this.RGn = s;
          }
          t.$Cn(i, this);
          this.RGn = undefined;
        }
      }
    };
    this.YCn = undefined;
    this.JCn = undefined;
    this.RGn = undefined;
    this.zCn = undefined;
    this.ZCn = false;
    this.egn = (i, s, t) => {
      const h = i.GetComponent(152);
      if (s && !this.tgn && h) {
        h.ign();
      } else {
        if (h) {
          if (s) {
            if (!h.ogn()) {
              return;
            }
          } else if (!h.dce()) {
            return;
          }
        }
        if (this.NCn) {
          if (this.NCn.has(i.Id)) {
            if (s) {
              if (this.NCn.get(i.Id)) {
                return;
              }
            } else if (!this.NCn.get(i.Id)) {
              return;
            }
          } else {
            this.NCn.set(i.Id, s);
          }
        }
        var e;
        if (t) {
          if (t = i.GetComponent(197)) {
            if (s) {
              t.RemoveServerTagByIdLocal(-1152559349, "");
              if (!t.HasTag(-3775711)) {
                t.AddServerTagByIdLocal(-3775711, "");
              }
            } else {
              t.RemoveServerTagByIdLocal(-3775711, "");
              if (!t.HasTag(-1152559349)) {
                t.AddServerTagByIdLocal(-1152559349, "");
              }
            }
            this.NCn.set(i.Id, s);
          }
        } else {
          t = this.n$t.CreatureData.GetCreatureDataId();
          if (e = i.GetComponent(0)?.GetCreatureDataId()) {
            this.rgn(t, e, s, t => {
              if (t?.G9n !== 0) {
                if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Level", 36, "SendBaoziStateRequest Failed", ["ErrorCode", t?.G9n]);
                }
              } else {
                this.NCn.set(i.Id, s);
                if (!s && h) {
                  h.lgn(false, false);
                }
              }
            });
          }
        }
      }
    };
    this.ngn = 0;
    this.oFe = (t, i) => {
      if (t === -511894810 && (this.ACn?.sgn(this.Entity.Id, i), i)) {
        this.agn();
      }
      if (t === -3775711 && i) {
        if (this.QCn && (this.hgn || (this.hgn = true, this.tgn ? this.Tgn(undefined, true) : this.ngn = 5000, Log_1.Log.CheckInfo() && Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] Root Active", ["EntityId", this.Entity.Id])), this.PCn)) {
          for (const s of this.PCn) {
            s?.GetComponent(152)?.lgn(false, false);
          }
        }
        this.lgn(true);
      } else if (t === -1152559349 && i) {
        this.lgn(false, false);
      }
      if (this.QCn && (t === -1152559349 || t === 1298716444) && i) {
        if (this.PCn) {
          for (const h of this.PCn) {
            h?.GetComponent(152)?.agn();
          }
        }
        if (t === 1298716444) {
          this.sAn();
        }
      }
      if (i) {
        for (const e of this.TCn) {
          if (e[0] === t) {
            this.LCn = e[1];
            this._gn();
            return;
          }
        }
      }
      for (const o of this.TCn) {
        if (this.Xte?.HasTag(o[0])) {
          return;
        }
      }
      if (this.LCn !== this.SCn) {
        this.LCn = this.SCn;
        this._gn();
      }
    };
    this.ugn = 0;
    this.rvi = 0;
    this.Hnr = undefined;
    this.cgn = undefined;
    this.mgn = undefined;
    this.dgn = undefined;
    this.XYs = undefined;
    this.YYs = undefined;
    this.Cgn = undefined;
    this.ggn = undefined;
    this.tgn = false;
    this.JYs = false;
    this.fgn = 0;
    this.pgn = 0;
    this.fle = 0;
    this.vgn = 0;
    this.Mgn = 0;
    this.hgn = false;
    this.Egn = false;
    this.$dn = t => {
      this.ExecuteInteract();
    };
    this.Jsn = () => {
      if (!this.QCn && !this.ACn) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 36, "[FanComponent] OnEnterLogicRange RootComponent Is Undefined", ["EntityId", this.Entity.Id]);
        }
        this._va();
      }
    };
    this.KHr = i => {
      var t;
      var s;
      if (this.Mgn > 0 && (this.Mgn -= i, t = MathUtils_1.MathUtils.Lerp(this.fle, this.vgn, 1 - MathUtils_1.MathUtils.Clamp(this.Mgn / this.RCn, 0, 1)), this.hwe.Yaw = t, MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.wCn, this.Ome), this.Sgn(this.Ome, "SceneItemFanComponent Rotate"), this.Mgn <= 0)) {
        this.ygn();
      }
      if (this.QCn) {
        this.Ign(i);
        if (this.GCn?.NeedTick()) {
          this.GCn.Tick(i, this.JYs);
        }
        if (this.ngn > 0) {
          this.ngn -= i;
          let t = true;
          for (const r of this.PCn) {
            var h = r.GetComponent(152);
            if (h && !this.tgn && !h.dce()) {
              t = false;
              break;
            }
          }
          if (t) {
            this.ngn = 0;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] All Child Active", ["EntityId", this.Entity.Id]);
            }
            this.Tgn();
          } else if (this.ngn <= 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] Wait Child Active Timeout", ["EntityId", this.Entity.Id]);
            }
            this.Tgn();
          }
        }
        if (this.zCn) {
          for (let t = this.zCn.length - 1; t > -1; t--) {
            var e;
            var o = this.zCn[t];
            var n = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o);
            if (n?.Valid && n.Entity) {
              if (e = n.Entity.GetComponent(152)) {
                if (e.Valid && e.SceneInteractionLoadCompleted && (e.SetRoot(this), this.PCn.includes(n.Entity) || this.PCn.push(n.Entity), this.zCn.splice(t, 1), Log_1.Log.CheckInfo())) {
                  Log_1.Log.Info("Level", 36, "[Fan.WaitChild]Remove WaitChildId", ["ChildId", o]);
                }
              } else {
                this.zCn.splice(t, 1);
                if (!this.PCn.includes(n.Entity)) {
                  this.PCn.push(n.Entity);
                }
              }
            }
          }
          if (this.zCn.length === 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 36, "[Fan.WaitChild]Clear WaitChildIds", ["EntityId", this.Entity.Id]);
            }
            this.zCn = undefined;
            this.Lgn();
          }
        }
        if (this.XYs && this.YYs) {
          for (let t = this.YYs.length - 1; t > -1; t--) {
            if (this.YYs[t] <= i) {
              s = this.XYs[t];
              this.XYs.splice(t, 1);
              this.YYs.splice(t, 1);
              EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(s, false);
            } else {
              this.YYs[t] -= i;
            }
          }
        }
      }
    };
    this.Dgn = undefined;
    this.Rgn = undefined;
    this.Ugn = undefined;
    this.Itn = undefined;
    this.Agn = 300;
    this.Pgn = undefined;
    this.xgn = -1;
    this.wgn = false;
    this.Bgn = false;
    this.bgn = false;
    this.YJo = undefined;
    this.qgn = undefined;
    this.Ggn = undefined;
    this.Ngn = undefined;
    this.Ogn = 0;
    this.kgn = 0;
    this.Fgn = 0;
    this.Vgn = 0;
    this.Hgn = undefined;
    this.jgn = undefined;
    this.Wgn = undefined;
    this.Kgn = undefined;
    this.Qgn = undefined;
    this.Xgn = undefined;
    this.$gn = undefined;
    this.Ygn = undefined;
    this.Jgn = undefined;
  }
  get QCn() {
    return this.ACn === undefined && this.PCn !== undefined;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemFanComponent_1)[0];
    this.MCn = t.CirclePerRound;
    this.ECn = t.InitCircle;
    if (t.TargetEntityId) {
      this._se = t.TargetEntityId;
    }
    this.tgn = t.GearType === IComponent_1.EFanGearType.LightDeliver;
    if (t.InteractType?.Type === IComponent_1.EFanInteractType.FKey) {
      this.FCn = true;
      this.Pgn = t.InteractType?.TidInteractOptionText;
    }
    this.VCn = t.Condition;
    if (t.EffectConfig) {
      this.SCn = t.EffectConfig;
      this.LCn = this.SCn;
    }
    if (t.EffectByState) {
      for (const s of t.EffectByState) {
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.EntityState);
        if (i) {
          this.TCn.set(i, s.EffectConfig);
        }
      }
    } else {
      this.DCn = this.LCn;
    }
    this.yCn = 360 / this.MCn;
    this.RCn = this.yCn / this.Pnr * TimeUtil_1.TimeUtil.InverseMillisecond;
    return true;
  }
  OnStart() {
    this.Entity.GetComponent(155).RegisterComponent(this);
    if (!this.FCn) {
      EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.$dn);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    this.Entity.GetComponent(122)?.SetLogicRange(FAN_LOGIC_RANGE);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    this.n$t = this.Entity.GetComponent(203);
    if (!this.n$t) {
      return false;
    }
    this.Xte = this.Entity.GetComponent(197);
    this.kCn = this.Entity.GetComponent(162);
    this.jnn = this.Entity.GetComponent(86);
    if (this.TCn.size > 0) {
      for (const i of this.TCn) {
        if (this.Xte?.HasTag(i[0])) {
          this.LCn = i[1];
          break;
        }
      }
      if (this.TCn.has(-3775711)) {
        this.DCn = this.TCn.get(-3775711);
      }
    }
    this.Xte?.AddTagAddOrRemoveListener(-511894810, this.oFe);
    this.Xte?.AddTagAddOrRemoveListener(-3775711, this.oFe);
    this.Xte?.AddTagAddOrRemoveListener(-1152559349, this.oFe);
    this.Xte?.AddTagAddOrRemoveListener(1298716444, this.oFe);
    this.hwe = Rotator_1.Rotator.Create();
    this.Ome = Rotator_1.Rotator.Create();
    this.BCn = Vector_1.Vector.Create();
    this.bCn = Vector_1.Vector.Create();
    this.qgn = Vector_1.Vector.Create();
    this.Ggn = Vector_1.Vector.Create();
    this.Ngn = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.YJo = Vector_1.Vector.Create();
    var t = this.n$t.CreatureData?.ComponentDataMap.get("qys")?.qys;
    if (t) {
      this.ICn = t.WIs;
    }
    if (!Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
    return true;
  }
  OnEnable() {
    if (!Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnDisable(t) {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
  }
  _gn() {
    if (this.QCn && this.ZCn) {
      this.zgn(this.LCn?.EffectPath, 0, this.dgn);
      this.zgn(this.LCn?.HitEffectPath, 0, this.Cgn);
    } else {
      this.ACn?.OnChildCurrentFanEffectChange(this.Entity.Id, this.LCn);
    }
  }
  OnChildCurrentFanEffectChange(s, h) {
    if (this.QCn && this.ZCn) {
      let i = -1;
      for (let t = 0; t < this._9r.length; t++) {
        if (this._9r[t].EntityId === s) {
          i = t;
          this._9r[t].EffectConfig = h;
          break;
        }
      }
      if (i > -1) {
        i += 1;
        this.zgn(h?.EffectPath, i, this.dgn);
        this.zgn(h?.HitEffectPath, i, this.Cgn);
        if (i === this._9r.length - 1 && !this._9r[i].IsBlockInMiddle) {
          this.fTn(i, true, 0);
        }
      }
    }
  }
  WCn(t) {
    if (this.jnn && this.tgn) {
      if (t) {
        this.jnn.SetRangeActorParent(t);
      }
      this.jnn.AddOnActorOverlapCallback(this.XCn);
    }
  }
  Zgn(t = -1) {
    var i;
    this.YCn ||= new UE.VectorDouble(0.1, FAN_SPHERE_TRACE_RADIUS, FAN_SPHERE_TRACE_RADIUS);
    this.JCn ||= new UE.VectorDouble(0, 0, 0);
    if (t < 0) {
      i = this.LCn ? this.LCn.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH;
      this.YCn.X = this.pgn > 0 ? this.pgn / 2 : i / 2;
    } else {
      this.YCn.X = t;
    }
    this.JCn.X = this.YCn.X;
    this.jnn?.UpdateBoxRange(this.JCn, this.YCn);
  }
  $Cn(t, h = undefined) {
    if (h && this.hgn && this.ZCn && this._9r && !(this._9r.length < 1) && this.mWi && this.n$t) {
      var e = h.Entity?.Id;
      let i = undefined;
      let s = -1;
      if (h.QCn) {
        i = this._9r[0];
        s = 0;
      } else {
        for (let t = 0; t < this._9r.length - 1; t++) {
          var o = this._9r[t];
          if (o.EntityId === 0) {
            break;
          }
          if (o.EntityId === e) {
            i = this._9r[t + 1];
            s = t + 1;
          }
        }
      }
      if (i) {
        if (!t) {
          this.mWi.Radius = FAN_SPHERE_TRACE_RADIUS * 0.7;
        }
        var n = h.e0n(this.mWi, this.OCn, i, this.pTa);
        if (n > -1) {
          if (this.o0n && this.xgn === s) {
            this.wgn = false;
            this.Bgn = false;
            this.T0n(this.xgn);
          }
          if (ModelManager_1.ModelManager.CharacterModel?.IsValid(i.EntityId)) {
            this.GCn?.SpliceToEntity(i.EntityId);
            for (let t = this._9r.length - 1; t >= s; t--) {
              var r = this._9r[t];
              var _ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(r.EntityId);
              if (_ && _.Entity) {
                this.egn(_.Entity, false, false);
              }
              if (t > s) {
                this._9r.splice(t, 1);
                SceneItemFanComponent_1.t0n(r);
              }
            }
            i.IsBlockInMiddle = true;
            i.EntityId = 0;
            this.xgn = s;
            this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
            this.i0n(true, false);
          }
          var a = this._9r[s];
          a.HitLocation?.DeepCopy(this.pTa);
          a.Location?.DeepCopy(this.pTa);
          h.r0n().Quaternion().RotateVector(h.UCn, this.BCn);
          this.BCn.AdditionEqual(h.n$t.ActorLocationProxy);
          this.s0n(s, this.BCn.ToUeVector(), this.pTa.ToUeVector());
          var a = Math.min(this._9r.length - 1, Math.min(this.Cgn.length - 1, this.xgn));
          if (a > -1 && (h = EffectSystem_1.EffectSystem.GetEffectActor(this.Cgn[a]))) {
            this.fTn(a, false, 1);
            h.D_K2_SetActorLocationAndRotation(this.pTa.ToUeVector(), this._9r[a].HitRotator.ToUeRotator(), false, undefined, true);
          }
        } else if (n === -3) {
          this.Tgn(e);
        }
        if (!t) {
          this.mWi.Radius = FAN_SPHERE_TRACE_RADIUS;
        }
      }
    }
  }
  e0n(t, h, e, o) {
    this.r0n().Quaternion().RotateVector(this.UCn, this.BCn);
    this.BCn.AdditionEqual(this.n$t.ActorLocationProxy);
    this.n0n().Multiply(h, this.bCn);
    this.bCn.AdditionEqual(this.BCn);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.BCn);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.bCn);
    h = TraceElementCommon_1.TraceElementCommon.SphereTrace(t, PROFILE_BULLECT_TRACK);
    if (h) {
      var n = t.HitResult;
      var r = n.GetHitCount();
      var _ = n.Actors;
      let i = false;
      let s = false;
      for (let t = 0; t < r; t++) {
        var a = _.Get(t);
        if (a !== this.RGn) {
          a = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(a);
          if (a?.Id !== this.Entity.Id) {
            var f = a?.Entity?.GetComponent(152);
            if (f) {
              if (s) {
                i = true;
                break;
              }
              if (f.a0n()) {
                continue;
              }
              if (e.EntityId === 0) {
                return -3;
              }
            }
            if (!s) {
              if (a && a.Entity?.Id === e.EntityId) {
                return -1;
              }
              s = true;
              o.X = n.LocationX_Array.Get(t);
              o.Y = n.LocationY_Array.Get(t);
              o.Z = n.LocationZ_Array.Get(t);
            }
          }
        }
      }
      if (s) {
        h = Vector_1.Vector.Dist(o, this.BCn);
        if (this.DCn?.DefaultEffectLength !== undefined && !i && this.DCn?.DefaultEffectLength < h) {
          return -2;
        } else {
          return h;
        }
      }
    }
    return -2;
  }
  jCn() {
    if (!this.wCn) {
      this.wCn = Rotator_1.Rotator.Create();
      if (this._se !== 0) {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this._se);
        if (t) {
          t = t.Entity.GetComponent(203);
          if (t) {
            t.ActorLocationProxy.Subtraction(this.n$t.ActorLocationProxy, this.cz);
            MathUtils_1.MathUtils.LookRotationUpFirst(this.cz, this.h0n(), this.wCn);
            return;
          }
        }
      }
      this.wCn.DeepCopy(this.r0n());
    }
    this.ICn = this.ICn % this.MCn;
    this.fle = (this.ICn + this.ECn) * this.yCn;
    this.hwe.Yaw = this.fle;
    if (!Info_1.Info.IsBuildShipping) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 36, "[FanComponent]InitRotation", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["StartRotator", this.fle], ["InitRotator", this.wCn.Yaw]);
      }
    }
    MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.wCn, this.Ome);
    this.Sgn(this.Ome, "SceneItemFanComponent Rotate");
  }
  OnEnd() {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    if (this.FCn) {
      this.l0n();
    } else {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.$dn);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    this.Xte?.RemoveTagAddOrRemoveListener(-511894810, this.oFe);
    this.Xte?.RemoveTagAddOrRemoveListener(-3775711, this.oFe);
    this.Xte?.RemoveTagAddOrRemoveListener(-1152559349, this.oFe);
    this.Xte?.RemoveTagAddOrRemoveListener(1298716444, this.oFe);
    this.wCn = undefined;
    this.hwe = undefined;
    this.Ome = undefined;
    this.BCn = undefined;
    this.bCn = undefined;
    this.qgn = undefined;
    this.Ggn = undefined;
    this.Ngn = undefined;
    this.cz = undefined;
    this.YJo = undefined;
    if (this.Hnr) {
      ActorSystem_1.ActorSystem.Put("SceneItemFanComponent.OnEnd1", this.Hnr);
      this.Hnr = undefined;
    }
    if (this.ACn) {
      this.ACn.uva(this.Entity);
    }
    this.ACn = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 36, "[Fan.WaitChild]Clear Root", ["id", this.Entity.Id]);
    }
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "SceneItemFanComponent.OnEnd", true);
    }
    this.rvi = 0;
    this.pTa = undefined;
    this._9r = undefined;
    this.qCn = undefined;
    this.Hgn = undefined;
    this.jgn = undefined;
    this.Wgn = undefined;
    this.Kgn = undefined;
    this.Qgn = undefined;
    this.Xgn = undefined;
    this.$gn = undefined;
    this.Ygn = undefined;
    this.Jgn = undefined;
    this.GCn = undefined;
    this.HCn = undefined;
    if (this.cgn) {
      for (const t of this.cgn) {
        ActorSystem_1.ActorSystem.Put("SceneItemFanComponent.OnEnd2", t);
      }
    }
    this.cgn = undefined;
    this.mgn = undefined;
    if (this.dgn) {
      for (const i of this.dgn) {
        EffectSystem_1.EffectSystem.StopEffectById(i, "SceneItemFanComponent.OnEnd", true);
      }
      this.dgn = undefined;
    }
    if (this.Cgn) {
      for (const s of this.Cgn) {
        EffectSystem_1.EffectSystem.StopEffectById(s, "SceneItemFanComponent.OnEnd", true);
      }
      this.Cgn = undefined;
    }
    this.XYs = undefined;
    this.YYs = undefined;
    this.n$t = undefined;
    this.Xte = undefined;
    this.kCn = undefined;
    this.jnn?.RemoveOnActorOverlapCallback(this.XCn);
    return !(this.jnn = undefined);
  }
  SetRoot(t) {
    this.ACn = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 36, "[Fan.WaitChild]SetRoot", ["id", this.Entity.Id]);
    }
    if (this.ACn?.Xte?.HasTag(-1152559349) || this.ACn?.Xte?.HasTag(1298716444)) {
      this.agn();
    }
  }
  KCn() {
    var t = this.Entity.GetComponent(0);
    if (t?.Valid) {
      t = t.GetBaseInfo().ChildEntityIds;
      if (t && !(t.length < 1)) {
        this.PCn = new Array();
        this.zCn = new Array();
        for (const i of t) {
          this.zCn.push(i);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Level", 36, "[Fan.WaitChild]Add WaitChildId", ["ChildId", i]);
          }
        }
      }
    }
  }
  Lgn() {
    if (this.QCn) {
      if (this.FCn) {
        this.Rtn();
      }
      this.ZCn = true;
      this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.mWi.bIsSingle = false;
      this.mWi.bIgnoreSelf = true;
      this.mWi.Radius = FAN_SPHERE_TRACE_RADIUS;
      this.mWi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
      this.mWi.WorldContextObject = this.n$t.Owner;
      var n = this.n$t.ActorLocationProxy;
      let t = n.X;
      let i = n.Y;
      let s = n.Z;
      let h = n.X;
      let e = n.Y;
      let o = n.Z;
      for (const a of this.PCn) {
        var r = a.GetComponent(203);
        if (r) {
          n = r.ActorLocationProxy;
          t = Math.min(t, n.X);
          i = Math.min(i, n.Y);
          s = Math.min(s, n.Z);
          h = Math.max(h, n.X);
          e = Math.max(e, n.Y);
          o = Math.max(o, n.Z);
        }
      }
      this.OCn = Math.sqrt(Math.pow(h - t, 2) + Math.pow(e - i, 2) + Math.pow(o - s, 2)) + FAN_MAX_TRACE_LENGTH_OFFSET;
      this.xCn = new Set();
      this._9r = new Array();
      this.qCn = new Array();
      this.Hgn = Vector_1.Vector.Create();
      this.jgn = Vector_1.Vector.Create();
      this.Wgn = Vector_1.Vector.Create();
      this.Kgn = Quat_1.Quat.Create();
      this.Qgn = Quat_1.Quat.Create();
      this.Xgn = Quat_1.Quat.Create();
      this.$gn = Vector_1.Vector.Create();
      this.Ygn = Vector_1.Vector.Create();
      this.Jgn = Vector_1.Vector.Create();
      this.pTa = Vector_1.Vector.Create();
      this.GCn = new SporeStruct();
      this.GCn.Init(this.egn);
      this.NCn = new Map();
      this.cgn = new Array();
      this.mgn = new Array();
      this.dgn = new Array();
      this.XYs = new Array();
      this.YYs = new Array();
      this.Cgn = new Array();
      this.ggn = UE.NewArray(UE.VectorDouble);
      this.hgn = this.Xte.HasTag(-3775711);
      if (this.hgn && this.PCn) {
        for (const f of this.PCn) {
          f?.GetComponent(152)?.zYs();
        }
      }
      TimerSystem_1.TimerSystem.Next(() => {
        if (this.hgn) {
          this.Tgn(undefined, true);
        }
        this.Zgn();
      });
      this._gn();
      for (const v of this.PCn) {
        var _ = v.GetComponent(152);
        if (_) {
          _._gn();
        }
      }
    }
  }
  _0n() {
    return this.n$t.ActorLocationProxy;
  }
  aAn() {
    return this.r0n();
  }
  c0n() {
    return this.UCn;
  }
  m0n() {
    return this.DCn;
  }
  static d0n() {
    var t;
    if (SceneItemFanComponent_1.C0n.length < 1) {
      (t = new SplinePoint()).Location = Vector_1.Vector.Create();
      t.Rotator = Rotator_1.Rotator.Create();
      t.Offset = Vector_1.Vector.Create();
      t.HitLocation = Vector_1.Vector.Create();
      t.HitRotator = Rotator_1.Rotator.Create();
      return t;
    } else {
      return SceneItemFanComponent_1.C0n.pop();
    }
  }
  static t0n(t) {
    t.Location.Set(0, 0, 0);
    t.Rotator.Set(0, 0, 0);
    t.Offset.Set(0, 0, 0);
    t.EntityId = 0;
    t.EffectConfig = undefined;
    t.IsBlockInMiddle = false;
    t.HitLocation.Set(0, 0, 0);
    t.HitRotator.Set(0, 0, 0);
    SceneItemFanComponent_1.C0n.push(t);
  }
  g0n(t) {
    this.Egn = true;
    var i = this.n$t.CreatureData.GetCreatureDataId();
    this.f0n(i, t, t => {
      this.Egn = false;
      if (t?.G9n !== 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 36, "SetFanStateResponse Failed", ["ErrorCode", t?.G9n]);
        }
      } else if (!this.hgn) {
        this.hgn = true;
        if (this.tgn) {
          this.Tgn();
        } else {
          this.ngn = 5000;
        }
      }
    });
  }
  dce() {
    return this.Xte?.HasTag(-3775711) ?? false;
  }
  ogn() {
    return this.Xte?.HasTag(-1152559349) ?? false;
  }
  a0n() {
    return this.Xte?.HasTag(-511894810) ?? false;
  }
  sAn() {
    if (this.dgn) {
      for (const i of this.dgn) {
        EffectSystem_1.EffectSystem.StopEffectById(i, "SceneItemFanComponent.OnRootComplete", true);
      }
      this.dgn.length = 0;
    }
    if (this.Cgn) {
      for (const s of this.Cgn) {
        EffectSystem_1.EffectSystem.StopEffectById(s, "SceneItemFanComponent.OnRootComplete", true);
      }
      this.Cgn.length = 0;
    }
    if (this.cgn) {
      for (const h of this.cgn) {
        ActorSystem_1.ActorSystem.Put("SceneItemFanComponent.OnRootComplete", h);
      }
      this.cgn.length = 0;
    }
    if (this.mgn) {
      this.mgn.length = 0;
    }
    for (const e of this.PCn) {
      var t = e.GetComponent(152);
      if (t) {
        t.Zgn(0);
      }
    }
  }
  sgn(s, t) {
    if (t && this.NCn?.has(s)) {
      this.NCn?.delete(s);
    }
    if (this.hgn && this.ZCn && this._9r && !(this._9r.length < 1) && !this.Xte?.HasTag(1298716444)) {
      let i = -1;
      for (let t = 0; t < this._9r.length - 1; t++) {
        var h = this._9r[t];
        if (h.EntityId === 0) {
          break;
        }
        if (h.EntityId === s) {
          i = t - 1;
          break;
        }
      }
      if (i > -1) {
        t = this._9r[i].EntityId;
        this.Tgn(t);
      } else {
        this.Tgn();
      }
    }
  }
  agn() {
    this.Xte?.RemoveTag(1174613996);
    this.Xte?.RemoveTag(942900915);
    this.Xte?.RemoveTag(-216276934);
    var t = this.kCn?.EntityInSocket?.Entity?.GetComponent(197);
    if (t) {
      t.RemoveTag(1174613996);
      t.RemoveTag(942900915);
      t.RemoveTag(-216276934);
    }
    if (this.ugn !== 0) {
      if (t = EntitySystem_1.EntitySystem.GetComponent(this.ugn, 197)) {
        t.RemoveTag(1174613996);
        t.RemoveTag(942900915);
        t.RemoveTag(-216276934);
      }
      this.ugn = 0;
    }
  }
  zYs() {
    if (this.Xte && !this.Xte.HasTag(-1018185327)) {
      this.Xte.AddTag(1174613996);
    }
  }
  lgn(t, i = undefined) {
    var s;
    if (!this.a0n()) {
      if (!this.ACn?.Xte?.HasTag(-1152559349) && !this.ACn?.Xte?.HasTag(1298716444) && (this.Xte && (t ? (this.Xte.RemoveTag(1174613996), this.Xte.HasTag(942900915) || this.Xte.AddTag(942900915), i ? this.Xte.HasTag(-216276934) || this.Xte.AddTag(-216276934) : i !== undefined && this.Xte.RemoveTag(-216276934)) : (this.Xte.HasTag(1174613996) || this.Xte.AddTag(1174613996), this.Xte.RemoveTag(942900915), this.Xte.RemoveTag(-216276934))), s = this.kCn?.EntityInSocket?.Entity?.GetComponent(197))) {
        this.ugn = this.kCn.EntityInSocket.Entity.Id;
        if (t) {
          s.RemoveTag(1174613996);
          if (!s.HasTag(942900915)) {
            s.AddTag(942900915);
          }
          if (i) {
            if (!s.HasTag(-216276934)) {
              s.AddTag(-216276934);
            }
          } else if (i !== undefined) {
            s.RemoveTag(-216276934);
          }
        } else {
          if (!s.HasTag(1174613996)) {
            s.AddTag(1174613996);
          }
          s.RemoveTag(942900915);
          s.RemoveTag(-216276934);
        }
      }
    }
  }
  qWs(t) {
    for (const i of this._9r) {
      if (i.EntityId === t) {
        return true;
      }
    }
    return false;
  }
  Tgn(s = undefined, t = false, i = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 36, "[SceneItemFanComponent] RefreshTraceState", ["EntityId", this.Entity.Id]);
    }
    if (this.QCn) {
      if (this.hgn) {
        if (this.ZCn) {
          if (this.Xte?.HasTag(1298716444)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] RefreshTraceState Failed, Has Completed", ["EntityId", this.Entity.Id]);
            }
          } else if (this.o0n) {
            this.Bgn = true;
          } else {
            this.JYs = t;
            this.xCn.clear();
            for (let t = this.PCn.length - 1; t > -1; t--) {
              var h = this.PCn[t];
              if (h?.Valid) {
                this.xCn.add(h.Id);
              } else {
                this.PCn.splice(t, 1);
              }
            }
            this.qCn.length = 0;
            if (!i) {
              for (const o of this._9r) {
                if (o.EntityId === 0) {
                  break;
                }
                this.qCn.push(o.EntityId);
              }
            }
            if (s) {
              for (let t = this._9r.length - 1; t > 0; t--) {
                if (this._9r[t - 1].EntityId === s) {
                  if (this._9r[t].HitLocation?.Equals(Vector_1.Vector.ZeroVectorProxy)) {
                    this.Ggn.DeepCopy(this._9r[t].Location);
                  } else {
                    this.Ggn.DeepCopy(this._9r[t].HitLocation);
                  }
                  break;
                }
              }
            }
            for (const n of this._9r) {
              SceneItemFanComponent_1.t0n(n);
            }
            this._9r.length = 0;
            this.GCn.Clear();
            this.p0n(this.xCn, this._9r, this.mWi, this.OCn, this.GCn);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Level", 36, "[SceneItemFanComponent] TraceToFan", ["PointCount", this._9r?.length], ["EntityId", this.Entity.Id]);
            }
            if (s) {
              let i = false;
              for (let t = this._9r.length - 1; t > 0; t--) {
                if (this._9r[t - 1].EntityId === s) {
                  i = true;
                  break;
                }
              }
              if (!i) {
                this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
              }
            } else {
              this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
            }
            for (let t = this.PCn.length - 1; t > -1; t--) {
              var e = this.PCn[t];
              if (this.xCn.has(e.Id)) {
                this.egn(e, false, false);
              }
            }
            this.v0n();
            if (this.GCn && this._9r.length > 0 && this.xgn > 0) {
              let i = this.n$t.ActorLocationProxy;
              let s = 0;
              for (let t = 0; t < this.xgn; t++) {
                s += Vector_1.Vector.Dist(i, this._9r[t].Location);
                i = this._9r[t].Location;
              }
              this.GCn.SetPreLength(s);
            }
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsAllChildInitFinish", ["EntityId", this.Entity.Id]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRootFire", ["EntityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 36, "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRoot", ["EntityId", this.Entity.Id]);
    }
  }
  p0n(t, i, s, h, e = undefined) {
    this.fgn = 0;
    var o = this.DCn ? this.DCn.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH;
    var n = SceneItemFanComponent_1.d0n();
    var r = this.M0n(t, s, h, n, e, o);
    this.fgn = this.fgn > 0 ? this.fgn : o;
    if (e) {
      e.Length += this.fgn;
    }
    var o = this.n0n();
    var _ = this.h0n();
    MathUtils_1.MathUtils.LookRotationUpFirst(o, _, n.HitRotator);
    if (r) {
      n.Location?.DeepCopy(r._0n());
      n.Rotator?.DeepCopy(r.aAn());
      n.Offset?.DeepCopy(r.c0n());
      n.EffectConfig = r.m0n();
      n.EntityId = r.Entity.Id;
      i.push(n);
      if (e && (_ = r.Entity.GetComponent(0)?.GetCreatureDataId())) {
        e.SporeEntityIds.push(_);
        e.SporeEntityLength.push(e.Length);
      }
    } else {
      o.Multiply(this.fgn, n.Location);
      n.Location.AdditionEqual(this.n$t.ActorLocationProxy);
      n.Rotator.DeepCopy(Rotator_1.Rotator.ZeroRotatorProxy);
      n.Offset.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      i.push(n);
    }
    if (r) {
      r.p0n(t, i, s, h, e);
    }
  }
  M0n(o, t, n, r, _ = undefined, a = FAN_DEFAULT_SPLINE_LENGTH) {
    this.pgn = 0;
    this.r0n().Quaternion().RotateVector(this.UCn, this.BCn);
    this.BCn.AdditionEqual(this.n$t.ActorLocationProxy);
    this.n0n().Multiply(n, this.bCn);
    this.bCn.AdditionEqual(this.BCn);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.BCn);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.bCn);
    n = TraceElementCommon_1.TraceElementCommon.SphereTrace(t, PROFILE_BULLECT_TRACK);
    if (n) {
      let i = undefined;
      let s = false;
      let h = false;
      let e = undefined;
      var f;
      var v;
      var c;
      var l;
      var d = new Set();
      var m = t.HitResult;
      var E = m.GetHitCount();
      var S = m.Actors;
      for (let t = 0; t < E; t++) {
        var C = S.Get(t);
        if (C !== this.RGn) {
          C = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(C);
          if (C?.Id !== this.Entity.Id) {
            if (C && o.has(C?.Id)) {
              if (C) {
                var I = C.Entity.GetComponent(152);
                if (!I || !I.a0n()) {
                  if (s) {
                    h = true;
                  }
                  if (I) {
                    var p = I.Entity.GetComponent(203)?.ActorLocationProxy;
                    if (p) {
                      this.pgn = Vector_1.Vector.Dist(p, this.n$t.ActorLocationProxy);
                    }
                    if (!s) {
                      e = I;
                      o.delete(C.Id);
                      TraceElementCommon_1.TraceElementCommon.GetHitLocation(m, t, r.HitLocation);
                    }
                    break;
                  }
                  if (!s) {
                    d.add(C);
                  }
                }
              }
            } else if (!s) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(m, t, r.HitLocation);
              i = r.HitLocation;
              s = true;
            }
          }
        }
      }
      if (e && (n = e.Entity.GetComponent(203)?.ActorLocationProxy)) {
        this.fgn = Vector_1.Vector.Dist(n, this.n$t.ActorLocationProxy);
      }
      r.IsBlockInMiddle = h;
      if (i) {
        t = Vector_1.Vector.Dist(i, this.BCn);
        if (e) {
          if (t < this.fgn) {
            this.fgn = t;
          }
        } else {
          if (d.size < 1) {
            if (h) {
              this.fgn = t;
            } else {
              this.fgn = Math.min(a, t);
            }
            return;
          }
          this.fgn = t;
        }
      }
      if (this.fgn > 0) {
        let t = 0;
        for (const L of d) {
          if (L && o.has(L.Id) && (f = L.Entity.GetComponent(203)) && (f = Vector_1.Vector.Dist(this.n$t.ActorLocationProxy, f.ActorLocationProxy)) < this.fgn && (i && f > t && (t = f), o.delete(L.Id), _) && (v = L.Entity.GetComponent(0)?.GetCreatureDataId())) {
            _.SporeEntityIds.push(v);
            _.SporeEntityLength.push(_.Length + f);
          }
        }
        if (i && t > 0) {
          this.fgn = t;
        }
      } else {
        for (const F of d) {
          if (F && o.has(F.Id) && (o.delete(F.Id), c = F.Entity.GetComponent(203)) && ((c = Vector_1.Vector.Dist(c.ActorLocationProxy, this.n$t.ActorLocationProxy)) > this.fgn && (this.fgn = c), _) && (l = F.Entity.GetComponent(0)?.GetCreatureDataId())) {
            _.SporeEntityIds.push(l);
            _.SporeEntityLength.push(_.Length + c);
          }
        }
      }
      return e;
    }
  }
  get IsRotating() {
    return this.Mgn > 0;
  }
  get IsAnyRotating() {
    if (this.Mgn > 0) {
      return true;
    }
    if (!this.QCn) {
      return !!this.ACn && this.ACn.IsAnyRotating;
    }
    if (this.PCn) {
      for (const i of this.PCn) {
        var t = i.GetComponent(152);
        if (t && t.Mgn > 0) {
          return true;
        }
      }
    }
    return false;
  }
  uva(t) {
    if (this.PCn && (t = this.PCn.indexOf(t)) > -1) {
      this.PCn.splice(t, 1);
    }
  }
  _va() {
    var t;
    var i;
    var s = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    if (s !== 0 && (t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(s)) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) && (i = t.Entity?.GetComponent(152))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 36, "[FanComponent] TryToResetRoot Successs", ["EntityId", this.Entity.Id]);
      }
      (this.ACn = i).cva(this, s);
    }
  }
  cva(t, i) {
    var s;
    if (this.PCn && (s = this.Entity.GetComponent(0))?.Valid && !this.PCn.includes(t.Entity) && (s = s.GetBaseInfo().ChildEntityIds)?.includes(i) && this.PCn.length < s.length) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 36, "[FanComponent] TryToResetChild Successs", ["EntityId", this.Entity.Id]);
      }
      this.PCn.push(t.Entity);
      this.Tgn(undefined, false);
    }
  }
  ExecuteInteract() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 36, "[FanComponent] ExecuteInteract", ["EntityId", this.Entity.Id]);
    }
    if (this.Mgn > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 36, "[FanComponent.ExecuteInteract] Self Is Rotating");
      }
    } else if (this.QCn) {
      if (!this.hgn && !this.Egn) {
        this.g0n(true);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 36, "[FanComponent.ExecuteInteract] Self Is Root");
      }
    } else if (this.ACn) {
      if (this.ACn.E0n) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 36, "[FanComponent.ExecuteInteract] Root Is Rotating");
        }
      } else {
        this.ICn = this.ICn % this.MCn;
        this.fle = (this.ICn + this.ECn) * this.yCn;
        this.ICn++;
        this.vgn = (this.ICn + this.ECn) * this.yCn;
        this.Mgn = this.RCn;
        this.hwe.Yaw = this.vgn;
        if (!Info_1.Info.IsBuildShipping) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Level", 36, "[FanComponent]StartRotate", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["StartRotator", this.fle], ["EndRotator", this.vgn], ["CurrentRotateCount", this.ICn]);
          }
        }
        this.ACn?.S0n(this.Entity.Id, this.fle, this.vgn, this.wCn);
        this.Xte?.AddTag(-687845000);
        this.y0n();
        this.I0n(this.n$t.CreatureData.GetCreatureDataId(), this.ICn, t => {
          if (t?.G9n !== 0 && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 36, "SendFanNumberOfTurnsRequest Failed", ["ErrorCode", t?.G9n]);
          }
        });
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 36, "[FanComponent.ExecuteInteract] RootComponent Is Undefined");
      }
      this._va();
    }
  }
  hAn(s) {
    if (this._9r) {
      let i = -1;
      for (let t = 0; t < this._9r.length; t++) {
        if (this._9r[t].EntityId === s) {
          i = t;
          break;
        }
      }
      if (!(i < 0) && !(i >= this.xgn)) {
        this.o0n = false;
        var h = this.mgn.length;
        for (let t = i + 1; t < this._9r.length; t++) {
          var e = EntitySystem_1.EntitySystem.GetComponent(this._9r[t].EntityId, 152);
          if (e) {
            e.Zgn(0);
          }
          this.fTn(t, true, 2);
          if (t < h) {
            this.mgn[t].ClearSplinePoints();
          }
        }
      }
    }
  }
  S0n(s, h, e, o) {
    if (this.QCn && !this.bgn && this.ZCn) {
      this.hAn(s);
      let i = -1;
      for (let t = 0; t < this._9r.length; t++) {
        if (this._9r[t].EntityId === s) {
          i = t;
          break;
        }
      }
      if (!(i < 0) && !(this.xgn = i + 1, this.xgn > this._9r.length - 1)) {
        this.kgn = 0;
        this.Ogn = this.RCn;
        let t = undefined;
        var n;
        var r;
        t = this.xgn === 0 ? (this.$gn.DeepCopy(this.n$t.ActorLocationProxy), this.Ygn.DeepCopy(this.UCn), this.LCn) : (n = this._9r[this.xgn - 1], this.$gn.DeepCopy(n.Location), this.Ygn.DeepCopy(n.Offset), n.EffectConfig);
        this.Vgn = t ? t.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH;
        if (this.Vgn === 0) {
          if (n = this.mgn[this.xgn]) {
            n.ClearSplinePoints();
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 36, "[SceneItemFanComponent] MultiSplineComponents is undefined");
          }
        } else {
          this.YJo.DeepCopy(this._9r[this.xgn].Location);
          n = Vector_1.Vector.ForwardVectorProxy;
          r = this.hwe.Yaw;
          this.hwe.Yaw = e;
          MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome);
          this.Ome.Quaternion().RotateVector(n, this.cz);
          this.bgn = true;
          this.o0n = true;
          this.jgn.DeepCopy(this.cz);
          this.jgn.Normalize();
          this.hwe.Yaw = h;
          MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome);
          this.Ome.Quaternion().RotateVector(n, this.cz);
          this.YJo.Subtraction(this.$gn, this.Hgn);
          this.Fgn = this.Hgn.Size();
          this.Hgn.DeepCopy(this.cz);
          this.Hgn.Normalize();
          this.Hgn.CrossProduct(this.jgn, this.Wgn);
          this.Wgn.Normalize();
          MathUtils_1.MathUtils.LookRotationUpFirst(this.Hgn, this.Wgn, this.Kgn);
          MathUtils_1.MathUtils.LookRotationUpFirst(this.jgn, this.Wgn, this.Qgn);
          this.hwe.Yaw = r;
          this.RefreshSpline(t?.EffectPath, t?.HitEffectPath, this.xgn, true);
        }
      }
    }
  }
  get E0n() {
    return this.bgn;
  }
  ign() {
    this.Xte?.AddTag(217251158);
  }
  OnTick(t) {
    if (Info_1.Info.EnableForceTick) {
      this.KHr(t);
    }
  }
  y0n() {
    if (this.LCn) {
      this.Zgn(this.LCn?.DefaultEffectLength);
    } else {
      this.Zgn(FAN_DEFAULT_SPLINE_LENGTH);
    }
  }
  ygn() {
    if (!this.QCn) {
      if (this.ACn?.qWs(this.Entity.Id)) {
        this.ACn?.Tgn();
      }
      this.Xte?.RemoveTag(-687845000);
    }
  }
  T0n(t) {
    if (t > 0) {
      t = this._9r[t - 1];
      if (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.EntityId)?.Entity?.GetComponent(152)) {
        t.Zgn();
      }
    } else {
      this.Zgn();
    }
  }
  r0n() {
    if (this.HCn) {
      this.Dgn ||= Rotator_1.Rotator.Create();
      this.Dgn.DeepCopy(this.HCn.K2_GetActorRotation());
      return this.Dgn;
    } else {
      return this.n$t.ActorRotationProxy;
    }
  }
  n0n() {
    if (this.HCn) {
      this.Rgn ||= Vector_1.Vector.Create();
      this.Rgn.DeepCopy(this.HCn.GetActorForwardVector());
      return this.Rgn;
    } else {
      return this.n$t.ActorForwardProxy;
    }
  }
  h0n() {
    if (this.HCn) {
      this.Ugn ||= Vector_1.Vector.Create();
      this.Ugn.DeepCopy(this.HCn.GetActorUpVector());
      return this.Ugn;
    } else {
      return this.n$t.ActorUpProxy;
    }
  }
  Sgn(t, i) {
    if (this.HCn) {
      this.HCn.K2_SetActorRotation(t.ToUeRotator(), false);
    } else {
      this.n$t.SetActorRotation(t.ToUeRotator(), i);
    }
  }
  Rtn() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 36, "[SceneItemFanComponent]CreateInteractOption", ["EntityId", this.Entity.Id]);
    }
    var t;
    var i;
    var s;
    var h = this.Entity.GetComponent(198);
    if (h) {
      if (h = h.GetInteractController()) {
        t = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
        if (this.VCn) {
          (i = new CodeDefineLevelConditionInfo_1.LevelCodeConditionCheckGroupInfo()).ConditionGroup = this.VCn;
          t.Conditions.push(i);
        }
        (i = new LevelGameplayActionsDefine_1.ActionInteractFan()).EntityId = this.Entity.Id;
        t.Type = 0;
        (s = new CodeDefineLevelConditionInfo_1.LevelConditionCheckFanIsNotRotatingInfo()).EntityId = this.Entity.Id;
        t.Conditions.push(s);
        if (this.QCn) {
          (s = new CodeDefineLevelConditionInfo_1.LevelConditionCheckEntityTagInfo()).EntityId = this.Entity.Id;
          s.IsContain = true;
          s.TagId = -1152559349;
          t.Conditions.push(s);
        }
        this.Itn = h.AddClientInteractOption(i, t, "Direct", this.Agn, this.Pgn, 2);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 36, "[SceneItemFanComponent]CreateInteractOption Failed_1", ["EntityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 36, "[SceneItemFanComponent]CreateInteractOption Failed_0", ["EntityId", this.Entity.Id]);
    }
  }
  l0n() {
    var t;
    if (this.Itn && (t = this.Entity.GetComponent(198)) && (t = t.GetInteractController())) {
      t.RemoveClientInteractOption(this.Itn);
      this.Itn = undefined;
    }
  }
  set o0n(t) {
    if (this.wgn !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 36, "[SceneItemFanComponent] Set IsSplineMoving", ["Value", t]);
      }
      this.wgn = t;
      if (!this.wgn) {
        this.bgn = false;
        if (this.GCn?.NeedTick()) {
          this.GCn?.Clear(true);
        }
        if (this.Bgn) {
          this.Bgn = false;
          this.Tgn();
        }
      }
    }
  }
  get o0n() {
    return this.wgn;
  }
  v0n() {
    if (this.QCn) {
      this.xgn = -1;
      for (let t = 0; t < this._9r.length; t++) {
        if (this.qCn.length - 1 < t || this._9r[t].EntityId !== this.qCn[t]) {
          this.xgn = t;
          break;
        }
      }
      this.i0n(true);
    }
  }
  s0n(t, i, s) {
    if (this.QCn && t > -1 && t < this.mgn.length && (t = this.mgn[t])) {
      this.ggn.Empty();
      this.ggn.Add(i);
      this.ggn.Add(s);
      t.D_SetSplinePoints(this.ggn, 1);
    }
  }
  i0n(h = false, e = true) {
    let o = undefined;
    let n = undefined;
    let r = -1;
    if (this.xgn > -1 && this.xgn < this._9r.length) {
      if (e && (this.o0n = true, !this.bgn) && this.xgn < this.dgn.length && (e = this.dgn[this.xgn], EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, true), (e = this.XYs.indexOf(e)) > -1)) {
        this.XYs.splice(e, 1);
        this.YYs.splice(e, 1);
      }
      if (this.xgn > 0) {
        e = this.dgn[this.xgn - 1];
        if (!this.XYs.includes(e)) {
          this.XYs.push(e);
          this.YYs.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME);
        }
      }
      if (this.xgn === 0) {
        this.lgn(true, true);
      } else {
        e = this._9r[this.xgn - 1].EntityId;
        if ((e = EntitySystem_1.EntitySystem.GetComponent(e, 152)) && this.xgn < this._9r.length) {
          if (this.xgn === this._9r.length - 1) {
            e.lgn(true, this._9r[this.xgn].IsBlockInMiddle);
          } else {
            e.lgn(true, true);
          }
        }
      }
      let t = undefined;
      let i = undefined;
      let s = undefined;
      s = this.xgn === 0 ? (this.qgn.DeepCopy(this.n$t.ActorLocationProxy), t = this.r0n().Quaternion(), i = this.UCn, this.DCn) : (e = this._9r[this.xgn - 1], this.qgn.DeepCopy(e.Location), t = e.Rotator?.Quaternion(), i = e.Offset, e.EffectConfig);
      t?.RotateVector(i, this.cz);
      this.qgn.AdditionEqual(this.cz);
      if (this.Ggn.Equals(Vector_1.Vector.ZeroVectorProxy)) {
        this.Ggn.DeepCopy(this.qgn);
      }
      var e = s ? s.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH;
      if (this.tgn) {
        if (this.xgn < this._9r.length) {
          _ = Vector_1.Vector.Dist(this.Ggn, this._9r[this.xgn].HitLocation);
          if (this.xgn === this._9r.length - 1 && e < _ && !this._9r[this.xgn].IsBlockInMiddle || this._9r[this.xgn].HitLocation.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            t?.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.YJo);
            this.YJo?.MultiplyEqual(e);
            this.YJo?.AdditionEqual(this.qgn);
          } else {
            this.YJo.DeepCopy(this._9r[this.xgn].HitLocation);
          }
        }
      } else {
        this.YJo.DeepCopy(this._9r[this.xgn].Location);
      }
      this.Ngn.DeepCopy(this.YJo);
      if (!this.tgn) {
        this.Ngn.AdditionEqual(this.cz);
      }
      var _ = Vector_1.Vector.Dist(this.Ggn, this.Ngn);
      var a = this.JYs ? FIRST_SPLINE_MOVE_SPEED : SPLINE_MOVE_SEPPD;
      this.Ogn = _ / a * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.kgn = h ? e / SPLINE_MOVE_SEPPD * TimeUtil_1.TimeUtil.InverseMillisecond : 0;
      this.RefreshSpline(s?.EffectPath, s?.HitEffectPath, this.xgn, h);
      this.L0n(this.xgn);
      if (this.xgn === 0) {
        r = 0;
        if (this._9r[0].IsBlockInMiddle) {
          o = this._9r[0].HitLocation;
          n = this._9r[0].HitRotator;
        }
      } else if (this.Cgn.length > this.xgn && (_ = EffectSystem_1.EffectSystem.GetEffectActor(this.Cgn[this.xgn - 1]))) {
        this.fTn(this.xgn - 1, false, 3);
        _.D_K2_SetActorLocationAndRotation(this._9r[this.xgn - 1].HitLocation.ToUeVector(), this._9r[this.xgn - 1].HitRotator.ToUeRotator(), false, undefined, true);
      }
    } else {
      this.o0n = false;
      if (this.xgn - 1 < this.dgn.length) {
        a = this.dgn[this.xgn - 1];
        if (!this.XYs.includes(a)) {
          this.XYs.push(a);
          this.YYs.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME);
        }
      }
      if (this.xgn === this._9r.length && this.Cgn.length > 1 && (e = this._9r[this.xgn - 1], r = this.xgn - 1, e.IsBlockInMiddle)) {
        o = e.HitLocation;
        n = e.HitRotator;
      }
    }
    if (r > -1 && this.Cgn.length > r) {
      if (o && n) {
        if (this._9r[r].Location) {
          this.fTn(r, false, 4);
          EffectSystem_1.EffectSystem.GetEffectActor(this.Cgn[r])?.D_K2_SetActorLocationAndRotation(o.ToUeVector(), n.ToUeRotator(), false, undefined, true);
        }
      } else {
        this.fTn(r, true, 5);
      }
    }
  }
  Ign(t) {
    var i;
    var s;
    if (this.o0n) {
      if (this.bgn) {
        this.kgn += t;
        i = this.Ogn > 0 ? MathUtils_1.MathUtils.Clamp(this.kgn / this.Ogn, 0, 1) : 1;
        s = MathUtils_1.MathUtils.Lerp(this.Fgn, this.Vgn, i);
        Quat_1.Quat.Slerp(this.Kgn, this.Qgn, i, this.Xgn);
        this.Xgn.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Jgn);
        this.Xgn.RotateVector(this.Ygn, this.cz);
        this.cz.AdditionEqual(this.$gn);
        this.Jgn.MultiplyEqual(s);
        this.Jgn.AdditionEqual(this.cz);
        if (i = this.mgn[this.xgn]) {
          this.ggn.Empty();
          this.ggn.Add(this.cz.ToUeVector());
          this.ggn.Add(this.Jgn.ToUeVector());
          i.D_SetSplinePoints(this.ggn, 1);
        }
        if (this.kgn > this.Ogn) {
          this.T0n(this.xgn);
          this.o0n = false;
          this.bgn = false;
        }
      } else {
        this.kgn += t;
        Vector_1.Vector.Lerp(this.Ggn, this.Ngn, this.Ogn > 0 ? MathUtils_1.MathUtils.Clamp(this.kgn / this.Ogn, 0, 1) : 1, this.YJo);
        if (s = this.mgn[this.xgn]) {
          this.ggn.Empty();
          this.ggn.Add(this.qgn.ToUeVector());
          this.ggn.Add(this.YJo.ToUeVector());
          s.D_SetSplinePoints(this.ggn, 1);
        }
        if (this.kgn > this.Ogn) {
          this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
          this.xgn++;
          this.i0n();
          this.T0n(this.xgn - 1);
        }
      }
    }
  }
  D0n(t, i) {
    var s;
    var h = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    h.D_K2_SetActorLocationAndRotation(this.n$t?.ActorLocation, this.r0n().ToUeRotator(), false, undefined, true);
    var e = h.GetComponentByClass(UE.SplineComponent.StaticClass());
    if (t) {
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, t, "[SceneItemFanComponent.DefaultFanEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        (s = EffectSystem_1.EffectSystem.GetEffectActor(t))?.D_K2_SetActorLocation(h.D_K2_GetActorLocation(), false, undefined, true);
        s?.K2_AttachToActor(h, undefined, 1, 1, 1, false);
        this.cgn?.push(h);
        this.mgn?.push(e);
        this.dgn?.push(t);
        if (i) {
          if (s = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, i, "[SceneItemFanComponent.DefaultFanEffect]", new EffectContext_1.EffectContext(this.Entity.Id))) {
            (t = EffectSystem_1.EffectSystem.GetEffectActor(s))?.D_K2_SetActorLocation(h.D_K2_GetActorLocation(), false, undefined, true);
            t?.K2_AttachToActor(h, undefined, 1, 1, 1, false);
            EffectSystem_1.EffectSystem.SetEffectHidden(s, true);
            this.Cgn?.push(s);
          }
        } else {
          this.Cgn?.push(-1);
        }
      }
    } else {
      this.cgn?.push(h);
      this.mgn?.push(e);
      this.dgn?.push(-1);
      this.Cgn?.push(-1);
    }
  }
  L0n(t) {
    if (t > 0 && t < this.cgn.length) {
      this.cgn[t].D_K2_SetActorLocation(this._9r[t - 1].Location.ToUeVector(), false, undefined, false);
    }
  }
  RefreshSpline(i, s, h, t = false) {
    var e = h + 1;
    if (t) {
      if (e < this.cgn.length) {
        for (let t = e; t < this.cgn.length; t++) {
          this.ggn.Empty();
          this.mgn[t].D_SetSplinePoints(this.ggn, 1);
          EffectSystem_1.EffectSystem.SetEffectHidden(this.dgn[t], true);
        }
      } else {
        if (e <= this.cgn.length && (this.dgn[h] === -1 && this.zgn(i, h, this.dgn), this.Cgn[h] === -1)) {
          this.zgn(s, h, this.Cgn);
        }
        for (let t = this.cgn.length; t < e; t++) {
          this.D0n(i, s);
        }
      }
      for (let t = h; t < this.Cgn.length; t++) {
        this.fTn(t, true, 6);
      }
    } else if (this.cgn.length < e) {
      this.D0n(i, s);
    } else {
      t = this.dgn[h];
      if (i !== EffectSystem_1.EffectSystem.GetPath(t)) {
        this.zgn(i, h, this.dgn);
      } else {
        EffectSystem_1.EffectSystem.ReplayEffect(this.dgn[h], "[SceneItemFanComponent.ReplayEffect1]");
      }
      t = this.Cgn[h];
      if (s !== EffectSystem_1.EffectSystem.GetPath(t)) {
        this.zgn(s, h, this.Cgn);
      } else {
        EffectSystem_1.EffectSystem.ReplayEffect(this.Cgn[h], "[SceneItemFanComponent.ReplayEffect1]");
      }
      this.fTn(h, true, 7);
    }
  }
  fTn(t, i, s) {
    if (t >= this.Cgn.length) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 36, "[SceneItemFanComponent] HideOrShowHitEffect invalid");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 36, "[SceneItemFanComponent] HideOrShowHitEffect", ["index", t], ["hide", i], ["logIndex", s]);
      }
      EffectSystem_1.EffectSystem.SetEffectHidden(this.Cgn[t], i);
    }
  }
  zgn(i, s, h) {
    if (this.cgn && !(this.cgn.length <= s)) {
      var e;
      var o = this.cgn[s];
      var n = h[s];
      let t = false;
      if (n !== 0) {
        if (e = EffectSystem_1.EffectSystem.GetEffectActor(n)) {
          t = true;
          this.cz.DeepCopy(e.D_K2_GetActorLocation());
        }
        EffectSystem_1.EffectSystem.StopEffectById(n, "[SceneItemFanComponent.ReplaceEffect]", true);
      }
      if (i) {
        e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, i, "[SceneItemFanComponent.DefaultFanEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
        if (EffectSystem_1.EffectSystem.IsValid(e)) {
          (n = EffectSystem_1.EffectSystem.GetEffectActor(e))?.D_K2_SetActorLocation(t ? this.cz.ToUeVector() : o.D_K2_GetActorLocation(), false, undefined, true);
          n?.K2_AttachToActor(o, undefined, 1, 1, 1, false);
          h[s] = e;
        }
      } else {
        h[s] = 0;
      }
    }
  }
  I0n(t, i, s) {
    var h = Protocol_1.Aki.Protocol.Tts.create();
    h.F4n = MathUtils_1.MathUtils.NumberToLong(t);
    h.aKn = i;
    Net_1.Net.Call(15055, h, s);
  }
  rgn(t, i, s, h) {
    var e = Protocol_1.Aki.Protocol.Rts.create();
    e.hKn = MathUtils_1.MathUtils.NumberToLong(t);
    e.lKn = MathUtils_1.MathUtils.NumberToLong(i);
    e.WHn = s ? 1 : 0;
    Net_1.Net.Call(23482, e, h);
  }
  f0n(t, i, s) {
    var h = Protocol_1.Aki.Protocol.Ats.create();
    h.hKn = MathUtils_1.MathUtils.NumberToLong(t);
    h.WHn = i ? 1 : 0;
    Net_1.Net.Call(26394, h, s);
  }
};
SceneItemFanComponent.C0n = new Array();
SceneItemFanComponent = SceneItemFanComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(152)], SceneItemFanComponent);
exports.SceneItemFanComponent = SceneItemFanComponent; //# sourceMappingURL=SceneItemFanComponent.js.map