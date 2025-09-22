"use strict";

var CharacterAiComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(e, i, n) : r(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAiComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IVar_1 = require("../../../../../UniverseEditor/Interface/IVar");
const AiController_1 = require("../../../../AI/Controller/AiController");
const TsAiController_1 = require("../../../../AI/Controller/TsAiController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const DEFAULT_LEVELAI_AIC_PATH = "/Game/Aki/AI/AINPC/Common/AIC_CommonNPC.AIC_CommonNPC_C";
let CharacterAiComponent = CharacterAiComponent_1 = class CharacterAiComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vFr = undefined;
    this.MFr = undefined;
    this.sxr = undefined;
    this.DisableAiHandle = undefined;
    this.EFr = new Map();
    this.Hte = undefined;
    this.SFr = undefined;
    this.yFr = "";
    this.sW1 = new Map();
    this.aW1 = true;
    this.IFr = false;
    this.TFr = undefined;
    this.LFr = new Array();
    this.DFr = new Set();
    this.NEd = new Map();
    this.jht = false;
    this.RFr = false;
    this.Mne = 0;
    this.mRa = false;
    this.bJe = () => {
      this.MFr?.OnSkillEnd();
    };
    this.r$u = undefined;
    this.UFr = undefined;
    this.Nza = (t, e) => {
      if (this.Fza(t, e)) {
        switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
          case "Boolean":
            BlackboardController_1.BlackboardController.SetBooleanValueByEntity(this.Entity.Id, t, e.rTs);
            break;
          case "Float":
            BlackboardController_1.BlackboardController.SetFloatValueByEntity(this.Entity.Id, t, e.sTs);
            break;
          case "Int":
            BlackboardController_1.BlackboardController.SetIntValueByEntity(this.Entity.Id, t, MathUtils_1.MathUtils.LongToNumber(e.oTs));
            break;
          case "String":
            BlackboardController_1.BlackboardController.SetStringValueByEntity(this.Entity.Id, t, e.nTs);
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 0];
  }
  get TsAiController() {
    return this.vFr;
  }
  get AiController() {
    return this.MFr;
  }
  OnInitData() {
    this.MFr = new AiController_1.AiController();
    this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle("SetAiDisableInGame");
    var t = this.Entity.GetComponent(0);
    if (t.IsRole() && !t.IsAutoRole()) {
      this.DisableAi("玩家主控权");
    }
    return true;
  }
  CheckAndInitTsAiController() {
    var t;
    var e = this.Entity.GetComponent(3);
    if (this.vFr) {
      this.vFr.Possess(e.Actor);
    } else {
      (t = this.AFr(e.ActorTransform)).Possess(e.Actor);
      this.PFr(t, "CheckAndInitTsAiController");
    }
  }
  OnInit() {
    this.Mne = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    this.Hte = this.Entity.GetComponent(3);
    this.SFr = this.Entity.GetComponent(76);
    var t = this.Hte.Actor.GetController();
    if (t && (t.SetActorTickEnabled(false), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("AI", 29, "AIC配置在AI基础表，请清理BP自带的AIC配置信息", ["ConfigId", this.Mne], ["Actor", this.Hte.Actor?.GetName()], ["AIController", t?.GetName()]);
    }
    return true;
  }
  OnStart() {
    var t;
    this.MFr.SetAiDesignComp(this);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.AiController.OnChangeMode);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityCampModify, this.AiController.OnEntityCampModified);
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      t = this.Entity.GetComponent(0).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc;
      this.Hte.SetAutonomous(false, t);
    }
    this.xFr();
    return true;
  }
  OnPostActivate() {
    this.jht = true;
    this.wFr();
    if (this.TsAiController) {
      this.BFr();
    }
    if (!this.EFr.size) {
      this.MFr?.SetEnable(true);
    }
    ModelManager_1.ModelManager.CombatMessageModel.AnyHateChange = true;
  }
  AFr(t) {
    var t = ActorSystem_1.ActorSystem.Get(UE.TsAiController_C.StaticClass(), t, undefined);
    t.SetActorTickEnabled(false);
    var e = t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
    for (let t = 0; t < e.Num(); t++) {
      e.Get(t).SetComponentTickEnabled(false);
    }
    return t;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.AiController.OnChangeMode);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityCampModify, this.AiController.OnEntityCampModified);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza);
    }
    this.DisableAi("CharacterAiComponent OnEnd");
    this.RemoveTsAiController();
    this.MFr?.Clear();
    this.MFr = undefined;
    this.DisableAiHandle.Clear();
    this.LFr.length = 0;
    return !(this.jht = false);
  }
  OnClear() {
    this.EFr.clear();
    return true;
  }
  xFr() {
    let t = 0;
    var e;
    var i = this.Hte.CreatureData;
    var o = i.GetPbEntityInitData();
    if (i.IsAutoRole()) {
      e = i.GetAutoRoleConfig();
      t = e ? e.AiId : 0;
    } else if (o?.ComponentsData && (e = (0, IComponent_1.getComponent)(o.ComponentsData, "AiComponent"))?.AiId && !e.Disabled && (t = e.AiId, e.InitBlackBoard)) {
      i.SetBlackboardsByConfig(e.InitBlackBoard);
    }
    if (t) {
      this.LoadAiConfigs(t);
    } else if (BehaviorTreeDefines_1.BehaviorTreeDefines.CanUseLevelAiBehaviorTree(this.Entity)) {
      this.Ica();
      this.qFr();
    } else {
      this.DisableAi("Ai Config");
    }
  }
  OnTick(t) {
    if (!this.Hte.CreatureData.GetRemoveState() && this.vFr && this.jht && !this.IFr) {
      if (this.MFr) {
        this.MFr.Tick(t);
      }
      var e = t * MathUtils_1.MathUtils.MillisecondToSecond;
      if (GlobalData_1.GlobalData.IsPlayInEditor && this.mRa) {
        this.vFr.DrawDebugLines(e);
      }
      if (this.RFr && this.TFr) {
        this.TFr.KuroTickComponentOutside(e);
      }
      for (const i of this.LFr) {
        i.KuroTickComponentOutside(e);
      }
    }
  }
  LoadAiConfigs(t) {
    var e;
    if (t) {
      if (this.MFr.AiBase?.Id !== t) {
        e = this.Hte.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc;
        this.MFr.LoadAiConfigs(t, e);
        if (this.MFr.AiBase) {
          if (this.EFr.has("Ai Config")) {
            this.EnableAi("Ai Config");
          }
          this.GFr();
        } else {
          this.DisableAi("Ai Config");
        }
      }
    } else {
      this.DisableAi("Ai Config");
    }
  }
  GFr() {
    const i = this.MFr.AiBase;
    if (i && i.AiController) {
      let t = i.AiController;
      if (!t.endsWith("_C")) {
        t += "_C";
      }
      const o = this.Hte.Actor.GetController();
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
        if (t?.IsValid()) {
          if (o?.GetClass().GetName() === t.GetName()) {
            this.PFr(o);
          } else if (this.Hte?.Valid) {
            if (UE.KuroStaticLibrary.GetDefaultObject(t)?.IsA(UE.TsAiController_C.StaticClass())) {
              var t = ActorSystem_1.ActorSystem.Get(t, this.Hte.ActorTransform, undefined);
              t.SetActorTickEnabled(false);
              var e = t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
              for (let t = 0; t < e.Num(); t++) {
                e.Get(t).SetComponentTickEnabled(false);
              }
              ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(t, this.Hte.Owner, 2, "CharacterAiComponent.LoadUeControllerByConfig", undefined, 2, 2, 2, false);
              this.PFr(t, "AiController加载成功");
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AI", 29, "配置的AI控制器不是TsAiController", ["Path", i.AiController]);
            }
          }
        } else {
          this.PFr(o, "AiController加载失败，使用默认AIController配置");
        }
      });
    }
  }
  SetAiHateConfig(t) {
    this.yFr = t;
    if (this.vFr) {
      this.vFr.SetAiHateConfig(t);
    }
  }
  SetAiTickLock(t) {
    this.IFr = t;
  }
  PFr(t, e = "") {
    if (this.vFr === t) {
      CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.SetUeController，AiController相同忽略执行", ["reason", e]);
    } else if (t instanceof TsAiController_1.default) {
      CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.SetUeController", ["reason", e]);
      CharacterAiComponent_1.NFr.Start();
      this.AiController?.AiConditionEvents.Clear();
      this.AiController?.AiPerceptionEvents.Clear(true);
      this.AiController?.AiLevelVarEvents.Clear();
      this.RemoveTsAiController();
      this.vFr = t;
      this.vFr.InitAiController(this);
      if (this.yFr) {
        t.SetAiHateConfig(this.yFr);
      }
      if (this.sW1.size > 0) {
        for (var [i, o] of this.sW1) {
          t.AiController.AiPerception.AddOrRemoveAiSense(i, o);
        }
      }
      if (!this.aW1) {
        t.AiController.AiPerception.SetAiSenseEnableWithoutForbidAllSense(false);
      }
      t.Possess(this.Hte.Actor);
      if (this.jht) {
        this.BFr();
      }
      CharacterAiComponent_1.NFr.Stop();
    } else {
      CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.SetUeController，controller is not TsAiController", ["reason", e]);
    }
  }
  BFr() {
    var t;
    CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.StartUeController");
    if (this.r$u) {
      this.ChangeAiBehaviorTree(this.r$u);
    } else if (t = BehaviorTreeDefines_1.BehaviorTreeDefines.GetLevelAiBehaviorTreeAssetPath(this.Entity)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "开始加载LevelAi行为树", ["PbDataId", this.Mne], ["CreatureId", this.Hte?.CreatureData?.GetCreatureDataId()]);
      }
      this.ChangeAiBehaviorTree(t);
    } else if (this.MFr.AiBase) {
      this.ChangeAiBehaviorTree(this.MFr.AiBase.BehaviorTree);
    }
    CharacterAiComponent_1.kFr.Start();
    this.vFr.OnStart();
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (this.UFr) {
        this.FFr(this.UFr);
      }
    } else {
      this.vFr.获取控制权时();
    }
    this.LFr.length = 0;
    CharacterAiComponent_1.kFr.Stop();
  }
  RestartBehaviorTree() {
    var t;
    if (this.IsAiDriver && (t = this.TsAiController.BrainComponent)) {
      t.RestartLogic();
    }
  }
  EnableAi(t) {
    var e = this.EFr.get(t);
    if (this.EFr.delete(t)) {
      return !!this.DisableAiHandle.Enable(e, this.constructor.name) && (this.DisableAiHandle.Empty && (this.IsAiDriver && (e = this.TsAiController.BrainComponent) && (e.RestartLogic(), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnAiEnable)), CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.SetEnable", ["enabled", true], ["key", t]), this.Enable(this.sxr, "CharacterAiComponent.EnableAi"), this.sxr = undefined, this.MFr?.SetEnable(true)), true);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 29, "[CharacterAiComponent] 开启Ai使用了未定义的Key", ["entity", this.Entity.constructor.name], ["PbDataId", this.Mne], ["Key", t]);
      }
      return false;
    }
  }
  DisableAi(t) {
    var e;
    if (this.EFr.has(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 29, "[CharacterAiComponent] 重复使用关闭Ai的Key", ["entity", this.Entity.constructor.name], ["PbDataId", this.Mne], ["Key", t]);
      }
    } else {
      e = this.DisableAiHandle.Disable(t, this.constructor.name);
      this.EFr.set(t, e);
      if (this.IsEnabled()) {
        if (this.IsAiDriver && (e = this.TsAiController.BrainComponent)) {
          e.StopLogic("PauseAI");
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnAiDisable);
        }
        CombatLog_1.CombatLog.Info("Ai", this.Entity, "CharacterAiComponent.SetEnable", ["enabled", false], ["key", t]);
        this.sxr = this.Disable("[CharacterAiComponent.DisableAi]");
        this.MFr?.SetEnable(false);
      }
    }
  }
  AddOrRemoveAiScene(t, e) {
    this.sW1.set(t, e);
    if (this.vFr) {
      this.vFr.AiController.AiPerception.AddOrRemoveAiSense(t, e);
    }
  }
  SetAllAiSenseEnableWithoutForbidAllSense(t) {
    this.aW1 = t;
    if (this.vFr) {
      this.vFr.AiController.AiPerception.SetAiSenseEnableWithoutForbidAllSense(t);
    }
  }
  IsEnabled() {
    return this.sxr === undefined;
  }
  DumpDisableAiInfo() {
    return this.DisableAiHandle.DumpDisableInfo();
  }
  get IsAiDriver() {
    return !!this.TsAiController && (!!BehaviorTreeDefines_1.BehaviorTreeDefines.CanUseLevelAiBehaviorTree(this.Entity) || !!this.MFr?.AiBase);
  }
  get HasBrain() {
    return this.IsAiDriver && this.TFr !== undefined;
  }
  RemoveTsAiController() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this.vFr)) {
      if (ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(this.vFr)) {
        ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(this.vFr, false, "CharacterAiComponent.RemoveTsAiController", 1, 1, 1);
      }
      if (this.vFr.Pawn?.IsValid()) {
        this.vFr.Pawn.DetachFromControllerPendingDestroy();
      }
      this.vFr.Clear();
    }
    this.vFr = undefined;
    this.TFr = undefined;
    this.NEd.clear();
  }
  SetLoadCompletePlayer(t) {
    this.DFr.add(t);
  }
  CheckLoadComplete(t) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || !!(t = t.GetComponent(0)?.GetPlayerId()) && this.DFr.has(t);
  }
  SetDebugDraw(t) {
    this.mRa = t;
  }
  OFr(i) {
    if (i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 29, "准备加载行为树AI", ["Id", this.MFr?.CharActorComp?.CreatureData.GetPbDataId()], ["Path", i]);
      }
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BehaviorTree, t => {
        var e;
        if (this.vFr) {
          if (t?.IsValid()) {
            if (this.vFr.SetupBehaviorTree(t) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 29, "开始运行行为树AI", ["Id", this.MFr.CharActorComp.CreatureData.GetPbDataId()], ["TreeName", t.GetName()]), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRunBehaviorTree), this.TFr = this.vFr.BrainComponent, this.TFr?.SetComponentTickEnabled(false), GlobalData_1.GlobalData.IsPlayInEditor && (e = this.MFr.CharActorComp.Actor.TsCharacterDebugComponent) && (e.BehaviorTree = t), this.jht)) {
              this.wFr();
            }
            this.NEd.clear();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AI", 50, "加载行为树AI资源失败", ["PbDataId", this.MFr.CharActorComp.CreatureData.GetPbDataId()], ["Path", i]);
          }
        }
      });
    }
  }
  wFr() {
    if (!this.RFr) {
      if (this.vFr) {
        this.RFr = true;
      }
    }
  }
  OnSyncAiInformation(t) {
    var e;
    if (this.Entity.IsInit) {
      this.FFr(t);
    } else {
      e = t.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      CombatLog_1.CombatLog.Info("Ai", this.Entity, "切换控制权等待Entity初始化完成", ["v", e]);
      this.UFr = t;
    }
  }
  FFr(e) {
    var i = e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    CombatLog_1.CombatLog.Info("Ai", this.Entity, "切换控制权", ["v", i]);
    this.Hte.CreatureData.SetBlackboardsByProtocol(e.tVn.eVn);
    var t = this.MFr.AiHateList;
    for (const n of e.tVn.ISs) {
      var o = MathUtils_1.MathUtils.LongToNumber(n.F4n);
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      if (o) {
        t.ChangeHatred(o.Id, 0, n.Z8n);
      }
    }
    for (const h of e.tVn.TSs) {
      this.MFr.SetCoolDownTime(h.j4n, MathUtils_1.MathUtils.LongToNumber(h.W4n), false, "切换控制权");
    }
    var r = this.Entity.GetComponent(3);
    if (r.IsAutonomousProxy !== i) {
      let t = i;
      var s = this.Entity.GetComponent(55);
      if (!!s && (s.CurrentState === 2 || s.CurrentState === 4)) {
        t = r.IsMoveAutonomousProxy;
      }
      r.SetAutonomous(i, t);
      if (i) {
        this.TsAiController?.获取控制权时();
      }
      this.MFr.OnSwitchControl(i, e.W5n);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, i);
      if (i) {
        this.SFr.OnControl();
      }
    } else {
      this.MFr.SetControllerPlayerId(e.W5n);
    }
  }
  SwitchControl(t) {
    this.Entity.GetComponent(3).SetAutonomous(t);
    if (t) {
      this.TsAiController?.获取控制权时();
    }
    this.MFr.OnSwitchControl(t, ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, t);
  }
  static AiHateNotify(t, e) {
    var i = t.GetComponent(47).MFr.AiHateList;
    for (const r of e.ISs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.F4n);
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      if (o) {
        i.ChangeHatred(o.Id, 0, r.Z8n);
      }
    }
  }
  qFr() {
    const i = this.Hte.Actor.GetController();
    ResourceSystem_1.ResourceSystem.LoadAsync(DEFAULT_LEVELAI_AIC_PATH, UE.Class, t => {
      if (t?.IsValid()) {
        if (i?.GetClass().GetName() === t.GetName()) {
          this.PFr(i);
        } else if (this.Hte?.Valid) {
          if (UE.KuroStaticLibrary.GetDefaultObject(t)?.IsA(UE.TsAiController_C.StaticClass())) {
            var t = ActorSystem_1.ActorSystem.Get(t, this.Hte.ActorTransform, undefined);
            t.SetActorTickEnabled(false);
            var e = t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
            for (let t = 0; t < e.Num(); t++) {
              e.Get(t).SetComponentTickEnabled(false);
            }
            ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(t, this.Hte.Owner, 2, "CharacterAiComponent.LoadAndRunLevelAiBehaviorTree", undefined, 2, 2, 2, false);
            this.PFr(t, "加载LevelAi行为树");
            if (this.EFr.has("Ai Config")) {
              this.EnableAi("Ai Config");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AI", 29, "配置的AI控制器不是TsAiController", ["Path", DEFAULT_LEVELAI_AIC_PATH]);
          }
        }
      }
    });
  }
  Ica() {
    var t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "VarComponent");
      if (t) {
        for (const e of t.Vars) {
          if (e.IsClient) {
            switch (e.Type) {
              case "Int":
                BlackboardController_1.BlackboardController.SetIntValueByEntity(this.Entity.Id, e.Name, e.Value);
                break;
              case "Float":
                BlackboardController_1.BlackboardController.SetFloatValueByEntity(this.Entity.Id, e.Name, e.Value);
                break;
              case "String":
                BlackboardController_1.BlackboardController.SetStringValueByEntity(this.Entity.Id, e.Name, e.Value);
                break;
              case "Boolean":
                BlackboardController_1.BlackboardController.SetBooleanValueByEntity(this.Entity.Id, e.Name, e.Value);
            }
          }
        }
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza);
      }
    }
  }
  Fza(t, e) {
    var i = this.Entity?.GetComponent(0);
    if (i?.IsNpc() || i?.IsAnimal()) {
      i = i.GetPbEntityInitData();
      if (i) {
        i = (0, IComponent_1.getComponent)(i.ComponentsData, "VarComponent");
        if (i) {
          var o = (0, IVar_1.getVarTypeByIndex)(e.iTs);
          for (const r of i.Vars) {
            if (t === r.Name) {
              return !!r.IsClient && r.Type === o;
            }
          }
        }
      }
    }
    return false;
  }
  ChangeAiBehaviorTree(t) {
    if (t && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "切换AI行为树", ["Id", this.MFr?.CharActorComp?.CreatureData.GetPbDataId()], ["Path", t]), this.r$u = t, this.TsAiController)) {
      this.OFr(t);
    }
  }
  ResetAiBehaviorTree() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "重置AI行为树", ["Id", this.MFr?.CharActorComp?.CreatureData.GetPbDataId()]);
    }
    this.r$u = undefined;
    if (this.TsAiController) {
      this.BFr();
    }
  }
  ResetRandomNodes(e, i) {
    var o = this.TFr;
    if (o && o instanceof UE.BehaviorTreeComponent) {
      var r = UE.KuroAILibrary.GetCurrentRootNode(o);
      if (r) {
        let t = this.NEd.get(r);
        if (!t) {
          t = new Map();
          this.NEd.set(r, t);
          this.VEd(r, t);
        }
        if (e === undefined) {
          for (const s of t.values()) {
            for (const n of s) {
              UE.KuroAILibrary.ResetRandomNode(o, n, i);
            }
          }
        } else {
          r = t.get(e);
          if (r) {
            for (const h of r) {
              UE.KuroAILibrary.ResetRandomNode(o, h, i);
            }
          }
        }
      }
    }
  }
  VEd(e, i) {
    if (e instanceof UE.BTComposite_Random) {
      var o = e.Key.toString();
      let t = i.get(o);
      if (!t) {
        t = new Set();
        i.set(o, t);
      }
      t.add(e);
    }
    if (e instanceof UE.BTCompositeNode) {
      for (let t = 0; t < e.Children.Num(); t++) {
        var r = e.Children.Get(t);
        if (r.ChildComposite) {
          this.VEd(r.ChildComposite, i);
        }
      }
    }
  }
};
CharacterAiComponent.NFr = Stats_1.Stat.Create("SetUeController");
CharacterAiComponent.kFr = Stats_1.Stat.Create("StartUeController");
__decorate([CombatMessage_1.CombatNet.Listen("a3n", true)], CharacterAiComponent, "AiHateNotify", null);
CharacterAiComponent = CharacterAiComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(47)], CharacterAiComponent);
exports.CharacterAiComponent = CharacterAiComponent; //# sourceMappingURL=CharacterAiComponent.js.map