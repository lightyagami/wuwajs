"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepProgressBarController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest");
const LevelGamePlayUtils_1 = require("../../../../../LevelGamePlay/LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../../../LevelGamePlay/LevelGeneralController");
const TreeExpressAssistant_1 = require("../../../../GeneralLogicTree/ControllerAssistant/TreeExpressAssistant");
const StepControllerBase_1 = require("./StepControllerBase");
class StepProgressBarController extends StepControllerBase_1.StepControllerBase {
  constructor(e) {
    super();
    this.UiParent = e;
  }
  get Enable() {
    return true;
  }
  OnTick(e) {
    if (this.Config && this.ShowData && this.ShowData.DataSource === 0 && this.Config.ShowSource === 0) {
      var s = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.ShowData.BtType, this.ShowData.Id, this.ShowData.TreeConfigId);
      var i = LevelGeneralController_1.LevelGeneralController.CheckConditionNew(this.Config.ShowConditions, undefined, s);
      let t = undefined;
      let r = undefined;
      r = this.Config.CurConditionTextIndex !== undefined && this.Config.ConditionText && this.Config.ConditionText.length > this.Config.CurConditionTextIndex ? (t = this.Config.ConditionText[this.Config.CurConditionTextIndex]).Condition : (t = this.Config, this.Config.ShowConditions);
      if (t.ProgressBar) {
        if (t.ProgressBar.ProgressStyle === 0) {
          let e = undefined;
          switch (t.ProgressBar.ProgressCalculate.VarLeft.Type) {
            case IQuest_1.EProgressBarLeftType.UseCount:
              e = TreeExpressAssistant_1.TreeExpressAssistant.GetQCount(this.ShowData.Id, this.Config.QuestScheduleType);
              break;
            case IQuest_1.EProgressBarLeftType.UseVar:
              var l = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t.ProgressBar.ProgressCalculate.VarLeft.Var, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.ShowData.BtType, this.ShowData.Id, this.ShowData.TreeConfigId));
              if (typeof l == "number") {
                e = l;
              }
              break;
            default:
              return;
          }
          var o = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t.ProgressBar.ProgressCalculate.VarRight, s);
          if (typeof o != "number" || e === undefined || o === 0) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("BehaviorTree", 72, "任务节点标题进度条参数错误", ["left", e], ["right", o]);
            }
          } else {
            s = LevelGeneralController_1.LevelGeneralController.CheckConditionNew(r, undefined, s);
            this.Aku(i && s, e / o);
          }
        }
      } else {
        this.Aku(false, 0);
      }
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UISliderComponent]];
  }
  OnStart() {
    this.Aku(false, 0);
  }
  Aku(e, t) {
    if (this.UiParent.IsUIActiveInHierarchy() !== e) {
      this.UiParent.SetUIActive(e);
    }
    if (this.GetActive() !== e) {
      this.SetActive(e);
      this.GetSlider(0)?.SetActive(e);
    }
    if (e) {
      this.GetSlider(0)?.SetValue(t);
    }
  }
}
exports.StepProgressBarController = StepProgressBarController;
//# sourceMappingURL=StepProgressBarController.js.map