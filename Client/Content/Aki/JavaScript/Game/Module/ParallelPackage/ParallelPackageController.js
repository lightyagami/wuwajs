"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallelPackageController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Http_1 = require("../../../Core/Http/Http");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const PackageUpdateController_1 = require("../../../Launcher/PackageUpdate/PackageUpdateController");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
class ParallelPackageController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.gAd();
    return true;
  }
  static TestParallelPackage() {
    this.GmTest = true;
    BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl = {
      MainUrl: "https://gm-test.aki-game.com/force_update/OptionalUpdate.json",
      SubUrl: "https://gm-test.aki-game.com/force_update/OptionalUpdate.json"
    };
    this.gAd();
  }
  static gAd() {
    var e = UE.KuroLauncherLibrary.GetAppParallel();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig", ["parallelName", e]);
    }
    this.CAd(false, this.pAd);
  }
  static hod(e, o, r = 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig", ["url", e]);
    }
    Http_1.Http.Get(e, undefined, (e, r, a) => {
      o(!!e && r === 200, r, a);
    });
  }
  static CAd(o, t) {
    let l;
    l = BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl ? o ? BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl.MainUrl : BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl.SubUrl : "";
    this.hod(l, (e, r, a) => {
      if (e) {
        t(e, a);
      } else if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig", ["Failed to get parallel package config", l]);
        }
        t(e, a);
      } else {
        this.CAd(true, t);
      }
    });
  }
  static vAd() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.ParallelPackageVersion);
    if (e === undefined) {
      return "";
    } else {
      return e;
    }
  }
  static CheckIfNeedParallelPackage() {
    var e;
    var r;
    var a;
    var o;
    var t;
    return !!this.GmTest || !!Info_1.Info.IsMobilePlatform() && this.Lo !== undefined && !this.yAd && !!(r = this.SAd()) && !(e = r.parentVersion, r = r.childVersion, a = this.vAd(), this.MAd() === a) && !(a = UE.KuroLauncherLibrary.GetAppVersion(), this.YHd(e) !== this.YHd(a)) && !(o = Number(r), t = Number(UE.KuroLauncherLibrary.GetAppChangeList()), isNaN(o)) && !isNaN(t) && t < o;
  }
  static YHd(e) {
    var r = e.split(".");
    if (r.length >= 2) {
      return r[0] + "." + r[1];
    } else {
      return e;
    }
  }
  static EAd(e) {
    var r = this.Lo.languageConfig;
    if (r === undefined || (r = r[e]) === undefined) {
      return "";
    } else {
      return r.content;
    }
  }
  static IAd(e) {
    var r = this.Lo.languageConfig;
    if (r === undefined || (r = r[e]) === undefined) {
      return "";
    } else {
      return r.title;
    }
  }
  static MAd() {
    var e = this.SAd();
    if (e === undefined) {
      return "";
    } else {
      return e.parentVersion + "_" + e.childVersion;
    }
  }
  static SAd() {
    if (this.Lo !== undefined && this.Lo.version !== undefined) {
      var e = PublicUtil_1.PublicUtil.OverridePackageId ?? ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
      for (const r of this.Lo.packageConfig ?? []) {
        if (r.packageId === e) {
          return r;
        }
      }
    }
  }
  static TryShowParallelPackageUpdateConfirmBox(o) {
    if (this.CheckIfNeedParallelPackage()) {
      this.yAd = true;
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(373);
      var l = LanguageSystem_1.LanguageSystem.PackageLanguage;
      let e = this.IAd(l);
      let r = this.EAd(l);
      if (e === "") {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ParallelPackageUpdateDefaultTitle") ?? "";
      }
      if (r === "") {
        r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ParallelPackageUpdateDefaultDesc") ?? "";
      }
      t.SetTitle(e);
      t.SetTextArgs(r);
      t.HasToggle = true;
      let a = !(t.ToggleTextKey = "ParallelPackageVersionTip");
      t.SetToggleFunction(e => {
        a = e;
      });
      t.FunctionMap.set(2, () => {
        PackageUpdateController_1.PackageUpdateController.TryOpenParallelPackageUpdateUrl();
        var e = o === 0 ? 1 : 3;
        var r = new LogReportDefine_1.ParallelDownloadConfirmBoxOperation();
        r.i_type = e;
        LogReportController_1.LogReportController.LogReport(r);
      });
      t.FunctionMap.set(1, () => {
        var e = new LogReportDefine_1.ParallelDownloadConfirmBoxOperation();
        e.i_type = 2;
        LogReportController_1.LogReportController.LogReport(e);
      });
      t.SetCloseFunction(() => {
        var e;
        if (a) {
          e = this.MAd();
          LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.ParallelPackageVersion, e);
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      if (o === 0) {
        l = new LogReportDefine_1.AutoShowParallelDownloadConfirmBox();
        LogReportController_1.LogReportController.LogReport(l);
      }
    }
  }
}
exports.ParallelPackageController = ParallelPackageController;
(_a = ParallelPackageController).GmTest = false;
ParallelPackageController.Lo = undefined;
ParallelPackageController.yAd = false;
ParallelPackageController.pAd = (e, r) => {
  if (e) {
    _a.Lo = Json_1.Json.Parse(r);
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig fail", [r, BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl]);
  }
}; //# sourceMappingURL=ParallelPackageController.js.map