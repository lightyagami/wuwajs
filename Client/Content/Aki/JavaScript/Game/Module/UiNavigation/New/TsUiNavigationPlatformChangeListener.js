"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationPlatformChangeListener = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsUiNavigationPlatformChangeListener extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.IsChangeAlpha = false;
  }
  Constructor() {
    this.IsChangeAlpha = false;
  }
  AwakeBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.ChangeAlpha();
      ModelManager_1.ModelManager.UiNavigationModel?.AddPlatformListener(this);
    }
  }
  OnDestroyBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      ModelManager_1.ModelManager.UiNavigationModel?.RemovePlatformListener(this);
    }
  }
  ChangeAlpha() {
    if (Info_1.Info.IsInGamepad()) {
      this.IsChangeAlpha = true;
      this.GetRootComponent()?.SetAlpha(0);
    } else if (this.IsChangeAlpha) {
      this.IsChangeAlpha = false;
      this.GetRootComponent()?.SetAlpha(1);
    }
  }
}
exports.TsUiNavigationPlatformChangeListener = TsUiNavigationPlatformChangeListener;
exports.default = TsUiNavigationPlatformChangeListener; //# sourceMappingURL=TsUiNavigationPlatformChangeListener.js.map