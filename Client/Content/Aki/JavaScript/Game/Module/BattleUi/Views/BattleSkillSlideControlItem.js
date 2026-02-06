"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillSlideControlItem = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const CHECK_IN_TOUCH_INTERVAL = 500;
class BattleSkillSlideControlItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TargetActive = false;
    this.UOt = true;
    this.Eqg = undefined;
    this.aut = 0;
  }
  OnStart() {
    this.SetComponentActive(this.TargetActive);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    var e = ModelManager_1.ModelManager.BattleUiModel.SlideControlData;
    this.RootItem.SetAnchorOffset(e.Position.ToUeVector2D());
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(17, [7, 9], false);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.Srt(undefined);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(17, [7, 9], true);
  }
  SetComponentActive(e) {
    if ((this.TargetActive !== e || !!this.UOt) && !(this.TargetActive = e, this.InAsyncLoading())) {
      this.UOt = false;
      this.SetActive(e);
    }
  }
  Tick(e) {
    var t;
    if (this.IsShowOrShowing) {
      if (this.gut()) {
        t = ModelManager_1.ModelManager.BattleUiModel.SlideControlData.TouchMoveDir;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[SlideControl]", ["y", t.Y]);
        }
        if (t.Y <= -10) {
          this.Srt(InputMappingsDefine_1.actionMappings.跳跃);
        } else if (t.Y > 10) {
          this.Srt(InputMappingsDefine_1.actionMappings.下降);
        } else {
          this.Srt(undefined);
        }
      } else {
        ModelManager_1.ModelManager.BattleUiModel.SlideControlData.ForceStop();
      }
    }
  }
  Srt(e) {
    if (this.Eqg !== e) {
      if (this.Eqg) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[SlideControl]抬起", ["", this.Eqg]);
        }
        InputDistributeController_1.InputDistributeController.InputAction(this.Eqg, false);
      }
      if (e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[SlideControl]按下", ["", e]);
        }
        InputDistributeController_1.InputDistributeController.InputAction(e, true);
      }
      this.Eqg = e;
    }
  }
  gut() {
    if (Time_1.Time.Now < this.aut) {
      return true;
    }
    this.aut = Time_1.Time.Now + CHECK_IN_TOUCH_INTERVAL;
    var e = ModelManager_1.ModelManager.BattleUiModel.SlideControlData.TouchId;
    return Global_1.Global.CharacterController?.IsInTouch(e) ?? false;
  }
}
exports.BattleSkillSlideControlItem = BattleSkillSlideControlItem;
//# sourceMappingURL=BattleSkillSlideControlItem.js.map