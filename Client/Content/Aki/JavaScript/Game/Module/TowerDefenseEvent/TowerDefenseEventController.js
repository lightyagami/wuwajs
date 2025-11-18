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
const TDPlayerController_1 = require("../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
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
    return this.rYc;
  }
  static IsInPreview() {
    return this.rYc === 1;
  }
  static IsFighting() {
    return this.rYc === 2;
  }
  static ResetWorldAttr() {
    this.VCd = 0;
    this.NCd = 0;
  }
  static IsTowerDefenseEventInstance() {
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType === 37;
  }
  static InitMap() {
    this.Tju();
    Net_1.Net.Register(25112, TowerDefenseEventController.bJu);
    Net_1.Net.Register(15809, TowerDefenseEventController.Ded);
  }
  static OnWorldDone() {
    this.IsWorldInit = true;
    this.ResetWorldAttr();
  }
  static OnWorldReset() {
    if (this.IsWorldInit) {
      this.IsWorldInit = false;
      Net_1.Net.UnRegister(25112);
      Net_1.Net.UnRegister(15809);
      this.nHu();
    }
  }
  static OnEntityRemoved(e, t) {
    if (e.IsPreview) {
      this.vYu.RemovePreviewMonster(e.CreatureDataId);
    } else {
      var r = ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(e.CreatureDataId);
      if (r) {
        if (e.ReasonName !== KscData_1.KscEntityRemoveReason.LandFire) {
          r.Position.DeepCopy(e.Location);
        }
        var s = Protocol_1.Aki.Protocol.RWc.create();
        var i = Protocol_1.Aki.Protocol.Gks.create();
        i.X = r.Position.X;
        i.Y = r.Position.Y;
        i.Z = r.Position.Z;
        s.DJc = i;
        var i = FNameUtil_1.FNameUtil.GetDynamicFName(e.ReasonName.toString());
        switch (i) {
          case KscData_1.KscEntityRemoveReason.Dead:
            var o = Protocol_1.Aki.Protocol.hfd.create();
            o.F4n = e.KillerId;
            o.afd = this.YKu(r);
            s.nfd = o;
            break;
          case KscData_1.KscEntityRemoveReason.WorldKill:
            o = Protocol_1.Aki.Protocol.DWc.create();
            o.IWc = e.KillerId;
            s.EWc = o;
            break;
          case KscData_1.KscEntityRemoveReason.Arrival:
            o = Protocol_1.Aki.Protocol.PWc.create();
            s.MWc = o;
            break;
          case KscData_1.KscEntityRemoveReason.Coin:
            o = Protocol_1.Aki.Protocol.AWc.create();
            s.SWc = o;
            break;
          case KscData_1.KscEntityRemoveReason.LandFire:
            {
              o = Protocol_1.Aki.Protocol.LWc.create();
              const n = [];
              ControllerHolder_1.ControllerHolder.BuildingGridController.LandFireGrids(r.Position, e.EffectRange, e.ClearCell, (e, t) => {
                var r = Protocol_1.Aki.Protocol.jfu.create();
                r.bPu = e;
                r.iPs = t.X;
                r.rPs = t.Y;
                r.Nfu = 0;
                n.push(r);
              });
              this.Xod(r, e.Params);
              o.TWc = n;
              o.$od = e.FireNum;
              s.yWc = o;
              break;
            }
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefenseEvent", 60, "移除塔防实体失败: 未处理移除原因", ["creatureDataId", e.CreatureDataId], ["reasonName", e.ReasonName]);
            }
            return;
        }
        if ((0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(r)) {
          i = Protocol_1.Aki.Protocol.lfd.create();
          s.sfd = i;
        }
        t[e.CreatureDataId] = s;
      }
    }
  }
  static Xod(e, t) {
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
  static YKu(e) {
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfMonsterInfo)(e) && e.DeathType === 1) {
      return ControllerHolder_1.ControllerHolder.BuildingGridController.PolluteGrids(e.Position, e.PolluteRadius);
    } else {
      return [];
    }
  }
  static Tju() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var e = TrapDefenseActivityByInstId_1.configTrapDefenseActivityByInstId.GetConfig(e);
    ModelManager_1.ModelManager.TowerDefenseEventModel.InitInstance(e);
  }
  static nHu() {
    this.rYc = 0;
    this.RaycastResult.Reset();
    this.sHu("TowerDefenseEventController.ResetTowerDefenseEventInstance");
    this.gku.Reset();
    this.z$u = undefined;
    this.J$u = 0;
    this.vYu.Clear();
  }
  static RJu(e) {
    this.vYu.Init(e.IKu);
    if (e.A8s) {
      ModelManager_1.ModelManager.TrapDefenseModel.BattleData.SetShopOpen(e.A8s.Szc.length > 0);
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
  static wJu(e) {
    this.vYu.Reset();
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetPreviewCountDown(e.gjc);
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetSpecialShow(e.CWc);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "塔防进入战斗阶段");
    }
  }
  static OnTick(e) {
    if (this.IsInPreview()) {
      this.vYu.OnTick(e);
    }
    if (this.IsFighting() && ((e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch()) !== this.NCd && (KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(3, e), this.NCd = e), (e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum()) !== this.VCd)) {
      KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(2, e);
      this.VCd = e;
    }
    e = this.IsInPreview() && ModelManager_1.ModelManager.TowerDefenseEventModel.CurrentTrapCount > 0 || this.gku.IsInPreview();
    if (e) {
      if (this.RaycastResult.Raycast(this.mku, this.gku.PlacementType, this.gku.Degree, !this.IsFighting())) {
        this.gku.Position.DeepCopy(this.RaycastResult.Location);
        this.gku.Rotation.DeepCopy(this.RaycastResult.Rotation);
        this.gku.Degree = this.RaycastResult.Degree;
      }
    } else if (this.xed) {
      this.RaycastResult.Reset();
    }
    this.xed = e;
    if (!this.RaycastResult.IsCanPlace) {
      this.e3u();
    }
    if (this.RaycastResult.IsCanRecycle) {
      if (this.z$u !== this.RaycastResult.RaycastTarget) {
        this.z$u?.ResetRemove();
        this.z$u = this.RaycastResult.RaycastTarget;
        this.z$u.PrepareRemove();
      }
    } else if (this.z$u) {
      this.z$u.ResetRemove();
      this.z$u = undefined;
    }
    this.rPd();
    if (this.gku.GetConfigDirtyAndReset() || this.RaycastResult.IsStateDirty) {
      this.Ued.Start();
      this.Z$u();
      this.Ued.Stop();
    }
  }
  static e3u() {
    if (this.gku.IsInPreview() && this.mku && this.mku.IsValid()) {
      this.mku.Hide();
    }
  }
  static get BuildTipsType() {
    if (!this.gku.IsInPreview) {
      this.J$u = 0;
    }
    return this.J$u;
  }
  static Z$u() {
    let e = 0;
    if (this.RaycastResult.IsCanBuild) {
      e |= 1;
    } else if (this.gku.IsInPreview()) {
      e |= 16;
    }
    if (this.RaycastResult.IsCanRecycle) {
      e |= 4;
    }
    if (this.RaycastResult.IsPolluted) {
      e |= 8;
    }
    if (this.gku.IsInPreview() && this.gku.CanRotate) {
      e |= 2;
    }
    if (this.J$u !== e) {
      this.J$u = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseEventNotifyType, this.J$u);
    }
  }
  static async t3u() {
    if (this.IsInPreview()) {
      if (TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("SpawnMonster")) {
        var e = Protocol_1.Aki.Protocol.cFu.create();
        var e = await Net_1.Net.CallAsync(28404, e);
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
  static fku(e) {
    e = ModelManager_1.ModelManager.TowerDefenseEventModel.GetMachineIdByIndex(e);
    if (e && !this.gku.IsTargetLevel(e)) {
      this.PreviewTrap(e);
    }
  }
  static HandleTowerDefenseSelect(e) {
    TDPlayerController_1.TowerDefensePlayerController.EnablePlayerFollower(false);
    this.fku(e);
  }
  static CancelCurrentPreviewTrap() {
    var e;
    if (this.mku && (e = this.mku.GetTapModel()) && this.gku.IsTargetLevel(e.ConfigId)) {
      this.gku.Reset();
      this.sHu("TowerDefenseEventController.CancelCurrentPreviewTrap");
    }
  }
  static async ExecuteStartFighting() {
    return this.t3u();
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
    this.RaycastResult.Reset();
    this.gku.BeginInit(e);
    var t = TowerDefenseEventConfig_1.TowerDefenseEventConfig.FillUpModelInfo(this.gku);
    this.gku.EndInit();
    if (t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "预览陷阱失败: " + t, ["configId", e], ["trapId", this.gku.TrapId], ["level", this.gku.Level], ["branchId", this.gku.BranchId], ["templateId", this.gku.TemplateId], ["subTypeId", this.gku.SubTypeId], ["combatId", this.gku.CombatId], ["prefabPath", this.gku.PrefabPath]);
      }
      return false;
    } else {
      this.pku();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefensePreviewMachine, e);
      return true;
    }
  }
  static pku() {
    this.mku ||= ActorSystem_1.ActorSystem.Get(UE.TsTowerDefenseEventActor_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.mku.Init(this.gku);
  }
  static sHu(e) {
    if (this.mku && this.mku.IsValid()) {
      this.mku.Destroy(e);
    }
    this.mku = undefined;
  }
  static RotateTrap() {
    this.gku.Rotate();
  }
  static IsEnoughGoldToBuildTrap() {
    return ModelManager_1.ModelManager.TowerDefenseEventModel.IsEnoughGoldToBuildTrap(this.gku);
  }
  static async OccupyTrap() {
    var e;
    var t;
    var r;
    return !!this.RaycastResult.IsCanBuild && !!this.gku.IsInPreview() && !((t = this.RaycastResult.Grid)?.IsValid() ? !TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("ConstructTrap") || ((e = TowerDefenseEventEntityModel_1.TowerDefenseEventTrapModel.GetTrapModel(this.gku)).UpdateData(t.GetBuildingGridGuidString(), this.RaycastResult.Coords), (r = (t = await this.vku(e)) === Protocol_1.Aki.Protocol.Q4n.KRs) || Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，服务器请求失败", ["errorCode", t]), e.Release(), !r) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，网格无效"), 1));
  }
  static async vku(e) {
    var t = Protocol_1.Aki.Protocol.Dfu.create();
    t.v9n = e.ConfigId;
    var r = Protocol_1.Aki.Protocol.jfu.create();
    r.bPu = e.GridId;
    r.iPs = e.Coords.X;
    r.rPs = e.Coords.Y;
    r.Nfu = TowerDefenseEventUtility_1.TowerDefenseEventUtility.ConvertDegree2Direction(e.Degree);
    t.Vfu = r;
    var r = await Net_1.Net.CallAsync(16486, t);
    if (r && r.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      e.Uid = MathUtils_1.MathUtils.LongToNumber(r.s5n);
    }
    return r?.Q4n;
  }
  static async UnOccupyTrap() {
    var e;
    var t;
    return !!this.RaycastResult.IsCanRecycle && (this.RaycastResult.Grid?.IsValid() ? (e = this.RaycastResult.RaycastTarget.GetTapModel()) && e.IsValid() && (0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(e) ? !!TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.CheckCanExecuteAndShowFailTips("RecycleTrap") && ((t = (e = await this.Sku(e)) === Protocol_1.Aki.Protocol.Q4n.KRs) || Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "占用陷阱失败，服务器请求失败", ["errorCode", e]), t) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "取消占用陷阱失败，陷阱数据无效"), false) : (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "取消占用陷阱失败，网格无效"), false));
  }
  static async Sku(e) {
    var t = Protocol_1.Aki.Protocol.kfu.create();
    t.s5n = e.Uid;
    var e = await Net_1.Net.CallAsync(20223, t);
    return e?.Q4n;
  }
  static rPd() {
    var e = this.RaycastResult.RaycastTarget?.GetTapModel();
    var t = e ? e.Uid : undefined;
    if (this.oPd !== t && (this.oPd = t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseRecycleRaycastNotify, e.DeconstructReturn);
    }
  }
}
exports.TowerDefenseEventController = TowerDefenseEventController;
(_a = TowerDefenseEventController).MId = Stats_1.Stat.Create("TowerDefenseEventController.StepUpdateNotify");
TowerDefenseEventController.Ued = Stats_1.Stat.Create("TowerDefenseEventController.RaycastStateChanged");
TowerDefenseEventController.oPd = undefined;
TowerDefenseEventController.IsWorldInit = false;
TowerDefenseEventController.TestBpUsing = false;
TowerDefenseEventController.rYc = 0;
TowerDefenseEventController.J$u = 0;
TowerDefenseEventController.EntityRedirectFilter = new TowerDefenseEventEntityRedirectFilter_1.TowerDefenseEventEntityRedirectFilter();
TowerDefenseEventController.gku = new TowerDefenseTrapTemplateInfo();
TowerDefenseEventController.mku = undefined;
TowerDefenseEventController.z$u = undefined;
TowerDefenseEventController.RaycastResult = new TowerDefenseEventRaycastResult_1.TowerDefenseEventRaycastResult();
TowerDefenseEventController.xed = false;
TowerDefenseEventController.vYu = new TowerDefenseEventPreviewMonsterSpawner_1.TowerDefenseEventPreviewMonsterSpawner();
TowerDefenseEventController.VCd = 0;
TowerDefenseEventController.NCd = 0;
TowerDefenseEventController.Ded = e => {
  _a.EntityRedirectFilter.UpdateEntity(e);
};
TowerDefenseEventController.bJu = e => {
  _a.MId.Start();
  switch (e.aJu) {
    case "oJu":
      _a.rYc = 1;
      var t = e.oJu;
      if (t) {
        _a.RJu(t);
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
    case "nJu":
      _a.rYc = 2;
      t = e.nJu;
      if (t) {
        _a.wJu(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "战斗阶段数据为空");
      }
      AudioSystem_1.AudioSystem.SetState("tower_defence_music_2_6", "battle");
      break;
    case "sJu":
      _a.rYc = 3;
  }
  TsTowerDefenseEventActor_1.default.UpdateTrapRangeState();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseEventStepUpdate, _a.rYc);
  _a.MId.Stop();
}; //# sourceMappingURL=TowerDefenseEventController.js.map