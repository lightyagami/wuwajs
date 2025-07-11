"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChannelModel = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommunityAll_1 = require("../../../Core/Define/ConfigQuery/CommunityAll");
const CommunityById_1 = require("../../../Core/Define/ConfigQuery/CommunityById");
const CustomerServiceAll_1 = require("../../../Core/Define/ConfigQuery/CustomerServiceAll");
const SetAccountAll_1 = require("../../../Core/Define/ConfigQuery/SetAccountAll");
const SetAccountById_1 = require("../../../Core/Define/ConfigQuery/SetAccountById");
const SharePlatformAll_1 = require("../../../Core/Define/ConfigQuery/SharePlatformAll");
const SharePlatformById_1 = require("../../../Core/Define/ConfigQuery/SharePlatformById");
const ShareRewardById_1 = require("../../../Core/Define/ConfigQuery/ShareRewardById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const PlatformSdkConfig_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkConfig");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const LAGUANGE_ALL = "all";
const CHANNEL_ALL = 0;
const PACKAGE_ID_ALL = "all";
class ChannelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.gEt = undefined;
    this.fEt = undefined;
    this.pEt = undefined;
    this.vEt = undefined;
    this.fIn = false;
    this.SharingActionId = 1;
    this.SharingConfigId = 0;
    this.GameIntroductionUrl = "";
    this.MEt = () => {
      this.gEt = [];
      this.fEt = [];
      this.pEt = [];
      this.fIn = false;
      if (ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()) {
        var e = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk();
        var r = LanguageSystem_1.LanguageSystem.PackageLanguage;
        var t = Number(ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId());
        var o = ModelManager_1.ModelManager.KuroSdkModel.GetSdkPackageId();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 53, "当前包体信息", ["是否海外", e], ["当前语言码", r], ["当前渠道", t]);
        }
        var i = FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient;
        if (Info_1.Info.IsMobilePlatform()) {
          for (const n of SharePlatformAll_1.configSharePlatformAll.GetConfigList(e ? 0 : 1)) {
            if (this.EEt(r, n.Language) && this.SEt(t, n.Channel) && this.S8a(o, n.PackageId) && !i.Check()) {
              this.gEt.push(n.Id);
            }
          }
        }
        this.gEt = this.gEt.sort((e, r) => {
          var t = SharePlatformById_1.configSharePlatformById.GetConfig(e);
          var o = SharePlatformById_1.configSharePlatformById.GetConfig(r);
          if (t && o && t.Sort !== o.Sort) {
            return t.Sort - o.Sort;
          } else {
            return e - r;
          }
        });
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "开启分享渠道id ", ["OpenShareChannel", this.gEt]);
        }
        for (const s of CommunityAll_1.configCommunityAll.GetConfigList(e ? 0 : 1)) {
          if (this.EEt(r, s.Language) && this.SEt(t, s.Channel) && this.S8a(o, s.PackageId) && !i.Check()) {
            this.fEt.push(s.Id);
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "开启库街区id ", ["OpenKuroStreetId", this.fEt]);
        }
        for (const h of SetAccountAll_1.configSetAccountAll.GetConfigList(e ? 0 : 1)) {
          if (this.EEt(r, h.Language) && this.SEt(t, h.Channel) && this.S8a(o, h.PackageId) && (!i.Check() || h.Id !== 1 && h.Id !== 9)) {
            this.pEt.push(h.Id);
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "开启账号中心id ", ["OpenAccountSetting", this.pEt]);
        }
        for (const l of CustomerServiceAll_1.configCustomerServiceAll.GetConfigList(e ? 0 : 1)) {
          if (this.EEt(r, l.Language) && this.SEt(t, l.Channel) && this.S8a(o, l.PackageId)) {
            this.fIn = true;
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 10, "客服开启", ["state", this.fIn]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChannelReset);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 53, "不可使用SDK");
      }
    };
  }
  OnInit() {
    this.gEt = [];
    this.fEt = [];
    this.pEt = [];
    this.vEt = [];
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkInitDone, this.MEt);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkInitDone, this.MEt);
    return true;
  }
  EEt(e, r) {
    return r.includes(LAGUANGE_ALL) || r.includes(e);
  }
  SEt(e, r) {
    return r.includes(CHANNEL_ALL) || r.includes(e);
  }
  S8a(e, r) {
    return !!e && (r.includes(PACKAGE_ID_ALL) || r.includes(e));
  }
  CheckShareChannelOpen(e) {
    this.yEt();
    return this.gEt.includes(e);
  }
  CheckKuroStreetOpen() {
    this.yEt();
    return this.fEt.length > 0;
  }
  CheckAccountSettingOpen(e) {
    this.yEt();
    return this.pEt.includes(e);
  }
  CheckCustomerServiceOpen() {
    this.yEt();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 10, "客服是否开启", ["IsCustomerServiceOpen", this.fIn]);
    }
    return this.fIn;
  }
  OpenKuroStreet() {
    if (Info_1.Info.PlatformType === 2) {
      UE.KuroStaticAndroidLibrary.OpenAppWithUrl("kjq://kuro/home?gameId=3", "https://www.kurobbs.com/download.html");
    } else if (Info_1.Info.PlatformType === 1) {
      UE.KuroStaticiOSLibrary.OpenAppWithUrl("kjq://kuro/home?gameId=3", "itms-apps://itunes.apple.com/app/id/1659339393");
    } else if (this.fEt.length) {
      this.IEt(CommunityById_1.configCommunityById.GetConfig(this.fEt[0])?.Adress);
    }
  }
  yEt() {
    if (this.pEt.length === 0) {
      this.MEt();
    }
  }
  ProcessAccountSetting(r) {
    if (r === 1 || r === 9) {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(13);
    } else if (r === 8) {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(15);
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(12);
    } else {
      let e = SetAccountById_1.configSetAccountById.GetConfig(r).Adress;
      var t = Info_1.Info.PlatformType === 7 || Info_1.Info.PlatformType === 8;
      if (r === 2 || r === 3 || r === 4 || r === 6 || r === 7) {
        KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportOpenPrivacy(undefined));
      }
      if (t) {
        if (r === 3 || r === 7) {
          e = PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy();
        } else if (r === 6 || r === 2) {
          e = PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService();
        } else if (r === 4) {
          e = PlatformSdkConfig_1.PlatformSdkConfig.GetChildPolicy();
        }
      }
      this.IEt(e);
    }
  }
  GetOpenedShareIds() {
    this.yEt();
    return this.gEt;
  }
  CouldGetShareReward(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    return this.gEt.length > 0 && !this.vEt.includes(e);
  }
  MarkActionShared(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    this.vEt.push(e);
  }
  IEt(e) {
    if (e) {
      e = e.replace("{0}", LanguageSystem_1.LanguageSystem.PackageLanguage);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "根据渠道打开链接 ", ["formatUrl", e]);
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
    }
  }
  GmOpenShareId(e) {
    if (this.pEt.length === 0) {
      this.pEt.push(5);
    }
    this.gEt?.push(e);
  }
}
exports.ChannelModel = ChannelModel;
//# sourceMappingURL=ChannelModel.js.map