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
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LockOnUtils_1 = require("../../../NewWorld/Character/Common/Component/LockOn/LockOnUtils");
const FollowShootAutoAimUnit_1 = require("../HudUnit/FollowShootAutoAimUnit");
const FollowShootVisionCarUnit_1 = require("../HudUnit/FollowShootVisionCarUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const PROFILE_KEY = "FollowShootAutoAimHandle_IsBlock";
const SCENE_ITEM_ACTOR_KEY = "Center";
class FollowShootAutoAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.noi = undefined;
    this.sDe = undefined;
    this.n$t = undefined;
    this.BPl = undefined;
    this.jma = new Vector2D_1.Vector2D();
    this.doh = 0;
    this.F$_ = 0;
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
        this.BPl = this.sDe.Entity?.GetComponent(223);
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
    this.doi();
    FollowShootAutoAimHandle.Ult.Stop();
  }
  Soi() {
    if (this.doh === 3) {
      this.noi = this.NewHudUnitWithReturn(FollowShootAutoAimUnit_1.FollowShootAutoAimUnit, "UiView_SightB", true, () => {
        this.HGa();
      });
    } else if (this.doh === 4) {
      this.noi = this.NewHudUnitWithReturn(FollowShootVisionCarUnit_1.FollowShootVisionCarUnit, "UiView_VisionCarSight", true, () => {
        this.noi?.SetActive(true);
        this.HGa();
      });
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 67, "[FollowShootAutoAimHandle]创建AimUnit失败, followType不合法", ["followType", this.doh]);
    }
    this.noi?.SetVisible(true);
  }
  yoi() {
    if (this.noi) {
      this.DestroyHudUnit(this.noi);
      this.noi = undefined;
    }
  }
  doi() {
    var t;
    var i;
    var e;
    if (this.noi?.GetVisible()) {
      t = this.BPl?.LockOnTarget;
      i = this.WRl(t);
      e = t?.Id !== this.F$_;
      if (i) {
        this.F$_ = t?.Id ?? 0;
      }
      this.noi.SetTargetAimVisible(i, e);
    }
  }
  Pxl(t) {
    var i = this.BPl?.FollowShooterConfig?.LockOnConfig;
    if (this.BPl && i) {
      if (!!i.Enable && !(i.GapTime <= 0)) {
        if (this.HFt === 0) {
          this.BPl.LockOnTarget = this.Yhc(this.n$t.Owner, i.Distance, i.WorldDistanceWeight, i.Radius, i.ScreenDistanceWeight, i.CharacterExtraWeight, i.SceneItemExtraWeight, this.BPl.LockableCategories);
        }
        this.HFt += t;
        if (this.HFt > i.GapTime * TimeUtil_1.TimeUtil.InverseMillisecond) {
          this.HFt = 0;
        }
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
  WRl(t) {
    return !!t && (t = this.zhc(t), !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.jma)) && (this.noi?.SetTargetItemOffset(this.jma.X, this.jma.Y), true);
  }
  Yhc(i, e, o, s, r, n, h, _) {
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(e, 255, t);
    let a = Number.MIN_VALUE;
    let l = undefined;
    var v = i.D_K2_GetActorLocation();
    for (const C of t) {
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(C)) {
        let t = 0;
        var u = C.Entity.GetComponent(0);
        switch (u?.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
            continue;
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            if (C.Entity.GetComponent(155) === undefined || u.GetBaseInfo().Camp !== 7) {
              continue;
            }
            t = h;
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          case Protocol_1.Aki.Protocol.kks.Proto_Monster:
            var m = C.Entity.GetComponent(2);
            if (m && LockOnUtils_1.LockOnUtils.CheckFriendCamp(m.Actor.Camp)) {
              continue;
            }
            t = n;
        }
        if (this.Jhc(_, u?.GetBaseInfo()?.Category)) {
          var d = this.zhc(C);
          var c = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(d, this.jma);
          var E = this.jma.Size();
          if (c && !(s < E)) {
            c = this.Coi(i, v, d);
            if (c?.bBlockingHit) {
              var U = C.Entity.GetComponent(1).Owner;
              var c = c.Actors.Get(0);
              var f = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(c);
              if (U !== c && U !== f) {
                continue;
              }
            }
            c = (1 - v.op_Subtraction(d).Size() / e) * o + (1 - E / s) * r + t;
            if (!(c < a)) {
              a = c;
              l = C;
            }
          }
        }
      }
    }
    return l;
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
  zhc(t) {
    let i = undefined;
    var e = t.Entity.GetComponent(203);
    return i = (i = (e &&= e.GetInteractionMainActor()) && (e = e.GetActorByKey(SCENE_ITEM_ACTOR_KEY)) ? e.D_K2_GetActorLocation() : i) || t.Entity.GetComponent(1).ActorLocation;
  }
}
(exports.FollowShootAutoAimHandle = FollowShootAutoAimHandle).Ult = Stats_1.Stat.Create("[BattleView]FollowShootAimHandleTick");
//# sourceMappingURL=FollowShootAutoAimHandle.js.map