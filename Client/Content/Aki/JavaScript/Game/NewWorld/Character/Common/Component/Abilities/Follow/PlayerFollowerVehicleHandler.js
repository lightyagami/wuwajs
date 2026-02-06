"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerFollowerVehicleHandlerFactory = exports.PlayerFollowerVehicleHandlerFactory = exports.PlayerFollowerVehicleHandler = exports.RegardAsVehicleHandler = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ResponsibilityChain_1 = require("../../../../../../Utils/ResponsibilityChain/ResponsibilityChain");
const WaitEntityTask_1 = require("../../../../../../World/Define/WaitEntityTask");
const IFollow_1 = require("./IFollow");
class RegardAsVehicleHandler extends ResponsibilityChain_1.AbstractHandler {
  CanHandle(e) {
    return e.EntityHandle.EntityType === Protocol_1.Aki.Protocol.kks.HI_;
  }
  ExecuteProcessing(e) {
    e.OutPlayerFollowerHandlerType = IFollow_1.EPlayerFollowerHandlerType.Vehicle;
  }
  ShouldStop(e) {
    return false;
  }
  ExecuteStopping(e) {}
}
exports.RegardAsVehicleHandler = RegardAsVehicleHandler;
class PlayerFollowerVehicleHandler extends IFollow_1.PlayerFollowerSwallowHandler {
  constructor() {
    super(...arguments);
    this.szf = new Set();
    this.ktg = new Map();
    this.plg = new Map();
  }
  GetPlayerFollowVehicle(e) {
    for (const r of this.szf) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity?.GetComponent(0)?.GetPbEntityInitData();
      if (o) {
        if ((0, IComponent_1.getComponent)(o.ComponentsData, "BaseInfoComponent")?.Category.VehicleType === e) {
          return r;
        }
      }
    }
  }
  HasFollower(e) {
    return this.szf.has(e);
  }
  AddFollowerReceiver() {
    return {
      ReceiveExecute: o => {
        var e = WaitEntityTask_1.WaitEntityTask.Create("PlayerFollowerVehicleHandler.AddFollower", o.CreatureDataId, e => {
          this.ktg.delete(o.CreatureDataId);
          if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o.CreatureDataId))?.EntityType === Protocol_1.Aki.Protocol.kks.HI_) {
            this.szf.add(o.CreatureDataId);
            this.vlg(e);
          }
        }, IFollow_1.WAIT_FOLLOWER_TIME, false, true);
        if (e) {
          this.ktg.set(o.CreatureDataId, e);
        }
      }
    };
  }
  RemoveFollowerReceiver() {
    return {
      ReceiveExecute: e => {
        this.szf.delete(e);
        this.ylg(e);
        var o = this.ktg.get(e);
        if (o) {
          o.Cancel();
          this.ktg.delete(e);
        }
      }
    };
  }
  OnClear() {
    this.szf.clear();
    this.ktg.forEach(e => {
      e.Cancel();
    });
    this.ktg.clear();
  }
  vlg(e) {
    var o;
    if (e && (o = e?.Entity?.GetComponent(0)?.GetPbEntityInitData()) && (o = (0, IComponent_1.getComponent)(o.ComponentsData, "BaseInfoComponent")?.Category.VehicleType) && (this.plg.set(e.CreatureDataId, o), o === "Motorcycle")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetBattleUiChildCacheStateNotify, 0, true);
    }
  }
  ylg(e) {
    var o = this.plg.get(e);
    if (o) {
      if (o === "Motorcycle") {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetBattleUiChildCacheStateNotify, 0, false);
      }
      this.plg.delete(e);
    }
  }
}
exports.PlayerFollowerVehicleHandler = PlayerFollowerVehicleHandler;
class PlayerFollowerVehicleHandlerFactory {
  Create(e) {
    return new PlayerFollowerVehicleHandler();
  }
}
exports.PlayerFollowerVehicleHandlerFactory = PlayerFollowerVehicleHandlerFactory;
exports.playerFollowerVehicleHandlerFactory = new PlayerFollowerVehicleHandlerFactory(); //# sourceMappingURL=PlayerFollowerVehicleHandler.js.map