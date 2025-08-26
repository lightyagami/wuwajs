"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendSearchView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const FriendController_1 = require("../FriendController");
const FriendItem_1 = require("./FriendItem");
class FriendSearchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.n9t = undefined;
    this.s9t = [];
    this.Zxa = 0;
    this.a9t = undefined;
    this.ePa = () => {
      this.Zxa = this.Zxa === 0 ? 1 : 0;
      this.tPa();
      this.Nah();
      this.Iwn();
    };
    this.fGe = () => {
      return new FriendItem_1.FriendItem(this.Info.Name);
    };
    this.h9t = () => {
      if (this.a9t) {
        if (this.GetInputText(0).GetText() === "") {
          this.a9t.RefreshSprite("SP_Paste");
          this.a9t.BindCallback(this.QAt);
        } else {
          this.a9t.RefreshSprite("SP_Clear");
          this.a9t.BindCallback(this.KAt);
        }
      }
    };
    this.KAt = () => {
      this.GetInputText(0).SetText("");
      this.h9t();
    };
    this.QAt = () => {
      if (Platform_1.Platform.IsCloudGame()) {
        const i = this.GetInputText(0);
        let e;
        const r = (0, puerts_1.$ref)("");
        UE.KuroCloudGameWrapper.ClipBoardPaste();
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UE.LGUIBPLibrary.ClipBoardPaste(r);
          e = (0, puerts_1.$unref)(r);
          i.SetText(e);
          this.h9t();
        }, 200);
      } else {
        var e = this.GetInputText(0);
        var t = (0, puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t);
        t = (0, puerts_1.$unref)(t);
        e.SetText(t);
        this.h9t();
      }
    };
    this.l9t = () => {
      var e = ModelManager_1.ModelManager.FriendModel;
      e.ClearApplyFriendList();
      e.ClearApproveFriendList();
      e.ClearRefuseFriendList();
      var e = this.GetInputText(0).GetText();
      if (e.length > 0) {
        if (this.Zxa === 0) {
          FriendController_1.FriendController.RequestSearchPlayerBasicInfo(Number(e));
        } else {
          FriendController_1.FriendController.RequestSearchPlayerBasicInfoBySdkId(e);
        }
      }
    };
    this._9t = e => {
      this.s9t = FriendController_1.FriendController.CreateFriendItemSt([e], 0);
      this.u8t();
    };
    this.u9t = e => {
      this.s9t = FriendController_1.FriendController.CreateFriendItemSt([e], 1);
      this.u8t();
    };
    this.c9t = (e, t) => {
      this.s9t = FriendController_1.FriendController.CreateFriendItemSt(t, e);
      this.u8t();
    };
    this.m9t = t => {
      for (let e = 0; e < this.s9t.length; e++) {
        if (this.s9t[e].Id === t) {
          this.n9t.UnsafeGetGridProxy(e)?.RefreshMute();
          return;
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITextInputComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[2, this.l9t], [6, this.ePa]];
  }
  Nah() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SupportSwitchFriendSearchByThirdPartyId()) {
      e = this.Zxa === 0 ? "Search_UID_Tips" : "Search_PSN_ID_Tips";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Search_UID_Tips");
    }
  }
  Iwn() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SupportSwitchFriendSearchByThirdPartyId()) {
      e = this.Zxa === 0 ? "Search_UID_Result" : "Search_PSN_ID_Result";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "Search_UID_Result");
    }
  }
  tPa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SupportSwitchFriendSearchByThirdPartyId()) {
      this.GetButton(6).RootUIComp.SetUIActive(true);
      e = this.Zxa === 0 ? "NormalSearch" : "PlayStationSearch";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e);
    } else {
      this.GetButton(6).RootUIComp.SetUIActive(false);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SearchPlayerInfo, this._9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ApplicationSent, this.u9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ApplicationHandled, this.c9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.m9t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SearchPlayerInfo, this._9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ApplicationSent, this.u9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ApplicationHandled, this.c9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.m9t);
  }
  async OnBeforeStartAsync() {}
  OnStart() {
    var e = !Platform_1.Platform.IsPs5Platform();
    if (e) {
      this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1));
    }
    this.GetItem(1)?.SetUIActive(e);
    var e = this.GetItem(3);
    this.n9t = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), e.GetOwner(), this.fGe, true);
    this.GetInputText(0).OnTextChange.Bind(this.h9t);
    var e = ModelManager_1.ModelManager.FriendModel;
    e.ClearFriendSearchResults();
    this.s9t = FriendController_1.FriendController.CreateFriendItemSt(e.GetFriendSearchResultListIds(), 0);
    this.u8t();
  }
  OnAfterHide() {
    var e = ModelManager_1.ModelManager.FriendModel;
    e.ClearApplyFriendList();
    e.ClearApproveFriendList();
    e.ClearRefuseFriendList();
  }
  OnBeforeDestroy() {
    this.GetInputText(0).OnTextChange.Unbind();
    ModelManager_1.ModelManager.FriendModel.ResetShowingView();
  }
  u8t() {
    if (this.s9t.length > 0) {
      this.n9t.RefreshByData(this.s9t);
    }
    this.d9t();
    this.tPa();
    this.Nah();
    this.Iwn();
  }
  d9t() {
    this.GetInputText(0).SetText("");
    this.h9t();
    this.GetItem(5).SetUIActive(this.s9t.length <= 0);
    this.GetLoopScrollViewComponent(4).RootUIComp.SetUIActive(this.s9t.length > 0);
  }
}
exports.FriendSearchView = FriendSearchView;
//# sourceMappingURL=FriendSearchView.js.map