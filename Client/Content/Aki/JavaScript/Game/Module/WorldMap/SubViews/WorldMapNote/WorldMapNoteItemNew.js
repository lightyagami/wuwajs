"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapNoteItemNew = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class WorldMapNoteItemNew extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.eTt = () => {
      this.DNl?.ClickCallback(this.DNl?.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.eTt]];
  }
  Refresh(t) {
    this.DNl = t;
    var s = this.GetSprite(0);
    this.SetSpriteByPath(t.IconRes, s, true);
    this.GetText(1).ShowTextNew(t.DescId);
    s = t.NoteStyle;
    this.GetItem(3).SetUIActive(s === 0);
    this.GetItem(6).SetUIActive(s === 0);
    this.GetItem(4).SetUIActive(s === 1);
    this.GetItem(5).SetUIActive(s === 1);
  }
}
exports.WorldMapNoteItemNew = WorldMapNoteItemNew;
//# sourceMappingURL=WorldMapNoteItemNew.js.map