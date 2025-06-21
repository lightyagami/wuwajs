"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleUiMergeHeadStateData = exports.MergeHeadStateMonsterInfo = exports.MergeHeadStateInfo = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  EMPTY_STR = "";
class MergeHeadStateInfo {
  constructor() {
    this.Id = 0, this.TreeId = void 0, this.NodeId = 0, this.MonsterGroupName = void 0, this.MonsterMergedHpBarSettings = void 0, this.IsVisible = !1, this.TotalHp = 0, this.TotalHpMax = 0, this.MonsterInfos = new Map
  }
}
exports.MergeHeadStateInfo = MergeHeadStateInfo;
class MergeHeadStateMonsterInfo {
  constructor() {
    this.Id = 0, this.PbDataId = 0, this.EntityHandle = void 0, this.IsDead = !1, this.BaseLife = 0, this.AttributeComponent = void 0, this.FightTagListenTask = void 0, this.HasFightTag = !1, this.Hp = 0, this.HpMax = 0, this.aXe = (t, e) => {
      this.HasFightTag !== e && (this.HasFightTag = e, ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterFightTagChange(this.Id, e))
    }, this.hXe = (t, e, i) => {
      var s = this.Hp;
      this.Hp = e, this.HpMax <= 0 || (e = (this.Hp - s) / this.HpMax * this.BaseLife, ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(this.Id, e))
    }, this.lXe = (t, e, i) => {
      var s = this.HpMax;
      this.HpMax = e;
      let h = 0,
        r = (0 < s && (h = this.Hp / s), 0);
      e = ((r = 0 < this.HpMax ? this.Hp / this.HpMax : r) - h) * this.BaseLife;
      ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(this.Id, e)
    }
  }
  AddListener() {
    (this.FightTagListenTask || this.AttributeComponent) && (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]重复添加进战监听", ["entityId", this.EntityHandle.Id]), this.RemoveListener());
    var t = this.EntityHandle.Entity.GetComponent(205);
    if (!t) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]监听的实体不存在tagComponent", ["entityId", this.EntityHandle.Id]), !1;
    if (this.AttributeComponent = this.EntityHandle.Entity.GetComponent(173), !this.AttributeComponent) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]监听的实体不存在AttributeComponent", ["entityId", this.EntityHandle.Id]), !1;
    this.FightTagListenTask = t.ListenForTagAddOrRemove(1996802261, this.aXe), this.HasFightTag = t.HasTag(1996802261);
    t = this.AttributeComponent;
    return t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.hXe), t.AddListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.lXe), !0
  }
  RemoveListener() {
    var t;
    this.FightTagListenTask && (this.FightTagListenTask.EndTask(), this.FightTagListenTask = void 0), this.AttributeComponent && ((t = this.AttributeComponent).RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.hXe), t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.lXe), this.AttributeComponent = void 0)
  }
}
exports.MergeHeadStateMonsterInfo = MergeHeadStateMonsterInfo;
class BattleUiMergeHeadStateData {
  constructor() {
    this._Xe = 0, this.InfoMap = new Map, this.ListenMonsterAddMap = new Map, this.ListenMonsterRemoveMap = new Map
  }
  Init() {}
  OnLeaveLevel() {
    if (!(this.ListenMonsterRemoveMap.size <= 0)) {
      for (const e of this.ListenMonsterRemoveMap.values()) {
        e.EntityHandle = void 0, this.uXe(e);
        var t = this.InfoMap.get(e.Id);
        if (!t) return void(Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]移除实体时InfoId错误", ["id", e.Id]));
        e.HasFightTag && (e.HasFightTag = !1, t.IsVisible = !1)
      }
      this.ListenMonsterRemoveMap.clear()
    }
  }
  Clear() {
    for (const t of this.InfoMap.values()) this.cXe(t);
    this.InfoMap.clear(), this.ListenMonsterAddMap.clear(), this.ListenMonsterRemoveMap.clear()
  }
  UpdateProgress(t, e, i, s, h) {
    if (i) {
      for (const r of this.InfoMap.values())
        if (r.TreeId === t && r.NodeId === e) return void this.mXe(r, i);
      this.dXe(t, e, i, s, h)
    }
  }
  RemoveTree(t) {
    for (const e of this.InfoMap.values()) e.TreeId === t && this.cXe(e)
  }
  RemoveNode(t, e) {
    for (const i of this.InfoMap.values())
      if (i.TreeId === t && i.NodeId === e) return void this.cXe(i)
  }
  OnAddEntity(s) {
    if (!(this.ListenMonsterAddMap.size <= 0)) {
      var h = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(s),
        r = this.ListenMonsterAddMap.get(h);
      if (r) {
        this.ListenMonsterAddMap.delete(h), r.EntityHandle = s, this.CXe(r);
        h = this.InfoMap.get(r.Id);
        if (h) {
          let i = !1;
          if (r.AttributeComponent) {
            var s = r.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life),
              o = r.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
            if (s !== r.Hp || o !== r.HpMax) {
              let t = 0,
                e = (0 < r.HpMax && (t = r.Hp / r.HpMax), 0);
              0 < o && (e = s / o), h.TotalHp += (e - t) * r.BaseLife, r.Hp = s, r.HpMax = o, i = !0
            }
          }
          h.IsVisible ? i && this.gXe(h) : r.HasFightTag && (h.IsVisible = !0, this.fXe(h))
        } else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]添加实体时InfoId错误", ["id", r.Id])
      }
    }
  }
  OnRemoveEntity(t) {
    var e;
    this.ListenMonsterRemoveMap.size <= 0 || (e = this.ListenMonsterRemoveMap.get(t.Id)) && (this.ListenMonsterRemoveMap.delete(t.Id), e.EntityHandle = void 0, this.uXe(e), (t = this.InfoMap.get(e.Id)) ? e.HasFightTag && (e.HasFightTag = !1, this.UpdateVisible(t, !0)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]移除实体时InfoId错误", ["id", e.Id]))
  }
  dXe(t, e, i, s, h) {
    var r = new MergeHeadStateInfo;
    this._Xe++, r.Id = this._Xe, r.TreeId = t, r.NodeId = e, r.MonsterGroupName = s ?? EMPTY_STR, r.MonsterMergedHpBarSettings = h;
    for (const a of i.DEs)
      for (const n of a.bEs) {
        var o = new MergeHeadStateMonsterInfo;
        o.Id = r.Id, o.PbDataId = n.A5n, o.IsDead = 2 === n.Y4n, o.BaseLife = MathUtils_1.MathUtils.LongToNumber(n.REs), o.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.PbDataId), o.EntityHandle?.Valid ? (this.CXe(o), o.AttributeComponent && (o.Hp = o.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life), o.HpMax = o.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n))) : (o.IsDead ? o.Hp = 0 : (this.ListenMonsterAddMap.set(o.PbDataId, o), o.Hp = o.BaseLife), o.HpMax = o.BaseLife), r.MonsterInfos.set(o.PbDataId, o)
      }
    for (const _ of r.MonsterInfos.values()) 0 < _.HpMax && (r.TotalHp += _.Hp / _.HpMax * _.BaseLife), r.TotalHpMax += _.BaseLife;
    this.UpdateVisible(r, !1), this.InfoMap.set(r.Id, r), r.IsVisible && this.fXe(r)
  }
  mXe(t, e) {
    for (const s of e.DEs)
      for (const h of s.bEs) {
        var i = t.MonsterInfos.get(h.A5n);
        i ? i.IsDead || (i.IsDead = 2 === h.Y4n, i.IsDead && (this.uXe(i), 0 === i.Hp && i.HpMax === i.BaseLife || (0 < i.HpMax && (t.TotalHp -= i.Hp / i.HpMax * i.BaseLife), i.Hp = 0, i.HpMax = i.BaseLife, this.gXe(t)))) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新怪物数据时与缓存对不上")
      }
  }
  cXe(t) {
    for (const e of t.MonsterInfos.values()) e.RemoveListener(), e.EntityHandle ? this.ListenMonsterRemoveMap.delete(e.EntityHandle.Id) : this.ListenMonsterAddMap.delete(e.PbDataId);
    t.IsVisible && (t.IsVisible = !1, this.fXe(t)), this.InfoMap.delete(t.Id)
  }
  CXe(t) {
    t.AddListener() && this.ListenMonsterRemoveMap.set(t.EntityHandle.Id, t)
  }
  uXe(t) {
    t.RemoveListener(), t.IsDead || this.ListenMonsterAddMap.set(t.PbDataId, t)
  }
  OnMonsterFightTagChange(t, e) {
    var i = this.InfoMap.get(t);
    i ? i.IsVisible !== e && (e ? (i.IsVisible = !0, this.fXe(i)) : this.UpdateVisible(i, !0)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新进战时InfoId错误", ["id", t])
  }
  UpdateVisible(t, e) {
    let i = !1;
    for (const s of t.MonsterInfos.values())
      if (s.HasFightTag) {
        i = !0;
        break
      } t.IsVisible !== i && (t.IsVisible = i, e) && this.fXe(t)
  }
  fXe(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged, t)
  }
  OnMonsterHealthChange(t, e) {
    var i = this.InfoMap.get(t);
    i ? (i.TotalHp += e, this.gXe(i)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新血量时InfoId错误", ["id", t])
  }
  gXe(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged, t)
  }
}
exports.BattleUiMergeHeadStateData = BattleUiMergeHeadStateData;
//# sourceMappingURL=BattleUiMergeHeadStateData.js.map