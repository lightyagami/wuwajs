"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerMainView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  PhotographController_1 = require("../../Photograph/PhotographController"),
  ShowerSkillButton_1 = require("./Item/ShowerSkillButton");
class ShowerMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.OX1 = void 0, this.qX1 = void 0, this.GX1 = void 0, this.FX1 = !1, this.NX1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, .5), this.FX1 && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, !1), UiManager_1.UiManager.CloseAndOpenView("ShowerMainView", "ShowerInviteView"), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, .5)
    }, this.VX1 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, .5);
      var e = !this.FX1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, e), this.qX1.PlaySwitchCd(), this.FX1 = e, AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in"), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, .5)
    }, this.jX1 = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: !0,
        PrepareFullScreenShot: !1,
        IsHiddenBattleView: !0,
        HandBookPhotoData: void 0,
        GachaData: void 0,
        FragmentMemory: void 0,
        RoleSkinData: void 0
      })
    }, this.k41 = async () => {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, .5), this.FX1 ? (this.FX1 = !1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.FX1)) : (this.CloseMe(), ModelManager_1.ModelManager.ShowerModel.ExitAndClear()), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0, .5)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [3, () => {
        this.k41()
      }]
    ]
  }
  async OnBeforeStartAsync() {
    this.OX1 = new ShowerSkillButton_1.ShowerSkillButton, await this.OX1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.qX1 = new ShowerSkillButton_1.ShowerSkillButton, await this.qX1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.GX1 = new ShowerSkillButton_1.ShowerSkillButton, await this.GX1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())
  }
  OnBeforeShow() {
    this.FX1 = !1
  }
  OnStart() {
    this.OX1.SetPressCallback(() => {
      this.NX1()
    }), this.qX1.SetPressCallback(() => {
      this.VX1()
    }), this.GX1.SetPressCallback(this.jX1)
  }
  OnTick(e) {
    this.qX1.TickSkillCoolDown(e)
  }
}
exports.ShowerMainView = ShowerMainView;
//# sourceMappingURL=ShowerMainView.js.map