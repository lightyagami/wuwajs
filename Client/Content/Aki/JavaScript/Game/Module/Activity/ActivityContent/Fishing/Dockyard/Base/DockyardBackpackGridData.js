"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardBackpackGridData = undefined;
const FishingDefine_1 = require("../../FishingDefine");
class DockyardBackpackGridData {
  constructor(t) {
    this.PosData = t;
    this.E9 = 1;
    this.LO_ = false;
    this.pXl = FishingDefine_1.UNVALID_ITEM_BLOCK_ID;
  }
  get ItemBlockId() {
    return this.pXl;
  }
  get IsValid() {
    return this.E9 !== 0;
  }
  SetIsQuicklySell(t) {
    this.LO_ = t;
  }
  get IsQuicklySell() {
    return this.LO_;
  }
  SetGridType(t) {
    this.E9 = t;
  }
  SetItemBlockId(t) {
    this.pXl = t;
  }
}
exports.DockyardBackpackGridData = DockyardBackpackGridData;
//# sourceMappingURL=DockyardBackpackGridData.js.map