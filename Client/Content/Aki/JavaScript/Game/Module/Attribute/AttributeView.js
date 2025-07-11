"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonAttributeItem_1 = require("../RoleUi/View/CommonAttributeItem");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class AttributeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NWe = undefined;
    this.OWe = (e, t, i) => {
      t = new CommonAttributeItem_1.CommonAttributeItem(t);
      t.ShowTemp(e);
      return {
        Key: i,
        Value: t
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.NWe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.OWe);
    this.NWe.RefreshByData(e);
  }
  OnBeforeDestroy() {
    if (this.NWe) {
      this.NWe.ClearChildren();
      this.NWe = undefined;
    }
  }
}
exports.AttributeView = AttributeView;
//# sourceMappingURL=AttributeView.js.map