"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25ProtocolContext = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityData_1 = require("../../../ActivityData");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
class Spring25ProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(t) {
    super();
    this.i5l = undefined;
    this.IsSkinRewarded = false;
    this.CanInvite = false;
    this.QGl = new Map();
    this.KGl = new Set();
    this.i5l = t;
  }
  Dispose() {
    this.CanInvite = false;
    this.QGl.clear();
    this.KGl.clear();
  }
  PhraseEx(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Spring25", 64, "解析春节活动数据", ["ActivityData", t]);
    }
    t = t.QS_;
    if (t) {
      this.ZVa(t);
      if (!UiManager_1.UiManager.IsViewShow("Spring25DialogueView") && !UiManager_1.UiManager.IsViewShow("Spring25EnvelopeView")) {
        this.i5l.ResetCurrentSignId();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25ActivityParseDone);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetExDataRedPointShowState() {
    return this.i5l.HasRedDot;
  }
  get SignCountRemain() {
    if (this.CanInvite) {
      return 1;
    } else {
      return 0;
    }
  }
  get FinishTaskCount() {
    let t = 0;
    for (var [, e] of this.QGl) {
      if (e.H6n > Proto_ActivityTaskState.Proto_ActivityTaskRunning) {
        ++t;
      }
    }
    return t;
  }
  get InvitedCount() {
    return this.KGl.size;
  }
  get TaskCache() {
    return this.QGl;
  }
  get InvitedRoleSet() {
    return this.KGl;
  }
  get HasAnyReward() {
    for (var [, t] of this.QGl) {
      if (t.H6n === Proto_ActivityTaskState.Proto_ActivityTaskFinish) {
        return true;
      }
    }
    return this.i5l.IsAllInvited && !this.IsSkinRewarded;
  }
  get IsInviteAvailable() {
    return this.CanInvite;
  }
  GetTaskCurrentByTaskId(t) {
    return this.QGl.get(t)?.lMs ?? 0;
  }
  GetTaskTargetByTaskId(t) {
    return this.QGl.get(t)?.j6n ?? 0;
  }
  GetTaskStateByTaskId(t) {
    return this.QGl.get(t)?.H6n ?? Proto_ActivityTaskState.Proto_ActivityTaskRunning;
  }
  GetTaskRewardPreviewByTaskId(t) {
    var e = [];
    var t = this.QGl.get(t);
    if (t !== undefined) {
      var i = t.IE_;
      for (const s of Object.keys(i)) {
        var r = [{
          IncId: 0,
          ItemId: Number.parseInt(s)
        }, i[s]];
        e.push(r);
      }
    }
    return e;
  }
  IsRoleInvitedById(t) {
    return this.KGl.has(t);
  }
  ZVa(t) {
    this.CanInvite = t.wM_;
    this.QGl.clear();
    for (const e of t.LM_) {
      this.QGl.set(e.s5n, e);
    }
    this.KGl.clear();
    for (const i of t.RM_) {
      this.KGl.add(i);
    }
    this.IsSkinRewarded = t.AM_;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Spring25", 64, "解析春节活动数据的结果", ["TaskCacheInternal", this.QGl], ["InvitedRoleSetInternal", this.KGl], ["IsSkinRewarded", this.IsSkinRewarded], ["CanInvite", this.CanInvite]);
    }
  }
  SyncTaskStateByTaskId(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Spring25", 64, "同步邀请角色奖励", ["rewarded id", t]);
    }
    t = this.TaskCache.get(t);
    if (t !== undefined) {
      t.lMs++;
      t.H6n = Proto_ActivityTaskState.Proto_ActivityTaskTaken;
    }
  }
  SyncSkinReward() {
    this.IsSkinRewarded = true;
  }
}
exports.Spring25ProtocolContext = Spring25ProtocolContext;
//# sourceMappingURL=Spring25ProtocolContext.js.map