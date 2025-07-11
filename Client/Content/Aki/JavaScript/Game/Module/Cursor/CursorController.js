"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CursorController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class CursorController extends UiControllerBase_1.UiControllerBase {
  static Init() {
    super.Init();
    return true;
  }
  static Rkt(o) {
    var r = Global_1.Global.CharacterController;
    if (r) {
      r.CurrentMouseCursor = o ? 16 : 1;
    }
  }
  static InitMouseByMousePos() {
    var o;
    var r = UE.KuroStaticLibrary.GetSlateApplicationCursorPos();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCommon", 27, "InitMouseByMousePos", ["viewPortMousePosition.X", r.X], ["viewPortMousePosition.Y", r.Y]);
    }
    if (r.X > 0 || r.Y > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCommon", 27, "Mouse在屏幕内");
      }
      o = UE.KuroStaticLibrary.GetGameViewPort();
      UE.KuroStaticLibrary.DoGameViewPortMouseEnter(o, r.X, r.Y);
    }
  }
  static SetWindowCursorStyle() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 27, "SetWindowCursorStyle");
    }
    if (Info_1.Info.IsInKeyBoard()) {
      let o = "";
      o = Info_1.Info.IsPlayInEditor ? "Aki/UI/Module/Cursor/SourceResource" : "Aki/Cursor";
      var r = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorNor");
      var e = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorHi");
      var t = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorPre");
      var l = new UE.Vector2D(0, 0);
      var s = GlobalData_1.GlobalData.World.GetWorld();
      UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 1, r, l);
      UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 16, e, l);
      UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 15, t, l);
      var r = `${UE.BlueprintPathsLibrary.ProjectContentDir()}/${o}/CursorNor.png`;
      ControllerHolder_1.ControllerHolder.KuroSdkController.SetCursor(r);
    }
  }
}
(exports.CursorController = CursorController).CursorEnterExit = o => {
  CursorController.Rkt(o);
};
//# sourceMappingURL=CursorController.js.map