"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieModel = undefined;
const LanguageSystem_1 = require("../../../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const H5CircumUrlById_1 = require("../../../../../../Core/Define/ConfigQuery/H5CircumUrlById");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const InviteNewbieProtocolContext_1 = require("./InviteNewbieProtocolContext");
class InviteNewbieModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.xVa = undefined;
  }
  OnInit() {
    this.xVa = new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(this);
    return true;
  }
  OnClear() {
    this.xVa?.Dispose();
    return !(this.xVa = undefined);
  }
  get ActivityData() {
    if (this.xVa === undefined) {
      this.xVa = new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(this);
    }
    return this.xVa;
  }
  get CurrentActivityId() {
    return this.xVa?.Id ?? 0;
  }
  get HasRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InviteNewbieEntered);
    return e === undefined || !e;
  }
  get HelpId() {
    return this.xVa?.GetHelpId() ?? 0;
  }
  get InviteCode() {
    return this.xVa?.InviteCode ?? "";
  }
  get ScoreTextId() {
    var e;
    if (this.xVa === undefined) {
      return "";
    } else {
      e = this.xVa.Id;
      return H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.ScoreText ?? " ";
    }
  }
  get Score() {
    return this.xVa?.Score ?? 0;
  }
  get RootUrl() {
    var e;
    if (this.xVa !== undefined) {
      e = this.xVa.Id;
      e = H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e);
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
        return e?.OverseaRootUrl;
      } else {
        return e?.RootUrl;
      }
    }
  }
  get QrCodeUrl() {
    if (this.xVa !== undefined) {
      var t = this.xVa.Id;
      var t = H5CircumUrlById_1.configH5CircumUrlById.GetConfig(t)?.Ps5RootUrl;
      if (t !== undefined) {
        let e = undefined;
        var r = LanguageSystem_1.LanguageSystem.PackageLanguage;
        if (r === CommonDefine_1.CHT) {
          e = "zh-tw";
        } else if (r === CommonDefine_1.JAPANESE_ISO639_1) {
          e = "jp";
        } else if (r === CommonDefine_1.KOREAN_ISO639_1) {
          e = "kr";
        } else if (r === CommonDefine_1.FRANCE_ISO639_1) {
          e = "fr";
        } else if (r === CommonDefine_1.GERMANY_ISO639_1) {
          e = "de";
        } else if (r === CommonDefine_1.SPAIN_ISO639_1) {
          e = "es";
        }
        var r = e === undefined ? t : t + "?lang=" + e;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InviteNewbie", 64, "获取二维码链接", ["url", r]);
        }
        return r;
      }
    }
  }
  get IsInternalBrowser() {
    var e;
    return this.xVa !== undefined && (e = this.xVa.Id, H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.IsInternalBrowser ?? false);
  }
  SyncActivityNotify(e) {
    e = e.fks;
    if (this.xVa) {
      this.xVa.InviteCode = e?.XRc ?? undefined;
      this.xVa.Score = e?.SMs ?? 0;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.CurrentActivityId);
  }
}
exports.InviteNewbieModel = InviteNewbieModel;
//# sourceMappingURL=InviteNewbieModel.js.map