"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyDecorationPreviewView = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const UiCameraInputComponent_1 = require("../../../../Common/UiCamera/UiCameraInputComponent");
const UiCameraAnimationManager_1 = require("../../../../UiCameraAnimation/UiCameraAnimationManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
class MotorcycleDiyDecorationPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ZEf = true;
    this.lqe = undefined;
    this.M3g = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.B6e = () => {
      UiManager_1.UiManager.CloseView("MotorcycleDiyDecorationPreviewView");
    };
    this.Fyf = () => {
      this.ZEf = !this.ZEf;
      this.GetItem(5).SetUIActive(!this.ZEf);
      const i = this.ZEf;
      if (i) {
        this.GetItem(5).SetUIActive(i);
        this.PlaySequence("UiIn", () => {}, true);
        this.CameraInputComponent.End();
      } else {
        this.PlaySequence("UiOut", () => {
          this.GetItem(5).SetUIActive(i);
        }, true);
        this.CameraInputComponent.Start();
        this.CameraInputComponent.TryActivate();
      }
      this.E3g();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Fyf]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetCloseCallBack(this.B6e);
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetTitleTextActive(false);
    this.lqe.SetTitleIconVisible(false);
    var i = this.OpenParam;
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorGeneralPreviewConfig(i);
    if (i) {
      this.M3g = i;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.SubTitle);
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
  V7f() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    var i = this.M3g;
    var i = {
      FrameId: i.Frame,
      DecorationIds: i.Decorations
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
  }
  E3g() {
    var i = this.ZEf ? this.M3g.CameraId : this.M3g.FreeCamera;
    if (!this.M3g.IsFree) {
      this.CameraInputComponent.CanCameraInput = !this.ZEf;
    }
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "1001");
  }
}
exports.MotorcycleDiyDecorationPreviewView = MotorcycleDiyDecorationPreviewView;
//# sourceMappingURL=MotorcycleDiyDecorationPreviewView.js.map