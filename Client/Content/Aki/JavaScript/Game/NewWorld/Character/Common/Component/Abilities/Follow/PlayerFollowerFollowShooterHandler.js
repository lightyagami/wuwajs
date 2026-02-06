"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerFollowerFollowShooterHandlerFactory = exports.PlayerFollowerFollowShooterHandlerFactory = exports.PlayerFollowerFollowShooterHandler = exports.RegardAsFollowShooterHandler = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../../../../../Core/Container/PriorityQueue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ResponsibilityChain_1 = require("../../../../../../Utils/ResponsibilityChain/ResponsibilityChain");
const WaitEntityTask_1 = require("../../../../../../World/Define/WaitEntityTask");
const FollowUtils_1 = require("./FollowUtils");
const IFollow_1 = require("./IFollow");
class RegardAsFollowShooterHandler extends ResponsibilityChain_1.AbstractHandler {
  CanHandle(e) {
    return FollowUtils_1.FollowUtils.IsFollowShooter(e.EntityHandle);
  }
  ExecuteProcessing(e) {
    e.OutPlayerFollowerHandlerType = IFollow_1.EPlayerFollowerHandlerType.FollowShooter;
  }
  ShouldStop(e) {
    return false;
  }
  ExecuteStopping(e) {}
}
exports.RegardAsFollowShooterHandler = RegardAsFollowShooterHandler;
class PlayerFollowerFollowShooterHandler extends IFollow_1.PlayerFollowerSwallowHandler {
  constructor(e) {
    super();
    this.rzf = 0;
    this.bHa = undefined;
    this.j8 = 0;
    this.OHa = undefined;
    this.xtg = undefined;
    this.kHa = undefined;
    this.ozf = new PriorityQueue_1.PriorityQueue(IFollow_1.PlayerFollowerInfo.Compare);
    this.j8 = e;
    this.bHa = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
  AddFollowerReceiver() {
    return {
      ReceiveExecute: e => {
        this.ozf.Push(e);
      }
    };
  }
  FlushFollowerReceiver() {
    return {
      ReceiveExecute: () => {
        var e;
        if (this.ozf.Empty) {
          this.NHa();
        } else {
          if ((e = this.ozf.Top).CreatureDataId !== this.rzf) {
            this.NHa();
            this.Btg(e.CreatureDataId);
          }
          this.ozf.Clear();
        }
      }
    };
  }
  HasFollower(e) {
    return this.rzf === e;
  }
  OnClear() {
    this.NHa();
    this.ozf.Clear();
  }
  Btg(o) {
    this.kHa?.Cancel();
    this.kHa = undefined;
    this.kHa = WaitEntityTask_1.WaitEntityTask.Create("PlayerFollowerFollowShooterHandler.WaitFollower", o, e => {
      this.kHa = undefined;
      if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && FollowUtils_1.FollowUtils.IsFollowShooter(e)) {
        this.FHa(o, e);
      }
    }, IFollow_1.WAIT_FOLLOWER_TIME, false, true);
  }
  FHa(e, o) {
    this.rzf = e;
    this.nzf(e, o);
  }
  async nzf(e, o) {
    var t = o.Entity?.GetComponent(235);
    if (t && (await t.LoadPromise?.Promise, o.Valid) && e === this.rzf && (this.OHa = o, this.xtg = t, this.bHa)) {
      t.Possessed();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerPossessed, o);
    }
  }
  NHa() {
    this.kHa?.Cancel();
    this.kHa = undefined;
    if (this.xtg && this.bHa) {
      this.xtg.UnPossessed();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed);
    }
    this.rzf = 0;
    this.OHa = undefined;
    this.xtg = undefined;
  }
  SetFollowShooterEnable(e, o, t = "") {
    if (this.xtg) {
      return this.xtg.SetEnable(e, o, t);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 72, "SetFollowShooterEnable: CurrentFollower is undefined", ["Reason", t], ["PlayerId", this.j8]);
      }
      return false;
    }
  }
  GetFollowShooter() {
    return this.OHa;
  }
  IsFollowShooterEnable() {
    return !!this.xtg?.GetEnable();
  }
  AddFollowShooterCustomEntityId(e, o) {
    ModelManager_1.ModelManager.BulletModel.SetCustomBulletAttacker(e, o);
  }
  RemoveFollowShooterCustomEntityId(e) {
    return ModelManager_1.ModelManager.BulletModel.RemoveCustomBulletAttacker(e);
  }
  GetFollowShooterCustomEntityId(e) {
    return ModelManager_1.ModelManager.BulletModel.GetCustomBulletAttacker(e);
  }
}
exports.PlayerFollowerFollowShooterHandler = PlayerFollowerFollowShooterHandler;
class PlayerFollowerFollowShooterHandlerFactory {
  Create(e) {
    return new PlayerFollowerFollowShooterHandler(e);
  }
}
exports.PlayerFollowerFollowShooterHandlerFactory = PlayerFollowerFollowShooterHandlerFactory;
exports.playerFollowerFollowShooterHandlerFactory = new PlayerFollowerFollowShooterHandlerFactory(); //# sourceMappingURL=PlayerFollowerFollowShooterHandler.js.map