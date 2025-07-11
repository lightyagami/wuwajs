"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContentBase = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatContentBase extends UiPanelBase_1.UiPanelBase {
  constructor(e, s, t, a) {
    super();
    this.ChatContentData = t;
    this.aSt = a;
    this.CreateThenShowByResourceIdAsync(e, s, true).then(() => {
      if (this.aSt) {
        this.aSt(this);
      }
    }, () => {});
  }
}
exports.ChatContentBase = ChatContentBase;
//# sourceMappingURL=ChatContentBase.js.map