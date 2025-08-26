"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerMainView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PhotographController_1 = require("../../Photograph/PhotographController");
const ShowerSkillButton_1 = require("./Item/ShowerSkillButton");
class ShowerMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.iz1 = undefined;
    this.rz1 = undefined;
    this.oz1 = undefined;
    this.nz1 = false;
    this.sz1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 0.5);
      if (this.nz1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, false);
      }
      UiManager_1.UiManager.CloseAndOpenView("ShowerMainView", "ShowerInviteView");
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, 0.5);
    };
    this.az1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 0.5);
      var e = !this.nz1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, e);
      this.rz1.PlaySwitchCd();
      this.nz1 = e;
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in");
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, 0.5);
    };
    this.hz1 = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: true,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined
      });
    };
    this.dV1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 0.5);
      if (this.nz1) {
        this.nz1 = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.nz1);
      } else {
        this.CloseMe();
        ModelManager_1.ModelManager.ShowerModel.ExitAndClear();
      }
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, 0.5);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, () => {
      this.dV1();
    }]];
  }
  async OnBeforeStartAsync() {
    this.iz1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.iz1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.rz1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.rz1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.oz1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.oz1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnBeforeShow() {
    this.nz1 = false;
  }
  OnStart() {
    this.iz1.SetPressCallback(() => {
      this.sz1();
    });
    this.rz1.SetPressCallback(() => {
      this.az1();
    });
    this.oz1.SetPressCallback(this.hz1);
  }
  OnTick(e) {
    this.rz1.TickSkillCoolDown(e);
  }
}
exports.ShowerMainView = ShowerMainView;
//# sourceMappingURL=ShowerMainView.js.map