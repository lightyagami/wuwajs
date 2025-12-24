"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideConfig = exports.inputControllerType2IndexInConfig = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const GuideDungeonSetDefineByStrId_1 = require("../../../Core/Define/ConfigQuery/GuideDungeonSetDefineByStrId");
const GuideFocusNewByGuideId_1 = require("../../../Core/Define/ConfigQuery/GuideFocusNewByGuideId");
const GuideGroupAll_1 = require("../../../Core/Define/ConfigQuery/GuideGroupAll");
const GuideGroupById_1 = require("../../../Core/Define/ConfigQuery/GuideGroupById");
const GuideStepById_1 = require("../../../Core/Define/ConfigQuery/GuideStepById");
const GuideTipsByGuideId_1 = require("../../../Core/Define/ConfigQuery/GuideTipsByGuideId");
const GuideTutorialAll_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialAll");
const GuideTutorialById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialById");
const GuideTutorialPageById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialPageById");
const MultiPlatformGuideStepById_1 = require("../../../Core/Define/ConfigQuery/MultiPlatformGuideStepById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
exports.inputControllerType2IndexInConfig = new Map([[1, 0], [2, 1], [3, 2]]);
class GuideConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.fJt = new UE.VectorDouble(0, 0, 0);
  }
  OnInit() {
    return true;
  }
  GetAllTutorial() {
    return GuideTutorialAll_1.configGuideTutorialAll.GetConfigList();
  }
  GetStep(e) {
    return GuideStepById_1.configGuideStepById.GetConfig(e);
  }
  GetGuideTutorialPage(e) {
    return GuideTutorialPageById_1.configGuideTutorialPageById.GetConfig(e);
  }
  GetGuideTutorialPageIds(e) {
    var e = this.GetGuideTutorial(e);
    var r = e.PageReplaceConditionGroupId;
    if (r > 0 && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(r.toString(), undefined)) {
      return e.ReplacePageId;
    } else {
      return e.PageId;
    }
  }
  GetGuideTutorial(e) {
    return GuideTutorialById_1.configGuideTutorialById.GetConfig(e);
  }
  GetGuideFocus(e) {
    return GuideFocusNewByGuideId_1.configGuideFocusNewByGuideId.GetConfig(e);
  }
  GetGuideTips(e) {
    return GuideTipsByGuideId_1.configGuideTipsByGuideId.GetConfig(e);
  }
  GetGuideText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetGuideDungeonSet(e) {
    return GuideDungeonSetDefineByStrId_1.configGuideDungeonSetDefineByStrId.GetConfig(e);
  }
  GetGuideTopMiddleOffset() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("guide_top_middle_offset");
  }
  GetAllGroup() {
    return GuideGroupAll_1.configGuideGroupAll.GetConfigList();
  }
  GetGroup(e) {
    return GuideGroupById_1.configGuideGroupById.GetConfig(e);
  }
  GetOrderedStepIdsOfGroup(e, r) {
    const u = [];
    e = this.GetGroup(e);
    const i = exports.inputControllerType2IndexInConfig.get(r);
    if (i !== undefined) {
      e?.Step.forEach(e => {
        if (this.GetStep(e).Controller[i] === "T") {
          u.push(e);
        }
      });
    }
    return u;
  }
  GetMultiPlatformStepIdMapOfStep(e) {
    var e = MultiPlatformGuideStepById_1.configMultiPlatformGuideStepById.GetConfig(e);
    var r = new Map();
    r.set(1, Array.from(e?.KeyboardStepId ?? []));
    r.set(2, Array.from(e?.GamepadStepId ?? []));
    r.set(3, Array.from(e?.MobileStepId ?? []));
    return r;
  }
  GetLimitRepeatStepSetOfGroup(e) {
    const r = new Set();
    this.GetGroup(e)?.LimitRepeat.forEach(e => {
      r.add(e);
    });
    return r;
  }
  GetMultiPlatformStepIdsOfGroup(e) {
    const r = [];
    this.GetGroup(e)?.MultiPlatformStep.forEach(e => {
      r.push(e);
    });
    return r;
  }
  GetGuideFocusCenterTextPos() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GuideFocusTextOffsetY");
    this.fJt.Z = e;
    return this.fJt;
  }
}
(exports.GuideConfig = GuideConfig).GmMuteTutorial = false;
GuideConfig.TabTag = "tab";
GuideConfig.SlotTag = "slot"; //# sourceMappingURL=GuideConfig.js.map