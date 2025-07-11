"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropComponentBase = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SelectablePropComponentBase extends UiPanelBase_1.UiPanelBase {
  constructor(e = undefined) {
    super();
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
}
exports.SelectablePropComponentBase = SelectablePropComponentBase;
//# sourceMappingURL=SelectablePropComponentBase.js.map