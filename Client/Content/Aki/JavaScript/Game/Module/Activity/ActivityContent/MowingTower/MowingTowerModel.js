"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerModel = exports.MowingTowerTeamInfo = exports.MowingTowerBuffInfo = exports.MowingTowerRoleInfo = undefined;
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class MowingTowerRoleInfo {
  constructor() {
    this.RoleId = 0;
    this.Slot = 0;
  }
}
exports.MowingTowerRoleInfo = MowingTowerRoleInfo;
class MowingTowerBuffInfo {
  constructor() {
    this.BuffId = 0;
    this.Slot = 0;
    this.ChangeAble = true;
  }
}
exports.MowingTowerBuffInfo = MowingTowerBuffInfo;
class MowingTowerTeamInfo {
  constructor() {
    this.ActivityId = 0;
    this.uyn = undefined;
    this.tyn = [];
    this.cyn = [];
    this.myn = [];
    this.YLl = [];
    this.zLl = [];
    this.LevelInfo = undefined;
  }
  GetCurrentSelectLevel() {
    return this.uyn;
  }
  GetCurrentSelectBuff() {
    return this.tyn;
  }
  GetPrepareSelectBuff() {
    return this.myn;
  }
  GetCurrentTeamMembers() {
    return [this.YLl, this.zLl];
  }
  SetCurrentSelectLevel(e) {
    this.uyn = e;
  }
  InitLevelBuff(e, t) {
    this.tyn = [];
    for (const r of e) {
      const e = new MowingTowerBuffInfo();
      e.BuffId = r.BuffId;
      e.Slot = r.Slot;
      e.ChangeAble = r.ChangeAble;
      this.tyn.push(e);
    }
    for (const s of e) {
      if (s.BuffId > 0) {
        this.cyn.push(s);
      }
    }
    for (const o of t) {
      if (o.BuffId > 0) {
        this.cyn.push(o);
      }
    }
  }
  GetIndexBuff(e) {
    if (!(e >= this.tyn.length)) {
      return this.tyn[e];
    }
  }
  GetOptionBuff() {
    var e = [];
    for (const t of this.cyn) {
      if ((t.BuffId > 0 || t.Slot < 0) && e.findIndex(e => e.BuffId === t.BuffId) === -1) {
        e.push(t);
      }
    }
    return e;
  }
  InitPrepareSelectBuff() {
    this.myn = [];
    for (const e of this.tyn) {
      this.myn.push(e);
    }
  }
  SetIndexPrepareSelectBuff(e, t) {
    this.myn[e] = t;
  }
  GetIndexPrepareSelectBuff(e) {
    return this.myn[e];
  }
  SetPrepareSelectBuff(e) {
    this.myn = [];
    for (const t of e) {
      this.myn.push(t);
    }
  }
  GetBuffMaxCount() {
    return this.tyn.length;
  }
  SetIndexTeamMembers(e, t, r) {
    if (e === 0) {
      this.SetIndexFirstTeamMembers(t, r);
    } else if (e === 1) {
      this.SetIndexLowTeamMembers(t, r);
    }
  }
  SetIndexFirstTeamMembers(e, t) {
    if (this.YLl.length <= e) {
      this.YLl.push(t);
    } else {
      this.YLl[e] = t;
    }
  }
  SetIndexLowTeamMembers(e, t) {
    if (this.zLl.length <= e) {
      this.zLl.push(t);
    } else {
      this.zLl[e] = t;
    }
  }
  ReSortTeamMembers(e) {
    if (e === 0) {
      this.ReSortFirstTeamMembers();
    } else if (e === 1) {
      this.ReSortLowTeamMembers();
    }
  }
  ReSortFirstTeamMembers() {
    var t = [];
    for (const e of this.YLl) {
      if (e > 0) {
        t.push(e);
      }
    }
    for (let e = t.length; e < this.YLl.length; e++) {
      t.push(0);
    }
    this.YLl = t;
  }
  ReSortLowTeamMembers() {
    var t = [];
    for (const e of this.zLl) {
      if (e > 0) {
        t.push(e);
      }
    }
    for (let e = t.length; e < this.zLl.length; e++) {
      t.push(0);
    }
    this.zLl = t;
  }
  SetCurrentTeamMembers(e, t) {
    this.YLl = e;
    this.zLl = t;
  }
  GetRecommendLevel() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(this.LevelInfo.GetConfig().InstIds[0], ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
  }
  GetIfLevelTooLow() {
    let e = 0;
    let t = 0;
    for (const i of this.YLl) {
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
      if (r) {
        e += r.GetLevelData().GetLevel();
        t++;
      }
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
      if (r) {
        e += r.GetLevelData().GetLevel();
        t++;
      }
    }
    var s = e / t;
    if (s < this.GetRecommendLevel() && s != 0) {
      return true;
    }
    for (const n of this.zLl) {
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(n);
      if (o) {
        e += o.GetLevelData().GetLevel();
        t++;
      }
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
      if (o) {
        e += o.GetLevelData().GetLevel();
        t++;
      }
    }
    s = e / t;
    return s < this.GetRecommendLevel() && s != 0;
  }
  Clear() {
    this.tyn = [];
    this.YLl = [];
    this.zLl = [];
  }
}
exports.MowingTowerTeamInfo = MowingTowerTeamInfo;
class MowingTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentSelectLevelDetailData = undefined;
    this.CurrentTeamInfo = undefined;
    this.PlayBackAnimation = false;
    this.CurrentSelectActivityId = 0;
    this.CurrentOptionArea = -1;
    this.OtherHalfAreaRoleList = [];
    this.AddLevel = [-1, -1];
  }
  IsOpenMowingTowerFormation() {
    return this.CurrentOptionArea !== -1;
  }
}
exports.MowingTowerModel = MowingTowerModel;
//# sourceMappingURL=MowingTowerModel.js.map