"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestUtil = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
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
    var a = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!a) {
      return false;
    }
    let i = 0;
    i = r instanceof Vector_1.Vector ? Vector_1.Vector.Dist(r, a) * MapDefine_1.FLOAT_0_01 : ue_1.Vector.Dist(r, a.ToUeVectorOld()) * MapDefine_1.FLOAT_0_01;
    i = Math.round(i);
    var r = r.Z - a.Z;
    var a = i.toString();
    LguiUtil_1.LguiUtil.SetLocalText(e, "Meter", a);
    let t = e.GetText();
    if (r > 300) {
      a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowUp");
      t += `<texture=${a}/>`;
    } else if (r < -300) {
      a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowDown");
      t += `<texture=${a}/>`;
    }
    e.SetText(t);
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
  static HandleTrackCustomBoard(e, r = false) {
    return !!e && (!r || !!InputManager_1.InputManager.IsAllowOpenViewByShortcutKey()) && !!e.TrackPhoneMessageBoard && !(r = e.TrackPhoneMessageBoard.PhoneMessageId ?? 0, (e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r)) ? ModelManager_1.ModelManager.PhoneMsgModel.IsPhoneMsgUnlock(r) ? (UiManager_1.UiManager.IsViewOpen("PhoneMsgPanelViewBig") || UiManager_1.UiManager.IsViewOpen("PhoneMsgPanelViewSmall") ? Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 74, "手机短信界面已打开，无需重复打开") : (e = {
      ShortMessage: e,
      NeedShowTips: false,
      OpenWay: 3,
      ViewType: 1
    }, UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", e)), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 74, "短信未解锁，无法追踪", ["短信ID", r]), 1) : (Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 74, "找不到对应的短信配置", ["短信ID", r]), 1));
  }
}
exports.QuestUtil = QuestUtil;
//# sourceMappingURL=QuestUtil.js.map