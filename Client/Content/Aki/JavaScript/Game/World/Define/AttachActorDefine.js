"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachActorEntry = exports.AttachActorItem = undefined;
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../GlobalData");
const CustomMap_1 = require("./CustomMap");
class AttachActorItem {
  constructor() {
    this.Id = 0;
    this.EntityId = 0;
    this.Reason = undefined;
    this.Actor = undefined;
    this.Name = undefined;
    this.ParentActorName = undefined;
    this.DetachType = undefined;
  }
}
exports.AttachActorItem = AttachActorItem;
class AttachActorEntry {
  constructor() {
    this.lbn = 0;
    this._bn = new Map();
    this.WXe = new CustomMap_1.CustomMap();
  }
  AddAttachActorItem(t, s, r, e, i, h) {
    if (this._bn.has(r)) {
      return false;
    }
    this._bn.set(r, ++this.lbn);
    var o = new AttachActorItem();
    o.Id = t;
    o.EntityId = s;
    o.Reason = i;
    o.Actor = r;
    o.Name = r.GetName();
    o.ParentActorName = e.GetName();
    o.DetachType = h;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      r.Tags.Add(FNameUtil_1.FNameUtil.GetDynamicFName("AttachId: " + t));
    }
    this.WXe.Set(this.lbn, o);
    return true;
  }
  GetAttachActorItem(t) {
    t = this._bn.get(t);
    if (t) {
      return this.WXe.Get(t);
    }
  }
  GetAttachActorItems() {
    return this.WXe.GetItems();
  }
  Size() {
    return this._bn.size;
  }
  RemoveAttachActorItem(t) {
    var s = this._bn.get(t);
    return !!s && this._bn.delete(t) && this.WXe.Remove(s);
  }
  Clear() {
    this.lbn = 0;
    this._bn.clear();
    this.WXe.Clear();
  }
}
exports.AttachActorEntry = AttachActorEntry;
//# sourceMappingURL=AttachActorDefine.js.map