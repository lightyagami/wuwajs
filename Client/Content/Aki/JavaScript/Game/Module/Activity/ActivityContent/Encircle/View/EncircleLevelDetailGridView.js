"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleLevelDetailGridView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityEncircleController_1 = require("../ActivityEncircleController");
const EncircleDefine_1 = require("../EncircleDefine");
class EncircleLevelDetailGridView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.hyc = 0;
    this.r$t = false;
    this.Tbg = false;
    this.bbg = undefined;
    this.GTg = e => {
      this.Og(this.hyc);
    };
    this.J9_ = () => {
      var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(this.bbg.PreId).LevelTitle;
      var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Encirle_DifficultyLockTips_Text", e);
    };
    this.Rbg = e => {
      if (this.bbg && this.Tbg && (UiManager_1.UiManager.GetViewByName("EncircleLevelDetailView").ChangeDifficultyIndex(this.bbg.Difficulty), e === 1)) {
        this.SetClickRedDotState();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Rbg]];
  }
  OnStart() {
    this.AddEventListener();
    this.GetExtendToggle(0)?.OnUndeterminedClicked.Add(this.J9_);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  Refresh(e, i, t) {
    this.Og(e);
    this.Pqe();
  }
  GetChallengeDifficulty() {
    if (this.bbg) {
      return this.bbg.Difficulty;
    }
  }
  Pqe() {
    let e = "EncircleLevelType_Single";
    if (this.GetChallengeDifficulty() === 1) {
      e = "EncircleLevelType_Couple";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e);
  }
  Og(e) {
    this.hyc = e;
    this.bbg = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(this.hyc);
    e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    this.r$t = e.CheckChallengeComplete(this.hyc);
    this.Tbg = this.bbg.PreId === 0 || e.CheckChallengeComplete(this.bbg.PreId);
    if (this.Tbg) {
      this.SetToggleActive();
    }
    this.Lbg();
    this.Dyn();
  }
  Dyn() {
    var e;
    if (this.r$t) {
      e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
      this.GetText(4)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), "Encircle_FewestSteps", e.GetChallengeRecord(this.hyc));
    } else {
      this.GetText(4)?.SetUIActive(false);
    }
  }
  Lbg() {
    this.GetItem(3)?.SetUIActive(this.r$t);
    this.GetItem(1)?.SetUIActive(this.Tbg);
    this.GetItem(5)?.SetUIActive(!this.Tbg);
    this.GetExtendToggle(0)?.SetToggleState(this.Tbg ? 1 : 2);
  }
  SetToggleActive() {
    this.GetExtendToggle(0)?.SetToggleState(1);
    this.SetClickRedDotState();
  }
  SetClickRedDotState() {
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(e, EncircleDefine_1.ENCIRCLE_REDPOINT_KEY, this.hyc, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.EncircleLevelDetailGridView = EncircleLevelDetailGridView;
//# sourceMappingURL=EncircleLevelDetailGridView.js.map