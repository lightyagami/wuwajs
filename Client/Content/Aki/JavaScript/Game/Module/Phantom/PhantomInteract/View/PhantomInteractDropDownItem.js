"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDropDownItem = exports.phantomInteractDropDownItemOptionTextId = undefined;
const UE = require("ue");
const DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
exports.phantomInteractDropDownItemOptionTextId = ["PhantomDisplay_SelectAll", "PhantomDisplay_SelectSpecial", "PhantomDisplay_SelectCommon"];
class PhantomInteractDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    var t = this.GetText(1);
    var e = exports.phantomInteractDropDownItemOptionTextId[e];
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
}
exports.PhantomInteractDropDownItem = PhantomInteractDropDownItem;
//# sourceMappingURL=PhantomInteractDropDownItem.js.map