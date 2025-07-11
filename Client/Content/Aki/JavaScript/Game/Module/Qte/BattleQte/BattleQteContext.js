"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleQteContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleQteCustomAction_1 = require("./BattleQteCustomAction");
const TARGET_QTE_SOURCER = 0;
const TARGET_PLAYER_SELF = 1;
class BattleQteContext {
  constructor() {
    this.BattleQteHandleId = -1;
    this.BattleQteId = 0;
    this.CommonQteHandleId = -1;
    this.CommonQteId = 0;
    this.BattleQteSource = undefined;
    this.MessageId = undefined;
    this.EntityHandle = undefined;
  }
  QteSuccess() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "战斗Qte触发成功", ["BattleQteHandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId]);
    }
    this.kUe(true);
  }
  QteFail() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "战斗Qte触发失败", ["BattleQteHandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId]);
    }
    this.kUe(false);
  }
  kUe(t) {
    var o = ModelManager_1.ModelManager.BattleQteModel?.GetBattleQteConfig(this.BattleQteId);
    if (o) {
      var a = this.EntityHandle?.Entity;
      var r = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
      var i = t ? o.SuccessActions : o.FailActions;
      var s = i.Num();
      let e = undefined;
      for (let t = 0; t < s; t++) {
        var l = i.Get(t);
        if (e = l.Target === TARGET_QTE_SOURCER ? a : l.Target === TARGET_PLAYER_SELF ? r : undefined) {
          this.jUe(e, l);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "战斗Qte行为执行失败, 目标配置错误", ["HandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId], ["ActionIndex", t], ["Target", l.Target]);
        }
      }
    }
  }
  jUe(a, t) {
    if (this.MessageId) {
      var r = a.GetComponent(205);
      let e = true;
      let o = undefined;
      if (r) {
        var i = t.TagConditions;
        var s = i.Num();
        for (let t = 0; t < s; t++) {
          var l = i.Get(t);
          if (!r.HasTag(l.TagId)) {
            e = false;
            o = l;
            break;
          }
        }
      }
      if (r && e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "战斗Qte行为开始执行", ["HandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId], ["MessageId", this.MessageId]);
        }
        var n = t.AddTags;
        var d = n.Num();
        for (let t = 0; t < d; t++) {
          r.AddTag(n.Get(t).TagId);
        }
        var _ = t.RemoveTags;
        var Q = _.Num();
        for (let t = 0; t < Q; t++) {
          r.RemoveTag(_.Get(t).TagId);
        }
        let e = undefined;
        var h = t.AddBuffs;
        var v = h.Num();
        if (v > 0 && (e = e ?? a.GetComponent(174))) {
          for (let t = 0; t < v; t++) {
            var g = Number(h.Get(t));
            e.AddBuff(g, {
              InstigatorId: e.CreatureDataId,
              Reason: "战斗Qte结束时添加buff",
              PreMessageId: this.MessageId
            });
          }
        }
        var m = t.RemoveBuffs;
        var I = m.Num();
        if (I > 0 && (e = e ?? a.GetComponent(174))) {
          for (let t = 0; t < I; t++) {
            var C = Number(m.Get(t));
            e.RemoveBuff(C, -1, "战斗Qte结束时移除buff", this.MessageId);
          }
        }
        var c = t.AddBullets;
        var f = c.Num();
        for (let t = 0; t < f; t++) {
          var u = Number(c.Get(t));
          ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(a, u.toString(), undefined, {}, this.MessageId);
        }
        var L;
        var B = t.UseSkillId;
        if (B && (L = a.GetComponent(40))) {
          if (t.ChangeMainSkillPriority !== -1 && (A = L?.CurrentSkill) && A.SkillInfo?.SkillGenre !== 3) {
            L.SetSkillPriority(A.SkillId, t.ChangeMainSkillPriority);
          }
          L.BeginSkill(B, {
            Reason: "BattleQteContext.HandleActionInternal"
          });
        }
        var A = t.CustomAction;
        if (A > 0) {
          switch (A) {
            case 1:
              (0, BattleQteCustomAction_1.battleQteChangeRole)();
              break;
            case 2:
              var M = Number(t.CustomActionParam);
              if (M) {
                (0, BattleQteCustomAction_1.battleQteChangeRole)(M);
              }
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "战斗Qte行为执行失败, tag条件不满足", ["HandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId], ["TagName", o?.TagName]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "战斗Qte执行行为失败, 上下文Id不合法", ["HandleId", this.BattleQteHandleId], ["BattleQteId", this.BattleQteId], ["MessageId", this.MessageId]);
    }
  }
}
exports.BattleQteContext = BattleQteContext;
//# sourceMappingURL=BattleQteContext.js.map