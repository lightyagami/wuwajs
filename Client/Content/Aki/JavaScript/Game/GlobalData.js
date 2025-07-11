"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalData = undefined;
const UE = require("ue");
const Info_1 = require("../Core/Common/Info");
const Platform_1 = require("../Launcher/Platform/Platform");
const EventDefine_1 = require("./Common/Event/EventDefine");
const EventSystem_1 = require("./Common/Event/EventSystem");
class GlobalData {
  constructor() {}
  static Init(t) {
    this.f8 = t;
    this.IMe = UE.KuroStaticLibrary.IsEditor(t.GetWorld());
    this.TMe = UE.NewObject(UE.BP_EventManager_C.StaticClass());
    this.LMe = UE.NewObject(UE.BP_FightManager_C.StaticClass());
  }
  static SetUiState(t) {
    if (this.DMe !== t) {
      this.DMe = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGlobalUiSceneStateChanged, t);
    }
  }
  static get IsUiSceneLoading() {
    return this.DMe === 1;
  }
  static get IsUiSceneOpen() {
    return this.DMe === 2;
  }
  static get IsPlayInEditor() {
    return this.IMe;
  }
  static get GameInstance() {
    return this.f8;
  }
  static get World() {
    return this.f8?.GetWorld();
  }
  static get BpEventManager() {
    return this.TMe;
  }
  static get BpFightManager() {
    return this.LMe;
  }
  static get IsEs3() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.World) === 0;
  }
  static get IsSm5() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.World) === 1;
  }
  static Networking() {
    if (this.RMe === undefined) {
      this.RMe = UE.Actor.GetKuroNetMode() === 1;
    }
    return this.RMe;
  }
  static IsRunWithEditorStartConfig() {
    var t;
    if (this.UMe === undefined) {
      if (this.IsPlayInEditor || Info_1.Info.IsBuildShipping || !Platform_1.Platform.IsWindowsPlatform()) {
        this.UMe = false;
      } else {
        t = UE.BlueprintPathsLibrary.ProjectDir() + "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json";
        this.UMe = (UE.KismetSystemLibrary.GetCommandLine().search("-StartWithEditorConfig") >= 0 || UE.KismetSystemLibrary.GetCommandLine().search("-SessionName=\"Play in Standalone Game\"") >= 0) && UE.BlueprintPathsLibrary.FileExists(t);
      }
    }
    return this.UMe;
  }
  static get IsSceneClearing() {
    return GlobalData.ClearSceneDone !== undefined;
  }
}
(exports.GlobalData = GlobalData).RMe = undefined;
GlobalData.UMe = undefined;
GlobalData.ClearSceneDone = undefined; //# sourceMappingURL=GlobalData.js.map