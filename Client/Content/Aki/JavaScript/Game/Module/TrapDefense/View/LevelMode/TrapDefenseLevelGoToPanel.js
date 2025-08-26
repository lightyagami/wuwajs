"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelGoToPanel = undefined;
const UE = require("ue");
const LevelGeneralDefine_1 = require("../../../../LevelGamePlay/LevelGeneralDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiModel_1 = require("../../../../Ui/UiModel");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseLevelGoToPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
    this.OnClickBtnGoTo = () => {
      var e;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Trapdefence_NoOlineTpye");
      } else {
        e = () => {
          ModelManager_1.ModelManager.TrapDefenseModel.RequestStartChallenge(this.LevelData);
        };
        if (!!this.LevelData.IsLeaved || !ModelManager_1.ModelManager.TrapDefenseModel.CheckNextLevelThreshold(this.LevelData, e, UiModel_1.UiModel.NormalStack.Peek())) {
          ModelManager_1.ModelManager.TrapDefenseModel?.RequestStartChallenge(this.LevelData);
        }
      }
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickBtnGoTo]];
  }
  UpdateData(e) {
    var i;
    if ((this.LevelData = e).IsUnlock) {
      this.GetItem(7)?.SetUIActive(e.IsUnlock);
      this.ehd();
    } else {
      i = e.IsReachOpenTime();
      this.GetItem(1)?.SetUIActive(!i);
      this.SYc(true);
      if (i) {
        this.GetItem(7)?.SetUIActive(e.IsUnlockCondition);
        if (e.IsUnlockCondition) {
          this.ehd();
        } else {
          this.UpdateLockConditionInfo();
        }
      } else {
        this.SYc(false);
        this.GetText(2)?.SetText(e.GetUnlockTimeFormat());
        this.GetItem(3)?.SetUIActive(false);
      }
    }
  }
  ehd() {
    this.SYc(true);
    this.GetItem(3)?.SetUIActive(false);
    this.GetItem(1)?.SetUIActive(false);
  }
  SYc(e) {
    this.GetButton(0)?.SetSelfInteractive(e);
  }
  UpdateLockConditionInfo() {
    var [e, i, t, s] = this.LevelData.GetOpenConditionLockCondition();
    switch (e) {
      case LevelGeneralDefine_1.ELevelGeneralCondition.TrapDefensePassFullStar:
        this.SYc(false);
        this.GetItem(3)?.SetUIActive(false);
        this.GetItem(1)?.SetUIActive(true);
        this.GetText(2)?.ShowTextNew(t);
        break;
      case LevelGeneralDefine_1.ELevelGeneralCondition.TrapDefenseTotalStar:
        var a = ModelManager_1.ModelManager.TrapDefenseModel.GetAllGetStarByLevel() + "/" + i;
        this.GetItem(3)?.SetUIActive(true);
        this.GetItem(1)?.SetUIActive(false);
        this.GetText(5)?.SetText(a);
        this.SYc(false);
        break;
      case LevelGeneralDefine_1.ELevelGeneralCondition.TrapDefenseChallengeStar:
        this.SYc(false);
        this.GetItem(3)?.SetUIActive(true);
        this.GetItem(1)?.SetUIActive(false);
        a = Number(s.get("ChallengeId"));
        a = ModelManager_1.ModelManager.TrapDefenseModel.LevelDataFromIdMap.get(a);
        a = a ? a.ReachTargetIndexList.length : 0;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t, a, i);
        break;
      default:
        this.ehd();
    }
  }
}
exports.TrapDefenseLevelGoToPanel = TrapDefenseLevelGoToPanel;
//# sourceMappingURL=TrapDefenseLevelGoToPanel.js.map