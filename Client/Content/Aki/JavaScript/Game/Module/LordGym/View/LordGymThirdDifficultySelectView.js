"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymThirdDifficultySelectView = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const LordGymEntranceSetById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LordGymDefine_1 = require("../LordGymDefine");
const LordGymDifficultySelectView_1 = require("./LordGymDifficultySelectView");
const LordGymThirdLevelItem_1 = require("./LordGymThirdLevelItem");
const CLICK_CHALLENGE_BUTTON_CD = 500;
class LordGymThirdDifficultySelectView extends LordGymDifficultySelectView_1.LordGymDifficultySelectView {
  constructor() {
    super(...arguments);
    this.Flow = undefined;
    this.SPe = undefined;
    this.c5a = 0;
    this.LastHideLandscapeValue = 0;
    this.I5t = () => {
      var e = {
        EntranceSetId: this.LordEntranceSetId,
        IsPlaySpecialSequence: false,
        NeedBlackScreenAnim: true
      };
      var r = ModelManager_1.ModelManager.LordGymModel.GetLordGymThirdBossSequenceActor();
      if (r) {
        r.SequencePlayer?.PlayReverse();
      }
      UiManager_1.UiManager.OpenView("LordGymThirdBossSelectView", e, () => {
        UiManager_1.UiManager.CloseView("LordGymThirdDifficultySelectView");
      });
    };
  }
  CreateItem() {
    var e = new LordGymThirdLevelItem_1.LordGymThirdLevelItem();
    e.OnToggleClick = this.OnLordDifficultyToggleClick;
    e.CanExecuteChangeCallBack = this.CanLordDifficultyToggleChange;
    return e;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.CaptionItem?.SetHomeBtnShowState(false);
    this.GetButton(14).OnClickCallBack.Unbind();
    this.GetButton(14).OnClickCallBack.Bind(this.I5t);
    if (this.OpenParam?.IsPlaySpecialSequence) {
      this.UiViewSequence.StartSequenceName = "StartZ";
      AudioSystem_1.AudioSystem.PostEvent(LordGymDefine_1.LORD_GYM_THIRD_AUDIO_BOSS);
    } else {
      this.UiViewSequence.StartSequenceName = "Start01";
    }
  }
  OnStartChallenge() {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (!(this.c5a > e)) {
      this.c5a = e + CLICK_CHALLENGE_BUTTON_CD;
      e = this.LordDifficultyScrollView.GetSelectedGridIndex();
      e = this.LordList[e];
      ModelManager_1.ModelManager.LordGymModel.EntryChallengeId = e;
      if (e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.LordEntranceSetId)) {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e.DungeonId;
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.ContinueEntranceFlow();
      }
    }
  }
  RefreshDetail() {
    super.RefreshDetail();
    if (this.SPe?.GetCurrentSequence() === "Switch") {
      this.SPe.ReplaySequenceByKey("Switch");
    } else {
      this.SPe?.PlayLevelSequenceByName("Switch");
    }
  }
  async OnHandlePostLoadSceneAsync(e) {
    if (e) {
      await ModelManager_1.ModelManager.LordGymModel.EnterLordGymThirdBossScene(false);
    }
  }
  async OnHandlePreReleaseSceneAsync(e) {
    if (e) {
      ModelManager_1.ModelManager.LordGymModel.ExitLordGymThirdBossScene();
    }
    return Promise.resolve();
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId();
    ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.LordEntranceId, true, true);
  }
}
exports.LordGymThirdDifficultySelectView = LordGymThirdDifficultySelectView;
//# sourceMappingURL=LordGymThirdDifficultySelectView.js.map