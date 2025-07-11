"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsLevelRender = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
class GameSettingsLevelRender {
  static Get() {
    if (this.Me === undefined) {
      this.Me = new GameSettingsLevelRender();
      this.SetLevelRenderSettingsStat = Stats_1.Stat.Create("Render_LevelRenderSettingsManager_SetLevelRenderSettings");
      this.RevertLevelRenderSettingsStat = Stats_1.Stat.Create("Render_LevelRenderSettingsManager_RevertLevelRenderSettings");
    }
    return this.Me;
  }
  SetLevelRenderSettings() {
    if (ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings !== undefined) {
      GameSettingsLevelRender.SetLevelRenderSettingsStat.Start();
      for (const n of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.get(n);
        var t = GameSettingsLevelRender.Ove.get(n);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, t + " " + e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Render", 59, "进入特殊副本-调整渲染参数", ["设置", t], ["为", e]);
        }
      }
      GameSettingsLevelRender.SetLevelRenderSettingsStat.Stop();
    }
  }
  RevertLevelRenderSetting() {
    if (ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings !== undefined) {
      GameSettingsLevelRender.RevertLevelRenderSettingsStat.Start();
      for (const n of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var e = GameSettingsLevelRender.kve.get(n);
        var t = GameSettingsLevelRender.Ove.get(n);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, t + " " + e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Render", 59, "退出特殊副本-调整渲染参数", ["设置", t], ["为", e]);
        }
      }
      GameSettingsLevelRender.RevertLevelRenderSettingsStat.Stop();
    }
  }
}
(exports.GameSettingsLevelRender = GameSettingsLevelRender).Me = undefined;
GameSettingsLevelRender.Ove = new Map([[1, "r.Shadow.EnableCSMStable"], [2, "r.MotionBlur.OuterScale"], [3, "r.AllowHardwareOcclusion"], [4, "r.Kuro.HideLandscape"]]);
GameSettingsLevelRender.kve = new Map([[1, 1], [2, 1], [3, 1], [4, 0]]);
GameSettingsLevelRender.SetLevelRenderSettingsStat = undefined;
GameSettingsLevelRender.RevertLevelRenderSettingsStat = undefined; //# sourceMappingURL=GameSettingsLevelRender.js.map