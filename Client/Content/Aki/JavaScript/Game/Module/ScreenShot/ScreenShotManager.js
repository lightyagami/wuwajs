"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenShotManager = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const GlobalData_1 = require("../../GlobalData");
class ScreenShotManager {
  static Clear() {
    this.ResetScreenShot();
  }
  static PrepareTakeScreenshot(t, e, r, s, a, o) {
    this.ResetScreenShot();
    e = Vector2D_1.Vector2D.Create(e, r);
    r = Vector2D_1.Vector2D.Create(s, a);
    s = GlobalData_1.GlobalData.World;
    this.nvo = UE.KuroGameScreenshotBPLibrary.PrepareTakeScreenshot(s, t, e.ToUeVector2D(), r.ToUeVector2D(), 0, 0, o);
    return this.nvo;
  }
  static ResetScreenShot() {
    if (this.nvo && this.nvo.IsValid()) {
      this.nvo.Reset();
    }
    this.nvo = undefined;
  }
  static RequestIOSPhotoLibraryAuthorization() {
    this.nvo?.RequestIOSPhotoLibraryAuthorization();
  }
  static async TakeFullScreenShotToTextureAsync() {
    var t = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    return await this.TakeScreenShotToTextureAsync(0, 0, t.X, t.Y);
  }
  static async TakeScreenShotToTextureAsync(t, e, r, s) {
    t = this.PrepareTakeScreenshot("", t, e, r, s, false);
    const a = new CustomPromise_1.CustomPromise();
    t.OnTakeScreenshotCapturedDelegate.Add((t, e, r) => {
      t = UE.LGUIBPLibrary.CreateTexture2DFromColors(t, e, r);
      a.SetResult(t);
    });
    t?.TakeScreenshot();
    return await a.Promise;
  }
}
(exports.ScreenShotManager = ScreenShotManager).nvo = undefined;
//# sourceMappingURL=ScreenShotManager.js.map