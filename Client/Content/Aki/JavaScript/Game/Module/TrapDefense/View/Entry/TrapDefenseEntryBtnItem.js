"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseEntryBtnItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseEntryBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Mode = e;
    this.eje = () => {
      var e;
      if (this.Mode === 1) {
        e = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.GetNextChallengeData();
        ModelManager_1.ModelManager.TrapDefenseModel.OpenViewMainLevelMode(e?.Id, e?.Config.Difficulty);
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel.OpenViewRougeLevelMode();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIArtText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  OnStart() {
    this.K8e();
    this.RefreshByMode();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindRedDot("TrapDefenseMainLevel");
    RedDotController_1.RedDotController.UnBindRedDot("TrapDefenseRougeLevel");
  }
  RefreshUnlockTimer() {
    var e;
    if (!ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.ModeIsOpen()) {
      e = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.GetUnlockRemainTime();
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e).CountDownText ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "TrapDefense_RougeUnlock_Countdown", e);
    }
  }
  RefreshByMode() {
    if (this.Mode === 1) {
      this.Ezc();
    } else if (this.Mode === 2) {
      this.Izc();
    }
  }
  Ezc() {
    var [e, t] = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.GetModeStarProgress();
    this.GetArtText(3).SetText(e + "/" + t);
    var e = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.GetNextChallengeData();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Config.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.GetDifficultyUiInfo().NameKey);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "");
      this.GetText(5).SetText("");
    }
  }
  Izc() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.ModeIsOpen();
    this.GetText(2).SetUIActive(e);
    var [t, i] = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.GetModeStarProgress();
    this.GetArtText(3).SetText(t + "/" + i);
    var t = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.GetEndlessPassedMaxWaveTimes();
    this.GetText(4).SetUIActive(t > 0);
    this.GetText(5).SetUIActive(t > 0);
    if (t > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "TrapDefenseEndlessRogueBestRecord");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "TrapDefenseEndlessRogueBestWaves", t);
    }
    var i = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.CanEnterRougeMode();
    this.GetItem(8).SetUIActive(e && i);
    this.GetItem(9).SetUIActive(!e || !i);
    this.RefreshUnlockTimer();
    if (e) {
      if (!i && ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.GetUnlockRemainTime() <= 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "TrapDefense_RougeUnlock_StageLimit");
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "TrapDefense_RougeUnlock_TimeLimit");
    }
  }
  K8e() {
    var e = this.GetItem(6);
    if (this.Mode === 1) {
      RedDotController_1.RedDotController.BindRedDot("TrapDefenseMainLevel", e);
    } else {
      RedDotController_1.RedDotController.BindRedDot("TrapDefenseRougeModeOpen", e);
    }
  }
}
exports.TrapDefenseEntryBtnItem = TrapDefenseEntryBtnItem;
//# sourceMappingURL=TrapDefenseEntryBtnItem.js.map