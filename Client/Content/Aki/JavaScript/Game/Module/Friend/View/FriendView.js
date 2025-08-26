"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const FriendController_1 = require("../FriendController");
const FriendItem_1 = require("./FriendItem");
class FriendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.C9t = undefined;
    this.g9t = undefined;
    this.f9t = undefined;
    this.p9t = undefined;
    this.v9t = undefined;
    this.M9t = undefined;
    this.E9t = undefined;
    this.C8t = undefined;
    this.S9t = [];
    this.Ivt = undefined;
    this.y9t = undefined;
    this.I9t = () => {
      return new FriendItem_1.FriendItem(this.Info.Name);
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      e = this.S9t[e];
      ModelManager_1.ModelManager.FriendModel.FilterState = e.Id;
      this.u8t();
    };
    this.yqe = e => {
      e = this.S9t[e];
      let t = undefined;
      if (e.Id === 1) {
        t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("FriendFriend");
      } else if (e.Id === 2) {
        t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("FriendApplicationList");
      } else if (e.Id === 3) {
        t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("FriendRecentMultiplayerGame");
      }
      return new CommonTabData_1.CommonTabData(e.IconPath, new CommonTabTitleData_1.CommonTabTitleData(t));
    };
    this.T9t = () => {
      var e = ModelManager_1.ModelManager.FriendModel.FilterState;
      var t = new UiPopViewData_1.UiPopViewData();
      if (e === 1) {
        UiManager_1.UiManager.OpenView("FriendSearchView", t);
      }
    };
    this.L9t = () => {
      this.p9t.GetRootItem().SetRaycastTarget(false);
      if (this.M9t && TimerSystem_1.GameplayTimerSystem.Has(this.M9t)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.M9t);
      }
      this.M9t = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.p9t.GetRootItem().SetRaycastTarget(true);
      }, TimerSystem_1.MIN_TIME);
      this.C8t = [];
      for (const t of this.f9t) {
        var e = ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(t.Id);
        if (e && !e?.Debug) {
          this.C8t.push(t.Id);
        }
      }
      FriendController_1.FriendController.RequestFriendApplyHandle(this.C8t, Protocol_1.Aki.Protocol.A6s.Proto_Approve);
    };
    this.D9t = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(59);
      this.v9t.GetRootItem().SetRaycastTarget(false);
      if (this.E9t && TimerSystem_1.GameplayTimerSystem.Has(this.E9t)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.E9t);
      }
      this.E9t = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.v9t.GetRootItem().SetRaycastTarget(true);
      }, TimerSystem_1.MIN_TIME);
      this.C8t = [];
      e.FunctionMap.set(2, () => {
        for (const e of this.f9t) {
          if (!ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(e.Id)?.Debug) {
            this.C8t.push(e.Id);
          }
        }
        FriendController_1.FriendController.RequestFriendApplyHandle(this.C8t, Protocol_1.Aki.Protocol.A6s.Proto_Reject);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.R9t = () => {
      var e = ModelManager_1.ModelManager.FriendModel.FilterState;
      var t = new UiPopViewData_1.UiPopViewData();
      if (e === 1) {
        UiManager_1.UiManager.OpenView("FriendBlackListView", t);
      }
    };
    this.U9t = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopiedMyUid");
      UE.LGUIBPLibrary.ClipBoardCopy(ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString());
    };
    this.e9t = () => {
      this.u8t();
    };
    this.A9t = () => {
      if (ModelManager_1.ModelManager.FriendModel.FilterState === 2) {
        this.u8t();
      }
    };
    this.m9t = t => {
      for (let e = 0; e < this.C9t.length; e++) {
        if (this.C9t[e].Id === t) {
          this.g9t.UnsafeGetGridProxy(e)?.RefreshMute();
          return;
        }
      }
    };
    this.P9t = () => {
      this.C9t = FriendController_1.FriendController.CreateFriendItemSt(ModelManager_1.ModelManager.FriendModel.GetRecentlyTeamIds(), 0);
      this.bqe(this.C9t);
      this.x9t();
    };
    this.DDo = () => {
      var e = !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState();
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SaveSdkFriendOnlyState(e);
      this.u8t();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [8, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIButtonComponent], [5, UE.UIText], [10, UE.UIExtendToggle], [11, UE.UIText]];
    this.BtnBindInfo = [[9, this.U9t], [10, this.DDo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FriendApplicationListUpdate, this.A9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent, this.P9t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FriendApplicationListUpdate, this.A9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.m9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent, this.P9t);
  }
  async OnBeforeStartAsync() {
    if (Platform_1.Platform.IsPs5Platform()) {
      this.GetButton(9)?.SetSelfInteractive(false);
    }
    this.y9t = this.GetLoopScrollViewComponent(2).RootUIComp;
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.v9t = new ButtonItem_1.ButtonItem(this.GetItem(7));
    var e = this.GetItem(3);
    this.g9t = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), e.GetOwner(), this.I9t, true);
    this.iPa();
    await this.UDt();
  }
  OnBeforeShow() {
    this.u8t();
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    this.S9t = [];
    this.g9t &&= undefined;
    ModelManager_1.ModelManager.FriendModel.Clear();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
    ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
  }
  async UDt() {
    this.S9t = ConfigManager_1.ConfigManager.FriendConfig.GetAllFilterConfigDuplicate();
    this.S9t.sort((e, t) => e.Id - t.Id);
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.CloseClick);
    var t = this.S9t.length;
    var i = this.Ivt.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      if (this.S9t[e].Id === 2) {
        i[e].RedDotName = "FriendNewApplication";
      }
    }
    await this.Ivt.RefreshTabItemAsync(i);
    this.Ivt.SelectToggleByIndex(0);
  }
  u8t() {
    var e = ModelManager_1.ModelManager.FriendModel;
    this.w9t();
    switch (e.FilterState) {
      case 1:
        this.C9t = FriendController_1.FriendController.CreateFriendItemSt(e.GetFriendSortedListIds(), 0);
        this.bqe(this.C9t);
        this.p9t.SetEnableClick(true);
        this.v9t.SetEnableClick(true);
        this.x9t();
        break;
      case 2:
        this.C9t = FriendController_1.FriendController.CreateFriendItemSt(e.GetFriendApplyListIds(), 0);
        this.f9t = this.C9t;
        this.bqe(this.C9t);
        this.p9t.SetEnableClick(this.C9t.length > 0);
        this.v9t.SetEnableClick(this.C9t.length > 0);
        ModelManager_1.ModelManager.FriendModel.MarkDirtyNewApplications();
        this.x9t();
        break;
      case 3:
        this.y9t?.SetUIActive(false);
        FriendController_1.FriendController.RequestFriendRecentlyTeam();
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "FriendMyUid", ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
  }
  B9t() {
    let e = false;
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        e = true;
        this.p9t.SetLocalText("FriendAddFriend");
        this.p9t.SetFunction(this.T9t);
        this.v9t.SetLocalText("FriendBlackList");
        this.v9t.SetFunction(this.R9t);
        break;
      case 2:
        e = true;
        this.p9t.SetLocalText("FriendAllAccept");
        this.p9t.SetFunction(this.L9t);
        this.v9t.SetLocalText("FriendAllIgnore");
        this.v9t.SetFunction(this.D9t);
    }
    this.p9t.SetActive(e);
    this.v9t.SetActive(e);
  }
  w9t() {
    let e = "FriendNotAvailableFriend";
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        break;
      case 2:
        e = "FriendNotAvailableFriendApplication";
        break;
      case 3:
        e = "FriendNotAvailableRecentTeammate";
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), e);
    this.B9t();
  }
  x9t() {
    var e = ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(ModelManager_1.ModelManager.FriendModel.FilterState);
    var t = this.GetText(1);
    var i = this.C9t.length;
    let r = "FriendCount";
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        break;
      case 2:
        r = "FriendApplicationCount";
        break;
      case 3:
        r = "FriendMultiplayerCount";
    }
    LguiUtil_1.LguiUtil.SetLocalText(t, r, i, e);
    this.GetItem(4).SetUIActive(i <= 0);
  }
  bqe(e) {
    if (this.g9t && e.length > 0) {
      this.y9t?.SetUIActive(true);
      this.g9t.RefreshByData(e);
    } else {
      this.y9t?.SetUIActive(false);
    }
  }
  iPa() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SupportSwitchFriendShowType()) {
      this.GetExtendToggle(10).RootUIComp.SetUIActive(true);
      this.GetText(11).SetUIActive(true);
      this.rPa();
    } else {
      this.GetExtendToggle(10).RootUIComp.SetUIActive(false);
      this.GetText(11).SetUIActive(false);
    }
  }
  rPa() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState() ? 1 : 0;
    this.GetExtendToggle(10).SetToggleState(e);
  }
}
exports.FriendView = FriendView;
//# sourceMappingURL=FriendView.js.map