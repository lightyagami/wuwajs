"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootAimHandle = undefined;
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
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const FollowShootAimUnit_1 = require("../HudUnit/FollowShootAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const MAX_AIM_DISTANCE = 5000;
const PROFILE_AIM_TRACE = "ProfileAimTrace";
class FollowShootAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.noi = undefined;
    this.UFa = 0;
    this.sDe = undefined;
    this.Xte = undefined;
    this.ldt = [];
    this.xFa = false;
    this.soi = Vector_1.Vector.Create();
    this.aoi = Vector_1.Vector.Create();
    this.hoi = undefined;
    this.zpe = (t, i) => {
      if (this.sDe === i) {
        this.m$e();
      }
    };
    this.tKa = (t, i) => {
      this.xFa = i;
      this.HGa();
    };
    this.PFa = t => {
      if (t) {
        var i = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
        this.iKa(i);
        if (!this.noi) {
          this.Soi();
          return;
        }
      }
      if (this.noi) {
        this.noi.SetVisible(t);
      }
    };
    this.QWl = 0;
    this.KWl = 0;
    this.HWl = undefined;
    this.WWl = (t, i, e, s) => {
      try {
        if (!(e < this.QWl) && (e !== this.QWl || !(s < this.KWl)) && this.noi?.GetVisible()) {
          if (t) {
            var o = i.HitResult;
            if (o) {
              var r = o.Actors;
              var h = r.Num();
              if (!(h <= 0)) {
                for (let i = 0; i < h; i++) {
                  var n = r.Get(i);
                  if (!n?.IsValid()) {
                    this.noi.SetIsAimTarget(false);
                    return;
                  }
                  let t = ActorUtils_1.ActorUtils.GetEntityByActor(n, false);
                  if (!(t = t || ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(n, false))) {
                    this.noi.SetIsAimTarget(false);
                    return;
                  }
                  var a = t.Entity.GetComponent(0);
                  var _ = a?.GetEntityType();
                  if (_ !== Protocol_1.Aki.Protocol.kks.Proto_Player && _ !== Protocol_1.Aki.Protocol.kks.Proto_Npc) {
                    if (_ === Protocol_1.Aki.Protocol.kks.Proto_SceneItem && a.GetBaseInfo()?.Category.MechanismType === "PortalCreater" && t.Entity.GetComponent(155) !== undefined) {
                      this.noi.SetIsAimTarget(true);
                      return;
                    } else {
                      this.noi.SetIsAimTarget(false);
                      return;
                    }
                  }
                }
              }
            }
          }
          this.noi.SetIsAimTarget(false);
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
    this.UFa = 1101008132;
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.iKa(t);
    this.HWl = (0, puerts_1.toManualReleaseDelegate)(this.WWl);
  }
  iKa(t) {
    if (t !== this.sDe) {
      this.m$e();
      if (t?.Valid) {
        this.sDe = t;
        this.Xte = this.sDe.Entity?.GetComponent(206);
        this.c$e();
        this.xFa = this.Xte?.HasTag(this.UFa) ?? false;
        this.HGa();
      } else {
        this.sDe = undefined;
      }
    }
  }
  HGa() {
    if (this.noi) {
      this.noi.RefreshState(this.xFa);
    }
  }
  OnDestroyed() {
    this.yoi();
    (0, puerts_1.releaseManualReleaseDelegate)(this.WWl);
    this.hoi?.Dispose();
    this.hoi = undefined;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetFollowShootAimVisible, this.PFa);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetFollowShootAimVisible, this.PFa);
  }
  c$e() {
    this.mdt(this.UFa, this.tKa);
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  m$e() {
    for (const t of this.ldt) {
      t?.EndTask();
    }
    this.ldt.length = 0;
    EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  OnTick(t) {
    FollowShootAimHandle.Ult.Start();
    this.doi();
    FollowShootAimHandle.Ult.Stop();
  }
  mdt(t, i) {
    t = this.Xte?.ListenForTagAddOrRemove(t, i);
    if (t) {
      this.ldt.push(t);
    }
  }
  Soi() {
    this.noi = this.NewHudUnitWithReturn(FollowShootAimUnit_1.FollowShootAimUnit, "UiItem_AimTransmit", true, () => {
      this.HGa();
    });
    this.noi.SetVisible(true);
  }
  yoi() {
    if (this.noi) {
      this.DestroyHudUnit(this.noi);
      this.noi = undefined;
    }
  }
  doi() {
    if (this.noi?.GetVisible()) {
      this.Coi();
    }
  }
  Coi() {
    var t = Global_1.Global.CharacterCameraManager;
    var i = this.soi;
    var e = this.aoi;
    i.FromUeVector(t.D_GetCameraLocation());
    e.FromUeVector(t.GetActorForwardVector());
    e.MultiplyEqual(MAX_AIM_DISTANCE);
    e.AdditionEqual(i);
    this.hoi = this.hoi ?? ModelManager_1.ModelManager.BulletModel.NewTraceElement(UE.TraceLineElement, ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, e);
    var t = TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(this.hoi, PROFILE_AIM_TRACE, this.HWl);
    this.QWl = t.Frame;
    this.KWl = t.Index;
  }
}
(exports.FollowShootAimHandle = FollowShootAimHandle).Ult = Stats_1.Stat.Create("[BattleView]FollowShootAimHandleTick");
//# sourceMappingURL=FollowShootAimHandle.js.map