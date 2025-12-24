"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonBossStateDoubleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BossStateViewBase_1 = require("./BossStateViewBase");
const CommonBossStateView_1 = require("./CommonBossStateView");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SceneTeamEvent_1 = require("../../../SceneTeam/SceneTeamEvent");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const VisibleAnimMachine_1 = require("../State/VisibleAnimMachine");
const SHOW_LOCKED_ANIM_TIME = 167;
const CLOSE_LOCKED_ANIM_TIME = 167;
class CommonBossStateDoubleView extends BossStateViewBase_1.BossStateViewBase {
  constructor() {
    super(...arguments);
    this.Evf = undefined;
    this.Ivf = undefined;
    this.dLf = undefined;
    this.mLf = undefined;
    this.Rqf = undefined;
    this.Lqf = undefined;
    this.wqf = undefined;
    this.Pqf = undefined;
    this.Aqf = undefined;
    this.Tvf = true;
    this.bvf = true;
    this.wvf = false;
    this.Ecu = (e, t, i) => {
      var s;
      var h = this.GetEntity()?.GetComponent(0);
      if (h && t) {
        if (t.Id === h.GetSummonerId() || !!h.CustomServerEntityIds.indexOf(t.Id)) {
          [h, t] = this.Rvf();
          if (h && t) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
          }
          if ((s = this.Tvf && this.bvf || !this.Tvf && !this.bvf) && t) {
            this.Ivf?.Activate(t);
            this.Dst();
          } else if (!s && h) {
            this.Evf?.Activate(h);
            this.Dst();
          }
        }
      }
    };
    this.OnCharSetShowTarget = (e, t, i) => {
      var s = e === this.Evf?.GetEntityId();
      var e = e === this.Ivf?.GetEntityId() && !s;
      this.Pqf?.SetVisible(s, s ? SHOW_LOCKED_ANIM_TIME : CLOSE_LOCKED_ANIM_TIME);
      this.Aqf?.SetVisible(e, e ? SHOW_LOCKED_ANIM_TIME : CLOSE_LOCKED_ANIM_TIME);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async InitializeAsync(e) {
    let t = this.GetItem(0);
    var i = t.GetOwner();
    if (i) {
      this.Evf = new CommonBossStateView_1.CommonBossStateView();
      this.Evf.SkipDestroyActor = true;
      await this.Evf.NewByRootActorAsync(i);
      this.Evf?.Initialize(i);
    }
    if (i = (t = this.GetItem(1)).GetOwner()) {
      this.Ivf = new CommonBossStateView_1.CommonBossStateView();
      this.Ivf.SkipDestroyActor = true;
      await this.Ivf.NewByRootActorAsync(i);
      this.Ivf?.Initialize(i);
    }
    this.Rqf = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Rqf.InitTweenAnim(4, this.GetItem(4), true);
    this.Rqf.InitTweenAnim(5, this.GetItem(5), true);
    this.dLf = this.GetItem(2);
    this.mLf = this.GetItem(3);
    this.dLf.SetVisibility(false);
    this.mLf.SetVisibility(false);
    this.Lqf = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.wqf = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Pqf = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.Pqf.InitCallback(e => {
      this.Rqf.Active(4, e);
      this.dLf?.SetUIActive(e);
    }, e => {
      this.Lqf.PlaySequencePurely(e ? "SleL" : "UnSleL");
    }, e => {});
    this.Aqf = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.Aqf.InitCallback(e => {
      this.Rqf.Active(5, e);
      this.mLf?.SetUIActive(e);
    }, e => {
      this.wqf.PlaySequencePurely(e ? "SleR" : "UnSleR");
    }, e => {});
    this.Pqf.InitVisible(false);
    this.Aqf.InitVisible(false);
    this.dLf?.SetUIActive(false);
    this.mLf?.SetUIActive(false);
  }
  Rvf() {
    let e = undefined;
    let t = undefined;
    var i = this.GetEntity();
    var s = i?.GetComponent(0);
    var h = s?.GetSummonerId() ?? 0;
    if (h > 0) {
      this.Tvf = false;
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(h)?.Entity;
      t = i;
    } else {
      this.Tvf = true;
      e = i;
      h = s?.CustomServerEntityIds;
      if (h && h.length > 0) {
        for (const o of h) {
          var n = o > 0 ? ModelManager_1.ModelManager.CreatureModel.GetEntity(o) : undefined;
          if (n?.Entity) {
            t = n?.Entity;
            break;
          }
        }
      }
    }
    if (!e || !t) {
      if (!this.wvf && !EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Ecu);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 96, "Boss双血条 不足两怪物", ["id", i?.Id]);
      }
    }
    if (this.Tvf && this.bvf || !this.Tvf && !this.bvf) {
      return [e, t];
    } else {
      return [t, e];
    }
  }
  UpdateStyle(e) {
    this.bvf = !e || e.Slot === 0;
  }
  OnActivate() {
    super.OnActivate();
    if (!EventSystem_1.EventSystem.HasWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget)) {
      EventSystem_1.EventSystem.AddWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget);
    }
    var [e, t] = this.Rvf();
    if (e) {
      this.Evf?.Activate(e);
    }
    if (t) {
      this.Ivf?.Activate(t);
    }
    this.Dst();
  }
  OnDeactivate() {
    this.wvf = true;
    super.OnDeactivate();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
    }
    var [e, t] = this.Rvf();
    if (e) {
      this.Evf?.Deactivate(e);
    }
    if (t) {
      this.Ivf?.Deactivate(t);
    }
    this.Destroy();
    this.wvf = false;
  }
  Reset() {}
  OnBeforeDestroy() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget);
    this.Rqf?.Clear(true);
    this.Rqf = undefined;
    this.Lqf.Clear();
    this.Lqf = undefined;
    this.wqf.Clear();
    this.wqf = undefined;
    this.Pqf.Reset();
    this.Pqf = undefined;
    this.Aqf.Reset();
    this.Aqf = undefined;
  }
  DestroyOverride() {
    return false;
  }
  Dst() {
    let e = "";
    if (this.GetMonsterConfig()?.BossStateInfoShowType !== 1) {
      t = this.GetMonsterConfig()?.TidLevelText;
      e = t ? PublicUtil_1.PublicUtil.GetConfigTextByKey(t) : this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv).toString();
    }
    var t = e => {
      if (e && e.GetEntity() && (e = e.GetEntity().GetComponent(0).GetMonsterComponent()?.BossViewConfig?.BossStateViewStyle?.MainStateTextTarget?.TidTargetName)) {
        return PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
      } else {
        return "";
      }
    };
    var i = e => {
      if (e && e.GetEntity()) {
        e = e.GetEntity().GetComponent(0);
        return PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GetEntityTidName()) + ((e = e.GetMonsterComponent()?.BossViewConfig?.TidBossSubTitle) ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e) : "");
      } else {
        return "";
      }
    };
    let s = t(this.Evf);
    let h = t(this.Ivf);
    if (!s && !h) {
      s = i(this.Evf);
      h = i(this.Ivf);
    }
    this.Ivf?.SetNameAndLevel(s, h, e);
  }
  Tick(e) {
    this.Evf?.Tick(e);
    this.Ivf?.Tick(e);
    super.Tick(e);
  }
  ChangeBuff(e, t, i, s = 0) {
    if (s === this.Evf?.GetEntityId()) {
      this.Evf.ChangeBuff(e, t, i);
    } else if (s === this.Ivf?.GetEntityId()) {
      this.Ivf.ChangeBuff(e, t, i);
    }
  }
  HideBossName(e) {
    this.Evf?.HideBossName(e);
    this.Ivf?.HideBossName(e);
  }
  GetResourceId() {
    return "UiItem_BossStateDouble_Prefab";
  }
}
exports.CommonBossStateDoubleView = CommonBossStateDoubleView;
//# sourceMappingURL=CommonBossStateDoubleView.js.map