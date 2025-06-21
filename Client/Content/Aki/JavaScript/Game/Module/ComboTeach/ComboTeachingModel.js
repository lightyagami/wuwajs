"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ComboTeachingModel = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  BulletController_1 = require("../../NewWorld/Bullet/BulletController"),
  GuideController_1 = require("../Guide/GuideController"),
  PhantomUtil_1 = require("../Phantom/PhantomUtil"),
  ComboTeachingController_1 = require("./ComboTeachingController"),
  ComboTeachingDefine_1 = require("./ComboTeachingDefine");
class ComboTeachingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.AIt = 0, this.PIt = 0, this.xIt = !1, this.wIt = !1, this.L41 = 0, this.bIt = 0, this.qIt = [], this.GIt = [], this.NIt = 0, this.OIt = !1, this.kIt = !1, this.FIt = 0
  }
  get BeforeJumpTime() {
    return this.FIt
  }
  set BeforeJumpTime(e) {
    this.FIt = e
  }
  get IsClose() {
    return this.kIt
  }
  set IsClose(e) {
    this.kIt = e
  }
  get IsEmit() {
    return this.OIt
  }
  set IsEmit(e) {
    this.OIt = e
  }
  get RecoveryComboId() {
    return this.NIt
  }
  set RecoveryComboId(e) {
    this.NIt = e
  }
  get AddBuffList() {
    return this.qIt
  }
  get AddTagList() {
    return this.GIt
  }
  get NextAttrSkillId() {
    return this.bIt
  }
  set NextAttrSkillId(e) {
    this.bIt = e
  }
  set UseSkillId(e) {
    this.AIt = e
  }
  get UseSkillId() {
    return this.AIt
  }
  set UseSkillTime(e) {
    this.PIt = e
  }
  get UseSkillTime() {
    return this.PIt
  }
  set PreNextAttr(e) {
    this.xIt = e
  }
  get PreNextAttr() {
    return this.xIt
  }
  set NextAttr(e) {
    this.xIt = this.wIt, this.wIt = e
  }
  get NextAttr() {
    return this.wIt
  }
  set CurrentNodeIndex(e) {
    this.L41 = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingIndexUpdate)
  }
  get CurrentNodeIndex() {
    return this.L41
  }
  RefreshComboList(e) {
    this.CurrentNodeIndex = 0;
    const o = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(e);
    e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), e = EntitySystem_1.EntitySystem.Get(e);
    const t = e?.GetComponent(205),
      i = e?.GetComponent(174);
    this.AddTagList.forEach(e => {
      t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
    }), this.AddTagList.length = 0, ComboTeachingDefine_1.banKeyMap.forEach((e, t) => {
      o.InputEnums.includes(t) || this.AddTagList.push(...e)
    }), this.AddTagList.forEach(e => {
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
      t.HasTag(e) || t?.AddTag(e)
    }), this.AddBuffList.forEach(e => {
      i?.GetBuffTotalStackById(e) && 0 < i?.GetBuffTotalStackById(e) && i?.RemoveBuff(e, -1, "ComboTeachingView.RefreshComboList")
    }), this.AddBuffList.length = 0, o.AddBuffID.forEach(e => {
      this.AddBuffList.push(e)
    }), this.AddBuffList.forEach(e => {
      i?.AddBuff(e, {
        InstigatorId: i?.CreatureDataId,
        Reason: "CombatTeachingView.RefreshComboList"
      })
    }), o.guideID.forEach((e, t) => {
      GuideController_1.GuideController.TryStartGuide(e)
    })
  }
  OnComboListEnd() {
    if (void 0 === Global_1.Global.BaseCharacter) this.AddBuffList.length = 0, this.AddTagList.length = 0;
    else {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        e = EntitySystem_1.EntitySystem.Get(e);
      const t = e?.GetComponent(205),
        o = (this.AddTagList.forEach(e => {
          t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
        }), this.AddTagList.length = 0, e?.GetComponent(174));
      this.AddBuffList.forEach(e => {
        o?.GetBuffTotalStackById(e) && 0 < o?.GetBuffTotalStackById(e) && o?.RemoveBuff(e, -1, "ComboTeachingView.OnBeforeDestroy")
      }), this.AddBuffList.length = 0
    }
  }
  CreateComboNodeInfo(e, t) {
    const i = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(t.CommandID[e]);
    var o = ComboTeachingController_1.ComboTeachingController.GetSuccessChecker(i.CompleteCondition, i.CompleteParam);
    const s = [],
      r = [];
    i.FailedCondition.forEach((e, t) => {
      var o = ComboTeachingController_1.ComboTeachingController.GetFailChecker(e, i.FailedParam[t]);
      switch (o.Type) {
        case 0:
          r.push(o);
          break;
        case 1:
          s.push(o)
      }
    });
    var n, a = 0 === t.KeyID[e]?.length || void 0 === t.KeyID[e],
      o = {
        Index: e,
        Config: t,
        HoldTotalTime: 0,
        SuccessCondition: o,
        FailUpdateCondition: s,
        FailEventCondition: r,
        IsEmit: !1,
        IsHoldAction: !1,
        IsShowTag: !1,
        ActionInfo: "",
        NeedTickSummon: !0,
        SuccessDelay: i.CompleteDelay,
        FailDelay: i.FailDelay
      };
    return a || (n = (a = t.KeyID[e].split(";")[0]).includes("#"), t = t.IconTagText.length > e && "" !== t.IconTagText[e], e = n ? Number(a.split("#")[1]) : 0, o.IsHoldAction = n, o.IsShowTag = t, o.HoldTotalTime = e, o.ActionInfo = n ? a.split("#")[0] : a), o
  }
  ResetComboConfig() {
    this.UseSkillId = 0, this.UseSkillTime = 0, this.NextAttr = !1, this.PreNextAttr = !1
  }
  CheckFailCondition(e, t) {
    var o = e.Config,
      e = e.Index;
    return ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(o.CommandID[e]).FailedCondition.includes(t)
  }
  OnCurIndexChanged(e) {
    const o = e.Config;
    var t = e.Index,
      t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(o.CommandID[t]),
      i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
      i = EntitySystem_1.EntitySystem.Get(i);
    if (t.RemoveBuff) {
      var s = i?.GetComponent(174);
      for (const r of t.RemoveBuff) s?.GetBuffTotalStackById(r) && 0 < s?.GetBuffTotalStackById(r) && s?.RemoveBuff(r, -1, "ComboTeachingView.OnNodeStart")
    }
    if (t.RemoveBullet)
      for (const n of t.RemoveBullet) {
        let e = 0,
          t = !1;
        if (n.includes(";")) {
          const o = n.split(";");
          e = Number(o[0]), t = Boolean(o[1])
        } else e = Number(n);
        BulletController_1.BulletController.DestroyBullet(e, t)
      }
    0 !== t.SummonPos && e.NeedTickSummon ? this.CheckSummonBuffAdd(e) : e.NeedTickSummon = !1
  }
  CheckSummonBuffAdd(e) {
    var t = e.Config,
      o = e.Index,
      t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(t.CommandID[o]),
      o = t.SummonPos;
    if (0 === o) e.NeedTickSummon = !1;
    else {
      var i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        i = PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(i, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, o);
      if (i) {
        var s = i.Entity?.GetComponent(174);
        if (s) {
          for (const r of t.SummonRemoveBuff) s.RemoveBuff(r, -1, "ComboTeachingView.SummonRemoveBuff");
          for (const n of t.SummonAddBuff) s.AddBuff(n, {
            InstigatorId: s.CreatureDataId,
            Reason: "CombatTeachingView.SummonAddBuff"
          })
        }
        e.NeedTickSummon = !1
      }
    }
  }
}
exports.ComboTeachingModel = ComboTeachingModel;
//# sourceMappingURL=ComboTeachingModel.js.map