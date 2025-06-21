"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueOpGotoLevelPlay = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AsyncTask_1 = require("../../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGotoLevelPlay extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(), this.StepSize = 1, this.SelectIndex = -1, this.OnRogueSubLevelNotify = (i, n) => {
      var e = new AsyncTask_1.AsyncTask("RogueBattleSubLevelNotify", async () => {
        ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
        const o = i.fL_,
          r = i.mL_;
        var e = Vector_1.Vector.Create(i.iPs, i.rPs, i.gqs),
          t = new UE.Rotator(0, i.fqs, 0),
          a = (await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3), await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise, []);
        const s = new CustomPromise_1.CustomPromise;
        return ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, r, 0, e, t, e => {
          e ? s.SetResult(!0) : (Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "常驻肉鸽子关卡切换失败", ["unloads", o], ["newLoads", r]), this.OpExecuteClientId = 0, this.Execute(n))
        }), a.push(s.Promise), ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink() && a.push(ModelManager_1.ModelManager.BattleLinkModel.PreloadTeamRoleRes().Promise), a.push(UiManager_1.UiManager.CloseViewAsync("RogueBattleTeamEditView")), await Promise.all(a), this.OpExecuteClientId = 1, this.Execute(n), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1), !0
      });
      TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run()
    }
  }
  ToString() {
    return `[LevelPlay] IncId:${this.IncId} Step:` + this.CurrentStep
  }
  OnStartExecute(e) {
    this.Data.Ar1.Vr1 ? UiManager_1.UiManager.OpenView("RogueBattleTeamEditView", this.IncId) : this.Execute(e)
  }
  OnExecute(e) {
    this.OnRogueSubLevelNotify(this.Data.Ar1.DBc, e)
  }
  OnFinish(e) {}
}
exports.MapRogueOpGotoLevelPlay = MapRogueOpGotoLevelPlay;
//# sourceMappingURL=MapRogueOpGotoLevelPlay.js.map