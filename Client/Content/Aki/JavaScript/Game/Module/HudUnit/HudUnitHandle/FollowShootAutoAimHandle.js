"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootAutoAimHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FollowShooterDrone_1 = require("../../../NewWorld/Character/Common/Component/Abilities/Follow/FollowShooterDrone");
const FollowUtils_1 = require("../../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const IFollow_1 = require("../../../NewWorld/Character/Common/Component/Abilities/Follow/IFollow");
const LockOnUtils_1 = require("../../../NewWorld/Character/Common/Component/LockOn/LockOnUtils");
const FollowShootAutoAimUnit_1 = require("../HudUnit/FollowShootAutoAimUnit");
const FollowShootOnlyAutoAimUnit_1 = require("../HudUnit/FollowShootOnlyAutoAimUnit");
const FollowShootVisionCarUnit_1 = require("../HudUnit/FollowShootVisionCarUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const PROFILE_KEY = "FollowShootAutoAimHandle_IsBlock";
class FollowShootAutoAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.noi = undefined;
    this.sDe = undefined;
    this.n$t = undefined;
    this.BPl = undefined;
    this.jma = new Vector2D_1.Vector2D();
    this.doh = 0;
    this.hym = undefined;
    this.hoi = undefined;
    this.HFt = 0;
    this.zpe = (t, i) => {
      if (this.sDe === i) {
        this.m$e();
      }
    };
    this.PFa = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAim", ["bVisible", t]);
      }
      if (t) {
        var i = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
        this.iKa(i);
        var i = ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowType();
        if (i !== this.doh && this.noi) {
          this.DestroyHudUnit(this.noi);
          this.noi = undefined;
        }
        this.doh = i;
        if (!this.noi) {
          this.Soi();
          return;
        }
      }
      if (this.noi) {
        this.noi.SetVisible(t);
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.iKa(t);
  }
  iKa(t) {
    if (t !== this.sDe) {
      this.m$e();
      if (t?.Valid) {
        this.sDe = t;
        this.n$t = this.sDe.Entity?.GetComponent(1);
        this.BPl = this.sDe.Entity?.GetComponent(235);
        this.c$e();
        this.HGa();
      } else {
        this.sDe = undefined;
        this.n$t = undefined;
        this.BPl = undefined;
      }
    }
  }
  HGa() {}
  OnDestroyed() {
    this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, this.PFa);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, this.PFa);
  }
  c$e() {
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  m$e() {
    EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  OnTick(t) {
    FollowShootAutoAimHandle.Ult.Start();
    this.Pxl(t);
    this.doi(t);
    FollowShootAutoAimHandle.Ult.Stop();
  }
  Soi() {
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData.GetSightResId();
    if (t && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 96, "[FollowShootAutoAimHandle]创建AimUnit使用配置的ResId", ["", t]);
    }
    switch (this.doh) {
      case 3:
        this.noi = this.NewHudUnitWithReturn(FollowShootAutoAimUnit_1.FollowShootAutoAimUnit, t || "UiView_SightB", true, () => {
          this.HGa();
        });
        break;
      case 4:
        this.noi = this.NewHudUnitWithReturn(FollowShootVisionCarUnit_1.FollowShootVisionCarUnit, t || "UiView_VisionCarSight", true, () => {
          this.noi?.SetActive(true);
          this.HGa();
        });
        break;
      case 6:
        this.noi = this.NewHudUnitWithReturn(FollowShootOnlyAutoAimUnit_1.FollowShootOnlyAutoAimUnit, t || "UiView_VisionCarSight", true, () => {
          this.noi?.SetActive(true);
          this.HGa();
        });
        break;
      default:
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 67, "[FollowShootAutoAimHandle]创建AimUnit失败, followType不合法", ["followType", this.doh]);
        }
    }
    this.noi?.SetVisible(true);
  }
  yoi() {
    if (this.noi) {
      this.DestroyHudUnit(this.noi);
      this.noi = undefined;
    }
  }
  doi(t) {
    var i;
    var e;
    if (this.noi?.GetVisible()) {
      t = !!(i = this.BPl?.LockOnTarget) && this.WRl(i, t);
      e = this.hym?.deref() !== i?.deref();
      if (t) {
        this.hym = i;
      }
      this.noi.SetTargetAimVisible(t, e);
    }
  }
  Pxl(t) {
    var e = this.BPl?.FollowShooterConfig?.LockOnConfig;
    if (this.BPl?.GetEnable() && e && e.Enable && !(e.GapTime <= 0)) {
      if (e.ArrayAutoAimConfig.Num() > 0) {
        let i = false;
        for (let t = 0; t < e.ArrayAutoAimConfig.Num(); t++) {
          var o = e.ArrayAutoAimConfig.Get(t);
          if (FollowShooterDrone_1.FollowShooterDrone.ShouldUpdateRotationToAimAtLockOnTarget(o, this.BPl.Entity.Id)) {
            i = true;
            break;
          }
        }
        if (!i) {
          this.BPl.LockOnTarget = undefined;
          return;
        }
      }
      var i = FollowUtils_1.FollowUtils.GetPlayerFollowHandler(this.BPl.PlayerId, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.GetFollowShooterCustomEntityId(e.CustomEntityKey);
      if (this.HFt === 0) {
        i = this.Yhc(e, this.n$t.Owner, e.Distance, e.WorldDistanceWeight, e.Radius, e.ScreenDistanceWeight, e.CharacterExtraWeight, e.SceneItemExtraWeight, e.LockOnGameplayTagContainer, e.IgnoreLockOnGameplayTagContainer, this.BPl.LockableCategories, [64, 256], i);
        this.BPl.LockOnTarget = i ? new WeakRef(i) : undefined;
      }
      this.HFt += t;
      if (this.HFt > e.GapTime * TimeUtil_1.TimeUtil.InverseMillisecond) {
        this.HFt = 0;
      }
    }
  }
  Coi(t, i, e) {
    if (!this.hoi) {
      this.hoi = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.hoi.bIsSingle = true;
      this.hoi.bIgnoreSelf = true;
      this.hoi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    }
    this.hoi.WorldContextObject = t;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, e);
    if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.hoi, PROFILE_KEY)) {
      return this.hoi.HitResult;
    }
  }
  WRl(t, i) {
    var t = t.deref();
    return !!t?.IsValid() && !!(t = LockOnUtils_1.LockOnUtils.GetLockOnTargetLocation(t)) && !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.jma) && !(this.noi?.SetTargetItemOffset(this.jma.X, this.jma.Y), 0);
  }
  Yhc(i, e, o, s, r, n, l, h, t, a, _, u, m) {
    let v = Number.MIN_VALUE;
    let d = undefined;
    var U = e.D_K2_GetActorLocation();
    if (m !== undefined) {
      m = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(m);
      if (!m) {
        return;
      }
      let t = o;
      for (const O of m) {
        var c = O.GetBulletInfo().BulletRowName;
        if (i.CustomBulletTargetRowNameSet.Contains(c)) {
          c = O.CheckGetComponent(180);
          if (c) {
            const o = U.op_Subtraction(c.ActorLocation).Size();
            if (o < t) {
              t = o;
              d = O.CheckGetComponent(180)?.Owner;
            }
          }
        }
      }
      if (d) {
        return d;
      }
    }
    m = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(o, 255, m);
    for (const k of m) {
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(k, t, a)) {
        let t = 0;
        var f = k.Entity.GetComponent(0);
        var w = k.Entity.GetComponent(1).Owner;
        switch (f?.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
            continue;
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            if (k.Entity.GetComponent(165) === undefined || f.GetBaseInfo().Camp !== 7) {
              continue;
            }
            t = h;
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          case Protocol_1.Aki.Protocol.kks.Proto_Monster:
            var A = k.Entity.GetComponent(2);
            if (A && LockOnUtils_1.LockOnUtils.CheckFriendCamp(A.Actor.Camp)) {
              continue;
            }
            t = l;
        }
        if (this.Jhc(_, f?.GetBaseInfo()?.Category)) {
          var C = LockOnUtils_1.LockOnUtils.GetLockOnTargetLocation(w);
          if (C) {
            var E = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(C, this.jma);
            var S = this.jma.Size();
            if (E && !(r < S)) {
              E = this.Coi(e, U, C);
              if (E?.bBlockingHit) {
                var E = E.Actors.Get(0);
                var F = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(E);
                if (w !== E && w !== F) {
                  continue;
                }
              }
              E = (1 - U.op_Subtraction(C).Size() / o) * s + (1 - S / r) * n + t;
              if (!(E < v)) {
                v = E;
                d = w;
              }
            }
          }
        }
      }
    }
    if (u && u.length > 0) {
      var p = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(Global_1.Global.BaseCharacter, UE.GamePartitionSubsystem.StaticClass())?.GetGamePartition(0);
      if (p?.IsValid()) {
        for (const L of u) {
          var M = p.RangeQuery(U, o, L);
          for (let t = 0, i = M.Num(); t < i; ++t) {
            var y;
            var H;
            var g;
            var q = M.Get(t).Actor;
            if (q?.IsValid() && !q.bHidden && (g = LockOnUtils_1.LockOnUtils.GetLockOnTargetLocation(q))) {
              H = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(g, this.jma);
              y = this.jma.Size();
              if (!!H && !(r < y) && !(H = U.op_Subtraction(g).Size(), (g = MathUtils_1.MathUtils.Clamp((1 - H / o) * s, 0, 1) + MathUtils_1.MathUtils.Clamp((1 - y / r) * n, 0, 1)) < v)) {
                v = g;
                d = q;
              }
            }
          }
        }
      }
    }
    return d;
  }
  Jhc(t, i) {
    if (!t || t.length === 0) {
      return true;
    }
    if (i !== undefined) {
      for (const e of t) {
        if ((0, IUtil_1.matchCategory)(e, i)) {
          return true;
        }
      }
    }
    return false;
  }
}
(exports.FollowShootAutoAimHandle = FollowShootAutoAimHandle).Ult = Stats_1.Stat.Create("[BattleView]FollowShootAimHandleTick");
//# sourceMappingURL=FollowShootAutoAimHandle.js.map