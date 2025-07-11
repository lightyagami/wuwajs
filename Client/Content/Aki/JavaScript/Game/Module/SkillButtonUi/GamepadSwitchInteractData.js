"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadSwitchInteractData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class GamepadSwitchInteractData {
  constructor() {
    this.IsSwitchInteractOpen = false;
    this.State = 0;
    this.Uah = new Set();
    this.SwitchTime = 0;
    this.xah = undefined;
    this.Pah = false;
    this.wah = () => {
      this.Owt(2);
      this.xah = undefined;
    };
  }
  Init() {
    this.SwitchTime = CommonParamById_1.configCommonParamById.GetIntConfig("SwitchInteractTime") ?? 500;
  }
  SetInteractExist(t, e) {
    if (t) {
      this.Uah.add(e);
    } else {
      this.Uah.delete(e);
    }
    this.Bah(this.Uah.size > 0);
  }
  RefreshSwitchInteractOpen(t = false) {
    var e = ModelManager_1.ModelManager.MenuModel.GetGamepadOperationPreferences();
    if (e !== this.IsSwitchInteractOpen) {
      this.IsSwitchInteractOpen = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SwitchInteract]是否开启交互切换探索", ["", e]);
      }
      if (!t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSwitchInteractOpenChanged, e);
      }
      this.Bah(this.Uah.size > 0);
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
  InputInteractButton(t) {
    if (t) {
      if (this.IsSwitchInteractOpen && Info_1.Info.IsInGamepad() && this.State === 2) {
        this.Pah = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[SwitchInteract]按下交互，同时触发按下探索工具");
        }
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.幻象1, true);
      }
    } else if (this.Pah) {
      this.Pah = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SwitchInteract]抬起交互，同时触发抬起探索工具");
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.幻象1, false);
    }
  }
  Bah(t) {
    if (this.IsSwitchInteractOpen) {
      if (t) {
        switch (this.State) {
          case 0:
            break;
          case 1:
          case 2:
            this.bah();
            this.Owt(0);
        }
      } else if (this.State === 0) {
        this.Owt(1);
        this.bah();
        this.xah = TimerSystem_1.TimerSystem.Delay(this.wah, this.SwitchTime);
      }
    } else {
      this.Owt(0);
    }
  }
  Owt(t) {
    if (this.State !== t) {
      this.State = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SwitchInteract]切换状态", ["", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged);
    }
  }
  bah() {
    if (this.xah) {
      this.xah.Remove();
      this.xah = undefined;
    }
  }
}
exports.GamepadSwitchInteractData = GamepadSwitchInteractData;
//# sourceMappingURL=GamepadSwitchInteractData.js.map