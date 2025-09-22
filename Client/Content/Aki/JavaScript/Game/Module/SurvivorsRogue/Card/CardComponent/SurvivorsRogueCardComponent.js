"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SurvivorsRogueCardComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnComponentVisibleChanged = undefined;
  }
  Refresh(...e) {
    this.OnRefresh(...e);
  }
  GetResourceId() {
    return this.OnGetResourceId() ?? "";
  }
  GetLayoutLevel() {
    return 0;
  }
  OnRefresh() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "没有实现 OnRefresh", ["ComponentName", this.constructor.name]);
    }
  }
  OnGetResourceId() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "没有实现 GetResourceId", ["ComponentName", this.constructor.name]);
    }
  }
  SetActive(e) {
    super.SetActive(e);
    this.OnComponentVisibleChanged?.(this, e);
  }
}
exports.SurvivorsRogueCardComponent = SurvivorsRogueCardComponent;
//# sourceMappingURL=SurvivorsRogueCardComponent.js.map