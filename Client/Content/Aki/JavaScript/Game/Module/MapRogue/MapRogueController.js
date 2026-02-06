"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityPermanentRogueController_1 = require("../PermanentRogue/ActivityPermanentRogueController");
const MapRogueExploreEndView_1 = require("./View/MapRogueExploreEndView");
class MapRogueController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16960, this.VGc);
    Net_1.Net.Register(23863, this.jGc);
    Net_1.Net.Register(18544, this.HGc);
    Net_1.Net.Register(15354, this.$Gc);
    Net_1.Net.Register(26701, this.A3c);
    Net_1.Net.Register(26787, this.To1);
    Net_1.Net.Register(29797, this.$N1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16960);
    Net_1.Net.UnRegister(23863);
    Net_1.Net.UnRegister(18544);
    Net_1.Net.UnRegister(15354);
    Net_1.Net.UnRegister(26701);
    Net_1.Net.UnRegister(26787);
    Net_1.Net.UnRegister(29797);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static async RequestInstResultEnd() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (e !== 0) {
      ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(e);
    }
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (e) {
      e.IsEnd = true;
    }
    var o = new Protocol_1.Aki.Protocol.TEc();
    var o = await Net_1.Net.CallAsync(19672, o);
    if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 18631);
      if (e) {
        e.IsEnd = false;
      }
    } else {
      ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo();
      if (o?.ZEc) {
        UiManager_1.UiManager.OpenView("RogueBattleSettleView", o.ZEc);
      }
    }
  }
  static RequestInstLeave() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (e !== 0) {
      ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(e);
    }
    const o = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (o) {
      o.IsEnd = true;
    }
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest().then(e => {
      if (o) {
        o.IsEnd = e;
      }
      if (e) {
        ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo();
      }
    });
  }
  static RequestBackToMap(o) {
    var e = new Protocol_1.Aki.Protocol.CEc();
    Net_1.Net.Call(28113, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 26905);
          o?.(false);
        } else {
          o?.(true);
        }
      } else {
        o?.(false);
      }
    });
  }
  static RequestMove(e, o) {
    var a = new Protocol_1.Aki.Protocol.fEc();
    a.DEc = {
      NEc: e,
      VEc: []
    };
    Net_1.Net.Call(24580, a, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 26704);
          o?.(false);
        } else {
          o?.(true);
        }
      } else {
        o?.(false);
      }
    });
  }
  static RequestExecuteOp(e, o, a) {
    var r = new Protocol_1.Aki.Protocol.yEc();
    r.w5n = e;
    r.VB1 = o;
    Net_1.Net.Call(23029, r, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27572);
          a?.(false);
        }
        a?.(true);
        ModelManager_1.ModelManager.MapRogueModel.GameInfo?.SetInteractAvailable(3, true);
      } else {
        a?.(false);
      }
    });
  }
  static RequestExecuteOpMultiSelect(e, o, a) {
    var r = new Protocol_1.Aki.Protocol.yEc();
    r.w5n = e;
    r.iZu = o;
    Net_1.Net.Call(23029, r, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27572);
          a?.(false);
        }
        a?.(true);
        ModelManager_1.ModelManager.MapRogueModel.GameInfo?.SetInteractAvailable(3, true);
      } else {
        a?.(false);
      }
    });
  }
  static CheckInMapRogueInstance() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 34;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MapRogueMainView", this.P3c, "MapRogueController.CanOpenMainView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("MapRogueMainView", this.P3c);
  }
  static OpenRogueTipsView(e, o, a, r) {
    o = {
      TextId: o,
      TextParam: a ?? [],
      FinishCallback: r
    };
    if (e === 0) {
      UiManager_1.UiManager.OpenView("MapRogueFloatTipsAView", o);
    } else {
      UiManager_1.UiManager.OpenView("MapRogueFloatTipsBView", o);
    }
  }
  static OpenRogueMenuView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView");
  }
  static OpenRogueFetterView(e) {
    e = {
      TabName: "RogueBattleMapSummaryFettersTabView",
      FetterId: e
    };
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView", e);
  }
  static OpenExploreEnd(e = false) {
    var o = new MapRogueExploreEndView_1.ExploreEndViewData();
    o.ExitToMap = e;
    UiManager_1.UiManager.OpenView("MapRogueExploreEndView", o);
  }
  static OpenExplore() {
    var e = new MapRogueExploreEndView_1.ExploreEndViewData();
    UiManager_1.UiManager.OpenView("MapRogueExploreView", e);
  }
  static OpenMapHelpView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapHelpView");
  }
}
exports.MapRogueController = MapRogueController;
(_a = MapRogueController).jGc = e => {
  var o = {
    InstanceId: e.r6n,
    RandomSeed: e.nIc,
    MapGrids: ModelManager_1.ModelManager.MapRogueModel.CreateMapGridDataList(e.oIc, e.nIc),
    MapWidth: e.ZBc,
    MapHeight: e.ekc,
    PlayerGridIndex: e.c5n,
    MoodMin: e.rkc,
    MoodMax: e.ikc,
    InitMood: e.JBc,
    TeamLv: e.co1,
    InBattle: e.iWn,
    CurrencyItemId: e.tf1,
    MoodRuleId: e.um1,
    RoleLevel: e.Ebs,
    RoleMaxStar: e.PE1
  };
  ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo();
  ModelManager_1.ModelManager.MapRogueModel.RefreshGameInfo(o);
  if (e.vEc?.BEc) {
    ModelManager_1.ModelManager.MapRogueModel.GenerateOpList(e.vEc.BEc);
  }
  if (e.MEc) {
    ModelManager_1.ModelManager.RogueBattleModel?.InitOptionData(e.MEc);
  }
  if (e.EIc) {
    ModelManager_1.ModelManager.RogueBattleModel?.InitGainData(e.EIc);
  }
  if (e.uo1) {
    ModelManager_1.ModelManager.RogueBattleModel.InitFormationData(e.uo1);
  }
  ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar = e.PE1;
};
MapRogueController.HGc = e => {
  var o = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  if (o) {
    for (const t of Object.keys(e.okc)) {
      var a = Number.parseInt(t);
      var r = e.okc[t];
      ModelManager_1.ModelManager.MapRogueModel.RefreshMapGridData(a, r);
    }
    if (e.hx1 !== undefined) {
      o.PlayerGridIndex = e.hx1;
    }
  }
};
MapRogueController.$Gc = e => {
  if (ModelManager_1.ModelManager.MapRogueModel.GameInfo) {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetMood(e.JBc, e.sps, undefined, undefined, e.K9u);
    ModelManager_1.ModelManager.MapRogueModel.GameInfo.MoodRuleId = e.um1;
  }
};
MapRogueController.$N1 = e => {
  var o = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  if (o) {
    o.SetMood(o.Mood, undefined, e.rkc, e.ikc);
  }
};
MapRogueController.A3c = e => {
  var o = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
  if (o && (o.InBattle = e.iWn, !o.IsEnd)) {
    if (e.iWn) {
      if (o.HasBindView) {
        o.EnterBattleFlag = true;
        UiManager_1.UiManager.CloseView("MapRogueMainView");
      }
    } else if (!o.HasBindView) {
      UiManager_1.UiManager.OpenView("MapRogueMainView");
    }
    for (const a of ModelManager_1.ModelManager.MapRogueModel.GetAllOpData()) {
      a.BattleStateUpdate(e.iWn, o);
    }
    if (!e.iWn) {
      for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
        r.Entity?.GetComponent(42)?.StopAllSkills("RogueBattleStateUpdate");
      }
    }
  }
};
MapRogueController.To1 = e => {
  if (ModelManager_1.ModelManager.MapRogueModel.GameInfo) {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetTeamLv(e.co1, e.sps);
    ModelManager_1.ModelManager.MapRogueModel.SetRoleLevel(e.Ebs);
  }
};
MapRogueController.FWe = () => {
  if (ModelManager_1.ModelManager.MapRogueModel.GameInfo && _a.CheckInMapRogueInstance()) {
    ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList();
  }
};
MapRogueController.VGc = e => {
  if (ModelManager_1.ModelManager.MapRogueModel.GameInfo) {
    for (const o of e.pIc) {
      ModelManager_1.ModelManager.MapRogueModel.RemoveOpData(o);
    }
    for (const a of e.CIc) {
      ModelManager_1.ModelManager.MapRogueModel.UpdateOpData(a);
    }
    for (const r of e.gIc) {
      ModelManager_1.ModelManager.MapRogueModel.AddOpData(r);
    }
    ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList();
  }
};
MapRogueController.P3c = () => {
  var e;
  return !!_a.CheckInMapRogueInstance() && !!(e = ModelManager_1.ModelManager.MapRogueModel.GameInfo) && !e.InBattle;
}; //# sourceMappingURL=MapRogueController.js.map