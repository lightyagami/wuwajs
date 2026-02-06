"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayLetterView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const BirthDayByYear_1 = require("../../../../Core/Define/ConfigQuery/BirthDayByYear");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleBirthdayById_1 = require("../../../../Core/Define/ConfigQuery/RoleBirthdayById");
const RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const PhotographController_1 = require("../../Photograph/PhotographController");
const RoleController_1 = require("../../RoleUi/RoleController");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const SplashScreenController_1 = require("../../SplashScreen/SplashScreenController");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const BirthdayController_1 = require("../BirthdayController");
const BirthdayDefine_1 = require("../BirthdayDefine");
const BirthdayRewardItem_1 = require("./BirthdayRewardItem");
const HEIGHT_PER_LINE = 60;
class BirthdayLetterView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.UI1 = undefined;
    this.xVi = undefined;
    this.dFe = 0;
    this.DI1 = 0;
    this.BI1 = true;
    this.kI1 = "";
    this.OI1 = "";
    this.x4e = false;
    this.Jkt = 0;
    this.Zge = 0;
    this.QYt = undefined;
    this.XYt = undefined;
    this.GZi = undefined;
    this.NZi = undefined;
    this.uqm = 0;
    this.A11 = 0;
    this.wK1 = 0;
    this.QI1 = undefined;
    this.JGe = () => new BirthdayRewardItem_1.BirthdayRewardItem();
    this.Awe = () => {
      var e;
      if (this.A11 === 0 || !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.A11 < this.wK1)) {
        this.A11 = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        if (this.BI1) {
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.kI1);
          this.xVi.Model?.CheckGetComponent(16)?.SetState(3);
          this.PlaySequence("WindowClose");
          this.BI1 = false;
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(ModelManager_1.ModelManager.BirthdayModel.GetLetterExitConfirmId(this.QI1.Year))).FunctionMap.set(2, () => {
            this.CloseBirthdayLetterView();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
    this.GI1 = () => {
      if (this.A11 === 0 || !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.A11 < this.wK1)) {
        this.A11 = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        this.FI1();
        this.PlaySequence("WindowOpen");
      }
    };
    this.NI1 = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: true,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined,
        ShareId: 7
      });
    };
    this.ODo = () => {
      UiManager_1.UiManager.OpenViewWithLayer("BirthdayRoleSelectView", UiLayerType_1.ELayerType.Pop, new BirthdayDefine_1.BirthdayInfo(2, this.DI1));
    };
    this.Do1 = () => {
      this.XYt.Stop();
      this.QYt.SetSelectorOffset(0);
    };
    this.cqm = e => {
      this.dFe = e;
      let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)?.GetRoleSkinId();
      i = i || RoleInfoById_1.configRoleInfoById.GetConfig(this.dFe).SkinId;
      RoleController_1.RoleController.OnSelectedRoleChangeByConfig(e, i);
      this.PlaySequence("WindowOpen");
      this.OnBeforeShow();
      this.GetScrollViewWithScrollbar(12)?.SetScrollValue(Vector2D_1.Vector2D.ZeroVector);
    };
  }
  GetExtraResourceId(e) {
    if (e) {
      return ModelManager_1.ModelManager.BirthdayModel.GetLetterViewResource(e.Year);
    } else {
      return "";
    }
  }
  OnGetLoopAudioEvent() {
    var e = this.OpenParam;
    if (!e || (e = ModelManager_1.ModelManager.BirthdayModel.GetLetterViewBgm(e.Year), StringUtils_1.StringUtils.IsBlank(e))) {
      return super.OnGetLoopAudioEvent();
    } else {
      return e;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UISizeControlByOther], [12, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.Awe], [4, this.GI1], [3, this.NI1], [10, this.ODo]];
  }
  async OnBeforeStartAsync() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthRoleChange, this.cqm);
    var e = this.OpenParam;
    this.QI1 = e;
    this.dFe = e.RoleId;
    this.DI1 = e.Year;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(this.dFe).SkinId;
    this.xVi = await RoleController_1.RoleController.LoadUiSceneRoleActorByConfigIdAsync(1, this.dFe, i);
    this.UI1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.JGe);
  }
  OnBeforeShow() {
    this.x4e = BirthdayController_1.BirthdayController.TryBirthDayRewardRequest(this.DI1);
    var e;
    var i = ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(this.DI1);
    if (this.QI1.TriggerType === 0 || i === undefined || i === 0) {
      BirthdayController_1.BirthdayController.TrySelectBirthDayCardRoleRequest(this.dFe, this.DI1);
    }
    this.VI1();
    var i = RoleBirthdayById_1.configRoleBirthdayById.GetConfig(this.dFe);
    if (i) {
      this.wK1 = CommonParamById_1.configCommonParamById.GetIntConfig("BirthdayEnvelopeInterval");
      this.kI1 = i.SceneCameraId;
      this.OI1 = i.CardCameraId;
      AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "mute");
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe).Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BirthdayLetterTitle", e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.CardTextKey);
      e = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.DI1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "BirthdayLetterTime", this.DI1, e.getMonth() + 1, e.getDate());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.CardTextKey);
      e = BirthDayByYear_1.configBirthDayByYear.GetConfig(this.DI1);
      this.Jkt = e.BirthDayReward;
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Jkt);
      this.UI1.RefreshByData(e);
      this.Zge = AudioSystem_1.AudioSystem.PostEvent(i.VoiceEvent, undefined, {
        CallbackMask: 9,
        CallbackHandler: (e, i) => {
          if (e === 3) {
            this.gCt(i.Duration / CommonDefine_1.MILLIONSECOND_PER_SECOND);
            this.FI1();
            this.GetUiSizeControlByOther(11).MinHeight = Math.ceil(this.GetScrollViewWithScrollbar(12).RootUIComp.Height / HEIGHT_PER_LINE) * HEIGHT_PER_LINE;
          }
        }
      });
    }
  }
  VI1() {
    this.xVi.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  FI1() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.OI1);
    this.xVi.Model?.CheckGetComponent(16)?.SetState(7);
    this.BI1 = true;
  }
  gCt(e) {
    this.QYt = this.GetText(6).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.XYt = this.GetText(6).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt?.SetSelectorOffset(1);
    this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.Do1);
    this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi);
    this.uqm = e;
    this.GetText(6).SetUIActive(false);
    this.P9e();
  }
  P9e() {
    this.GetText(6).SetUIActive(true);
    if (this.XYt) {
      this.QYt.SetSelectorOffset(1);
      this.XYt.GetPlayTween().duration = this.uqm + ModelManager_1.ModelManager.BirthdayModel.GetPlayTimeOffset();
      this.XYt.Play();
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthRoleChange, this.cqm);
    if (this.NZi) {
      this.XYt?.GetPlayTween()?.UnregisterOnComplete(this.NZi);
      this.NZi = undefined;
    }
    (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
    this.GZi = undefined;
    if (this.xVi) {
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi);
      this.xVi = undefined;
    }
    AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "none");
  }
  CloseBirthdayLetterView() {
    this.CloseMe();
    if (this.Zge !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
    }
    if (this.x4e) {
      var e;
      var i;
      var t = [];
      for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Jkt)) {
        var r = new RewardItemData_1.RewardItemData(e.ItemId, i);
        t.push(r);
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1009, t, () => {
        SplashScreenController_1.SplashScreenController.FinishCurTask(2);
      });
    } else {
      SplashScreenController_1.SplashScreenController.FinishCurTask(2);
    }
  }
}
exports.BirthdayLetterView = BirthdayLetterView;
//# sourceMappingURL=BirthdayLetterView.js.map