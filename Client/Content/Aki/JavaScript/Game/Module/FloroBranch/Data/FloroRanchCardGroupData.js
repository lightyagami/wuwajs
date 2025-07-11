"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardGroupData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
class FloroRanchCardGroupData {
  constructor(e) {
    this.Lo = undefined;
    this.Lo = e;
  }
  GetName() {
    return this.Lo.Name;
  }
  get Desc() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.Desc);
  }
  GetIcon() {
    return this.Lo.Icon;
  }
  GetQualityData() {
    var e = this.Lo.RarityId;
    return ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(e);
  }
  GetRaceId() {
    return this.Lo.Race;
  }
}
exports.FloroRanchCardGroupData = FloroRanchCardGroupData;
//# sourceMappingURL=FloroRanchCardGroupData.js.map