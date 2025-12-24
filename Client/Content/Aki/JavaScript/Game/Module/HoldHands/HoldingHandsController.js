"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldingHandsController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterHoldingHandsComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterHoldingHandsComponent");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const HoldingHandsUtils_1 = require("./HoldingHandsUtils");
class HoldingHandsController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.HoldingHandsModel;
  }
  static OnInit() {
    Net_1.Net.Register(21418, this.C7u);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(21418);
    return true;
  }
  static TickPriority2(e) {
    this.ITu(e);
  }
  static ITu(e) {
    if (this.Model) {
      for (const o of this.Model.Relations.values()) {
        if (o instanceof HoldingHandsUtils_1.Binding && (HoldingHandsUtils_1.HoldingHandsUtils.UpdateBinding(o, e), o.Reachable && !o.LastReachable ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 82, "[HoldingHandsController] 牵手范围内", ["leader", o.Leader?.Entity.Id], ["follower", o.Follower?.Entity.Id]), o.Leader.OnReachable(true, o.LeaderHandType), o.Follower.OnReachable(true, o.FollowerHandType)) : !o.Reachable && o.LastReachable && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 82, "[HoldingHandsController] 牵手范围外", ["leader", o.Leader?.Entity.Id], ["follower", o.Follower?.Entity.Id]), o.Leader.OnReachable(false, o.LeaderHandType), o.Follower.OnReachable(false, o.FollowerHandType)), o.UnReachableTime > o.Leader.Params.EndTime * 1000)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Character", 82, "[HoldingHandsController] 因范围外超时断开牵手", ["entityId", o.Leader.Entity.Id], ["key", o.Key]);
          }
          HoldingHandsController.RequestReleaseHands(o.Key, "超时终止", true);
        }
      }
    }
  }
  static b9d(e, o, t, r) {
    var n = new HoldingHandsUtils_1.Invitation();
    n.Key = e;
    n.Leader = o;
    n.LeaderHandType = r;
    n.Follower = t;
    n.FollowerHandType = 1 - r;
    this.Model?.SetRelation(e, n);
    CharacterHoldingHandsComponent_1.CharacterHoldingHandsComponent.StartInvitation(n, r);
    n.Leader.TryAddEvents();
    n.Follower.TryAddEvents();
  }
  static AddBinding(e, o, t, r, n = false, a = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 82, "[HoldingHandController.AddBinding]", ["key", e], ["Leader", o.Entity.Id], ["Follower", t.Entity.Id], ["invitation", n], ["slowDamping", a]);
    }
    var i = 1 - r;
    var l = o.GetHandRuntime(r);
    var s = t.GetHandRuntime(i);
    var d = new HoldingHandsUtils_1.Binding();
    d.Key = e;
    d.LeaderHandType = r;
    d.FollowerHandType = i;
    d.Leader = o;
    d.LeaderRuntime = l;
    d.Follower = t;
    d.FollowerRuntime = s;
    d.State = 1;
    d.BindDirDamping = a ? o.Params.BindVecDampingInvitation : o.Params.BindVecDamping;
    l.IkTarget.Alpha = 1;
    s.IkTarget.Alpha = 1;
    this.Model?.SetRelation(e, d);
    o.OnAddBinding(r, e, n);
    t.OnAddBinding(i, e, n);
    if (!n && t?.KeepFollowingConfig) {
      t.MoveComp?.MoveController.StartKeepFollowingWithDataAsset(o.ActorComp, t.KeepFollowingConfig, i);
    }
    var a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(o.SkelMesh.GetOwner());
    if (a === 3) {
      CharacterHoldingHandsComponent_1.CharacterHoldingHandsComponent.LoadCommonParams();
    }
    return d;
  }
  static R9d(e, o = false) {
    var t = this.Model?.GetRelation(e);
    if (t) {
      t.Leader?.OnDeleteRelation(t.LeaderHandType, true, o);
      t.Follower?.OnDeleteRelation(t.FollowerHandType, false, o);
    }
    this.Model?.DeleteRelation(e);
  }
  static RequestHoldHands(e, o, t, r, n, a = true, i = "") {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 82, "[HoldingHandsController.RequestHoldHands]", ["key", e], ["leader", o.Id], ["follower", t.Id], ["leaderHandType", r], ["waitAnim", n], ["waitServer", a], ["reason", i]);
    }
    var l;
    var s;
    var d;
    var g = o.Entity?.GetComponent(321);
    var t = t.Entity?.GetComponent(321);
    if (g) {
      if (t) {
        s = g.GetRelationByHand(r);
        d = t.GetRelationByHand(1 - r);
        l = s && d && s === d && s.Leader === g && s.Follower === t;
        if (s?.Key) {
          this.RequestReleaseHands(s.Key, "同实体重复添加", false, !l);
        }
        if (d?.Key && this.Model?.GetRelation(d?.Key)) {
          this.RequestReleaseHands(d.Key, "同实体重复添加", false, !l);
        }
        if (this.Model?.GetRelation(e)) {
          this.RequestReleaseHands(e, "同Key重复添加", false, true);
        }
        if (n) {
          this.RequestInvitation(e, g, t, r, a);
        } else {
          this.RequestAddBinding(e, g, t, r, true, a);
        }
        s = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
        if (o.Id === s?.Id) {
          (d = new LogReportDefine_1.HoldHandEnterLogEvent()).reason = i + (n ? "邀请" : "直接牵手");
          LogReportController_1.LogReportController.LogReport(d);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 82, "[HoldingHandsController.RequestHoldHands] 无法获取牵手目标组件");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 82, "[HoldingHandsController.RequestHoldHands] 无法获取牵手发起者组件");
    }
  }
  static RequestInvitation(o, t, r, n, e = true) {
    var a;
    if (t.IsSitDown()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 82, "[HoldingHandsController.RequestInvitation] Leader已在坐下，无法邀请", ["key", o]);
      }
    } else {
      a = this.bWu(t, r, n, true);
      if (e) {
        Net_1.Net.Call(15620, a, e => {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            this.b9d(o, t, r, n);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 82, "[HoldingHandsController.RequestInvitation] HoldHandRequest返回错误", ["ErrorCode", e.Q4n]);
          }
        });
      } else {
        this.b9d(o, t, r, n);
        Net_1.Net.Call(15620, a, () => {});
      }
    }
  }
  static RequestAddBinding(o, t, r, n, a, e = true) {
    const i = () => {
      var e;
      this.AddBinding(o, t, r, n).NoLerpNextUpdate = true;
      if (a) {
        e = r.GetFollowingPosition(t);
        r.ActorComp?.TeleportAndFindStandLocation(e);
        r.MoveComp?.MoveController?.PushMoveInfo();
        r.ActorComp?.SetActorRotation(t.ActorComp.ActorRotation, "跳过动画直接牵手时传送被牵手者并设置旋转");
        r.ActorComp?.ClearInput();
      }
    };
    var l = this.bWu(t, r, n, true);
    if (e) {
      Net_1.Net.Call(15620, l, e => {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          i();
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 82, "[HoldingHandsController.RequestAddBinding] HoldHandRequest返回错误", ["ErrorCode", e.Q4n]);
        }
      });
    } else {
      i();
      Net_1.Net.Call(15620, l, () => {});
    }
  }
  static RequestReleaseHands(e, o = "", t = false, r = true) {
    var n;
    var a;
    var i = this.Model?.GetRelation(e);
    if (i) {
      n = i.Leader;
      a = i.Follower;
      if (n && a && (this.R9d(e, t), r && (t = this.bWu(n, a, i.LeaderHandType, false), Net_1.Net.Call(15620, t, () => {}), i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity, n.Entity.Id === i?.Id) && ((t = new LogReportDefine_1.HoldHandExitLogEvent()).reason = o, LogReportController_1.LogReportController.LogReport(t)), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 82, "[HoldingHandsController.RequestReleaseHands]", ["key", e], ["reason", o], ["sendRequest", r], ["leader", n.Entity.Id], ["follower", a.Entity.Id]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Character", 82, "[HoldingHandsController.RequestReleaseHands] key不存在", ["key", e]);
    }
  }
  static bWu(e, o, t, r) {
    var n = Protocol_1.Aki.Protocol.J8u.create();
    n.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
    n.F4n = e.ActorComp.CreatureData.GetCreatureDataId();
    n.TVn = o.ActorComp.CreatureData.GetCreatureDataId();
    n.i7u = t;
    n.r7u = r;
    return n;
  }
  static SitOnCharCheckHoldHands(r, n) {
    r = r.GetComponent(321);
    if (n && r?.ActorComp) {
      var a = r?.OnLeaderSitDown();
      var i = a?.Follower;
      if (i?.ActorComp) {
        var l = r.ActorComp.ActorLocationProxy;
        var s = i.ActorComp.ActorLocationProxy;
        var d = n.CreatureData.GetPbEntityInitData()?.ComponentsData;
        var g = n.CreatureData.GetPbDataId();
        var g = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId, g, true);
        let e = 0;
        if (g && g?.Type === "Entity") {
          e = g.EntityId;
        }
        g = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
        let o = -1;
        let t = 500000;
        var _ = [];
        if (g && (g = (0, IComponent_1.getComponent)(g.ComponentsData, "BaseInfoComponent"))?.ChildEntityIds) {
          _.push(e);
          _.push(...g.ChildEntityIds);
        }
        if (d && (g = (0, IComponent_1.getComponent)(d, "BaseInfoComponent"))?.ChildEntityIds) {
          _.push(...g.ChildEntityIds);
        }
        for (const c of _) {
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(c, this.t$u);
          var H = this.t$u[0]?.Entity?.GetComponent(207);
          var C = H?.GetInteractPoint();
          if (C && H?.HasSitDownAction() && H.Entity.Id !== n.Entity.Id && (H = Vector_1.Vector.DistSquared(C, l) + Vector_1.Vector.DistSquared(C, s)) < t) {
            t = H;
            o = c;
          }
        }
        if (o > 0) {
          this.Ggd(r, o, i);
        }
        d = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
        if (r.Entity.Id === d?.Id) {
          g = new LogReportDefine_1.HoldHandSitDownLogEvent();
          LogReportController_1.LogReportController.LogReport(g);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 82, "[HoldingHandsController] 牵手坐下", ["key", a?.Key], ["leader", r.Entity.Id], ["follower", i.Entity.Id]);
        }
      }
    }
  }
  static Ggd(e, o, t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(o, this.t$u);
    var r = this.t$u[0];
    if (r) {
      r = r.Entity?.GetComponent(207);
      if (r && r.HasSitDownAction()) {
        var r = () => {
          if (!e.IsSitDown()) {
            e.OnLeaderAndFollowerStandUp();
          }
        };
        var n = t?.Entity.GetComponent(96);
        var a = t?.KeepFollowingConfig?.传送特效buffID;
        var i = [];
        if (a?.Num()) {
          for (let e = 0; e < a.Num(); e++) {
            var l = a.Get(e);
            if (l && !i.includes(l)) {
              i.push(l);
            }
          }
        }
        n?.StartNpcSitOnChair({
          ChairEntityId: o,
          TeleportEffect: i,
          InterruptCondition: () => {
            return !e || !e.Entity.GetComponent(29)?.GetSitDownState() && !ModelManager_1.ModelManager.PlotModel.IsInPlot;
          },
          Finish: r,
          Abort: r
        });
      }
    }
  }
  static ForceNoLerpNextUpdate(e) {
    e.Entity?.GetComponent(321)?.SetBindingsNoLerp();
  }
  static GetFollowers(o) {
    var t = o.Entity?.GetComponent(321);
    if (t) {
      var r = [];
      for (let e = 0; e <= 1; e++) {
        var n = t.GetRelationByHand(e);
        if (n && n.Leader.Entity.Id === o.Id) {
          r.push(ModelManager_1.ModelManager.CreatureModel.GetEntityById(n.Follower.Entity.Id));
        }
      }
      return r;
    }
  }
}
(exports.HoldingHandsController = HoldingHandsController).C7u = e => {
  var e = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e);
  if (o?.Valid) {
    if (o = o.Entity?.GetComponent(321)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 82, "[HoldingHandsController.OnStopHoldHandNotify]", ["leader", o.Entity.Id]);
      }
      o.ReleaseAllHands("Notify", false, false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 82, "[HoldingHandsController.OnStopHoldHandNotify] Entity没有牵手Component", ["id", e]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Character", 82, "[HoldingHandsController.OnStopHoldHandNotify] 找不到对应的Entity", ["id", e]);
  }
};
HoldingHandsController.t$u = new Array(); //# sourceMappingURL=HoldingHandsController.js.map