"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDropDownTitleItem = undefined;
const UE = require("ue");
const TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomInteractDropDownItem_1 = require("./PhantomInteractDropDownItem");
class PhantomInteractDropDownTitleItem extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  ShowTemp(e, t) {
    var o = this.GetText(0);
    var e = PhantomInteractDropDownItem_1.phantomInteractDropDownItemOptionTextId[e];
    LguiUtil_1.LguiUtil.SetLocalTextNew(o, e);
  }
}
exports.PhantomInteractDropDownTitleItem = PhantomInteractDropDownTitleItem;
//# sourceMappingURL=PhantomInteractDropDownTitleItem.js.map