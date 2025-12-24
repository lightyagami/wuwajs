"use strict";

var PlayerFollowableComponent_1;
var __decorate = this && this.__decorate || function (e, o, l, r) {
  var t;
  var a = arguments.length;
  var n = a < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, l) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, o, l, r);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (t = e[i]) {
        n = (a < 3 ? t(n) : a > 3 ? t(o, l, n) : t(o, l)) || n;
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
const FollowFunctionLibrary_1 = require("./FollowFunctionLibrary");
const IFollow_1 = require("./IFollow");
const PlayerFollowerFollowShooterHandler_1 = require("./PlayerFollowerFollowShooterHandler");
const PlayerFollowerVehicleHandler_1 = require("./PlayerFollowerVehicleHandler");
const getHandlerTypeChain = new PlayerFollowerFollowShooterHandler_1.RegardAsFollowShooterHandler();
getHandlerTypeChain.SetNext(new PlayerFollowerVehicleHandler_1.RegardAsVehicleHandler());
let PlayerFollowableComponent = PlayerFollowableComponent_1 = class PlayerFollowableComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qHa = undefined;
    this.N8f = undefined;
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
    if (this.N8f?.has(e)) {
      return this.N8f.get(e);
    }
    var o = PlayerFollowableComponent_1.H8f.get(e);
    if (o) {
      o = o.Create(this.j8);
      if (o) {
        this.N8f?.set(e, o);
        return o;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 72, "[PlayerFollowableComponent] UpdatePlayerFollowers handler工厂旷工", ["HandlerType", e]);
    }
  }
  OnInitData() {
    super.OnInitData();
    this.qHa = new Map();
    this.N8f = new Map();
    this.CommandInvoker = new GameCommand_1.CommandInvoker();
    var e = this.Entity.CheckGetComponent(0);
    this.j8 = e?.GetPlayerId() ?? 0;
    for (const o of PlayerFollowableComponent_1.H8f.keys()) {
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
    if (this.N8f) {
      for (const e of this.N8f.values()) {
        e.OnClear();
      }
    }
    this.CommandInvoker?.ClearAllCommand();
    this.CommandInvoker = undefined;
    this.N8f?.clear();
    this.N8f = undefined;
    return super.OnClear();
  }
  UpdatePlayerFollowers(e) {
    if (this.qHa && this.N8f) {
      this.CommandInvoker?.ClearAllCommand();
      for (const s of e) {
        var o = MathUtils_1.MathUtils.LongToNumber(s.F4n);
        if (o <= 0) {
          if (this.qHa.has(s.h5n)) {
            var l = this.qHa.get(s.h5n);
            this.qHa.delete(s.h5n);
            var r = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(l);
            for (const h of this.N8f.values()) {
              r.AddReceiver(h.RemoveFollowerReceiver());
            }
            this.CommandInvoker?.SubmitCommand(r, false);
          }
        } else {
          this.qHa.set(s.h5n, o);
        }
      }
      for (var [t, a] of this.qHa) {
        var t = IFollow_1.playerFollowerPriority.get(t);
        var n = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(new IFollow_1.PlayerFollowerInfo(a, t));
        for (const w of this.N8f.values()) {
          n.AddReceiver(w.AddFollowerReceiver());
        }
        this.CommandInvoker?.SubmitCommand(n, false);
      }
      var i = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers();
      for (const F of this.N8f.values()) {
        i.AddReceiver(F.FlushFollowerReceiver());
      }
      this.CommandInvoker?.SubmitCommand(i, false);
      this.CommandInvoker?.ExecuteAllCommand();
    }
  }
  GetFollower() {
    return FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowShooter(this.j8);
  }
  IsFollowerEnable() {
    return FollowFunctionLibrary_1.FollowFunctionLibrary.IsFollowShooterEnable(this.j8);
  }
  SetFollowerEnable(e) {
    FollowFunctionLibrary_1.FollowFunctionLibrary.SetPlayerFollowShooterEnable(this.j8, e);
  }
};
PlayerFollowableComponent.H8f = new Map([[IFollow_1.EPlayerFollowerHandlerType.FollowShooter, PlayerFollowerFollowShooterHandler_1.playerFollowerFollowShooterHandlerFactory], [IFollow_1.EPlayerFollowerHandlerType.Vehicle, PlayerFollowerVehicleHandler_1.playerFollowerVehicleHandlerFactory]]);
PlayerFollowableComponent = PlayerFollowableComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(237)], PlayerFollowableComponent);
exports.PlayerFollowableComponent = PlayerFollowableComponent; //# sourceMappingURL=PlayerFollowableComponent.js.map