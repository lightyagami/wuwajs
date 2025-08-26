"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InstanceDungeonEntranceAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceAll");
const InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const InstanceDungeonEntranceFlowAbyss_1 = require("./Define/InstanceDungeonEntranceFlowAbyss");
const InstanceDungeonEntranceFlowAttached_1 = require("./Define/InstanceDungeonEntranceFlowAttached");
const InstanceDungeonEntranceFlowFarmGold_1 = require("./Define/InstanceDungeonEntranceFlowFarmGold");
const InstanceDungeonEntranceFlowMowingRisk_1 = require("./Define/InstanceDungeonEntranceFlowMowingRisk");
const InstanceDungeonEntranceFlowNormal_1 = require("./Define/InstanceDungeonEntranceFlowNormal");
const InstanceDungeonEntranceFlowRoguelike_1 = require("./Define/InstanceDungeonEntranceFlowRoguelike");
const InstanceDungeonEntranceFlowSkipEditFormation_1 = require("./Define/InstanceDungeonEntranceFlowSkipEditFormation");
const InstanceDungeonEntranceFlowTowerDefence_1 = require("./Define/InstanceDungeonEntranceFlowTowerDefence");
const InstanceDungeonEntranceFlowTrapDefense_1 = require("./Define/InstanceDungeonEntranceFlowTrapDefense");
class InstanceDungeonEntranceConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.hhi = new Map();
    this.lhi = undefined;
    this.MXa = undefined;
  }
  get SXa() {
    if (!this.MXa) {
      this.MXa = new Map();
      for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList()) {
        for (const e of n.InstanceDungeonList) {
          this.MXa.set(e, n);
        }
      }
    }
    return this.MXa;
  }
  OnInit() {
    this.hhi.set(1, new InstanceDungeonEntranceFlowNormal_1.InstanceDungeonEntranceFlowNormal());
    this.hhi.set(2, new InstanceDungeonEntranceFlowSkipEditFormation_1.InstanceDungeonEntranceFlowSkipEditFormation());
    this.hhi.set(6, new InstanceDungeonEntranceFlowRoguelike_1.InstanceDungeonEntranceFlowRoguelike());
    this.hhi.set(8, new InstanceDungeonEntranceFlowTowerDefence_1.InstanceDungeonEntranceFlowTowerDefense());
    this.hhi.set(9, new InstanceDungeonEntranceFlowAttached_1.InstanceDungeonEntranceFlowAttached());
    this.hhi.set(10, new InstanceDungeonEntranceFlowFarmGold_1.InstanceDungeonEntranceFlowFarmGold());
    this.hhi.set(12, new InstanceDungeonEntranceFlowMowingRisk_1.InstanceDungeonEntranceFlowMowingRisk());
    this.hhi.set(13, new InstanceDungeonEntranceFlowAbyss_1.InstanceDungeonEntranceFlowAbyss());
    this.hhi.set(15, new InstanceDungeonEntranceFlowTrapDefense_1.InstanceDungeonEntranceFlowTrapDefense());
    return true;
  }
  GetConfig(n) {
    var e = InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.GetConfig(n);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口配置错误", ["id", n]);
    }
  }
  GetInstanceDungeonEntranceFlowId(n) {
    let e = this.GetConfig(n)?.FlowId;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口流程错误", ["flowId", e]);
      }
      e = 1;
    }
    return e;
  }
  GetInstanceDungeonEntranceFlow(n) {
    let e = this.GetConfig(n)?.FlowId;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口流程错误", ["flowId", e]);
      }
      e = 1;
    }
    return this.hhi.get(e);
  }
  OnEditBattleViewClose() {
    for (var [, n] of this.hhi) {
      n.OnEditBattleViewClose();
    }
  }
  GetEntranceIdByMarkId(n) {
    return this.GetEntranceMarkIdMap().get(n) ?? 0;
  }
  CheckMarkIdLinkDungeonEntrance(n) {
    return this.GetEntranceIdByMarkId(n) > 0;
  }
  CheckMarkIdIsTowerEntrance(n) {
    var n = this.GetEntranceMarkIdMap().get(n);
    return !!n && ((n = this.GetConfig(n))?.FlowId === 4 || n?.FlowId === 3 || n?.FlowId === 5);
  }
  CheckMarkIdIsShipTowerEntrance(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && this.GetConfig(n)?.FlowId === 11;
  }
  CheckMarkIdIsRoguelike(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && this.GetConfig(n)?.FlowId === 6;
  }
  CheckMarkIdIsRogueRes(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && this.GetConfig(n)?.FlowId === 14;
  }
  CheckInstanceIdIsTowerDefense(n) {
    n = this.SXa.get(n);
    return !!n && n.FlowId === 8;
  }
  GetEntranceIdByInstanceId(n) {
    var e = this.SXa.get(n);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 64, "未找到副本入口，请检查副本表配置，instanceId: " + n);
      }
      return 0;
    } else {
      return e.Id;
    }
  }
  GetEntranceMarkIdMap() {
    if (!this.lhi) {
      this.lhi = new Map();
      for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList()) {
        if (n.MarkId) {
          this.lhi.set(n.MarkId, n.Id);
        }
      }
    }
    return this.lhi;
  }
}
exports.InstanceDungeonEntranceConfig = InstanceDungeonEntranceConfig;
//# sourceMappingURL=InstanceDungeonEntranceConfig.js.map