"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicateNode = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CommunicateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.CommunicateId = 0;
    this.BXt = false;
    this.bXt = false;
    this.qXt = e => {
      if (e === this.CommunicateId) {
        this.Blackboard.RemoveTag(7);
        this.SubmitNode();
      }
    };
    this.GXt = e => {
      if (e === this.CommunicateId) {
        this.NXt();
      }
    };
    this.OXt = (e, t) => {
      if (t === this.TreeIncId && !UiManager_1.UiManager.IsViewShow("BattleView")) {
        this.BXt = this.Blackboard.IsTracking;
      }
    };
    this.rbe = () => {
      if (this.BXt && !UiManager_1.UiManager.IsViewShow("CommunicateView")) {
        this.NXt();
        this.BXt = false;
      }
    };
    this.$Ge = e => {
      if (e === "CommunicateView" && this.ChildQuestStatus === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress && !(this.Blackboard.AddTag(7), this.bXt) && this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        this.bXt = true;
        QuestController_1.QuestNewController.RedDotRequest(this.TreeConfigId, 1);
      }
    };
    this.kXt = () => {
      UiManager_1.UiManager.CloseView("CommunicateView");
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.ReceiveTelecom && (this.CommunicateId = e.TelecomId, true);
  }
  OnStart(e) {
    super.OnStart(e);
    this.bXt = false;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommunicateFinished, this.qXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommunicateAgain, this.GXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.OXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.rbe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.kXt);
    if (this.CheckCanSubmitAboutFocusMode()) {
      this.NXt();
    }
  }
  OnEnd(e) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommunicateFinished, this.qXt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommunicateAgain, this.GXt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.OXt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.rbe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kXt);
    super.OnEnd(e);
  }
  NXt() {
    this.Blackboard.RemoveTag(7);
    UiManager_1.UiManager.OpenView("CommunicateView", this.CommunicateId);
  }
  CheckCanSubmitAboutFocusMode() {
    return this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || !ModelManager_1.ModelManager.QuestNewModel.CheckNeedBanQuestPushByFocusMode(this.TreeConfigId);
  }
  BecauseOfFocusModeNoSubmit() {
    this.BXt = this.Blackboard.IsTracking;
  }
}
exports.CommunicateNode = CommunicateNode;
//# sourceMappingURL=CommunicateNode.js.map