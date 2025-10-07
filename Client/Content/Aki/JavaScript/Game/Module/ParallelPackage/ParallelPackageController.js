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
  static hod(e, o, a = 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig", ["url", e]);
    }
    Http_1.Http.Get(e, undefined, (e, a, r) => {
      o(!!e && a === 200, a, r);
    });
  }
  static CAd(o, t) {
    let l;
    l = BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl ? o ? BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl.MainUrl : BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl.SubUrl : "";
    this.hod(l, (e, a, r) => {
      if (e) {
        t(e, r);
      } else if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig", ["Failed to get parallel package config", l]);
        }
        t(e, r);
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
  static CheckParallelPackageWithCache() {
    var e;
    return !!this.GmTest || !this.yAd && (e = this.vAd(), this.MAd() !== e) && this.CheckParallelPackage();
  }
  static CheckParallelPackage() {
    var e;
    var a;
    var r;
    return !!Info_1.Info.IsMobilePlatform() && this.Lo !== undefined && !!(e = this.SAd()) && !(a = e.parentVersion, e = e.childVersion, r = UE.KuroLauncherLibrary.GetAppVersion(), this.YHd(a) !== this.YHd(r)) && !(a = Number(e), r = Number(UE.KuroLauncherLibrary.GetAppChangeList()), isNaN(a)) && !isNaN(r) && r < a;
  }
  static YHd(e) {
    var a = e.split(".");
    if (a.length >= 2) {
      return a[0] + "." + a[1];
    } else {
      return e;
    }
  }
  static EAd(e) {
    var a = this.Lo.languageConfig;
    if (a === undefined || (a = a[e]) === undefined) {
      return "";
    } else {
      return a.content;
    }
  }
  static IAd(e) {
    var a = this.Lo.languageConfig;
    if (a === undefined || (a = a[e]) === undefined) {
      return "";
    } else {
      return a.title;
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
      for (const a of this.Lo.packageConfig ?? []) {
        if (a.packageId === e) {
          return a;
        }
      }
    }
  }
  static TryShowParallelPackageUpdateConfirmBox(o) {
    if (this.CheckParallelPackageWithCache()) {
      this.yAd = true;
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(373);
      var l = LanguageSystem_1.LanguageSystem.PackageLanguage;
      let e = this.IAd(l);
      let a = this.EAd(l);
      if (e === "") {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ParallelPackageUpdateDefaultTitle") ?? "";
      }
      if (a === "") {
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ParallelPackageUpdateDefaultDesc") ?? "";
      }
      t.SetTitle(e);
      t.SetTextArgs(a);
      t.HasToggle = true;
      let r = !(t.ToggleTextKey = "ParallelPackageVersionTip");
      t.SetToggleFunction(e => {
        r = e;
      });
      t.CanExecuteCloseFunc = e => e !== 2;
      t.FunctionMap.set(2, () => {
        PackageUpdateController_1.PackageUpdateController.TryOpenParallelPackageUpdateUrl();
        var e = o === 0 ? 1 : 3;
        var a = new LogReportDefine_1.ParallelDownloadConfirmBoxOperation();
        a.i_type = e;
        LogReportController_1.LogReportController.LogReport(a);
      });
      t.FunctionMap.set(1, () => {
        var e = new LogReportDefine_1.ParallelDownloadConfirmBoxOperation();
        e.i_type = 2;
        LogReportController_1.LogReportController.LogReport(e);
      });
      t.SetCloseFunction(() => {
        var e;
        if (r) {
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
ParallelPackageController.pAd = (e, a) => {
  if (e) {
    _a.Lo = Json_1.Json.Parse(a);
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("KuroSdk", 27, "InitParallelPackageConfig fail", [a, BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo().ParallelPackageDescUrl]);
  }
}; //# sourceMappingURL=ParallelPackageController.js.map