"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const FindSunSpiritController_1 = require("./FindSunSpiritController");
class FindSunSpiritView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yRn = false;
    this.lqe = undefined;
    this.$Cg = () => {
      this.C4f();
    };
    this.bdf = () => {
      if (!this.yRn) {
        this.f5g();
      }
    };
    this.dV1 = () => {
      if (!this.yRn) {
        FindSunSpiritController_1.FindSunSpiritController.FinishFindSunSpirit();
        this.CloseMe();
      }
    };
    this.OW1 = () => {
      if (!this.yRn) {
        FindSunSpiritController_1.FindSunSpiritController.SelectModifier(false);
      }
    };
    this.qW1 = () => {
      if (!this.yRn) {
        FindSunSpiritController_1.FindSunSpiritController.SelectModifier(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText]];
    this.BtnBindInfo = [[3, this.$Cg], [4, this.bdf], [1, this.OW1], [2, this.qW1]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.dV1);
  }
  OnBeforeShow() {
    this.WWf();
  }
  OnBeforeDestroy() {
    if (ModelManager_1.ModelManager.FindSunSpiritModel.Config) {
      FindSunSpiritController_1.FindSunSpiritController.FinishFindSunSpirit();
    }
  }
  async C4f() {
    if (!this.yRn && !FindSunSpiritController_1.FindSunSpiritController.IsTriggerCooldown()) {
      this.yRn = true;
      var i;
      var e = ModelManager_1.ModelManager.FindSunSpiritModel;
      var r = FindSunSpiritController_1.FindSunSpiritController.TriggerModifierAndFindPaths();
      FindSunSpiritController_1.FindSunSpiritController.StartTriggerCooldown();
      this.WWf();
      if (e.IsGameFinish && !e.GameFinishResult) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("LevelPlay_ShootTimesRunOutTip");
        if ((i = e.FailResetDelayTime) <= 0) {
          this.f5g();
          return;
        } else {
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.f5g();
          }, i);
          return;
        }
      }
      if (e.GameFinishResult) {
        await FindSunSpiritController_1.FindSunSpiritController.PlaySunSpiritPerformAsync(r);
        FindSunSpiritController_1.FindSunSpiritController.FinishFindSunSpirit();
        this.CloseMe();
      } else {
        FindSunSpiritController_1.FindSunSpiritController.PlaySunSpiritPerformAsync(r);
        this.yRn = false;
      }
    }
  }
  f5g() {
    FindSunSpiritController_1.FindSunSpiritController.ResetFindSunSpirit(() => {
      this.yRn = false;
      this.WWf();
    });
  }
  WWf() {
    var i = ModelManager_1.ModelManager.FindSunSpiritModel;
    var e = i.LevelConfig;
    var i = i.LevelPlay;
    var e = e.MaxStep - i.CurrentStep;
    this.GetText(5).SetText(e.toString());
  }
}
exports.FindSunSpiritView = FindSunSpiritView;
//# sourceMappingURL=FindSunSpiritView.js.map