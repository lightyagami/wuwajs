"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMapExploreData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityMapExploreData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ETt = 3;
    this.TaskList = [];
  }
  GetExDataRedPointShowState() {
    return !!this.IsFirstUnlockState(1) || this.IsCanGetReward();
  }
  GetExDataFinishShowState() {
    return !this.TaskList.some(t => !t.IsComplete);
  }
  IsCanGetReward() {
    return this.TaskList.some(t => t.IsCanGet);
  }
  soc() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ExploreActivityFirstUnlock, 0) ?? 0;
  }
  SetFirstUnlockState(t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ExploreActivityFirstUnlock, t);
  }
  IsFirstUnlockState(t) {
    return this.soc() === t;
  }
  PhraseEx(t) {
    this.TaskList.length = 0;
    var e = t.ltc;
    if (e) {
      for (const r of ConfigManager_1.ConfigManager.ActivityMapExploreConfig.GetExploreTaskList(t.s5n)) {
        var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(r.DropId);
        const a = [];
        o?.DropPreview.forEach((t, e) => {
          a.push([e, t]);
        });
        this.TaskList.push({
          TaskId: r.TaskId,
          RewardDesc: r.Desc,
          RewardItemId: a[0][0] ?? this.ETt,
          RewardItemCount: a[0][1],
          IsComplete: false,
          IsCanGet: false,
          IsRunning: true
        });
      }
      if (this.IsFirstUnlockState(0) && this.CanPreOpen()) {
        this.SetFirstUnlockState(1);
      }
      this.UpdateTaskState(e.E$s);
    }
  }
  UpdateTaskState(t) {
    if (t) {
      for (const o of this.TaskList) {
        var e = t[o.TaskId.toString()];
        if (e) {
          o.IsComplete = e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
          o.IsCanGet = e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
          o.IsRunning = !o.IsComplete && !o.IsCanGet;
        }
      }
      this.aoc();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityMapExploreStateUpdate);
    }
  }
  aoc() {
    this.TaskList.sort((t, e) => t.IsCanGet !== e.IsCanGet ? t.IsCanGet ? -1 : 1 : t.IsRunning !== e.IsRunning ? t.IsRunning ? -1 : 1 : t.TaskId - e.TaskId);
  }
}
exports.ActivityMapExploreData = ActivityMapExploreData;
//# sourceMappingURL=ActivityMapExploreData.js.map