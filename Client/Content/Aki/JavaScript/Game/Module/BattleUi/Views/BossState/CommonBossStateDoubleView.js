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
    this.xMf = undefined;
    this.BMf = undefined;
    this.IBf = undefined;
    this.TBf = undefined;
    this.xVf = undefined;
    this.BVf = undefined;
    this.kVf = undefined;
    this.qVf = undefined;
    this.OVf = undefined;
    this.kMf = true;
    this.qMf = true;
    this.OMf = false;
    this.Ecu = (e, t, i) => {
      var s;
      var h = this.GetEntity()?.GetComponent(0);
      if (h && t) {
        if (t.Id === h.GetSummonerId() || !!h.CustomServerEntityIds.indexOf(t.Id)) {
          [h, t] = this.GMf();
          if (h && t) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
          }
          if ((s = this.kMf && this.qMf || !this.kMf && !this.qMf) && t) {
            this.BMf?.Activate(t);
            this.Dst();
          } else if (!s && h) {
            this.xMf?.Activate(h);
            this.Dst();
          }
        }
      }
    };
    this.OnCharSetShowTarget = (e, t, i) => {
      var s = e === this.xMf?.GetEntityId();
      var e = e === this.BMf?.GetEntityId() && !s;
      this.qVf?.SetVisible(s, s ? SHOW_LOCKED_ANIM_TIME : CLOSE_LOCKED_ANIM_TIME);
      this.OVf?.SetVisible(e, e ? SHOW_LOCKED_ANIM_TIME : CLOSE_LOCKED_ANIM_TIME);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async InitializeAsync(e) {
    let t = this.GetItem(0);
    var i = t.GetOwner();
    if (i) {
      this.xMf = new CommonBossStateView_1.CommonBossStateView();
      this.xMf.SkipDestroyActor = true;
      await this.xMf.NewByRootActorAsync(i);
      this.xMf?.Initialize(i);
    }
    if (i = (t = this.GetItem(1)).GetOwner()) {
      this.BMf = new CommonBossStateView_1.CommonBossStateView();
      this.BMf.SkipDestroyActor = true;
      await this.BMf.NewByRootActorAsync(i);
      this.BMf?.Initialize(i);
    }
    this.xVf = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.xVf.InitTweenAnim(4, this.GetItem(4), true);
    this.xVf.InitTweenAnim(5, this.GetItem(5), true);
    this.IBf = this.GetItem(2);
    this.TBf = this.GetItem(3);
    this.IBf.SetVisibility(false);
    this.TBf.SetVisibility(false);
    this.BVf = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.kVf = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.qVf = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.qVf.InitCallback(e => {
      this.xVf.Active(4, e);
      this.IBf?.SetUIActive(e);
    }, e => {
      this.BVf.PlaySequencePurely(e ? "SleL" : "UnSleL");
    }, e => {});
    this.OVf = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.OVf.InitCallback(e => {
      this.xVf.Active(5, e);
      this.TBf?.SetUIActive(e);
    }, e => {
      this.kVf.PlaySequencePurely(e ? "SleR" : "UnSleR");
    }, e => {});
    this.qVf.InitVisible(false);
    this.OVf.InitVisible(false);
    this.IBf?.SetUIActive(false);
    this.TBf?.SetUIActive(false);
  }
  GMf() {
    let e = undefined;
    let t = undefined;
    var i = this.GetEntity();
    var s = i?.GetComponent(0);
    var h = s?.GetSummonerId() ?? 0;
    if (h > 0) {
      this.kMf = false;
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(h)?.Entity;
      t = i;
    } else {
      this.kMf = true;
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
      if (!this.OMf && !EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Ecu);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 96, "Boss双血条 不足两怪物", ["id", i?.Id]);
      }
    }
    if (this.kMf && this.qMf || !this.kMf && !this.qMf) {
      return [e, t];
    } else {
      return [t, e];
    }
  }
  UpdateStyle(e) {
    this.qMf = !e || e.Slot === 0;
  }
  OnActivate() {
    super.OnActivate();
    if (!EventSystem_1.EventSystem.HasWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget)) {
      EventSystem_1.EventSystem.AddWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget);
    }
    var [e, t] = this.GMf();
    if (e) {
      this.xMf?.Activate(e);
    }
    if (t) {
      this.BMf?.Activate(t);
    }
    this.Dst();
  }
  OnDeactivate() {
    this.OMf = true;
    super.OnDeactivate();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
    }
    var [e, t] = this.GMf();
    if (e) {
      this.xMf?.Deactivate(e);
    }
    if (t) {
      this.BMf?.Deactivate(t);
    }
    this.Destroy();
    this.OMf = false;
  }
  Reset() {}
  OnBeforeDestroy() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharSetShowTarget, this.OnCharSetShowTarget);
    this.xVf?.Clear(true);
    this.xVf = undefined;
    this.BVf.Clear();
    this.BVf = undefined;
    this.kVf.Clear();
    this.kVf = undefined;
    this.qVf.Reset();
    this.qVf = undefined;
    this.OVf.Reset();
    this.OVf = undefined;
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
    let s = t(this.xMf);
    let h = t(this.BMf);
    if (!s && !h) {
      s = i(this.xMf);
      h = i(this.BMf);
    }
    this.BMf?.SetNameAndLevel(s, h, e);
  }
  Tick(e) {
    this.xMf?.Tick(e);
    this.BMf?.Tick(e);
    super.Tick(e);
  }
  ChangeBuff(e, t, i, s = 0) {
    if (s === this.xMf?.GetEntityId()) {
      this.xMf.ChangeBuff(e, t, i);
    } else if (s === this.BMf?.GetEntityId()) {
      this.BMf.ChangeBuff(e, t, i);
    }
  }
  HideBossName(e) {
    this.xMf?.HideBossName(e);
    this.BMf?.HideBossName(e);
  }
  GetResourceId() {
    return "UiItem_BossStateDouble_Prefab";
  }
}
exports.CommonBossStateDoubleView = CommonBossStateDoubleView;
//# sourceMappingURL=CommonBossStateDoubleView.js.map