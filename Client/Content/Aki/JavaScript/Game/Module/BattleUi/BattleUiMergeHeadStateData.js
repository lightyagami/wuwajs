"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiMergeHeadStateData = exports.MergeHeadStateMonsterInfo = exports.MergeHeadStateInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const EMPTY_STR = "";
class MergeHeadStateInfo {
  constructor() {
    this.Id = 0;
    this.TreeId = undefined;
    this.NodeId = 0;
    this.MonsterGroupName = undefined;
    this.MonsterMergedHpBarSettings = undefined;
    this.IsVisible = false;
    this.TotalHp = 0;
    this.TotalHpMax = 0;
    this.MonsterInfos = new Map();
  }
}
exports.MergeHeadStateInfo = MergeHeadStateInfo;
class MergeHeadStateMonsterInfo {
  constructor() {
    this.Id = 0;
    this.PbDataId = 0;
    this.EntityHandle = undefined;
    this.IsDead = false;
    this.BaseLife = 0;
    this.AttributeComponent = undefined;
    this.FightTagListenTask = undefined;
    this.HasFightTag = false;
    this.Hp = 0;
    this.HpMax = 0;
    this.aXe = (t, e) => {
      if (this.HasFightTag !== e) {
        this.HasFightTag = e;
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterFightTagChange(this.Id, e);
      }
    };
    this.hXe = (t, e, i) => {
      var s = this.Hp;
      this.Hp = e;
      if (!(this.HpMax <= 0)) {
        e = (this.Hp - s) / this.HpMax * this.BaseLife;
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(this.Id, e);
      }
    };
    this.lXe = (t, e, i) => {
      var s = this.HpMax;
      this.HpMax = e;
      let h = 0;
      if (s > 0) {
        h = this.Hp / s;
      }
      let r = 0;
      e = ((r = this.HpMax > 0 ? this.Hp / this.HpMax : r) - h) * this.BaseLife;
      ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(this.Id, e);
    };
  }
  AddListener() {
    if (this.FightTagListenTask || this.AttributeComponent) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[合并怪物血条]重复添加进战监听", ["entityId", this.EntityHandle.Id]);
      }
      this.RemoveListener();
    }
    var t = this.EntityHandle.Entity.GetComponent(217);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[合并怪物血条]监听的实体不存在tagComponent", ["entityId", this.EntityHandle.Id]);
      }
      return false;
    }
    this.AttributeComponent = this.EntityHandle.Entity.GetComponent(184);
    if (!this.AttributeComponent) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[合并怪物血条]监听的实体不存在AttributeComponent", ["entityId", this.EntityHandle.Id]);
      }
      return false;
    }
    this.FightTagListenTask = t.ListenForTagAddOrRemove(1996802261, this.aXe);
    this.HasFightTag = t.HasTag(1996802261);
    t = this.AttributeComponent;
    t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.hXe);
    t.AddListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.lXe);
    return true;
  }
  RemoveListener() {
    var t;
    if (this.FightTagListenTask) {
      this.FightTagListenTask.EndTask();
      this.FightTagListenTask = undefined;
    }
    if (this.AttributeComponent) {
      (t = this.AttributeComponent).RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.hXe);
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.lXe);
      this.AttributeComponent = undefined;
    }
  }
}
exports.MergeHeadStateMonsterInfo = MergeHeadStateMonsterInfo;
class BattleUiMergeHeadStateData {
  constructor() {
    this._Xe = 0;
    this.InfoMap = new Map();
    this.ListenMonsterAddMap = new Map();
    this.ListenMonsterRemoveMap = new Map();
  }
  Init() {}
  OnLeaveLevel() {
    if (!(this.ListenMonsterRemoveMap.size <= 0)) {
      for (const e of this.ListenMonsterRemoveMap.values()) {
        e.EntityHandle = undefined;
        this.uXe(e);
        var t = this.InfoMap.get(e.Id);
        if (!t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "[合并怪物血条]移除实体时InfoId错误", ["id", e.Id]);
          }
          return;
        }
        if (e.HasFightTag) {
          e.HasFightTag = false;
          t.IsVisible = false;
        }
      }
      this.ListenMonsterRemoveMap.clear();
    }
  }
  Clear() {
    for (const t of this.InfoMap.values()) {
      this.cXe(t);
    }
    this.InfoMap.clear();
    this.ListenMonsterAddMap.clear();
    this.ListenMonsterRemoveMap.clear();
  }
  UpdateProgress(t, e, i, s, h) {
    if (i) {
      for (const r of this.InfoMap.values()) {
        if (r.TreeId === t && r.NodeId === e) {
          this.mXe(r, i);
          return;
        }
      }
      this.dXe(t, e, i, s, h);
    }
  }
  RemoveTree(t) {
    for (const e of this.InfoMap.values()) {
      if (e.TreeId === t) {
        this.cXe(e);
      }
    }
  }
  RemoveNode(t, e) {
    for (const i of this.InfoMap.values()) {
      if (i.TreeId === t && i.NodeId === e) {
        this.cXe(i);
        return;
      }
    }
  }
  OnAddEntity(s) {
    if (!(this.ListenMonsterAddMap.size <= 0)) {
      var h = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(s);
      var r = this.ListenMonsterAddMap.get(h);
      if (r) {
        this.ListenMonsterAddMap.delete(h);
        r.EntityHandle = s;
        this.CXe(r);
        h = this.InfoMap.get(r.Id);
        if (h) {
          let i = false;
          if (r.AttributeComponent) {
            var s = r.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
            var o = r.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
            if (s !== r.Hp || o !== r.HpMax) {
              let t = 0;
              if (r.HpMax > 0) {
                t = r.Hp / r.HpMax;
              }
              let e = 0;
              if (o > 0) {
                e = s / o;
              }
              h.TotalHp += (e - t) * r.BaseLife;
              r.Hp = s;
              r.HpMax = o;
              i = true;
            }
          }
          if (h.IsVisible) {
            if (i) {
              this.gXe(h);
            }
          } else if (r.HasFightTag) {
            h.IsVisible = true;
            this.fXe(h);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "[合并怪物血条]添加实体时InfoId错误", ["id", r.Id]);
        }
      }
    }
  }
  OnRemoveEntity(t) {
    var e;
    if (!(this.ListenMonsterRemoveMap.size <= 0)) {
      if (e = this.ListenMonsterRemoveMap.get(t.Id)) {
        this.ListenMonsterRemoveMap.delete(t.Id);
        e.EntityHandle = undefined;
        this.uXe(e);
        if (t = this.InfoMap.get(e.Id)) {
          if (e.HasFightTag) {
            e.HasFightTag = false;
            this.UpdateVisible(t, true);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "[合并怪物血条]移除实体时InfoId错误", ["id", e.Id]);
        }
      }
    }
  }
  dXe(t, e, i, s, h) {
    var r = new MergeHeadStateInfo();
    this._Xe++;
    r.Id = this._Xe;
    r.TreeId = t;
    r.NodeId = e;
    r.MonsterGroupName = s ?? EMPTY_STR;
    r.MonsterMergedHpBarSettings = h;
    for (const a of i.DEs) {
      for (const n of a.bEs) {
        var o = new MergeHeadStateMonsterInfo();
        o.Id = r.Id;
        o.PbDataId = n.A5n;
        o.IsDead = n.Y4n === 2;
        o.BaseLife = MathUtils_1.MathUtils.LongToNumber(n.REs);
        o.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.PbDataId);
        if (o.EntityHandle?.Valid) {
          this.CXe(o);
          if (o.AttributeComponent) {
            o.Hp = o.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
            o.HpMax = o.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
          }
        } else {
          if (o.IsDead) {
            o.Hp = 0;
          } else {
            this.ListenMonsterAddMap.set(o.PbDataId, o);
            o.Hp = o.BaseLife;
          }
          o.HpMax = o.BaseLife;
        }
        r.MonsterInfos.set(o.PbDataId, o);
      }
    }
    for (const _ of r.MonsterInfos.values()) {
      if (_.HpMax > 0) {
        r.TotalHp += _.Hp / _.HpMax * _.BaseLife;
      }
      r.TotalHpMax += _.BaseLife;
    }
    this.UpdateVisible(r, false);
    this.InfoMap.set(r.Id, r);
    if (r.IsVisible) {
      this.fXe(r);
    }
  }
  mXe(t, e) {
    for (const s of e.DEs) {
      for (const h of s.bEs) {
        var i = t.MonsterInfos.get(h.A5n);
        if (i) {
          if (!i.IsDead) {
            i.IsDead = h.Y4n === 2;
            if (i.IsDead) {
              this.uXe(i);
              if (i.Hp !== 0 || i.HpMax !== i.BaseLife) {
                if (i.HpMax > 0) {
                  t.TotalHp -= i.Hp / i.HpMax * i.BaseLife;
                }
                i.Hp = 0;
                i.HpMax = i.BaseLife;
                this.gXe(t);
              }
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新怪物数据时与缓存对不上");
        }
      }
    }
  }
  cXe(t) {
    for (const e of t.MonsterInfos.values()) {
      e.RemoveListener();
      if (e.EntityHandle) {
        this.ListenMonsterRemoveMap.delete(e.EntityHandle.Id);
      } else {
        this.ListenMonsterAddMap.delete(e.PbDataId);
      }
    }
    if (t.IsVisible) {
      t.IsVisible = false;
      this.fXe(t);
    }
    this.InfoMap.delete(t.Id);
  }
  CXe(t) {
    if (t.AddListener()) {
      this.ListenMonsterRemoveMap.set(t.EntityHandle.Id, t);
    }
  }
  uXe(t) {
    t.RemoveListener();
    if (!t.IsDead) {
      this.ListenMonsterAddMap.set(t.PbDataId, t);
    }
  }
  OnMonsterFightTagChange(t, e) {
    var i = this.InfoMap.get(t);
    if (i) {
      if (i.IsVisible !== e) {
        if (e) {
          i.IsVisible = true;
          this.fXe(i);
        } else {
          this.UpdateVisible(i, true);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新进战时InfoId错误", ["id", t]);
    }
  }
  UpdateVisible(t, e) {
    let i = false;
    for (const s of t.MonsterInfos.values()) {
      if (s.HasFightTag) {
        i = true;
        break;
      }
    }
    if (t.IsVisible !== i && (t.IsVisible = i, e)) {
      this.fXe(t);
    }
  }
  fXe(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged, t);
  }
  OnMonsterHealthChange(t, e) {
    var i = this.InfoMap.get(t);
    if (i) {
      i.TotalHp += e;
      this.gXe(i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "[合并怪物血条]更新血量时InfoId错误", ["id", t]);
    }
  }
  gXe(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged, t);
  }
}
exports.BattleUiMergeHeadStateData = BattleUiMergeHeadStateData;
//# sourceMappingURL=BattleUiMergeHeadStateData.js.map