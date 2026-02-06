"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingModel = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletController_1 = require("../../NewWorld/Bullet/BulletController");
const GuideController_1 = require("../Guide/GuideController");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
const ComboTeachingController_1 = require("./ComboTeachingController");
const ComboTeachingDefine_1 = require("./ComboTeachingDefine");
class ComboTeachingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.AIt = 0;
    this.PIt = 0;
    this.xIt = false;
    this.wIt = false;
    this.nV1 = 0;
    this.bIt = 0;
    this.qIt = [];
    this.GIt = [];
    this.NIt = 0;
    this.OIt = false;
    this.kIt = false;
    this.FIt = 0;
  }
  get BeforeJumpTime() {
    return this.FIt;
  }
  set BeforeJumpTime(e) {
    this.FIt = e;
  }
  get IsClose() {
    return this.kIt;
  }
  set IsClose(e) {
    this.kIt = e;
  }
  get IsEmit() {
    return this.OIt;
  }
  set IsEmit(e) {
    this.OIt = e;
  }
  get RecoveryComboId() {
    return this.NIt;
  }
  set RecoveryComboId(e) {
    this.NIt = e;
  }
  get AddBuffList() {
    return this.qIt;
  }
  get AddTagList() {
    return this.GIt;
  }
  get NextAttrSkillId() {
    return this.bIt;
  }
  set NextAttrSkillId(e) {
    this.bIt = e;
  }
  set UseSkillId(e) {
    this.AIt = e;
  }
  get UseSkillId() {
    return this.AIt;
  }
  set UseSkillTime(e) {
    this.PIt = e;
  }
  get UseSkillTime() {
    return this.PIt;
  }
  set PreNextAttr(e) {
    this.xIt = e;
  }
  get PreNextAttr() {
    return this.xIt;
  }
  set NextAttr(e) {
    this.xIt = this.wIt;
    this.wIt = e;
  }
  get NextAttr() {
    return this.wIt;
  }
  set CurrentNodeIndex(e) {
    this.nV1 = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingIndexUpdate);
  }
  get CurrentNodeIndex() {
    return this.nV1;
  }
  RefreshComboList(e) {
    this.CurrentNodeIndex = 0;
    const o = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(e);
    e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    e = EntitySystem_1.EntitySystem.Get(e);
    const t = e?.GetComponent(217);
    const i = e?.GetComponent(185);
    this.AddTagList.forEach(e => {
      t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
    });
    this.AddTagList.length = 0;
    ComboTeachingDefine_1.banKeyMap.forEach((e, t) => {
      if (!o.InputEnums.includes(t)) {
        this.AddTagList.push(...e);
      }
    });
    this.AddTagList.forEach(e => {
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
      if (!t.HasTag(e)) {
        t?.AddTag(e);
      }
    });
    this.AddBuffList.forEach(e => {
      if (i?.GetBuffTotalStackById(e) && i?.GetBuffTotalStackById(e) > 0) {
        i?.RemoveBuff(e, -1, "ComboTeachingView.RefreshComboList");
      }
    });
    this.AddBuffList.length = 0;
    o.AddBuffID.forEach(e => {
      this.AddBuffList.push(e);
    });
    this.AddBuffList.forEach(e => {
      i?.AddBuff(e, {
        InstigatorId: i?.CreatureDataId,
        Reason: "CombatTeachingView.RefreshComboList"
      });
    });
    o.guideID.forEach((e, t) => {
      GuideController_1.GuideController.TryStartGuide(e);
    });
  }
  OnComboListEnd() {
    if (Global_1.Global.BaseCharacter === undefined) {
      this.AddBuffList.length = 0;
      this.AddTagList.length = 0;
    } else {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var e = EntitySystem_1.EntitySystem.Get(e);
      const t = e?.GetComponent(217);
      this.AddTagList.forEach(e => {
        t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
      });
      this.AddTagList.length = 0;
      const o = e?.GetComponent(185);
      this.AddBuffList.forEach(e => {
        if (o?.GetBuffTotalStackById(e) && o?.GetBuffTotalStackById(e) > 0) {
          o?.RemoveBuff(e, -1, "ComboTeachingView.OnBeforeDestroy");
        }
      });
      this.AddBuffList.length = 0;
    }
  }
  CreateComboNodeInfo(e, t) {
    const i = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(t.CommandID[e]);
    var o = ComboTeachingController_1.ComboTeachingController.GetSuccessChecker(i.CompleteCondition, i.CompleteParam);
    const r = [];
    const s = [];
    i.FailedCondition.forEach((e, t) => {
      var o = ComboTeachingController_1.ComboTeachingController.GetFailChecker(e, i.FailedParam[t]);
      switch (o.Type) {
        case 0:
          s.push(o);
          break;
        case 1:
          r.push(o);
      }
    });
    var n;
    var a = t.KeyID[e]?.length === 0 || t.KeyID[e] === undefined;
    var o = {
      Index: e,
      Config: t,
      HoldTotalTime: 0,
      SuccessCondition: o,
      FailUpdateCondition: r,
      FailEventCondition: s,
      IsEmit: false,
      IsHoldAction: false,
      IsShowTag: false,
      ActionInfo: "",
      NeedTickSummon: true,
      SuccessDelay: i.CompleteDelay,
      FailDelay: i.FailDelay
    };
    if (!a) {
      n = (a = t.KeyID[e].split(";")[0]).includes("#");
      t = t.IconTagText.length > e && t.IconTagText[e] !== "";
      e = n ? Number(a.split("#")[1]) : 0;
      o.IsHoldAction = n;
      o.IsShowTag = t;
      o.HoldTotalTime = e;
      o.ActionInfo = n ? a.split("#")[0] : a;
    }
    return o;
  }
  ResetComboConfig() {
    this.UseSkillId = 0;
    this.UseSkillTime = 0;
    this.NextAttr = false;
    this.PreNextAttr = false;
  }
  CheckFailCondition(e, t) {
    var o = e.Config;
    var e = e.Index;
    return ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(o.CommandID[e]).FailedCondition.includes(t);
  }
  OnCurIndexChanged(e) {
    const o = e.Config;
    var t = e.Index;
    var t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(o.CommandID[t]);
    var i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    var i = EntitySystem_1.EntitySystem.Get(i);
    if (t.RemoveBuff.length > 0) {
      var r = i?.GetComponent(185);
      for (const n of t.RemoveBuff) {
        if (r?.GetBuffTotalStackById(n) && r?.GetBuffTotalStackById(n) > 0) {
          r?.RemoveBuff(n, -1, "ComboTeachingView.OnNodeStart");
        }
      }
    }
    if (t.RemoveBullet.length > 0) {
      var i = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
      var s = new Map();
      for (const e of i) {
        if (e[1].EntityData) {
          s.set(e[1].GetBulletInfo().BulletRowName, e[1].EntityData.EntityId);
        }
      }
      for (const a of t.RemoveBullet) {
        let e = "";
        let t = false;
        if (a.includes(";")) {
          const o = a.split(";");
          e = o[0];
          t = Boolean(o[1]);
        } else {
          e = a;
        }
        if (s.has(e)) {
          BulletController_1.BulletController.DestroyBullet(s.get(e), t);
        }
      }
    }
    if (t.SummonPos !== 0 && e.NeedTickSummon) {
      this.CheckSummonBuffAdd(e);
    } else {
      e.NeedTickSummon = false;
    }
  }
  CheckSummonBuffAdd(e) {
    var t = e.Config;
    var o = e.Index;
    var t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(t.CommandID[o]);
    var o = t.SummonPos;
    if (o === 0) {
      e.NeedTickSummon = false;
    } else {
      var i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var i = PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(i, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, o);
      if (i) {
        var r = i.Entity?.GetComponent(185);
        if (r) {
          for (const s of t.SummonRemoveBuff) {
            r.RemoveBuff(s, -1, "ComboTeachingView.SummonRemoveBuff");
          }
          for (const n of t.SummonAddBuff) {
            r.AddBuff(n, {
              InstigatorId: r.CreatureDataId,
              Reason: "CombatTeachingView.SummonAddBuff"
            });
          }
        }
        e.NeedTickSummon = false;
      }
    }
  }
}
exports.ComboTeachingModel = ComboTeachingModel;
//# sourceMappingURL=ComboTeachingModel.js.map