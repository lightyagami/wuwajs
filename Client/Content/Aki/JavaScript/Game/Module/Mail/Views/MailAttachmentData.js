"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailAttachmentData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ScrollViewDataBase_1 = require("../../Util/ScrollView/ScrollViewDataBase");
class MailAttachmentData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor(t, e, a) {
    super();
    this.ETt = t;
    this.t6 = e;
    this.Wyi = a;
    this.Lo = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ETt);
  }
  GetItemId() {
    return this.ETt;
  }
  GetCount() {
    return this.t6;
  }
  GetPicked() {
    return this.Wyi;
  }
  GetItemConfig() {
    return this.Lo;
  }
}
exports.MailAttachmentData = MailAttachmentData;
//# sourceMappingURL=MailAttachmentData.js.map