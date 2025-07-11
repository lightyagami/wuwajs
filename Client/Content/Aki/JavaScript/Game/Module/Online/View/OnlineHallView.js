"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineHallView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const InstanceDungeonMatchingCountDown_1 = require("../../InstanceDungeon/InstanceDungeonMatchingCountDown");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const OnlineController_1 = require("../OnlineController");
const OnlineHallItem_1 = require("./OnlineHallItem");
const OnlineTeamItem_1 = require("./OnlineTeamItem");
class OnlineHallView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.bNi = undefined;
    this.qNi = undefined;
    this.oli = undefined;
    this.a9t = undefined;
    this.GNi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name);
    this.NNi = () => new OnlineTeamItem_1.OnlineTeamItem();
    this.ONi = e => {
      ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = false;
      this.GetInputText(12).SetText("");
      this.h9t();
      this.IWs();
      if (e === 1) {
        ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(true);
        this.kNi(ModelManager_1.ModelManager.OnlineModel.ShowCanJoin ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend() : ModelManager_1.ModelManager.OnlineModel.FriendWorld);
      }
      if (e === 0) {
        ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(false);
        this.kNi(ModelManager_1.ModelManager.OnlineModel.ShowCanJoin ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger() : ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.VNi = () => {
      UiManager_1.UiManager.OpenView("OnlineSettingView");
    };
    this.jNi = () => {
      var e = this.GetText(7);
      var t = "PermissionsSetting_" + ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
      LguiUtil_1.LguiUtil.SetLocalText(e, t);
    };
    this.WNi = () => {
      this.kNi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
    };
    this.KNi = () => {
      this.QNi(ModelManager_1.ModelManager.OnlineModel.GetTeamList());
      this.XNi();
    };
    this.$Ye = () => {
      var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
      if (e === 0 || e === 2) {
        if (this.oli?.GetActive()) {
          this.oli?.PlayAnimation("Close");
        }
      } else if (e === 1) {
        this.oli?.PlayAnimation("Start");
        this.oli.SetMatchingTime(0);
        this.oli.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
        this.oli.StartTimer();
      }
    };
    this.YYe = () => {
      this.oli?.PlayAnimation("Start");
      this.oli.SetMatchingTime(0);
      this.oli.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
      this.oli.StartTimer();
    };
    this.h9t = () => {
      if (this.a9t) {
        if (this.GetInputText(12).GetText() === "") {
          this.a9t.RefreshSprite("SP_Paste");
        } else {
          this.a9t.RefreshSprite("SP_Clear");
        }
      }
    };
    this.aOi = () => {
      var e;
      var t;
      var i = this.GetInputText(12);
      if (i.GetText() === "") {
        t = (e = "", puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t);
        e = (0, puerts_1.$unref)(t);
        i.SetText(e);
      } else {
        i.SetText("");
      }
      this.h9t();
    };
    this.l9t = () => {
      var e;
      if (ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching) {
        ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = false;
        this.GetInputText(12).SetText("");
        this.h9t();
        this.IWs();
        this.kNi(this.GetExtendToggle(2).ToggleState === 1 ? ModelManager_1.ModelManager.OnlineModel.FriendWorld : ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
      } else if ((e = this.GetInputText(12).GetText()).length > 0) {
        OnlineController_1.OnlineController.LobbyQueryPlayersRequest(Number(e));
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("OnlineUserIdIsNull");
      }
    };
    this.sOi = () => {
      var e = ModelManager_1.ModelManager.OnlineModel.SearchResult;
      if (e) {
        this.kNi(e);
        ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = true;
      }
      this.IWs();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIExtendToggle], [3, UE.UIButtonComponent], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [7, UE.UIText], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UITextInputComponent], [13, UE.UIItem], [14, UE.UIText]];
    this.BtnBindInfo = [[0, this.Jvt], [1, this.VNi], [3, this.l9t]];
  }
  async OnBeforeStartAsync() {
    if (!ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      await OnlineController_1.OnlineController.RefreshWorldList();
    }
    this.oli = new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown();
    await this.oli.CreateByActorAsync(this.GetItem(11).GetOwner());
    this.oli.SetUiActive(false);
    this.$Ni();
  }
  OnStart() {
    this.XNi();
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      this.QNi(ModelManager_1.ModelManager.OnlineModel.GetTeamList());
    } else {
      this.kNi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
    }
    ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(false);
    ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(false);
    ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = false;
    this.jNi();
    ModelManager_1.ModelManager.FriendModel.ShowingView = this.Info.Name;
    var e = !Platform_1.Platform.IsPs5Platform();
    if (e) {
      this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(13));
      this.a9t.BindCallback(this.aOi);
    }
    this.GetItem(13)?.SetUIActive(e);
    this.GetInputText(12).OnTextChange.Bind(this.h9t);
    this.h9t();
    this.IWs();
  }
  OnAfterShow() {
    this.oli.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
    this.oli.BindOnClickBtnCancelMatching(() => {
      this.oli?.PlayAnimation("Close");
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    });
    this.oli?.BindOnAfterCloseAnimation(e => {
      if (e === "Close") {
        this.oli?.SetUiActive(false);
      }
    });
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1) {
      this.oli?.PlayAnimation("Start");
      this.oli.StartTimer();
    }
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(2).OnStateChange.Remove(this.ONi);
    this.bNi = undefined;
    this.qNi = undefined;
    this.oli = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPermissionsSetting, this.jNi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshWorldList, this.WNi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshOnlineTeamList, this.KNi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSearchWorld, this.sOi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPermissionsSetting, this.jNi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshWorldList, this.WNi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshOnlineTeamList, this.KNi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSearchWorld, this.sOi);
  }
  XNi() {
    var e;
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      this.GetItem(8).SetUIActive(false);
      this.Lrh();
      e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam();
      this.GetButton(1)?.RootUIComp.SetUIActive(e);
    } else {
      this.GetExtendToggle(2).OnStateChange.Add(this.ONi);
    }
  }
  async Lrh() {
    var e = await this.Arh(ModelManager_1.ModelManager.OnlineModel.GetTeamList());
    var t = this.GetItem(9);
    var i = this.GetText(10);
    t.SetUIActive(true);
    i.SetText(e.length + "/" + ModelManager_1.ModelManager.OnlineModel.TeamMaxSize);
  }
  $Ni() {
    var e;
    var t = this.GetLoopScrollViewComponent(4);
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      e = this.GetItem(5).GetOwner();
      this.qNi = new LoopScrollView_1.LoopScrollView(t, e, this.NNi, true);
    } else {
      e = this.GetItem(5).GetOwner();
      this.bNi = new LoopScrollView_1.LoopScrollView(t, e, this.GNi, true);
    }
  }
  async bFa(e) {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    if (e) {
      var i = [];
      for (const n of e) {
        if (n.GetIfCanShowInHallList(t)) {
          i.push(n);
        }
      }
      return i;
    }
  }
  kNi(e) {
    this.qFa(e);
  }
  async qFa(e) {
    var e = await this.bFa(e);
    var t = this.GetItem(6);
    var i = this.GetLoopScrollViewComponent(4).RootUIComp;
    if (!e || e.length <= 0) {
      t.SetUIActive(true);
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      t.SetUIActive(false);
      if (this.bNi) {
        this.bNi.RefreshByData(e, false, () => {
          var e;
          if (!(this.bNi.GetDisplayGridNum() <= 0)) {
            if ((e = this.bNi.UnsafeGetGridProxy(0)) && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("UiComponent", 5, "HallLoopScroll_Item_Alpha:" + e.GetRootItem().GetAlpha());
            }
          }
        }, true);
      }
    }
  }
  async Arh(e) {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    var i = [];
    for (const n of e) {
      if (n.GetIfCanShowInHallList(t)) {
        i.push(n);
      }
    }
    return i;
  }
  async Drh(e) {
    e = await this.Arh(e);
    this.GetItem(6).SetUIActive(e.length <= 0);
    if (this.qNi) {
      this.qNi.RefreshByData(e, false, () => {
        var e;
        if (!(this.qNi.GetDisplayGridNum() <= 0)) {
          if ((e = this.qNi.UnsafeGetGridProxy(0)) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiComponent", 5, "TeamLoopScroll_Item_Alpha:" + e.GetRootItem().GetAlpha());
          }
        }
      }, true);
    }
  }
  QNi(e) {
    this.Drh(e);
  }
  IWs() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching ? "Online_ResetSearch" : "Online_Search");
  }
}
exports.OnlineHallView = OnlineHallView;
//# sourceMappingURL=OnlineHallView.js.map