"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatExpressionItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ChatExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.U9e = 0;
    this.jYe = undefined;
    this.sHe = () => {
      if (this.jYe) {
        this.jYe(this.U9e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.sHe]];
  }
  Refresh(t, s, i) {
    this.U9e = t.Id;
    var e = t.ExpressionTexturePath;
    const r = this.GetTexture(2);
    r.SetUIActive(false);
    this.SetTextureByPath(e, r, undefined, () => {
      r.SetUIActive(true);
    });
    e = t.Name;
    this.GetText(1).ShowTextNew(e);
  }
  BindOnClicked(t) {
    this.jYe = t;
  }
}
exports.ChatExpressionItem = ChatExpressionItem;
//# sourceMappingURL=ChatExpressionItem.js.map