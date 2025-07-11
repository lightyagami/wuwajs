"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFlySkinTab = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotFlySkinTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshFlySkinTabRedDot];
  }
}
exports.RedDotFlySkinTab = RedDotFlySkinTab;
//# sourceMappingURL=RedDotFlySkinTab.js.map