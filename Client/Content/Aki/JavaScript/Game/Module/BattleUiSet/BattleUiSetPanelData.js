"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSetPanelData = undefined;
class BattleUiSetPanelData {
  constructor(t, e) {
    this.dgt = new Map();
    this.IsOnlyPanelEdit = false;
    this.PanelIndex = t;
    for (const s of e) {
      var a = s.PanelItemIndex;
      if (a === -1) {
        this.IsOnlyPanelEdit = true;
        this.dgt.clear();
        this.dgt.set(a, s);
        return;
      }
      this.dgt.set(a, s);
    }
  }
  GetPanelItemData(t) {
    return this.dgt.get(t);
  }
  GetPanelItemDataMap() {
    return this.dgt;
  }
}
exports.BattleUiSetPanelData = BattleUiSetPanelData;
//# sourceMappingURL=BattleUiSetPanelData.js.map