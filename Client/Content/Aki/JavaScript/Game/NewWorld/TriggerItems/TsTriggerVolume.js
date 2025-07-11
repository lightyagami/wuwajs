"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const AreaController_1 = require("../../Module/Area/AreaController");
const RoleTriggerController_1 = require("../Character/Role/RoleTriggerController");
const TsBaseItem_1 = require("../SceneItem/BaseItem/TsBaseItem");
const KuroTriggerType = QueryTypeDefine_1.KuroCollisionChannel.KuroTrigger;
const AREA_CD = 500;
class TsTriggerVolume extends UE.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.TriggerItem = undefined;
    this.TriggerItems = undefined;
    this.TriggerType = 0;
    this.TriggerGroup = 0;
    this.TriggerId = -0;
    this.ConditionGroupId = "";
    this.EventGroupId = "";
    this.ExitEventGroupId = "";
    this.IsPlayer = false;
    this.TriggerItemEffectData = undefined;
    this.NotScale = false;
    this.IgnoreBullet = false;
    this.HitCd = 0;
    this.HitEffectData = undefined;
    this.HitDataName = "";
    this.IsBlockCamera = true;
    this.AreaId = 0;
    this.IsAutoTriggerEffect = false;
    this.EffectCd = 0;
    this.ToleranceDistance = 5;
    this.EnterAkEvent = undefined;
    this.ExitAkEvent = undefined;
    this.IsChangeFootStep = true;
    this.FootStepMaterialId = 0;
    this.IsAreaEnterHanlde = false;
    this.IsAreaLeaveHanlde = false;
    this.AreaEnterCdId = undefined;
    this.AreaLeaveCdId = undefined;
    this.CountInTrigger = 0;
    this.BuffIds = undefined;
    this.IsRemoveBuffIds = false;
    this.BuffTimerId = undefined;
    this.PropsIds = undefined;
    this.AddBuffType = undefined;
    this.HandleWorldDone = undefined;
  }
  Constructor() {
    this.IsAreaEnterHanlde = false;
    this.IsAreaLeaveHanlde = false;
    this.AreaEnterCdId = undefined;
    this.AreaLeaveCdId = undefined;
    this.CountInTrigger = 0;
    this.BuffTimerId = undefined;
    this.HandleWorldDone = undefined;
  }
  ReceiveBeginPlay() {
    this.SetActorTickEnabled(false);
    this.InitTriggerItem(this.TriggerItem);
    for (let e = 0; e < this.TriggerItems.Num(); e++) {
      this.InitTriggerItem(this.TriggerItems.Get(e));
    }
    this.HandleWorldDone = () => {
      this.OnWorldDone();
    };
    if (ModelManager_1.ModelManager.GameModeModel?.WorldDone) {
      this.OnWorldDone();
    } else {
      GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(this.HandleWorldDone);
      GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(this.HandleWorldDone);
    }
    if (this.TriggerGroup && this.TriggerId) {
      ModelManager_1.ModelManager.TriggerVolumeModel.AddTriggerVolume(this.TriggerGroup, this.TriggerId, this);
    }
    if (this.AreaId) {
      this.IsAreaEnterHanlde = true;
      this.IsAreaLeaveHanlde = true;
      this.AreaEnterCdId = undefined;
      ModelManager_1.ModelManager.AreaModel.AddArea(this.AreaId, this);
    }
    this.AddBuff();
  }
  OnWorldDone() {
    if (this.AreaId) {
      this.SetEnable(ModelManager_1.ModelManager.AreaModel.GetAreaState(this.AreaId));
    }
    this.RegistEvents(this.TriggerItem);
    for (let e = 0; e < this.TriggerItems.Num(); e++) {
      this.RegistEvents(this.TriggerItems.Get(e));
    }
  }
  InitTriggerItem(e) {
    if (e && this.TriggerType === 4) {
      e.BrushComponent.SetCollisionObjectType(KuroTriggerType);
    }
  }
  ReceiveEndPlay() {
    this.RemoveEvents(this.TriggerItem);
    for (let e = 0; e < this.TriggerItems.Num(); e++) {
      this.RemoveEvents(this.TriggerItems.Get(e));
    }
    if (this.TriggerGroup && this.TriggerId) {
      ModelManager_1.ModelManager.TriggerVolumeModel?.RemoveTriggerVolume(this.TriggerGroup, this.TriggerId);
    }
    if (this.AreaId && (this.CountInTrigger > 0 && this.HandleAreaLeave(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), undefined), this.AreaLeaveCdId = undefined, this.IsAreaEnterHanlde = true, ModelManager_1.ModelManager.AreaModel?.RemoveArea(this.AreaId), TimerSystem_1.TimerSystem.Has(this.AreaEnterCdId) && TimerSystem_1.TimerSystem.Remove(this.AreaEnterCdId), TimerSystem_1.TimerSystem.Has(this.AreaLeaveCdId))) {
      TimerSystem_1.TimerSystem.Remove(this.AreaLeaveCdId);
    }
  }
  ReceiveTick(e) {}
  RegistEvents(e) {
    this.CountInTrigger = 0;
    if (e?.IsValid()) {
      var i = (0, puerts_1.$ref)(undefined);
      e.GetOverlappingActors(i);
      var t = (0, puerts_1.$unref)(i);
      if (t?.Num() > 0) {
        for (let e = 0, i = t.Num(); e < i; e++) {
          var s = t.Get(e);
          this.OnCollisionEnterFunc(s, undefined);
        }
      }
      e.OnActorBeginOverlap.Add((e, i) => {
        this.OnCollisionEnterFunc(i, e);
      });
      e.OnActorEndOverlap.Add((e, i) => {
        this.OnCollisionExitFunc(i, e);
      });
    }
  }
  RemoveEvents(e) {
    if (e) {
      e.OnActorBeginOverlap.Clear();
      e.OnActorEndOverlap.Clear();
      e.OnActorHit.Clear();
    }
    GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(this.HandleWorldDone);
  }
  OnCollisionEnterFunc(e, i) {
    if (this.CheckCondition(e) && (this.CountInTrigger++, this.AreaId && this.CountInTrigger === 1 && this.HandleAreaEnter(e, i), Global_1.Global.BaseCharacter) && this.EnterAkEvent) {
      this.PostAkEvent(e, this.EnterAkEvent);
    }
  }
  OnCollisionExitFunc(e, i) {
    if (this.CheckBeginOverlapRoleTrigger(e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTriggerVolumeExit, this);
    }
    if (this.CheckCondition(e) && (this.CountInTrigger--, this.AreaId && this.CountInTrigger <= 0 && (this.HandleAreaLeave(e, i), this.CountInTrigger = 0), this.ExitAkEvent)) {
      this.PostAkEvent(e, this.ExitAkEvent);
    }
  }
  CheckCondition(e) {
    return !!e?.IsValid() && (this.IsPlayer || this.TriggerType === 1 || this.EnterAkEvent || this.ExitAkEvent ? this.CheckBeginOverlapRoleTrigger(e) || false : e instanceof TsBaseCharacter_1.default || e instanceof TsBaseItem_1.default);
  }
  SetEnable(i) {
    if (this.TriggerItem) {
      this.TriggerItem.SetActorEnableCollision(i);
    }
    for (let e = 0; e < this.TriggerItems.Num(); e++) {
      this.TriggerItems.Get(e)?.SetActorEnableCollision(i);
    }
  }
  HandleAreaEnter(e, i) {
    if (e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() && this.IsAreaEnterHanlde) {
      this.IsAreaEnterHanlde = false;
      this.AreaEnterCdId = TimerSystem_1.TimerSystem.Delay(() => {
        this.IsAreaEnterHanlde = true;
      }, AREA_CD);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Area", 7, "[AreaController.EnterOverlap_TstriggerVolume] 进入区域", ["LeaveArea", this.AreaId]);
      }
      AreaController_1.AreaController.BeginOverlap(this.AreaId, "AreaController.EnterOverlap_TstriggerVolume");
    }
  }
  HandleAreaLeave(e, i) {
    if (e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() && this.IsAreaLeaveHanlde) {
      this.IsAreaLeaveHanlde = false;
      this.AreaLeaveCdId = TimerSystem_1.TimerSystem.Delay(() => {
        this.IsAreaLeaveHanlde = true;
      }, AREA_CD);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Area", 7, "[AreaController.EndOverlap_TstriggerVolume] 离开区域", ["LeaveArea", this.AreaId]);
      }
      AreaController_1.AreaController.EndOverlap(this.AreaId);
    }
  }
  ToggleArea(e) {
    this.SetEnable(e);
  }
  PostAkEvent(e, i) {
    if (e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()) {
      e = UE.KismetSystemLibrary.GetPathName(i);
      AudioController_1.AudioController.PostEvent(e, undefined);
    }
  }
  AddBuff() {
    if (this.BuffIds?.IsValidIndex(0)) {
      this.AddBuffInner(this.BuffIds.Get(0));
      this.TryReportSelfBuffDamageLog();
    }
  }
  CheckBeginOverlapRoleTrigger(e) {
    return e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
  }
  AddBuffInner(e) {}
  TryReportSelfBuffDamageLog() {}
}
exports.default = TsTriggerVolume;
//# sourceMappingURL=TsTriggerVolume.js.map