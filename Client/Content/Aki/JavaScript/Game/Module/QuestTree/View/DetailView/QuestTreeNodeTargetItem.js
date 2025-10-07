"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeTargetItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestTreeNodeTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.BGd = () => {
      if (this.Pe.OnGoto && !this.Pe.IsFinished) {
        this.Pe.OnGoto();
      }
      if (this.Pe.HelpId) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.Pe.HelpId);
      }
      this.GetExtendToggle(0).SetToggleState(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.BGd]];
  }
  Refresh(t, e, r) {
    this.Pe = t;
    this.GetItem(1).SetUIActive(t.Type === 2);
    this.GetItem(3).SetUIActive(!!t.IsFinished);
    this.GetItem(4).SetUIActive(!!t.HelpId && !t.IsFinished);
    this.GetItem(5).SetUIActive((!!t.GotoId || !!t.OnGoto) && !t.IsFinished);
    this.GetItem(6).SetUIActive(!t.IsFinished && t.Type === 1 && !t.HelpId && !t.OnGoto);
    if (t.Text) {
      this.GetText(2).SetText(t.Text);
    } else if (t.TextKey) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TextKey, ...(t.TextParam ?? []));
    }
    var i = this.GetExtendToggle(0);
    if (t.IsFinished || t.Type === 2) {
      i.SetToggleStateForce(2, false, true, true);
    } else {
      i.SetToggleState(0);
    }
  }
}
exports.QuestTreeNodeTargetItem = QuestTreeNodeTargetItem;
//# sourceMappingURL=QuestTreeNodeTargetItem.js.map