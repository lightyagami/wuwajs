"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotographView = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PhotographView_1 = require("./PhotographView");
class FightPhotographView extends PhotographView_1.PhotographView {
  constructor() {
    super(...arguments);
    this.mzd = false;
    this.fzd = false;
    this.PPd = () => {
      this.mzd = true;
    };
    this.OnBackButtonClicked = () => {
      if (ControllerHolder_1.ControllerHolder.PhotographController.IsFightPhotoCanSettle()) {
        UiManager_1.UiManager.OpenView("FightPhotoResultView");
      } else {
        ControllerHolder_1.ControllerHolder.PhotographController.CloseFightPhotographMode();
        ControllerHolder_1.ControllerHolder.FilterSettingController.SetDefaultFilterSetting();
      }
    };
  }
  OnAfterShow() {
    super.OnAfterShow();
    ModelManager_1.ModelManager.RenderModuleModel?.EnableForceTickCharRenderShell("FightPhotographView OnAfterShow");
    AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "pause");
    this.NDc();
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.PPd);
  }
  OnAfterTick(e) {
    var o;
    if (!ControllerHolder_1.ControllerHolder.PhotographController.CurrentBtNode || this.mzd) {
      if (this.UiViewSequence?.HasSequenceNameInPlaying("Loop")) {
        this.UiViewSequence.StopSequenceByKey("Loop", false, true);
      }
    } else {
      o = ControllerHolder_1.ControllerHolder.PhotographController.IsSatisfyAllConditions();
      if (this.fzd !== o) {
        if (this.fzd = o) {
          this.UiViewSequence.PlaySequence("ShowChanging");
          this.UiViewSequence.PlaySequence("Loop");
        } else {
          this.UiViewSequence.StopSequenceByKey("Loop", false, true);
        }
      }
    }
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.PPd);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    ModelManager_1.ModelManager.RenderModuleModel?.DisableForceTickCharRenderShell("FightPhotographView OnBeforeDestroy");
    AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "none");
    this.VDc();
  }
  NDc() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid && e.Entity?.Valid && (e = e.Entity.GetComponent(217)) && !e.HasTag(-561064175)) {
      e.AddTag(-561064175);
    }
  }
  VDc() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid && e.Entity?.Valid && (e = e.Entity.GetComponent(217)) && e.HasTag(-561064175)) {
      e.RemoveTag(-561064175);
    }
  }
}
exports.FightPhotographView = FightPhotographView;
//# sourceMappingURL=FightPhotographView.js.map