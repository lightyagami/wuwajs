"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailData = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ScrollViewDataBase_1 = require("../Util/ScrollView/ScrollViewDataBase");
class MailData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor() {
    super(...arguments);
    this.Id = "0";
    this.ConfigId = 0;
    this.Time = 0;
    this.FinishTime = 0;
    this.Level = 1;
    this.Title = "";
    this.Content = "";
    this.Sender = "";
    this.ExpiryTime = 0;
    this.AttachmentInfos = [];
    this.ReadTime = 0;
    this.pyi = 0;
    this.vyi = 0;
    this.Myi = "";
    this.Eyi = "";
    this.Syi = 0;
    this.yyi = "";
    this.Iyi = 0;
    this.Tyi = "";
    this.Lyi = "";
    this.Dyi = "";
    this.Ryi = false;
    this.Uyi = false;
    this.Ayi = false;
    this.Pyi = "";
    this.vjs = true;
    this.WKa = false;
  }
  GetAttachmentStatus() {
    return this.pyi;
  }
  SetAttachmentStatus(t) {
    this.pyi = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件详情：设置附件领取状态", ["MailId", this.Id], ["attachmentStatus", t]);
    }
  }
  GetWasScanned() {
    return this.vyi === 1;
  }
  SetWasScanned(t) {
    this.vyi = t === 1 ? t : 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件详情：设置阅读状态", ["MailId", this.Id], ["scanned", t]);
    }
  }
  GetReceiveTime() {
    return this.Time;
  }
  GetMailLevel() {
    return this.Level;
  }
  GetTitle() {
    return this.Title;
  }
  SetText(t) {
    t = (this.Content = t).split("@&&");
    this.Myi = t[0];
    if (t.length > 1) {
      this.xyi(t[1]);
    }
  }
  xyi(t) {
    this.yyi = "FFFFFFFF";
    this.Syi = 0;
    this.Iyi = 0;
    this.Dyi = "";
    this.Ryi = false;
    this.Tyi = "";
    this.Eyi = "";
    var e = t.split(",");
    for (let t = 0; t < e.length; t++) {
      if (e[t].includes("iconId=")) {
        this.Syi = Number(e[t].replace("iconId=", ""));
      } else if (e[t].includes("color=#")) {
        this.yyi = e[t].replace("color=#", "");
      } else if (e[t].includes("jumpId=")) {
        this.Iyi = Number(e[t].replace("jumpId=", ""));
      } else if (e[t].includes("url=")) {
        this.Dyi = e[t].replace("url=", "");
      } else if (e[t].includes("showNewMail")) {
        this.Uyi = true;
      } else if (e[t].includes("useDefaultBrowser")) {
        this.Ayi = true;
      } else if (e[t].includes("isWenjuanxing=")) {
        this.Ryi = Number(e[t].replace("isWenjuanxing=", "")) === 1;
      } else if (e[t].includes("wenjuanId=")) {
        this.Tyi = e[t].replace("wenjuanId=", "");
      } else if (e[t].includes("wenjuanTitle=")) {
        this.Lyi = e[t].replace("wenjuanTitle=", "");
      } else if (e[t].includes("subTitle=")) {
        this.Lyi = e[t].replace("subTitle=", "");
      } else if (e[t].includes("wenjuanPass=")) {
        this.Pyi = e[t].replace("wenjuanPass=", "");
      } else if (e[t].includes("is_orientation=")) {
        this.vjs = e[t].replace("is_orientation=", "") === "landscape";
      } else if (e[t].includes("needPlayerInfo")) {
        this.WKa = true;
      } else {
        this.Eyi = this.Eyi.concat(e[t]);
      }
    }
  }
  GetIfLandscape() {
    return this.vjs;
  }
  GetUseDefaultBrowser() {
    return this.Ayi;
  }
  GetIfShowNewMail() {
    return this.Uyi;
  }
  GetText() {
    return this.Myi;
  }
  GetSubText() {
    return this.Eyi;
  }
  GetQuestionPass() {
    return this.Pyi;
  }
  GetSubTextIconId() {
    return this.Syi;
  }
  GetSubTextColor() {
    return this.yyi;
  }
  IsQuestionMail() {
    return this.Ryi;
  }
  GetQuestionUrl() {
    var t = ModelManager_1.ModelManager.LoginModel;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("mail_question_key");
    var e = this.Tyi + ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() + ";" + t.GetServerId()?.toString() + e;
    var e = UE.KuroStaticLibrary.HashStringWithSHA1(e);
    var i = ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(LanguageSystem_1.LanguageSystem.PackageLanguage).QuestionnaireId;
    return `${this.Dyi}?sojumpparm=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()};${t.GetServerId()?.toString()}&parmsign=${e}&langv=${i}`;
  }
  GetSubUrl() {
    let t = this.Dyi;
    return t = this.WKa ? PublicUtil_1.PublicUtil.GetExternalUrl(t, 0) ?? t : t;
  }
  GetSubTitle() {
    return this.Lyi;
  }
  GetSubContentJumpId() {
    return this.Iyi;
  }
  GetSender() {
    return this.Sender;
  }
  GetAttachmentInfo() {
    return this.AttachmentInfos;
  }
  GetExpiryTime() {
    return this.ExpiryTime;
  }
}
exports.MailData = MailData;
//# sourceMappingURL=MailInstance.js.map