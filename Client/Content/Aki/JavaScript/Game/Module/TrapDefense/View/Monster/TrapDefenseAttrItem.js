"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTagAttrItem = exports.TrapDefenseAttrItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class TrapDefenseAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(t) {
    this.ItemData = t;
    var e = this.GetTexture(0);
    var s = this.GetText(1);
    var r = this.GetText(2);
    s.ShowTextNew(t.NameKey);
    r.SetUIActive(!!t.Value);
    e.SetUIActive(!!t.IconPath);
    if (t.IconPath) {
      this.SetTextureByPath(t.IconPath, e);
    }
    if (t.Value) {
      r.SetText(t.Value);
    }
  }
}
exports.TrapDefenseAttrItem = TrapDefenseAttrItem;
class TrapDefenseTagAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(t) {
    this.ItemData = t;
    var e = this.GetSprite(0);
    var s = this.GetText(1);
    var r = this.GetText(2);
    s.ShowTextNew(t.NameKey);
    r.SetUIActive(!!t.Value);
    e.SetUIActive(!!t.IconPath);
    if (t.IconPath) {
      this.SetSpriteByPath(t.IconPath, e, false);
    }
    if (t.Value) {
      r.ShowTextNew(t.Value);
    }
  }
}
exports.TrapDefenseTagAttrItem = TrapDefenseTagAttrItem;
//# sourceMappingURL=TrapDefenseAttrItem.js.map