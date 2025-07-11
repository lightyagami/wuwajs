"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowNetworks = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
  static Register() {
    Net_1.Net.Register(18823, this.m$i);
    Net_1.Net.Register(21444, this.d$i);
    Net_1.Net.Register(21386, this.C$i);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(18823);
    Net_1.Net.UnRegister(21444);
    Net_1.Net.UnRegister(21386);
  }
  static RequestGmFinish() {
    var o = Protocol_1.Aki.Protocol.Gzn.create();
    o.VVn = 0;
    o.P8n = "@skipflow";
    Net_1.Net.Call(23520, Protocol_1.Aki.Protocol.Gzn.create(o), o => {});
  }
  static RequestAction(o, t, e) {
    var r = Protocol_1.Aki.Protocol.trs.create();
    r._Hn = o;
    r.uHn = t;
    Net_1.Net.Call(15997, r, o => {
      if (e) {
        e();
      }
      FlowNetworks.g$i(o.Cvs, 16532);
    });
  }
  static RequestFlowEnd(t, o, e, r) {
    var l = new Protocol_1.Aki.Protocol.Yis();
    l._Hn = t;
    l.cHn = o;
    var _ = {};
    for (const i of e) {
      var s = i[0];
      const e = i[1];
      var n = [];
      for (const d of e) {
        var c = {
          mHn: d[0],
          z5n: d[1]
        };
        n.push(c);
      }
      _[s] = {
        dHn: n
      };
    }
    l.CHn = _;
    Net_1.Net.Call(20763, l, o => {
      if (o) {
        FlowNetworks.g$i(o.Cvs, 16532);
        r?.(t, o.Cvs);
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("请求完成剧情时网络错误");
        r?.(t, undefined);
      }
    });
  }
  static RequestFlowRestart(t) {
    var o = new Protocol_1.Aki.Protocol.Zis();
    o._Hn = t;
    Net_1.Net.Call(16764, o, o => {
      if (o) {
        if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.FlowController.LogError("请求重启剧情失败", ["flowIncId", t]);
        }
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("请求重启剧情时网络错误", ["flowIncId", t]);
      }
    });
  }
  static RequestSeqEndPosition(o, t, e) {
    var r = Protocol_1.Aki.Protocol.m0_.create();
    r._Hn = o.FlowIncId;
    r.fql = o.CurShowTalkActionId;
    r.mHn = o.CurTalkId;
    r.iPs = t.X;
    r.rPs = t.Y;
    r.gqs = t.Z;
    r.fqs = e.Yaw;
    const l = o.FlowIncId;
    Net_1.Net.Call(17429, r, o => {
      if (o) {
        if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.FlowController.LogError("请求Seq最终位置失败", ["flowIncId", l]);
        }
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("请求Seq最终位置时网络错误", ["flowIncId", l]);
      }
    });
  }
  static g$i(o, t) {
    if (o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFinishFlowFail) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("请求服务器完成剧情失败");
    } else if (o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFlowActionFail) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("请求服务器剧情行为失败");
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o, t);
    }
  }
  static RequestSafeTeleport(o, t) {
    var e = new Protocol_1.Aki.Protocol.G7s();
    e._Hn = o;
    Net_1.Net.Call(25072, e, o => {
      if (o && o.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        t(true);
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("请求服务器传送到剧情起始点失败");
        t(false);
      }
    });
  }
}
(exports.FlowNetworks = FlowNetworks).m$i = o => {
  ControllerHolder_1.ControllerHolder.FlowController.StartNotify(o);
};
FlowNetworks.d$i = o => {
  ControllerHolder_1.ControllerHolder.FlowController.EndNotify(o);
};
FlowNetworks.C$i = o => {
  ControllerHolder_1.ControllerHolder.FlowController.SkipBlackScreenNotify(o);
}; //# sourceMappingURL=FlowNetworks.js.map