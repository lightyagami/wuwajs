"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemoryModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const FragmentMemoryData_1 = require("./FragmentMemoryData");
class FragmentMemoryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ActivitySubViewTryPlayAnimation = "";
    this.MemoryFragmentMainViewTryPlayAnimation = "";
    this.awn = new Map();
    this.CurrentTrackMapMarkId = 0;
    this.CurrentTrackFragmentId = 0;
    this.hwn = new Map();
    this.CurrentUnlockCollectId = 0;
  }
  OnPhotoMemoryResponse(e) {
    this.lwn(e.FBs);
  }
  OnPhotoMemoryUpdate(e) {
    this._Ya(e.FBs);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFragmentMemoryDataUpdate);
  }
  TryRemoveCurrentTrackEntity() {
    if (this.CurrentTrackMapMarkId !== 0) {
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(7, this.CurrentTrackMapMarkId);
      this.CurrentTrackMapMarkId = 0;
    }
  }
  _Ya(e) {
    for (const r of e) {
      var t = r.s5n;
      var o = this.hwn.get(t);
      if (o) {
        o.Phrase(r);
      } else {
        o = this._wn(r);
        this.hwn.set(t, o);
      }
      var o = this.hwn.get(t).GetCollectDataList();
      for (const n of o) {
        this.awn.set(n.GetId(), n);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardEntranceRedDot);
  }
  lwn(e) {
    this.hwn.clear();
    this.awn.clear();
    for (const o of e) {
      var t = this._wn(o);
      this.hwn.set(o.s5n, t);
      var t = t.GetCollectDataList();
      for (const r of t) {
        this.awn.set(r.GetId(), r);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardEntranceRedDot);
  }
  GetCollectedIds() {
    var e;
    var t = [];
    for ([, e] of this.hwn) {
      for (const o of e.GetCollectDataList()) {
        if (o.GetIfUnlock()) {
          t.push(o.GetId());
        }
      }
    }
    return t;
  }
  GetAllFragmentTopic() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetAllPhotoMemoryTopic();
  }
  GetTopicUnlockState(e) {
    return this.GetTopicDataById(e) !== undefined;
  }
  GetUnlockConditionText(e) {
    e = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(e).ConditionGroupId;
    return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ?? "";
  }
  OnPhotoMemoryCollectUpdate(e) {
    var t = e.VBs.s5n;
    let o = this.awn.get(t);
    if (!o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FragmentMemory", 27, "记忆历程数据刷新时找不到数据", ["id", t]);
      }
      o = new FragmentMemoryData_1.FragmentMemoryCollectData();
    }
    o.Phrase(e.VBs);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate);
  }
  _wn(e) {
    var t = new FragmentMemoryData_1.FragmentMemoryTopicData();
    t.Phrase(e);
    return t;
  }
  GetCollectDataById(e) {
    e = this.awn.get(e);
    if (e) {
      return e;
    }
  }
  GetTopicDataById(e) {
    e = this.hwn.get(e);
    if (e && e.GetUnlockState()) {
      return e;
    }
  }
  GetRedDotState() {
    var e = this.GetAllFragmentTopic();
    return e.length !== 0 && (e = e[e.length - 1].Id, this.hwn.get(e)?.GetRedDotState() ?? false);
  }
  GetTopicFirstOpenRedDotState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened, undefined);
    return !t || !t.includes(e);
  }
  GetCurrentActivityFragmentMemoryRedDotState() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_PhotoMemoryActivity);
    if (e && e.length > 0) {
      for (const t of e) {
        if (t.EntranceRedDot()) {
          return true;
        }
      }
    }
    return false;
  }
  SaveTopicOpened(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened, undefined);
    if (!(t = t || []).includes(e)) {
      t.push(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardTopicRedDot, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardEntranceRedDot);
    }
  }
}
exports.FragmentMemoryModel = FragmentMemoryModel;
//# sourceMappingURL=FragmentMemoryModel.js.map