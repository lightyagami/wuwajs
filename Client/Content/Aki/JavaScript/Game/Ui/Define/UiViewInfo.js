"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewInfo = undefined;
const Info_1 = require("../../../Core/Common/Info");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiLayerType_1 = require("./UiLayerType");
class UiViewInfo {
  constructor(e, i, t, o, s, a, h, R, n, V, w, r, l, u, c, p, g, f, y, C, S, v, b, M, _, U, I = "") {
    this.Name = e;
    this.Type = i;
    this.Ctor = t;
    this.ConfigPath = o;
    this.ConfigPcPath = s;
    this.BeObstructView = a;
    this.AudioEvent = h;
    this.OpenAudioEvent = R;
    this.LoopAudioEvent = n;
    this.CloseAudioEvent = V;
    this.KeepLoopEvent = w;
    this.TimeDilation = r;
    this.ShowCursorType = l;
    this.CanOpenViewByShortcutKey = u;
    this.IsShortKeysExitView = c;
    this.SourceType = p;
    this.LoadAsync = g;
    this.NeedGc = f;
    this.IsFullScreen = y;
    this.SortIndex = C;
    this.ConfigCommonPopBg = S;
    this.CommonPopBgKey = v;
    this.ScenePathInternal = b;
    this.IsPermanent = M;
    this.SkipAnimActions = _;
    this.FunctionCondition = U;
    this.ScenePointTag = I;
    this.CF_ = UiLayerType_1.ELayerType.Normal;
    this.CommonPopBg = 0;
    this.Path = "";
    this.PcPath = "";
    this.CF_ = this.Type;
    this.CommonPopBg = this.ConfigCommonPopBg;
    this.Path = this.ConfigPath;
    this.PcPath = this.ConfigPcPath;
  }
  SetContainerLayerType(e) {
    if (e) {
      this.CF_ = e;
      if (this.Type < e) {
        this.Type = e;
      }
    } else {
      e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(this.Name);
      e = UiLayerType_1.ELayerType[e.Type];
      this.CF_ = e;
    }
  }
  GetContainerLayerType() {
    return this.CF_;
  }
  get UiPath() {
    if (!Info_1.Info.IsInTouch() && this.PcPath) {
      return this.PcPath;
    } else {
      return this.Path;
    }
  }
  get ScenePath() {
    var e = UiViewInfo.Zcr.get(this.Name);
    if (e) {
      return ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e).ScenePath;
    } else {
      return this.ScenePathInternal;
    }
  }
}
(exports.UiViewInfo = UiViewInfo).Zcr = new Map([["RoleBreachView", "RoleRootView"], ["RoleSkillView", "RoleRootView"], ["RoleBreachSuccessView", "RoleRootView"], ["RoleElementView", "RoleRootView"], ["RoleAttributeDetailView", "RoleRootView"], ["RoleLevelUpView", "RoleRootView"], ["RoleFavorInfoView", "RoleRootView"], ["RoleSelectionView", "RoleRootView"], ["PhantomBattleFettersView", "RoleRootView"], ["RoleDevRootView", "RoleRootView"], ["RoleSkillMergeView", "RoleRootView"], ["WeaponReplaceView", "WeaponRootView"], ["WeaponBreachSuccessView", "WeaponRootView"], ["WeaponResonanceSuccessView", "WeaponRootView"], ["SkinRootView", "WeaponRootView"], ["VisionRecoveryResultView", "CalabashRootView"], ["VisionRecoveryBatchResultView", "CalabashRootView"], ["VisionRefineResultView", "CalabashRootView"], ["VisionRefineSubResultView", "CalabashRootView"], ["GachaScanView", "DrawMainView"], ["RogueAttributeDetailView", "WeeklyRogueInfo"], ["PhantomManageConfigView", "CalabashRootView"], ["SurvivorsAttributeDetailView", "SurvivorsHandbookView"]]);
//# sourceMappingURL=UiViewInfo.js.map