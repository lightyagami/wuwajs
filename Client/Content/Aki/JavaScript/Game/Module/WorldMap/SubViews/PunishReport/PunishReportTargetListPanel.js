"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportTargetListPanel = undefined;
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const PunishReportTargetListItemPanel_1 = require("./PunishReportTargetListItemPanel");
class PunishReportTargetListPanel {
  constructor() {
    this.J7a = undefined;
    this.OnLayoutRefresh = (e, t, i, r) => {
      var s = new PunishReportTargetListItemPanel_1.PunishReportTargetListItemPanel();
      s.CreateThenShowByActorAsync(t.GetOwner());
      return {
        Key: e,
        Value: s
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
      (t = this.J7a.GetLayoutItemByKey(e)).SetDescTxt("");
      t.SetNumTxt("");
      t.SetState(0);
    }
    return t;
  }
  Clear() {
    this.J7a.ClearChildren();
  }
}
exports.PunishReportTargetListPanel = PunishReportTargetListPanel;
//# sourceMappingURL=PunishReportTargetListPanel.js.map