"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestUtil = undefined;
const ue_1 = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("../Map/MapDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
class QuestUtil {
  static SetTrackDistanceText(e, r) {
    if (!e || !ObjectUtils_1.ObjectUtils.IsValid(e)) {
      return false;
    }
    if (!r) {
      return false;
    }
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!t) {
      return false;
    }
    let i = 0;
    i = r instanceof Vector_1.Vector ? Vector_1.Vector.Dist(r, t) * MapDefine_1.FLOAT_0_01 : ue_1.Vector.Dist(r, t.ToUeVectorOld()) * MapDefine_1.FLOAT_0_01;
    i = Math.round(i);
    var r = r.Z - t.Z;
    var t = i.toString();
    LguiUtil_1.LguiUtil.SetLocalText(e, "Meter", t);
    let a = e.GetText();
    if (r > 300) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowUp");
      a += `<texture=${t}/>`;
    } else if (r < -300) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowDown");
      a += `<texture=${t}/>`;
    }
    e.SetText(a);
    return true;
  }
  static GetQuestMarkId(e, r) {
    if (r) {
      r = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfigByQuestId(r);
      if (r) {
        return r.MarkId;
      }
    }
    return ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(e);
  }
}
exports.QuestUtil = QuestUtil;
//# sourceMappingURL=QuestUtil.js.map