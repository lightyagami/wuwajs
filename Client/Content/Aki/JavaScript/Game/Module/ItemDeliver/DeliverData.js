"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeliverData = undefined;
const DeliverSlotData_1 = require("./DeliverSlotData");
class DeliverData {
  constructor(t, i, s, e) {
    this.Context = undefined;
    this.ngi = [];
    this.NpcName = "";
    this.TitleTextId = undefined;
    this.DescriptionTextId = undefined;
    this.Context = e;
    this.NpcName = t;
    this.TitleTextId = i;
    this.DescriptionTextId = s;
  }
  Clear() {
    this.Context = undefined;
    this.ngi.length = 0;
    this.NpcName = "";
    this.DescriptionTextId = "";
  }
  AddSlotData(t, i, s) {
    var e;
    if (t && !(t.length <= 0)) {
      (e = new DeliverSlotData_1.DeliverSlotData()).Initialize(t, i, s);
      this.ngi.push(e);
      return e;
    }
  }
  GetSlotDataList() {
    return this.ngi;
  }
  IsSlotEnough(t) {
    for (const i of this.ngi) {
      if (i.HasItem() && i.GetCurrentItemConfigId() === t && i.IsEnough()) {
        return true;
      }
    }
    return false;
  }
  HasEmptySlot() {
    for (const t of this.ngi) {
      if (!t.HasItem()) {
        return true;
      }
    }
    return false;
  }
}
exports.DeliverData = DeliverData;
//# sourceMappingURL=DeliverData.js.map