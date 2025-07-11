"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionAttribute = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const RoleAttributeItem_1 = require("./RoleAttributeItem");
class RoleVisionAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.AttributeScroller = undefined;
    this.wqe = undefined;
    this.PCo = () => {
      return new RoleAttributeItem_1.RoleAttributeItem();
    };
    this.wqe = e;
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.AttributeScroller = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.PCo, this.GetItem(1).GetOwner());
  }
  Refresh(e, i = false) {
    const s = new Array();
    e?.forEach(e => {
      var t = new RoleAttributeItem_1.RoleAttributeSt();
      t.Data = e;
      t.NeedCheckBg = i;
      s.push(t);
    });
    this.AttributeScroller.RefreshByData(s);
  }
}
exports.RoleVisionAttribute = RoleVisionAttribute;
//# sourceMappingURL=RoleVisionAttribute.js.map