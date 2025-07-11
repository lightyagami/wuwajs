"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const CommonSelectItem_1 = require("./CommonSelectItem");
class ElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.kao = undefined;
    this.Zao = undefined;
  }
  Refresh(t, e, s) {
    this.Update(t);
  }
  Update(t) {
    this.kao = t;
    this.PKt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  PKt() {
    var t;
    if (this.kao.Name) {
      this.GetText(1).ShowTextNew(this.kao.Name);
    } else {
      (t = this.GetText(1)).SetChangeColor(this.kao.IsPreview, t.changeColor);
      t.SetText(this.kao.Count.toString());
    }
    if (!this.Zao) {
      this.Zao = new CommonSelectItem_1.CommonElementItem();
      this.Zao.Update(this.kao.ElementId);
      this.Zao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()).then(() => {
        this.Zao?.RefreshPanel();
      });
    }
  }
}
exports.ElementItem = ElementItem;
//# sourceMappingURL=ElementItem.js.map