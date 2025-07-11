"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyViewBase = undefined;
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ActivityDangoMonopolyController_1 = require("./ActivityDangoMonopolyController");
class DangoMonopolyViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityData = undefined;
  }
  OnBeforeCreate() {
    this.UpdateActivityData();
  }
  UpdateActivityData() {
    this.ActivityData = ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData();
    return !!this.ActivityData;
  }
}
exports.DangoMonopolyViewBase = DangoMonopolyViewBase;
//# sourceMappingURL=DangoMonopolyViewBase.js.map