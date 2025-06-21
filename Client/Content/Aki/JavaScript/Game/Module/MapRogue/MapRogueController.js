"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueController = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityPermanentRogueController_1 = require("../PermanentRogue/ActivityPermanentRogueController"),
  MapRogueExploreEndView_1 = require("./View/MapRogueExploreEndView");
class MapRogueController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17330, this.VGc), Net_1.Net.Register(26192, this.jGc), Net_1.Net.Register(17594, this.HGc), Net_1.Net.Register(28443, this.$Gc), Net_1.Net.Register(18046, this.A3c), Net_1.Net.Register(27295, this.no1), Net_1.Net.Register(29514, this.mN1)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17330), Net_1.Net.UnRegister(26192), Net_1.Net.UnRegister(17594), Net_1.Net.UnRegister(28443), Net_1.Net.UnRegister(18046), Net_1.Net.UnRegister(27295), Net_1.Net.UnRegister(29514)
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe)
  }
  static async RequestInstResultEnd() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
      e = (0 !== e && ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(e), ModelManager_1.ModelManager.MapRogueModel.GameInfo),
      a = (e && (e.IsEnd = !0), new Protocol_1.Aki.Protocol.TEc),
      a = await Net_1.Net.CallAsync(21735, a);
    a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 22972), e && (e.IsEnd = !1)) : (ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo(), a?.ZEc && UiManager_1.UiManager.OpenView("RogueBattleSettleView", a.ZEc))
  }
  static RequestInstLeave() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    0 !== e && ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(e);
    const a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    a && (a.IsEnd = !0), ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest().then(e => {
      a && (a.IsEnd = e), e && ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo()
    })
  }
  static RequestMove(e, a) {
    var o = new Protocol_1.Aki.Protocol.fEc;
    o.DEc = {
      NEc: e,
      VEc: []
    }, Net_1.Net.Call(21753, o, e => {
      e ? e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29910), a?.(!1)) : a?.(!0) : a?.(!1)
    })
  }
  static RequestExecuteOp(e, a, o) {
    var r = new Protocol_1.Aki.Protocol.yEc;
    r.w5n = e, r.uB1 = a, Net_1.Net.Call(19869, r, e => {
      e ? (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs && (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29910), o?.(!1)), o?.(!0), ModelManager_1.ModelManager.MapRogueModel.GameInfo?.SetInteractAvailable(3, !0)) : o?.(!1)
    })
  }
  static CheckInMapRogueInstance() {
    var e;
    return !(!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) || 34 !== e.InstSubType)
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MapRogueMainView", this.P3c, "MapRogueController.CanOpenMainView")
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("MapRogueMainView", this.P3c)
  }
  static OpenRogueTipsView(e, a, o, r) {
    a = {
      TextId: a,
      TextParam: o ?? [],
      FinishCallback: r
    };
    0 === e ? UiManager_1.UiManager.OpenView("MapRogueFloatTipsAView", a) : UiManager_1.UiManager.OpenView("MapRogueFloatTipsBView", a)
  }
  static OpenRogueMenuView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView")
  }
  static OpenRogueFetterView(e) {
    e = {
      TabName: "RogueBattleMapSummaryFettersTabView",
      FetterId: e
    };
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView", e)
  }
  static OpenExploreEnd() {
    var e = new MapRogueExploreEndView_1.ExploreEndViewData;
    UiManager_1.UiManager.OpenView("MapRogueExploreEndView", e)
  }
  static OpenExplore() {
    var e = new MapRogueExploreEndView_1.ExploreEndViewData;
    UiManager_1.UiManager.OpenView("MapRogueExploreView", e)
  }
  static OpenMapHelpView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapHelpView")
  }
}
exports.MapRogueController = MapRogueController, (_a = MapRogueController).jGc = e => {
  var a = {
    InstanceId: e.r6n,
    RandomSeed: e.nIc,
    MapGrids: ModelManager_1.ModelManager.MapRogueModel.CreateMapGridDataList(e.oIc, e.nIc),
    MapWidth: e.ZBc,
    MapHeight: e.ekc,
    PlayerGridIndex: e.c5n,
    MoodMin: e.rkc,
    MoodMax: e.ikc,
    InitMood: e.JBc,
    TeamLv: e.$r1,
    InBattle: e.iWn,
    CurrencyItemId: e.xm1,
    MoodRuleId: e.jd1,
    RoleLevel: e.Ebs,
    RoleMaxStar: e.sE1
  };
  ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo(), ModelManager_1.ModelManager.MapRogueModel.RefreshGameInfo(a), e.vEc?.BEc && ModelManager_1.ModelManager.MapRogueModel.GenerateOpList(e.vEc.BEc), e.MEc && ModelManager_1.ModelManager.RogueBattleModel?.InitOptionData(e.MEc), e.EIc && ModelManager_1.ModelManager.RogueBattleModel?.InitGainData(e.EIc), e.Wr1 && ModelManager_1.ModelManager.RogueBattleModel.InitFormationData(e.Wr1), ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar = e.sE1
}, MapRogueController.HGc = e => {
  var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  if (a) {
    for (const t of Object.keys(e.okc)) {
      var o = Number.parseInt(t),
        r = e.okc[t];
      ModelManager_1.ModelManager.MapRogueModel.RefreshMapGridData(o, r)
    }
    void 0 !== e.UP1 && (a.PlayerGridIndex = e.UP1)
  }
}, MapRogueController.$Gc = e => {
  ModelManager_1.ModelManager.MapRogueModel.GameInfo && (ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetMood(e.JBc, e.sps), ModelManager_1.ModelManager.MapRogueModel.GameInfo.MoodRuleId = e.jd1)
}, MapRogueController.mN1 = e => {
  var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  a && a.SetMood(a.Mood, void 0, e.rkc, e.ikc)
}, MapRogueController.A3c = e => {
  var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  if (a && (a.InBattle = e.iWn, !a.IsEnd)) {
    e.iWn ? a.HasBindView && (a.EnterBattleFlag = !0, UiManager_1.UiManager.CloseView("MapRogueMainView")) : a.HasBindView || UiManager_1.UiManager.OpenView("MapRogueMainView");
    for (const o of ModelManager_1.ModelManager.MapRogueModel.GetAllOpData()) o.BattleStateUpdate(e.iWn, a);
    if (!e.iWn)
      for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0)) r.Entity?.GetComponent(39)?.StopAllSkills("RogueBattleStateUpdate")
  }
}, MapRogueController.no1 = e => {
  ModelManager_1.ModelManager.MapRogueModel.GameInfo && (ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetTeamLv(e.$r1, e.sps), ModelManager_1.ModelManager.MapRogueModel.SetRoleLevel(e.Ebs))
}, MapRogueController.FWe = () => {
  ModelManager_1.ModelManager.MapRogueModel.GameInfo && _a.CheckInMapRogueInstance() && ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList()
}, MapRogueController.VGc = e => {
  if (ModelManager_1.ModelManager.MapRogueModel.GameInfo) {
    for (const a of e.pIc) ModelManager_1.ModelManager.MapRogueModel.RemoveOpData(a);
    for (const o of e.CIc) ModelManager_1.ModelManager.MapRogueModel.UpdateOpData(o);
    for (const r of e.gIc) ModelManager_1.ModelManager.MapRogueModel.AddOpData(r);
    ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList()
  }
}, MapRogueController.P3c = () => {
  var e;
  return !!_a.CheckInMapRogueInstance() && !!(e = ModelManager_1.ModelManager.MapRogueModel.GameInfo) && !e.InBattle
};
//# sourceMappingURL=MapRogueController.js.map