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
const GameCommand_1 = require("../../../../../../Utils/Command/GameCommand");
const ResponsibilityChain_1 = require("../../../../../../Utils/ResponsibilityChain/ResponsibilityChain");
const WaitEntityTask_1 = require("../../../../../../World/Define/WaitEntityTask");
const FollowFunctionLibrary_1 = require("./FollowFunctionLibrary");
const IFollow_1 = require("./IFollow");
class RegardAsFollowShooterHandler extends ResponsibilityChain_1.AbstractHandler {
  CanHandle(e) {
    return FollowFunctionLibrary_1.FollowFunctionLibrary.IsFollowShooter(e.EntityHandle);
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
    this.j8f = 0;
    this.bHa = undefined;
    this.j8 = 0;
    this.OHa = undefined;
    this.MHf = undefined;
    this.kHa = undefined;
    this.$8f = new PriorityQueue_1.PriorityQueue(IFollow_1.PlayerFollowerInfo.Compare);
    this.CommandInvoker = new GameCommand_1.CommandInvoker();
    this.j8 = e;
    this.bHa = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
  AddFollowerReceiver() {
    return {
      ReceiveExecute: e => {
        this.$8f.Push(e);
      }
    };
  }
  FlushFollowerReceiver() {
    return {
      ReceiveExecute: () => {
        var e;
        if (this.$8f.Empty) {
          this.NHa();
        } else {
          if ((e = this.$8f.Top).CreatureDataId !== this.j8f) {
            this.NHa();
            this.EHf(e.CreatureDataId);
          }
          this.$8f.Clear();
        }
      }
    };
  }
  HasFollower(e) {
    return this.j8f === e;
  }
  OnClear() {
    this.NHa();
    this.$8f.Clear();
  }
  EHf(o) {
    this.kHa?.Cancel();
    this.kHa = undefined;
    this.kHa = WaitEntityTask_1.WaitEntityTask.Create("PlayerFollowerFollowShooterHandler.WaitFollower", o, e => {
      this.kHa = undefined;
      if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && FollowFunctionLibrary_1.FollowFunctionLibrary.IsFollowShooter(e)) {
        this.FHa(o, e);
      }
    }, IFollow_1.WAIT_FOLLOWER_TIME, false, true);
  }
  FHa(e, o) {
    this.j8f = e;
    this.W8f(e, o);
  }
  async W8f(e, o) {
    var t = o.Entity?.GetComponent(234);
    if (t && (await t.LoadPromise?.Promise, o.Valid) && e === this.j8f && (this.OHa = o, this.MHf = t, this.bHa)) {
      t.Possessed();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerPossessed, o);
    }
  }
  NHa() {
    this.kHa?.Cancel();
    this.kHa = undefined;
    if (this.MHf && this.bHa) {
      this.MHf.UnPossessed();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed);
    }
    this.j8f = 0;
    this.OHa = undefined;
    this.MHf = undefined;
  }
  SetFollowShooterEnable(e, o = "") {
    if (this.MHf) {
      this.MHf?.SetEnable(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 72, "SetFollowShooterEnable: CurrentFollower is undefined", ["Reason", o], ["PlayerId", this.j8]);
    }
  }
  GetFollowShooter() {
    return this.OHa;
  }
  IsFollowShooterEnable() {
    return !!this.MHf?.GetEnable();
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