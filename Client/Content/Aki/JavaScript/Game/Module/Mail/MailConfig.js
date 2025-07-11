"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MailFilterAll_1 = require("../../../Core/Define/ConfigQuery/MailFilterAll");
const MailFilterById_1 = require("../../../Core/Define/ConfigQuery/MailFilterById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MailConfig extends ConfigBase_1.ConfigBase {
  GetMailSize() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("mail_size");
  }
  GetAllMailFilterConfig() {
    var e = MailFilterAll_1.configMailFilterAll.GetConfigList();
    return e || [];
  }
  GetFilterTypeList() {
    let e = [];
    for (const i of this.GetAllMailFilterConfig()) {
      if (i.Id !== 3) {
        e.push(i.Id);
      }
    }
    return e = e.sort((e, i) => e - i);
  }
  GetMailFilterConfigById(e) {
    var i = MailFilterById_1.configMailFilterById.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Mail", 49, "缺少邮件筛选配置 ID:", ["id", e]);
      }
    }
    return i;
  }
}
exports.MailConfig = MailConfig;
//# sourceMappingURL=MailConfig.js.map