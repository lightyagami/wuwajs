"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeSelectPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AttributeSelectGrid_1 = require("./AttributeSelectGrid");
class AttributeSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.CallBackClick = undefined;
    this.G1o = () => {
      var t = new AttributeSelectGrid_1.AttributeSelectGrid();
      t.OnClickToggleCallBack = this.y1c;
      return t;
    };
    this.y1c = (t, e) => {
      if (this.CallBackClick) {
        this.CallBackClick(t);
      }
      this.eGe.DeselectCurrentGridProxy();
      this.eGe.SelectGridProxy(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), "VisionRefineAttributeSelect");
    this.eGe = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.G1o, this.GetItem(1).GetOwner());
  }
  RefreshByData(t, e = undefined) {
    this.eRg(t, e);
  }
  async eRg(t, e = undefined) {
    await this.eGe.RefreshByDataAsync(t);
    if (e !== undefined) {
      this.eGe.SelectGridProxy(e);
    }
  }
}
exports.AttributeSelectPanel = AttributeSelectPanel;
//# sourceMappingURL=AttributeSelectPanel.js.map