"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTechGridPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const FloroRanchTechNodeItem_1 = require("./FloroRanchTechNodeItem");
class FloroRanchTechGridPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PGu = [];
    this.ScrollViewDelegate = undefined;
    this.OnSelectTechNode = e => {};
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  Refresh(e, s, t) {
    for (const r of e) {
      var o = this.GetItem(0 + r.Row);
      var i = this.PGu[r.Row];
      if (i) {
        i.Refresh();
      } else {
        const h = new FloroRanchTechNodeItem_1.FloroRanchTechNodeItem(o, r, this.RootItem);
        h.CreateThenShowByResourceIdAsync("UiItem_PastureSkillA", o).then(() => {
          h.OnClickCallback = this.OnSelectTechNode;
          h.Refresh();
        });
        this.PGu[r.Row] = h;
      }
    }
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, s) {}
}
exports.FloroRanchTechGridPanel = FloroRanchTechGridPanel;
//# sourceMappingURL=FloroRanchTechGridPanel.js.map