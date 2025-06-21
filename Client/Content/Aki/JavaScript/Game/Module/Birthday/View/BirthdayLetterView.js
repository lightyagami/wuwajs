"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BirthdayLetterView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  BirthDayByYear_1 = require("../../../../Core/Define/ConfigQuery/BirthDayByYear"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RoleBirthdayById_1 = require("../../../../Core/Define/ConfigQuery/RoleBirthdayById"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  PhotographController_1 = require("../../Photograph/PhotographController"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  SplashScreenController_1 = require("../../SplashScreen/SplashScreenController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  BirthdayController_1 = require("../BirthdayController"),
  BirthdayRewardItem_1 = require("./BirthdayRewardItem");
class BirthdayLetterView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.hI1 = void 0, this.xVi = void 0, this.dFe = 0, this.lI1 = 0, this._I1 = !0, this.uI1 = "", this.cI1 = "", this.x4e = !1, this.Jkt = 0, this.Zge = 0, this.QYt = void 0, this.XYt = void 0, this.GZi = void 0, this.NZi = void 0, this.co1 = 0, this.s11 = 0, this.VQ1 = 0, this.JGe = () => new BirthdayRewardItem_1.BirthdayRewardItem, this.Awe = () => {
      var e;
      0 !== this.s11 && TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.s11 < this.VQ1 || (this.s11 = TimeUtil_1.TimeUtil.GetServerTimeStamp(), this._I1 ? (UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.uI1), (this.xVi.Model?.CheckGetComponent(16))?.SetState(3), this.PlaySequence("WindowClose"), this._I1 = !1) : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(302)).FunctionMap.set(2, () => {
        this.CloseBirthdayLetterView()
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)))
    }, this.mI1 = () => {
      0 !== this.s11 && TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.s11 < this.VQ1 || (this.s11 = TimeUtil_1.TimeUtil.GetServerTimeStamp(), this.fI1(), this.PlaySequence("WindowOpen"))
    }, this.gI1 = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: !0,
        PrepareFullScreenShot: !1,
        IsHiddenBattleView: !0,
        HandBookPhotoData: void 0,
        GachaData: void 0,
        FragmentMemory: void 0,
        RoleSkinData: void 0,
        ShareId: 7
      })
    }, this.do1 = () => {
      this.XYt.Stop(), this.QYt.SetSelectorOffset(0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIScrollViewWithScrollbarComponent],
      [8, UE.UIItem],
      [9, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Awe],
      [4, this.mI1],
      [3, this.gI1]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.dFe = e.RoleId, this.lI1 = e.Year;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(this.dFe).SkinId, this.xVi = await RoleController_1.RoleController.LoadUiSceneRoleActorByConfigIdAsync(1, this.dFe, i)
  }
  OnBeforeShow() {
    this.x4e = BirthdayController_1.BirthdayController.TryBirthDayRewardRequest(this.lI1), BirthdayController_1.BirthdayController.TrySelectBirthDayCardRoleRequest(this.dFe, this.lI1), this.CI1();
    var e, i = RoleBirthdayById_1.configRoleBirthdayById.GetConfig(this.dFe);
    i && (this.VQ1 = CommonParamById_1.configCommonParamById.GetIntConfig("BirthdayEnvelopeInterval"), this.uI1 = i.SceneCameraId, this.cI1 = i.CardCameraId, AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "mute"), this.fI1(), e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BirthdayLetterTitle", e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.CardTextKey), e = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.lI1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "BirthdayLetterTime", this.lI1, e.getMonth() + 1, e.getDate()), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.CardTextKey), e = BirthDayByYear_1.configBirthDayByYear.GetConfig(this.lI1), this.Jkt = e.BirthDayReward, this.hI1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.JGe), e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Jkt), this.hI1.RefreshByData(e), this.gCt(), this.Zge = AudioSystem_1.AudioSystem.PostEvent(i.VoiceEvent, void 0, {
      CallbackMask: 1,
      CallbackHandler: () => {}
    }))
  }
  CI1() {
    (this.xVi.Model?.CheckGetComponent(1))?.SetTransformByTag("RoleCase")
  }
  fI1() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.cI1), (this.xVi.Model?.CheckGetComponent(16))?.SetState(7), this._I1 = !0
  }
  gCt() {
    this.QYt = this.GetText(6).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass()), this.XYt = this.GetText(6).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()), this.QYt?.SetSelectorOffset(1), this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.do1), this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi), this.co1 = CommonParamById_1.configCommonParamById.GetFloatConfig("BirthdayTextSpeed") ?? 10, this.GetText(6).SetUIActive(!1), this.P9e()
  }
  P9e() {
    var e = this.GetText(6),
      e = (e.SetUIActive(!0), e.GetDisplayCharLength());
    this.XYt && (e = e / this.co1, this.QYt.SetSelectorOffset(1), this.XYt.GetPlayTween().duration = e, this.XYt.Play())
  }
  OnBeforeDestroy() {
    this.NZi && (this.XYt?.GetPlayTween()?.UnregisterOnComplete(this.NZi), this.NZi = void 0), (0, puerts_1.releaseManualReleaseDelegate)(this.do1), this.GZi = void 0, this.xVi && (UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi), this.xVi = void 0), AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "none")
  }
  CloseBirthdayLetterView() {
    if (this.CloseMe(), 0 !== this.Zge && AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0), this.x4e) {
      var e, i, t = [];
      for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Jkt)) {
        var r = new RewardItemData_1.RewardItemData(e.ItemId, i);
        t.push(r)
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1009, t, () => {
        SplashScreenController_1.SplashScreenController.FinishCurTask(2)
      })
    } else SplashScreenController_1.SplashScreenController.FinishCurTask(2)
  }
}
exports.BirthdayLetterView = BirthdayLetterView;
//# sourceMappingURL=BirthdayLetterView.js.map