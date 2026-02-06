"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatMessageModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const CombatLog_1 = require("../../Utils/CombatLog");
const CombatMessageController_1 = require("./CombatMessageController");
const BUFFER_TIME_RATE = 1.05;
const TIME_BUFFER_SIZE = 20;
const TIME_OFFSET_LERP_RATE = 0.1;
const FIX_BUFFER_TIME = 0.08;
const TIME_BUFFER_CHECK_COUNT_MIN = 5;
const TIME_BUFFER_CHECK_TIME_MAX = 3;
const MAX_FLUCTUATE = 0.5;
const RECORD_UDP_MESSAGE_INTERNAL = 0.2;
const MESSAGE_ID_MASK = 60n;
class CombatMessageBuffer {
  constructor(e) {
    this.CreatureDataId = e;
    this.TimelineOffsetBase = 0;
    this.DesiredBuffer = 0;
    this.Buffer = 0;
    this.LastNotifyExecuteTime = 0;
    this.lwl = 0;
    this.yIt = new Queue_1.Queue();
  }
  get TimelineOffset() {
    return this.TimelineOffsetBase + this.Buffer;
  }
  get RemainBufferTime() {
    return this.LastNotifyExecuteTime - Time_1.Time.NowSeconds;
  }
  AddToQueue(e, t, s, i) {
    var r;
    var o;
    var a;
    if (t) {
      if (r = t?.GetComponent(56)) {
        if (e) {
          if (o = s.J8n) {
            a = t?.GetComponent(0);
            this.RecordMessageTime(o, a.GetPbDataId());
            a = o + this.TimelineOffset;
            r.AddToQueue(e, s, i, a);
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("MultiplayerCombat", 14, "[CombatMessageModel.Push]失败, messageTime非法", ["CreatureDataId", this.CreatureDataId], ["id", e], ["messageTime", o]);
            }
            CombatMessageController_1.CombatMessageController.Process(e, t, i, s);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiplayerCombat", 14, "[CombatMessageModel.Push]失败, id非法", ["CreatureDataId", this.CreatureDataId], ["id", e]);
        }
      } else {
        CombatMessageController_1.CombatMessageController.Process(e, t, i, s);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 19, "[CombatMessageModel.Push]失败, entity非法", ["CreatureDataId", this.CreatureDataId], ["id", e]);
    }
  }
  RecordMessageTime(e, t, s = false) {
    var i = Time_1.Time.NowSeconds;
    if (!s || i - this.lwl > RECORD_UDP_MESSAGE_INTERNAL) {
      this.yIt.Push([e, i]);
      if (this.yIt.Size >= TIME_BUFFER_SIZE) {
        this.yIt.Pop();
      }
      this.lwl = i;
    }
    this.IIt();
    var r = e + this.TimelineOffset;
    if (r > this.LastNotifyExecuteTime) {
      this.LastNotifyExecuteTime = r;
    }
    this.ReportMoveDataReceiveInfo(i - e, t, s);
  }
  IIt() {
    if (this.yIt.Size !== 0) {
      let e = this.yIt.Size - 1;
      var r = this.yIt.Get(e);
      let t = r[1] - r[0];
      let s = t;
      var o = r[0];
      let i = 0;
      for (; e > 0; e--) {
        i++;
        var [a, h] = this.yIt.Get(e);
        if (i > TIME_BUFFER_CHECK_TIME_MAX && o - a > TIME_BUFFER_CHECK_COUNT_MIN) {
          break;
        }
        h = h - a;
        if (t > h) {
          t = h;
        } else if (s < h) {
          s = h;
        }
      }
      r = s - t;
      r = MathUtils_1.MathUtils.Clamp(r, r, MAX_FLUCTUATE);
      this.TimelineOffsetBase = t;
      if (ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode) {
        this.DesiredBuffer = r * BUFFER_TIME_RATE + ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpSendInterval;
      } else {
        this.DesiredBuffer = r * BUFFER_TIME_RATE + FIX_BUFFER_TIME;
      }
      this.TIt(0);
    }
  }
  TIt(e = 0) {
    if (this.DesiredBuffer < this.Buffer) {
      this.Buffer = Math.max(this.DesiredBuffer, this.Buffer - e);
    } else if (this.RemainBufferTime > e) {
      this.Buffer = Math.min(this.DesiredBuffer, this.Buffer + e);
    } else {
      this.Buffer = this.DesiredBuffer;
    }
  }
  OnTick(e) {
    this.TIt(e * TIME_OFFSET_LERP_RATE);
  }
  ReportMoveDataReceiveInfo(e, t, s) {
    t = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataId,
      pb_data_id: t,
      offset: e,
      timeline_offset: this.TimelineOffsetBase,
      buffer: this.Buffer,
      desired_buffer: this.DesiredBuffer,
      remain_buffer: this.RemainBufferTime,
      udp_message: s
    };
    e = JSON.stringify(t);
    CombatDebugController_1.CombatDebugController.DataReport("MOVE_SYNC_RECEIVE_INFO", e);
  }
}
const COUNT_CONTEXT_REMOVE_DELAY = 500;
class CombatMessageModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.MoveSyncUdpMode = true;
    this.MoveSyncUdpSendInterval = 0.03;
    this.MoveSyncUdpFullSampling = false;
    this.CombatMessageSendPackMode = true;
    this.CombatMessageSendInterval = 0.04;
    this.CombatMessageSendIntervalMulti = 0.03;
    this.CombatMessageSendPendingTime = 0;
    this.zoh = 1;
    this.LIt = 0n;
    this.CombatMessageBufferMap = new Map();
    this.CombatMessageBufferMapByEntity = new Map();
    this.NeedPushMove = false;
    this.MoveSyncSet = new Set();
    this.AnyEntityInFight = false;
    this.AnyHateChange = false;
    this.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.sZn.create();
    this.Gul = false;
    this.go_ = new Map();
    this.po_ = new Map();
    this.fo_ = new Map();
    this.vo_ = new Map();
    this.SkillDirtySet = new Set();
    this.yo_ = new Map();
    this.So_ = new Map();
  }
  OnLeaveLevel() {
    return !(this.AnyEntityInFight = false);
  }
  OnChangeMode() {
    return !(this.AnyEntityInFight = false);
  }
  AddMoveSync(e) {
    return !this.MoveSyncSet.has(e) && (this.MoveSyncSet.add(e), true);
  }
  DeleteMoveSync(e) {
    return !!this.MoveSyncSet.delete(e);
  }
  SetCombatMessageSwitch(e) {
    this.Gul = e;
  }
  GenMessageId() {
    var e = ++this.LIt | BigInt(this.zoh) << MESSAGE_ID_MASK;
    if (this.Gul && Log_1.Log.CheckError()) {
      Log_1.Log.Error("CombatInfo", 35, "[GenMessageId]Debug", ["messageId", e]);
    }
    return e;
  }
  SetLastPrefix(e) {
    this.zoh = e;
  }
  SetLastMessageId(e) {
    this.LIt = e;
  }
  GetMessageBuffer(t) {
    if (t !== 0) {
      let e = this.CombatMessageBufferMap.get(t);
      if (!e) {
        e = new CombatMessageBuffer(t);
        this.CombatMessageBufferMap.set(t, e);
      }
      return e;
    }
  }
  GetMessageBufferByEntityId(e) {
    return this.CombatMessageBufferMapByEntity.get(e);
  }
  SetEntityMap(e, t) {
    t = this.CombatMessageBufferMap.get(t);
    this.CombatMessageBufferMapByEntity.set(e, t);
  }
  TryClearSkillCount(e) {
    if ((this.go_.get(e) ?? 0) === 0) {
      this.go_.delete(e);
      this.po_.delete(e);
      this.fo_.delete(e);
    }
  }
  AddSkillRefCount(e) {
    var t;
    if (e && e > 0 && (t = this.go_.get(e) ?? 0, this.go_.set(e, t + 1), t === 0)) {
      this.po_.set(e, 0);
      this.fo_.set(e, 0);
    }
  }
  RemoveSkillRefCount(e) {
    var t;
    if (e && e > 0 && (t = this.go_.get(e)) !== undefined && (this.go_.set(e, --t), t <= 0)) {
      this.SkillDirtySet.add(e);
    }
  }
  OnBulletAdded(e, t, s) {
    this.AddSkillRefCount(e);
    if (t && t > 0) {
      this.vo_.set(t, 0);
    }
  }
  OnBulletRemoved(e, t) {
    this.RemoveSkillRefCount(e);
    if (t && t > 0) {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.vo_.delete(t);
      }, COUNT_CONTEXT_REMOVE_DELAY);
    }
  }
  AddSkillHitCount(e) {
    if (e && !(e <= 0)) {
      var t = this.po_.get(e);
      if (t !== undefined) {
        this.po_.set(e, t + 1);
        return t + 1;
      }
      CombatLog_1.CombatLog.Warn("Message", undefined, "技能命中计数器不存在", ["skillContextId", e]);
    }
  }
  AddSkillDamageCount(e) {
    if (e && !(e <= 0)) {
      var t = this.fo_.get(e);
      if (t !== undefined) {
        this.fo_.set(e, t + 1);
        return t + 1;
      }
      CombatLog_1.CombatLog.Warn("Message", undefined, "技能伤害计数器不存在", ["skillContextId", e]);
    }
  }
  AddBulletDamageCount(e) {
    if (e && !(e <= 0)) {
      var t = this.vo_.get(e);
      if (t !== undefined) {
        this.vo_.set(e, t + 1);
        return t + 1;
      }
      CombatLog_1.CombatLog.Warn("Message", undefined, "子弹命中计数器不存在", ["bulletContextId", e]);
    }
  }
}
exports.CombatMessageModel = CombatMessageModel;
//# sourceMappingURL=CombatMessageModel.js.map