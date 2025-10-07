"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSubController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
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
const SurvivorsRogueEntityRedirectFilter_1 = require("./SurvivorsRogueEntityRedirectFilter");
const SurvivorsRoguePlayerHpHandle_1 = require("./SurvivorsRoguePlayerHpHandle");
const SurvivorsRogueSubModel_1 = require("./SurvivorsRogueSubModel");
class SurvivorsRogueSubController extends KscSubControllerBase_1.KscSubControllerBase {
  constructor() {
    super(...arguments);
    this.Vwd = undefined;
    this.dZr = undefined;
    this.cBe = undefined;
    this.EYc = new SurvivorsRogueEntityRedirectFilter_1.SurvivorsRogueEntityRedirectFilter();
    this.C9d = new SurvivorsRoguePlayerHpHandle_1.SurvivorsRoguePlayerHpHandle();
    this.hAd = (e, r) => {
      r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      if (this.GetModel().GoldNum !== r) {
        this.GetModel().GoldNum = r;
        KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(2, r);
      }
    };
    this.lAd = (e, r) => {
      r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      this.Q2d(r);
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
    ControllerHolder_1.ControllerHolder.DamageUiController.SetUeDamageConfig(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnInitMap");
    }
  }
  async PreloadAsync() {
    await super.PreloadAsync();
    await this.LoadBulletDt();
  }
  async LoadBulletDt() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnPreload");
    }
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SurvivorsRogueSubModel_1.SurvivorsRogueSubModel.BulletDtPath, UE.DataTable, e => {
      if (e?.IsValid()) {
        this.GetModel().BulletDataTable = e;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SurvivorsRogue", 17, "加载子弹DT失败");
      }
      r.SetResult(true);
    });
    await r.Promise;
  }
  OnMapLoaded() {
    ControllerHolder_1.ControllerHolder.BulletController.StartKuroBulletWorld();
    this.K2d();
  }
  OnWorldDone() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnWorldDone");
    }
    var e;
    var r = ControllerHolder_1.ControllerHolder.BulletController.KuroBulletWorld;
    var o = this.GetModel().BulletDataTable;
    if (r && o) {
      r.AddCommonBulletDataTable(o);
    }
    var o = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (o?.Valid) {
      e = o.Entity.GetComponent(3).ActorLocation;
      r?.EnableFlatGroundByAbovePoint(e);
      this.Vwd = o;
      this.dZr = o.Entity.GetComponent(208);
      this.cBe = o.Entity.GetComponent(40);
    } else {
      KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc找不到玩家角色,未设置地面坐标");
    }
    this.C9d.Init();
    var r = this.GetModel().KscPlayerHeadStateData;
    if (r) {
      this.C9d.OnPlayerHpChange(r);
    }
  }
  OnWorldReset() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 17, "SurvivorsRogueSubController OnWorldReset");
    }
    ControllerHolder_1.ControllerHolder.BulletController.StopKuroBulletWorld();
    this.Vwd = undefined;
    this.dZr = undefined;
    this.X2d();
    this.C9d.Clear();
  }
  OnEntityRemoved(e, r) {
    var o = this.Model.GetLogicProxy(e.CreatureDataId);
    var t = this.GetModel().WeaponKscEntities;
    for (let e = 0; e < t.length; e++) {
      if (t[e].EntityId_ === o) {
        t.splice(e, 1);
        break;
      }
    }
    var i = this.GetModel().GetEntity(e.CreatureDataId);
    if (i) {
      if (i.EntityType === 1 && ConfigManager_1.ConfigManager.SurvivorsRogueConfig.IsBoss(i.TemplateId)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, o, false);
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
            a = Protocol_1.Aki.Protocol.Mqd.create();
            s.Sqd = a;
            this.Ajd();
          } else {
            (a = Protocol_1.Aki.Protocol.ZUd.create()).F4n = e.KillerId;
            s.KUd = a;
          }
          break;
        case KscData_1.KscEntityRemoveReason.Coin:
          var a = Protocol_1.Aki.Protocol.exd.create();
          s.XUd = a;
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
  Ajd() {
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
    return this.Vwd;
  }
  AddInputLayer() {
    var e;
    var r;
    if (this.myd()) {
      this.RemoveInputLayer();
    }
    if (e = InputController_1.InputController.CreateInputLayer(7)) {
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
    var e = this.myd();
    if (e) {
      InputController_1.InputController.RemoveInputLayer(e);
      e.Clear();
      return true;
    } else {
      KscLog_1.KscLog.Error("Input", 28, KscEnv_1.KscEnv.KscWorld, "幸存者肉鸽输入层移除异常");
      return false;
    }
  }
  myd() {
    var e = this.GetPossessedPlayerEntity();
    if (e) {
      return InputController_1.InputController.GetInputLayer(e.Id, 7);
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
    var o = r.KillComboStage;
    if (!(o <= 0)) {
      if ((e = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig) && (e = e.PlayerBuffIds[o - 1]) && r.KscPlayerEntity) {
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(r.KscPlayerEntity.EntityId_, true, e);
      }
    }
  }
  SyncPlayerTransform() {
    if ((this.GetModel().KscPlayerEntity || !(this.GetModel().WeaponKscEntities.length <= 0)) && this.Vwd?.Valid) {
      var e = this.Vwd.Entity.GetComponent(3).Actor.D_GetTransform();
      this.GetModel().KscPlayerEntity?.SetTransformByWorld(e);
      for (const r of this.GetModel().WeaponKscEntities) {
        r.SetTransformByWorld(e);
      }
    }
  }
  OnWeaponCreated(e) {
    var r;
    var o = this.GetModel();
    o.WeaponKscEntities.push(e);
    var o = o.KillComboStage;
    if (!(o <= 0)) {
      if ((r = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig) && (r = r.WeaponBuffIds[o - 1])) {
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(e.EntityId_, true, r);
      }
    }
  }
  ExecSkillAction() {
    var e = this.SubModel.KscPlayerEntity;
    if (e) {
      var r = e.GetSkillComp()?.Skills_;
      if (r && !(r.Num() <= 0) && this.dZr) {
        const o = 220003;
        if (!this.dZr.IsSkillInCd(o)) {
          r = r.Get(0);
          if (!(r.GetSkillCoolDownRemain() > 0)) {
            e.TryActiveSKill(0);
            e = r.GetSkillCoolDownMax();
            this.dZr.ModifyCdInfo(o, e);
            this.dZr.StartCd(o, 13);
            if (this.cBe) {
              r = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetRoleGainData()?.GetCurrentEvolveId();
              if (r) {
                const o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleEvolve(r)?.SkillId;
                if (o) {
                  this.cBe.BeginSkillAsync(o);
                }
              }
            }
          }
        }
      }
    }
  }
  K2d() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    this.mAd(e, IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.hAd);
    this.mAd(e, IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.lAd);
  }
  mAd(e, r, o) {
    e.AddTreeVarUpdateDelegate(r, o);
    e = e.GetBehaviorTreeVar(r);
    if (e) {
      o(undefined, e);
    }
  }
  X2d() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.hAd);
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.lAd);
  }
  Q2d(o) {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.CurComboConfig;
    if (e) {
      let r = 0;
      var t = e.ComboNum;
      for (let e = 0; e <= t.length; e++) {
        if (o < t[e]) {
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
          var a = e.WeaponBuffIds[s - 1];
          if (a) {
            for (const u of i.WeaponKscEntities) {
              ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(u.EntityId_, false, a);
            }
          }
        }
        if (r > 0) {
          var n = e.PlayerBuffIds[r - 1];
          if (n && i.KscPlayerEntity) {
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(i.KscPlayerEntity.EntityId_, true, n);
          }
          var l = e.WeaponBuffIds[r - 1];
          if (l) {
            for (const _ of i.WeaponKscEntities) {
              ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(_.EntityId_, true, l);
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
    this.C9d.OnPlayerHpChange(e);
  }
  GmPrintInfo() {
    var e = this.GetModel();
    var r = ["[ksc]幸存者玩法"];
    r.push(`玩家 EntityId:${e.KscPlayerEntityId}, 服务端Id:${e.KscPlayerCreatureDataId}`);
    for (const s of e.WeaponKscEntities) {
      var o = s.EntityId_;
      r.push(`武器 EntityId:${o}, 服务端Id:${e.GetEntityCreatureId(o)}`);
    }
    r.push("-------------------");
    var t;
    var i = r.join("\n");
    if (UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) && (t = GlobalData_1.GlobalData.World.GetWorld())) {
      UE.KismetSystemLibrary.PrintString(t, i, true, false, new UE.LinearColor(0, 0.66, 1, 1), 10);
    }
  }
}
exports.SurvivorsRogueSubController = SurvivorsRogueSubController;
//# sourceMappingURL=SurvivorsRogueSubController.js.map