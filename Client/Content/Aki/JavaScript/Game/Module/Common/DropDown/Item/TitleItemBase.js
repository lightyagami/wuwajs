"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleItemBase = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TitleItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
}
exports.TitleItemBase = TitleItemBase;
//# sourceMappingURL=TitleItemBase.js.map