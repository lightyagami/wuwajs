"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryLevelUpViewData = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const MingSuDefine_1 = require("./MingSuDefine");
class DarkCoastDeliveryLevelUpViewData {
  constructor(e, r) {
    this.PreLevel = 0;
    this.CurLevel = 0;
    this.PreLevel = e;
    this.CurLevel = r;
  }
  GetLevelTexture(e) {
    var r = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
    if (r === undefined) {
      return StringUtils_1.EMPTY_STRING;
    } else {
      return r.GetLevelTexturePath(e);
    }
  }
  GetLevelDataList() {
    var r = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
    if (r === undefined) {
      return [];
    }
    var i = [];
    for (let e = this.PreLevel + 1; e <= this.CurLevel; e++) {
      var t = r.GetLevelData(e);
      if (t !== undefined) {
        i.push(t);
      }
    }
    return i;
  }
}
exports.DarkCoastDeliveryLevelUpViewData = DarkCoastDeliveryLevelUpViewData;
//# sourceMappingURL=DarkCoastDeliveryLevelUpViewData.js.map