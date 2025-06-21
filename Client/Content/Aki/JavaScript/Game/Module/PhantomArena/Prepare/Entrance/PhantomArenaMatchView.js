"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMatchView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem"),
  PhantomArenaNpcItem_1 = require("../../Common/NpcItem/PhantomArenaNpcItem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaMatchGymItem_1 = require("./PhantomArenaMatchGymItem");
class PhantomArenaMatchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.eeu = -1, this.Ej1 = void 0, this.teu = void 0, this.Tj1 = void 0, this.bj1 = void 0, this.ieu = [], this.Lj1 = void 0, this.wj1 = void 0, this.Aj1 = void 0, this.$pt = void 0, this.reu = () => {
      var e = new PhantomArenaMatchGymItem_1.MatchGymItem;
      return e.CallbackOnClick = this.oeu, e
    }, this.xj1 = () => {
      var e = new PhantomArenaNpcItem_1.NpcItem;
      return e.CallbackOnClick = this.Dj1, e
    }, this.rOe = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid;
      return e.ShowReceivedCallBack = this.klu, e
    }, this.oeu = (e, t, i) => {
      this.eeu === e || 2 === i ? ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(e) && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_GYM_LOCK_TEXT_ID) : (this.eeu = e, this.Ej1 = void 0, this.teu.DeselectCurrentGridProxy(), this.teu.SelectGridProxy(t), this.WNe(), this.Uj1(), this.nOe(), this.$pt.PlayOrReplaySequenceByName("Switch"))
    }, this.Dj1 = (e, t, i) => {
      this.Ej1 === e || 2 === i ? ModelManager_1.ModelManager.PhantomArenaModel.IsChallengeLock(e.Id) && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_NPC_LOCK_TEXT_ID) : (this.Ej1 = e, this.Tj1.DeselectCurrentGridProxy(), this.Tj1.SelectGridProxy(t), this.nOe())
    }, this._5e = () => {
      this.CloseMe()
    }, this.p5t = () => {
      var e, t, i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.nnu);
      i ? (e = i.TeleporterId, i = i.QuestId, 1 !== (t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i)) && 2 !== t || (QuestController_1.QuestNewController.RequestTrackQuest(i, !0, 2), t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, t.Tree.BtType, t.Tree.TreeIncId)), WorldMapController_1.WorldMapController.TryTeleport(e, this.Dlu)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.Ej1])
    }, this.Dlu = () => {
      UiManager_1.UiManager.ResetToBattleView()
    }, this.klu = e => {
      return 2 === ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateById(this.nnu)
    }, this.Dgu = () => {
      for (const e of this.teu?.GetLayoutItemList()) e.RefreshRedDot()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIExtendToggle],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIScrollViewWithScrollbarComponent],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UITexture]
    ], this.BtnBindInfo = [
      [0, this._5e],
      [14, this.p5t]
    ]
  }
  async OnBeforeStartAsync() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), this.wj1 = new CardElementItem_1.CardElementItem, await this.wj1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.Aj1 = new CardElementItem_1.CardElementItem, await this.Aj1.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())
  }
  OnStart() {
    this.bj1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.rOe, this.GetItem(13).GetOwner()), this.teu = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.reu), this.Tj1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.xj1)
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymLevelList(!0),
      e = (this.ieu = e, this.teu.RefreshByData(e), this.eeu = this.OpenParam, this.ieu.indexOf(this.eeu));
    this.teu.DeselectCurrentGridProxy(), this.teu.SelectGridProxy(e), this.WNe(), this.Uj1(), this.nOe()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.Dgu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.Dgu)
  }
  WNe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymConfigByLevel(this.eeu);
    this.SetTextureByPath(e.TextureBg, this.GetTexture(15))
  }
  Uj1() {
    var e;
    this.eeu ? (e = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(this.eeu), this.Lj1 = e, this.Tj1.RefreshByData(e), this.Tj1.DeselectCurrentGridProxy(), this.nnu < 0 && (this.Ej1 = this.Lj1?.[0]), e = this.Lj1.indexOf(this.Ej1), this.Tj1.SelectGridProxy(e), ModelManager_1.ModelManager.PhantomArenaModel.SetGymRedDotChecked(this.eeu)) : this.Tj1.RefreshByData([])
  }
  nOe() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.nnu);
    e ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ChallengeName), this.GetText(6).SetText(e.NpcLevel.toString()), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.NpcName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.NpcTitle), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), e.NpcDesc), e = e.Elements, this.wj1.RefreshElementTabIcon(e[0]), this.Aj1.RefreshElementTabIcon(e[1]), e = ModelManager_1.ModelManager.PhantomArenaModel.GetFirstRewardListByChallengeId(this.nnu), this.bj1.RefreshByData(e)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.Ej1])
  }
  get nnu() {
    return this.Ej1?.Id ?? -1
  }
}
exports.PhantomArenaMatchView = PhantomArenaMatchView;
//# sourceMappingURL=PhantomArenaMatchView.js.map