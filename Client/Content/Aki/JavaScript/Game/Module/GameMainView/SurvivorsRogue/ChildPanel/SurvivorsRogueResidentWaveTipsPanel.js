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
    this.pKd = undefined;
    this.Xbd = undefined;
    this.Ldm = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.IsEndlessWave;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.pKd, e ? "SurvivorsCombat_EndlessMode" : "SurvivorsCombat_WavePeriod");
      if (e) {
        this.Xbd.SetUIActive(false);
      } else {
        this.Xbd.SetUIActive(true);
        this.Xbd.SetText(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetBatch() + "/" + ModelManager_1.ModelManager.SurvivorsRogueModel.MaxWaveNum);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.pKd = this.GetText(0);
    this.Xbd = this.GetText(1);
  }
  OnAddEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Batch, this.Ldm);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.EndlessBatchLimit, this.Ldm);
  }
  OnRemoveEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Batch, this.Ldm);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.EndlessBatchLimit, this.Ldm);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.Ldm();
  }
}
exports.SurvivorsRogueResidentWaveTipsPanel = SurvivorsRogueResidentWaveTipsPanel;
//# sourceMappingURL=SurvivorsRogueResidentWaveTipsPanel.js.map