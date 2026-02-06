"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicUtil = exports.getConfigPath = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Json_1 = require("../../Core/Common/Json");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../Core/Utils/Math/Transform");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const StringBuilder_1 = require("../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const IGlobal_1 = require("../../UniverseEditor/Interface/IGlobal");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CdnServerDebugConfig_1 = require("../Module/Debug/CdnServerDebugConfig");
const MultiTextCsvModule_1 = require("./MultiText/MultiTextCsvModule");
const MultiTextDefine_1 = require("./MultiText/MultiTextDefine");
const TimeUtil_1 = require("./TimeUtil");
const PACKAGENAME = "com.kurogame.aki.internal";
const LOGIN_NOTICE = "LoginNotice.json";
const SCROLLTEXT_NOTICE = "ScrollTextNotice.json";
function getConfigPath(t) {
  return "" + UE.KismetSystemLibrary.GetProjectDirectory() + t;
}
exports.getConfigPath = getConfigPath;
class PublicUtil {
  static IsInIpWhiteList(t) {
    if (t === undefined) {
      return true;
    }
    if (t.length !== 0) {
      var e = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString));
      UE.KuroStaticLibrary.GetLocalHostAddresses(e);
      var r = (0, puerts_1.$unref)(e);
      var i = new Array();
      for (let t = 0; t < r.Num(); t++) {
        var o = r.Get(t);
        i.push(o);
      }
      for (const a of t) {
        for (const l of i) {
          if (l === a) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static GetIfGlobalSdk() {
    return BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea") !== "CN";
  }
  static GetGameId() {
    if (PublicUtil.GetIfGlobalSdk()) {
      return "G153";
    } else {
      return "G152";
    }
  }
  static GetLoginNoticeUrl2(t, e, r) {
    var i = PublicUtil.GetNoticeBaseUrl();
    if (i) {
      return `${i}/gm/loginNotice/${t}/${r}/${e}.json`;
    }
  }
  static GetMarqueeUrl2(t, e) {
    var r = PublicUtil.GetNoticeBaseUrl();
    if (r) {
      return `${r}/gm/scrollTextNotice/${t}/${e}/notice.json`;
    }
  }
  static GetLoginNoticeUrl() {
    var t = PublicUtil.GetNoticeBaseUrl();
    if (t) {
      return `${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/${LOGIN_NOTICE}`;
    }
  }
  static GetMarqueeUrl() {
    var t = PublicUtil.GetNoticeBaseUrl();
    if (t) {
      return `${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/${SCROLLTEXT_NOTICE}`;
    }
  }
  static GetNoticeBaseUrl() {
    var t = BaseConfigController_1.BaseConfigController.GetNoticeUrl();
    if (t) {
      return CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetNoticeServerPrefixAddress(t);
    }
    if (!GlobalData_1.GlobalData.IsPlayInEditor) {
      t = cpp_1.KuroApplication.GetAppReleaseType();
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PublicUtil", 8, "找不到cdn", ["Apptype", t]);
      }
    }
  }
  static GetGARUrl(t, e, r, i, o) {
    var a = BaseConfigController_1.BaseConfigController.GetGARUrl();
    if (a) {
      return `${a}/UserRegion/GetUserInfo?loginType=${t}&userId=${e}&token=${i}&area=${o}&userName=${r}`;
    }
  }
  static GetPublicInfo() {
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("mail_question_key");
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var r = encodeURIComponent(ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ?? "");
    var i = ModelManager_1.ModelManager.LoginModel.GetServerId();
    var o = ModelManager_1.ModelManager.LoginModel?.GetSdkLoginConfig();
    var a = o?.Token ?? "";
    var o = o?.Uid ?? "";
    var l = TimeUtil_1.TimeUtil.GetServerTime();
    var t = `${e};${i};${a = UE.KuroStaticLibrary.Base64Encode(a)};${l};${t}`;
    return `playerId=${e}&playerName=${r}&serverId=${i}&token=${a}&timestamp=${l}&sign=${UE.KuroStaticLibrary.HashStringWithSHA1(t)}&playerUid=${o}&pkgId=${PublicUtil.OverridePackageId ?? ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId()}&channelId=${ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId()}`;
  }
  static GetExternalUrl(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PublicUtil", 8, "GetExternalUrl", ["rootUrl", t]);
    }
    if (!StringUtils_1.StringUtils.IsEmpty(t) && !StringUtils_1.StringUtils.IsBlank(t)) {
      var r = this.GetPublicInfo();
      switch (e) {
        case 0:
          return `${t}?${r}&channelId=${ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId()}`;
        case 1:
        case 3:
          return this.J4f(t);
        case 2:
          var i = PublicUtil.OverridePackageId ?? ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
          var o = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId();
          var a = UE.KuroStaticLibrary.Base64Encode(r);
          var l = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn";
          return `${t}/${LanguageSystem_1.LanguageSystem.PackageLanguage}/?login_info=${a}&packageId=${i}&channelId=${o}&svr_area=${l}&entryType=game&platform=${ModelManager_1.ModelManager.KuroSdkModel.GetPlatformStr()}`;
        default:
          return;
      }
    }
  }
  static J4f(t) {
    var e = this.GetPublicInfo();
    var r = PublicUtil.OverridePackageId ?? ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
    var i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId();
    var o = ModelManager_1.ModelManager.KuroSdkModel.GetPlatformStr();
    var a = LanguageSystem_1.LanguageSystem.PackageLanguage;
    return `${t}?login_info=${UE.KuroStaticLibrary.Base64Encode(e)}&packageId=${r}&channelId=${i}&platform=${o}&lang=${a}&entryType=game&svr_area=${ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn"}`;
  }
  static GetExtendExternalUrl(t, e = true) {
    if (StringUtils_1.StringUtils.IsEmpty(t) || StringUtils_1.StringUtils.IsBlank(t)) {
      return "";
    } else {
      return t + "&isInternalBrowser=" + (e ? 1 : 0);
    }
  }
  static GetLocalHost() {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString));
    UE.KuroStaticLibrary.GetLocalHostAddresses(t);
    var e = (0, puerts_1.$unref)(t);
    let r = "127.0.0.1";
    if (e.Num() > 0) {
      r = e.Get(0);
    }
    for (let t = 0; t < e.Num(); t++) {
      var i = e.Get(t);
      if (i.startsWith("10.0.")) {
        r = i;
      }
    }
    return r;
  }
  static GetConfigTextByKey(t) {
    if (PublicUtil.UseDbConfig()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t;
    } else {
      return this.xde.GetLocalText(t) ?? t;
    }
  }
  static GetConfigTextByTable(t, e) {
    t = this.GetConfigIdByTable(t, e);
    if (PublicUtil.UseDbConfig()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    } else {
      return this.xde.GetLocalText(t);
    }
  }
  static GetConfigIdByTable(t, e) {
    t = MultiTextDefine_1.tableTextMap[t];
    return new StringBuilder_1.StringBuilder(t[0], e, t[1]).ToString();
  }
  static GetFlowConfigLocalText(t) {
    if (PublicUtil.UseDbConfig()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    } else {
      return this.xde.GetLocalText(t);
    }
  }
  static RegisterEditorLocalConfig(t = false) {
    if (!PublicUtil.UseDbConfig()) {
      this.xde.RegisterTextLocalConfig(getConfigPath(IGlobal_1.globalConfig.TidTextTempPath), t);
    }
  }
  static RegisterFlowTextLocalConfig(t) {
    var e;
    var r;
    if (!PublicUtil.UseDbConfig()) {
      e = "" + UE.KismetSystemLibrary.GetProjectDirectory() + MultiTextDefine_1.MULTI_TEXT_LANG_PLOT_PATH;
      t = `文本库_${t}.csv`;
      if ((r = UE.KuroStaticLibrary.GetFilesRecursive(e, t, true, false)).Num() === 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MultiTextCsvModule", 10, "无法找到对应文本库表格", ["文本库表格名字", t], ["目录路径", e]);
        }
      } else {
        this.xde.RegisterTextLocalConfig(r.Get(0), true);
      }
    }
  }
  static GetFlowListInfo(t) {
    if (!PublicUtil.UseDbConfig()) {
      var e;
      var r = getConfigPath(IGlobal_1.globalConfig.FlowListDir);
      var r = UE.KuroStaticLibrary.GetFilesRecursive(r, t + ".json", true, false);
      if (r.Num() !== 0) {
        r = r.Get(0);
        e = (0, puerts_1.$ref)(undefined);
        UE.KuroStaticLibrary.LoadFileToString(e, r);
        r = (0, puerts_1.$unref)(e);
        e = JSON.parse(r);
        return Object.assign({}, e);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 18, "[ControllerHolder.PlotController.StartPlotNetwork] 无法找到对应剧情资源", ["flowListName", t]);
      }
    }
  }
  static GetParkourConfig(t) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(12, t);
  }
  static IsUseTempData() {
    return (!!GlobalData_1.GlobalData.IsPlayInEditor || !!GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) && (this.wde === undefined && this.Bde(), this.wde ?? false);
  }
  static IsStartEditorDebugServer() {
    return (!!GlobalData_1.GlobalData.IsPlayInEditor || !!GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) && (this.bde === undefined && this.Bde(), this.bde);
  }
  static GetGameDebugPort() {
    if (GlobalData_1.GlobalData.IsPlayInEditor || GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) {
      if (this.qde === undefined) {
        this.Bde();
      }
      return this.qde;
    }
  }
  static GetEditorDebugPort() {
    if (GlobalData_1.GlobalData.IsPlayInEditor || GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) {
      if (this.Gde === undefined) {
        this.Bde();
      }
      return this.Gde;
    }
  }
  static Bde() {
    var t;
    var e;
    var r = UE.BlueprintPathsLibrary.ProjectDir() + "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json";
    if (!UE.BlueprintPathsLibrary.FileExists(r) || (t = (e = "", puerts_1.$ref)(""), !UE.KuroStaticLibrary.LoadFileToString(t, r)) || (e = (0, puerts_1.$unref)(t), (r = Json_1.Json.Parse(e)) === undefined)) {
      this.wde = false;
    } else {
      this.wde = r.UseTemp;
      this.bde = r.IsOpenDebugService;
      this.qde = r.GameClientGmPort;
      this.Gde = r.EditorPort;
    }
  }
  static TestLoadEditorConfigData() {
    var t = UE.BlueprintPathsLibrary.ProjectConfigDir() + "../Saved/Editor/JsonConfig/EditorConfig.json";
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      var e = (0, puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(e, t)) {
        e = (0, puerts_1.$unref)(e);
        e = Json_1.Json.Parse(e);
        if (e !== undefined) {
          return e;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 42, "读取本地文件配置失败, 反序列化失败");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 42, "读取本地文件配置失败", ["path", t]);
      }
    }
  }
  static TestSaveEditorConfigData(t = undefined) {
    var e;
    var r = undefined;
    if (t) {
      r = t;
      if ((t = Json_1.Json.Stringify(r)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 42, "IEditorConfig反序列化失败");
        }
      } else {
        e = UE.BlueprintPathsLibrary.ProjectConfigDir() + "../Saved/Editor/JsonConfig/EditorConfig.json";
        UE.KuroStaticLibrary.SaveStringToFile(t, e);
      }
      return r;
    }
  }
  static MapToObj(t) {
    var e;
    var r;
    var i = {};
    for ([e, r] of t) {
      i[e] = r;
    }
    return i;
  }
  static MapToObjEx(t) {
    var e;
    var r;
    var i = {};
    for ([e, r] of t) {
      i[e] = this.MapToObj(r);
    }
    return i;
  }
  static ObjToMap(t) {
    var e = new Map();
    for (const i in t) {
      var r = Number(i);
      if (isNaN(r)) {
        e.set(i, t[i]);
      } else {
        e.set(r, t[i]);
      }
    }
    return e;
  }
  static ObjToMapEx(t) {
    var e = new Map();
    for (const r in t) {
      e.set(r, this.ObjToMap(t[r]));
    }
    return e;
  }
  static UseDbConfig() {
    return !PublicUtil.IsUseTempData();
  }
  static SetIsSilentLogin(t) {
    this.Nde = t;
  }
  static GetIsSilentLogin() {
    return this.Nde;
  }
  static CreateTransformFromConfig(t, e, r) {
    var i = Transform_1.Transform.Create();
    var t = Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
    var e = Rotator_1.Rotator.Create(e?.Y ?? 0, e?.Z ?? 0, e?.X ?? 0);
    var r = Vector_1.Vector.Create(r?.X ?? 0, r?.Y ?? 0, r?.Z ?? 0);
    i.SetLocation(t);
    i.SetRotation(e.Quaternion());
    i.SetScale3D(r);
    return i;
  }
  static GetFiles(t, e) {
    var r = UE.KuroStaticLibrary.GetFilesRecursive(t, "*", true, false);
    var i = r.Num();
    var o = new Array();
    for (let t = 0; t < i; ++t) {
      var a = r.Get(t);
      var l = this.GetFileNameWithoutExtension(a);
      if (!e || !!l.startsWith(e)) {
        o.push(a);
      }
    }
    return o;
  }
  static GetFileNameWithExtension(t) {
    return UE.BlueprintPathsLibrary.GetCleanFilename(t);
  }
  static GetFileNameWithoutExtension(t) {
    return UE.BlueprintPathsLibrary.GetBaseFilename(t);
  }
}
(exports.PublicUtil = PublicUtil).wde = undefined;
PublicUtil.bde = undefined;
PublicUtil.Gde = undefined;
PublicUtil.qde = undefined;
PublicUtil.xde = new MultiTextCsvModule_1.MultiTextCsvModule();
PublicUtil.OverridePackageId = undefined;
PublicUtil.Nde = false; //# sourceMappingURL=PublicUtil.js.map