"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryContentItemB = exports.MemoryContentItemA = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class MemoryContentItemA extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(t, e, s) {
    var r = this.GetSprite(2);
    this.SetSpriteByPath(t.IconPath, r, false);
    this.GetText(1).ShowTextNew(t.Title);
    this.GetText(0).SetText(t.Content);
  }
}
exports.MemoryContentItemA = MemoryContentItemA;
class MemoryContentItemB extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture]];
  }
  Refresh(t, e, s) {
    var r = this.GetTexture(2);
    var i = !t.IsDelegate && t.HasData;
    r.SetUIActive(i);
    if (i) {
      this.SetTextureByPath(t.IconPath, r);
    }
    this.GetItem(3).SetUIActive(!t.IsDelegate && !t.HasData);
    i = this.GetTexture(5);
    r = t.IsDelegate && t.HasData;
    i.SetUIActive(t.IsDelegate);
    if (r) {
      this.SetTextureByPath(t.IconPath, i);
    }
    this.GetText(1).ShowTextNew(t.Title);
    r = this.GetText(0);
    r.SetUIActive(true);
    r.ShowTextNew(t.Content);
    i = this.GetText(4);
    i.SetUIActive(true);
    i.SetText(t.SubContent);
  }
}
exports.MemoryContentItemB = MemoryContentItemB;
//# sourceMappingURL=MemoryContentItem.js.map