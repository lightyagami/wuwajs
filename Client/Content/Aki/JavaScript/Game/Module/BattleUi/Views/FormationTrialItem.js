"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationTrialItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationTrialItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fht = undefined;
    this.Ddt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  OnStart() {
    this.GetText(0).Clear();
    if (this.fht) {
      this.y4f(this.fht);
    }
    this.fht = undefined;
    if (this.Ddt) {
      this.YDf(this.Ddt);
    }
    this.Ddt = undefined;
  }
  SetNameText(t) {
    if (this.InAsyncLoading()) {
      this.fht = t;
    } else {
      this.y4f(t);
    }
  }
  SetTrialIcon(t) {
    if (this.InAsyncLoading()) {
      this.Ddt = t;
    } else {
      this.YDf(t);
    }
  }
  y4f(t) {
    var e = this.GetText(0);
    e.Clear();
    e.SetText(t);
  }
  YDf(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, this.GetSprite(1), false);
  }
}
exports.FormationTrialItem = FormationTrialItem;
//# sourceMappingURL=FormationTrialItem.js.map