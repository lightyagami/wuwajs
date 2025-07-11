"use strict";

var GamePlayHitGearComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(e, i, s) : n(e, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayHitGearComponent = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../LevelGamePlay/LevelGeneralController");
const SceneItemSplineMoveTaskUtils_1 = require("../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent");
const SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
const SPEED_TO_PATROL = 500;
const THOUSAND = 1000;
const MIN_HIT_CD = 0.05;
const hitBulletTypeToIntEnum = new Map(Object.entries(IComponent_1.EHitBulletType).map(([, t], e) => [t, e]));
class EntityCondition {
  constructor(t) {
    this.PbDataId = t;
    this.TagListeners = new Map();
  }
}
let GamePlayHitGearComponent = GamePlayHitGearComponent_1 = class GamePlayHitGearComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Jun = undefined;
    this._pn = undefined;
    this.Gce = undefined;
    this.zun = undefined;
    this.md = undefined;
    this.Zun = undefined;
    this.zie = undefined;
    this.ecn = undefined;
    this.tcn = undefined;
    this.icn = undefined;
    this.ocn = undefined;
    this.rcn = undefined;
    this.ncn = undefined;
    this.scn = undefined;
    this.acn = Vector_1.Vector.Create();
    this.hPl = false;
    this._Pl = undefined;
    this.uPl = undefined;
    this.cPl = undefined;
    this.cEn = 0;
    this.mPl = true;
    this.Lo = undefined;
    this.dPl = () => {
      this.Gce?.RemoveStopMoveCallback(this.dPl);
      this._pn?.SetEnableMovementSync(false, "GamePlayHitGearComponent OnInitialSimpleMoveStopCallback");
      if (!this.ocn) {
        EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
        this.ocn = true;
      }
      this.hPl = true;
      this.CPl();
    };
    this.gPl = (t, e) => {
      this.pPl();
      this.fPl();
    };
    this.CPl = () => {
      var t;
      if (this.hPl) {
        if ((t = this.vPl()) && !this.Gce?.IsSplineMoving()) {
          this.BDe();
        } else if (!t && this.Gce?.IsSplineMoving()) {
          this.qDe();
        }
      }
    };
    this.Zln = t => {
      if (this.lcn(t) && t.DamageId !== 0) {
        var e = this.Entity.GetComponent(133);
        if (!e.IsInState(3)) {
          e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
          if (e - this.ncn > this.rcn * THOUSAND) {
            this._pn?.CollectSampleAndSend(true);
            var i;
            var o = new Array();
            if (this.Lo.HitLogicType.Type === IComponent_1.EHitLogicType.ChangeTargetState) {
              for (const n of this.Lo.HitLogicType.TargetBulletHitConfigs) {
                if (SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(n.HitBullets, t, this.Entity) && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(n.Conditions, this.Entity.GetComponent(1)?.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)) && (i = hitBulletTypeToIntEnum.get(n.HitBullets.Type))) {
                  o.push(i);
                }
              }
            }
            LevelGamePlayController_1.LevelGamePlayController.ShootTargetHitGearStateChangeRequest(this.Entity.Id, o, t.BulletId, t => {
              if (t) {
                if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTargetGearFinished) {
                  if (Log_1.Log.CheckWarn()) {
                    Log_1.Log.Warn("World", 31, "靶机关已完成");
                  }
                } else {
                  if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrTargetGearEntityNotExist) {
                    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
                      if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNoPermission) {
                        return undefined;
                      } else {
                        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 25506);
                        return;
                      }
                    } else {
                      if (this.Entity?.Valid) {
                        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.UpdateSceneItemState);
                      }
                      return;
                    }
                  }
                  if (Log_1.Log.CheckWarn()) {
                    Log_1.Log.Warn("World", 31, "靶机关不存在");
                  }
                }
              }
            });
            this.ncn = e;
          }
        }
      }
    };
    this.lcn = t => {
      return !ModelManager_1.ModelManager.GameModeModel.IsMulti || !!t.Attacker?.Valid && t.Attacker.GetComponent(3).IsAutonomousProxy;
    };
  }
  OnInitData(t) {
    var e = t.GetParam(GamePlayHitGearComponent_1)[0];
    this.Lo = e;
    this.icn = !!e.Patrol;
    if (this.icn) {
      this.zun = e.Patrol?.SplineEntityId;
      this.ecn = e.Patrol?.IsCircle;
      this.tcn = e.Patrol?.IsLookDir;
    } else {
      this.zun = undefined;
      this.ecn = undefined;
      this.tcn = undefined;
    }
    this.ocn = false;
    this.rcn = e.HitCd || MIN_HIT_CD;
    this.ncn = 0;
    if (e.HitBullet) {
      var i;
      switch (e.HitBullet.Type) {
        case IComponent_1.EHitBulletType.OnlyDropAttack:
          this.scn = 1994027462;
          break;
        case IComponent_1.EHitBulletType.CrystalAttack:
          this.scn = -1590436469;
          i = e.HitBullet.TrackOffset;
          this.acn = Vector_1.Vector.Create(i.X, i.Y, i.Z);
          break;
        case IComponent_1.EHitBulletType.PlayerAttack:
        case IComponent_1.EHitBulletType.FixedBulletId:
      }
    }
    this.Entity.GetComponent(121).SetLogicRange(ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange);
    t = this.Lo?.Patrol?.StateConditions;
    if (t && t.length > 0) {
      this._Pl = new Map();
      for (const n of t) {
        let t = this._Pl.get(n.EntityId);
        if (!t) {
          t = new EntityCondition(n.EntityId);
          this._Pl.set(n.EntityId, t);
        }
        var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n.State);
        if (o === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[GamePlayHitGearComponent.OnInitData] 初始化失败, 移动条件配置了错误的TagName");
          }
          return false;
        }
        t.TagListeners.set(o, undefined);
      }
    }
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(202);
    if (!this.Hte) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[SceneItemPatrolComponent.OnInit] SceneItemPatrolComponent初始化失败 Actor Component Undefined");
      }
      return false;
    }
    this.Jun = this.Entity.GetComponent(154);
    this.Jun.RegisterComponent(this, this.Lo);
    this._pn = this.Entity.GetComponent(67);
    this.Gce = this.Entity.GetComponent(128);
    this._pn?.SetEnableMovementSync(false, "GamePlayHitGearComponent OnStart默认关闭");
    if (this.icn && this.zun) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.zun);
      if (!t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 31, "[GamePlayHitGearComponent.OnStart] 无法找到Spline Entity", ["SplineEntityId", this.zun]);
        }
        return false;
      }
      var e = (0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent");
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 31, "[GamePlayHitGearComponent.OnStart] 无法找到SplineComponent配置", ["SplineEntityId", this.zun]);
        }
        return false;
      }
      if (e.Option.Type !== IComponent_1.ESplineType.Patrol) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 31, "[GamePlayHitGearComponent.OnStart] SplineComponent配置类型不是Patrol", ["SplineEntityId", this.zun]);
        }
        return false;
      }
      this.zie = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.zun, this.Entity.GetComponent(0).GetPbDataId());
      e = Vector_1.Vector.Create(t.Transform?.Pos.X ?? 0, t.Transform?.Pos.Y ?? 0, t.Transform?.Pos.Z ?? 0);
      this.md = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.zun);
      this.Zun = this.md.SplineData;
      this.md.D_K2_SetActorLocation(e.ToUeVector(), false, undefined, false);
      t = Vector_1.Vector.Create(this.zie.D_GetLocationAtDistanceAlongSpline(0, 1));
      e = Vector_1.Vector.Dist(t, this.Hte.ActorLocationProxy) / SPEED_TO_PATROL;
      this._pn?.SetEnableMovementSync(true, "GamePlayHitGearComponent InitialSimpleMove");
      this.Gce.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(t, e));
      this.Gce.AddStopMoveCallback(this.dPl);
      this.fPl();
    }
    if (!this.icn) {
      EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
      this.ocn = true;
    }
    return true;
  }
  fPl() {
    if (this._Pl && !(this._Pl.size <= 0)) {
      let t = false;
      for (var [e] of this._Pl) {
        if (!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.IsInit) {
          t = true;
          break;
        }
      }
      if (t) {
        this.uPl ||= WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("GamePlayHitGearComponent.TryRegisterMoveCondition", Array.from(this._Pl.keys()), t => {
          if (t) {
            this.uPl = undefined;
            this.fPl();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[GamePlayHitGearComponent.RegisterMoveCondition] WaitEntity失败");
          }
        }, -1, false, false);
      } else {
        for (var [i, o] of this._Pl) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
          var n = i.Entity?.GetComponent(205);
          if (n) {
            for (var [r, s] of o.TagListeners) {
              if (!s) {
                if (s = n.ListenForTagAddOrRemove(r, this.CPl)) {
                  o.TagListeners.set(r, s);
                }
              }
            }
            if (!EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.RemoveEntity, this.gPl)) {
              EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i, EventDefine_1.EEventName.RemoveEntity, this.gPl);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[GamePlayHitGearComponent.TryRegisterMoveCondition] 监听的实体缺少tagComp", ["EntityId", this.Entity.Id], ["ConditionEntityPbDataId", i.PbDataId]);
          }
        }
        this.CPl();
      }
    }
  }
  pPl() {
    if (this._Pl && !(this._Pl.size <= 0)) {
      for (var [t, e] of this._Pl) {
        for (var [i, o] of e.TagListeners) {
          if (o) {
            o.EndTask();
          }
          e.TagListeners.set(i, undefined);
        }
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
        if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.gPl)) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.gPl);
        }
      }
    }
  }
  BDe() {
    if (!this.cPl) {
      var t = [];
      var e = [];
      for (const i of this.Zun.Points) {
        t.push(i.MoveSpeed);
        e.push(i.StayTime ?? 0);
      }
      this.cPl = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(this.zie);
      SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseOldConfigToSplineMoveParam(this.zie, t, e, true, this.ecn, this.tcn, e[0], this.cPl);
    }
    if (this.mPl) {
      this.cPl.StartTimeOffset = this.Zun.Points[0]?.StayTime ?? 0;
      this.cPl.StartDis = -1;
      this.cPl.EndDis = -1;
      this.mPl = false;
    } else {
      this.cPl.StartTimeOffset = 0;
      this.cPl.StartDis = this.cEn;
    }
    if (!this.Gce.StartSplineMoveAtConstantTimeImplement(this.cPl)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[GamePlayHitGearComponent.StartPatrol] 样条移动开始失败", ["EntityId", this.Entity.Id], ["SplineMoveParam", this.cPl]);
      }
      this._pn?.SetEnableMovementSync(false, "GamePlayHitGearComponent StartPatrol Failed");
    }
  }
  qDe() {
    if (this.Gce?.IsSplineMoving()) {
      this.cEn = this.Gce.GetDistanceAloneSpline();
      this.Gce.StopMove();
      this._pn?.SetEnableMovementSync(false, "GamePlayHitGearComponent StopPatrol");
    }
  }
  OnEnd() {
    if (this.icn && this.zun) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.zun, this.Entity.GetComponent(0).GetPbDataId());
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
    }
    this.pPl();
    this.Jun = undefined;
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    return true;
  }
  IsCanBeManipulateLock() {
    var t = this.Entity.GetComponent(196);
    return this.scn === -1590436469 && t.HasTag(-3775711);
  }
  GetHitPoint() {
    var t = Vector_1.Vector.Create(this.acn);
    var e = Vector_1.Vector.Create();
    var i = Vector_1.Vector.Create();
    this.Hte.ActorForwardProxy.Multiply(t.X, i);
    e.AdditionEqual(i);
    this.Hte.ActorRightProxy.Multiply(t.Y, i);
    e.AdditionEqual(i);
    this.Hte.ActorUpProxy.Multiply(t.Z, i);
    e.AdditionEqual(i);
    this.Hte.ActorLocationProxy.Addition(e, e);
    return e;
  }
  vPl() {
    if (this._Pl && !(this._Pl.size <= 0)) {
      for (var [t, e] of this._Pl) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
        if (!t?.Valid) {
          return false;
        }
        t = t.Entity?.GetComponent(205);
        if (!t) {
          return false;
        }
        if (!t.HasAnyTag(e.TagListeners.keys())) {
          return false;
        }
      }
    }
    return true;
  }
};
GamePlayHitGearComponent = GamePlayHitGearComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(140)], GamePlayHitGearComponent);
exports.GamePlayHitGearComponent = GamePlayHitGearComponent; //# sourceMappingURL=GamePlayHitGearComponent.js.map