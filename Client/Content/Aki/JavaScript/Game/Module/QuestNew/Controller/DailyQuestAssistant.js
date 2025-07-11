"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyQuestAssistant = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
class DailyQuestAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.Hoo = false;
    this.FWe = () => {
      if (ModelManager_1.ModelManager.LoginModel.GetTodayFirstTimeLogin() && !this.Hoo) {
        var e;
        this.Hoo = true;
        for (const n of ModelManager_1.ModelManager.DailyTaskModel.GetDailyTaskCorrelativeEntities()) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
          if (this.joo(t)) {
            return;
          }
        }
        for ([, e] of ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest()) {
          var r = e.GetCurrentActiveChildQuestNode();
          if (r) {
            ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(e.TreeId, r.NodeId);
          }
        }
      }
    };
    this.Woo = (e, t, r) => {
      var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (n && n.Type === 4 && (n.OnlineType !== "SingleHangUpOnline" || !ModelManager_1.ModelManager.GameModeModel.IsMulti)) {
        switch (r) {
          case 0:
            if (n.IsRangeTrack(t)) {
              n.StartTextExpress(1);
            } else {
              this.Koo(n);
            }
            this.Qoo(n);
            n.TriggerQuestTips = true;
            break;
          case 1:
            if (n.IsRangeTrack(t)) {
              n.EndTextExpress(1);
            }
        }
      }
    };
    this.Xoo = e => {
      if (e.Type === 4) {
        ModelManager_1.ModelManager.DailyTaskModel.AddDailyQuest(e);
      }
    };
    this.DSe = (e, t) => {
      switch (t) {
        case Protocol_1.Aki.Protocol.hTs.a3_:
        case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
          ModelManager_1.ModelManager.DailyTaskModel.RemoveDailyQuest(e);
      }
    };
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange, this.Woo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange, this.Woo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  joo(e) {
    return !!e && !!(e = e.Entity.GetComponent(1)) && Vector_1.Vector.Distance(e.ActorLocationProxy, GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()) < CommonParamById_1.configCommonParamById.GetIntConfig("dailyquest_trackinfo_mini");
  }
  Qoo(e) {
    var t;
    if (e && e.Type === 4 && !e.TriggerQuestTips) {
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id);
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TriggerMission");
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(6, undefined, undefined, [e], [t]);
    }
  }
  Koo(e) {
    if (e && e.Type === 4 && !e.TriggerQuestTips) {
      ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(e.TreeId, e.GetCurrentActiveChildQuestNode().NodeId);
    }
  }
  CreateMarksOnWakeUp() {
    var e = ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest();
    if (e) {
      for (var [, t] of e) {
        t.CreateMapMarks();
      }
    }
  }
}
exports.DailyQuestAssistant = DailyQuestAssistant;
//# sourceMappingURL=DailyQuestAssistant.js.map