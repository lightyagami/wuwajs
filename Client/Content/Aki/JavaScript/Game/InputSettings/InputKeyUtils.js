"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputKeyUtils = undefined;
const Info_1 = require("../../Core/Common/Info");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const ConfigManager_1 = require("../Manager/ConfigManager");
const InputSettingsManager_1 = require("./InputSettingsManager");
class InputKeyUtils {
  static GetGamepadKeyIconPath(e) {
    e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(e);
    if (e) {
      if (Info_1.Info.IsPsGamepad()) {
        return e.PsKeyIconPath;
      } else if (Info_1.Info.IsBackBoneGamepad()) {
        return e.BackBoneKeyIconPath;
      } else if (Info_1.Info.IsNsProGamepad()) {
        return e.NsKeyIconPath;
      } else {
        return e.KeyIconPath;
      }
    } else {
      return "";
    }
  }
  static GetGamepadKeyIconPathByType(e, t) {
    e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(e);
    if (e) {
      if (t === 3 || t === 4) {
        return e.PsKeyIconPath;
      } else if (t === 6) {
        return e.BackBoneKeyIconPath;
      } else if (t === 7) {
        return e.NsKeyIconPath;
      } else if (t === 2) {
        return e.KeyIconPath;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  static GetPcKeyIconPathByCurrentPlatform(e) {
    e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(e);
    if (e) {
      if (Info_1.Info.PlatformType === 4) {
        return e.MacKeyIconPath;
      } else if (InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard && !StringUtils_1.StringUtils.IsBlank(e.FrenchKeyIconPath)) {
        return e.FrenchKeyIconPath;
      } else {
        return e.KeyIconPath;
      }
    }
  }
  static GetLastGamepadEnum() {
    if (Info_1.Info.IsPs5Platform()) {
      return 4;
    } else {
      return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastGamepadEnum) ?? 2;
    }
  }
}
exports.InputKeyUtils = InputKeyUtils;
//# sourceMappingURL=InputKeyUtils.js.map