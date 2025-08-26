"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AimHandle = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LockOnUtils_1 = require("../../../NewWorld/Character/Common/Component/LockOn/LockOnUtils");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ArmUnit_1 = require("../HudUnit/ArmUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const MAX_AIM_DISTANCE = 5000;
const aimTagId = -1058855731;
const jmxjTagId = -41569768;
const PROFILE_AIM_TRACE = "ProfileAimTrace";
class AimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.roi = false;
    this.noi = undefined;
    this.soi = Vector_1.Vector.Create();
    this.aoi = Vector_1.Vector.Create();
    this.hoi = undefined;
    this.loi = false;
    this._oi = false;
    this.VRn = false;
    this.VWl = 0;
    this.jWl = 0;
    this.HWl = undefined;
    this.fHe = () => {
      this.uoi();
    };
    this.coi = () => {
      this.moi();
      this.doi();
    };
    this.HRn = (t, e) => {
      this.VRn = t && e;
      this.uoi();
    };
    this.WWl = (t, e, i, s) => {
      try {
        if (!(i < this.VWl) && (i !== this.VWl || !(s < this.jWl)) && (this.VWl = i, this.jWl = s, this.noi) && this.noi.GetTargetVisible() && this.noi.GetActive()) {
          if (t) {
            var r = e.HitResult;
            if (r) {
              var o = r.Actors;
              var h = o.Num();
              if (!(h <= 0)) {
                var n = r.Components;
                for (let e = 0; e < h; e++) {
                  var a = o.Get(e);
                  if (!a?.IsValid()) {
                    this.noi.SetAimStatus(1);
                    return;
                  }
                  let t = ActorUtils_1.ActorUtils.GetEntityByActor(a, false);
                  if (!(t = t || ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(a, true))) {
                    this.noi.SetAimStatus(1);
                    return;
                  }
                  var _;
                  var l = t.Entity.GetComponent(0);
                  var m = l?.GetEntityType();
                  if (m === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
                    this.noi.SetAimStatus(1);
                    return;
                  }
                  if (m === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
                    if (t.Entity.GetComponent(155) === undefined || l.GetBaseInfo().Camp !== 7) {
                      this.noi.SetAimStatus(1);
                    } else {
                      this.noi.SetAimStatus(2);
                    }
                    return;
                  }
                  if (m === Protocol_1.Aki.Protocol.kks.Proto_Animal) {
                    if ((_ = t.Entity.GetComponent(2)) && LockOnUtils_1.LockOnUtils.CheckFriendCamp(_.Actor.Camp)) {
                      this.noi.SetAimStatus(1);
                    } else {
                      this.noi.SetAimStatus(2);
                    }
                    return;
                  }
                  if (m !== Protocol_1.Aki.Protocol.kks.Proto_Monster) {
                    this.noi.SetAimStatus(1);
                    return;
                  }
                  var v = n.Get(e);
                  if (v?.IsValid()) {
                    var d;
                    var c = v.GetName();
                    if (c !== "CollisionCylinder" && t.Entity.GetComponent(3)?.IsPartComponentEnable(c)) {
                      if ((d = t.Entity.GetComponent(2)) && LockOnUtils_1.LockOnUtils.CheckFriendCamp(d.Actor.Camp)) {
                        this.noi.SetAimStatus(1);
                        return;
                      } else if (t.Entity.GetComponent(69)?.IsWeakness(c)) {
                        this.noi.SetAimStatus(3);
                        return;
                      } else {
                        this.noi.SetAimStatus(2);
                        return;
                      }
                    }
                  }
                }
              }
            }
          }
          this.noi.SetAimStatus(1);
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Role", 20, "AimTraceHitResultHandle异常", t, ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 20, "AimTraceHitResultHandle异常", ["error", t]);
        }
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.uoi();
    this.HWl = (0, puerts_1.toManualReleaseDelegate)(this.WWl);
  }
  OnDestroyed() {
    super.OnDestroyed();
    (0, puerts_1.releaseManualReleaseDelegate)(this.WWl);
    this.hoi?.Dispose();
    this.hoi = undefined;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAimStateChanged, this.coi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.HRn);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAimStateChanged, this.coi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.HRn);
  }
  OnTick(t) {
    AimHandle.Ult.Start();
    this.doi();
    AimHandle.Ult.Stop();
  }
  OnShowHud() {
    super.OnShowHud();
    this.moi();
    this.doi();
  }
  moi() {
    if (this.noi && this.loi) {
      var i;
      var s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (s?.Valid) {
        let t = false;
        let e = true;
        if (this.VRn) {
          t = true;
        } else {
          i = s.Entity.GetComponent(176);
          s = s.Entity.GetComponent(206);
          i = i.DirectionState;
          if (!(t = i === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) && this._oi) {
            t = s.HasTag(aimTagId);
          }
          if (s.HasTag(jmxjTagId)) {
            e = false;
          }
        }
        this.noi.SetArrowLineVisible(e);
        this.noi.SetTargetVisible(t, false);
      } else {
        this.noi.SetTargetVisible(false, true);
      }
    }
  }
  doi() {
    if (this.noi && this.noi.GetTargetVisible() && this.noi.GetActive()) {
      this.Coi();
    }
  }
  uoi() {
    this.loi = false;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid && (t = t.Entity.GetComponent(0)) && (t = t.GetRoleConfig(), this._oi = t.RoleType === 2, t.IsAim || this._oi || this.VRn)) {
      this.loi = true;
      this.foi();
    } else {
      this.poi();
    }
  }
  foi() {
    if (this.noi) {
      this.moi();
      this.doi();
    } else if (!this.roi) {
      this.roi = true;
      this.NewHudUnit(ArmUnit_1.AimUnit, "UiItem_Aim").then(t => {
        this.noi = t;
        if (this.loi) {
          this.moi();
          this.doi();
        } else {
          this.noi.SetTargetVisible(false, true);
        }
      }).finally(() => {
        this.roi = false;
      });
    }
  }
  poi() {
    if (this.noi) {
      this.noi.SetTargetVisible(false, true);
    }
  }
  Coi() {
    var t = Global_1.Global.CharacterCameraManager;
    var e = this.soi;
    var i = this.aoi;
    e.FromUeVector(t.D_GetCameraLocation());
    i.FromUeVector(t.GetActorForwardVector());
    i.MultiplyEqual(MAX_AIM_DISTANCE);
    i.AdditionEqual(e);
    this.hoi = this.hoi ?? ModelManager_1.ModelManager.BulletModel.NewTraceElement(UE.TraceLineElement, ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, i);
    var t = TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(this.hoi, PROFILE_AIM_TRACE, this.HWl);
    this.VWl = t.Frame;
    this.jWl = t.Index;
  }
}
(exports.AimHandle = AimHandle).Ult = Stats_1.Stat.Create("[BattleView]AimHandleTick");
//# sourceMappingURL=AimHandle.js.map