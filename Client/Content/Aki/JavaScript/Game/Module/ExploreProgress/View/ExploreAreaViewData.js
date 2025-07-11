"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaViewData = undefined;
class ExploreAreaViewData {
  constructor() {
    this.CountryId = 0;
    this.AreaId = 0;
    this.NameId = "";
    this.IsCountry = false;
    this.IsLock = true;
    this.Progress = 0;
  }
  RefreshCountry(s, t, i) {
    this.CountryId = s;
    this.AreaId = 0;
    this.NameId = t;
    this.IsLock = i;
    this.Progress = 0;
    this.IsCountry = true;
  }
  RefreshArea(s, t, i) {
    this.CountryId = 0;
    this.AreaId = s;
    this.NameId = t;
    this.IsLock = false;
    this.Progress = i;
    this.IsCountry = false;
  }
}
exports.ExploreAreaViewData = ExploreAreaViewData;
//# sourceMappingURL=ExploreAreaViewData.js.map