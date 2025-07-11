"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTriggerController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../Common/CharacterNameDefines");
const TRIGGER_HALF_HEIGHT_DEVIATION = 0;
class RoleTriggerController extends ControllerBase_1.ControllerBase {
  static GetMyRoleTrigger() {
    return this.Lir;
  }
  static GetMyRoleTriggerOrUndefined() {
    return this.Lir;
  }
  static DebugTestWorldDone() {
    this.nye();
  }
  static OnInit() {
    this.IsInitTrigger = false;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    this.Pir();
    return true;
  }
  static Pir() {
    this.IsInitTrigger = false;
    if (this.Lir?.IsValid()) {
      ModelManager_1.ModelManager.GameModeModel.DetachStreamingSourceFromActor();
      ActorSystem_1.ActorSystem.Put("RoleTriggerController.ClearMyRoleTrigger", this.Lir);
      this.Lir = undefined;
    }
    this.xir = undefined;
  }
  static Koh() {
    if (!RoleTriggerController.IsInitTrigger && Global_1.Global.BaseCharacter) {
      RoleTriggerController.IsInitTrigger = true;
      let e = undefined;
      let r = 77 + TRIGGER_HALF_HEIGHT_DEVIATION;
      let o = 25;
      if (Global_1.Global.BaseCharacter) {
        e = Global_1.Global.BaseCharacter.D_GetTransform();
        r = Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleHalfHeight + TRIGGER_HALF_HEIGHT_DEVIATION;
        o = Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleRadius;
      }
      RoleTriggerController.Lir = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e);
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        RoleTriggerController.Lir?.SetActorLabel("RoleTrigger");
      }
      RoleTriggerController.xir = RoleTriggerController.Lir.AddComponentByClass(UE.CapsuleComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      RoleTriggerController.Lir.SetActorHiddenInGame(true);
      RoleTriggerController.xir.SetCapsuleHalfHeight(r, false);
      RoleTriggerController.xir.SetCapsuleRadius(o, false);
      RoleTriggerController.xir.SetCollisionProfileName(CharacterNameDefines_1.CharacterNameDefines.ROLE_TRIGGER_NAME, false);
      RoleTriggerController.OnTick(0);
      ModelManager_1.ModelManager.GameModeModel?.AttachStreamingSourcesToActor(RoleTriggerController.Lir);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleTriggerInit);
    }
  }
  static OnTick(e) {
    if (this.IsInitTrigger && this.Lir?.IsValid() && Global_1.Global.BaseCharacter) {
      this.UpdateTransform();
    }
  }
  static UpdateRoleTriggerHalfHeightAndRadius(e, r, o) {
    if (RoleTriggerController.sxl) {
      if (!RoleTriggerController.xir || !RoleTriggerController.xir.IsValid()) {
        RoleTriggerController.IsInitTrigger = false;
      }
      if (RoleTriggerController.IsInitTrigger) {
        RoleTriggerController.xir.SetCapsuleRadius(e, o);
        RoleTriggerController.xir.SetCapsuleHalfHeight(r, o);
      } else {
        RoleTriggerController.Koh();
      }
    }
  }
  static UpdateTransform() {
    if (this.IsInitTrigger && this.Lir?.IsValid() && Global_1.Global.BaseCharacter) {
      this.Lir.D_K2_SetActorTransform(Global_1.Global.BaseCharacter.D_GetTransform(), false, undefined, true);
    }
  }
  static UpdateOverlaps() {
    if (this.IsInitTrigger && this.Lir?.IsValid() && Global_1.Global.BaseCharacter && RoleTriggerController.xir?.IsValid()) {
      RoleTriggerController.xir?.SetCapsuleRadius(RoleTriggerController.xir.CapsuleRadius, true);
    }
  }
}
(exports.RoleTriggerController = RoleTriggerController).IsInitTrigger = false;
RoleTriggerController.Lir = undefined;
RoleTriggerController.xir = undefined;
RoleTriggerController.sxl = false;
RoleTriggerController.uMe = () => {
  RoleTriggerController.Pir();
  RoleTriggerController.sxl = false;
};
RoleTriggerController.nye = () => {
  if (RoleTriggerController.IsInitTrigger) {
    RoleTriggerController.OnTick(0);
  } else {
    RoleTriggerController.Koh();
  }
  RoleTriggerController.sxl = true;
};
RoleTriggerController.xie = (e, r) => {
  if (RoleTriggerController.sxl && (RoleTriggerController.xir && RoleTriggerController.xir.IsValid() || (RoleTriggerController.IsInitTrigger = false), RoleTriggerController.IsInitTrigger || RoleTriggerController.Koh(), e?.Valid) && (e = e.Entity.GetComponent(3)?.Actor)?.IsValid()) {
    RoleTriggerController.xir?.SetCapsuleHalfHeight(e.CapsuleComponent.CapsuleHalfHeight + TRIGGER_HALF_HEIGHT_DEVIATION, false);
    RoleTriggerController.xir?.SetCapsuleRadius(e.CapsuleComponent.CapsuleRadius, false);
  }
}; //# sourceMappingURL=RoleTriggerController.js.map