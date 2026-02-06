"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleItemPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const ItemController_1 = require("../../../../../Item/ItemController");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class TotalTopUpPickRoleItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this._nd = () => {
      ItemController_1.ItemController.OpenItemTipsByItemId(this.ETt, false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this._nd]];
  }
  Refresh(e) {
    var t;
    var i;
    if (!(e.CurrentRoleId > 0)) {
      this.ETt = e.CurrentItemId;
      i = e.CurrentSelectItemConfigData;
      t = this.GetText(0);
      i = new LguiUtil_1.TableTextArgNew(i?.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_ItemNameShowCount_Text", i, e.CurrentItemCount);
    }
  }
}
exports.TotalTopUpPickRoleItemPanel = TotalTopUpPickRoleItemPanel;
//# sourceMappingURL=TotalTopUpPickRoleItemPanel.js.map