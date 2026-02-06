"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRankData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorFightItemData_1 = require("./MotorFightItemData");
const HIGHEST_QUALITY = 5;
const LOWEST_QUALITY = 3;
class MotorFightRankData {
  constructor(t) {
    this.IsMyRank = t;
    this.Name = "";
    this.HasData = false;
    this.Score = 0;
    this.TexturePath = "";
    this.KillNum = 0;
    this.WaveNum = 0;
    this.BuffGateNum = 0;
    this.DisplayThreshold = 0;
    this.ItemNumMap = new Map();
    this.ItemList = [];
    this.UMc = (t, i) => {
      if (t.Type === i.Type) {
        if (t.Quality !== i.Quality) {
          return i.Quality - t.Quality;
        } else {
          return t.Id - i.Id;
        }
      }
      var e = this.ItemNumMap.get(t.Type);
      var r = this.ItemNumMap.get(i.Type);
      if (e.size !== r.size) {
        return r.size - e.size;
      }
      for (let t = HIGHEST_QUALITY; t >= LOWEST_QUALITY; t--) {
        var o = e.get(t) ?? 0;
        var a = r.get(t) ?? 0;
        if (o !== a) {
          return a - o;
        }
      }
      return t.Type - i.Type;
    };
  }
  SetDataByConfig(t) {
    var i;
    var e;
    var r = this.FUu(t.RoleId);
    this.Name = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name);
    this.TexturePath = r.FormationRoleCard;
    this.Score = t.Score;
    this.WaveNum = t.WaveNum;
    this.KillNum = t.KillNum;
    this.DisplayThreshold = t.DisplayThreshold;
    this.BuffGateNum = t.BuffGateNum;
    for ([i, e] of t.CollectionItem) {
      var o = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemConfig(i);
      var a = new MotorFightItemData_1.MotorFightItemData(o, e);
      this.ItemList.push(a);
      var a = this.ItemNumMap.get(o.Type) ?? new Map();
      a.set(o.Quality, (a.get(o.Type) ?? 0) + e);
      this.ItemNumMap.set(o.Type, a);
    }
    this.ItemList.sort(this.UMc);
    this.HasData = true;
  }
  SetDataByServerInfo(t) {
    if (t && t.Ffg.Yma !== 0) {
      this.Name = t.H8n;
      this.Score = t.Ffg.Yma;
      this.KillNum = t.Ffg.vDd;
      this.WaveNum = t.Ffg.jfg;
      this.BuffGateNum = t.Ffg.s3g;
      this.ItemList = [];
      for (const r of t.Ffg.bMs) {
        var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemConfig(r.L8n);
        var e = new MotorFightItemData_1.MotorFightItemData(i, r.m9n);
        this.ItemList.push(e);
        var e = this.ItemNumMap.get(i.Type) ?? new Map();
        e.set(i.Quality, (e.get(i.Type) ?? 0) + r.m9n);
        this.ItemNumMap.set(i.Type, e);
      }
      this.ItemList.sort(this.UMc);
      t = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightRoleConfig(t.Ffg.Q6n);
      if (t) {
        const o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t.TrialRole);
        const a = this.FUu(o.ParentId);
        this.TexturePath = a.FormationRoleCard;
        this.HasData = true;
      }
    } else {
      this.Name = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      t = ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.GetMotorFightActivityData().GetMotorFightRoleList()[0].TrialRoleId;
      const o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t);
      const a = this.FUu(o.ParentId);
      this.TexturePath = a.FormationRoleCard;
    }
  }
  FUu(t) {
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (i) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗排行榜角色数据异常", ["roleId", t]);
    }
  }
}
exports.MotorFightRankData = MotorFightRankData;
//# sourceMappingURL=MotorFightRankData.js.map