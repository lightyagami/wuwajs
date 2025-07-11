"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioVisualizationManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class AudioVisualizationManager {
  constructor() {
    this.GlobalConfig = undefined;
    this.MaterialParametersCollectionFile = undefined;
    this.InstanceActors = undefined;
  }
  static Get() {
    if (!this.Yar) {
      this.Yar = new AudioVisualizationManager();
      this.Yar.Initialize();
    }
    return this.Yar;
  }
  LoadAssets() {
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Audio/AudioVisualization/Data/DA_AudioVisualizationGlobalConfigs.DA_AudioVisualizationGlobalConfigs", UE.PDA_AudioVisualizationGlobalConfigs_C, (i, o) => {
      if (i?.IsValid()) {
        this.GlobalConfig = i;
        this.MaterialParametersCollectionFile = i.MPCFile;
        if (!this.MaterialParametersCollectionFile?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 25, "音频可视化缺失MPC文件");
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 25, "音频可视化未找到全局配置文件", ["path", "/Game/Aki/Audio/AudioVisualization/Data/DA_AudioVisualizationGlobalConfigs.DA_AudioVisualizationGlobalConfigs"]);
      }
    });
  }
  Initialize() {
    this.InstanceActors = new Map();
    this.LoadAssets();
  }
  Register(i) {
    this.InstanceActors.set(i.Identifier, i);
    i.ActorEndPlayCallback = i => {
      this.Unregister(i);
    };
    i.Start();
  }
  Unregister(i) {
    this.InstanceActors.delete(i.Identifier);
    i.End();
  }
  NotifyCallBackToAll(o, a, s) {
    this.InstanceActors.forEach(i => {
      i.CallBack(o, a, s);
    });
  }
  Tick(i) {
    AudioVisualizationManager.xW.Start();
    AudioVisualizationManager.xW.Stop();
  }
}
(exports.AudioVisualizationManager = AudioVisualizationManager).Yar = undefined;
AudioVisualizationManager.xW = Stats_1.Stat.Create("AudioVisualizationManager.Tick"); //# sourceMappingURL=AudioVisualizationManager.js.map