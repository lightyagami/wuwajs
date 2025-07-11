"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketCellData = undefined;
class ScratchTicketCellData {
  constructor(t) {
    this.Index = 0;
    this.Dol = undefined;
    this.Index = t;
  }
  SetRewardItem(t) {
    this.Dol = [{
      ItemId: t.L8n,
      IncId: 0
    }, t.D8n];
  }
  IsLock() {
    return this.Dol === undefined;
  }
  GetItemData() {
    return this.Dol;
  }
}
exports.ScratchTicketCellData = ScratchTicketCellData;
//# sourceMappingURL=ScratchTicketCellData.js.map