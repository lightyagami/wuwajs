"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailImportantDropDownItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MailDropDownItem_1 = require("./MailDropDownItem");
class MailImportantDropDownItem extends MailDropDownItem_1.MailDropDownItem {
  GetFilteredMailList() {
    var e = ModelManager_1.ModelManager.MailModel.GetImportantMails();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件界面：获取重要邮件", ["length", e?.length]);
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
exports.MailImportantDropDownItem = MailImportantDropDownItem;
//# sourceMappingURL=MailImportantDropDownItem.js.map