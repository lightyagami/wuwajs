"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class ItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LastCloseTimeStamp = 0;
    this.XCi = new Array();
    this.foh = new Array();
    this.$Ci = [];
  }
  OnInit() {
    this.LastCloseTimeStamp = 0;
    this.foh = [];
    return true;
  }
  OnClear() {
    this.XCi.length = 0;
    this.$Ci.length = 0;
    return !(this.foh.length = 0);
  }
  LoadGetItemConfigIdList() {
    this.$Ci = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey) ?? [];
  }
  AddGetItemConfigIdList(t) {
    this.$Ci.push(t);
    this.SaveGetItemConfigIdList();
  }
  IsGotItem(t) {
    return this.$Ci.includes(t);
  }
  SaveGetItemConfigIdList() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey, this.$Ci);
  }
  IsWaitItemListEmpty() {
    return this.XCi.length === 0;
  }
  PushWaitItemList(t) {
    this.XCi.push(t);
  }
  ShiftWaitItemList() {
    return this.XCi.shift();
  }
  IsWaitPhantomListEmpty() {
    return this.foh.length === 0;
  }
  PushWaitPhantomItem(t) {
    this.foh.push(t);
  }
  ShiftWaitPhantomList() {
    return this.foh.shift();
  }
  GmClearWaitItemList() {
    this.XCi = [];
  }
}
exports.ItemModel = ItemModel;
//# sourceMappingURL=ItemModel.js.map