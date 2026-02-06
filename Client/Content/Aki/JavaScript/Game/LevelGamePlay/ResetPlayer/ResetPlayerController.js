"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPlayerController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class ResetPlayerController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(23850, ResetPlayerController.Iag);
    return true;
  }
  static OnLeaveLevel() {
    this.Wff();
    return true;
  }
  static OnChangeMode() {
    this.Wff();
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(23850);
    return true;
  }
  static bag(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "玩家重置请求中断");
    }
    var r = new Protocol_1.Aki.Protocol.Ssg();
    r.Isg = false;
    r.W5n = e.PlayerId;
    r.w5n = e.IncId;
    r.c5n = e.Index;
    Net_1.Net.Call(17532, r, () => {});
  }
  static Rag(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "玩家重置开始请求传送");
    }
    var r = new Protocol_1.Aki.Protocol.Ssg();
    r.Isg = true;
    r.W5n = e.PlayerId;
    r.w5n = e.IncId;
    r.c5n = e.Index;
    Net_1.Net.Call(17532, r, e => {
      if (e && e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
          if (ModelManager_1.ModelManager.GameModeModel.LoadingPhase < 4) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportOpenLoadingEnd, this.Oul);
          } else {
            this.$ff();
          }
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelPlay", 48, "玩家重置未在传送中");
          }
          this.Wff();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 48, "玩家重置请求传送失败");
        }
        this.Wff();
      }
    });
  }
  static Wff() {
    var e;
    var r = ModelManager_1.ModelManager.ResetPlayerModel;
    if (r.IsReseting) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "玩家重置结束执行");
      }
      r.IsReseting = false;
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
      this.$ff();
      ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = false;
      if ((e = r.DisableMoveEntityHandle)?.Valid) {
        e.Entity?.GetComponent(124)?.EnableByKey(8);
      }
      r.DisableMoveEntityHandle = undefined;
    }
  }
  static $ff() {
    var e = ModelManager_1.ModelManager.ResetPlayerModel;
    if (!(e.CueHandleSet.size <= 0)) {
      var r = this.CRa();
      if (r) {
        for (const t of e.CueHandleSet) {
          r.RemoveCueByHandle(t);
        }
      } else {
        e.CueHandleSet.clear();
      }
    }
  }
  static CRa() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(239);
  }
}
exports.ResetPlayerController = ResetPlayerController;
(_a = ResetPlayerController).Iag = e => {
  const r = {
    PlayerId: e.W5n,
    IncId: e.w5n,
    Index: e.c5n
  };
  var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217);
  if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || t?.HasTag(191377386)) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelPlay", 48, "玩家重置时正在溺水或已死亡，不执行");
    }
    _a.bag(r);
  } else {
    var o = ModelManager_1.ModelManager.ResetPlayerModel;
    if (o.IsReseting) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelPlay", 48, "玩家重置中，不可重复执行");
      }
      _a.bag(r);
    } else {
      const _ = _a.CRa();
      if (_) {
        t = JSON.parse(e.C6n);
        if (t) {
          e = t.Presentation;
          if (e.Type !== IAction_1.EResetPresentationType.Failure) {
            _a.bag(r);
          } else {
            var t = e.GamePlayCues;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("LevelPlay", 48, "玩家重置开始执行");
            }
            o.IsReseting = true;
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
            ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
            var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            var l = a?.Entity?.GetComponent(124);
            if (l) {
              l.DisableByKey(8);
              o.DisableMoveEntityHandle = a;
            }
            if (t) {
              const _ = _a.CRa();
              if (_) {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("LevelPlay", 48, "玩家重置添加GameplayCue");
                }
                for (const n of t) {
                  o.CueHandleSet.add(_.AddCue(n));
                }
              }
            }
            TimerSystem_1.GameplayTimerSystem.Delay(() => {
              _a.Rag(r);
            }, e.Duration * MathUtils_1.MathUtils.SecondToMillisecond);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 48, "执行重置时，参数错误");
          }
          _a.bag(r);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 48, "执行重置时，玩家实体不存在");
        }
        _a.bag(r);
      }
    }
  }
};
ResetPlayerController.Oul = () => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportOpenLoadingEnd, _a.Oul);
  _a.$ff();
};
ResetPlayerController.Ilt = () => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, _a.Ilt);
  _a.Wff();
}; //# sourceMappingURL=ResetPlayerController.js.map