"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogicTreeContainer_1 = require("../GeneralLogicTree/LogicTreeContainer");
class InstanceDungeonInfo extends LogicTreeContainer_1.LogicTreeContainer {
  constructor(e) {
    super();
    this.IsInteractValid = true;
    this.u1i = 0;
    this.c1i = "";
    this.m1i = 0;
    this.d1i = 0;
    this.C1i = 0;
    this.g1i = undefined;
    this.f1i = undefined;
    this.p1i = 0;
    this.v1i = 0;
    this.M1i = undefined;
    this.E1i = undefined;
    this._Ca = undefined;
    this.S1i = 0;
    this.Bpi = "Local";
    this.u1i = e;
  }
  get Id() {
    return this.u1i;
  }
  get Name() {
    return this.c1i;
  }
  get LevelPlayEntityId() {
    return this.m1i;
  }
  get MapId() {
    return this.d1i;
  }
  get InstanceId() {
    return this.C1i;
  }
  get TrackConfig() {
    return this.g1i;
  }
  get RewardConfig() {
    return this.f1i;
  }
  get RewardId() {
    return this.p1i;
  }
  get RewardEntityId() {
    return this.v1i;
  }
  get AfterGetRewardAction() {
    return this.M1i;
  }
  get LevelPlayOpenAction() {
    return this.E1i;
  }
  get FinishEscAction() {
    return this._Ca;
  }
  get SubType() {
    return this.S1i;
  }
  get OnlineType() {
    return this.Bpi;
  }
  InitConfig() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(this.u1i);
    if (e) {
      this.d1i = e.LevelId;
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
      if (t) {
        this.m1i = e.LevelPlayEntityId;
        this.C1i = e.InstanceId;
        this.c1i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName);
        this.g1i = e.LevelPlayTrack;
        this.E1i = e.LevelPlayOpenActions;
        this._Ca = e.EscActionsAfterDungeonCompletion;
        this.Bpi = e.OnlineType;
        this.S1i = t.InstSubType;
        switch (e.LevelPlayRewardConfig.Type) {
          case "Interact":
            this.p1i = e.LevelPlayRewardConfig.RewardId;
            this.v1i = e.LevelPlayRewardConfig.RewardEntityId;
            this.M1i = e.LevelPlayRewardConfig.RewardCompleteActions;
            break;
          case "Automatic":
            this.p1i = e.LevelPlayRewardConfig.RewardId;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 18, "创建副本时找不到副本配置", ["副本id", this.d1i], ["玩法id", this.u1i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 18, "创建玩法时找不到玩法配置", ["玩法id", this.u1i]);
    }
  }
  GetInstanceDungeonConfig() {
    return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(this.u1i);
  }
  GetInstanceDungeonNodeConfig(e) {
    return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(this.u1i, e);
  }
}
exports.InstanceDungeonInfo = InstanceDungeonInfo;
//# sourceMappingURL=InstanceDungeonInfo.js.map