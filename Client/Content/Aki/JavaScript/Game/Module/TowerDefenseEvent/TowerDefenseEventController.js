"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const TrapDefenseActivityByInstId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseActivityByInstId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KscData_1 = require("../../KuroSimpleCombat/KscData");
const KscEnv_1 = require("../../KuroSimpleCombat/KscEnv");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TrapDefenseBattleGuideManager_1 = require("../GameMainView/TrapDefense/Guide/TrapDefenseBattleGuideManager");
const TsTowerDefenseEventActor_1 = require("./Item/TsTowerDefenseEventActor");
const TowerDefenseEventEntityModel_1 = require("./Model/TowerDefenseEventEntityModel");
const TowerDefenseEventConfig_1 = require("./TowerDefenseEventConfig");
const TowerDefenseEventEntityRedirectFilter_1 = require("./TowerDefenseEventEntityRedirectFilter");
const TowerDefenseEventPreviewMonsterSpawner_1 = require("./TowerDefenseEventPreviewMonsterSpawner");
const TowerDefenseEventRaycastResult_1 = require("./TowerDefenseEventRaycastResult");
const TowerDefenseEventUtility_1 = require("./TowerDefenseEventUtility");
class TowerDefenseTrapTemplateInfo extends TowerDefenseEventEntityModel_1.TowerDefenseEventEntityModel {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.PrevConfigId = 0;
    this.TrapId = 0;
    this.Level = 1;
    this.BranchId = 0;
    this.DefaultCost = 0;
    this.DeconstructReturn = 0;
    this.GridSize = new Vector2D_1.Vector2D();
    this.PlacementType = 1;
    this.CanRotate = true;
    this.Degree = 0;
    this.GlobalDegree = 0;
  }
  IsValid() {
    return false;
  }
  IsInPreview() {
    return this.ConfigId > 0;
  }
  Reset() {
    super.Reset();
    this.ConfigId = 0;
    this.PrevConfigId = 0;
    this.TrapId = 0;
    this.Level = 1;
    this.BranchId = 0;
    this.DefaultCost = 0;
    this.DeconstructReturn = 0;
    this.GridSize.Set(0, 0);
    this.PlacementType = 1;
    this.CanRotate = true;
    this.Degree = 0;
  }
  BeginInit(e) {
    this.PrevConfigId = this.ConfigId;
    this.ConfigId = e;
  }
  EndInit() {
    this.Degree = this.CanRotate ? this.GlobalDegree : 0;
  }
  IsTargetLevel(e) {
    return this.ConfigId === e;
  }
  Rotate() {
    if (this.CanRotate) {
      this.GlobalDegree += 90;
      if (this.GlobalDegree > 180) {
        this.GlobalDegree -= 360;
      }
      this.Degree = this.GlobalDegree;
    }
  }
  GetConfigDirtyAndReset() {
    var e = this.ConfigId !== this.PrevConfigId;
    this.PrevConfigId = this.ConfigId;
    return e;
  }
}
class TowerDefenseEventController extends ControllerBase_1.ControllerBase {
  static get ProcessStatus() {
    return this.Ujc;
  }
  static IsInPreview() {
    return this.Ujc === 1;
  }
  static IsFighting() {
    return this.Ujc === 2;
  }
  static IsTowerDefenseEventInstance() {
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType === 37;
  }
  static OnInit() {
    this.PauseTick();
    return true;
  }
  static InitMap() {
    this.Ojc();
    Net_1.Net.Register(15871, TowerDefenseEventController.kjc);
    Net_1.Net.Register(19695, TowerDefenseEventController.bJc);
  }
  static OnWorldDone() {
    this.IsWorldInit = true;
    this.ResumeTick();
  }
  static OnWorldReset() {
    if (this.IsWorldInit) {
      this.IsWorldInit = false;
      this.PauseTick();
      Net_1.Net.UnRegister(15871);
      Net_1.Net.UnRegister(19695);
      this.qjc();
    }
  }
  static OnEntityRemoved(e, t) {
    if (e.IsPreview) {
      this.Gjc.RemovePreviewMonster(e.CreatureDataId);
    } else {
      var r = ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(e.CreatureDataId);
      if (r) {
        if (e.ReasonName !== KscData_1.KscEntityRemoveReason.LandFire) {
          r.Position.DeepCopy(e.Location);
        }
        var s = Protocol_1.Aki.Protocol.I9u.create();
        var i = Protocol_1.Aki.Protocol.Gks.create();
        i.X = r.Position.X;
        i.Y = r.Position.Y;
        i.Z = r.Position.Z;
        s.PYc = i;
        var i = FNameUtil_1.FNameUtil.GetDynamicFName(e.ReasonName.toString());
        switch (i) {
          case KscData_1.KscEntityRemoveReason.Dead:
            var o = Protocol_1.Aki.Protocol.mld.create();
            o.F4n = e.KillerId;
            o.dld = this.Kjc(r);
            s.uld = o;
            break;
          case KscData_1.KscEntityRemoveReason.WorldKill:
            o = Protocol_1.Aki.Protocol.L9u.create();
            o.yju = e.KillerId;
            s.vju = o;
            break;
          case KscData_1.KscEntityRemoveReason.Arrival:
            o = Protocol_1.Aki.Protocol.w9u.create();
            s.pju = o;
            break;
          case KscData_1.KscEntityRemoveReason.Coin:
            o = Protocol_1.Aki.Protocol.R9u.create();
            s.Cju = o;
            break;
          case KscData_1.KscEntityRemoveReason.LandFire:
            {
              o = Protocol_1.Aki.Protocol.b9u.create();
              const n = [];
              ControllerHolder_1.ControllerHolder.BuildingGridController.LandFireGrids(r.Position, e.EffectRange, e.ClearCell, (e, t) => {
                var r = Protocol_1.Aki.Protocol.jfu.create();
                r.bPu = e;
                r.iPs = t.X;
                r.rPs = t.Y;
                r.Nfu = 0;
                n.push(r);
              });
              this.jid(r, e.Params);
              o.Sju = n;
              o.Kid = e.FireNum;
              s.gju = o;
              break;
            }
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefenseEvent", 60, "移除塔防实体失败: 未处理移除原因", ["creatureDataId", e.CreatureDataId], ["reasonName", e.ReasonName]);
            }
            return;
        }
        if ((0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(r)) {
          i = Protocol_1.Aki.Protocol.fld.create();
          s.cld = i;
        }
        t[e.CreatureDataId] = s;
      }
    }
  }
  static jid(e, t) {
    if (t && !(t.Num() <= 0)) {
      var r = UE.NewMap(UE.BuiltinInt, UE.BuiltinFloat);
      for (let e = 0; e < t.Num(); e++) {
        var s = t.GetKey(e);
        var i = t.Get(s);
        if (i !== undefined) {
          r.Set(s, i);
        }
      }
      e.ExtraInfo = {
        [1]: {
          Params: r
        }
      };
    }
  }
  static Kjc(e) {
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfMonsterInfo)(e) && e.DeathType === 1) {
      return ControllerHolder_1.ControllerHolder.BuildingGridController.PolluteGrids(e.Position, e.PolluteRadius);
    } else {
      return [];
    }
  }
  static Ojc() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var e = TrapDefenseActivityByInstId_1.configTrapDefenseActivityByInstId.GetConfig(e);
    ModelManager_1.ModelManager.TowerDefenseEventModel.InitInstance(e);
  }
  static qjc() {
    this.Ujc = 0;
    this.RaycastResult.Reset();
    this.Fjc("TowerDefenseEventController.ResetTowerDefenseEventInstance");
    this.l3u.Reset();
    this.Njc = undefined;
    this.Vjc = 0;
    this.Gjc.Clear();
  }
  static jjc(e) {
    this.Gjc.Init(e.v7u);
    if (e.A8s) {
      ModelManager_1.ModelManager.TrapDefenseModel.BattleData.SetShopOpen(e.A8s.Z7u.length > 0);
    } else {
      ModelManager_1.ModelManager.TrapDefenseModel.BattleData.SetShopOpen(false);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "塔防进入准备阶段");
    }
    if (e.A8s) {
      ModelManager_1.ModelManager.TrapDefenseModel.ProtoShopInitNotify(e.A8s);
    }
  }
  static Hjc(e) {
    this.Gjc.Reset();
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetPreviewCountDown(e.E7u);
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetSpecialShow(e.I7u);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "塔防进入战斗阶段");
    }
  }
  static OnTick(e) {
    if (this.IsInPreview()) {
      this.Gjc.OnTick(e);
    }
    if (this.IsFighting() && ((e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch()) !== this.Q_d && (KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(3, e), this.Q_d = e), (e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum()) !== this.K_d)) {
      KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(2, e);
      this.K_d = e;
    }
    e = this.IsInPreview() && ModelManager_1.ModelManager.TowerDefenseEventModel.CurrentTrapCount > 0 || this.l3u.IsInPreview();
    if (e) {
      if (this.RaycastResult.Raycast(this.h3u, this.l3u.PlacementType, this.l3u.Degree, !this.IsFighting())) {
        this.l3u.Position.DeepCopy(this.RaycastResult.Location);
        this.l3u.Rotation.DeepCopy(this.RaycastResult.Rotation);
        this.l3u.Degree = this.RaycastResult.Degree;
      }
    } else if (this.RJc) {
      this.RaycastResult.Reset();
    }
    this.RJc = e;
    if (!this.RaycastResult.IsCanPlace) {
      this._3u();
    }
    if (this.RaycastResult.IsCanRecycle) {
      if (this.Njc !== this.RaycastResult.RaycastTarget) {
        this.Njc?.ResetRemove();
        this.Njc = this.RaycastResult.RaycastTarget;
        this.Njc.PrepareRemove();
      }
    } else if (this.Njc) {
      this.Njc.ResetRemove();
      this.Njc = undefined;
    }
    this.Qcd();
    if (this.l3u.GetConfigDirtyAndReset() || this.RaycastResult.IsStateDirty) {
      this.wJc.Start();
      this.$jc();
      this.wJc.Stop();
    }
  }
  static _3u() {
    if (this.l3u.IsInPreview() && this.h3u && this.h3u.IsValid()) {
      this.h3u.Hide();
    }
  }
  static get BuildTipsType() {
    if (!this.l3u.IsInPreview) {
      this.Vjc = 0;
    }
    return this.Vjc;
  }
  static $jc() {
    let e = 0;
    if (this.RaycastResult.IsCanBuild) {
      e |= 1;
    } else if (this.l3u.IsInPreview()) {
      e |= 16;
    }
    if (this.RaycastResult.IsCanRecycle) {
      e |= 4;
    }
    if (this.RaycastResult.IsPolluted) {
      e |= 8;
    }
    if (this.l3u.IsInPreview() && this.l3u.CanRotate) {
      e |= 2;
    }
    if (this.Vjc !== e) {
      this.Vjc = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseEventNotifyType, this.Vjc);
    }
  }
  static async u3u() {
    if (this.IsInPreview()) {
      if (TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("SpawnMonster")) {
        var e = Protocol_1.Aki.Protocol.RBu.create();
        var e = await Net_1.Net.CallAsync(20873, e);
        if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          return true;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "开始战斗失败", ["errorCode", e?.Q4n]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefenseEvent", 60, "开始战斗失败: 当前不在准备阶段");
    }
    return false;
  }
  static c3u(e) {
    e = ModelManager_1.ModelManager.TowerDefenseEventModel.GetMachineIdByIndex(e);
    if (e && !this.l3u.IsTargetLevel(e)) {
      this.PreviewTrap(e);
    }
  }
  static HandleTowerDefenseSelect(e) {
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.EnablePlayerFollower(false);
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.c3u(e);
  }
  static CancelCurrentPreviewTrap() {
    var e;
    if (this.h3u && (e = this.h3u.GetTapModel()) && this.l3u.IsTargetLevel(e.ConfigId)) {
      this.l3u.Reset();
      this.Fjc("TowerDefenseEventController.CancelCurrentPreviewTrap");
    }
  }
  static async ExecuteStartFighting() {
    return this.u3u();
  }
  static async ExecuteOccupyTrap() {
    return this.OccupyTrap();
  }
  static async ExecuteUnOccupyTrap() {
    return this.UnOccupyTrap();
  }
  static ExecuteRotateTrap() {
    this.RotateTrap();
  }
  static PreviewTrap(e) {
    this.l3u.BeginInit(e);
    var t = TowerDefenseEventConfig_1.TowerDefenseEventConfig.FillUpModelInfo(this.l3u);
    this.l3u.EndInit();
    if (t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "预览陷阱失败: " + t, ["configId", e], ["trapId", this.l3u.TrapId], ["level", this.l3u.Level], ["branchId", this.l3u.BranchId], ["templateId", this.l3u.TemplateId], ["subTypeId", this.l3u.SubTypeId], ["combatId", this.l3u.CombatId], ["prefabPath", this.l3u.PrefabPath]);
      }
      return false;
    } else {
      this.m3u();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefensePreviewMachine, e);
      return true;
    }
  }
  static m3u() {
    this.h3u ||= ActorSystem_1.ActorSystem.Get(UE.TsTowerDefenseEventActor_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.h3u.Init(this.l3u);
  }
  static Fjc(e) {
    if (this.h3u && this.h3u.IsValid()) {
      this.h3u.Destroy(e);
    }
    this.h3u = undefined;
  }
  static RotateTrap() {
    this.l3u.Rotate();
  }
  static IsEnoughGoldToBuildTrap() {
    return ModelManager_1.ModelManager.TowerDefenseEventModel.IsEnoughGoldToBuildTrap(this.l3u);
  }
  static async OccupyTrap() {
    var e;
    var t;
    var r;
    return !!this.RaycastResult.IsCanBuild && ((t = this.RaycastResult.Grid)?.IsValid() ? !!TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("ConstructTrap") && ((e = TowerDefenseEventEntityModel_1.TowerDefenseEventTrapModel.GetTrapModel(this.l3u)).UpdateData(t.GetBuildingGridGuidString(), this.RaycastResult.Coords), (r = (t = await this.f3u(e)) === Protocol_1.Aki.Protocol.Q4n.KRs) || Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，服务器请求失败", ["errorCode", t]), e.Release(), r) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，网格无效"), false));
  }
  static async f3u(e) {
    var t = Protocol_1.Aki.Protocol.Dfu.create();
    t.v9n = e.ConfigId;
    var r = Protocol_1.Aki.Protocol.jfu.create();
    r.bPu = e.GridId;
    r.iPs = e.Coords.X;
    r.rPs = e.Coords.Y;
    r.Nfu = TowerDefenseEventUtility_1.TowerDefenseEventUtility.ConvertDegree2Direction(e.Degree);
    t.Vfu = r;
    var r = await Net_1.Net.CallAsync(15861, t);
    if (r && r.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      e.Uid = MathUtils_1.MathUtils.LongToNumber(r.s5n);
    }
    return r?.Q4n;
  }
  static async UnOccupyTrap() {
    var e;
    var t;
    return !!this.RaycastResult.IsCanRecycle && (this.RaycastResult.Grid?.IsValid() ? (e = this.RaycastResult.RaycastTarget.GetTapModel()) && e.IsValid() && (0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(e) ? !!TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("RecycleTrap") && ((t = (e = await this.g3u(e)) === Protocol_1.Aki.Protocol.Q4n.KRs) || Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，服务器请求失败", ["errorCode", e]), t) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "取消占用陷阱失败，陷阱数据无效"), false) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "取消占用陷阱失败，网格无效"), false));
  }
  static async g3u(e) {
    var t = Protocol_1.Aki.Protocol.kfu.create();
    t.s5n = e.Uid;
    var e = await Net_1.Net.CallAsync(22325, t);
    return e?.Q4n;
  }
  static Qcd() {
    var e = this.RaycastResult.RaycastTarget?.GetTapModel();
    var t = e ? e.Uid : undefined;
    if (this.Kcd !== t && (this.Kcd = t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseRecycleRaycastNotify, e.DeconstructReturn);
    }
  }
}
exports.TowerDefenseEventController = TowerDefenseEventController;
(_a = TowerDefenseEventController).Jud = Stats_1.Stat.Create("TowerDefenseEventController.StepUpdateNotify");
TowerDefenseEventController.wJc = Stats_1.Stat.Create("TowerDefenseEventController.RaycastStateChanged");
TowerDefenseEventController.Kcd = undefined;
TowerDefenseEventController.IsWorldInit = false;
TowerDefenseEventController.TestBpUsing = false;
TowerDefenseEventController.Ujc = 0;
TowerDefenseEventController.Vjc = 0;
TowerDefenseEventController.EntityRedirectFilter = new TowerDefenseEventEntityRedirectFilter_1.TowerDefenseEventEntityRedirectFilter();
TowerDefenseEventController.l3u = new TowerDefenseTrapTemplateInfo();
TowerDefenseEventController.h3u = undefined;
TowerDefenseEventController.Njc = undefined;
TowerDefenseEventController.RaycastResult = new TowerDefenseEventRaycastResult_1.TowerDefenseEventRaycastResult();
TowerDefenseEventController.RJc = false;
TowerDefenseEventController.Gjc = new TowerDefenseEventPreviewMonsterSpawner_1.TowerDefenseEventPreviewMonsterSpawner();
TowerDefenseEventController.K_d = 0;
TowerDefenseEventController.Q_d = 0;
TowerDefenseEventController.bJc = e => {
  _a.EntityRedirectFilter.UpdateEntity(e);
};
TowerDefenseEventController.kjc = e => {
  _a.Jud.Start();
  switch (e.e9u) {
    case "y7u":
      _a.Ujc = 1;
      var t = e.y7u;
      if (t) {
        _a.jjc(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "预览阶段数据为空");
      }
      if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.HasStartAkEvent) {
        AudioSystem_1.AudioSystem.SetState("tower_defence_music_2_6", "none");
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetHasStartAkEvent(true);
        AudioSystem_1.AudioSystem.PostEvent("play_2_6_tower_defence_music_ingame");
      }
      break;
    case "S7u":
      _a.Ujc = 2;
      t = e.S7u;
      if (t) {
        _a.Hjc(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "战斗阶段数据为空");
      }
      AudioSystem_1.AudioSystem.SetState("tower_defence_music_2_6", "battle");
      break;
    case "M7u":
      _a.Ujc = 3;
  }
  TsTowerDefenseEventActor_1.default.UpdateTrapRangeState();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseEventStepUpdate, _a.Ujc);
  _a.Jud.Stop();
}; //# sourceMappingURL=TowerDefenseEventController.js.map