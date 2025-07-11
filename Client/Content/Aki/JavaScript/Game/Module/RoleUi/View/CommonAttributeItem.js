"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonAttributeItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.pHe = () => !!this.Pe.DetailText;
    this.ToggleEvent = t => {
      t = t === 1;
      this.GetText(5).SetUIActive(t);
      this.GetItem(7).SetUIActive(t);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ToggleEvent]];
  }
  OnStart() {
    var t = this.GetExtendToggle(4);
    t.RootUIComp.SetUIActive(true);
    this.GetItem(7).SetUIActive(false);
    t.CanExecuteChange.Unbind();
    t.CanExecuteChange.Bind(this.pHe);
  }
  ShowTemp(t) {
    if ((this.Pe = t).AttrNameText) {
      this.GetText(1).SetText(t.AttrNameText);
    }
    if (t.AttrIconTexture) {
      this.GetTexture(0).SetUIActive(true);
      this.SetTextureByPath(t.AttrIconTexture, this.GetTexture(0));
    } else {
      this.GetTexture(0).SetUIActive(false);
    }
    if (t.DetailText) {
      this.GetItem(6).SetUIActive(true);
      this.GetText(5).SetText(t.DetailText);
    } else {
      this.GetItem(6).SetUIActive(false);
    }
    if (t.AttrBaseValue) {
      this.GetText(2).SetText(t.AttrBaseValue);
    }
    if (t.AttrAddValue) {
      this.GetText(3).SetText(t.AttrAddValue);
    } else {
      this.GetText(3).SetText("");
    }
  }
}
exports.CommonAttributeItem = CommonAttributeItem;
//# sourceMappingURL=CommonAttributeItem.js.map