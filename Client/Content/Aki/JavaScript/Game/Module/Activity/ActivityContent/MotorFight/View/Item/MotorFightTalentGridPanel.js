"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTalentGridPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const MotorFightTalentNodeItem_1 = require("./MotorFightTalentNodeItem");
class MotorFightTalentGridPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vcg = [];
    this.ScrollViewDelegate = undefined;
    this.OnSelectTalentNode = e => {};
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async RefreshAsync(e, t, s) {
    var i = [];
    for (const n of e) {
      var o = this.GetItem(0 + n.Row);
      var r = this.vcg[n.Row];
      if (r) {
        r.Refresh();
      } else {
        const a = new MotorFightTalentNodeItem_1.MotorFightTalentNodeItem(o, n, this.RootItem);
        i.push(a.CreateThenShowByResourceIdAsync("UiItem_MotorFightSkillTog", o).then(() => {
          a.OnClickCallback = this.OnSelectTalentNode;
          a.Refresh();
        }));
        this.vcg[n.Row] = a;
      }
    }
    await Promise.all(i);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.MotorFightTalentGridPanel = MotorFightTalentGridPanel;
//# sourceMappingURL=MotorFightTalentGridPanel.js.map