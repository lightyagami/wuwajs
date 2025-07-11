"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailUnReadDropDownItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MailDropDownItem_1 = require("./MailDropDownItem");
class MailUnReadDropDownItem extends MailDropDownItem_1.MailDropDownItem {
  GetFilteredMailList() {
    var e = ModelManager_1.ModelManager.MailModel.GetUnScanMails();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件界面：获取未读邮件", ["length", e?.length]);
    }
    return e;
  }
  GetTitleText() {
    return this.GetFilteredMailList().length.toString();
  }
  OnShowDropDownItemBase(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    this.SetMailCount(this.GetTitleText());
  }
}
exports.MailUnReadDropDownItem = MailUnReadDropDownItem;
//# sourceMappingURL=MailUnReadDropDownItem.js.map