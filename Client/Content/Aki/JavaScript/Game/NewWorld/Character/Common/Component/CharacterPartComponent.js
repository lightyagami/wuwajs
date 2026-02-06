"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var a;
  var h = arguments.length;
  var r = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (a = t[o]) {
        r = (h < 3 ? a(r) : h > 3 ? a(i, e, r) : a(i, e)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPartComponent = exports.CharacterPart = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GlobalData_1 = require("../../../../GlobalData");
const CombatLog_1 = require("../../../../Utils/CombatLog");
class CharacterPart {
  constructor(t, i, e) {
    this.BaseEntity = undefined;
    this.ActorComp = undefined;
    this.TagComponent = undefined;
    this.AttributeComp = undefined;
    this.Index = 0;
    this.PartTag = undefined;
    this.ActiveTag = undefined;
    this.BoneName = undefined;
    this.SeparateDamage = false;
    this.IsWeakness = false;
    this.WeaknessTypeSet = undefined;
    this.WeaknessAngle = 0;
    this.InheritLife = false;
    this.LifeMax = 0;
    this.Life = 0;
    this.Active = false;
    this.PartSocketName = undefined;
    this.IsPartStateVisible = false;
    this.IsShield = false;
    this.IsTransferDamage = false;
    this.BlockAngle = 0;
    this.AttributeBuffList = undefined;
    this.ScanEffect = "";
    this.ScanEffectSocketName = undefined;
    this.ScanMaterialEffect = undefined;
    this.CombinePartSocketName = undefined;
    this.IsWeaknessHit = false;
    this.HitBoneName = "";
    this.BaseEntity = t;
    this.ActorComp = t.GetComponent(3);
    this.TagComponent = t.GetComponent(217);
    this.AttributeComp = t.GetComponent(184);
    this.Index = i;
    this.PartTag = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e.部位标签.TagName);
    this.ActiveTag = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e.部位激活标签.TagName);
    this.IsWeakness = e.是否弱点;
    this.WeaknessAngle = e.弱点受击角度;
    this.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(e.部位名);
    this.SeparateDamage = e.是否独立承伤;
    this.InheritLife = e.继承生命值比例 > 0;
    this.WeaknessTypeSet = new Set();
    this.PartSocketName = e.部位状态条骨骼插槽;
    this.IsPartStateVisible = e.是否在目标创建时显示部位状态条;
    this.IsShield = e.是否盾牌;
    this.IsTransferDamage = e.是否传递伤害;
    this.BlockAngle = e.格挡判定角度;
    this.AttributeBuffList = [];
    this.ScanEffect = e.被扫描播放特效.AssetPathName?.toString();
    this.ScanEffectSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(e.扫描特效绑定骨骼名);
    this.ScanMaterialEffect = e.扫描材质特效;
    this.CombinePartSocketName = e.合体骨骼名;
    for (let t = 0; t < e.弱点攻击类型.Num(); t++) {
      this.WeaknessTypeSet.add(e.弱点攻击类型.Get(t));
    }
    for (let t = 0; t < e.属性快照Buff列表.Num(); t++) {
      this.AttributeBuffList.push(e.属性快照Buff列表.Get(t));
    }
    if (this.InheritLife) {
      this.LifeMax = this.AttributeComp.GetCurrentValue(EAttributeId.l5n) * e.继承生命值比例;
    } else {
      this.LifeMax = -1;
    }
    this.Life = this.LifeMax;
  }
  SetActive(t) {
    this.Active = t;
  }
  bYo(t) {
    if (this.Active !== t) {
      this.Active = t;
      if (this.Active) {
        this.TagComponent.AddTag(this.ActiveTag?.TagId ?? 0);
      } else {
        this.TagComponent.RemoveTag(this.ActiveTag?.TagId);
      }
    }
  }
  UpdatePartInfo(t, i = true) {
    CombatLog_1.CombatLog.Info("Part", this.BaseEntity, "UpdatePartInfo", ["TagName", this.PartTag.TagName], ["Activated", t._5n], ["LifeValue", t.eWn]);
    this.bYo(t._5n);
    this.LifeMax = t.l5n;
    this.HandleChangeLife(t.eWn, i);
  }
  OnDamage(t, i, e, s = true) {
    let a = false;
    var h = this.ActorComp.Actor;
    var r = this.RemainedLifeRate();
    if (s && (this.Life -= t, s = this.RemainedLifeRate(), GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(h, this.PartTag, r, s), EventSystem_1.EventSystem.EmitWithTarget(this.BaseEntity, EventDefine_1.EEventName.CharPartDamage, t, this), r > 0) && s <= 0) {
      a = true;
    }
    if (i) {
      t = e.GetComponent(3).Actor;
      GlobalData_1.GlobalData.BpEventManager.角色部位弱点打击时.Broadcast(h, this.PartTag, t);
    }
    return a;
  }
  HandleChangeLife(t, i = true) {
    var e;
    var s = this.Life - t;
    if (s != 0 && (e = this.RemainedLifeRate(), this.Life = t, i)) {
      if (e !== (t = this.RemainedLifeRate())) {
        i = this.ActorComp.Actor;
        GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(i, this.PartTag, e, t);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.BaseEntity, EventDefine_1.EEventName.CharPartDamage, s, this);
    }
  }
  RemainedLife() {
    if (this.InheritLife) {
      if (this.Life >= 0) {
        return this.Life;
      } else {
        return 0;
      }
    } else {
      return -1;
    }
  }
  RemainedLifeRate() {
    if (this.InheritLife) {
      return this.RemainedLife() / this.LifeMax;
    } else {
      return -1;
    }
  }
  ResetLife() {}
}
exports.CharacterPart = CharacterPart;
let CharacterPartComponent = class CharacterPartComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.BaseChar = undefined;
    this.ActorComp = undefined;
    this.TagComponent = undefined;
    this.DtCharacterPart = undefined;
    this.Parts = undefined;
    this.PartMapByBone = undefined;
    this.PartMapByTag = undefined;
    this.WeaknessByBone = undefined;
    this.GroupMapByBone = undefined;
    this.PartMapByCombineBone = undefined;
    this.njr = undefined;
    this.sjr = undefined;
    this.ajr = false;
  }
  get IsMultiPart() {
    return this.ajr;
  }
  OnInitData() {
    var t = this.Entity.GetComponent(0);
    this.sjr = t.ComponentDataMap.get("_ys")?._ys;
    this.Parts = [];
    this.PartMapByBone = new Map();
    this.PartMapByTag = new Map();
    this.GroupMapByBone = new Map();
    this.WeaknessByBone = new Map();
    this.njr = [];
    return true;
  }
  OnInit() {
    this.TagComponent = this.Entity.GetComponent(217);
    if (this.Entity.GetComponent(3).Actor?.DtCharacterPart) {
      this.ajr = true;
    }
    return true;
  }
  OnActivate() {
    if (this.ajr) {
      this.ActorComp = this.Entity.GetComponent(3);
      this.BaseChar = this.ActorComp.Actor;
      this.DtCharacterPart = this.BaseChar.DtCharacterPart;
      var i = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(this.DtCharacterPart);
      var e = this.sjr;
      for (let t = 0; t < i.length; t++) {
        var s;
        var a = i[t];
        var h = new CharacterPart(this.Entity, t, a);
        this.Parts.push(h);
        this.PartMapByBone.set(a.部位名, h);
        var r = a.骨骼名.Num();
        var o = h.IsWeakness;
        for (let t = 0; t < r; t++) {
          var n = a.骨骼名.Get(t);
          this.GroupMapByBone.set(n, a.部位名);
          if (o) {
            this.WeaknessByBone.set(n, h);
          }
        }
        this.TagComponent.RemoveTag(a.部位标签?.TagId);
        if (this.PartMapByTag.has(a.部位标签.TagName)) {
          CombatLog_1.CombatLog.Error("Part", this.Entity, "部位标签重复注册", ["v", a.部位标签.TagName]);
        }
        this.PartMapByTag.set(a.部位标签.TagName, h);
        this.njr.push(this.hjr(h, a.部位激活标签));
        if (!FNameUtil_1.FNameUtil.IsNothing(a.合体骨骼名)) {
          this.PartMapByCombineBone ||= new Map();
          this.PartMapByCombineBone.set(a.合体骨骼名.toString(), h);
        }
        if (e) {
          if (s = e.PTs[t]) {
            h.UpdatePartInfo(s);
          }
        } else {
          if (a.是否出生激活) {
            if (this.TagComponent.HasTag(a.部位激活标签.TagId) && Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 20, "部位勾选了[是否出生激活]，但是在蓝图中提前加了标签，会导致标签添加时无法触发从无到有事件，引起功能失效", ["角色", this.BaseChar.GetName()], ["部位", a.部位名]);
            }
            this.TagComponent.AddTag(a.部位激活标签?.TagId);
          }
          (s = Protocol_1.Aki.Protocol.lFs.create()).eWn = h.Life;
          s.l5n = h.LifeMax;
          s.jjn = h.Index;
          s._5n = a.是否出生激活;
          s.WWn = h.PartTag.TagId;
        }
      }
    }
    return true;
  }
  OnEnd() {
    if (this.ajr) {
      for (const t of this.njr) {
        t.EndTask();
      }
    }
    return true;
  }
  IsWeakness(t) {
    t = this.WeaknessByBone.get(t);
    return !!t && t.Active;
  }
  GetPart(t) {
    t = this.GroupMapByBone.get(t);
    return this.PartMapByBone.get(t);
  }
  GetPartByTag(t) {
    var i = this.PartMapByTag.get(t.TagName);
    if (!i) {
      CombatLog_1.CombatLog.Error("Part", this.Entity, "获取部位失败", ["TagName", t.TagName]);
    }
    return i;
  }
  GetPartByIndex(t) {
    if (!(t < 0) && !(t >= this.Parts.length)) {
      return this.Parts[t];
    }
    CombatLog_1.CombatLog.Error("Part", this.Entity, "获取部位失败", ["index", t]);
  }
  GetPartByCombineBoneName(t) {
    if (this.PartMapByCombineBone) {
      return this.PartMapByCombineBone.get(t);
    }
  }
  hjr(e, t) {
    return this.TagComponent.ListenForTagAddOrRemove(t?.TagId, (t, i) => {
      e.SetActive(i);
    });
  }
  static PartUpdateNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.F4n);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      var s = e.Entity.GetComponent(74);
      for (const a of i.xTs) {
        s.GetPartByIndex(a.jjn)?.UpdatePartInfo(a);
      }
    }
  }
  static PartComponentInitNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.F4n);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      CombatLog_1.CombatLog.Info("Part", t, "PartComponentInitNotify");
      var s = e.Entity.GetComponent(74);
      for (const a of i._ys.PTs) {
        s.GetPartByIndex(a.jjn)?.UpdatePartInfo(a);
      }
    }
  }
  GetDebugText() {
    let t = "";
    for (const i of this.Parts) {
      t += "\n\t\t" + i.Index + " " + i.PartTag?.TagName + " : " + i.Life + ", " + i.Active;
    }
    return t;
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("RFn", false)], CharacterPartComponent, "PartUpdateNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("xFn", false)], CharacterPartComponent, "PartComponentInitNotify", null);
CharacterPartComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(74)], CharacterPartComponent);
exports.CharacterPartComponent = CharacterPartComponent; //# sourceMappingURL=CharacterPartComponent.js.map