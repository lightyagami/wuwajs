"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraDebugTool = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../../GlobalData");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiCameraControlRotationComponent_1 = require("./UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("./UiCameraManager");
class UiCameraDebugTool {
  constructor() {
    this.e__ = undefined;
    this.t__ = false;
    this.i__ = false;
    this.r__ = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
    this.o__ = () => {
      UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()?.Refresh();
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle(false, false);
    };
  }
  Init() {
    this.e__ = ResourceSystem_1.ResourceSystem.GetLoadedAsset("/Game/Aki/Data/UiCameraAnimation/DT_UiCameraSetting.DT_UiCameraSetting", UE.CompositeDataTable);
  }
  GetDtSyncEnabled() {
    return this.t__;
  }
  StartDtSync() {
    if (!this.t__) {
      var a = this.e__?.ParentTables;
      if (a) {
        var t = (0, puerts_1.toManualReleaseDelegate)(this.o__);
        for (let e = 0; e < a.Num(); e++) {
          var r = a.Get(e);
          UE.KuroDataTableFunctionLibrary.AddOnDataTableChangedDelegate(r, GlobalData_1.GlobalData.World, t);
        }
        this.t__ = true;
      }
    }
  }
  EndDtSync() {
    if (this.t__) {
      var a = this.e__?.ParentTables;
      if (a) {
        for (let e = 0; e < a.Num(); e++) {
          var t = a.Get(e);
          UE.KuroDataTableFunctionLibrary.RemoveOnDataTableChangedDelegate(t, GlobalData_1.GlobalData.World);
        }
        (0, puerts_1.toManualReleaseDelegate)(this.o__);
        this.t__ = false;
      }
    }
  }
  UpdateDebugCameraProps() {
    var e = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
    this.r__.Set("CurrentHandleName", e?.GetHandleName() ?? "");
    this.r__.Set("DtSync", this.GetDtSyncEnabled() ? "true" : "false");
    this.r__.Set("ArmLengthSync", this.GetArmLengthSyncEnabled() ? "true" : "false");
  }
  GetDebugCameraProps() {
    return this.r__;
  }
  GetArmLengthSyncEnabled() {
    return this.i__;
  }
  StartArmLengthSync() {
    this.i__ = true;
  }
  EndArmLengthSync() {
    this.i__ = false;
  }
  ArmLengthSync(e) {
    UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent).SetArmLength(e);
  }
}
exports.UiCameraDebugTool = UiCameraDebugTool;
//# sourceMappingURL=UiCameraDebugTool.js.map