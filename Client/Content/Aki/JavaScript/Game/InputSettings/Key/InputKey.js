"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputKey = undefined;
const UE = require("ue");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputKeyUtils_1 = require("../InputKeyUtils");
class InputKey {
  constructor(t) {
    this.HEe = "";
    this.IsKeyboardKey = false;
    this.IsModifierKey = false;
    this.IsGamepadKey = false;
    this.IsPcPsTouchPadKey = false;
    this.IsMouseButton = false;
    this.IsDigital = false;
    this.IsAnalog = false;
    this.IsButtonAxis = false;
    this.IsAxis1D = false;
    this.IsAxis2D = false;
    this.IsAxis3D = false;
    this.jEe = undefined;
    this.HEe = t;
    this.jEe = new UE.Key(new UE.FName(t));
    this.IsKeyboardKey = UE.KismetInputLibrary.Key_IsKeyboardKey(this.jEe) || t === "Keyboard_Invalid";
    this.IsModifierKey = UE.KismetInputLibrary.Key_IsModifierKey(this.jEe);
    this.IsGamepadKey = UE.KismetInputLibrary.Key_IsGamepadKey(this.jEe) || t === "Gamepad_Invalid";
    this.IsMouseButton = UE.KismetInputLibrary.Key_IsMouseButton(this.jEe);
    this.IsDigital = UE.KismetInputLibrary.Key_IsDigital(this.jEe);
    this.IsAnalog = UE.KismetInputLibrary.Key_IsAnalog(this.jEe);
    this.IsButtonAxis = UE.KismetInputLibrary.Key_IsButtonAxis(this.jEe);
    this.IsAxis1D = UE.KismetInputLibrary.Key_IsAxis1D(this.jEe);
    this.IsAxis2D = UE.KismetInputLibrary.Key_IsAxis2D(this.jEe);
    this.IsAxis3D = UE.KismetInputLibrary.Key_IsAxis3D(this.jEe);
    this.IsPcPsTouchPadKey = t === "GenericUSBController_Button14";
  }
  GetKeyName() {
    return this.HEe;
  }
  ToUeKey() {
    return this.jEe;
  }
  GetConfig() {
    if (this.IsKeyboardKey || this.IsMouseButton) {
      return ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(this.HEe);
    } else if (this.IsGamepadKey) {
      return ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(this.HEe);
    } else {
      return undefined;
    }
  }
  GetKeyIconPath() {
    if (this.IsKeyboardKey || this.IsMouseButton) {
      return InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(this.HEe) ?? "";
    } else if (this.IsGamepadKey) {
      return InputKeyUtils_1.InputKeyUtils.GetGamepadKeyIconPath(this.HEe);
    } else {
      return "";
    }
  }
  IsInputKeyDown() {
    return Global_1.Global.CharacterController.IsInputKeyDown(this.ToUeKey());
  }
  GetInputAnalogKeyState() {
    return Global_1.Global.CharacterController.GetInputAnalogKeyState(this.ToUeKey());
  }
}
exports.InputKey = InputKey;
//# sourceMappingURL=InputKey.js.map