"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const LoadingDefine_1 = require("../../Module/Loading/LoadingDefine");
const InputDefine_1 = require("../Input/InputDefine");
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
const UiViewStorage_1 = require("../UiViewStorage");
const UiLayerType_1 = require("./UiLayerType");
const UiViewInfo_1 = require("./UiViewInfo");
class UiConfig {
  static TryGetViewInfo(r) {
    let n = UiConfig.Jcr.get(r);
    if (!n) {
      var o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(r);
      var t = UiViewStorage_1.UiViewStorage.GetUiTsInfo(r);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "[UiConfig.TryGetViewInfo] 未在UiViewManager中注册", ["name", r]);
        }
        return;
      }
      var a = t.ResourceId;
      let e = "";
      let i = "";
      if (this.zcr(r)) {
        e = ConfigManager_1.ConfigManager.CommonConfig.GetDebugGmViewPath(r);
        i = e;
      } else {
        var g = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(a);
        if (!g) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 16, "[UiConfig.TryGetViewInfo] 找不到界面配置", ["name", r], ["resourceId", a]);
          }
          return;
        }
        e = g.Path;
        i = g.PcPath;
      }
      var f = [];
      if (o.SkipAnim) {
        if (o.IsShortKeysExitView) {
          for (var [s, _] of InputDefine_1.openViewActionsMap.entries()) {
            if (r === _) {
              if (InputSettingsManager_1.InputSettingsManager.GetActionBinding(s)?.GetPcKey()?.GetKeyName() === "Escape") {
                break;
              }
              f.push(s);
              break;
            }
          }
          f.push(InputMappingsDefine_1.actionMappings.Ui返回);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 37, "[UiConfig.SkipAnim] 配置错误,跳过动画功能前提为IsShortKeysExitView=True");
        }
      }
      a = UiLayerType_1.ELayerType[o.Type];
      n = new UiViewInfo_1.UiViewInfo(r, a, t.Ctor, e, i, o.ObstructUi, o.AudioEvent, o.OpenAudioEvent, o.LoopAudioEvent, o.CloseAudioEvent, o.TimeDilation, o.ShowCursorType, o.CanOpenViewByShortcutKey, o.IsShortKeysExitView, t.SourceType, o.LoadAsync, o.NeedGC, o.IsFullScreen, UiLayerType_1.NORMAL_CONTAINER_TYPE & a ? ConfigManager_1.ConfigManager.UiViewConfig.GetUiNormalConfig(r).SortIndex : -1, o.CommonPopBg, o.CommonPopBgKey, o.ScenePath, o.IsPermanent, f, o.FunctionCondition, o.ScenePointTag);
      UiConfig.Jcr.set(r, n);
    }
    return n;
  }
  static zcr(e) {
    return e === "GmView" || e === "LoginDebugView";
  }
  static RewritePath(e, i, r) {
    i = i?.GetExtraResourceId?.(r);
    if (!i || StringUtils_1.StringUtils.IsBlank(i)) {
      e.Path = e.ConfigPath;
      e.PcPath = e.ConfigPcPath;
    } else if (r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(i)) {
      e.Path = r.Path;
      e.PcPath = r.PcPath;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 10, "[UiConfig.RewritePath] 找不到界面配置", ["name", e.Name], ["resourceId", i]);
      }
      e.Path = e.ConfigPath;
      e.PcPath = e.ConfigPcPath;
    }
  }
  static RewritePopFrameType(e, i, r) {
    i = i?.GetExtraPopFrameType?.(r);
    e.CommonPopBg = i === undefined ? e.ConfigCommonPopBg : i;
  }
  static GetCsViewProxyInfo() {
    var e = this.Jcr.get("CsViewProxy");
    return e || (e = UiViewStorage_1.UiViewStorage.GetUiTsInfo("CsViewProxy"), e = new UiViewInfo_1.UiViewInfo("CsViewProxy", UiLayerType_1.ELayerType.Normal, e.Ctor, "", "", [], "", "", "", "", 1, 0, false, false, undefined, false, false, false, -1, 0, "", "", false, [], 0), this.Jcr.set("CsViewProxy", e), e);
  }
}
(exports.UiConfig = UiConfig).Jcr = new Map();
UiConfig.CanOpenWhileClearSceneViewNameSet = new Set(LoadingDefine_1.loadingViewList); //# sourceMappingURL=UiConfig.js.map