"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueResidentWaveTipsPanel = undefined;
const UE = require("ue");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueTipsPanelBase_1 = require("./SurvivorsRogueTipsPanelBase");
class SurvivorsRogueResidentWaveTipsPanel extends SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase {
  constructor() {
    super(...arguments);
    this._6d = undefined;
    this.EId = undefined;
    this.MQd = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.IsEndlessWave;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this._6d, e ? "SurvivorsCombat_EndlessMode" : "SurvivorsCombat_WavePeriod");
      if (e) {
        this.EId.SetUIActive(false);
      } else {
        this.EId.SetUIActive(true);
        this.EId.SetText(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetBatch() + "/" + ModelManager_1.ModelManager.SurvivorsRogueModel.MaxWaveNum);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this._6d = this.GetText(0);
    this.EId = this.GetText(1);
  }
  OnAddEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Batch, this.MQd);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.EndlessBatchLimit, this.MQd);
  }
  OnRemoveEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Batch, this.MQd);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.EndlessBatchLimit, this.MQd);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.MQd();
  }
}
exports.SurvivorsRogueResidentWaveTipsPanel = SurvivorsRogueResidentWaveTipsPanel;
//# sourceMappingURL=SurvivorsRogueResidentWaveTipsPanel.js.map