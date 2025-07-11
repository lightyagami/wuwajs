"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkBossInstanceData = exports.DreamLinkRewardData = exports.DreamLinkRunTaskData = exports.signStateResolver = exports.WORLD_RUN_ENDING_ID = exports.BOSS_INST_ROLE_COUNT = exports.CHANGE_STATE_FINISH_COUNT = undefined;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const DreamLinkController_1 = require("./DreamLinkController");
exports.CHANGE_STATE_FINISH_COUNT = 3;
exports.BOSS_INST_ROLE_COUNT = 3;
exports.WORLD_RUN_ENDING_ID = 3020;
exports.signStateResolver = {
  [Protocol_1.Aki.Protocol.zps.Z6n]: 1,
  [Protocol_1.Aki.Protocol.zps.CMs]: 0,
  [Protocol_1.Aki.Protocol.zps.ovs]: 2
};
class DreamLinkRunTaskData {
  constructor(e) {
    this.Id = e;
    this.Status = 1;
    this.ConditionGroupId = 0;
    this.TitleTextId = "";
    this.RewardList = [];
    this.UnlockTime = 0;
    this.MarkId = 0;
    this.PlayTime = -1;
  }
  GetLockTxt() {
    let e = "";
    var t;
    if (this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime()) {
      if (this.ConditionGroupId) {
        t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ConditionGroupId) ?? "";
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      }
    } else {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DreamLinkWorldRunLockText") ?? "";
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.UnlockTime, t);
    }
    return e;
  }
  IsTimeLock() {
    return this.UnlockTime > TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetRewardData() {
    var e = [];
    for (const r of this.RewardList) {
      var t = {
        Item: r,
        HasClaimed: this.Status === 3
      };
      e.push(t);
    }
    return e;
  }
  JumpDelegate() {
    ModelManager_1.ModelManager.MapModel.CreateTempMapMark(this.MarkId);
    var e = {
      MarkId: this.MarkId,
      MarkType: 27
    };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(1, false, e);
  }
  ReceiveDelegate() {
    DreamLinkController_1.DreamLinkController.RunTaskRewardRequest(this.Id);
  }
}
exports.DreamLinkRunTaskData = DreamLinkRunTaskData;
class DreamLinkRewardData {
  constructor(e) {
    this.Id = e;
    this.Status = 1;
    this.Current = 0;
    this.Target = 1;
  }
}
exports.DreamLinkRewardData = DreamLinkRewardData;
class DreamLinkBossInstanceData {
  constructor(e, t, r) {
    this.TypeId = e;
    this.InstId = t;
    this.ConditionGroupId = r;
    this.Score = 0;
    this.IsUnlock = false;
    this.UnlockTime = 0;
    this.IsFinished = false;
    this.Lml = [0, 0, 0];
  }
  GetUnlockText() {
    let e = "";
    var t;
    if (this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime()) {
      if (this.ConditionGroupId) {
        t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ConditionGroupId) ?? "";
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? "";
      }
    } else {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DaMaoUnLockTime") ?? "";
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.UnlockTime, t);
    }
    return e;
  }
  GetTickState() {
    return !this.IsUnlock && !(this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime());
  }
  SetBossRoleIdByIndex(e, t) {
    this.Lml[e] = t;
  }
  GetBossRoleIdByIndex(e) {
    return this.Lml[e];
  }
  GetBossRoleIdList() {
    return this.Lml;
  }
}
exports.DreamLinkBossInstanceData = DreamLinkBossInstanceData;
//# sourceMappingURL=DreamLinkDefine.js.map