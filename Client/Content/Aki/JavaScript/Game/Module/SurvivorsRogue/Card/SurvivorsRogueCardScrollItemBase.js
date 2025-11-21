"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardScrollItemBase = undefined;
const SurvivorsRogueCardBase_1 = require("./SurvivorsRogueCardBase");
class SurvivorsRogueCardScrollItemBase extends SurvivorsRogueCardBase_1.SurvivorsRogueCardBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Clear() {}
  OnSelected(e) {
    this.SetSelected(true, e);
  }
  OnDeselected(e) {
    this.SetSelected(false, e);
  }
  OnForceSelected(e, r) {
    this.SetSelected(e, r, true);
  }
  GetKey(e, r) {
    return this.GridIndex;
  }
}
exports.SurvivorsRogueCardScrollItemBase = SurvivorsRogueCardScrollItemBase;
//# sourceMappingURL=SurvivorsRogueCardScrollItemBase.js.map