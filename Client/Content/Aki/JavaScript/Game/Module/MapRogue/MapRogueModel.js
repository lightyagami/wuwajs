"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const MapRogueDefine_1 = require("./MapRogueDefine");
const MapRogueOpChangeEvent_1 = require("./Op/MapRogueOpChangeEvent");
const MapRogueOpFallback_1 = require("./Op/MapRogueOpFallback");
const MapRogueOpGotoLevelPlay_1 = require("./Op/MapRogueOpGotoLevelPlay");
const MapRogueOpGridEvent_1 = require("./Op/MapRogueOpGridEvent");
const MapRogueOpGridFocus_1 = require("./Op/MapRogueOpGridFocus");
const MapRogueOpMove_1 = require("./Op/MapRogueOpMove");
const MapRogueOpRoleBuffBondLinkId_1 = require("./Op/MapRogueOpRoleBuffBondLinkId");
const MapRogueOpSelectView_1 = require("./Op/MapRogueOpSelectView");
const MapRogueOpShowView_1 = require("./Op/MapRogueOpShowView");
const MapRogueOpTeleport_1 = require("./Op/MapRogueOpTeleport");
const SeedRandomUtil_1 = require("./Utils/SeedRandomUtil");
class MapRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GameInfo = undefined;
    this.GameOpList = [];
    this.GameOpMap = new Map();
    this.v01 = 0;
    this.Zvc = 0;
    this.Yb1 = 0;
    this.nZu = (e, t) => t.Priority - e.Priority;
    this.mmu = false;
  }
  RefreshGameInfo(e) {
    this.GameInfo ||= new MapRogueDefine_1.MapRogueGameInfo();
    this.GameInfo.Refresh(e);
    this.v01 = e.CurrencyItemId;
    this.Zvc = e.RoleLevel;
    this.Yb1 = e.RoleMaxStar;
  }
  ResetGameInfo() {
    this.GameInfo?.Clear();
    this.GameInfo = undefined;
    this.GameOpList.length = 0;
  }
  GenerateOpList(e) {
    this.GameOpList.length = 0;
    for (const t of e) {
      this.AddOpData(t, false);
    }
    this.GameOpList.sort(this.nZu);
    this.PrintAllOpList();
  }
  PrintAllOpList() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 指令队列打印开始", ["InBattle", this.GameInfo?.InBattle]);
    }
    for (let e = 0; e < this.GameOpList.length; e++) {
      var t = this.GameOpList[e];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 指令", ["Index", e], ["Data", t.ToString()]);
      }
    }
  }
  AddOpData(e, t = true) {
    let o = undefined;
    switch (e.OEc) {
      case Protocol_1.Aki.Protocol.OEc.TJ_:
        o = new MapRogueOpMove_1.MapRogueOpMove(this.GameInfo?.PlayerGridIndex ?? 0);
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_ShowView:
        o = new MapRogueOpShowView_1.MapRogueOpShowView();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_SelectView:
        o = new MapRogueOpSelectView_1.MapRogueOpSelectView();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_GridEvent:
        o = new MapRogueOpGridEvent_1.MapRogueOpGridEvent();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_RogueGotoLevelPlay:
        o = new MapRogueOpGotoLevelPlay_1.MapRogueOpGotoLevelPlay();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_RollBuffBondLinkId:
        o = new MapRogueOpRoleBuffBondLinkId_1.MapRogueOpRoleBuffBondLinkId();
        break;
      case Protocol_1.Aki.Protocol.OEc.oR1:
        o = new MapRogueOpFallback_1.MapRogueOpFallback();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_LightBlockByLocationEffect:
        o = new MapRogueOpGridFocus_1.MapRogueOpGridFocus();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_MapTeleportByLocationEffect:
        o = new MapRogueOpTeleport_1.MapRogueOpTeleport();
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_ChangeEventByPos:
        o = new MapRogueOpChangeEvent_1.MapRogueOpChangeEvent();
    }
    if (o && (o.Update(e, this.GameInfo), this.GameOpList.push(o), this.GameOpMap.set(e.w5n, o), t && this.GameOpList.sort(this.nZu), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 新增指令", ["Index", this.GameOpList.length - 1], ["Data", o.ToString()]);
    }
  }
  RemoveOpData(t) {
    var e;
    if (this.GameInfo && (e = this.GameOpMap.get(t)) && (e.Delete(this.GameInfo), (e = this.GameOpList.findIndex(e => e.IncId === t)) !== -1 && this.GameOpList.splice(e, 1), this.GameOpMap.delete(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 删除指令", ["Index", e], ["IncId", t]);
    }
  }
  UpdateOpData(e) {
    var t = this.GameOpMap.get(e.w5n);
    if (t && (t.Update(e, this.GameInfo), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 更新指令", ["Data", t.ToString()]);
    }
  }
  GetOpData(e) {
    return this.GameOpMap.get(e);
  }
  GetAllOpData() {
    return this.GameOpList;
  }
  GetOpDataByType(t) {
    return this.GameOpList.filter(e => e.Type === t);
  }
  ExecuteOpData(e, t) {
    if (this.GameInfo) {
      this.GameOpMap.get(e)?.Execute(this.GameInfo, t);
    }
  }
  ExecuteOpDataList() {
    var e;
    if (this.GameInfo) {
      if (this.GameOpList.length > 0) {
        e = this.GameOpList[this.GameOpList.length - 1];
        this.GameInfo.GameStage = 2;
        e.StartExecute(this.GameInfo);
      } else {
        this.GameInfo.GameStage = 1;
      }
    }
  }
  CreateMapGridDataList(t, e) {
    var o = new SeedRandomUtil_1.SeedRandomUtil();
    o.SetSeed(e);
    var a = [];
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      var i = new MapRogueDefine_1.MapGridData();
      i.RefreshByServer(r);
      i.GridIndex = e;
      this.JGc(i, o);
      a.push(i);
    }
    return a;
  }
  RefreshMapGridData(e, t) {
    var o;
    var a;
    var r = this.GameInfo.MapGrids.at(e);
    if (r) {
      o = r.GridTypeId;
      a = r.IsExplore;
      r.RefreshByServer(t);
      if (o !== r.GridTypeId) {
        (t = new SeedRandomUtil_1.SeedRandomUtil()).SetSeed(this.GameInfo.RandomSeed);
        this.JGc(r, t);
      }
      this.GameInfo.RefreshGrid(e, a !== r.IsExplore);
    }
  }
  JGc(e, t) {
    var o;
    var a = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(e.GridTypeId);
    if (a) {
      o = Array.from(a.GroundPath.values());
      e.GroundPathIndex = t.WeightedRandom(o);
      if ((o = a.DecorationPath) && o.size > 0) {
        a = Array.from(o.values());
        e.ExtraPathIndex = t.WeightedRandom(a);
      } else {
        e.ExtraPathIndex = -1;
      }
    }
  }
  ShiftGetItemData() {
    if (this.GameInfo) {
      return this.GameInfo.ShiftGetItemData();
    }
  }
  GetRogueCurrencyItemId() {
    return this.v01;
  }
  GetRogueRoleLevel() {
    return this.Zvc;
  }
  SetRoleLevel(e) {
    this.Zvc = e;
  }
  GetRogueRoleMaxStar() {
    return this.Yb1;
  }
  GetExploredGridCount() {
    let e = 0;
    for (const t of this.GameInfo.MapGrids) {
      e += t.IsExplore ? 1 : 0;
    }
    return e;
  }
  SetDebugMode(e) {
    this.mmu = e;
  }
}
exports.MapRogueModel = MapRogueModel;
//# sourceMappingURL=MapRogueModel.js.map