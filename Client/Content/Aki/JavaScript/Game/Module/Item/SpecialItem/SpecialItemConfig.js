"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItemConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById");
const SpecialItemById_1 = require("../../../../Core/Define/ConfigQuery/SpecialItemById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
class SpecialItemConfig extends ConfigBase_1.ConfigBase {
  GetConfig(e) {
    var a = ItemInfoById_1.configItemInfoById.GetConfig(e);
    if (a && a.SpecialItem) {
      a = SpecialItemById_1.configSpecialItemById.GetConfig(e);
      if (a) {
        return a;
      }
    }
  }
  GetAllowTagIds(e) {
    var a = SpecialItemById_1.configSpecialItemById.GetConfig(e);
    var o = new Array();
    for (const t of a.AllowTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
      if (r) {
        o.push(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 39, "特殊道具Tag不存在,请检查配置", ["configId", e], ["tagName", t]);
      }
    }
    return o;
  }
  GetBanTagIds(e) {
    var a = SpecialItemById_1.configSpecialItemById.GetConfig(e);
    var o = new Array();
    for (const t of a.BanTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
      if (r) {
        o.push(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 39, "特殊道具Tag不存在,请检查配置", ["configId", e], ["tagName", t]);
      }
    }
    return o;
  }
}
exports.SpecialItemConfig = SpecialItemConfig;
//# sourceMappingURL=SpecialItemConfig.js.map