"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroSdkModel = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const AchievementAll_1 = require("../../Core/Define/ConfigQuery/AchievementAll");
const PlayStationActivityConfigAll_1 = require("../../Core/Define/ConfigQuery/PlayStationActivityConfigAll");
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const PublicUtil_1 = require("../Common/PublicUtil");
const TimeUtil_1 = require("../Common/TimeUtil");
const GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const UiNavigationGlobalData_1 = require("../Module/UiNavigation/New/UiNavigationGlobalData");
const KuroSdkDefine_1 = require("./KuroSdkDefine");
const KuroSdkReport_1 = require("./KuroSdkReport");
const LAGUSANSBOLD = "LaguSansBold.otf";
const MOTOYTA = "MotoyaAporoStdW5.otf";
const SUITEBOLD = "SUITE-Bold.otf";
const H7GBKHEAVY = "H7GBKHeavy.TTF";
const DEFAULTEMPTY = " ";
class KuroSdkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ReportedInitState = false;
    this.TSe = undefined;
    this.LSe = new Map();
    this.rba = new Map();
    this.CanUseSdk = false;
    this.CurrentPayItemName = "";
    this.SdkGetFocusState = false;
    this.SdkBlockUserMap = new Map();
    this.kxa = false;
    this.PlayStationPlayOnlyState = false;
    this.UserId = undefined;
    this.OnlineId = undefined;
    this.OFa = -1;
    this.kFa = undefined;
    this.AccountId = undefined;
    this.CurrentPayingOrderId = "";
    this.NeedOpenReviewState = false;
    this.ReviewDelay = 0;
    this.CurrentReviewId = 0;
    this.NeedReviewConfirmBox = false;
    this.QueryPromise = undefined;
    this.W3l = undefined;
    this.NoticeRedDotState = false;
    this.NoticeSign = "1";
  }
  OnInit() {
    this.CanUseSdk = UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") && BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") === KuroSdkDefine_1.USESDK;
    KuroSdkReport_1.KuroSdkReport.Init();
    this.oba();
    this.InitProgressActivityList();
    return true;
  }
  OnGetSdkBlockUserMap(e) {
    this.SdkBlockUserMap = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SDK屏蔽好友列表", ["blockUserMap", e]);
    }
    this.kxa = true;
  }
  async GetSdkBlockUserMap() {
    if (!this.kxa) {
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    }
    return this.SdkBlockUserMap;
  }
  async oba() {
    var e = AchievementAll_1.configAchievementAll.GetConfigList();
    let t = 0;
    e?.forEach(e => {
      if (e.ThirdPartyTrophyId >= 0) {
        t++;
      }
    });
    e = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkTrophyInfo(0, t);
    this.rba = new Map();
    e?.forEach(e => {
      this.rba.set(e.TrophyId, e);
    });
  }
  GetSdkTrophyInfo() {
    return this.rba;
  }
  InitProgressActivityList() {
    var t = PlayStationActivityConfigAll_1.configPlayStationActivityConfigAll.GetConfigList();
    if (t && t.length !== 0) {
      var r = t.length;
      this.kFa = new Array(r);
      for (let e = 0; e < r; e++) {
        this.kFa[e] = t[e];
      }
    }
  }
  UpdateActivityProgress() {
    if (this.kFa && this.kFa.length !== 0) {
      var e = this.OFa;
      var r = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk();
      if (this.OFa < 0) {
        this.OFa = 0;
        r.StartActivity(this.kFa[0].ActivityStringId);
      }
      if (!(this.OFa >= this.kFa.length - 1)) {
        var i = this.kFa.length;
        var a = ModelManager_1.ModelManager.QuestNewModel;
        for (let e = this.OFa, t = e + 1; t < i; e++, t++) {
          var o = this.kFa[e];
          var n = this.kFa[t];
          if (n.QuestId !== 0 && !a.CheckQuestFinished(n.QuestId)) {
            break;
          }
          r.EndActivity(o.ActivityStringId);
          r.StartActivity(n.ActivityStringId);
          this.OFa = t;
        }
      }
      if (e !== this.OFa) {
        this.UpdateActivityAvailability();
      }
    }
  }
  UpdateActivityAvailability() {
    if (!!this.kFa && !(this.OFa < 0) && !(this.OFa >= this.kFa.length)) {
      var t = UE.NewArray(UE.BuiltinString);
      var r = UE.NewArray(UE.BuiltinString);
      for (let e = 0; e < this.kFa.length; e++) {
        (e === this.OFa ? t : r).Add(this.kFa[e].ActivityStringId);
      }
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ChangeActivityAvailability(t, r);
    }
  }
  GetNextProgressActivityQuestId() {
    if (!this.kFa || this.OFa < 0 || this.OFa + 1 >= this.kFa.length) {
      return -1;
    } else {
      return this.kFa[this.OFa + 1].QuestId;
    }
  }
  OnQueryProductInfo(e) {
    e.forEach(e => {
      this.LSe.set(e.GoodId, e);
    });
    this.QueryPromise?.SetResult(true);
    this.QueryPromise = undefined;
  }
  GetQueryProductCurrency(e) {
    e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    e = this.LSe.get(e.ProductId);
    if (e && e.Currency) {
      return e.Currency;
    } else {
      return "";
    }
  }
  GetQueryProductPrice(e) {
    e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    e = this.LSe.get(e.ProductId);
    if (e && e.Price) {
      return e.Price;
    } else {
      return 0;
    }
  }
  GetQueryProductShowPrice(e) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e)).ProductId;
      const r = ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(t);
      if (r) {
        return r.Price;
      } else if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfShowDefaultPrice()) {
        return undefined;
      } else {
        return DEFAULTEMPTY;
      }
    }
    t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    const r = this.LSe.get(t.ProductId);
    if (r && r.Currency && r.Price) {
      return r.Currency + r.Price;
    }
  }
  GetQueryProductName(e) {
    e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    e = this.LSe.get(e.ProductId);
    if (e) {
      return e.Name;
    }
  }
  GetQueryProductDesc(e) {
    e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    e = this.LSe.get(e.ProductId);
    if (e) {
      return e.Desc;
    }
  }
  GetBasicInfo() {
    if (this.CanUseSdk) {
      if (!this.TSe?.bIsValid) {
        this.TSe = UE.KuroSDKManager.GetBasicInfo();
      }
      return this.TSe;
    }
  }
  GetDeviceFontAsset() {
    var e = this.GetFontAsset();
    return this.RJs(e);
  }
  GetFontAsset() {
    switch (LanguageSystem_1.LanguageSystem.PackageLanguage) {
      case "en":
        return LAGUSANSBOLD;
      case "ja":
        return MOTOYTA;
      case "ko":
        return SUITEBOLD;
      case "ru":
      case "de":
      case "es":
      case "pt":
      case "id":
      case "fr":
      case "vi":
      case "th":
        return LAGUSANSBOLD;
      default:
        return H7GBKHEAVY;
    }
  }
  RJs(e) {
    if (Platform_1.Platform.IsIOSPlatform() || Platform_1.Platform.IsMacPlatform()) {
      if (e === LAGUSANSBOLD) {
        return "LaguSans-Bold.otf";
      } else if (e === H7GBKHEAVY) {
        return "ARFangXinShuH7GBK-Heavy.TTF";
      } else if (e === MOTOYTA) {
        return "MotoyaAporoStd-W5.otf";
      } else if (e === SUITEBOLD) {
        return "SUITE-Bold.otf";
      } else {
        return e;
      }
    } else {
      return e;
    }
  }
  GetCurrentFontName() {
    switch (this.GetFontAsset()) {
      case LAGUSANSBOLD:
        return "Lagu Sans";
      case H7GBKHEAVY:
        return "文鼎方新书H7GBK_H";
      case MOTOYTA:
        return "Motoya Aporo Std W5";
      case SUITEBOLD:
        return "SUITE";
      default:
        return "文鼎方新书H7GBK_H";
    }
  }
  OnSdkFocusChange(e) {
    this.SdkGetFocusState = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "OnSdkFocusChange", ["state", e]);
    }
    if (this.SdkGetFocusState) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag("SdkFocus");
    } else {
      UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag("SdkFocus");
    }
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSdkFocusStateChange, this.SdkGetFocusState);
  }
  GetSdkFocusState() {
    return this.SdkGetFocusState;
  }
  SetPlayStationPlayOnlyState(e) {
    this.PlayStationPlayOnlyState = e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetPlayOnly(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SetPlayStationPlayOnlyState", ["state", e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.PlayStationOnly);
  }
  GetSdkPackageId() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId();
    } else {
      return ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
    }
  }
  SetEntryPointData(e) {
    this.W3l = e;
  }
  GetEntryPointData() {
    return this.W3l;
  }
  GetNoticePlatformId() {
    if (Platform_1.Platform.IsAndroidPlatform()) {
      return 2;
    } else if (Platform_1.Platform.IsIOSPlatform()) {
      return 3;
    } else if (Platform_1.Platform.IsPs5Platform()) {
      return 4;
    } else if (Platform_1.Platform.IsMacPlatform()) {
      return 5;
    } else {
      return 1;
    }
  }
  FilterCurrentNeedShowNoticeContent(e, t) {
    var r = [];
    var i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId();
    var a = e.game;
    var e = e.activity;
    var a = a.concat(e);
    var o = this.GetNoticePlatformId();
    for (const s of a) {
      var n = t !== "0";
      if (this.Q3l(s) && this.K3l(s, t) && (s.permanent !== 0 || n) && this.$3l(s, i) && this.X3l(s, o)) {
        r.push(s);
      }
    }
    return r;
  }
  Q3l(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    var r = e.startTimeMs / 1000;
    var e = e.endTimeMs / 1000;
    return r <= t && t <= e;
  }
  K3l(e, t) {
    let r = true;
    if (e.whiteList.length > 0) {
      for (const i of e.whiteList) {
        if (i === Number(t)) {
          return true;
        }
      }
      r = false;
    }
    return r;
  }
  $3l(e, t) {
    let r = true;
    if (e.channel.length > 0) {
      for (const i of e.channel) {
        if (i === t) {
          return true;
        }
      }
      r = false;
    }
    return r;
  }
  X3l(e, t) {
    let r = true;
    if (e.platform.length > 0) {
      for (const i of e.platform) {
        if (i === t) {
          return true;
        }
      }
      r = false;
    }
    return r;
  }
  GetNoticeContentUrl(e) {
    var t;
    if (ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()) {
      if (e >= (t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()).contentUrl.length) {
        return t.contentUrl[e - 1];
      } else {
        return t.contentUrl[e];
      }
    } else {
      return "";
    }
  }
  GetQueryNoticeReadStateUrl() {
    if (ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()) {
      return `${ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().apiUrl}/notice/read-ids/list?uid=${ModelManager_1.ModelManager.PlayerInfoModel.GetId() === undefined ? "0" : ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()}&sign=${ModelManager_1.ModelManager.KuroSdkModel.NoticeSign}&serverId=${ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()}`;
    } else {
      return "";
    }
  }
  GetEntryPointUrl() {
    var e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
    return `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/${e}/entrypoint.json`;
  }
  Y3l(e = 0) {
    var t;
    if (ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()) {
      if (e >= (t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()).h5AppUrl.length) {
        return t.h5AppUrl[e - 1];
      } else {
        return t.h5AppUrl[e];
      }
    } else {
      return "";
    }
  }
  GetPlatformStr() {
    if (Platform_1.Platform.IsAndroidPlatform()) {
      return "Android";
    } else if (Platform_1.Platform.IsIOSPlatform()) {
      return "iOS";
    } else if (Platform_1.Platform.IsMacPlatform()) {
      return "Mac";
    } else if (Platform_1.Platform.IsPs5Platform()) {
      return "PS5";
    } else {
      return "PC";
    }
  }
  GetNoticeUrl(e = 0) {
    var e = this.Y3l(e);
    var t = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
    var r = LanguageSystem_1.LanguageSystem.PackageLanguage;
    var i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetDeviceDid();
    var a = ModelManager_1.ModelManager.PlayerInfoModel;
    var a = a.GetId() === undefined ? "0" : a.GetId().toString();
    var o = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn";
    var n = PublicUtil_1.PublicUtil.GetGameId();
    var s = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId();
    var l = this.GetPlatformStr();
    var u = ModelManager_1.ModelManager.LoginModel.GetSdkLoginInfo()?.Uid;
    var d = ModelManager_1.ModelManager.KuroSdkModel.NoticeSign;
    var _ = PublicUtil_1.PublicUtil.GetPublicInfo();
    return `${e}?server_id=${t}&lang=${r}&did=${i}&role_id=${a}&svr_area=${o}&game_id=${n}&channel=${s}&platform=${l}&user_id=${u}&sign=${d}&login_info=${UE.KuroStaticLibrary.Base64Encode(_)}`;
  }
}
exports.KuroSdkModel = KuroSdkModel;
//# sourceMappingURL=KuroSdkModel.js.map