"use strict";

var BaseMontageComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var n = arguments.length;
  var a = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (n > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMontageComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
class MontageTask {
  constructor(t, e, i, s) {
    this.MontageComponent = t;
    this.Handle = e;
    this.PlayCallback = i;
    this.EndCallback = s;
    this.Montage = undefined;
    this.BlendInTime = 0;
    this.MontagePathHash = 0;
    this.MontageName = "";
    this.MontageNeedPush2Server = false;
    this.RemainCallback = undefined;
    this.IQo = undefined;
    this.TQo = false;
    this.lfe = false;
    this.LQo = false;
    this.TQo = false;
  }
  get Invalid() {
    return this.LQo;
  }
  InitWithPath(t, e = -1) {
    this.BlendInTime = e;
    this.MontageName = t;
    var i = this.MontageComponent?.GetMontageByName(t);
    var s = this.MontageComponent?.GetMontagePathByName(t);
    if (this.MontageComponent && i && s) {
      this.CSr(i, t, s, e);
    } else {
      this.LQo = true;
    }
  }
  InitWithMontage(t, e = -1) {
    this.BlendInTime = e;
    var i = t?.GetName();
    var s = this.MontageComponent?.GetMontagePathByName(i);
    if (this.MontageComponent && s && i) {
      this.CSr(t, i, s, e);
    } else {
      this.LQo = true;
    }
  }
  CSr(t, e, i, s) {
    if (t) {
      this.BlendInTime = s;
      this.MontageName = t.GetName();
      this.MontagePathHash = UE.GASBPLibrary.FnvHash(i);
      this.MontageNeedPush2Server = this.MontageComponent?.IsMontageNeedPush2Server(e) ?? false;
      if (!this.LQo) {
        this.Montage = t;
        if (this.TQo) {
          this.Play();
        }
      }
    } else {
      this.LQo = true;
    }
  }
  Play(t = 0, e = -1) {
    if (!this.LQo) {
      this.PlayCallback?.();
      if (this.Montage && !this.lfe) {
        var i = this.Montage.BlendIn.BlendTime;
        if (this.BlendInTime >= 0) {
          this.Montage.BlendIn.BlendTime = this.BlendInTime;
        }
        var e = BaseMontageComponent.RemainedTriggerOn ? e : -1;
        this.IQo = UE.AsyncTaskPlayMontageAndWait.ListenRemainForPlayMontage(this.MontageComponent.GetMainAnimInstance(), this.Montage, 1, t, FNameUtil_1.FNameUtil.NONE, e);
        if (this.IQo.MontageLength <= 0) {
          this.EndCallback?.(true);
          this.MontageComponent.EndMontageTask(this.Handle);
          return;
        }
        if (this.BlendInTime >= 0) {
          this.Montage.BlendIn.BlendTime = i;
        }
        this.IQo.bShouldEmitOnEndedEvent = true;
        this.IQo.EndCallback.Add(t => {
          this.EndCallback?.(t);
          this.MontageComponent.EndMontageTask(this.Handle);
        });
        this.IQo.RemainCallback.Add(t => {
          this.RemainCallback?.(t);
        });
        this.MontageComponent.PushMontageInfo({
          MontageNames: [],
          MontageTaskMessageId: this.MontageComponent.MontageTaskMessageId
        }, this.Montage);
        this.lfe = true;
      }
      this.TQo = true;
    }
  }
  EndTask() {
    this.IQo?.EndTask();
    this.IQo?.EndCallback.Clear();
    this.IQo?.RemainCallback.Clear();
    this.IQo = undefined;
    this.MontageComponent = undefined;
    this.PlayCallback = undefined;
    this.EndCallback = undefined;
    this.RemainCallback = undefined;
    this.LQo = true;
  }
}
let BaseMontageComponent = BaseMontageComponent_1 = class BaseMontageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.MontageMapByName = new Map();
    this.MontagePathMapByName = new Map();
    this.P2l = new Map();
    this.DOr = new Array();
    this.ROr = 0;
    this.MontageTaskMessageId = undefined;
    this.UOr = new Map();
    this.G2a = new Queue_1.Queue();
  }
  OnStart() {
    var t;
    if (!BaseMontageComponent_1.x2l) {
      (t = UE.NewSet(UE.BuiltinString)).Add("TsAnimNotifyAddBuff_C");
      t.Add("TsAnimNotifyAddTag_C");
      t.Add("TsAnimNotifySkillBehavior_C");
      t.Add("TsAnimNotifyReSkillEvent_C");
      t.Add("TsAnimNotifyChangeRoleQte_C");
      t.Add("TsAnimNotifyPanelQte_C");
      t.Add("TsAnimNotifyJoinTeamQte_C");
      t.Add("TsAnimNotifyDetach_C");
      t.Add("TsAnimNotifyStateAddBuff_C");
      t.Add("TsAnimNotifyStateAddTag_C");
      t.Add("TsAnimNotifyStateCounterAttack_C");
      t.Add("TsAnimNotifyStateVisionCounterAttack_C");
      t.Add("TsAnimNotifyStateBulletDuration_C");
      t.Add("TsAnimNotifyStateCaughtBinding_C");
      t.Add("TsAnimNotifyStateCaughtTrigger_C");
      t.Add("TsAnimNotifyStateMontageSpeedChange_C");
      t.Add("TsAnimNotifyStateAttach_C");
      BaseMontageComponent_1.x2l = t;
    }
    return true;
  }
  OnEnd() {
    this.MontageMapByName.clear();
    this.MontagePathMapByName.clear();
    this.P2l.clear();
    for (const e of this.DOr) {
      e.EndTask();
    }
    this.DOr.length = 0;
    for (var [, t] of this.UOr) {
      t.EndTask();
    }
    this.UOr.clear();
    return true;
  }
  GetMainAnimInstance() {}
  CreateTaskWithName(t, e, i, s = -1) {
    var o = ++this.ROr;
    var e = new MontageTask(this, o, e, i);
    e.InitWithPath(t, s);
    if (!e.Invalid) {
      this.UOr.set(o, e);
      return o;
    }
  }
  CreateTaskWithMontage(t, e, i, s = -1) {
    var o = ++this.ROr;
    var e = new MontageTask(this, o, e, i);
    e.InitWithMontage(t, s);
    if (!e.Invalid) {
      this.UOr.set(o, e);
      return o;
    }
  }
  PlayMontageTaskWhenReady(t, e, i, s = -1) {
    var o;
    var n = this.UOr.get(t);
    if (n) {
      if (n.MontageNeedPush2Server) {
        if (i) {
          (o = Protocol_1.Aki.Protocol.Su_.create()).i5n = n.MontageName;
          o.V7s = n.MontagePathHash;
          o.vVn = 1;
          o.MVn = "";
          o.SVn = e;
          this.MontageTaskMessageId = CombatMessage_1.CombatNet.Send(20413, this.Entity, o, i);
        } else {
          CombatLog_1.CombatLog.Error("Animation", this.Entity, "请求播Montage时找不到对应contextId", ["handle", t]);
        }
      }
      n.Play(e, s);
    } else {
      CombatLog_1.CombatLog.Error("Animation", this.Entity, "请求播Montage失败，找不到对应task", ["handle", t]);
    }
  }
  EndMontageTask(t) {
    var e = this.UOr.get(t);
    if (e) {
      e.EndTask();
      this.UOr.delete(t);
    }
  }
  GetMontageTimeRemaining(t) {
    t = this.UOr.get(t);
    if (t?.Montage) {
      return t.Montage.SequenceLength - t.MontageComponent.GetMainAnimInstance().Montage_GetPosition(t.Montage);
    } else {
      return -1;
    }
  }
  GetMontageTimeElapsing(t) {
    t = this.UOr.get(t);
    if (t?.Montage) {
      return t.MontageComponent.GetMainAnimInstance().Montage_GetPosition(t.Montage);
    } else {
      return -1;
    }
  }
  GetMontageTimeLength(t) {
    t = this.UOr.get(t);
    if (t?.Montage) {
      return t.Montage.SequenceLength;
    } else {
      return -1;
    }
  }
  GetMontageTaskNameByHandle(t) {
    t = this.UOr.get(t);
    if (t?.MontageName) {
      return t.MontageName;
    }
  }
  SetMontageTaskRemainCb(t, e) {
    t = this.UOr.get(t);
    if (t && e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 84, "MontageRemain回调绑定成功", ["task", t?.MontageName]);
      }
      t.RemainCallback = e;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 84, "MontageRemain回调绑定失败", ["task", t?.MontageName]);
    }
  }
  PushMontageInfo(e, t) {
    if (this.G2a.Size === 4) {
      this.G2a.Pop();
    }
    e.MontageNames.push(t.GetName());
    var i = t.SlotAnimTracks;
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t).AnimTrack.AnimSegments;
      for (let t = 0; t < s.Num(); t++) {
        var o = s.Get(t);
        e.MontageNames.push(o.AnimReference?.GetName() ?? "");
      }
    }
    this.G2a.Push(e);
  }
  GetMontageInfo(e) {
    for (let t = this.G2a.Size - 1; t >= 0; t--) {
      var i = this.G2a.Get(t);
      if (i.MontageNames.includes(e)) {
        return i;
      }
    }
  }
  AddMontage(t, e, i) {
    if (e) {
      UE.KuroStaticLibrary.SetMontageANIndex(e);
      this.MontageMapByName.set(t, e);
      this.MontagePathMapByName.set(t, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "添加的动画不存在", ["Name", t]);
    }
  }
  GetMontageByName(t) {
    if (t) {
      return this.MontageMapByName.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
    }
  }
  GetMontagePathByName(t) {
    if (t) {
      return this.MontagePathMapByName.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
    }
  }
  IsMontageNeedPush2Server(t) {
    var e;
    var i = this.GetMontageByName(t);
    if (i) {
      if ((e = this.P2l.get(t)) === undefined) {
        i = UE.KuroStaticLibrary.IsMontageContainGivenAnimNotify(i, BaseMontageComponent_1.x2l);
        this.P2l.set(t, i);
        return i;
      } else {
        return e;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 35, "montage找不到", ["Name", t]);
      }
      return false;
    }
  }
};
BaseMontageComponent.x2l = undefined;
BaseMontageComponent.RemainedTriggerOn = true;
BaseMontageComponent = BaseMontageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(24)], BaseMontageComponent);
exports.BaseMontageComponent = BaseMontageComponent; //# sourceMappingURL=BaseMontageComponent.js.map