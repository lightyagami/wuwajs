"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourActivityData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../../ActivityData");
const MotorParkourLevelData_1 = require("./MotorParkourLevelData");
class MotorParkourActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.NTf = new Map();
    this.dQa = [];
  }
  OnInit(t) {
    this.VTf();
  }
  PhraseEx(t) {
    t = t.STf;
    if (t) {
      this.UpdateMotorParkourLevelList(t.MTf);
    }
  }
  GetExDataRedPointShowState() {
    for (const t of this.dQa) {
      if (t.HasLevelRedDot || t.HasRewardRedDot) {
        return true;
      }
    }
    return false;
  }
  GetExDataFinishShowState() {
    for (const t of this.dQa) {
      if (!t.IsFinished) {
        return false;
      }
    }
    return true;
  }
  VTf() {
    for (const e of ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourLevelByActivityId(this.Id)) {
      var t = new MotorParkourLevelData_1.MotorParkourLevelData(e);
      this.NTf.set(e.Id, t);
      this.dQa.push(t);
    }
    this.dQa.sort((t, e) => t.Id - e.Id);
    for (let t = 1; t < this.dQa.length; t++) {
      this.dQa[t].PreMotorParkourLevelData = this.dQa[t - 1];
    }
  }
  UpdateMotorParkourLevelList(t) {
    for (const r of t) {
      var e = r.ETf;
      var e = this.NTf.get(e);
      if (!e) {
        return;
      }
      e.UpdateTaskStatus(r.ITf);
      e.UnlockTime = MathUtils_1.MathUtils.LongToNumber(r.yzs);
      e.BestRecordTime = r.TTf;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  UpdateMotorParkourLevelBestRecordTime(t, e) {
    t = this.GetLevelDataById(t);
    return (e <= t.BestRecordTime || t.BestRecordTime === 0) && (t.BestRecordTime = e, true);
  }
  GetSelectedLevelData() {
    let e = -1;
    let r = -1;
    for (let t = 0; t < this.dQa.length; t++) {
      var i = this.dQa[t];
      if (i.HasRewardRedDot) {
        return i;
      }
      if (i.IsUnLock && !i.IsPass && e === -1) {
        e = t;
      }
      if (!i.IsUnLock && r === -1) {
        r = t;
      }
    }
    if (e !== -1) {
      return this.dQa[e];
    } else if (r > 0) {
      return this.dQa[r - 1];
    } else {
      return this.dQa[this.dQa.length - 1];
    }
  }
  GetSelectedLevelDataInRewardView() {
    let e = -1;
    for (let t = 0; t < this.dQa.length; t++) {
      var r = this.dQa[t];
      if (r.HasRewardRedDot) {
        return r;
      }
      if (e === -1 && !r.IsFinished) {
        e = t;
      }
    }
    if (e !== -1) {
      return this.dQa[e];
    } else {
      return this.dQa[0];
    }
  }
  RewardHasRedDot() {
    for (const t of this.dQa) {
      if (t.HasRewardRedDot) {
        return true;
      }
    }
    return false;
  }
  GetLevelDataList() {
    return this.dQa;
  }
  GetLevelDataById(t) {
    var e = this.NTf.get(t);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "获取摩托跑酷关卡数据失败，关卡不存在", ["levelId", t]);
    }
  }
  GetAllTaskNum() {
    let t = 0;
    for (const e of this.dQa) {
      t += e.AllTaskNum;
    }
    return t;
  }
  GetFinishedTaskNum() {
    let t = 0;
    for (const e of this.dQa) {
      t += e.FinishedTaskNum;
    }
    return t;
  }
}
exports.MotorParkourActivityData = MotorParkourActivityData;
//# sourceMappingURL=MotorParkourActivityData.js.map