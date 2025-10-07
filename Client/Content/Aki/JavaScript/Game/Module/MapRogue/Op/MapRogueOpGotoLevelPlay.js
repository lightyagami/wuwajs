"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpGotoLevelPlay = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const AsyncTask_1 = require("../../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGotoLevelPlay extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super();
    this.StepSize = 1;
    this.SelectIndex = -1;
    this.OnRogueSubLevelNotify = (s, l) => {
      var e = new AsyncTask_1.AsyncTask("RogueBattleSubLevelNotify", async () => {
        ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
        const o = s.fL_;
        const r = s.mL_;
        var e = Vector_1.Vector.Create(s.iPs, s.rPs, s.gqs);
        var t = new UE.Rotator(0, s.fqs, 0);
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
        await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
        var a = [];
        const i = new CustomPromise_1.CustomPromise();
        ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, r, 0, e, t, e => {
          if (e) {
            i.SetResult(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RogueBattle", 34, "常驻肉鸽子关卡切换失败", ["unloads", o], ["newLoads", r]);
            }
            this.OpExecuteClientId = Protocol_1.Aki.Protocol.nZu.Proto_LoadLevelPlayFail;
            this.Execute(l);
          }
        });
        a.push(i.Promise);
        if (ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink()) {
          a.push(ModelManager_1.ModelManager.BattleLinkModel.PreloadTeamRoleRes().Promise);
        }
        a.push(UiManager_1.UiManager.CloseViewAsync("RogueBattleTeamEditView"));
        await Promise.all(a);
        this.OpExecuteClientId = Protocol_1.Aki.Protocol.nZu.Proto_LoadLevelPlaySucc;
        this.Execute(l);
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1);
        return true;
      });
      TaskSystem_1.TaskSystem.AddTask(e);
      TaskSystem_1.TaskSystem.Run();
    };
  }
  ToString() {
    return `[LevelPlay] IncId:${this.IncId} Step:${this.CurrentStep}`;
  }
  OnStartExecute(e) {
    if (this.Data.Yr1.rZu && e.IsSkipBattle) {
      this.OpExecuteClientId = Protocol_1.Aki.Protocol.nZu.Proto_SkipBattle;
      this.ExecuteOp();
    } else if (this.Data.Yr1.ho1) {
      UiManager_1.UiManager.OpenView("RogueBattleTeamEditView", this.IncId);
    } else {
      this.Execute(e);
    }
  }
  OnExecute(e) {
    this.OnRogueSubLevelNotify(this.Data.Yr1.btd, e);
  }
  OnFinish(e) {}
}
exports.MapRogueOpGotoLevelPlay = MapRogueOpGotoLevelPlay;
//# sourceMappingURL=MapRogueOpGotoLevelPlay.js.map