"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialSaveData = exports.TutorialItemData = exports.TutorialUtils = exports.ETutorialType = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
var ETutorialType;
(function (t) {
  t[t.All = 0] = "All";
  t[t.QteReaction = 1] = "QteReaction";
  t[t.Enemy = 2] = "Enemy";
  t[t.System = 3] = "System";
  t[t.Adventure = 4] = "Adventure";
  t[t.BuffOnEnemy = 5] = "BuffOnEnemy";
})(ETutorialType = exports.ETutorialType ||= {});
class TutorialUtils {
  static AddSearchHighlight(t) {
    return `<color=${CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor").toLowerCase()}>${t}</color>`;
  }
  static get MaxLatestTutorial() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MaxLatestTutorial");
  }
  static GetTutorialTypeIconPath(t) {
    if (this.wRo.has(t)) {
      t = TutorialUtils.wRo.get(t);
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    }
  }
  static GetTutorialTypeTxt(t) {
    if (this.BRo.has(t)) {
      return TutorialUtils.BRo.get(t);
    }
  }
}
(exports.TutorialUtils = TutorialUtils).FixedDropDropShowPlanId = 1;
TutorialUtils.wRo = new Map([[ETutorialType.All, "SP_TutorialIconAll"], [ETutorialType.QteReaction, "SP_TutorialIconQteReaction"], [ETutorialType.Enemy, "SP_TutorialIconEnemy"], [ETutorialType.System, "SP_TutorialIconSystem"], [ETutorialType.Adventure, "SP_TutorialIconAdventure"], [ETutorialType.BuffOnEnemy, "SP_TutorialIconBuff"]]);
TutorialUtils.BRo = new Map([[ETutorialType.All, "GuideTutorialType_0"], [ETutorialType.QteReaction, "GuideTutorialType_1"], [ETutorialType.Enemy, "GuideTutorialType_2"], [ETutorialType.System, "GuideTutorialType_3"], [ETutorialType.Adventure, "GuideTutorialType_4"], [ETutorialType.BuffOnEnemy, "GuideTutorialType_5"]]);
class TutorialItemData {
  constructor() {
    this.IsTypeTitle = false;
    this.TextId = undefined;
    this.Text = undefined;
    this.SavedData = undefined;
    this.Selected = false;
    this.OwnerType = undefined;
  }
}
exports.TutorialItemData = TutorialItemData;
class TutorialSaveData {
  constructor() {
    this.TimeStamp = 0;
    this.TutorialId = 0;
    this.HasRedDot = false;
    this.vKl = undefined;
  }
  get IsExcludedFromWiki() {
    var t;
    if (this.vKl === undefined && (t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.TutorialId)?.ExcludeFromWiki) !== undefined) {
      this.vKl = t;
    }
    return this.vKl ?? false;
  }
  get TutorialData() {
    return ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.TutorialId);
  }
  GetTutorialTitle() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.TutorialData.GroupName) ?? "";
  }
}
exports.TutorialSaveData = TutorialSaveData;
//# sourceMappingURL=TutorialDefine.js.map