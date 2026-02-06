"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyMainView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const UiCameraInputComponent_1 = require("../../../../Common/UiCamera/UiCameraInputComponent");
const UiCameraAnimationManager_1 = require("../../../../UiCameraAnimation/UiCameraAnimationManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const MotorcycleDiyDecoratePanel_1 = require("./MotorcycleDiyDecoratePanel");
const MotorcycleDiyFramePanel_1 = require("./MotorcycleDiyFramePanel");
const MotorcycleDiyStickerPanel_1 = require("./MotorcycleDiyStickerPanel");
class MotorcycleDiyMainView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.kyf = undefined;
    this.qyf = undefined;
    this.Oyf = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.Gyf = false;
    this.Fyf = () => {
      this.Gyf = !this.Gyf;
      const e = this.Gyf;
      if (e) {
        this.UiViewSequence.AddSequenceFinishEvent("UiOut", () => {
          this.GetItem(12).SetUIActive(!e);
        });
        this.UiViewSequence.StopSequenceByKey("UiOut");
        this.UiViewSequence.PlaySequencePurely("UiOut");
      } else {
        this.GetItem(12).SetUIActive(!e);
        this.UiViewSequence.StopSequenceByKey("UiIn");
        this.UiViewSequence.PlaySequencePurely("UiIn");
      }
      var i = {
        IsObserving: this.Gyf
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopRootUpdate, i);
      this.GetDraggable(13).RootUIComp.SetUIActive(this.Gyf);
      this.CameraInputComponent.CanCameraInput = this.Gyf;
      var i = this.Gyf ? "MotorDiyMainCameraIdIn" : "MotorDiyMainCameraIdOut";
      var i = CommonParamById_1.configCommonParamById.GetStringConfig(i) ?? "";
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "1001");
    };
    this.Nyf = () => {
      UiManager_1.UiManager.OpenView("MotorcycleDiyImportPresetView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[0, this.Fyf], [11, this.Nyf]];
  }
  async OnBeforeStartAsync() {
    this.kyf = new MotorcycleDiyFramePanel_1.MotorcycleDiyFramePanel();
    this.qyf = new MotorcycleDiyStickerPanel_1.MotorcycleDiyStickerPanel();
    this.Oyf = new MotorcycleDiyDecoratePanel_1.MotorcycleDiyDecoratePanel();
    var e = [this.kyf.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.qyf.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.Oyf.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())];
    await Promise.all(e);
    this.InitCameraInputData();
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedSkinId();
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorSkinConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.BgDescription);
    this.kyf.Refresh(ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId());
    this.qyf.Refresh(ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList());
    this.GetDraggable(13).RootUIComp.SetUIActive(this.Gyf);
    this.CameraInputComponent.CanCameraInput = this.Gyf;
    this.Oyf.Refresh(ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationIdList());
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorDiyViewShow);
  }
  OnBeforeHide() {
    this.CameraInputComponent.End();
  }
  InitCameraInputData() {
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MotorcycleDiyDefine_1.MOTORCYCLE_DIY_TAB_VIEW_CAMERA_CONFIG_ID);
    var i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var e = {
      DragComponent: this.GetDraggable(13),
      CameraSettingConfig: e,
      SourceLocation: i
    };
    this.CameraInputComponent.InitData(e);
  }
}
exports.MotorcycleDiyMainView = MotorcycleDiyMainView;
//# sourceMappingURL=MotorcycleDiyMainView.js.map