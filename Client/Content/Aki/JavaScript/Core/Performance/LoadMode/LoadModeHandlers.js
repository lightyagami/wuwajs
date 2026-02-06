"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadModeHandlerLoading = exports.LoadModeHandlerInGameLoading = exports.LoadModeHandlerInGame = exports.LoadModeHandlerNone = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Common/Info");
const Stats_1 = require("../../Common/Stats");
const GameBudgetInterfaceController_1 = require("../../GameBudgetAllocator/GameBudgetInterfaceController");
const ResourceSystem_1 = require("../../Resource/ResourceSystem");
class LoadModeHandlerNone {
  EnterMode() {}
  ExitMode() {}
}
exports.LoadModeHandlerNone = LoadModeHandlerNone;
class LoadModeHandlerInGame {
  constructor() {
    this.StatEnterMode = Stats_1.Stat.Create("LoadModeHandler_Enter_InGame");
  }
  EnterMode(e) {
    this.StatEnterMode.Start();
    if (Info_1.Info.IsPlayInEditor) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 20");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 20");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 5");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 5");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 4");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.BlockOnSlowStreaming 1");
    ResourceSystem_1.ResourceSystem.SetCallbackTimeLimit(5);
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(3);
    this.StatEnterMode.Stop();
  }
  ExitMode() {}
}
exports.LoadModeHandlerInGame = LoadModeHandlerInGame;
class LoadModeHandlerInGameLoading {
  constructor() {
    this.StatEnterMode = Stats_1.Stat.Create("LoadModeHandler_Enter_InGameLoading");
  }
  EnterMode(e) {
    this.StatEnterMode.Start();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("InGameLoadingMode");
    if (Info_1.Info.IsPlayInEditor) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 40");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 40");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 10");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 10");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 8");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.BlockOnSlowStreaming 1");
    ResourceSystem_1.ResourceSystem.SetCallbackTimeLimit(5);
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(3);
    this.StatEnterMode.Stop();
  }
  ExitMode() {
    cpp_1.FKuroPerfSightHelper.EndExtTag("InGameLoadingMode");
  }
}
exports.LoadModeHandlerInGameLoading = LoadModeHandlerInGameLoading;
class LoadModeHandlerLoading {
  constructor() {
    this.StatEnterMode = Stats_1.Stat.Create("LoadModeHandler_Enter_Loading");
  }
  EnterMode(e) {
    this.StatEnterMode.Start();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("InLoadingMode");
    if (Info_1.Info.IsPlayInEditor) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 5000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 1000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 200");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 50");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 1000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 40");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.BlockOnSlowStreaming 0");
    ResourceSystem_1.ResourceSystem.SetCallbackTimeLimit(0);
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(9999);
    this.StatEnterMode.Stop();
  }
  ExitMode() {
    cpp_1.FKuroPerfSightHelper.EndExtTag("InLoadingMode");
  }
}
exports.LoadModeHandlerLoading = LoadModeHandlerLoading;
//# sourceMappingURL=LoadModeHandlers.js.map