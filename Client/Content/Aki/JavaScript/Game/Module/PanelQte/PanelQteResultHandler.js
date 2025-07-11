"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQteResultHandler = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CooperationController_1 = require("../Battle/Cooperation/CooperationController");
const RUSH_SKILL_ID = 100001;
const HOOK_SKILL_ID = 100020;
class PanelQteResultHandler {
  Handle(r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PanelQte", 17, "通用界面QTE结算", ["qteId", r.QteId], ["success", r.Success]);
    }
    var a = r.Success ? r.Config.SuccessActions : r.Config.FailActions;
    var t = a.Num();
    for (let e = 0; e < t; e++) {
      var o = a.Get(e);
      this.kUe(o, r);
    }
  }
  kUe(e, t) {
    let o = undefined;
    if (o = e.Target === 0 ? t.GetSourceEntity() : this.TOi()) {
      let r = undefined;
      let a = undefined;
      var l = e.AddTags;
      var i = l.Num();
      for (let e = 0; e < i; e++) {
        var n = l.Get(e);
        (r = r ?? o.GetComponent(205)).AddTag(n.TagId);
      }
      var s = e.RemoveTags;
      var _ = s.Num();
      for (let e = 0; e < _; e++) {
        var d = s.Get(e);
        (r = r ?? o.GetComponent(205)).RemoveTag(d.TagId);
      }
      var v = e.AddBuffs;
      var u = v.Num();
      if (u > 0) {
        var c = t.GetSourceEntity()?.GetComponent(0).GetCreatureDataId();
        var f = t.PreMessageId;
        if (c) {
          if (t.BuffIndex >= 0) {
            var C = Number(v.Get(t.BuffIndex));
            (a = a ?? o.GetComponent(174)).AddBuff(C, {
              InstigatorId: c,
              Reason: "界面QTE结算时添加",
              PreMessageId: f
            });
          } else {
            for (let e = 0; e < u; e++) {
              var p = Number(v.Get(e));
              (a = a ?? o.GetComponent(174)).AddBuff(p, {
                InstigatorId: c,
                Reason: "界面QTE结算时添加",
                PreMessageId: f
              });
            }
          }
        }
      }
      var I = e.CustomActions;
      var g = I.Num();
      for (let e = 0; e < g; e++) {
        var h = I.Get(e);
        this.LOi(h, t, o);
      }
    }
  }
  LOi(e, r, a) {
    switch (e) {
      case 0:
        var t = a.GetComponent(174);
        if (t) {
          t.RemoveBuffByEffectType(36, "界面QTE解除冰冻buff");
        }
        break;
      case 1:
        this.DOi();
        break;
      case 2:
        {
          const a = this.TOi();
          if (a?.GetComponent(175)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
            if ((t = a?.GetComponent(177))?.Valid) {
              t.ClimbDash();
            }
          } else {
            a?.GetComponent(40)?.BeginSkill(RUSH_SKILL_ID, {
              Reason: "PanelQteResultHandler.HandleCustomAction.Rush"
            });
          }
          break;
        }
      case 3:
        this.TOi()?.GetComponent(40)?.BeginSkill(HOOK_SKILL_ID, {
          Reason: "PanelQteResultHandler.HandleCustomAction.Hook"
        });
        break;
      case 4:
        this.TOi()?.GetComponent(178)?.TryJumpInFreeRunning();
    }
  }
  DOi() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (!e?.EntityHandle?.Entity?.GetComponent(205)?.HasTag(-1697149502)) {
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      var t = a.length;
      var o = a.indexOf(e);
      for (let r = 1; r < t; r++) {
        let e = o + r;
        if (e >= t) {
          e -= t;
        }
        var l = a[e];
        if (l?.CanGoBattle() === 0) {
          CooperationController_1.CooperationController.TryCooperate(l.GetCreatureDataId());
          return;
        }
      }
    }
  }
  TOi() {
    var e = Global_1.Global.BaseCharacter;
    if (e?.IsValid()) {
      return e.CharacterActorComponent?.Entity;
    }
  }
}
exports.PanelQteResultHandler = PanelQteResultHandler;
//# sourceMappingURL=PanelQteResultHandler.js.map