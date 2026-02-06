"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerPreviewView = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const UiCameraInputComponent_1 = require("../../../../Common/UiCamera/UiCameraInputComponent");
const UiCameraAnimationManager_1 = require("../../../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
class MotorcycleDiyStickerPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ZEf = true;
    this.lqe = undefined;
    this.M3g = undefined;
    this.I3g = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.B6e = () => {
      UiManager_1.UiManager.CloseView("MotorcycleDiyStickerPreviewView");
    };
    this.Fyf = () => {
      this.ZEf = !this.ZEf;
      this.GetItem(3).SetUIActive(!this.ZEf);
      const i = this.ZEf;
      if (i) {
        this.GetItem(3).SetUIActive(i);
        this.PlaySequence("UiIn", () => {}, true);
      } else {
        this.PlaySequence("UiOut", () => {
          this.GetItem(3).SetUIActive(i);
        }, true);
      }
      this.E3g();
    };
  }
  lOe(i) {
    var e = [];
    for (const r of i) {
      var t = [{
        IncId: 0,
        ItemId: r
      }, 1];
      e.push(t);
    }
    e.sort((i, e) => {
      var i = i[0].ItemId;
      var e = e[0].ItemId;
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      var t = t ? t.QualityId : 0;
      var r = r ? r.QualityId : 0;
      if (t !== r) {
        return r - t;
      } else {
        return i - e;
      }
    });
    return e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIHorizontalLayout], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[1, this.Fyf]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.lqe.SetCloseCallBack(this.B6e);
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetTitleTextActive(false);
    this.lqe.SetTitleIconVisible(false);
    var i = this.OpenParam;
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorGeneralPreviewConfig(i);
    if (i) {
      this.M3g = i;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.IconTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.SubTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.Describe);
      this.I3g = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.W2e);
      i = this.lOe(i.Sticker);
      this.I3g.RefreshByData(i);
    }
  }
  OnHandleLoadScene() {
    this.V7f();
  }
  OnBeforeShow() {
    this.G3f(this.M3g.FreeCameraConfig);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
  }
  OnHandleReleaseScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.DestroyMotor();
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnBeforeHide() {
    this.CameraInputComponent.End();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(false);
  }
  V7f() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    var i = {
      FrameId: this.M3g.Frame,
      StickerIds: this.M3g.Sticker
    };
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(i);
  }
  G3f(i) {
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(i);
    var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var i = {
      DragComponent: this.GetDraggable(0),
      CameraSettingConfig: i,
      SourceLocation: e
    };
    this.CameraInputComponent.InitData(i);
    this.CameraInputComponent.CanCameraInput = this.M3g.IsFree;
  }
  E3g() {
    var i = this.ZEf ? this.M3g.CameraId : this.M3g.FreeCamera;
    if (!this.M3g.IsFree) {
      this.CameraInputComponent.CanCameraInput = !this.ZEf;
    }
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "1001");
  }
}
exports.MotorcycleDiyStickerPreviewView = MotorcycleDiyStickerPreviewView;
//# sourceMappingURL=MotorcycleDiyStickerPreviewView.js.map