"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const GuideFromMontageByEventGroupId_1 = require("../../Core/Define/ConfigQuery/GuideFromMontageByEventGroupId");
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const LevelGeneralContextDefine_1 = require("../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyTriggerGuide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.EventGroupId = 0;
  }
  Constructor() {}
  K2_Notify(e, r) {
    var o = this.ParseEventGroupId2GuideGroupId(this.EventGroupId);
    var t = [{
      Name: "GuideTrigger",
      Params: {
        Type: IAction_1.EGuideTriggerType.BeginnerGuide,
        GuideId: o
      }
    }];
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t, LevelGeneralContextDefine_1.EntityContext.Create());
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Guide", 64, "由蒙太奇触发的引导", ["EventGroupId", this.EventGroupId], ["GuideGroupId", o]);
    }
    return true;
  }
  GetNotifyName() {
    return "执行行为组事件";
  }
  ParseEventGroupId2GuideGroupId(e) {
    return GuideFromMontageByEventGroupId_1.configGuideFromMontageByEventGroupId.GetConfig(e)?.GuideGroupId ?? 0;
  }
}
exports.default = TsAnimNotifyTriggerGuide;
//# sourceMappingURL=TsAnimNotifyTriggerGuide.js.map