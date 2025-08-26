"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatDebugController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ThinkDataLaunchReporter_1 = require("../../Launcher/ThinkDataReport/ThinkDataLaunchReporter");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const CombatDebugHelper_1 = require("./CombatDebug/CombatDebugHelper");
const CombatLog_1 = require("./CombatLog");
const game = {};
const REFRESH_SERVER_INFO_PERIOD = 300;
class CombatDebugController extends ControllerBase_1.ControllerBase {
  static CombatInfoMessage(e, t, r) {
    if (CombatLog_1.CombatLog.DebugCombatInfo.has(e) && this.lgr.get(t)) {
      if (r) {
        r = `[Message][${e}][${t}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(r.F4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(r.Y8n)}]`;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CombatInfo", 14, r);
        }
      } else {
        r = `[Message][${e}][${t}]`;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CombatInfo", 14, r);
        }
      }
    }
  }
  static CombatContextInfoMessage(e, t, r) {
    if (CombatLog_1.CombatLog.DebugCombatInfo.has("Message") && this.lgr.get(t) && (r = r.K8n) && (e = `[Message][${e}][${t}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(r.F4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(r.Y8n)}][MessageId:${MathUtils_1.MathUtils.LongToBigInt(r.$8n)}][PreMessageId:${MathUtils_1.MathUtils.LongToBigInt(r.X8n)}]`, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("CombatInfo", 50, e);
    }
  }
  static FilterCmd(e) {
    CombatDebugController.ScriptHelper.Init();
    return CombatDebugController.ScriptHelper.FilterCmd(e);
  }
  static EvalScript(script) {
    const filteredScript = CombatDebugController.FilterCmd(script);
    try {
      const preProcess = `
            const ModelManager = require('../Manager/ModelManager')?.ModelManager;
            const ControllerHolder = require('../Manager/ControllerHolder')?.ControllerHolder;
            const UiManager = require('../Ui/UiManager')?.UiManager;
            const LocalStorage = require('../Common/LocalStorage')?.LocalStorage;
            const ELocalStoragePlayerKey = require('../Common/LocalStorageDefine')?.ELocalStoragePlayerKey;
            const ELocalStorageGlobalKey = require('../Common/LocalStorageDefine')?.ELocalStorageGlobalKey;
            const EntitySystem = require('../../Core/Entity/EntitySystem')?.EntitySystem;
            const EventSystem = require('../Common/Event/EventSystem')?.EventSystem;
            const EEventName = require('../Common/Event/EventDefine')?.EEventName;
            const isComponentInstance = require("../../Core/Entity/RegisterComponent").isComponentInstance
            const UE = require('ue');
            const CombatScriptHelper = this.ScriptHelper;
            const Log = require('../../Core/Common/Log')?.Log;
            const {ELogAuthor, ELogModule} = require('../../Core/Define/LogDefine') ?? {};
            const TimerSystem = require('../../Core/Timer/TimerSystem')?.TimerSystem;
            const FormationAttributeController = require("../Module/Abilities/FormationAttributeController").FormationAttributeController;
            
`;
      game;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 19, "脚本执行...", ["代码", filteredScript]);
      }
      const ret = String(eval(preProcess + filteredScript));
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 19, "脚本执行执行完成", ["返回值", ret]);
      }
      return ret;
    } catch (error) {
      if (error instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Editor", 19, "脚本执行异常", error, ["err", error.name], ["msg", error.message]);
        }
        return `${error.name}:${error.message}
${error.stack}`;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LocalStorage", 19, "脚本执行异常", ["error", error]);
        }
        return String(error);
      }
    }
  }
  static _gr() {
    var e;
    if (!UE.ThinkingAnalytics.HasInstanceInitialized(9)) {
      e = new UE.CreateInstanceParam(9, this.ugr, this.cgr, UE.ThinkingAnalytics.GetMachineID(), ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(), "CombatData", "", 1000, 0, 0, 0, true, false, false, true, ThinkDataLaunchReporter_1.EXIT_WAIT_TIME, ThinkDataLaunchReporter_1.MAX_PENDING_LOG, ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT, true, ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL, ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER, true);
      UE.ThinkingAnalytics.CreateSimpleInstance(e);
    }
  }
  static DataReport(e, t) {
    if (ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS && Info_1.Info.IsBuildDevelopmentOrDebug) {
      this._gr();
      cpp_1.FThinkingAnalyticsForPuerts.Track(e, t, 9);
    }
  }
  static ir1() {
    var e;
    if (this.DebugEntityId && (e = EntitySystem_1.EntitySystem.Get(this.DebugEntityId)?.GetComponent(191))) {
      e.GetFormationBuffComp()?.Entity.GetComponent(22)?.ServerDebugInfoRequest();
    }
  }
  static RefreshServerDebugInfo() {
    var e;
    if (!!this.DebugEntityId && !!(e = EntitySystem_1.EntitySystem.Get(this.DebugEntityId)?.GetComponent(22)) && !(Time_1.Time.Now - this.c4t < REFRESH_SERVER_INFO_PERIOD)) {
      this.c4t = Time_1.Time.Now;
      e?.ServerDebugInfoRequest();
      CombatDebugController.ir1();
    }
  }
}
exports.CombatDebugController = CombatDebugController;
CombatDebugController.DebugEntityId = 0;
CombatDebugController.ScriptHelper = new CombatDebugHelper_1.CombatScriptHelper();
CombatDebugController.lgr = new Map([["P3n", true], ["B3n", true], ["w3n", true], ["b3n", true], ["q3n", true], ["k3n", true], ["F3n", true], ["O3n", true], ["N3n", true], ["J3n", true], ["G3n", true], ["TFn", true], ["LFn", true], ["DFn", true], ["AFn", true], ["UFn", true], ["wFn", true], ["GFn", true], ["PFn", true], ["BFn", true], ["QFn", true], ["RFn", true], ["kFn", true], ["qFn", true], ["R3n", true], ["Q3n", true], ["X3n", true], ["x3n", true], ["HFn", true]]);
CombatDebugController.cgr = "773a58b321b8462e8431e0b3010bb3d3";
CombatDebugController.ugr = "https://ali-sh-datareceiver.kurogame.xyz";
CombatDebugController.c4t = 0;
CombatDebugController.yeh = new Map(); //# sourceMappingURL=CombatDebugController.js.map