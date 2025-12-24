"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyMainView = undefined;
const UE = require("ue");
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
    this.ZCf = undefined;
    this.epf = undefined;
    this.tpf = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.gAf = undefined;
    this.ipf = false;
    this.rpf = () => {
      this.ipf = !this.ipf;
      const e = this.ipf;
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
        IsObserving: this.ipf
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopRootUpdate, i);
      this.GetDraggable(13).RootUIComp.SetUIActive(this.ipf);
      this.CameraInputComponent.CanCameraInput = this.ipf;
      if (this.ipf) {
        this.gAf = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("Cam_MotorStickerAL_0");
      } else {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.gAf, "1001");
      }
    };
    this.opf = () => {
      UiManager_1.UiManager.OpenView("MotorcycleDiyImportPresetView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[0, this.rpf], [11, this.opf]];
  }
  async OnBeforeStartAsync() {
    this.ZCf = new MotorcycleDiyFramePanel_1.MotorcycleDiyFramePanel();
    this.epf = new MotorcycleDiyStickerPanel_1.MotorcycleDiyStickerPanel();
    this.tpf = new MotorcycleDiyDecoratePanel_1.MotorcycleDiyDecoratePanel();
    var e = [this.ZCf.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.epf.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.tpf.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())];
    await Promise.all(e);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
    this.InitCameraInputData();
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel;
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorSkinConfig(e.CurSkinId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.BgDescription);
    this.epf.Refresh(ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList());
    this.GetDraggable(13).RootUIComp.SetUIActive(this.ipf);
    this.CameraInputComponent.CanCameraInput = this.ipf;
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