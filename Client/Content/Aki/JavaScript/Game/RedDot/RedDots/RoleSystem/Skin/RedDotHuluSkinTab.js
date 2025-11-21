"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotHuluSkinTab = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotHuluSkinTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.HuluSkinRedDotRefresh];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.CalabashSkinModel.CheckCalabashSkinHasRedDot();
  }
}
exports.RedDotHuluSkinTab = RedDotHuluSkinTab;
//# sourceMappingURL=RedDotHuluSkinTab.js.map