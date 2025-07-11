"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonFailView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const TrainingView_1 = require("../TrainingDegree/TrainingView");
const LguiUtil_1 = require("../Util/LguiUtil");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.$Fe = undefined;
    this.e3t = undefined;
    this.zFe = () => {
      this.r1i();
    };
    this.n1i = () => {
      this.o3e();
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
        if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
          this.CloseMe();
        }
      });
    };
  }
  get Kli() {
    if (this.NUe) {
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    } else {
      return undefined;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIVerticalLayout]];
    this.BtnBindInfo = [[1, this.zFe], [2, this.n1i]];
  }
  OnStart() {
    this.NUe = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (UiManager_1.UiManager.IsViewShow("ReviveView")) {
      UiManager_1.UiManager.CloseView("ReviveView");
    }
    this.SHe();
    this.e3e();
    this.e3t = new TrainingView_1.TrainingView();
    this.e3t.Show(this.GetVerticalLayout(4));
    this.SetButtonUiActive(2, false);
  }
  OnBeforeDestroy() {
    if (this.e3t) {
      this.e3t.Clear();
    }
    this.e3t = undefined;
    this.o3e();
  }
  SHe() {
    this.GetText(0).ShowTextNew(this.Kli.FailTips);
  }
  e3e() {
    let e = this.Kli.AutoLeaveTime;
    this.$Fe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
      if (e <= 0) {
        this.r1i();
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "InstanceDungeonLeftTimeToAutoLeave", e--);
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND, e + 1);
  }
  o3e() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.$Fe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
    }
    this.$Fe = undefined;
  }
  r1i() {
    this.o3e();
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
      if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
        this.CloseMe();
      }
    });
  }
}
exports.InstanceDungeonFailView = InstanceDungeonFailView;
//# sourceMappingURL=InstanceDungeonFailView.js.map