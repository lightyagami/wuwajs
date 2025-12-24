"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Net = exports.CallbackStatus = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Time_1 = require("../Common/Time");
const List_1 = require("../Container/List");
const Long = require("../Define/Net/long");
const NetDefine_1 = require("../Define/Net/NetDefine");
const Protocol_1 = require("../Define/Net/Protocol");
const GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController");
const TimerSystem_1 = require("../Timer/TimerSystem");
const MathUtils_1 = require("../Utils/MathUtils");
const StringUtils_1 = require("../Utils/StringUtils");
const CsNetParam_1 = require("./CsNetParam");
const NetInfo_1 = require("./NetInfo");
const ENABLE_NET_STAT = true;
const ENABLE_NET_LOG = true;
const ENABLE_HEARTBEAT_LOG = true;
const ENABLE_SYNC_LOG = true;
const ENABLE_MESSAGE_LOG = false;
const s2cEncryptType = {
  [0]: 1,
  2: 0
};
class CallbackStatus {
  constructor(e) {
    this.UserData = undefined;
    this.IsFinished = true;
    this.t6 = 0;
    this.Ax1 = 0;
    this.Ax1 = e;
  }
  get MessageId() {
    return this.Ax1;
  }
  get IsJobFinished() {
    return this.IsFinished;
  }
  get CallbackCount() {
    return this.t6;
  }
  IncrementCount() {
    this.t6++;
  }
}
exports.CallbackStatus = CallbackStatus;
class CallbackQueueItem {
  constructor(e, t, N) {
    this.B7 = undefined;
    this.DIe = undefined;
    this.dJ = false;
    this.B7 = e;
    this.DIe = new CallbackStatus(t);
    this.dJ = N;
  }
  DoCallback() {
    this.B7?.(this.DIe);
    return this.DIe.IsJobFinished;
  }
  IsPaused() {
    return this.dJ;
  }
}
class SendMessageCache {
  constructor(e, t, N, o, a, i = false) {
    this.RpcId = 0;
    this.SeqNo = 0;
    this.MessageId = undefined;
    this.EncodeMessage = undefined;
    this.Handle = undefined;
    this.SendTimeMs = 0;
    this.TimeoutHandle = undefined;
    this.CallFromCs = false;
    this.RpcId = e;
    this.SeqNo = t;
    this.MessageId = N;
    this.EncodeMessage = o;
    this.Handle = a;
    this.SendTimeMs = Date.now();
    this.TimeoutHandle = undefined;
    this.CallFromCs = i;
  }
  ClearHandle() {
    this.Handle = undefined;
  }
}
SendMessageCache.NullMessageCache = new SendMessageCache(undefined, undefined, undefined, undefined, undefined);
class Net {
  static get RttMs() {
    return NetInfo_1.NetInfo.RttMs;
  }
  static get LastReceiveTimeMs() {
    return Net.QK;
  }
  static StartReconnecting() {
    Net.nha = true;
  }
  static sha() {
    Net.nha = false;
  }
  static IsServerConnected() {
    return Net.nha || Net.aha === 4;
  }
  static IsFinishLogin() {
    return Net.aha === 4;
  }
  static ChangeState1() {
    Net.aha = 1;
  }
  static hha() {
    if (Net.aha !== 1) {
      Net.lha(2);
    }
    Net.aha = 2;
  }
  static DX() {
    return Net.aha >= 2 && Net.aha <= 4;
  }
  static ChangeStateEnterGame() {
    if (Net.aha !== 2 && Net.aha !== 3) {
      Net.lha(3);
    }
    Net.aha = 3;
  }
  static gXa() {
    if (Net.aha !== 3) {
      Net.lha(4);
    }
    Net.aha = 4;
    Net.sha();
  }
  static IsNotifyCallbackPaused() {
    return Net.hul;
  }
  static PauseAllNotifyCallback() {
    Net.hul = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 30, "暂停消息处理");
    }
  }
  static ResumeAllNotifyCallback() {
    Net.hul = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 30, "恢复消息处理");
    }
  }
  static lha(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 30, "状态切换错误", ["Current", Net.aha], ["Dest", e]);
    }
  }
  static SetNetworkErrorHandle(e) {
    Net.$K = e;
  }
  static SetExceptionHandle(e) {
    Net.YK = e;
  }
  static SetAddRequestMaskHandle(e) {
    Net.JK = e;
  }
  static SetRemoveRequestMaskHandle(e) {
    Net.zK = e;
  }
  static Initialize() {
    Net._X(0);
    var e = new UE.KuroKcpClient();
    e.IsMultiThreaded = true;
    if (Info_1.Info.PlatformType === 1) {
      e.UseNewResolveIp = false;
    }
    e.IsTickDrivenOutside = true;
    e.OnConnectSuccess.Add(Net.voa);
    e.OnRecResp.Bind(Net.iX);
    e.OnRecException.Bind(Net.oX);
    e.OnRecTcpException.Bind(Net.tvu);
    e.OnRecPush.Bind(Net.rX);
    e.OnError.Bind(Net.nX);
    e.SetEnType(2, 111);
    e.SetEnType(2, 112);
    Net.sX.clear();
    var t = (0, puerts_1.$ref)(false);
    UE.KuroVariableFunctionLibrary.GetBoolValue("DisableCrc", t);
    NetInfo_1.NetInfo.DisableCrc = (0, puerts_1.$unref)(t);
    Net.aX = 0;
    Net.hX = 0;
    Net.lX = 0;
    if (!Info_1.Info.IsBuildShipping) {
      Net.uX = ENABLE_NET_LOG;
      Net.cX = ENABLE_NET_STAT;
      Net.mX = ENABLE_HEARTBEAT_LOG;
      Net.dX = ENABLE_SYNC_LOG;
      e.OpenSendVerify = true;
    }
    Net.CX(NetDefine_1.PushMessageIds, "Net.Push", true);
    Net.CX(NetDefine_1.RequestMessageIds, "Net.Request", false);
    Net.CX(NetDefine_1.ResponseMessageIds, "Net.Response", true);
    Net.CX(NetDefine_1.NotifyMessageIds, "Net.Notify", true);
    let N = 1000;
    t = ((N = e.RemoteMtu > 0 ? e.RemoteMtu : N) - 24) * 127;
    e.SetKcpMtu(N);
    e.SetKcpSegmentSize(t);
    e.SetKcpWndSize(256, 256);
    e.SetKcpNoDelay(1, 10, 2, 1);
    e.SetKcpStream(true);
    Net.gX = e;
    t = {
      GroupId: new UE.FName("NetOnceTaskGroup"),
      Priority: 100,
      IsEmpty: this.fX,
      Consume: this.pX
    };
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterOnceTaskCustomGroup(t);
  }
  static Tick(e) {
    if (Net.gX) {
      Net.gX.TickOutside(e);
    }
  }
  static InitCanTimerOutMessage(e) {
    Net.MX.clear();
    for (const t of e) {
      Net.MX.add(t);
    }
  }
  static ipa() {
    return !!Net.rpa && (Net.rpa.DoCallback() && (Net.rpa = undefined), true);
  }
  static Connect(e, t, N, o, a) {
    if (Net.EX()) {
      Net.Moa = N;
      Net.Soa = a;
      Net.Eoa = 0;
      Net.yoa = e;
      Net.Ioa = t;
      Net.Toa = o;
      Net.Loa();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 8, "已经连接或者正在连接中.");
      }
      N(3);
    }
  }
  static async ConnectAsync(e, N, o, a) {
    return new Promise(t => {
      Net.Connect(e, N, e => {
        t(e);
      }, o, a);
    });
  }
  static Disconnect(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 30, "断开连接", ["Reason", e]);
    }
    Net._X(0);
    if (Net.Moa) {
      Net.Doa(2);
    }
    Net.aha = e === 0 ? 5 : 0;
    if (e !== 1) {
      Net.LX();
      Net.aX = 0;
      Net.hX = 0;
      Net.sha();
    }
  }
  static SetDynamicProtoKey(e, t) {
    e = s2cEncryptType[e];
    Net.hha();
    if (!Net.gX.SetK(e, t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 21, "网络 key 设置失败");
      }
    }
  }
  static GetDownStreamSeqNo() {
    return Net.lX;
  }
  static GetCachedMessageData(e) {
    let t = Net.RX.GetHeadNextNode();
    let N = undefined;
    while (t) {
      if (t.Element?.SeqNo === e) {
        N = t.Element;
        break;
      }
      t = t.Next;
    }
    var o;
    var a;
    var i;
    if (N) {
      [o, a,, i] = Net.gX.GetDebugString(N.EncodeMessage, ";", N.MessageId, N.SeqNo).split(";");
      return [N.MessageId, Number(o), a, i];
    } else {
      return [0, 0, "", ""];
    }
  }
  static GetUnVerifiedMessageCount() {
    return Net.RX.Count;
  }
  static ReconnectSuccessAndReSend(N) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 30, "重连流程,", ["lastReceived", N]);
    }
    var e = Date.now();
    var o = Net.RX.Count;
    if (o > 0) {
      let e = Net.RX.GetHeadNextNode();
      let t = false;
      while (e) {
        var a = e.Element.SeqNo;
        if (N <= a) {
          t = a === N;
          break;
        }
        e = e.Next;
      }
      if (e && (Net.RX.RemoveNodesBeforeThis(e, t), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Net", 30, "重连流程, 清理掉已经被服务器收到的缓存消息", ["beforeCount", o], ["afterCount", Net.RX.Count], ["find SeqNo", e.Element.SeqNo]);
      }
    }
    if (Net.RX.Count > 0) {
      let e = 0;
      let t = 0;
      let N = 0;
      let o = Net.RX.GetHeadNextNode();
      while (o) {
        var i;
        var r;
        var s = o.Element;
        var n = s.MessageId;
        if ((NetDefine_1.protoConfig[n] & 3) != 0 && ((r = (i = s.RpcId) !== undefined ? 1 : 4) == 4 || !!s.Handle)) {
          e++;
          t = s.SeqNo;
          N = n;
          Net.UX(r, s.SeqNo, i, n, s.EncodeMessage);
        }
        o = o.Next;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Net", 30, "重连流程, 重发未被服务器确认的消息", ["Count", e], ["lastSeqNo", t], ["lastMsgId", N]);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 63, "重连流程,", ["消耗时间", Date.now() - e]);
    }
    Net.gXa();
  }
  static Register(e, N) {
    if (Net.sX.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 1, "网络消息重复注册", ["id", e]);
      }
      return false;
    } else {
      Net.sX.set(e, (e, t) => {
        N(e, t);
      });
      return true;
    }
  }
  static UnRegister(e) {
    return !!Net.sX.delete(e) || (Log_1.Log.CheckError() && Log_1.Log.Error("Net", 1, "Notify消息未注册", ["id", e]), false);
  }
  static Send(e, t) {
    if (Net.AX(e)) {
      Net.PX(4, e, t, undefined, undefined);
    }
  }
  static Call(e, t, N, o = 0, a = false) {
    var i;
    if (!Net.xX(e, a) && Net.AX(e)) {
      Net.wX.Start();
      i = Net.BX();
      t = Net.PX(1, e, t, i, N, a);
      Net.bX(e, t);
      if (o > 0) {
        Net.qX(o, t.Element);
      }
      if ((NetDefine_1.protoConfig[e] & 4) == 4) {
        Net.npa.Start();
        Net.JK?.(i);
        Net.npa.Stop();
      }
      Net.wX.Stop();
    } else {
      N(undefined, undefined);
    }
  }
  static CsCall(e, t, N, o) {
    Net.SZm.Start();
    t = NetDefine_1.messageDefine[e].decode(new Uint8Array(t));
    Net.SZm.Stop();
    Net.Call(e, t, N, o, true);
  }
  static async CallAsync(e, t, o = 0) {
    return new Promise(N => {
      Net.Call(e, t, (e, t) => {
        N(e);
      }, o);
    });
  }
  static PX(e, t, N, o, a, i = false) {
    Net.NX.Start();
    var r = Net.OX();
    Net.kX.Start();
    var s = NetDefine_1.messageDefine[t].encode(N).finish();
    Net.kX.Stop();
    if (s.length > 30720 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 30, "消息过大", ["message", t], ["length", s.length]);
    }
    var a = new SendMessageCache(o, r, t, s, a, i);
    var i = Net.FX(a);
    if (!Net.VX(t)) {
      Net.UX(e, r, o, t, s, N);
    }
    Net.NX.Stop();
    return i;
  }
  static qX(e, N) {
    const o = N.MessageId;
    var t;
    if (Net.MX.has(o)) {
      t = TimerSystem_1.GameplayTimerSystem.Delay(t => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Net", 30, "协议超时", ["message", o], ["timeout", e], ["deltaTime", t], ["InverseSelfCenteredTimeDilation", Time_1.Time.InverseSelfCenteredTimeDilation]);
        }
        t = N.Handle;
        N.ClearHandle();
        N.TimeoutHandle = undefined;
        if (t) {
          let e = undefined;
          try {
            if (Net.cX) {
              (e = Net.HX.get(o))?.Start();
            }
            t(undefined, undefined);
          } catch (e) {
            if (e instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("Net", 30, "callback执行异常", e, ["requestId", o], ["error", e.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Net", 30, "callback执行异常", ["requestId", o], ["error", e]);
            }
          } finally {
            e?.Stop();
          }
        }
      }, e);
      N.TimeoutHandle = t;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 30, "该协议未配置可超时", ["message", o]);
    }
  }
  static CX(e, t, N) {
    if (Net.uX || Net.cX) {
      for (const i of e) {
        var o = i;
        var a = `${t}.(${o})`;
        if (Net.uX) {
          Net.jX.set(o, a);
        }
        if (N && Net.cX) {
          a = Stats_1.Stat.CreateNoFlameGraph(a);
          Net.HX.set(o, a);
        }
      }
    }
  }
  static xX(e, t = false) {
    return !!(t ? Net.m3f : Net.WX).has(e) && (Log_1.Log.CheckError() && Log_1.Log.Error("Net", 30, "Request重复发送。", ["message", e], ["callFromCs", t]), true);
  }
  static _X(e) {
    if (Net.KX !== e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Net", 8, "连接状态变化", ["Before", Net.KX], ["After", e]), (Net.KX = e) === 0) && Net.gX) {
      Net.gX.Disconnect();
    }
  }
  static EX() {
    return Net.KX === 0;
  }
  static Loa() {
    Net.IX = TimerSystem_1.GameplayTimerSystem.Delay(e => {
      Net.Doa(1);
    }, Net.Toa);
    Net._X(1);
    Net.gX.Connect(Net.yoa, Net.Ioa, NetInfo_1.NetInfo.DisableCrc);
  }
  static _ha(e) {
    return e === 111 || e === 107;
  }
  static VX(e) {
    return !!Net.nha && !Net._ha(e);
  }
  static AX(e) {
    if (Net.aha === 5) {
      return false;
    }
    if (Net.nha) {
      return e !== 107 || !!Net.DX() || !(Log_1.Log.CheckError() && Log_1.Log.Error("Net", 30, "上行协议时机不对，未发送", ["messageId", e]), 1);
    }
    if (!Net.YX(e) && !Net.DX()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 21, "上行协议时机不对，未发送", ["messageId", e]);
      }
      return false;
    }
    if (Net.aha !== 4 && (NetDefine_1.protoConfig[e] & 3) != 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 8, "尚未完成登录流程, 登录流程以外的协议会被丢弃", ["state", Net.aha], ["messageId", e]);
      }
      return false;
    }
    return true;
  }
  static BX() {
    if (Net.aX < MathUtils_1.MathUtils.Int16Max) {
      return ++Net.aX;
    } else {
      Net.aX = 1;
      return Net.aX;
    }
  }
  static OX() {
    if (Net.hX < MathUtils_1.MathUtils.Int32Max) {
      return ++Net.hX;
    } else {
      Net.hX = 1;
      return Net.hX;
    }
  }
  static QX(e) {
    if (e === 0) {
      return true;
    }
    var t = Net.lX;
    let N = t + 1;
    return (Net.lX = e) === (N = t === MathUtils_1.MathUtils.Int32Max ? 1 : N) || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Net", 30, "下行包序号不对", ["old", t], ["new", e]), false);
  }
  static FX(e) {
    if (Net.uX && ENABLE_MESSAGE_LOG && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Net", 8, "AddMessage", ["SeqNo", e.SeqNo], ["MsgName", Net.jX.get(e.MessageId)]);
    }
    return Net.RX.AddTail(e);
  }
  static bX(e, t) {
    Net.XX.set(t.Element.RpcId, t);
    if ((NetDefine_1.protoConfig[e] & 8) == 8) {
      (t.Element.CallFromCs ? Net.m3f : Net.WX).add(e);
    }
  }
  static spa(e) {
    var t = e.Element;
    var N = t.MessageId;
    Net.XX.delete(t.RpcId);
    if ((NetDefine_1.protoConfig[N] & 8) == 8) {
      (t.CallFromCs ? Net.m3f : Net.WX).delete(N);
    }
    if (N === 105) {
      Net.gXa();
    }
    if (!Net._ha(N)) {
      Net.RX.RemoveNodesBeforeThis(e, true);
      if (Net.uX && ENABLE_MESSAGE_LOG && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Net", 30, "DeleteMessage", ["RpcId", t.RpcId], ["SeqNo", t.SeqNo], ["MsgName", Net.jX.get(N)]);
      }
    }
  }
  static YX(e) {
    return e === 111;
  }
  static IGd(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Net", 63, "KcpRecvError", ["ErrorCode", e]);
    }
    if (e === -4) {
      NetInfo_1.NetInfo.DisableCrc = true;
      UE.KuroVariableFunctionLibrary.SetBoolValue("DisableCrc", true);
    }
  }
  static JX(t, a, N, i, r = undefined) {
    var o;
    var s;
    var n = new Uint8Array(i);
    var n = new Uint8Array(n);
    Net.QX(a);
    let _ = undefined;
    let c = undefined;
    let g = undefined;
    const d = N;
    let l = undefined;
    let L = false;
    if (d === 3729) {
      this.ivu(d, n);
    } else {
      let e = false;
      const f = Date.now();
      Net.QK = f;
      if (r) {
        if (_ = Net.XX.get(r)) {
          Net.spa(_);
          o = _.Element;
          s = f - o.SendTimeMs;
          l = o.MessageId;
          NetInfo_1.NetInfo.SetRttMs(s);
          if (s > 300 && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Net", 30, "RTT过高", ["requestId", l], ["rpcId", r], ["seqNo", o.SeqNo], ["serverSeqNo", a], ["rtt", s], ["deltaTime", Time_1.Time.DeltaTime], ["callFromCs", o.CallFromCs]);
          }
          g = o.Handle;
          L = o.CallFromCs;
          if (o.TimeoutHandle) {
            TimerSystem_1.GameplayTimerSystem.Remove(o.TimeoutHandle);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Net", 1, "网络 rpc 响应不存在", ["rpcId", r], ["messageId", N]);
        }
      } else {
        if (!(g = Net.sX.get(d))) {
          if (Net.uX && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Net", 1, "网络 notify 响应不存在", ["Id", d], ["Name", Net.jX.get(d)]);
          }
        }
        e = true;
      }
      if (t === 3) {
        const C = `[异常信息:${StringUtils_1.StringUtils.Uint8ArrayToString(n)}]`;
        const S = g;
        g = () => {
          Net.YK?.(r, N, l, _ ? NetDefine_1.messageDefine[l].decode(_.Element.EncodeMessage) : undefined, C);
          S?.(undefined, undefined);
        };
      } else if (!L && !(c = NetDefine_1.messageDefine[d].decode(n))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Net", 1, "协议解析异常", ["messageId", d]);
        }
      }
      if (c && Net.uX) {
        Net.ZX(d, a, r, c);
      }
      var u = e => {
        let t = undefined;
        var N;
        var o;
        if (Net.cX) {
          (t = Net.HX.get(d))?.Start();
        }
        if (Net.uX && e.CallbackCount === 0 && (N = Date.now() - f) > 67 && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Net", 30, "callback exceeds limit", ["delay", N], ["msg", Net.jX.get(d)]);
        }
        try {
          if (e.CallbackCount === 0 && l && (NetDefine_1.protoConfig[l] & 4) == 4) {
            Net.apa.Start();
            Net.zK?.(r);
            Net.apa.Stop();
          }
          if (L) {
            (o = new CsNetParam_1.CsNetParam()).SeqNo = a;
            o.MessageId = d;
            o.MessageBuffer = i;
            g?.(undefined, e, o);
          } else {
            g?.(c, e);
          }
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Net", 30, "callback执行异常", e, ["messageId", d], ["error", e.message], ["callFromCs", L]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Net", 30, "callback执行异常", ["messageId", d], ["error", e], ["callFromCs", L]);
          }
        } finally {
          e.IncrementCount();
          t?.Stop();
        }
      };
      if (Net.UseBudget && !L) {
        this.fIo.AddTail(new CallbackQueueItem(u, d, e));
        this._ul += e ? 0 : 1;
      } else {
        for (var v = new CallbackStatus(d); u(v), !v.IsJobFinished;);
      }
    }
    return true;
  }
  static UX(e, t, N, o, a, i = undefined) {
    if (Net.uX) {
      i = i || NetDefine_1.messageDefine[o].decode(a);
      Net.ZX(o, t, N, i);
    }
    return Net.gX.SendM(e, t, N, o, a, (NetDefine_1.protoConfig[o] & 32) == 0);
  }
  static LX() {
    Net.WX.clear();
    Net.m3f.clear();
    Net.XX.clear();
    Net.RX.RemoveAllNodeWithoutHead();
    Net.NetEventDispatcher?.CleanNetMessageCaches();
  }
  static ZX(e, t, N, o) {
    var a;
    if ((Net.mX || e !== 1650 && e !== 1651 && e !== 15890) && e !== 18891 && e !== 17075 && e !== 29961 && e !== 18553 && e !== 19055 && e !== 22908 && e !== 21575 && e !== 17745 && e !== 18032 && (Net.dX || e !== 15580 && e !== 28129 && e !== 23556 && e !== 23760 && e !== 15593 && e !== 18718 && e !== 28427 && e !== 21308 && e !== 25511) && (a = Object.keys(o).length > 0, Net.uX) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Net", 22, Net.jX.get(e), ["SeqNo", t], ["RpcId", N], ["UpStreamSeqNo", Net.hX], ["DownStream", Net.lX], ["msg", a ? this.tY(o) : ""]);
    }
  }
  static tY(e) {
    return JSON.stringify(e, (e, t) => t instanceof Long ? MathUtils_1.MathUtils.LongToBigInt(t).toString() : t);
  }
  static rvu(N) {
    if (!N) {
      let e = 0;
      let t = NetInfo_1.NetInfo.TcpRatio >= 10000;
      if (NetInfo_1.NetInfo.TcpRatio < 10000 && NetInfo_1.NetInfo.TcpRatio > 0) {
        e = Math.floor(Math.random() * 10000);
        t = e < NetInfo_1.NetInfo.TcpRatio;
      }
      N = NetInfo_1.NetInfo.TcpRetry >= NetInfo_1.NetInfo.TcpMaxRetry;
      if (t && !N) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Net", 63, "kcp会话id使用Tcp获取:", ["TcpRatio", NetInfo_1.NetInfo.TcpRatio], ["RandomValue", e], ["RetryCount", Net.Eoa], ["TcpRetry", NetInfo_1.NetInfo.TcpRetry]);
        }
        Net.StartTcpConnect();
        return true;
      }
    }
    return Net.Eoa < Net.Soa && (Net.Eoa++, Net._X(0), Net.Loa(), true);
  }
  static StartTcpConnect() {
    if (Net.gX) {
      if (Net.KX === 2) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Net", 63, "KCP已连接,无需建立TCP连接");
        }
      } else if (Net.gX !== undefined) {
        Net.gX.CloseTcpConnect();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Net", 63, "开始建立TCP连接:", ["TcpPort", NetInfo_1.NetInfo.TcpPort], ["LoginTraceId", NetInfo_1.NetInfo.LoginTraceId]);
        }
        Net.gX.OnTcpConnected.Add(Net.ovu);
        Net.gX.OnTcpConnectFailed.Add(Net.nvu);
        Net.gX.StartTcpConnect(NetInfo_1.NetInfo.TcpPort);
        Net.IX = TimerSystem_1.GameplayTimerSystem.Delay(e => {
          Net.Doa(5);
        }, Net.Toa);
        ++NetInfo_1.NetInfo.TcpRetry;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 63, "KCP未初始化,无法启动TCP连接");
    }
  }
  static ivu(e, t) {
    e = NetDefine_1.messageDefine[e].decode(t);
    if (e.Cvs !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 63, "TCP连接建立失败:", ["TcpPort", NetInfo_1.NetInfo.TcpPort], ["Code", e.Cvs]);
      }
      Net.Doa(4);
    } else {
      t = e.Dbs;
      Net.gX.CloseTcpConnect();
      Net.gX.RemoteMtu = e.Rgu;
      Net.gX.HandleKcpConnect(e.bgu, t);
    }
  }
}
exports.Net = Net;
(_a = Net).QK = 0;
Net.UseBudget = true;
Net.gX = undefined;
Net.Moa = undefined;
Net.yoa = "";
Net.Ioa = 0;
Net.Toa = 0;
Net.IX = undefined;
Net.Eoa = 0;
Net.Soa = 0;
Net.sX = new Map();
Net.WX = new Set();
Net.m3f = new Set();
Net.RX = new List_1.default(SendMessageCache.NullMessageCache);
Net.XX = new Map();
Net.jX = new Map();
Net.HX = new Map();
Net.wX = Stats_1.Stat.Create("Net.Call");
Net.NX = Stats_1.Stat.Create("Net.SendInternal");
Net.SZm = Stats_1.Stat.Create("Net.CsCallDecode");
Net.MX = new Set();
Net.aX = 0;
Net.hX = 0;
Net.lX = 0;
Net.KX = 0;
Net.aha = 0;
Net.nha = false;
Net.uX = false;
Net.cX = false;
Net.mX = false;
Net.dX = false;
Net.YK = undefined;
Net.JK = undefined;
Net.zK = undefined;
Net.$K = undefined;
Net.NetEventDispatcher = undefined;
Net.rpa = undefined;
Net.fIo = new List_1.default(new CallbackQueueItem(() => {}, 103, true));
Net._ul = 0;
Net.hul = false;
Net.fX = () => _a.fIo.Count === 0 || !!_a.hul && _a._ul === 0;
Net.pX = () => {
  if (!Net.ipa()) {
    let e = _a.fIo.GetHeadNextNode();
    while (e) {
      if (!_a.hul || !e.Element?.IsPaused()) {
        Net.rpa = e.Element;
        _a.fIo.RemoveNode(e);
        _a._ul -= e.Element?.IsPaused() ? 0 : 1;
        Net.ipa();
        return;
      }
      e = e.Next;
    }
  }
};
Net.npa = Stats_1.Stat.Create("Net.AddRequestMask");
Net.apa = Stats_1.Stat.Create("Net.RemoveRequestMask");
Net.kX = Stats_1.Stat.Create("Net.Encode");
Net.voa = () => {
  Net.gX?.SetKcpStream(true);
  _a.Doa(0);
  Net.NetEventDispatcher?.KcpConnectSuccess();
};
Net.Doa = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Net", 30, "Kcp连接结果:", ["result", e]);
  }
  if (Net.IX !== undefined && TimerSystem_1.GameplayTimerSystem.Has(Net.IX)) {
    TimerSystem_1.GameplayTimerSystem.Remove(Net.IX);
    Net.IX = undefined;
  }
  if ((e !== 1 || !Net.rvu(false)) && (e !== 4 && e !== 5 || !Net.rvu(true))) {
    if (Net.Moa) {
      Net.Moa(e);
      Net.Moa = undefined;
    }
    Net._X(e === 0 ? 2 : 0);
  }
};
Net.nX = (e, t, N, o, a) => {
  Net.NetEventDispatcher?.OnError(e, t, N, o, a);
  switch (e) {
    case 1:
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Net", 30, "SocketError", ["errorCode", t], ["Size", N], ["Read", o]);
      }
      if (t !== 0) {
        Net.$K?.(t);
      }
      break;
    case 3:
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Net", 30, "DecryptError", ["Result", t], ["Type", N], ["RpcId", o], ["MessageId", a]);
      }
      break;
    case 4:
      _a.IGd(t);
  }
};
Net.iX = (e, t, N, o) => {
  Net.JX(2, e, N, o, t);
};
Net.oX = (e, t, N, o) => {
  Net.JX(3, e, N, o, t);
  Net.NetEventDispatcher?.ReceiveException(e, t, N, o);
};
Net.tvu = e => {
  if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Net", 63, "TCP连接建立失败:", ["TcpPort", NetInfo_1.NetInfo.TcpPort], ["ErrorCode", e]);
  }
  Net.Doa(4);
  Net.NetEventDispatcher?.ReceiveTcpException(e);
};
Net.rX = (e, t, N) => {
  Net.JX(4, e, t, N);
  Net.NetEventDispatcher?.ReceivePush(e, t, N);
};
Net.ovu = () => {
  var e;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Net", 63, "TCP连接建立成功:", ["TcpPort", NetInfo_1.NetInfo.TcpPort], ["LoginTraceId", NetInfo_1.NetInfo.LoginTraceId]);
  }
  if (Net.gX) {
    (e = Protocol_1.Aki.Protocol.Egu.create()).a7n = NetInfo_1.NetInfo.LoginTraceId ?? "";
    e.oHn = NetInfo_1.NetInfo.DeviceId ?? "";
    e.Tgu = NetInfo_1.NetInfo.UdpPort;
    e.$9n = NetInfo_1.NetInfo.Token ?? "";
    e.S2d = NetInfo_1.NetInfo.DisableCrc;
    e = NetDefine_1.messageDefine[3728].encode(e).finish();
    Net.gX.SendTcpMessage(0, 3728, e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Net", 63, "获取KCPConv失败,KCP实例不存在");
  }
};
Net.nvu = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Net", 63, "TCP连接建立失败:", ["TcpPort", NetInfo_1.NetInfo.TcpPort]);
  }
  Net.Doa(4);
}; //# sourceMappingURL=Net.js.map