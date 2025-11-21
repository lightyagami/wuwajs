"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordMarkTargetListPanel = undefined;
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const GreatSwordMarkTargetListItemPanel_1 = require("./GreatSwordMarkTargetListItemPanel");
class GreatSwordMarkTargetListPanel {
  constructor() {
    this.J7a = undefined;
    this.OnLayoutRefresh = (e, t, r, a) => {
      var i = new GreatSwordMarkTargetListItemPanel_1.GreatSwordMarkTargetListItemPanel();
      i.CreateThenShowByActorAsync(t.GetOwner());
      return {
        Key: e,
        Value: i
      };
    };
  }
  Initialize(e) {
    this.J7a = new GenericLayoutAdd_1.GenericLayoutAdd(e, this.OnLayoutRefresh);
  }
  AddItemByKey(e) {
    var t = this.J7a.GetLayoutItemByKey(e);
    if (!t) {
      this.J7a.AddItemToLayout([e]);
      (t = this.J7a.GetLayoutItemByKey(e)).SetState(false);
    }
    return t;
  }
  Clear() {
    this.J7a.ClearChildren();
  }
}
exports.GreatSwordMarkTargetListPanel = GreatSwordMarkTargetListPanel;
//# sourceMappingURL=GreatSwordMarkTargetListPanel.js.map