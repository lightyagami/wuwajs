"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FollowShootAutoAimHandle = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LockOnUtils_1 = require("../../../NewWorld/Character/Common/Component/LockOn/LockOnUtils"),
  FollowShootAutoAimUnit_1 = require("../HudUnit/FollowShootAutoAimUnit"),
  FollowShootVisionCarUnit_1 = require("../HudUnit/FollowShootVisionCarUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  PROFILE_KEY = "FollowShootAutoAimHandle_IsBlock",
  SCENE_ITEM_ACTOR_KEY = "Center";
class FollowShootAutoAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments), this.noi = void 0, this.sDe = void 0, this.n$t = void 0, this.BPl = void 0, this.jma = new Vector2D_1.Vector2D, this.doh = 0, this.F$_ = 0, this.hoi = void 0, this.HFt = 0, this.zpe = (t, i) => {
      this.sDe === i && this.m$e()
    }, this.PFa = t => {
      if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAim", ["bVisible", t]), t) {
        var i = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle(),
          i = (this.iKa(i), ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowType());
        if (i !== this.doh && this.noi && (this.DestroyHudUnit(this.noi), this.noi = void 0), this.doh = i, !this.noi) return void this.Soi()
      }
      this.noi && this.noi.SetVisible(t)
    }
  }
  OnInitialize() {
    super.OnInitialize();
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.iKa(t)
  }
  iKa(t) {
    t !== this.sDe && (this.m$e(), t?.Valid ? (this.sDe = t, this.n$t = this.sDe.Entity?.GetComponent(1), this.BPl = this.sDe.Entity?.GetComponent(222), this.c$e(), this.HGa()) : (this.sDe = void 0, this.n$t = void 0, this.BPl = void 0))
  }
  HGa() {}
  OnDestroyed() {
    this.yoi()
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, this.PFa)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, this.PFa)
  }
  c$e() {
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)
  }
  m$e() {
    EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)
  }
  OnTick(t) {
    FollowShootAutoAimHandle.Ult.Start(), this.Pxl(t), this.doi(), FollowShootAutoAimHandle.Ult.Stop()
  }
  Soi() {
    3 === this.doh ? this.noi = this.NewHudUnitWithReturn(FollowShootAutoAimUnit_1.FollowShootAutoAimUnit, "UiView_SightB", !0, () => {
      this.HGa()
    }) : 4 === this.doh ? this.noi = this.NewHudUnitWithReturn(FollowShootVisionCarUnit_1.FollowShootVisionCarUnit, "UiView_VisionCarSight", !0, () => {
      this.noi?.SetActive(!0), this.HGa()
    }) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 67, "[FollowShootAutoAimHandle]创建AimUnit失败, followType不合法", ["followType", this.doh]), this.noi?.SetVisible(!0)
  }
  yoi() {
    this.noi && (this.DestroyHudUnit(this.noi), this.noi = void 0)
  }
  doi() {
    var t, i, e;
    this.noi?.GetVisible() && (t = this.BPl?.LockOnTarget, i = this.WRl(t), e = t?.Id !== this.F$_, i && (this.F$_ = t?.Id ?? 0), this.noi.SetTargetAimVisible(i, e))
  }
  Pxl(t) {
    var i = this.BPl?.FollowShooterConfig?.LockOnConfig;
    this.BPl && i && (!i.Enable || i.GapTime <= 0 || (0 === this.HFt && (this.BPl.LockOnTarget = this.Yhc(this.n$t.Owner, i.Distance, i.WorldDistanceWeight, i.Radius, i.ScreenDistanceWeight, i.CharacterExtraWeight, i.SceneItemExtraWeight, this.BPl.LockableCategories)), this.HFt += t, this.HFt > i.GapTime * TimeUtil_1.TimeUtil.InverseMillisecond && (this.HFt = 0)))
  }
  Coi(t, i, e) {
    if (this.hoi || (this.hoi = UE.NewObject(UE.TraceLineElement.StaticClass()), this.hoi.bIsSingle = !0, this.hoi.bIgnoreSelf = !0, this.hoi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround)), this.hoi.WorldContextObject = t, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, e), TraceElementCommon_1.TraceElementCommon.LineTrace(this.hoi, PROFILE_KEY)) return this.hoi.HitResult
  }
  WRl(t) {
    return !!t && (t = this.zhc(t), !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.jma)) && (this.noi?.SetTargetItemOffset(this.jma.X, this.jma.Y), !0)
  }
  Yhc(i, e, o, s, r, n, h, _) {
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(e, 63, t);
    let a = Number.MIN_VALUE,
      l = void 0;
    var v = i.D_K2_GetActorLocation();
    for (const C of t)
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(C)) {
        let t = 0;
        var u = C.Entity.GetComponent(0);
        switch (u?.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
            continue;
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            if (void 0 === C.Entity.GetComponent(154) || 7 !== u.GetBaseInfo().Camp) continue;
            t = h;
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          case Protocol_1.Aki.Protocol.kks.Proto_Monster:
            var m = C.Entity.GetComponent(2);
            if (m && LockOnUtils_1.LockOnUtils.CheckFriendCamp(m.Actor.Camp)) continue;
            t = n
        }
        if (this.Jhc(_, u?.GetBaseInfo()?.Category)) {
          var d = this.zhc(C),
            c = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(d, this.jma),
            E = this.jma.Size();
          if (c && !(s < E)) {
            c = this.Coi(i, v, d);
            if (c?.bBlockingHit) {
              var U = C.Entity.GetComponent(1).Owner,
                c = c.Actors.Get(0),
                f = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(c);
              if (U !== c && U !== f) continue
            }
            c = (1 - v.op_Subtraction(d).Size() / e) * o + (1 - E / s) * r + t;
            c < a || (a = c, l = C)
          }
        }
      } return l
  }
  Jhc(t, i) {
    if (!t || 0 === t.length) return !0;
    if (void 0 !== i)
      for (const e of t)
        if ((0, IUtil_1.matchCategory)(e, i)) return !0;
    return !1
  }
  zhc(t) {
    let i = void 0;
    var e = t.Entity.GetComponent(202);
    return i = (i = e && (e = e.GetInteractionMainActor()) && (e = e.GetActorByKey(SCENE_ITEM_ACTOR_KEY)) ? e.D_K2_GetActorLocation() : i) || t.Entity.GetComponent(1).ActorLocation
  }
}(exports.FollowShootAutoAimHandle = FollowShootAutoAimHandle).Ult = Stats_1.Stat.Create("[BattleView]FollowShootAimHandleTick");
//# sourceMappingURL=FollowShootAutoAimHandle.js.map