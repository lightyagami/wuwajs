"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelayCloseTime = exports.GameplayFirstPassViewData = exports.GameplayEnterViewData = undefined;
const UiViewData_1 = require("../../../Ui/Define/UiViewData");
class GameplayEnterViewData extends UiViewData_1.UiViewData {
  constructor() {
    super(...arguments);
    this.InfoId = "";
    this.TitleId = "";
  }
}
exports.GameplayEnterViewData = GameplayEnterViewData;
class GameplayFirstPassViewData extends UiViewData_1.UiViewData {
  constructor() {
    super(...arguments);
    this.InfoId = "";
    this.TitleId = "";
  }
}
exports.GameplayFirstPassViewData = GameplayFirstPassViewData;
exports.DelayCloseTime = 3000; //# sourceMappingURL=GameplayViewDefine.js.map