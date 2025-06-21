"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  MapRogueDefine_1 = require("./MapRogueDefine"),
  MapRogueOpFallback_1 = require("./Op/MapRogueOpFallback"),
  MapRogueOpGotoLevelPlay_1 = require("./Op/MapRogueOpGotoLevelPlay"),
  MapRogueOpGridEvent_1 = require("./Op/MapRogueOpGridEvent"),
  MapRogueOpGridFocus_1 = require("./Op/MapRogueOpGridFocus"),
  MapRogueOpMove_1 = require("./Op/MapRogueOpMove"),
  MapRogueOpRoleBuffBondLinkId_1 = require("./Op/MapRogueOpRoleBuffBondLinkId"),
  MapRogueOpSelectView_1 = require("./Op/MapRogueOpSelectView"),
  MapRogueOpShowView_1 = require("./Op/MapRogueOpShowView"),
  MapRogueOpTeleport_1 = require("./Op/MapRogueOpTeleport"),
  SeedRandomUtil_1 = require("./Utils/SeedRandomUtil");
class MapRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.GameInfo = void 0, this.GameOpList = [], this.GameOpMap = new Map, this.YC1 = 0, this.Zvc = 0, this.Ib1 = 0, this.Eau = !1
  }
  RefreshGameInfo(e) {
    this.GameInfo || (this.GameInfo = new MapRogueDefine_1.MapRogueGameInfo), this.GameInfo.Refresh(e), this.YC1 = e.CurrencyItemId, this.Zvc = e.RoleLevel, this.Ib1 = e.RoleMaxStar
  }
  ResetGameInfo() {
    this.GameInfo?.Clear(), this.GameInfo = void 0, this.GameOpList.length = 0
  }
  GenerateOpList(e) {
    this.GameOpList.length = 0;
    for (const o of e) this.AddOpData(o);
    this.PrintAllOpList()
  }
  PrintAllOpList() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 指令队列打印开始", ["InBattle", this.GameInfo?.InBattle]);
    for (let e = 0; e < this.GameOpList.length; e++) {
      var o = this.GameOpList[e];
      Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 指令", ["Index", e], ["Data", o.ToString()])
    }
  }
  AddOpData(e) {
    let o = void 0;
    switch (e.OEc) {
      case Protocol_1.Aki.Protocol.OEc.TJ_:
        o = new MapRogueOpMove_1.MapRogueOpMove(this.GameInfo?.PlayerGridIndex ?? 0);
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_ShowView:
        o = new MapRogueOpShowView_1.MapRogueOpShowView;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_SelectView:
        o = new MapRogueOpSelectView_1.MapRogueOpSelectView;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_GridEvent:
        o = new MapRogueOpGridEvent_1.MapRogueOpGridEvent;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_RogueGotoLevelPlay:
        o = new MapRogueOpGotoLevelPlay_1.MapRogueOpGotoLevelPlay;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_RollBuffBondLinkId:
        o = new MapRogueOpRoleBuffBondLinkId_1.MapRogueOpRoleBuffBondLinkId;
        break;
      case Protocol_1.Aki.Protocol.OEc.xb1:
        o = new MapRogueOpFallback_1.MapRogueOpFallback;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_LightBlockByLocationEffect:
        o = new MapRogueOpGridFocus_1.MapRogueOpGridFocus;
        break;
      case Protocol_1.Aki.Protocol.OEc.Proto_MapTeleportByLocationEffect:
        o = new MapRogueOpTeleport_1.MapRogueOpTeleport
    }
    o && (o.Update(e, this.GameInfo), this.GameOpList.push(o), this.GameOpMap.set(e.w5n, o), Log_1.Log.CheckInfo()) && Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 新增指令", ["Index", this.GameOpList.length - 1], ["Data", o.ToString()])
  }
  RemoveOpData(o) {
    var e;
    this.GameInfo && (e = this.GameOpMap.get(o)) && (e.Delete(this.GameInfo), -1 !== (e = this.GameOpList.findIndex(e => e.IncId === o)) && this.GameOpList.splice(e, 1), this.GameOpMap.delete(o), Log_1.Log.CheckInfo()) && Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 删除指令", ["Index", e], ["IncId", o])
  }
  UpdateOpData(e) {
    var o = this.GameOpMap.get(e.w5n);
    o && (o.Update(e, this.GameInfo), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 更新指令", ["Data", o.ToString()])
  }
  GetOpData(e) {
    return this.GameOpMap.get(e)
  }
  GetAllOpData() {
    return this.GameOpList
  }
  ExecuteOpData(e, o) {
    this.GameInfo && this.GameOpMap.get(e)?.Execute(this.GameInfo, o)
  }
  ExecuteOpDataList() {
    var e;
    this.GameInfo && (0 < this.GameOpList.length ? (e = this.GameOpList[this.GameOpList.length - 1], this.GameInfo.GameStage = 2, e.StartExecute(this.GameInfo)) : this.GameInfo.GameStage = 1)
  }
  CreateMapGridDataList(o, e) {
    var t = new SeedRandomUtil_1.SeedRandomUtil,
      a = (t.SetSeed(e), []);
    for (let e = 0; e < o.length; e++) {
      var r = o[e],
        i = new MapRogueDefine_1.MapGridData;
      i.RefreshByServer(r), i.GridIndex = e, this.JGc(i, t), a.push(i)
    }
    return a
  }
  RefreshMapGridData(e, o) {
    var t, a, r = this.GameInfo.MapGrids.at(e);
    r && (t = r.GridTypeId, a = r.IsExplore, r.RefreshByServer(o), t !== r.GridTypeId && ((o = new SeedRandomUtil_1.SeedRandomUtil).SetSeed(this.GameInfo.RandomSeed), this.JGc(r, o)), this.GameInfo.RefreshGrid(e, a !== r.IsExplore))
  }
  JGc(e, o) {
    var t, a = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(e.GridTypeId);
    a && (t = Array.from(a.GroundPath.values()), e.GroundPathIndex = o.WeightedRandom(t), (t = a.DecorationPath) && 0 < t.size ? (a = Array.from(t.values()), e.ExtraPathIndex = o.WeightedRandom(a)) : e.ExtraPathIndex = -1)
  }
  ShiftGetItemData() {
    if (this.GameInfo) return this.GameInfo.ShiftGetItemData()
  }
  GetRogueCurrencyItemId() {
    return this.YC1
  }
  GetRogueRoleLevel() {
    return this.Zvc
  }
  SetRoleLevel(e) {
    this.Zvc = e
  }
  GetRogueRoleMaxStar() {
    return this.Ib1
  }
  GetExploredGridCount() {
    let e = 0;
    for (const o of this.GameInfo.MapGrids) e += o.IsExplore ? 1 : 0;
    return e
  }
  SetDebugMode(e) {
    this.Eau = e
  }
}
exports.MapRogueModel = MapRogueModel;
//# sourceMappingURL=MapRogueModel.js.map