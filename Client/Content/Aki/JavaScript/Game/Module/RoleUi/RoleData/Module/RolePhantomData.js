"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePhantomData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomDataBase_1 = require("../../../Phantom/PhantomBattle/Data/PhantomDataBase");
const RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RolePhantomData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments);
    this.PhantomMap = new Map();
    this.Hfi = false;
    this.NQ = new Map();
    this.Y1o = new Array();
  }
  RefreshPhantom(t, a) {
    this.PhantomMap.set(t, a);
  }
  SetIsTrial(t) {
    this.Hfi = t;
  }
  SetDataMap(t, a) {
    this.NQ.set(t, a);
  }
  GetDataMap() {
    if (!this.Hfi) {
      var e = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(this.RoleId).GetIncrIdList();
      if (e) {
        for (let t = 0, a = e.length; t < a; ++t) {
          var r = e[t];
          var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r);
          this.NQ.set(t, r);
        }
      }
    }
    return this.NQ;
  }
  GetIncrIdList() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(this.RoleId).GetIncrIdList();
  }
  GetDataByIndex(t) {
    return this.GetDataMap().get(t);
  }
  GetPhantomFettersData() {
    const s = new Array();
    this.GetPhantomFetterMap().forEach((t, r) => {
      t.forEach((t, a) => {
        var e = new PhantomDataBase_1.VisionFetterData();
        e.FetterGroupId = r;
        e.FetterId = a;
        e.NeedActiveNum = t;
        e.ActiveFetterGroupNum = t;
        e.ActiveState = true;
        s.push(e);
      });
    });
    return s;
  }
  GetPhantomFetterMap() {
    var t = this.J1o();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterMapResultBySuitMap(t);
  }
  GetPhantomFettersList() {
    var t = this.J1o();
    this.Y1o = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(t);
    return this.Y1o;
  }
  J1o() {
    var t = this.GetDataMap();
    const e = new Array();
    t.forEach((t, a) => {
      if (t) {
        e.push(t);
      }
    });
    return PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(e);
  }
  ClearPhantomFettersList() {
    this.Y1o.length = 0;
  }
}
exports.RolePhantomData = RolePhantomData;
//# sourceMappingURL=RolePhantomData.js.map