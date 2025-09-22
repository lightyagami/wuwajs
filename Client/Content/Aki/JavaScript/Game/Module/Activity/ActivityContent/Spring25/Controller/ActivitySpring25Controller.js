"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySpring25Controller = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const HelpController_1 = require("../../../../Help/HelpController");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityManager_1 = require("../../../ActivityManager");
const Spring25Define_1 = require("../Spring25Define");
const ActivitySpring25SubView_1 = require("../View/ActivitySpring25SubView");
var Proto_ActivityType = Protocol_1.Aki.Protocol.uks;
var Proto_SpringSignDrawRoleRequest = Protocol_1.Aki.Protocol.qp_;
var Proto_SpringSignDrawRewardRequest = Protocol_1.Aki.Protocol.Qp_;
var Proto_SpringSignSkinRewardRequest = Protocol_1.Aki.Protocol._0_;
var Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n;
var Proto_SpringSignPhotoRewardRequest = Protocol_1.Aki.Protocol.xv_;
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
class ActivitySpring25Controller extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.OCl = undefined;
    this.NCl = () => {
      this.OCl?.SetResult();
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_SpringAGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySpring25SubView_1.ActivitySpring25SubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.Spring25Model.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return UiManager_1.UiManager.IsViewOpen("Spring25MainView") || UiManager_1.UiManager.IsViewOpen("Spring25InfoView") || UiManager_1.UiManager.IsViewOpen("Spring25DialogueView") || UiManager_1.UiManager.IsViewOpen("Spring25EnvelopeView") || UiManager_1.UiManager.IsViewOpen("Spring25LetterListView");
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.NCl);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.NCl);
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(Proto_ActivityType.Proto_SprintSign);
  }
  async RequestSpringSignDrawRoleRequest() {
    var e;
    var r = Proto_SpringSignDrawRoleRequest.create();
    var r = await Net_1.Net.CallAsync(29788, r);
    return r !== undefined && (r.Q4n !== Proto_ErrorCode.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 15603), false) : ((e = ModelManager_1.ModelManager.Spring25Model).SyncSpringSignDrawRoleResponse(r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25InviteDone), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.CurrentActivityId), true));
  }
  async RequestSpringSignDrawRewardRequest(e) {
    var r = Proto_SpringSignDrawRewardRequest.create();
    r.s5n = e;
    var r = await Net_1.Net.CallAsync(25565, r);
    if (r !== undefined) {
      if (r.Q4n !== Proto_ErrorCode.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 15705);
      } else {
        (r = ModelManager_1.ModelManager.Spring25Model).SyncSpringSignDrawRewardResponse(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25DrawRewardDone);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.CurrentActivityId);
      }
    }
  }
  async J2l() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    var r = Proto_SpringSignSkinRewardRequest.create();
    var r = await Net_1.Net.CallAsync(25042, r);
    if (r !== undefined) {
      if (r.Q4n !== Proto_ErrorCode.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 27073);
      } else {
        e.SyncSpringSignSkinRewardResponse();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25SkinRewardDone);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.CurrentActivityId);
      }
    }
  }
  async gWl() {
    var e = Proto_SpringSignPhotoRewardRequest.create();
    var e = await Net_1.Net.CallAsync(21846, e);
    if (e !== undefined && e.Q4n !== Proto_ErrorCode.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22354);
    }
  }
  HandleConfirmClickInActivitySubView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.OpenView("Spring25MainView", e.BuildMainViewData());
  }
  async HandleInviteClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    if (e.IsAllInvited) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(Spring25Define_1.ALL_CHARACTER_INVITED);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25UnlockAnimDone);
    } else if (e.IsInviteAvailableExternal) {
      await this.RequestSpringSignDrawRoleRequest();
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(Spring25Define_1.REMAIN_CHANCE_NOT_ENOUGH);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25UnlockAnimDone);
    }
  }
  HandleGiftClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.OpenView("Spring25InfoView", e.BuildInfoViewData());
  }
  HandleLetterClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    if (e.IsLetterListViewAvailable) {
      e.InitLetterSignIdForLetterListView();
      UiManager_1.UiManager.OpenView("Spring25LetterListView", e.BuildLetterListViewData());
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(Spring25Define_1.NO_LETTER_TIPS_TEXT_ID);
    }
  }
  HandleResetCurrentSignId() {
    ModelManager_1.ModelManager.Spring25Model.ResetCurrentSignId();
  }
  HandleOpenOpeningDialogViewInMainView() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstEnter, false);
    var e = ModelManager_1.ModelManager.Spring25Model.BuildStartDialogueViewData();
    UiManager_1.UiManager.OpenView("Spring25DialogueView", e);
  }
  HandleLetterClickInLetterListView(e) {
    ModelManager_1.ModelManager.Spring25Model.TrySetCurrentLetterSignId(e);
  }
  HandleHelpClick() {
    var e = ModelManager_1.ModelManager.Spring25Model.HelpId;
    HelpController_1.HelpController.OpenHelpById(e);
  }
  HandleConfirmClickInDialogueView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.CloseView("Spring25DialogueView");
    if (e.NeedOpenEnvelopeView) {
      UiManager_1.UiManager.OpenView("Spring25EnvelopeView", e.BuildEnvelopeViewData());
    }
  }
  HandleOpenSkinPreview() {
    var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(Spring25Define_1.SANHUA_SKIN_ITEM_ID);
    if (e) {
      ControllerHolder_1.ControllerHolder.SkinController.OpenBuyRoleSkinPreviewDetailViewByRoleSkinData([e]);
    }
  }
  HandleRequestRewardSkin() {
    if (!ModelManager_1.ModelManager.Spring25Model.IsSkinRewarded) {
      this.J2l();
    }
  }
  HandleWhenUnlockAnimEnd() {
    var e = ModelManager_1.ModelManager.Spring25Model.BuildDialogueViewData();
    if (e !== undefined) {
      UiManager_1.UiManager.OpenView("Spring25DialogueView", e);
    }
  }
  async HandleTryOpenShareViewAsync() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    if (e.IsAllInvited && this.OCl === undefined) {
      this.OCl = new CustomPromise_1.CustomPromise();
      await this.gWl();
      await this.OCl.Promise;
      this.OCl = undefined;
      e = {
        ScreenShot: false,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: false,
        Spring25Data: {
          PhotoPath: e.SharePhotoPath
        },
        RoleSkinData: undefined,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined
      };
      UiManager_1.UiManager.OpenView("PhotoSaveView", e);
    }
  }
}
exports.ActivitySpring25Controller = ActivitySpring25Controller;
//# sourceMappingURL=ActivitySpring25Controller.js.map