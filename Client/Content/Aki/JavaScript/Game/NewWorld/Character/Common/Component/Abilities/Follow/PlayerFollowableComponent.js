"use strict";

var PlayerFollowableComponent_1;
var __decorate = this && this.__decorate || function (e, o, l, t) {
  var r;
  var a = arguments.length;
  var n = a < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, l) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, o, l, t);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        n = (a < 3 ? r(n) : a > 3 ? r(o, l, n) : r(o, l)) || n;
      }
    }
  }
  if (a > 3 && n) {
    Object.defineProperty(o, l, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerFollowableComponent = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GameCommand_1 = require("../../../../../../Utils/Command/GameCommand");
const FollowUtils_1 = require("./FollowUtils");
const IFollow_1 = require("./IFollow");
const PlayerFollowerFollowShooterHandler_1 = require("./PlayerFollowerFollowShooterHandler");
const PlayerFollowerVehicleHandler_1 = require("./PlayerFollowerVehicleHandler");
const getHandlerTypeChain = new PlayerFollowerFollowShooterHandler_1.RegardAsFollowShooterHandler();
getHandlerTypeChain.SetNext(new PlayerFollowerVehicleHandler_1.RegardAsVehicleHandler());
let PlayerFollowableComponent = PlayerFollowableComponent_1 = class PlayerFollowableComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qHa = undefined;
    this.ezf = undefined;
    this.j8 = 0;
    this.CommandInvoker = undefined;
  }
  GetOrCreateHandlerByCreatureDataId(e) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (o) {
      o = new IFollow_1.EntityHandleParameterContext(o);
      getHandlerTypeChain.Handle(o);
      if (o.OutPlayerFollowerHandlerType !== undefined) {
        return this.GetOrCreateHandler(o.OutPlayerFollowerHandlerType);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 72, "[PlayerFollowableComponent] UpdatePlayerFollowers 无handler类型", ["CreatureDataId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 72, "[PlayerFollowableComponent] UpdatePlayerFollowers 无实体Handle", ["CreatureDataId", e]);
    }
  }
  GetOrCreateHandler(e) {
    if (this.ezf?.has(e)) {
      return this.ezf.get(e);
    }
    var o = PlayerFollowableComponent_1.izf.get(e);
    if (o) {
      o = o.Create(this.j8);
      if (o) {
        this.ezf?.set(e, o);
        return o;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 72, "[PlayerFollowableComponent] UpdatePlayerFollowers handler工厂旷工", ["HandlerType", e]);
    }
  }
  OnInitData() {
    super.OnInitData();
    this.qHa = new Map();
    this.ezf = new Map();
    this.CommandInvoker = new GameCommand_1.CommandInvoker();
    var e = this.Entity.CheckGetComponent(0);
    this.j8 = e?.GetPlayerId() ?? 0;
    for (const o of PlayerFollowableComponent_1.izf.keys()) {
      this.GetOrCreateHandler(o);
    }
    e = e?.PlayerFollowersInfo?.OI_;
    if (e) {
      this.UpdatePlayerFollowers(e);
    }
    return true;
  }
  OnClear() {
    this.qHa?.clear();
    this.qHa = undefined;
    if (this.ezf) {
      for (const e of this.ezf.values()) {
        e.OnClear();
      }
    }
    this.CommandInvoker?.ClearAllCommand();
    this.CommandInvoker = undefined;
    this.ezf?.clear();
    this.ezf = undefined;
    return super.OnClear();
  }
  UpdatePlayerFollowers(e) {
    if (this.qHa && this.ezf) {
      this.CommandInvoker?.ClearAllCommand();
      for (const s of e) {
        var o = MathUtils_1.MathUtils.LongToNumber(s.F4n);
        if (o <= 0) {
          if (this.qHa.has(s.h5n)) {
            var l = this.qHa.get(s.h5n);
            this.qHa.delete(s.h5n);
            var t = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(l);
            for (const h of this.ezf.values()) {
              t.AddReceiver(h.RemoveFollowerReceiver());
            }
            this.CommandInvoker?.SubmitCommand(t, false);
          }
        } else {
          this.qHa.set(s.h5n, o);
        }
      }
      for (var [r, a] of this.qHa) {
        var r = IFollow_1.playerFollowerPriority.get(r);
        var n = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(new IFollow_1.PlayerFollowerInfo(a, r));
        for (const w of this.ezf.values()) {
          n.AddReceiver(w.AddFollowerReceiver());
        }
        this.CommandInvoker?.SubmitCommand(n, false);
      }
      var i = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers();
      for (const d of this.ezf.values()) {
        i.AddReceiver(d.FlushFollowerReceiver());
      }
      this.CommandInvoker?.SubmitCommand(i, false);
      this.CommandInvoker?.ExecuteAllCommand();
    }
  }
  GetFollowerCreatureDataId(e) {
    return this.qHa?.get(e) ?? 0;
  }
  GetFollower() {
    return FollowUtils_1.FollowUtils.GetPlayerFollowShooter(this.j8);
  }
  IsFollowerEnable() {
    return FollowUtils_1.FollowUtils.IsFollowShooterEnable(this.j8);
  }
  SetFollowerEnable(e) {
    FollowUtils_1.FollowUtils.SetPlayerFollowShooterEnable(this.j8, e);
  }
};
PlayerFollowableComponent.izf = new Map([[IFollow_1.EPlayerFollowerHandlerType.FollowShooter, PlayerFollowerFollowShooterHandler_1.playerFollowerFollowShooterHandlerFactory], [IFollow_1.EPlayerFollowerHandlerType.Vehicle, PlayerFollowerVehicleHandler_1.playerFollowerVehicleHandlerFactory]]);
PlayerFollowableComponent = PlayerFollowableComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(237)], PlayerFollowableComponent);
exports.PlayerFollowableComponent = PlayerFollowableComponent; //# sourceMappingURL=PlayerFollowableComponent.js.map