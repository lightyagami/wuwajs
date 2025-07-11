"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeliverSlotData = undefined;
class DeliverSlotData {
  constructor() {
    this.sgi = [];
    this.agi = new Set();
    this.hgi = 0;
    this.HandInType = "ItemIds";
    this.lgi = 0;
    this.HPt = 0;
  }
  Initialize(t, e, s) {
    this.sgi = t;
    this.agi = new Set(t);
    this.hgi = e;
    this.HandInType = s;
    this.lgi = 0;
    this.HPt = 0;
  }
  SetItem(t, e) {
    return !!this.CanSet(t) && (this.lgi = t, this.HPt = e, true);
  }
  ClearItem() {
    this.lgi = 0;
    this.HPt = 0;
  }
  CanSet(t) {
    return (!(this.lgi > 0) || this.lgi === t) && !!this.agi.has(t);
  }
  IsEnough() {
    return this.HPt >= this.hgi;
  }
  HasItem() {
    return this.lgi > 0;
  }
  GetItemRangeSet() {
    return this.agi;
  }
  GetItemRangeList() {
    return this.sgi;
  }
  GetNeedCount() {
    return this.hgi;
  }
  GetCurrentItemConfigId() {
    return this.lgi;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  SetCurrentCount(t) {
    this.HPt = t;
  }
}
exports.DeliverSlotData = DeliverSlotData;
//# sourceMappingURL=DeliverSlotData.js.map