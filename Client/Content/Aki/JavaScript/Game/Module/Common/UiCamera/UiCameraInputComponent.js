"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraInputComponent = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiCameraControlRotationComponent_1 = require("../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
class UiCameraInputComponent {
  constructor() {
    this.Pe = undefined;
    this.A8i = undefined;
    this.x8i = undefined;
    this.C_r = 0;
    this.CanCameraInput = true;
    this.cmo = () => {
      this.TryDeActivate();
    };
    this.mmo = t => {
      if (t.GetUiCameraAnimationConfig().bTargetActorAsCenter) {
        if (this.C_r === 3) {
          this.DeActivate();
        }
        this.Activate();
      }
    };
    this.w8i = t => {
      if (this.CanCameraInput) {
        this.x8i = t.GetLocalPointInPlane();
      }
    };
    this.B8i = t => {
      var i;
      if (!this.CanCameraInput || TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")) {
        this.x8i = undefined;
      } else {
        i = this.x8i;
        this.x8i = t.GetLocalPointInPlane();
        if (i && (t = this.x8i.X - i.X, i = this.x8i.Y - i.Y, t != 0 && this.A8i.AddYawInput(t), i != 0)) {
          this.A8i.AddPitchInput(i);
        }
      }
    };
    this.b8i = t => {
      if (this.CanCameraInput) {
        this.x8i = undefined;
      }
    };
    this.N8i = t => {
      if (this.CanCameraInput && t.scrollAxisValue !== 0) {
        this.A8i.AddZoomInput(-t.scrollAxisValue);
      }
    };
    this.q8i = t => {
      if (this.CanCameraInput && t !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddPitchInput(-t);
      }
    };
    this.G8i = t => {
      if (this.CanCameraInput && t !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddYawInput(t);
      }
    };
    this.PUn = (t, i) => {
      if (this.CanCameraInput && i !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(i);
      }
    };
    this._mo = () => {
      var t;
      if (this.CanCameraInput && (t = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData())) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(t.HandleName, true, true, "1001");
      }
    };
    this.Eqt = (t, i) => {
      if (this.CanCameraInput && i.TouchType === 2) {
        this.Egt();
      }
    };
  }
  InitData(t) {
    if (this.C_r === 0 || this.C_r === 5) {
      this.C_r = 1;
      this.Pe = t;
      this.OnInitData();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] InitData调用异常", ["ComponentState", this.C_r]);
    }
  }
  UpdateData(t) {
    if (this.C_r === 2 || this.C_r === 4) {
      this.Pe = t;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 75, "[UiCameraInputComponent] UpdateData调用异常", ["ComponentState", this.C_r]);
    }
  }
  Start() {
    if (this.C_r === 1 || this.C_r === 5) {
      this.C_r = 2;
      this.OnStart();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] Start调用异常", ["ComponentState", this.C_r]);
    }
  }
  Activate() {
    if (this.C_r === 2 || this.C_r === 4) {
      if (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] 在相机动画期间不应该激活相机输入组件");
        }
      } else {
        this.C_r = 3;
        this.OnActivate();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] Activate调用异常", ["ComponentState", this.C_r]);
    }
  }
  DeActivate() {
    if (this.C_r === 3) {
      this.C_r = 4;
      this.OnDeActivate();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] DeActivate调用异常", ["ComponentState", this.C_r]);
    }
  }
  End() {
    if (this.C_r === 3) {
      this.DeActivate();
    }
    if (this.C_r === 2 || this.C_r === 4) {
      this.C_r = 5;
      this.OnEnd();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "[UiCameraInputComponent] End调用异常", ["ComponentState", this.C_r]);
    }
  }
  OnInitData() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 43, "[UiCameraInputComponent] 生命周期执行 OnInitData");
    }
    var t = UiCameraManager_1.UiCameraManager.Get();
    this.A8i = t.AddUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent, false);
  }
  OnStart() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 43, "[UiCameraInputComponent] 生命周期执行 OnStart");
    }
    this.AddCameraEventListener();
  }
  AddCameraEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnActivate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 43, "[UiCameraInputComponent] 生命周期执行 OnActivate");
    }
    this.ActiveCameraControlRotationComponent();
    this.A8i?.Activate();
    this.AddInputEventListener();
  }
  AddInputEventListener() {
    var t = this.Pe.DragComponent;
    t.OnPointerBeginDragCallBack.Bind(this.w8i);
    t.OnPointerDragCallBack.Bind(this.B8i);
    t.OnPointerEndDragCallBack.Bind(this.b8i);
    t.OnPointerScrollCallBack.Bind(this.N8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  OnDeActivate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 43, "[UiCameraInputComponent] 生命周期执行 OnDeActivate");
    }
    this.A8i?.Deactivate();
    this.x8i = undefined;
    this.RemoveInputEventListener();
  }
  RemoveInputEventListener() {
    var t = this.Pe.DragComponent;
    t.OnPointerBeginDragCallBack.Unbind();
    t.OnPointerDragCallBack.Unbind();
    t.OnPointerEndDragCallBack.Unbind();
    t.OnPointerScrollCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  RemoveCameraEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnEnd() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 43, "[UiCameraInputComponent] 生命周期执行 OnEnd");
    }
    this.RemoveCameraEventListener();
  }
  GetComponentState() {
    return this.C_r;
  }
  TryActivate() {
    return !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() && (this.Activate(), true);
  }
  TryDeActivate() {
    return this.C_r === 3 && (this.DeActivate(), true);
  }
  ActiveCameraControlRotationComponent() {
    this.A8i.InitDataByConfig(this.Pe.CameraSettingConfig);
    this.A8i.SetNeedFloorReflection(true);
    var t = this.Pe.CameraOffsetConfig;
    if (t) {
      this.A8i.UpdateData(this.Pe.SourceLocation, t.镜头浮动最大高度, t.镜头浮动最低高度, t.镜头浮动最长臂长, t.镜头浮动最短臂长);
    } else {
      this.A8i.UpdateData(this.Pe.SourceLocation, 0, 0, 0, 0);
    }
  }
  Egt() {
    var t;
    if (this.CanCameraInput && TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
      t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      this.A8i.AddZoomInput(-t);
    }
  }
}
exports.UiCameraInputComponent = UiCameraInputComponent;
//# sourceMappingURL=UiCameraInputComponent.js.map