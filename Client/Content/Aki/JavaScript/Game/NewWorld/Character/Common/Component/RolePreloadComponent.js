"use strict";
var RolePreloadComponent_1, __decorate = this && this.__decorate || function(e, o, t, r) {
  var i, l = arguments.length,
    a = l < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, t) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, o, t, r);
  else
    for (var n = e.length - 1; 0 <= n; n--)(i = e[n]) && (a = (l < 3 ? i(a) : 3 < l ? i(o, t, a) : i(o, t)) || a);
  return 3 < l && a && Object.defineProperty(o, t, a), a
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RolePreloadComponent = void 0;
const cpp_1 = require("cpp"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  MonsterBattleConfById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimeLimit_1 = require("../../../../../Core/Performance/TimeLimit"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../../../Preload/PreloadDefine"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew"),
  GameModePromise_1 = require("../../../../World/Define/GameModePromise"),
  characterCommonSkillSet = new Set([100001, 100002, 100003, 100004, 100005, 100006, 100007, 210001, 200001, 200002, 210330]),
  TIME_LIMIT_MICRO_SECOND = 5e3;
let RolePreloadComponent = RolePreloadComponent_1 = class RolePreloadComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.u1t = void 0, this.tRr = void 0, this.XJr = void 0, this.$Jr = !1, this.fGn = void 0, this.T8_ = [], this.yN1 = [], this.SN1 = [], this.l61 = !1, this.PreloadSkillIds = new Set, this.YJr = (e, o) => {
      o && !this.$Jr && this.tRr && !this.l61 && this.u1t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && (CombatLog_1.CombatLog.Warn("Skill", this.Entity, "开始加载技能和子弹"), this.$Jr = !0, this.MN1(), this.EN1())
    }
  }
  OnInitData() {
    return PreloadDefine_1.PreloadSetting.UseNewPreload && (this.tRr = this.Entity.GetComponent(39), this.u1t = this.Entity.GetComponent(0), this.Entity.GetComponent(205).ListenForTagAddOrRemove(1996802261, this.YJr)), !0
  }
  OnTick(e) {
    for (; 0 < this.yN1.length && !RolePreloadComponent_1.IN1.IsTimeLimitExceeded();) {
      var o = cpp_1.KuroTime.GetMicroseconds64(),
        t = this.yN1.shift(),
        t = (t && this.LoadSkillAsync(t), cpp_1.KuroTime.GetMicroseconds64());
      RolePreloadComponent_1.IN1.AddCost(t - o)
    }
    for (; 0 < this.SN1.length && !RolePreloadComponent_1.IN1.IsTimeLimitExceeded();) {
      var r = cpp_1.KuroTime.GetMicroseconds64(),
        i = this.SN1.shift(),
        i = (i && this.TN1(i), cpp_1.KuroTime.GetMicroseconds64());
      RolePreloadComponent_1.IN1.AddCost(i - r)
    }(0 < this.yN1.length || 0 < this.SN1.length) && RolePreloadComponent_1.IN1.ResetCost()
  }
  InitPreload(e) {
    this.XJr = e, this.tRr && (RolePreloadComponent_1.L91.Start(), this._61(), this.SGn(), this.EGn(), this.zJr(), this.ZJr(), RolePreloadComponent_1.L91.Stop())
  }
  GetFightInfo() {
    return this.fGn
  }
  _61() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    33 !== e?.InstSubType && 36 !== e?.InstSubType || (this.l61 = !0)
  }
  SGn() {
    var e = this.XJr?.BlueprintClassPath;
    e && (this.fGn = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e))
  }
  EGn() {
    this.T8_.length = 0;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    if (e && 0 < e.FightInfoDtType.length)
      for (const o of e.FightInfoDtType) this.T8_.push(o);
    else if (this.u1t.IsAutoRole()) this.T8_.push(2);
    else {
      if (this.u1t.IsMonster()) {
        e = this.u1t.GetMonsterComponent()?.FightConfigId;
        if (e) {
          e = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(e);
          if (e && 0 < e.RoleMappingId) return void this.T8_.push(2)
        }
      }(ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelikeOnly() || ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink()) && this.T8_.push(1)
    }
  }
  zJr() {
    RolePreloadComponent_1.bN1.Start();
    var e, o = this.XJr,
      t = this.fGn?.SkillDataTable.ToAssetPathName();
    t?.length && "None" !== t && ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid() || CombatLog_1.CombatLog.Warn("Skill", this.Entity, "SkillComponent中找不到技能表", ["ActorPath", o.BlueprintClassPath], ["技能表Path", t]), this.tRr.DtSkillInfo = e);
    for (const l of this.T8_) {
      var r, i = this.fGn?.SkillDataTableMap.Get(l)?.ToAssetPathName();
      i && 0 < i.length && "None" !== i && ((r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(i, UE.DataTable))?.IsValid() || CombatLog_1.CombatLog.Warn("Skill", this.Entity, "SkillComponent中找不到玩法额外技能表", ["加载类型", l], ["ActorPath", o.BlueprintClassPath], ["额外技能表Path", i]), r) && (this.tRr.DtSkillInfoExtraList || (this.tRr.DtSkillInfoExtraList = []), this.tRr.DtSkillInfoExtraList.push(r))
    }
    t = this.u1t.GetEntityType();
    t === Protocol_1.Aki.Protocol.kks.Proto_Player ? this.tzr() : t === Protocol_1.Aki.Protocol.kks.Proto_Vision ? this.izr() : this.u1t?.SummonType !== Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault ? this.tzr() : t === Protocol_1.Aki.Protocol.kks.Proto_Monster ? this.ozr() : t === Protocol_1.Aki.Protocol.kks.HI_ && this.qHl(), RolePreloadComponent_1.bN1.Stop()
  }
  tzr() {
    var e = new Array;
    DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
    for (const t of e) this.kk_(Number(t));
    this.MGn();
    for (const r of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
      var o = Number(r);
      characterCommonSkillSet.has(o) && !this.PreloadSkillIds.has(o) && this.kk_(o)
    }
  }
  async LoadSkillAsync(o, e) {
    let t = this.XJr.FightAssetManager.SkillAssetManager.GetSkill(o);
    var r;
    return t ? t.Loading() ? (r = new CustomPromise_1.CustomPromise, t.AddPromise(r), r.Promise) : 3 : (RolePreloadComponent_1.RN1.Start(), (t = this.kk_(o)) ? (r = new CustomPromise_1.CustomPromise, PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(t, e || this.XJr.LoadPriority, !1, r, e => {
      e ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 4, "技能加载完毕", ["SkillId", o]) : Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "技能加载失败", ["SkillId", o])
    }), RolePreloadComponent_1.RN1.Stop(), r.Promise) : (RolePreloadComponent_1.RN1.Stop(), 2))
  }
  TN1(e) {
    this.XJr.FightAssetManager.BulletAssetManager.GetBullet(e) || (RolePreloadComponent_1.LN1.Start(), (e = this.wN1(e)) && PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(e, this.XJr.LoadPriority, !1), RolePreloadComponent_1.LN1.Stop())
  }
  FlushSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.XJr, e)
  }
  RemoveSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.XJr, e)
  }
  ozr() {
    if (this.tRr.DtSkillInfo) {
      var e = new Array;
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(this.tRr.DtSkillInfo, e);
      for (const r of e)
        if (void 0 !== r[0] && void 0 !== r[1]) {
          var o = Number(r[0]),
            t = r[1];
          if (this.l61) this.kk_(o);
          else if (t && 8 === t.SkillGenre) this.kk_(o);
          else
            for (let e = 0; e < t.SkillTag.Num(); e++) 2057104696 === t.SkillTag.Get(e).TagId && (this.kk_(o), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Preload", 4, "预加载怪物出场技能", ["SkillId", o])
        }
    }
  }
  qHl() {
    var e = new Array;
    DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
    for (const o of e) this.kk_(Number(o));
    this.MGn()
  }
  izr() {
    var e = new Array;
    if (this.tRr.DtSkillInfo) {
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.tRr.DtSkillInfo, e);
      for (const o of e) this.kk_(Number(o))
    }
    for (const t of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) this.kk_(Number(t));
    this.MGn()
  }
  MGn() {
    var e = this.tRr.DtSkillInfoExtraList;
    if (e && !(e.length <= 0))
      for (const r of e) {
        var o = new Array;
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(r, o);
        for (const i of o) {
          var t = Number(i);
          this.kk_(t)
        }
      }
  }
  ZJr() {
    var e = this.u1t.GetEntityType();
    e === Protocol_1.Aki.Protocol.kks.Proto_Player || e === Protocol_1.Aki.Protocol.kks.Proto_Vision || e === Protocol_1.Aki.Protocol.kks.HI_ ? this.JJr(!0) : e === Protocol_1.Aki.Protocol.kks.Proto_Monster ? this.JJr(this.l61) : this.JJr(!1), this.vGn()
  }
  JJr(e) {
    var o = this.fGn?.BulletDataTable?.ToAssetPathName();
    if (o?.length && "None" !== o) {
      RolePreloadComponent_1.R6l.Start();
      o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable);
      this.IGn(o, e) && (this.tRr.DtBulletInfo = o), RolePreloadComponent_1.R6l.Stop(), RolePreloadComponent_1.w6l.Start();
      for (const r of this.T8_) {
        var t = this.fGn?.BulletDataTableMap.Get(r)?.ToAssetPathName();
        t && 0 < t.length && "None" !== t && (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable), this.IGn(t, e)) && (this.tRr.DtBulletInfoExtraList || (this.tRr.DtBulletInfoExtraList = []), this.tRr.DtBulletInfoExtraList.push(t))
      }
      RolePreloadComponent_1.w6l.Stop()
    }
  }
  IGn(e, o = !0) {
    var t = this.XJr;
    return e?.IsValid() ? !!e && (o && (RolePreloadComponent_1.P6l.Start(), o = new Array, DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, o), RolePreloadComponent_1.P6l.Stop(), o.forEach(o => {
      let e = void 0;
      try {
        e = BigInt(o)
      } catch (e) {
        return void(Log_1.Log.CheckError() && Log_1.Log.Error("Editor", 4, "子弹ID不合法", ["子弹Id", o]))
      }
      this.wN1(e)
    })), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 4, "[预加载] 加载角色子弹表失败。", ["Path", t.BlueprintClassPath], ["子弹表Path", this.fGn?.BulletDataTable?.ToAssetPathName()]), !1)
  }
  vGn() {
    RolePreloadComponent_1.w91.Start();
    const e = this.fGn?.HitEffectTable.ToAssetPathName();
    var o, t;
    e && 0 < e.length && "None" !== e && (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable), this.tRr.DtHitEffect = o);
    for (const r of this.T8_) {
      const e = this.fGn?.HitEffectTableMap.Get(r)?.ToAssetPathName();
      e && 0 < e.length && "None" !== e && (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable), this.tRr.DtHitEffectExtraList || (this.tRr.DtHitEffectExtraList = []), this.tRr.DtHitEffectExtraList.push(t))
    }
    RolePreloadComponent_1.w91.Stop()
  }
  kk_(e) {
    var o = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(this.XJr, e, !1);
    return o && this.PreloadSkillIds.add(e), o
  }
  wN1(e) {
    return PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(this.XJr, e)
  }
  IsEnableInitMorph() {
    var e = this.fGn?.MorphModelInfoMap;
    return !(!e || 0 === e.Num())
  }
  async InitMorph() {
    if (this.XJr) {
      var o = this.fGn?.MorphModelInfoMap;
      if (o) {
        var t = [],
          r = this.XJr;
        const P = this.u1t?.GetCreatureDataId() ?? 0;
        var i = this.Entity.GetComponent(279);
        for (let e = 0; e < o.Num(); e++) {
          var l = o.GetKey(e),
            a = o.Get(l);
          if (a && 0 !== a.ModelId) {
            var n = ModelUtil_1.ModelUtil.GetModelConfig(a.ModelId),
              s = (n && n.特效替换表 && n.蒙太奇替换表 ? (0 < (_ = n.特效替换表.ToAssetPathName()).length && (r?.MainAsset.SetupReplaceEffect(_), this.Entity.GetComponent(3).SetReplaceEffect(r?.MainAsset.ReplaceEffectMap)), 0 < (_ = n.蒙太奇替换表.ToAssetPathName()).length && (r?.MainAsset.SetupReplaceMontage(_), this.Entity.GetComponent(3).SetReplaceMontage(r?.MainAsset.ReplaceMontageMap))) : n || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 67, "[预加载] 多形态预加载 ModelConfig为空", ["CreatureDataId", P], ["EntityId", this.Entity?.Id], ["ModelId", a.ModelId]), RolePreloadComponent_1.yRc.Start(), new PreloadDefine_1.AssetElement(r)),
              _ = PreloadControllerNew_1.PreloadControllerNew.CollectAssetByModelId(r, a.ModelId, s);
            if (RolePreloadComponent_1.yRc.Stop(), _) {
              t.push(s);
              var h = s.NeedLoadAssets.length;
              for (let e = 0; e < h; e++) 1 === s.NeedLoadAssetTypes[e] && i?.AddMorphMontagePath(s.NeedLoadAssets[e], l);
              this.Entity.GetComponent(25)?.SetHasMorphMontage(!0)
            }
          }
        }
        RolePreloadComponent_1.SRc.Start();
        var e = [];
        const C = ModelManager_1.ModelManager.PreloadModelNew;
        for (const m of t) {
          m.AddObjectCallback = (e, o) => {
            C.HoldPreloadObject.AddEntityAsset(P, e)
          };
          var d = new GameModePromise_1.GameModePromise;
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(m, this.XJr.LoadPriority, !1, d), e.push(d)
        }
        await Promise.all(e), RolePreloadComponent_1.SRc.Stop()
      }
    }
  }
  MN1() {
    for (const e of this.tRr.GetAllBulletData()) this.SN1.push(e)
  }
  EN1() {
    for (const e of this.tRr.GetAllSkillData(5)) this.yN1.push(e)
  }
};
RolePreloadComponent.IN1 = new TimeLimit_1.TimeLimit(TIME_LIMIT_MICRO_SECOND), RolePreloadComponent.L91 = Stats_1.Stat.Create("Preload.InitPreload"), RolePreloadComponent.bN1 = Stats_1.Stat.Create("Preload.PreloadSkill"), RolePreloadComponent.R6l = Stats_1.Stat.Create("Preload.PreloadBullet1"), RolePreloadComponent.w6l = Stats_1.Stat.Create("Preload.PreloadBullet2"), RolePreloadComponent.P6l = Stats_1.Stat.Create("Preload.PreloadBulletGetDataTableAllRow"), RolePreloadComponent.LN1 = Stats_1.Stat.Create("Preload.LoadBulletAsync"), RolePreloadComponent.RN1 = Stats_1.Stat.Create("Preload.LoadSkillAsync"), RolePreloadComponent.w91 = Stats_1.Stat.Create("Preload.PreloadHitEffect"), RolePreloadComponent.yRc = Stats_1.Stat.Create("Preload.PreloadMorphCollectAssetByModelId"), RolePreloadComponent.SRc = Stats_1.Stat.Create("Preload.PreloadMorphLoadAssetAsync"), RolePreloadComponent = RolePreloadComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(219)], RolePreloadComponent), exports.RolePreloadComponent = RolePreloadComponent;
//# sourceMappingURL=RolePreloadComponent.js.map