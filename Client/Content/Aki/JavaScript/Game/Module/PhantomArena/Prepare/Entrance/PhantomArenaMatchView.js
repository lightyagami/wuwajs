"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMatchView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
const PhantomArenaNpcItem_1 = require("../../Common/NpcItem/PhantomArenaNpcItem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaMatchGymItem_1 = require("./PhantomArenaMatchGymItem");
class PhantomArenaMatchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Stu = -1;
    this.o71 = undefined;
    this.Mtu = undefined;
    this.s71 = undefined;
    this.a71 = undefined;
    this.Etu = [];
    this.l71 = undefined;
    this._71 = undefined;
    this.u71 = undefined;
    this.$pt = undefined;
    this.Itu = () => {
      var e = new PhantomArenaMatchGymItem_1.MatchGymItem();
      e.CallbackOnClick = this.Ttu;
      return e;
    };
    this.d71 = () => {
      var e = new PhantomArenaNpcItem_1.NpcItem();
      e.CallbackOnClick = this.m71;
      return e;
    };
    this.rOe = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = this.JCu;
      return e;
    };
    this.Ttu = (e, t, i) => {
      if (this.Stu === e || i === 2) {
        if (ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(e)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_GYM_LOCK_TEXT_ID);
        }
      } else {
        this.Stu = e;
        this.o71 = undefined;
        this.Mtu.DeselectCurrentGridProxy();
        this.Mtu.SelectGridProxy(t);
        this.WNe();
        this.f71();
        this.nOe();
        this.$pt.PlayOrReplaySequenceByName("Switch");
      }
    };
    this.m71 = (e, t, i) => {
      if (this.o71 === e || i === 2) {
        if (ModelManager_1.ModelManager.PhantomArenaModel.IsChallengeLock(e.Id)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_NPC_LOCK_TEXT_ID);
        }
      } else {
        this.o71 = e;
        this.s71.DeselectCurrentGridProxy();
        this.s71.SelectGridProxy(t);
        this.nOe();
      }
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.p5t = () => {
      var e;
      var t;
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.r_u);
      if (i) {
        e = i.TeleporterId;
        i = i.QuestId;
        if ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i)) === 1 || t === 2) {
          QuestController_1.QuestNewController.RequestTrackQuest(i, true, 2);
          t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, t.Tree.BtType, t.Tree.TreeIncId);
        }
        WorldMapController_1.WorldMapController.TryTeleport(e, this.YCu);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.o71]);
      }
    };
    this.YCu = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.JCu = e => {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateById(this.r_u) === 2;
    };
    this.e5u = () => {
      for (const e of this.Mtu?.GetLayoutItemList()) {
        e.RefreshRedDot();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIExtendToggle], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UITexture]];
    this.BtnBindInfo = [[0, this._5e], [14, this.p5t]];
  }
  async OnBeforeStartAsync() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this._71 = new CardElementItem_1.CardElementItem();
    await this._71.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.u71 = new CardElementItem_1.CardElementItem();
    await this.u71.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  OnStart() {
    this.a71 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.rOe, this.GetItem(13).GetOwner());
    this.Mtu = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Itu);
    this.s71 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.d71);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymLevelList(true);
    this.Etu = e;
    this.Mtu.RefreshByData(e);
    this.Stu = this.OpenParam;
    var e = this.Etu.indexOf(this.Stu);
    this.Mtu.DeselectCurrentGridProxy();
    this.Mtu.SelectGridProxy(e);
    this.WNe();
    this.f71();
    this.nOe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.e5u);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.e5u);
  }
  WNe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymConfigByLevel(this.Stu);
    this.SetTextureByPath(e.TextureBg, this.GetTexture(15));
  }
  f71() {
    var e;
    if (this.Stu) {
      e = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(this.Stu);
      this.l71 = e;
      this.s71.RefreshByData(e);
      this.s71.DeselectCurrentGridProxy();
      if (this.r_u < 0) {
        this.o71 = this.l71?.[0];
      }
      e = this.l71.indexOf(this.o71);
      this.s71.SelectGridProxy(e);
      ModelManager_1.ModelManager.PhantomArenaModel.SetGymRedDotChecked(this.Stu);
    } else {
      this.s71.RefreshByData([]);
    }
  }
  nOe() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.r_u);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ChallengeName);
      this.GetText(6).SetText(e.NpcLevel.toString());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.NpcName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.NpcTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), e.NpcDesc);
      e = e.Elements;
      this._71.RefreshElementTabIcon(e[0]);
      this.u71.RefreshElementTabIcon(e[1]);
      e = ModelManager_1.ModelManager.PhantomArenaModel.GetFirstRewardListByChallengeId(this.r_u);
      this.a71.RefreshByData(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.o71]);
    }
  }
  get r_u() {
    return this.o71?.Id ?? -1;
  }
}
exports.PhantomArenaMatchView = PhantomArenaMatchView;
//# sourceMappingURL=PhantomArenaMatchView.js.map