"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDestroyFilterLogic = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CalabashDefine_1 = require("../../../../../Calabash/CalabashDefine");
const PhantomBattleConfig_1 = require("../../../../../Phantom/PhantomBattle/PhantomBattleConfig");
const SUBATTRIBUTEID = 23;
class VisionDestroyFilterLogic {
  static oDt(r, a, i = false) {
    var o = r.length;
    for (let e = 0; e < o; e++) {
      if (r[e].PhantomPropId === a) {
        if (i && r[e].IfPercentage) {
          return r[e].Value;
        }
        if (!i && !r[e].IfPercentage) {
          return r[e].Value;
        }
      }
    }
    return 0;
  }
}
(exports.VisionDestroyFilterLogic = VisionDestroyFilterLogic).GetPhantomRarity = e => {
  return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(e.GetConfigId()).PhantomItem.Rarity;
};
VisionDestroyFilterLogic.GetPhantomCost = e => {
  e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(e.GetUniqueId());
  return PhantomBattleConfig_1.COSTLIST.indexOf(e.GetCost());
};
VisionDestroyFilterLogic.GetPhantomQuality = e => {
  return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(e.GetConfigId()).PhantomItem.QualityId;
};
VisionDestroyFilterLogic.GetVisionDestroyFetterGroup = e => {
  e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(e.GetUniqueId());
  if (e) {
    return e.GetFetterGroupId();
  } else {
    return 0;
  }
};
VisionDestroyFilterLogic.GetVisionDestroyAttribute = (e, r) => {
  var a;
  var i;
  var o;
  var r = Array.from(r.keys());
  var t = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(e.GetUniqueId());
  let n = false;
  for (const s of r) {
    let e = 0;
    if ((e = s >= SUBATTRIBUTEID ? (a = t?.GetSubPropArray(), o = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionSubPercentageAttributeSortArray().includes(s), i = ModelManager_1.ModelManager.PhantomBattleModel.GetSubAttributeKey(s), VisionDestroyFilterLogic.oDt(a, i, o)) : (a = t?.GetMainPropArray(), i = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionMainPercentageAttributeSortArray().includes(s), o = ModelManager_1.ModelManager.PhantomBattleModel.GetMainAttributeKey(s), VisionDestroyFilterLogic.oDt(a, o, i))) > 0) {
      n = true;
      break;
    }
  }
  if (n) {
    return r;
  } else {
    return [0];
  }
};
VisionDestroyFilterLogic.GetPhantomDeprecate = e => {
  if (ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(e.GetUniqueId())?.GetIsDeprecated()) {
    return CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE;
  } else {
    return CalabashDefine_1.VISION_RECOVERT_FILTER_UNDEPERCATE;
  }
}; //# sourceMappingURL=VisionDestroyFilterLogic.js.map