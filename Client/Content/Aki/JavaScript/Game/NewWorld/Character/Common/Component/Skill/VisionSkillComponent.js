"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (h = t[l]) {
        r = (n < 3 ? h(r) : n > 3 ? h(i, s, r) : h(i, s)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSkillComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterSkillComponent_1 = require("./CharacterSkillComponent");
const useNextSkillTagId = 718290459;
let VisionSkillComponent = class VisionSkillComponent extends CharacterSkillComponent_1.CharacterSkillComponent {
  constructor() {
    super(...arguments);
    this.Wpo = 0;
    this.fZo = undefined;
    this.vZo = undefined;
    this.EZo = undefined;
    this.SZo = 0;
    this.GJa = 0;
    this.Ujs = false;
    this.yZo = false;
    this.IZo = false;
    this.TZo = false;
    this.UGn = true;
    this.Ghh = false;
    this.xjs = () => {
      if (!this.TZo) {
        this.RZo();
      }
    };
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    this.Wpo = t.GetCreatureDataId();
    return super.OnStart();
  }
  InitVisionSkill(t, i = false) {
    if (this.vZo !== t) {
      this.Pjs(true, true);
      this.vZo = t;
      this.fZo = ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData();
      t = this.Entity.Id;
      if (!this.EZo) {
        this.EZo = this.fZo.InitMultiSkill(t);
        this.EZo.Init(this.vZo.Id, t);
        this.EZo.InitMultiSkillInfo(this.LoadedSkills);
      }
    }
    this.Ujs = i;
    this.IZo = false;
    this.TZo = false;
    this.UGn = true;
  }
  BeginSkill(t, i = {}) {
    if (!this.Ujs) {
      return super.BeginSkill(t, i);
    }
    let s = t;
    if (i.CheckMultiSkill && this.SZo !== 0 && (t = this.EZo.GetMultiSkillInfo(this.SZo)).NextSkillId && t.NextSkillId !== t.FirstSkillId) {
      s = t.NextSkillId;
    }
    var e;
    var t = this.GetSkillInfo(s);
    if (t) {
      if (e = this.EZo.IsMultiSkill(t)) {
        this.GJa = s;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "使用幻象技能", ["skillId", s]);
      }
      if (super.BeginSkill(s, i)) {
        i = this.GetSkill(s);
        if (e && this.GJa === s && (this.Bjs(true, true), this.EZo.StartMultiSkill(i, false))) {
          this.SZo = s;
        }
        return this.yZo = true;
      } else {
        CombatLog_1.CombatLog.Warn("Skill", this.vZo?.Entity, "角色开始幻象变身技能失败", ["技能Id", s], ["技能名", t?.SkillName]);
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", s]);
      }
      return false;
    }
  }
  OnMorphEnd() {
    if (!this.IZo) {
      this.RZo();
    }
    this.yZo = false;
  }
  ExitMultiSkillState() {
    this.RZo();
  }
  SetKeepMultiSkillState(t, i) {
    this.IZo = t;
    this.TZo = i;
  }
  SetEnableAttackInputAction(t) {
    this.UGn = t;
  }
  CanSummonerStartNextMultiSkill() {
    var t;
    var i;
    return !(this.SZo <= 0) && !this.yZo && !!(t = this.EZo.GetMultiSkillInfo(this.SZo))?.NextSkillId && !(t = t.NextSkillId, (i = this.GetSkill(t)) ? !this.EZo.CanStartMultiSkill(i) : (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", t]), 1));
  }
  IsInMultiSkill() {
    return !(this.SZo <= 0) && !!this.EZo.GetMultiSkillInfo(this.SZo)?.NextSkillId;
  }
  OnVisionAbilityDestroy() {
    if (this.fZo) {
      this.fZo.RemoveMultiSkill(this.Entity.Id);
      this.EZo?.ClearAllSkill();
    }
    if (this.vZo) {
      this.Pjs(true, true);
      this.vZo = undefined;
    }
    this.fZo = undefined;
    this.EZo = undefined;
    this.SZo = 0;
  }
  OnEnd() {
    this.OnVisionAbilityDestroy();
    return super.OnEnd();
  }
  RZo() {
    if (this.SZo !== 0) {
      this.EZo.ResetMultiSkills(this.SZo, true);
      this.SZo = 0;
    }
    this.GJa = 0;
    this.Pjs(true, false);
  }
  Bjs(t, i) {
    var s;
    if (this.vZo?.Valid && (this.Ghh = true, s = this.vZo.Entity, i) && !EventSystem_1.EventSystem.HasWithTarget(s, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.xjs)) {
      EventSystem_1.EventSystem.AddWithTarget(s, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.xjs);
    }
  }
  Pjs(t, i) {
    var s;
    if (this.vZo?.Valid && (this.Ghh = false, s = this.vZo.Entity, i) && EventSystem_1.EventSystem.HasWithTarget(s, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.xjs)) {
      EventSystem_1.EventSystem.RemoveWithTarget(s, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.xjs);
    }
  }
  LZo(t, i) {
    if (t === InputEnums_1.EInputAction.幻象2 || t === InputEnums_1.EInputAction.攻击 && this.UGn) {
      t = this.vZo.Entity.GetComponent(44);
      if (this.Wpo === t?.GetVisionCreatureDataId() && !(this.SZo <= 0)) {
        t = this.EZo.GetMultiSkillInfo(this.SZo);
        if (t?.NextSkillId) {
          var s = t.NextSkillId;
          var e = this.GetSkill(s);
          if (e) {
            if (this.EZo.CanStartMultiSkill(e)) {
              var h = this.vZo;
              if (h?.Valid && this.yZo) {
                CombatLog_1.CombatLog.Info("Skill", this.Entity, "使用幻象技能（输入触发下一段）", ["skillId", t.NextSkillId]);
                this.AbilityComp.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(useNextSkillTagId));
                h = h.Entity.CheckGetComponent(41);
                if (!super.BeginSkill(s, {
                  Target: h.SkillTarget?.Entity,
                  SocketName: h.SkillTargetSocket,
                  Reason: "VisionSkill.OnCharInputPress"
                })) {
                  CombatLog_1.CombatLog.Warn("Skill", this.Entity, "角色幻象变身中使用下一段技能失败", ["技能Id", e?.SkillId], ["技能名", e?.SkillName]);
                  return false;
                }
                CombatLog_1.CombatLog.Info("Skill", this.Entity, "角色幻象变身中使用下一段技能成功", ["skillId", t.NextSkillId]);
                if (this.EZo.StartMultiSkill(e, true)) {
                  this.SZo = s;
                  return true;
                }
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", s]);
          }
        }
      }
    }
    return false;
  }
  HandlePress(t, i) {
    return !!this.Ghh && this.LZo(t, i);
  }
};
VisionSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(43)], VisionSkillComponent);
exports.VisionSkillComponent = VisionSkillComponent; //# sourceMappingURL=VisionSkillComponent.js.map