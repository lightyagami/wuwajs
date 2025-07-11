"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceConfig = undefined;
const CountryAll_1 = require("../../../../Core/Define/ConfigQuery/CountryAll");
const CountryById_1 = require("../../../../Core/Define/ConfigQuery/CountryById");
const InfluenceAll_1 = require("../../../../Core/Define/ConfigQuery/InfluenceAll");
const InfluenceById_1 = require("../../../../Core/Define/ConfigQuery/InfluenceById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceConfig extends ConfigBase_1.ConfigBase {
  GetCountriesByIds(r) {
    if (r.length > 0) {
      var t = new Array();
      for (let e = 0, n = r.length; e < n; ++e) {
        var u = CountryById_1.configCountryById.GetConfig(r[e]);
        t.push(u);
      }
      t.sort((e, n) => e.Id - n.Id);
      return t;
    }
    return [];
  }
  GetCountryList() {
    return CountryAll_1.configCountryAll.GetConfigList().filter(e => e.Id !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID && e.Id !== InfluenceReputationDefine_1.NO_COUNTRY_ID);
  }
  GetCountryConfig(e) {
    e = CountryById_1.configCountryById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetCountryInfluence(e) {
    var n = new Array();
    if (e === 0) {
      var r = this.GetInfluenceConfig(0);
      n.push(r);
    } else {
      var t = this.GetCountryConfig(e);
      if (t.Influences.length === 0) {
        var u = InfluenceAll_1.configInfluenceAll.GetConfigList();
        for (let e = 0; e < u.length; e++) {
          n.push(u[e]);
        }
      } else {
        for (let e = 0; e < t.Influences.length; e++) {
          var i = this.GetInfluenceConfig(t.Influences[e]);
          n.push(i);
        }
      }
    }
    return n;
  }
  GetCountryTitle(e) {
    e = this.GetCountryConfig(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title);
    } else {
      return "";
    }
  }
  GetInfluenceConfig(e) {
    e = InfluenceById_1.configInfluenceById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetInfluenceTitle(e) {
    e = this.GetInfluenceConfig(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title);
    } else {
      return "";
    }
  }
  GetInfluenceIfShowInDailyTask(e) {
    e = this.GetInfluenceConfig(e);
    return !!e && e.DailyTaskShow === 1;
  }
  GetCountryIfShowInDailyTask(e) {
    e = this.GetCountryConfig(e);
    return !!e && e.DailyTaskShow === 1;
  }
}
exports.InfluenceConfig = InfluenceConfig;
//# sourceMappingURL=InfluenceConfig.js.map