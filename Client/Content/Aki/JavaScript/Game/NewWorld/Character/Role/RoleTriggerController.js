"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTriggerController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../Common/CharacterNameDefines");
const TRIGGER_HALF_HEIGHT_DEVIATION = 0;
const FIX_PHY_RADIUS = 10;
class RoleTriggerController extends ControllerBase_1.ControllerBase {
  static GetMyRoleTrigger() {
    return this.Lir;
  }
  static GetMyRolePhysicInteract() {
    return this.ybm;
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.T1u);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.T1u);
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
    if (this.ybm?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("RoleTriggerController.ClearMyRoleTrigger", this.ybm);
      this.ybm = undefined;
    }
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
      RoleTriggerController.xir.SetCapsuleRadius(o + FIX_PHY_RADIUS, true);
      RoleTriggerController.xir.SetCollisionProfileName(CharacterNameDefines_1.CharacterNameDefines.ROLE_TRIGGER_NAME, false);
      if (Platform_1.Platform.IsPcPlatform()) {
        RoleTriggerController.ybm = ActorSystem_1.ActorSystem.Get(UE.BP_PhysicInteractProxy_C.StaticClass(), e);
        RoleTriggerController.ybm.SetActorHiddenInGame(true);
        RoleTriggerController.ybm?.SetRadiusAndHeight(o + FIX_PHY_RADIUS, r);
      }
      RoleTriggerController.OnTick(0);
      ModelManager_1.ModelManager.GameModeModel?.AttachStreamingSourcesToActor(RoleTriggerController.Lir);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleTriggerInit);
    }
  }
  static OnTick(e) {
    this.UpdateTransform();
  }
  static UpdateRoleTriggerHalfHeightAndRadius(e, r, o) {
    if (RoleTriggerController.sxl) {
      if (!RoleTriggerController.xir || !RoleTriggerController.xir.IsValid()) {
        RoleTriggerController.IsInitTrigger = false;
      }
      if (RoleTriggerController.IsInitTrigger) {
        RoleTriggerController.xir.SetCapsuleRadius(e, o);
        RoleTriggerController.xir.SetCapsuleHalfHeight(r, o);
        if (Platform_1.Platform.IsPcPlatform()) {
          RoleTriggerController.ybm?.SetRadiusAndHeight(e + FIX_PHY_RADIUS, r);
        }
      } else {
        RoleTriggerController.Koh();
      }
    }
  }
  static UpdateTransform() {
    if (this.IsInitTrigger && this.Lir?.IsValid() && Global_1.Global.BaseCharacter && (this.Lir.D_K2_SetActorTransform(Global_1.Global.BaseCharacter.D_GetTransform(), false, undefined, true), Platform_1.Platform.IsPcPlatform()) && this.ybm?.IsValid()) {
      this.ybm.D_K2_SetActorTransform(Global_1.Global.BaseCharacter.D_GetTransform(), false, undefined, false);
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
RoleTriggerController.ybm = undefined;
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
RoleTriggerController.T1u = (e, r, o, l) => {
  e = e.CheckGetComponent(3);
  if (e && e.Actor === Global_1.Global.BaseCharacter) {
    RoleTriggerController.UpdateRoleTriggerHalfHeightAndRadius(r, o, l);
  }
};
RoleTriggerController.xie = (e, r) => {
  if (RoleTriggerController.sxl && (RoleTriggerController.xir && RoleTriggerController.xir.IsValid() || (RoleTriggerController.IsInitTrigger = false), RoleTriggerController.IsInitTrigger || RoleTriggerController.Koh(), e?.Valid) && (e = e.Entity.GetComponent(3)?.Actor)?.IsValid() && (RoleTriggerController.xir?.SetCapsuleHalfHeight(e.CapsuleComponent.CapsuleHalfHeight + TRIGGER_HALF_HEIGHT_DEVIATION, false), RoleTriggerController.xir?.SetCapsuleRadius(e.CapsuleComponent.CapsuleRadius, false), Platform_1.Platform.IsPcPlatform())) {
    RoleTriggerController.ybm?.SetRadiusAndHeight(e.CapsuleComponent.CapsuleRadius + FIX_PHY_RADIUS, e.CapsuleComponent.CapsuleHalfHeight);
  }
}; //# sourceMappingURL=RoleTriggerController.js.map