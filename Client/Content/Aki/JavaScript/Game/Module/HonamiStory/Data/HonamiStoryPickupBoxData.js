"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPickupBoxData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryBackpackData_1 = require("./HonamiStoryBackpackData");
const PICKUP_EXTRA_ROW = 3;
class HonamiStoryPickupBoxData extends HonamiStoryBackpackData_1.HonamiStoryBackpackData {
  ShaveCapacity() {
    let t = 0;
    for (const e of this.ItemList) {
      t = Math.max(t, Math.floor(e.GetPosition() / this.Width) + e.GetGridHeight());
    }
    var o = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2).GetCapacity();
    var a = (t + PICKUP_EXTRA_ROW) * this.Width + o;
    var i = this.GetCapacity();
    if (a < i) {
      for (let t = a; t < i; t++) {
        this.EmptyGridSet.delete(t);
      }
    } else {
      for (let t = i; t < a; t++) {
        this.EmptyGridSet.add(t);
      }
    }
    this.SetCapacity((t + PICKUP_EXTRA_ROW) * this.Width + o);
  }
  PushItemData(t) {
    t.SetBackpackWidth(this.Width);
    let o = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(this.EmptyGridSet, t, this.Width);
    if (o.Position === -1) {
      var a = t.GetGridHeight() + 1;
      var i = this.GetCapacity();
      this.SetCapacity(i + a * this.GetWidthCount());
      for (let t = i; t < this.GetCapacity(); t++) {
        this.EmptyGridSet.add(t);
      }
      o = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(this.EmptyGridSet, t, this.Width);
    }
    a = new Protocol_1.Aki.Protocol.A$d();
    a.l9_ = o.Position;
    a.Gmd = o.IsCross;
    t.UpdatePositionInfo(a);
    this.RefreshItemMapByAddItem(t);
    return true;
  }
}
exports.HonamiStoryPickupBoxData = HonamiStoryPickupBoxData;
//# sourceMappingURL=HonamiStoryPickupBoxData.js.map