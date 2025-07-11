"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreLevelModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CountryExploreLevelData_1 = require("./CountryExploreLevelData");
class ExploreLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.uVt = new Map();
    this.ExploreScoreItemTexturePath = "";
  }
  OnInit() {
    for (const s of ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList()) {
      this.AddCountryExploreLevelData(s.Id);
    }
    var e = ConfigManager_1.ConfigManager.ExploreLevelConfig.GetExploreScoreConfigList();
    var r = ConfigManager_1.ConfigManager.AreaConfig;
    for (const i of e) {
      var o;
      var t;
      var a = i.Area;
      var n = r.GetAreaInfo(a).CountryId;
      var l = this.GetCountryExploreLevelData(n);
      let e = 0;
      for ([o, t] of i.Score) {
        l.AddExploreScoreData(a, o, e, t);
        e = o;
      }
    }
    this.ExploreScoreItemTexturePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconA_currency_5_UI");
    return true;
  }
  OnClear() {
    this.uVt.clear();
    return true;
  }
  AddCountryExploreLevelData(e) {
    var r = ConfigManager_1.ConfigManager.ExploreLevelConfig.GetExploreRewardListByCountry(e);
    var o = new CountryExploreLevelData_1.CountryExploreLevelData();
    o.Initialize(e, r);
    this.uVt.set(e, o);
    return o;
  }
  GetCountryExploreLevelData(e) {
    return this.uVt.get(e);
  }
  GetCurrentCountryExploreLevelData() {
    var e = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId();
    return this.GetCountryExploreLevelData(e);
  }
  SetCountryExploreLevel(e, r) {
    e = this.GetCountryExploreLevelData(e);
    if (e) {
      e.SetExploreLevel(r);
    }
  }
  SetCountryExploreScore(e, r) {
    e = this.GetCountryExploreLevelData(e);
    if (e) {
      e.SetExploreScore(r);
    }
  }
  SetCountryExploreScoreReceived(e, r, o) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    if (t && (t = t.CountryId, t = this.GetCountryExploreLevelData(t))) {
      t.SetExploreScoreDataReceived(e, r, o);
    }
  }
}
exports.ExploreLevelModel = ExploreLevelModel;
//# sourceMappingURL=ExploreLevelModel.js.map