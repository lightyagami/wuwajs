"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Global = undefined;
const UE = require("ue");
const TickSystem_1 = require("../Core/Tick/TickSystem");
const TsBaseCharacter_1 = require("./Character/TsBaseCharacter");
const EventDefine_1 = require("./Common/Event/EventDefine");
const EventSystem_1 = require("./Common/Event/EventSystem");
const GlobalData_1 = require("./GlobalData");
const ModelManager_1 = require("./Manager/ModelManager");
class Global {
  constructor() {}
  static get vMe() {
    return this.F1_;
  }
  static set vMe(a) {
    if (this.F1_ !== a && (this.F1_ = a)) {
      TickSystem_1.TickSystem.AddTickPrerequisiteActor(0, a, 2);
    }
  }
  static get BaseCharacter() {
    if (!Global.pMe || !Global.pMe.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        Global.BaseCharacter = UE.GameplayStatics.GetPlayerCharacter(GlobalData_1.GlobalData.World, 0);
      }
    }
    return Global.pMe;
  }
  static set BaseCharacter(a) {
    if (Global.pMe !== a) {
      if (!Global.pMe && a) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInitRole, ModelManager_1.ModelManager.CreatureModel.GetEntityById(a.GetEntityIdNoBlueprint()));
      }
      Global.pMe = a;
    }
  }
  static get CharacterController() {
    if (!Global.vMe || !Global.vMe.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        Global.vMe = UE.GameplayStatics.GetPlayerController(GlobalData_1.GlobalData.World, 0);
      }
    }
    return Global.vMe;
  }
  static get CharacterCameraManager() {
    if (!Global.MMe || !Global.MMe.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(GlobalData_1.GlobalData.World, 0);
      }
    }
    return Global.MMe;
  }
  static get PawnOrSpectator() {
    if (!Global.EMe || !Global.MMe.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        Global.EMe = UE.GameplayStatics.GetPlayerPawn(GlobalData_1.GlobalData.World, 0);
      }
    }
    return Global.EMe;
  }
  static get WorldEntityHelper() {
    return Global.WorldEntityHelperInner;
  }
  static set WorldEntityHelper(a) {
    Global.WorldEntityHelperInner = a;
  }
  static IsControlledCharacter(a) {
    return a instanceof TsBaseCharacter_1.default && a.GetController() === this.vMe;
  }
  static InitEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, Global.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, Global.SMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, Global.yMe);
  }
}
(exports.Global = Global).pMe = undefined;
Global.F1_ = undefined;
Global.MMe = undefined;
Global.EMe = undefined;
Global.WorldEntityHelperInner = undefined;
Global.xie = () => {
  if (GlobalData_1.GlobalData.GameInstance) {
    Global.vMe = UE.GameplayStatics.GetPlayerController(GlobalData_1.GlobalData.World, 0);
    Global.BaseCharacter = UE.GameplayStatics.GetPlayerCharacter(GlobalData_1.GlobalData.World, 0);
    Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(GlobalData_1.GlobalData.World, 0);
    Global.EMe = UE.GameplayStatics.GetPlayerPawn(GlobalData_1.GlobalData.World, 0);
  }
};
Global.SMe = () => {
  Global.vMe = undefined;
  Global.BaseCharacter = undefined;
  Global.MMe = undefined;
  Global.EMe = undefined;
};
Global.yMe = () => {
  Global.vMe = UE.GameplayStatics.GetPlayerController(GlobalData_1.GlobalData.World, 0);
  Global.MMe = UE.GameplayStatics.GetPlayerCameraManager(GlobalData_1.GlobalData.World, 0);
  Global.EMe = UE.GameplayStatics.GetPlayerPawn(GlobalData_1.GlobalData.World, 0);
}; //# sourceMappingURL=Global.js.map