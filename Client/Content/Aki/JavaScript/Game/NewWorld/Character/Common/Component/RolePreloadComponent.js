"use strict";

var RolePreloadComponent_1;
var __decorate = this && this.__decorate || function (e, o, t, r) {
  var i;
  var l = arguments.length;
  var a = l < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, t) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, o, t, r);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (i = e[n]) {
        a = (l < 3 ? i(a) : l > 3 ? i(o, t, a) : i(o, t)) || a;
      }
    }
  }
  if (l > 3 && a) {
    Object.defineProperty(o, t, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePreloadComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const MonsterBattleConfById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimeLimit_1 = require("../../../../../Core/Performance/TimeLimit");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PreloadDefine_1 = require("../../../../Preload/PreloadDefine");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew");
const GameModePromise_1 = require("../../../../World/Define/GameModePromise");
const characterCommonSkillSet = new Set([100001, 100002, 100003, 100004, 100005, 100006, 100007, 210001, 200001, 200002]);
const TIME_LIMIT_MICRO_SECOND = 5000;
let RolePreloadComponent = RolePreloadComponent_1 = class RolePreloadComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.tRr = undefined;
    this.XJr = undefined;
    this.$Jr = false;
    this.fGn = undefined;
    this.T8_ = [];
    this.zN1 = [];
    this.JN1 = [];
    this.PreloadSkillIds = new Set();
    this.YJr = (e, o) => {
      if (o && !this.$Jr && this.tRr && this.u1t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        CombatLog_1.CombatLog.Warn("Skill", this.Entity, "开始加载技能和子弹");
        this.$Jr = true;
        this.ZN1();
        this.e31();
      }
    };
  }
  OnInitData() {
    if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
      this.tRr = this.Entity.GetComponent(39);
      this.u1t = this.Entity.GetComponent(0);
      this.Entity.GetComponent(205).ListenForTagAddOrRemove(1996802261, this.YJr);
    }
    return true;
  }
  OnTick(e) {
    while (this.zN1.length > 0 && !RolePreloadComponent_1.t31.IsTimeLimitExceeded()) {
      var o = cpp_1.KuroTime.GetMicroseconds64();
      var t = this.zN1.shift();
      if (t) {
        this.LoadSkillAsync(t);
      }
      var t = cpp_1.KuroTime.GetMicroseconds64();
      RolePreloadComponent_1.t31.AddCost(t - o);
    }
    while (this.JN1.length > 0 && !RolePreloadComponent_1.t31.IsTimeLimitExceeded()) {
      var r = cpp_1.KuroTime.GetMicroseconds64();
      var i = this.JN1.shift();
      if (i) {
        this.i31(i);
      }
      var i = cpp_1.KuroTime.GetMicroseconds64();
      RolePreloadComponent_1.t31.AddCost(i - r);
    }
    if (this.zN1.length > 0 || this.JN1.length > 0) {
      RolePreloadComponent_1.t31.ResetCost();
    }
  }
  InitPreload(e) {
    this.XJr = e;
    if (this.tRr) {
      RolePreloadComponent_1.uH1.Start();
      this.SGn();
      this.EGn();
      this.zJr();
      this.ZJr();
      RolePreloadComponent_1.uH1.Stop();
    }
  }
  GetFightInfo() {
    return this.fGn;
  }
  SGn() {
    var e = this.XJr?.BlueprintClassPath;
    if (e) {
      this.fGn = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e);
    }
  }
  EGn() {
    this.T8_.length = 0;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    if (e && e.FightInfoDtType.length > 0) {
      for (const o of e.FightInfoDtType) {
        this.T8_.push(o);
      }
    } else if (this.u1t.IsAutoRole()) {
      this.T8_.push(2);
    } else {
      if (this.u1t.IsMonster()) {
        e = this.u1t.GetMonsterComponent()?.FightConfigId;
        if (e) {
          e = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(e);
          if (e && e.RoleMappingId > 0) {
            this.T8_.push(2);
            return;
          }
        }
      }
      if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelikeOnly() || ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink()) {
        this.T8_.push(1);
      }
    }
  }
  zJr() {
    RolePreloadComponent_1.r31.Start();
    var e;
    var o = this.XJr;
    var t = this.fGn?.SkillDataTable.ToAssetPathName();
    if (t?.length && t !== "None") {
      if (!(e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid()) {
        CombatLog_1.CombatLog.Warn("Skill", this.Entity, "SkillComponent中找不到技能表", ["ActorPath", o.BlueprintClassPath], ["技能表Path", t]);
      }
      this.tRr.DtSkillInfo = e;
    }
    for (const l of this.T8_) {
      var r;
      var i = this.fGn?.SkillDataTableMap.Get(l)?.ToAssetPathName();
      if (i && i.length > 0 && i !== "None" && ((r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(i, UE.DataTable))?.IsValid() || CombatLog_1.CombatLog.Warn("Skill", this.Entity, "SkillComponent中找不到玩法额外技能表", ["加载类型", l], ["ActorPath", o.BlueprintClassPath], ["额外技能表Path", i]), r)) {
        this.tRr.DtSkillInfoExtraList ||= [];
        this.tRr.DtSkillInfoExtraList.push(r);
      }
    }
    t = this.u1t.GetEntityType();
    if (t === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      this.tzr();
    } else if (t === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      this.izr();
    } else if (this.u1t?.SummonType !== Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault) {
      this.tzr();
    } else if (t === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      this.ozr();
    } else if (t === Protocol_1.Aki.Protocol.kks.HI_) {
      this.qHl();
    }
    RolePreloadComponent_1.r31.Stop();
  }
  tzr() {
    var e = new Array();
    DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
    for (const t of e) {
      this.kk_(Number(t));
    }
    this.MGn();
    for (const r of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
      var o = Number(r);
      if (characterCommonSkillSet.has(o) && !this.PreloadSkillIds.has(o)) {
        this.kk_(o);
      }
    }
  }
  async LoadSkillAsync(o, e) {
    let t = this.XJr.FightAssetManager.SkillAssetManager.GetSkill(o);
    var r;
    if (t) {
      if (t.Loading()) {
        r = new CustomPromise_1.CustomPromise();
        t.AddPromise(r);
        return r.Promise;
      } else {
        return 3;
      }
    } else {
      RolePreloadComponent_1.o31.Start();
      if (t = this.kk_(o)) {
        r = new CustomPromise_1.CustomPromise();
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(t, e || this.XJr.LoadPriority, false, r, e => {
          if (e) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Preload", 4, "技能加载完毕", ["SkillId", o]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Preload", 4, "技能加载失败", ["SkillId", o]);
          }
        });
        RolePreloadComponent_1.o31.Stop();
        return r.Promise;
      } else {
        RolePreloadComponent_1.o31.Stop();
        return 2;
      }
    }
  }
  i31(e) {
    if (!this.XJr.FightAssetManager.BulletAssetManager.GetBullet(e)) {
      RolePreloadComponent_1.n31.Start();
      if (e = this.s31(e)) {
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(e, this.XJr.LoadPriority, false);
      }
      RolePreloadComponent_1.n31.Stop();
    }
  }
  FlushSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.XJr, e);
  }
  RemoveSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.XJr, e);
  }
  ozr() {
    if (this.tRr.DtSkillInfo) {
      var e = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(this.tRr.DtSkillInfo, e);
      for (const r of e) {
        if (r[0] !== undefined && r[1] !== undefined) {
          var o = Number(r[0]);
          var t = r[1];
          if (t && t.SkillGenre === 8) {
            this.kk_(o);
          } else {
            for (let e = 0; e < t.SkillTag.Num(); e++) {
              if (t.SkillTag.Get(e).TagId === 2057104696 && (this.kk_(o), Log_1.Log.CheckDebug())) {
                Log_1.Log.Debug("Preload", 4, "预加载怪物出场技能", ["SkillId", o]);
              }
            }
          }
        }
      }
    }
  }
  qHl() {
    var e = new Array();
    DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
    for (const o of e) {
      this.kk_(Number(o));
    }
    this.MGn();
  }
  izr() {
    var e = new Array();
    if (this.tRr.DtSkillInfo) {
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
      for (const o of e) {
        this.kk_(Number(o));
      }
    }
    for (const t of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
      this.kk_(Number(t));
    }
    this.MGn();
  }
  MGn() {
    var e = this.tRr.DtSkillInfoExtraList;
    if (e && !(e.length <= 0)) {
      for (const r of e) {
        var o = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(r, o);
        for (const i of o) {
          var t = Number(i);
          this.kk_(t);
        }
      }
    }
  }
  ZJr() {
    var e = this.u1t.GetEntityType();
    if (e === Protocol_1.Aki.Protocol.kks.Proto_Player || e === Protocol_1.Aki.Protocol.kks.Proto_Vision || e === Protocol_1.Aki.Protocol.kks.HI_) {
      this.JJr(true);
    } else {
      this.JJr(false);
    }
    this.vGn();
  }
  JJr(e) {
    var o = this.fGn?.BulletDataTable?.ToAssetPathName();
    if (o?.length && o !== "None") {
      RolePreloadComponent_1.R6l.Start();
      o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable);
      if (this.IGn(o, e)) {
        this.tRr.DtBulletInfo = o;
      }
      RolePreloadComponent_1.R6l.Stop();
      RolePreloadComponent_1.w6l.Start();
      for (const r of this.T8_) {
        var t = this.fGn?.BulletDataTableMap.Get(r)?.ToAssetPathName();
        if (t && t.length > 0 && t !== "None" && (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable), this.IGn(t, e))) {
          this.tRr.DtBulletInfoExtraList ||= [];
          this.tRr.DtBulletInfoExtraList.push(t);
        }
      }
      RolePreloadComponent_1.w6l.Stop();
    }
  }
  IGn(e, o = true) {
    var t = this.XJr;
    if (e?.IsValid()) {
      return !!e && (o && (RolePreloadComponent_1.P6l.Start(), o = new Array(), DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, o), RolePreloadComponent_1.P6l.Stop(), o.forEach(o => {
        let e = undefined;
        try {
          e = BigInt(o);
        } catch (e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Editor", 4, "子弹ID不合法", ["子弹Id", o]);
          }
          return;
        }
        this.s31(e);
      })), true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 4, "[预加载] 加载角色子弹表失败。", ["Path", t.BlueprintClassPath], ["子弹表Path", this.fGn?.BulletDataTable?.ToAssetPathName()]);
      }
      return false;
    }
  }
  vGn() {
    RolePreloadComponent_1.cH1.Start();
    const e = this.fGn?.HitEffectTable.ToAssetPathName();
    var o;
    var t;
    if (e && e.length > 0 && e !== "None") {
      o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable);
      this.tRr.DtHitEffect = o;
    }
    for (const r of this.T8_) {
      const e = this.fGn?.HitEffectTableMap.Get(r)?.ToAssetPathName();
      if (e && e.length > 0 && e !== "None") {
        t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable);
        this.tRr.DtHitEffectExtraList ||= [];
        this.tRr.DtHitEffectExtraList.push(t);
      }
    }
    RolePreloadComponent_1.cH1.Stop();
  }
  kk_(e) {
    var o = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(this.XJr, e, false);
    if (o) {
      this.PreloadSkillIds.add(e);
    }
    return o;
  }
  s31(e) {
    return PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(this.XJr, e);
  }
  IsEnableInitMorph() {
    var e = this.fGn?.MorphModelInfoMap;
    return !!e && e.Num() !== 0;
  }
  async InitMorph() {
    if (this.XJr) {
      var o = this.fGn?.MorphModelInfoMap;
      if (o) {
        var t = [];
        var r = this.XJr;
        const P = this.u1t?.GetCreatureDataId() ?? 0;
        var i = this.Entity.GetComponent(279);
        for (let e = 0; e < o.Num(); e++) {
          var l = o.GetKey(e);
          var a = o.Get(l);
          if (a && a.ModelId !== 0) {
            var n = ModelUtil_1.ModelUtil.GetModelConfig(a.ModelId);
            if (n && n.特效替换表 && n.蒙太奇替换表) {
              if ((_ = n.特效替换表.ToAssetPathName()).length > 0) {
                r?.MainAsset.SetupReplaceEffect(_);
                this.Entity.GetComponent(3).SetReplaceEffect(r?.MainAsset.ReplaceEffectMap);
              }
              if ((_ = n.蒙太奇替换表.ToAssetPathName()).length > 0) {
                r?.MainAsset.SetupReplaceMontage(_);
                this.Entity.GetComponent(3).SetReplaceMontage(r?.MainAsset.ReplaceMontageMap);
              }
            } else if (!n) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Preload", 67, "[预加载] 多形态预加载 ModelConfig为空", ["CreatureDataId", P], ["EntityId", this.Entity?.Id], ["ModelId", a.ModelId]);
              }
            }
            RolePreloadComponent_1.yRc.Start();
            var s = new PreloadDefine_1.AssetElement(r);
            var _ = PreloadControllerNew_1.PreloadControllerNew.CollectAssetByModelId(r, a.ModelId, s);
            RolePreloadComponent_1.yRc.Stop();
            if (_) {
              t.push(s);
              var h = s.NeedLoadAssets.length;
              for (let e = 0; e < h; e++) {
                if (s.NeedLoadAssetTypes[e] === 1) {
                  i?.AddMorphMontagePath(s.NeedLoadAssets[e], l);
                }
              }
              this.Entity.GetComponent(25)?.SetHasMorphMontage(true);
            }
          }
        }
        RolePreloadComponent_1.SRc.Start();
        var e = [];
        const C = ModelManager_1.ModelManager.PreloadModelNew;
        for (const m of t) {
          m.AddObjectCallback = (e, o) => {
            C.HoldPreloadObject.AddEntityAsset(P, e);
          };
          var d = new GameModePromise_1.GameModePromise();
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(m, this.XJr.LoadPriority, false, d);
          e.push(d);
        }
        await Promise.all(e);
        RolePreloadComponent_1.SRc.Stop();
      }
    }
  }
  ZN1() {
    for (const e of this.tRr.GetAllBulletData()) {
      this.JN1.push(e);
    }
  }
  e31() {
    for (const e of this.tRr.GetAllSkillData(5)) {
      this.zN1.push(e);
    }
  }
};
RolePreloadComponent.t31 = new TimeLimit_1.TimeLimit(TIME_LIMIT_MICRO_SECOND);
RolePreloadComponent.uH1 = Stats_1.Stat.Create("Preload.InitPreload");
RolePreloadComponent.r31 = Stats_1.Stat.Create("Preload.PreloadSkill");
RolePreloadComponent.R6l = Stats_1.Stat.Create("Preload.PreloadBullet1");
RolePreloadComponent.w6l = Stats_1.Stat.Create("Preload.PreloadBullet2");
RolePreloadComponent.P6l = Stats_1.Stat.Create("Preload.PreloadBulletGetDataTableAllRow");
RolePreloadComponent.n31 = Stats_1.Stat.Create("Preload.LoadBulletAsync");
RolePreloadComponent.o31 = Stats_1.Stat.Create("Preload.LoadSkillAsync");
RolePreloadComponent.cH1 = Stats_1.Stat.Create("Preload.PreloadHitEffect");
RolePreloadComponent.yRc = Stats_1.Stat.Create("Preload.PreloadMorphCollectAssetByModelId");
RolePreloadComponent.SRc = Stats_1.Stat.Create("Preload.PreloadMorphLoadAssetAsync");
RolePreloadComponent = RolePreloadComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(219)], RolePreloadComponent);
exports.RolePreloadComponent = RolePreloadComponent; //# sourceMappingURL=RolePreloadComponent.js.map