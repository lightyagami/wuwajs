"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSubController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const InputController_1 = require("../../Input/InputController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscData_1 = require("../KscData");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const ActivityPlayerHpHandle_1 = require("./ActivityPlayerHpHandle");
const SurvivorsRogueEntityRedirectFilter_1 = require("./SurvivorsRogueEntityRedirectFilter");
const SurvivorsRogueSubModel_1 = require("./SurvivorsRogueSubModel");
class SurvivorsRogueSubController extends KscSubControllerBase_1.KscSubControllerBase {
  constructor() {
    super(...arguments);
    this.gAd = undefined;
    this.dZr = undefined;
    this.cBe = undefined;
    this.EYc = new SurvivorsRogueEntityRedirectFilter_1.SurvivorsRogueEntityRedirectFilter();
    this.xem = new ActivityPlayerHpHandle_1.ActivityPlayerHpHandle();
    this.jUd = (e, r) => {
      r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      if (this.GetModel().GoldNum !== r) {
        this.GetModel().GoldNum = r;
        KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(2, r);
      }
    };
    this.HUd = (e, r) => {
      r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      this.cFd(r);
    };
  }
  CreateModel() {
    this.SubModel = new SurvivorsRogueSubModel_1.SurvivorsRogueSubModel();
  }
  GetModel() {
    return this.SubModel;
  }
  IsTargetMap(e) {
    return e === 41;
  }
  OnInitMap() {
    var e = new UE.DamageConfig();
    e.PcFontSizeScale = 0.6;
    e.MobileFontSizeScale = 0.9;
    e.MaxDamagePerFrame = 1;
    ControllerHolder_1.ControllerHolder.DamageUiController.SetUeDamageConfig(e, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnInitMap");
    }
  }
  OnMapLoaded() {
    ControllerHolder_1.ControllerHolder.BulletController.StartKuroBulletWorld();
    var e = ResourceSystem_1.ResourceSystem.Load(SurvivorsRogueSubModel_1.SurvivorsRogueSubModel.BulletDtPath, UE.DataTable);
    if (e?.IsValid()) {
      this.GetModel().BulletDataTable = e;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 17, "加载子弹DT失败");
    }
    var r = ControllerHolder_1.ControllerHolder.BulletController.KuroBulletWorld;
    if (r && e) {
      r.AddCommonBulletDataTable(e);
    }
    this.dFd();
  }
  OnWorldDone() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnWorldDone");
    }
    var e;
    var r = ControllerHolder_1.ControllerHolder.BulletController.KuroBulletWorld;
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (t?.Valid) {
      e = t.Entity.GetComponent(3).ActorLocation;
      r?.EnableFlatGroundByAbovePoint(e);
      this.gAd = t;
      this.dZr = t.Entity.GetComponent(220);
      this.cBe = t.Entity.GetComponent(43);
    } else {
      KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc找不到玩家角色,未设置地面坐标");
    }
    this.xem.Init();
    var r = this.GetModel().KscPlayerHeadStateData;
    if (r) {
      this.xem.OnPlayerHpChange(r);
    }
  }
  OnWorldReset() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnWorldReset");
    }
    ControllerHolder_1.ControllerHolder.BulletController.StopKuroBulletWorld();
    this.gAd = undefined;
    this.dZr = undefined;
    this.mFd();
    this.xem.Clear();
  }
  OnEntityRemoved(e, r) {
    var t = this.Model.GetLogicProxy(e.CreatureDataId);
    var o = this.GetModel().WeaponKscEntities;
    for (let e = 0; e < o.length; e++) {
      if (o[e].EntityId_ === t) {
        o.splice(e, 1);
        break;
      }
    }
    var i = this.GetModel().GetEntity(e.CreatureDataId);
    if (i) {
      if (i.EntityType === 1 && ConfigManager_1.ConfigManager.SurvivorsRogueConfig.IsBoss(i.TemplateId)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, t, false);
      }
      var s = Protocol_1.Aki.Protocol.RWc.create();
      var n = Protocol_1.Aki.Protocol.Gks.create();
      n.X = e.Location.X;
      n.Y = e.Location.Y;
      n.Z = e.Location.Z;
      s.DJc = n;
      var n = FNameUtil_1.FNameUtil.GetDynamicFName(e.ReasonName.toString());
      switch (n) {
        case KscData_1.KscEntityRemoveReason.Dead:
          if (i.EntityType === 2) {
            l = Protocol_1.Aki.Protocol.XNd.create();
            s.KNd = l;
            this.Fom();
          } else {
            (l = Protocol_1.Aki.Protocol.e2d.create()).F4n = e.KillerId;
            s.Xkd = l;
          }
          break;
        case KscData_1.KscEntityRemoveReason.Coin:
          var l = Protocol_1.Aki.Protocol.t2d.create();
          s.Ykd = l;
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TowerDefenseEvent", 60, "移除幸存者实体失败: 未处理移除原因", ["creatureDataId", e.CreatureDataId], ["reasonName", e.ReasonName]);
          }
          return;
      }
      r[e.CreatureDataId] = s;
    }
  }
  Fom() {
    TimerSystem_1.TimerSystem.Next(() => {
      var e = [];
      this.GetModel().GetAllEntities(e);
      for (const r of e) {
        if (r.EntityType === 1) {
          ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntityByReasonType(r.Uid, 0);
        } else if (r.EntityType === 4 || r.EntityType === 3) {
          ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntityByReasonType(r.Uid, 4);
        }
      }
    });
  }
  CreateEntityFilter() {
    this.RedirectFilter = this.EYc;
  }
  GetPossessedPlayerEntity() {
    return this.gAd;
  }
  AddInputLayer() {
    var e;
    var r;
    if (this.BMd()) {
      this.RemoveInputLayer();
    }
    if (e = InputController_1.InputController.CreateInputLayer(8)) {
      if (r = this.GetPossessedPlayerEntity()) {
        InputController_1.InputController.AddInputLayer(r.Id, e);
      } else {
        KscLog_1.KscLog.Error("Input", 28, KscEnv_1.KscEnv.KscWorld, "幸存者肉鸽输入层加入异常,无法绑定实体");
      }
      return true;
    } else {
      KscLog_1.KscLog.Error("Input", 28, KscEnv_1.KscEnv.KscWorld, "幸存者肉鸽输入层加入异常");
      return false;
    }
  }
  RemoveInputLayer() {
    var e = this.BMd();
    if (e) {
      InputController_1.InputController.RemoveInputLayer(e);
      e.Clear();
      return true;
    } else {
      KscLog_1.KscLog.Error("Input", 28, KscEnv_1.KscEnv.KscWorld, "幸存者肉鸽输入层移除异常");
      return false;
    }
  }
  BMd() {
    var e = this.GetPossessedPlayerEntity();
    if (e) {
      return InputController_1.InputController.GetInputLayer(e.Id, 8);
    }
  }
  AddKscPlayerEntity() {
    this.AddInputLayer();
  }
  OnPlayerEntityCreated() {
    super.OnPlayerEntityCreated();
    var e;
    var r = this.GetModel();
    r.KscPlayerEntityId = r.KscPlayerEntity?.EntityId_ ?? 0;
    var t = r.KillComboStage;
    if (!(t <= 0)) {
      if ((e = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig) && (e = e.PlayerBuffIds[t - 1]) && r.KscPlayerEntity) {
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(r.KscPlayerEntity.EntityId_, true, e);
      }
    }
  }
  SyncPlayerTransform() {
    if ((this.GetModel().KscPlayerEntity || !(this.GetModel().WeaponKscEntities.length <= 0)) && this.gAd?.Valid) {
      var e = this.gAd.Entity.GetComponent(3).Actor.D_GetTransform();
      this.GetModel().KscPlayerEntity?.SetTransformByWorld(e);
      for (const r of this.GetModel().WeaponKscEntities) {
        r.SetTransformByWorld(e);
      }
    }
  }
  OnWeaponCreated(e) {
    var r;
    var t = this.GetModel();
    t.WeaponKscEntities.push(e);
    var t = t.KillComboStage;
    if (!(t <= 0)) {
      if ((r = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig) && (r = r.WeaponBuffIds[t - 1])) {
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(e.EntityId_, true, r);
      }
    }
  }
  ExecSkillAction() {
    var e = this.SubModel.KscPlayerEntity;
    if (e) {
      var r = e.GetSkillComp()?.Skills_;
      if (r && !(r.Num() <= 0) && this.dZr) {
        const t = 220003;
        if (!this.dZr.IsSkillInCd(t)) {
          r = r.Get(0);
          if (!(r.GetSkillCoolDownRemain() > 0)) {
            e.TryActiveSKill(0);
            e = r.GetSkillCoolDownMax();
            this.dZr.ModifyCdInfo(t, e);
            this.dZr.StartCd(t, 13);
            if (this.cBe) {
              r = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleGainData()?.GetCurrentEvolveId();
              if (r) {
                const t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleEvolve(r)?.SkillId;
                if (t) {
                  this.cBe.BeginSkillAsync(t);
                }
              }
            }
          }
        }
      }
    }
  }
  dFd() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    this.XUd(e, IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.jUd);
    this.XUd(e, IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.HUd);
  }
  XUd(e, r, t) {
    e.AddTreeVarUpdateDelegate(r, t);
    e = e.GetBehaviorTreeVar(r);
    if (e) {
      t(undefined, e);
    }
  }
  mFd() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.jUd);
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.HUd);
  }
  cFd(t) {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig;
    if (e) {
      let r = 0;
      var o = e.ComboNum;
      for (let e = 0; e <= o.length; e++) {
        if (t < o[e]) {
          r = e;
          break;
        }
      }
      var i = this.GetModel();
      var s = i.KillComboStage;
      if (s !== r) {
        if (s > 0) {
          var n = e.PlayerBuffIds[s - 1];
          if (n && i.KscPlayerEntity) {
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(i.KscPlayerEntity.EntityId_, false, n);
          }
          var l = e.WeaponBuffIds[s - 1];
          if (l) {
            for (const _ of i.WeaponKscEntities) {
              ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(_.EntityId_, false, l);
            }
          }
        }
        if (r > 0) {
          var n = e.PlayerBuffIds[r - 1];
          if (n && i.KscPlayerEntity) {
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(i.KscPlayerEntity.EntityId_, true, n);
          }
          var a = e.WeaponBuffIds[r - 1];
          if (a) {
            for (const u of i.WeaponKscEntities) {
              ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(u.EntityId_, true, a);
            }
          }
        }
        i.KillComboStage = r;
      }
    } else {
      KscLog_1.KscLog.Error("Common", 17, KscEnv_1.KscEnv.KscWorld, "幸存者获取连杀配置失败");
    }
  }
  OnHandlePlayerHeadHpInfo(e, r) {
    super.OnHandlePlayerHeadHpInfo(e, r);
    this.xem.OnPlayerHpChange(e);
  }
  GmPrintInfo() {
    var e = this.GetModel();
    var r = ["[ksc]幸存者玩法"];
    r.push(`玩家 EntityId:${e.KscPlayerEntityId}, 服务端Id:${e.KscPlayerCreatureDataId}`);
    for (const s of e.WeaponKscEntities) {
      var t = s.EntityId_;
      r.push(`武器 EntityId:${t}, 服务端Id:${e.GetEntityCreatureId(t)}`);
    }
    r.push("-------------------");
    var o;
    var i = r.join("\n");
    if (UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) && (o = GlobalData_1.GlobalData.World.GetWorld())) {
      UE.KismetSystemLibrary.PrintString(o, i, true, false, new UE.LinearColor(0, 0.66, 1, 1), 10);
    }
  }
}
exports.SurvivorsRogueSubController = SurvivorsRogueSubController;
//# sourceMappingURL=SurvivorsRogueSubController.js.map