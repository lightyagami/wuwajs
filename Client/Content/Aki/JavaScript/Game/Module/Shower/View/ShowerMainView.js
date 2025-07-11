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
    this.AY1 = undefined;
    this.PY1 = undefined;
    this.xY1 = undefined;
    this.UY1 = false;
    this.DY1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 0.5);
      if (this.UY1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, false);
      }
      UiManager_1.UiManager.CloseAndOpenView("ShowerMainView", "ShowerInviteView");
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, 0.5);
    };
    this.BY1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 0.5);
      var e = !this.UY1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, e);
      this.PY1.PlaySwitchCd();
      this.UY1 = e;
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in");
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, 0.5);
    };
    this.kY1 = () => {
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
      if (this.UY1) {
        this.UY1 = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.UY1);
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
    this.AY1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.AY1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.PY1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.PY1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.xY1 = new ShowerSkillButton_1.ShowerSkillButton();
    await this.xY1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnBeforeShow() {
    this.UY1 = false;
  }
  OnStart() {
    this.AY1.SetPressCallback(() => {
      this.DY1();
    });
    this.PY1.SetPressCallback(() => {
      this.BY1();
    });
    this.xY1.SetPressCallback(this.kY1);
  }
  OnTick(e) {
    this.PY1.TickSkillCoolDown(e);
  }
}
exports.ShowerMainView = ShowerMainView;
//# sourceMappingURL=ShowerMainView.js.map