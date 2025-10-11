"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoSaveView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScreenShotManager_1 = require("../../ScreenShot/ScreenShotManager");
const PhotographController_1 = require("../PhotographController");
const PhotographDefine_1 = require("../PhotographDefine");
const PhotoSaveMarkItem_1 = require("./PhotoSaveMarkItem");
class FightPhotoSaveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.KWi = "";
    this.p5_ = false;
    this.IAr = 0;
    this.TAr = 0;
    this.LAr = undefined;
    this.f5_ = 0;
    this.g5_ = 0;
    this.C5_ = undefined;
    this.QWi = undefined;
    this.ZWi = () => {
      var e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FightPhotograph", 71, "点击保存截图按钮");
      }
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CheckPhotoPermission()) {
        this.zWi(false, this.eKi, this.DAr, this.MJl);
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(169)).FunctionMap.set(1, this.tKi);
        e.FunctionMap.set(2, () => {
          if (PhotographController_1.PhotographController.CouldRequestPhotoPermission()) {
            LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RequestPhotoPermissionMinTime, TimeUtil_1.TimeUtil.GetServerTime() + CommonParamById_1.configCommonParamById.GetIntConfig("PermissionRequestsTimeId"));
            ControllerHolder_1.ControllerHolder.KuroSdkController.RequestPhotoPermission(this.iKi);
          } else {
            this.tKi();
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.eKi = (e, t, i) => {
      if (this.LAr) {
        if (this.p5_) {
          this.LAr = this.C5_;
          this.IAr = this.f5_;
          this.TAr = this.g5_;
        }
      } else {
        this.IAr = e;
        this.TAr = t;
        this.LAr = i;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FightPhotograph", 71, "截图完成，截图结果进行保存", ["width", e], ["height", t], ["ColorSize", i?.Num()]);
      }
      switch (Info_1.Info.PlatformType) {
        case 2:
          var r = (0, puerts_1.$ref)(undefined);
          UE.KuroGameScreenshotBPLibrary.ConvertColorsToBitmap(this.IAr, this.TAr, this.LAr, r);
          var r = (0, puerts_1.$unref)(r);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("FightPhotograph", 71, "截图保存至Android相册", ["bitmapSize", r?.Num()]);
          }
          UE.KuroGameScreenshotBPLibrary.SaveColorArrayToAndroidAlbum(this.IAr, this.TAr, r);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SaveGalleryPathTips");
          break;
        case 1:
          if (!UE.KuroGameScreenshotBPLibrary.IsPhotoLibraryAuthorized()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("FightPhotograph", 71, "没有获得IOS相册权限，请求权限，请求完成后再次尝试截图");
            }
            ScreenShotManager_1.ScreenShotManager.RequestIOSPhotoLibraryAuthorization();
            return;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("FightPhotograph", 71, "截图保存IOS相册", ["colors", this.LAr?.Num()]);
          }
          UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(this.IAr, this.TAr, this.LAr);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SaveGalleryPathTips");
          break;
        case 8:
          break;
        default:
          r = this.EJl();
          this.KWi = this.fKi(r);
          r = UE.BlueprintPathsLibrary.ProjectUserDir();
          r = r + this.KWi;
          UE.KuroGameScreenshotBPLibrary.SaveScreenshot(r, this.IAr, this.TAr, this.LAr);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("FightPhotograph", 71, "截图保存至游戏安装文件夹", ["path", this.KWi]);
          }
          if (!Platform_1.Platform.IsCloudGame()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SavePathTips", this.KWi);
          }
      }
      this.oKi();
    };
    this.DAr = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FightPhotograph", 71, "允许权限后重新截图", ["isGranted", e], ["width", this.IAr], ["height", this.TAr], ["colorsSize", this.LAr?.Num()]);
      }
      if (!!e && !(this.IAr <= 0) && !(this.TAr <= 0) && !!this.LAr) {
        UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(this.IAr, this.TAr, this.LAr);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SaveGalleryPathTips");
      }
      this.oKi();
    };
    this.tKi = () => {
      switch (Info_1.Info.PlatformType) {
        case 2:
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("Privilege_album_Android");
          break;
        case 1:
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("Privilege_album_IOS");
      }
    };
    this.MJl = e => {
      var t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FightPhotograph", 71, "PS Test OnPhotoCompressed");
      }
      if (Info_1.Info.PlatformType === 8) {
        t = this.EJl();
        UE.GameplayStatics.ExportPngPhotoFromData(e, t);
      }
    };
    this.iKi = e => {
      if (e) {
        this.zWi(false, this.eKi, this.DAr);
      } else {
        this.tKi();
      }
    };
    this.nKi = e => {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName, e);
      this.p5_ = e;
      this.QWi?.SetUiActive(e);
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIExtendToggle], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo], [2, this.ZWi], [1, this.nKi]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.QWi = new PhotoSaveMarkItem_1.PhotoSaveMarkItem();
    e.push(this.QWi.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
    this.p5_ = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName, true);
    var e = this.p5_ ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleState(e);
    this.uKi();
    this.GetText(8)?.SetUIActive(ControllerHolder_1.ControllerHolder.PhotographController.IsSatisfyAllConditions());
    UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneColorShotNow();
  }
  uKi() {
    var e = this.GetItem(3);
    var t = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    var i = UE.WidgetLayoutLibrary.GetViewportScale(GlobalData_1.GlobalData.World);
    e.SetWidth(t.X / (i * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE));
    e.SetHeight(t.Y / (i * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE));
  }
  OnAfterShow() {
    this.X6d();
  }
  async X6d() {
    this.D4_(true);
    this.v5_(true);
    await this.Y6d();
    await this.z6d(true);
    this.v5_(false);
    await this.Y6d();
    await this.z6d(false);
    this.D4_(false);
    this.UiViewSequence?.PlaySequence("ScreenShot", true);
  }
  D4_(e) {
    var t = this.GetItem(3);
    var i = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    var r = UE.WidgetLayoutLibrary.GetViewportScale(GlobalData_1.GlobalData.World);
    if (e) {
      t.SetWidth(i.X / r);
      t.SetHeight(i.Y / r);
      this.X8d(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, false);
    } else {
      t.SetWidth(i.X / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE));
      t.SetHeight(i.Y / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE));
      this.X8d(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, true);
    }
  }
  X8d(e) {
    this.GetTexture(9)?.SetUIActive(!e);
    this.GetItem(10)?.SetUIActive(!e);
    this.GetItem(11)?.SetUIActive(!e);
  }
  async vzd() {
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, false, "ScreenShot");
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, false, "ScreenShot");
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Normal, false, "ScreenShot");
    await this.Y6d();
    await this.Y6d();
    var e = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    ControllerHolder_1.ControllerHolder.PhotographController.TrySaveFightPhotoFromBuffer(0, 0, e.X, e.Y);
    ControllerHolder_1.ControllerHolder.PhotographController.FightPhotoLogReport();
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, true, "ScreenShot");
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, true, "ScreenShot");
    UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Normal, true, "ScreenShot");
  }
  B4_(e, r) {
    var t = this.gKi();
    const o = this.p5_ && e || !this.p5_ && !e;
    if (Info_1.Info.IsPs5Platform()) {
      if (o) {
        this.vzd();
      }
      r();
    } else if (e = ScreenShotManager_1.ScreenShotManager.PrepareTakeScreenshot("", t[0], t[1], t[2], t[3], false)) {
      e.OnTakeScreenshotCapturedDelegate.Clear();
      e.OnTakeScreenshotCapturedDelegate.Add((e, t, i) => {
        if (o) {
          this.LAr = i;
          this.IAr = e;
          this.TAr = t;
          ControllerHolder_1.ControllerHolder.PhotographController.TrySaveFightPhoto(e, t, i);
          ControllerHolder_1.ControllerHolder.PhotographController.FightPhotoLogReport();
        } else {
          this.C5_ = i;
          this.f5_ = e;
          this.g5_ = t;
        }
        r();
      });
      e.TakeScreenshot();
    }
  }
  gKi() {
    var e = this.GetItem(6);
    var t = this.GetItem(7);
    var e = e.GetPositionInViewPort(true);
    var t = t.GetPositionInViewPort(true);
    var i = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    return [e.X < 0 ? 0 : e.X, e.Y < 0 ? 0 : e.Y, (t.X < i.X ? t : i).X, (t.Y < i.Y ? t : i).Y];
  }
  v5_(e) {
    if (e) {
      this.QWi?.SetUiActive(!this.p5_);
    } else {
      this.QWi?.SetUiActive(this.p5_);
    }
  }
  zWi(e, t, i, r) {
    var o = this.EJl();
    var h = this.gKi();
    this.KWi = this.fKi(o);
    var o = UE.BlueprintPathsLibrary.ProjectUserDir();
    var o = o + this.KWi;
    var o = ScreenShotManager_1.ScreenShotManager.PrepareTakeScreenshot(o, h[0], h[1], h[2], h[3], e);
    if (o) {
      o.OnTakeScreenshotCapturedDelegate.Add(t);
      if (i) {
        o.OnIOSPhotoLibraryAuthorizationCompletedDelegate.Add(i);
      }
      if (r) {
        o.OnTakeScreenshotCompressedDelegate.Add(r);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FightPhotograph", 71, "开始截图", ["isSaveFile", e]);
      }
      o.TakeScreenshot();
    }
  }
  EJl() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.DateFormatString2(e) + ".png";
  }
  fKi(e) {
    return "" + ModelManager_1.ModelManager.PhotographModel.SavePath + e;
  }
  oKi() {
    this.CloseMe();
  }
  async Y6d() {
    return new Promise(e => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        e();
      });
    });
  }
  async z6d(t) {
    return new Promise(e => {
      this.B4_(t, e);
    });
  }
}
exports.FightPhotoSaveView = FightPhotoSaveView;
//# sourceMappingURL=FightPhotoSaveView.js.map