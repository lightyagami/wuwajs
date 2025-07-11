"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAudioVolumeInfo = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class EventVolumeInfo {
  constructor(o, e, t) {
    this.Volume = -1;
    this.Handle = 0;
    this.Event = "";
    this.Owner = undefined;
    this.Handle = o;
    this.Event = e;
    this.Owner = t;
  }
  OnChangeVolume(o, e) {
    if (this.Owner?.IsValid() && this.Volume !== o && (this.Volume = o, AudioSystem_1.AudioSystem.SetRtpcValue("role_skill_music_volume", o, {
      Actor: this.Owner,
      TransitionDuration: 2000,
      TransitionFadeCurve: 5
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 更新RTPC设置", ["EntityId", e.EntityId], ["RoleId", e.RoleId], ["Dist", Math.sqrt(e.GetDistSquared())], ["Volume", o]);
    }
  }
}
class RoleVolumeInfo {
  constructor(o, e) {
    this.qpi = RoleAudioVolumeInfo.MaxDistanceSquared;
    this.AWc = new Map();
    this.IsCurrentRole = false;
    this.RoleId = 0;
    this.EntityId = 0;
    this.Time = 0;
    this.Priority = 0;
    this.RoleId = o;
    this.EntityId = e;
    this.Time = Time_1.Time.Now;
  }
  GetDistSquared() {
    return this.qpi;
  }
  UpdateDistSquared(o) {
    this.qpi = Math.min(o, RoleAudioVolumeInfo.MaxDistanceSquared);
    if (this.qpi === RoleAudioVolumeInfo.MaxDistanceSquared) {
      this.Priority = 0;
    } else {
      this.Priority = this.qpi < RoleAudioVolumeInfo.SplitDistanceSquared ? 2 : 1;
    }
  }
  AddEvent(o, e) {
    this.AWc.set(o, e);
  }
  RemoveEvent(o) {
    this.AWc.delete(o);
  }
  SetPlayEvent(o) {
    if (o) {
      this.Time = Time_1.Time.Now;
    }
    this.IsCurrentRole = o;
    this.PWc(o ? 1 : 0);
  }
  Empty() {
    return this.AWc.size === 0;
  }
  PWc(o) {
    for (const e of this.AWc) {
      e[1].OnChangeVolume(o, this);
    }
  }
}
RoleVolumeInfo.Compare = (e, t) => {
  if (e.Priority === t.Priority) {
    switch (e.Priority) {
      case 2:
        {
          let o = t.Time - e.Time;
          if (o === 0) {
            o--;
          }
          return o;
        }
      case 1:
        {
          if (e.IsCurrentRole) {
            return e.GetDistSquared() * RoleAudioVolumeInfo.CorrectionRatio - t.GetDistSquared();
          }
          if (t.IsCurrentRole) {
            return e.GetDistSquared() - t.GetDistSquared() * RoleAudioVolumeInfo.CorrectionRatio;
          }
          let o = e.GetDistSquared() - t.GetDistSquared();
          if (o === 0) {
            o--;
          }
          return o;
        }
    }
  }
  let o = t.Priority - e.Priority;
  if (o === 0) {
    o--;
  }
  return o;
};
class RoleVolumeMapInfo {
  constructor() {
    this.TeamEntityIdList = [];
    this.RoleVolumeMap = new Map();
    this.CurrentPlayEntityId = 0;
    this.LastPlayEntityId = -1;
    this.xWc = new PriorityQueue_1.PriorityQueue(RoleVolumeInfo.Compare);
  }
  OnUpdateTeam() {
    this.MaintainCurrentList();
    this.MaintainMapData();
    this.LastPlayEntityId = -1;
  }
  UpdateVolume() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!this.Empty() && e) {
      let o = 0;
      var t = [];
      for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
        var i;
        var n;
        var s = r.Entity?.GetComponent(3);
        if (s && (i = s.Entity.Id, this.RoleVolumeMap.has(i))) {
          (n = this.RoleVolumeMap.get(i)).UpdateDistSquared(Vector_1.Vector.DistSquared(e.ActorLocationProxy, s.ActorLocationProxy));
          if (o < n.Priority) {
            o = n.Priority;
            t.length = 0;
            t.push(i);
          } else if (o === n.Priority) {
            t.push(i);
          }
        }
      }
      if (t.length === 0 || o === 0) {
        this.CurrentPlayEntityId = 0;
      } else if (t.length === 1) {
        this.CurrentPlayEntityId = t[0];
      } else if (t.length > 1) {
        this.xWc.Clear();
        for (const l of t) {
          this.xWc.Push(this.RoleVolumeMap.get(l));
        }
        this.CurrentPlayEntityId = this.xWc.Top?.EntityId ?? 0;
      }
      if (this.LastPlayEntityId !== this.CurrentPlayEntityId) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 当前优先播放角色切换", ["优先实体ID", this.CurrentPlayEntityId], ["优先范围", o === 2 ? "内圈" : "外圈"], ["有音乐的角色数量", t.length]);
        }
        for (const u of this.RoleVolumeMap) {
          this.LastPlayEntityId = this.CurrentPlayEntityId;
          u[1].SetPlayEvent(u[0] === this.CurrentPlayEntityId);
        }
      }
    }
  }
  MaintainCurrentList() {
    this.TeamEntityIdList.length = 0;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      var o = e.Entity?.GetComponent(3);
      if (o) {
        this.TeamEntityIdList.push(o.Entity.Id);
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 维护当前队伍实体ID列表", ["TeamEntityIdList", this.TeamEntityIdList]);
    }
  }
  MaintainMapData() {
    if (this.RoleVolumeMap.size) {
      var o = [];
      for (const e of this.RoleVolumeMap.keys()) {
        if (!this.TeamEntityIdList.includes(e)) {
          o.push(e);
        }
      }
      for (const t of o) {
        this.RoleVolumeMap.delete(t);
      }
    }
  }
  AddEvent(o, e, t, i, n) {
    i = new EventVolumeInfo(t, i, n);
    this.UWc(o, e).AddEvent(t, i);
    this.UpdateVolume();
  }
  RemoveEvent(o, e) {
    this.RoleVolumeMap.get(o)?.RemoveEvent(e);
    if (this.RoleVolumeMap.get(o)?.Empty()) {
      TimerSystem_1.TimerSystem.Delay(() => {
        if (this.RoleVolumeMap?.has(o)) {
          if (this.RoleVolumeMap.get(o)?.Empty()) {
            this.RoleVolumeMap.delete(o);
            if (this.CurrentPlayEntityId === o) {
              this.LastPlayEntityId = -1;
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 音乐播放完成，移除Map数据", ["EntityId", o]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 音乐播放完成，在保护时间内又新增了音乐播放，不移除Map数据", ["EntityId", o]);
          }
        }
      }, RoleAudioVolumeInfo.DelayTime);
    }
  }
  UWc(o, e) {
    if (!this.RoleVolumeMap.has(o)) {
      this.RoleVolumeMap.set(o, new RoleVolumeInfo(e, o));
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 初始化RoleVolumeInfo", ["roleId", e], ["entityId", o]);
      }
    }
    return this.RoleVolumeMap.get(o);
  }
  Empty() {
    if (this.RoleVolumeMap.size) {
      for (const o of this.RoleVolumeMap) {
        if (!o[1].Empty()) {
          return false;
        }
      }
    }
    return true;
  }
}
class RoleAudioVolumeInfo {
  constructor() {
    this.DWc = new RoleVolumeMapInfo();
    this.dLe = () => {
      this.DWc.OnUpdateTeam();
    };
  }
  Init() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig("BgmMaxDistance");
    RoleAudioVolumeInfo.MaxDistanceSquared = o * o;
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("BgmSplitDistance");
    RoleAudioVolumeInfo.SplitDistanceSquared = e * e;
    RoleAudioVolumeInfo.DelayTime = CommonParamById_1.configCommonParamById.GetIntConfig("BgmDelayTime");
    RoleAudioVolumeInfo.CorrectionRatio = CommonParamById_1.configCommonParamById.GetFloatConfig("BgmCorrectionRatio");
    var t = CommonParamById_1.configCommonParamById.GetStringArrayConfig("BgmCheckEventList");
    if (t && t.length > 0) {
      for (const i of t) {
        RoleAudioVolumeInfo.CheckEventList.push(i);
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 初始化", ["BgmMaxDistance", o], ["BgmSplitDistance", e], ["BgmDelayTime", RoleAudioVolumeInfo.DelayTime], ["BgmCorrectionRatio", RoleAudioVolumeInfo.CorrectionRatio], ["BgmCheckEventList", RoleAudioVolumeInfo.CheckEventList]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
  }
  Clear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
  }
  Update() {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      this.DWc.UpdateVolume();
    }
  }
  PostEvent(o, t, e) {
    e = ControllerHolder_1.ControllerHolder.GameAudioController.GetAkComponent(o, e);
    if (!e?.IsValid()) {
      return 0;
    }
    let i = false;
    let n = 0;
    if (RoleAudioVolumeInfo.CheckEventList.includes(t) && o.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      const r = o.EntityId;
      var s = o.CharacterActorComponent.CreatureData.GetPbDataId();
      const l = RoleAudioVolumeInfo.GetRoleId(s);
      if (!ModelManager_1.ModelManager.RoleModel?.GetRoleBackgroundMusicEnabled(l)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 该角色设置了BGM静音", ["EntityId", r], ["RoleId", l], ["Event", t]);
        }
        return 0;
      }
      if (l && (n = AudioSystem_1.AudioSystem.PostEvent(t, e, {
        CallbackMask: 1,
        CallbackHandler: (o, e) => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 音乐播放完成回调", ["EntityId", r], ["RoleId", l], ["Handle", n], ["Event", t]);
          }
          this.DWc.RemoveEvent(r, n);
        }
      }), this.DWc.AddEvent(r, l, n, t, o), i = true, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudioVolumeInfo] 开始播放具有音量调节的音乐", ["EntityId", r], ["RoleId", l], ["Handle", n], ["Event", t]);
      }
    }
    return n = i ? n : AudioSystem_1.AudioSystem.PostEvent(t, e);
  }
  RemoveEvent(o, e) {
    if (o.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      o = o.EntityId;
      this.DWc.RemoveEvent(o, e);
    }
  }
  static GetRoleId(o) {
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
    if (e && e.RoleType === 1) {
      return o;
    } else {
      return 0;
    }
  }
}
(exports.RoleAudioVolumeInfo = RoleAudioVolumeInfo).MaxDistanceSquared = 0;
RoleAudioVolumeInfo.SplitDistanceSquared = 0;
RoleAudioVolumeInfo.DelayTime = 0;
RoleAudioVolumeInfo.CorrectionRatio = 0;
RoleAudioVolumeInfo.CheckEventList = []; //# sourceMappingURL=RoleAudioVolumeInfo.js.map