"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableControlView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiComponentUtil_1 = require("../../Module/Util/UiComponentUtil");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class TurntableControlView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Fxe = undefined;
    this.Vxe = undefined;
    this.Hxe = undefined;
    this.jxe = undefined;
    this.Sqn = false;
    this.jwe = e => {
      if (e === "OnOpenTurntableControlViewBlackScreen") {
        this.Sqn = true;
        ControllerHolder_1.ControllerHolder.TurntableControlController.SelectRingByIndex(0, true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[TurntableControlView] Seq触发黑幕进入事件，显示UI");
        }
        this.GetRootItem().SetUIActive(true);
      }
    };
    this.Wwe = (e, t) => {
      if (t) {
        this.Fxe.SetSelfInteractive(false);
        this.Vxe.SetSelfInteractive(false);
        this.Hxe.SetSelfInteractive(false);
        this.jxe.SetSelfInteractive(false);
      } else if (e) {
        this.Fxe.SetSelfInteractive(false);
        this.Vxe.SetSelfInteractive(true);
        if (ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() === IComponent_1.EControllerType.FixedAngle) {
          this.Hxe.SetSelfInteractive(false);
        } else {
          this.Hxe.SetSelfInteractive(true);
        }
        this.jxe.SetSelfInteractive(false);
      } else {
        this.Fxe.SetSelfInteractive(true);
        this.Vxe.SetSelfInteractive(true);
        this.Hxe.SetSelfInteractive(true);
        this.jxe.SetSelfInteractive(true);
      }
    };
    this.DPe = () => {
      this.Wwe(false, true);
      this.Wxe();
    };
    this.Kxe = () => {
      ControllerHolder_1.ControllerHolder.TurntableControlController.SwitchSelectedRing();
    };
    this.Qxe = () => {
      ControllerHolder_1.ControllerHolder.TurntableControlController.StartRotateSelected();
    };
    this.Kwe = () => {
      ControllerHolder_1.ControllerHolder.TurntableControlController.StartRotateSelected();
    };
    this.Qwe = () => {
      ControllerHolder_1.ControllerHolder.TurntableControlController.StopAllRotate();
    };
    this.LPe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.DPe], [1, this.Kxe], [3, this.LPe]];
    if (ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() === IComponent_1.EControllerType.FixedAngle) {
      this.BtnBindInfo.push([2, this.Qxe]);
    }
  }
  OnStart() {
    this.Fxe = this.GetButton(0);
    this.Vxe = this.GetButton(1);
    this.Hxe = this.GetButton(2);
    this.jxe = this.GetButton(3);
    if (ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() === IComponent_1.EControllerType.FreeAngle) {
      this.Hxe.OnPointDownCallBack.Bind(this.Kwe);
      this.Hxe.OnPointUpCallBack.Bind(this.Qwe);
      UiComponentUtil_1.UiComponentUtil.BindAudioEvent(this.Hxe);
    }
  }
  OnBeforeShow() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("TurntableControl");
  }
  OnAfterHide() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("TurntableControl");
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TurntableControlController.HandleTurntableControlViewClose();
    if (this.Hxe.OnPointDownCallBack.IsBound()) {
      this.Hxe.OnPointDownCallBack.Unbind();
    }
    if (this.Hxe.OnPointUpCallBack.IsBound()) {
      this.Hxe.OnPointUpCallBack.Unbind();
    }
    UiComponentUtil_1.UiComponentUtil.UnBindAudioEvent(this.Hxe);
    this.Fxe = undefined;
    this.Vxe = undefined;
    this.Hxe = undefined;
    this.jxe = undefined;
  }
  OnAfterShow() {
    if (ControllerHolder_1.ControllerHolder.TurntableControlController.IsAllRingsAtTarget()) {
      this.Fxe.SetSelfInteractive(false);
      this.Vxe.SetSelfInteractive(false);
      this.Hxe.SetSelfInteractive(false);
    }
    if (!this.Sqn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[TurntableControlView] Seq事件未触发过，初始隐藏UI");
      }
      this.GetRootItem().SetUIActive(false);
    }
  }
  OnAddEventListener() {
    var e = ControllerHolder_1.ControllerHolder.TurntableControlController.GetControllerEntity();
    if (e && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, this.Wwe)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, this.Wwe);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
  }
  OnRemoveEventListener() {
    var e = ControllerHolder_1.ControllerHolder.TurntableControlController.GetControllerEntity();
    if (e && EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, this.Wwe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, this.Wwe);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
  }
  async Wxe() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[TurntableControlView] 重置开始，隐藏UI");
    }
    await this.HideAsync();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(4, 3);
    ControllerHolder_1.ControllerHolder.TurntableControlController.ResetRingsAngle();
    ControllerHolder_1.ControllerHolder.TurntableControlController.SelectRingByIndex(0, true);
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(4, undefined);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[TurntableControlView] 重置结束，显示UI");
    }
    await this.ShowAsync();
    this.Wwe(false, false);
  }
}
exports.TurntableControlView = TurntableControlView;
//# sourceMappingURL=TurntableControlView.js.map