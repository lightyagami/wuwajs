"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionCameraInputItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputSettings_1 = require("../../../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../../Ui/TouchFinger/TouchFingerManager");
const UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../../../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
class VisionCameraInputItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.U8i = false;
    this.CanPitchInput = false;
    this.A8i = undefined;
    this.OnPlayCameraAnimationStart = () => {
      this.Pause();
    };
    this.OnActivateUiCameraAnimationHandle = () => {
      var t;
      this.U8i = this.P8i();
      if (this.U8i && this.A8i) {
        t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"), 1).D_K2_GetActorLocation();
        this.A8i.UpdateData(t, 0, 0, 0, 0);
        this.A8i.Activate();
        this.A8i.ResumeTick();
      }
    };
    this.x8i = undefined;
    this.w8i = t => {
      if (this.U8i) {
        this.x8i = t.GetLocalPointInPlane();
      }
    };
    this.B8i = t => {
      var i;
      if (!this.U8i || TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")) {
        this.x8i = undefined;
      } else {
        i = this.x8i;
        this.x8i = t.GetLocalPointInPlane();
        if (i && ((t = this.x8i.X - i.X) != 0 && this.A8i.AddYawInput(t), (t = this.x8i.Y - i.Y) != 0) && this.CanPitchInput) {
          this.A8i.AddPitchInput(t);
        }
      }
    };
    this.b8i = t => {
      if (this.U8i) {
        this.x8i = undefined;
      }
    };
    this.q8i = (t, i) => {
      if (i !== 0 && this.U8i && Info_1.Info.IsInGamepad() && this.CanPitchInput) {
        this.A8i.AddPitchInput(-i);
      }
    };
    this.G8i = (t, i) => {
      if (i !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddYawInput(i);
      }
    };
    this.N8i = t => {
      if (this.U8i && t.scrollAxisValue !== 0) {
        this.A8i.AddZoomInput(-t.scrollAxisValue);
      }
    };
    this.O8i = (t, i) => {
      if (i !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(i);
      }
    };
    this.k8i = (t, i) => {
      if (i !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(i);
      }
    };
    this.Eqt = (t, i) => {
      if (this.U8i && i.TouchType === 2) {
        this.Egt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.OnPlayCameraAnimationStart);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.OnActivateUiCameraAnimationHandle);
    var t = this.GetDraggable(0);
    t.OnPointerBeginDragCallBack.Bind(this.w8i);
    t.OnPointerDragCallBack.Bind(this.B8i);
    t.OnPointerEndDragCallBack.Bind(this.b8i);
    t.OnPointerScrollCallBack.Bind(this.N8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiIncrease, this.O8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiReduce, this.k8i);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.OnPlayCameraAnimationStart);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.OnActivateUiCameraAnimationHandle);
    var t = this.GetDraggable(0);
    t.OnPointerBeginDragCallBack.Unbind();
    t.OnPointerDragCallBack.Unbind();
    t.OnPointerEndDragCallBack.Unbind();
    t.OnPointerScrollCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiIncrease, this.O8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiReduce, this.k8i);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  OnStart() {
    this.F8i();
  }
  OnBeforeShow() {
    this.OnActivateUiCameraAnimationHandle();
    this.OnAddEventListener();
  }
  OnBeforeHide() {
    this.A8i?.Deactivate();
    this.OnRemoveEventListener();
    this.U8i = false;
  }
  OnBeforeDestroy() {
    this.V8i();
  }
  Pause() {
    this.U8i = false;
    this.A8i?.PauseTick();
  }
  F8i() {
    var t = UiCameraManager_1.UiCameraManager.Get();
    this.A8i = t.AddUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent, false);
    var t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("声骸");
    this.A8i.InitDataByConfig(t);
  }
  V8i() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    this.A8i = undefined;
  }
  P8i() {
    return !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation();
  }
  Egt() {
    var t;
    if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
      t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      this.A8i.AddZoomInput(-t);
    }
  }
}
exports.VisionCameraInputItem = VisionCameraInputItem;
//# sourceMappingURL=VisionCameraInputItem.js.map