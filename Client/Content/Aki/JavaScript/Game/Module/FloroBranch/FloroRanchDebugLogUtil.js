"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDebugLogUtil = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class FloroRanchDebugLogUtil {
  static LogDayStart() {}
  static LogBuffActionInfo(t, e, o) {}
  static LogEatActionInfo(t, e) {}
  static LogEvolveActionInfo(t, e) {}
  static LogTagActionInfo(t, e) {}
  static LogFusionStartActionInfo(t, e) {}
  static LogFusionEndActionInfo(t) {}
  static LogResourceChangeActionInfo(t, e) {}
  static LogWageSettleActionInfo(t) {}
  static EKu(t) {
    return StringUtils_1.EMPTY_STRING;
  }
  static LogSacrificeActionInfo(t) {}
  static LogEntityChangeActionInfo(t, e, o) {}
  static IKu(t) {
    return StringUtils_1.EMPTY_STRING;
  }
  static A5(t) {}
}
exports.FloroRanchDebugLogUtil = FloroRanchDebugLogUtil;
//# sourceMappingURL=FloroRanchDebugLogUtil.js.map