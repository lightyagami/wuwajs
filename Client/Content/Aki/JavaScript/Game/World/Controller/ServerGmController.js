"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerGmController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
class ServerGmController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(29659, ServerGmController.OnServerCommandNotify);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(29659);
    return true;
  }
}
(exports.ServerGmController = ServerGmController).AnimalDebug = false;
ServerGmController.MingzhongzhiguiDebug = false;
ServerGmController.OnServerCommandNotify = e => {
  if (e.wra.startsWith("GM ")) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, e.wra.substring(3));
  } else {
    if (e.wra.startsWith("AnimalDebug")) {
      ServerGmController.AnimalDebug = true;
    } else if (e.wra.startsWith("MingzhongzhiguiDebug")) {
      ServerGmController.MingzhongzhiguiDebug = true;
    } else if (e.wra.startsWith("AnimErrorCheck")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 6, "AnimErrorCheck Begin");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.CheckBoneNan true");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.PrintSkeletalMeshText true");
      TimerSystem_1.TimerSystem.Delay(() => {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.CheckBoneNan false");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.PrintSkeletalMeshText false");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 6, "AnimErrorCheck End");
        }
      }, 3000);
    }
    if (e.wra === "DumpLoadingAssets") {
      ResourceSystem_1.ResourceSystem.DebugDumpLoadingAssets();
    }
  }
}; //# sourceMappingURL=ServerGmController.js.map