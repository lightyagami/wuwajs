"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildQuestNodeBase = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class ChildQuestNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(t) {
    super(t);
    this.ChildQuestType = IQuest_1.EChildQuest.CheckEntityState;
    this.CustomTrackIconId = 0;
    this.Submitting = false;
    this.ChildQuestStatus = undefined;
    this.ModifyTrackAreaTextConfig = undefined;
    this.NodeType = "ChildQuest";
  }
  get CanGiveUp() {
    return this.ChildQuestStatus === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress;
  }
  get InProgress() {
    return this.ChildQuestStatus === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress;
  }
  get IsFinished() {
    return this.ChildQuestStatus === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished;
  }
  Init(t, e, i, s, h) {
    if (s.Type === "ChildQuest" && (super.Init(t, e, i, s, h), this.ChildQuestStatus = Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive, this.CustomTrackIconId = s.CustomIcon ?? 0, i.nEs)) {
      this.UpdateChildQuestStatus(i.nEs.H6n, e);
      this.UpdateProgress(i.nEs.nvs);
    }
  }
  UpdateChildQuestStatus(t, e) {
    var i = this.ChildQuestStatus;
    this.ChildQuestStatus = t;
    if (i !== this.ChildQuestStatus) {
      switch (t) {
        case Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress:
          this.il(e);
          break;
        case Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished:
          this.$ne();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.Context, i, this.ChildQuestStatus, e);
      EventSystem_1.EventSystem.EmitWithTarget(this.Blackboard, EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.Context, i, this.ChildQuestStatus, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, this.Context, i, this.ChildQuestStatus);
    }
  }
  OnNodeActive() {
    this.AddTag(0, this.NodeId.toString());
    if (this.ModifyTrackAreaTextConfig) {
      this.Blackboard?.AddModifyTrackAreaConfig(this.NodeId, this.ModifyTrackAreaTextConfig);
    }
  }
  il(t) {
    this.AddEventsOnChildQuestStart();
    this.OnStart(t);
  }
  $ne() {
    this.wXt(true);
  }
  OnNodeDeActive(t) {
    this.RemoveTag(0, this.NodeId.toString());
    if (!t) {
      this.wXt(false);
      this.ChildQuestStatus = Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive;
    }
    if (this.ModifyTrackAreaTextConfig) {
      this.Blackboard?.RemoveModifyTrackAreaConfig(this.NodeId);
    }
  }
  wXt(t) {
    this.RemoveEventsOnChildQuestEnd();
    this.OnEnd(t);
  }
  OnCreate(t) {
    this.ChildQuestType = t.Condition.Type;
    if (t.HideTip) {
      this.AddTag(2);
    }
    if (t.HideUiExceptTaskList) {
      this.AddTag(1);
      this.AddTag(2);
    }
    if (t.HideUi) {
      this.AddTag(1);
      this.AddTag(2);
      this.AddTag(3);
    }
    if (t.ShowNavigation) {
      this.AddTag(4);
      this.NavigationStyle = t.NavigationStyle ?? 0;
    }
    if (t.AlwaysShowNavigation) {
      this.AddTag(5);
    }
    this.TrackTarget = t.TrackTarget;
    this.TrackTextConfig = t.TidTip;
    this.MultiTrackText = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.TrackTextConfig);
    this.ModifyTrackAreaTextConfig = t.ModifyTrackAreaText;
    this.ShowTipBeforeEnterActions = t.ShowTipBeforeEnterActions ?? false;
    return true;
  }
  OnStart(t) {}
  OnEnd(t) {}
  AddEventsOnChildQuestStart() {}
  RemoveEventsOnChildQuestEnd() {}
  SubmitNode(t) {
    if (!this.Blackboard.ContainTag(6) && !this.Submitting && !this.Blackboard.IsSuspend()) {
      if (this.CheckCanSubmitAboutFocusMode()) {
        this.OnBeforeSubmit();
        ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestSubmitNode(this.Context, t => {
          this.OnAfterSubmit(t);
        }, t);
      } else {
        this.BecauseOfFocusModeNoSubmit();
      }
    }
  }
  OnBeforeSubmit() {
    this.Submitting = true;
  }
  OnAfterSubmit(t) {
    this.Submitting = false;
  }
  CheckCanSubmitAboutFocusMode() {
    return true;
  }
  BecauseOfFocusModeNoSubmit() {}
  GetCorrelativeEntities() {
    return this.CorrelativeEntities;
  }
}
exports.ChildQuestNodeBase = ChildQuestNodeBase;
//# sourceMappingURL=ChildQuestNodeBase.js.map