"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossStatePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleUiControl_1 = require("../../BattleUiControl");
const BattleUiDefine_1 = require("../../BattleUiDefine");
const BattleChildViewPanel_1 = require("../BattleChildViewPanel/BattleChildViewPanel");
const CommonBossStateView_1 = require("./CommonBossStateView");
const MergeMonsterHeadStateView_1 = require("./MergeMonsterHeadStateView");
const bossStateViewMap = new Map([[1, CommonBossStateView_1.CommonBossStateView]]);
class BossStatePanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Drt = new Set();
    this.YQn = new Map();
    this.Rrt = -1;
    this.Urt = undefined;
    this.Art = undefined;
    this.Prt = undefined;
    this.xrt = 0;
    this.wrt = 0;
    this.Brt = t => {
      if (t && this.brt(t)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    };
    this.zpe = (t, e) => {
      var i;
      if (e?.Valid && (i = e.Entity.GetComponent(3)) && i.IsBoss && (i = e.Id, this.Drt.has(i)) && (this.Drt.delete(i), this.YQn.delete(i), EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.zpe), i === this.Rrt) && this.IsTargetBossExist()) {
        this.qrt(false);
        this.Grt();
      }
    };
    this.AQe = (t, e, i, s) => {
      if (this.Rrt === t && (e.CueType === 2 || e.CueType === 14)) {
        this.Art?.ChangeBuff(e, i, s);
      }
    };
    this.Nrt = t => {
      var e;
      if (t.IsVisible) {
        if (this.Prt) {
          this.Prt.Refresh(t);
          if (!this.Prt.IsShowOrShowing) {
            this.Prt.Show();
          }
        } else {
          this.Prt = new MergeMonsterHeadStateView_1.MergeMonsterHeadStateView();
          this.Prt.Refresh(t);
          t = this.GetItem(0);
          e = BattleUiControl_1.BattleUiControl.Pool.GetSrcActor(this.Prt.GetResourceId());
          e = LguiUtil_1.LguiUtil.DuplicateActor(e, t);
          this.Prt.NewByRootActorAsync(e).finally(() => {
            if (this.Prt.Info) {
              this.Prt.Show();
            }
          });
        }
      } else if (this.Prt && !this.Prt.IsHideOrHiding) {
        this.Prt.Refresh(undefined);
        this.Prt.Hide();
      }
    };
    this.Ort = t => {
      if (this.Prt && this.Prt.Info === t) {
        this.Prt.OnHealthChanged();
      }
    };
    this.OnLanguageChange = () => {
      this.Art?.OnLanguageChange();
      this.Prt?.OnLanguageChange();
    };
    this.cF_ = t => {
      this.Art?.HideBossName(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  InitializeTemp() {
    this.xrt = CommonParamById_1.configCommonParamById.GetIntConfig("BossStateShowDistance");
    this.wrt = CommonParamById_1.configCommonParamById.GetIntConfig("BossStateShowMaxDistance");
    this.krt();
  }
  async InitializeAsync() {
    await this.Frt();
    this.Vrt();
  }
  Reset() {
    this.qrt();
    this.Grt();
    this.Hrt();
    this.Art = undefined;
    super.Reset();
  }
  krt() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      for (const e of t) {
        if (e.IsInit && this.brt(e)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        }
      }
    }
  }
  async Frt() {
    this.Urt = new Map();
    const s = [];
    BattleUiDefine_1.bossStateViewResourceIdMap.forEach((t, e) => {
      var i = this.GetItem(0);
      var t = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(t);
      t.K2_AttachRootComponentTo(i);
      i = new (bossStateViewMap.get(e))();
      this.Urt.set(e, i);
      s.push(i.NewByRootActorAsync(t));
    });
    await Promise.all(s);
  }
  Hrt() {
    for (const t of this.Urt.values()) {
      t.DestroyCompatible();
    }
    this.Urt = undefined;
  }
  jrt(t, e) {
    if (!this.Art) {
      this.Art = this.Urt.get(e);
      this.Art.Activate(t);
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(true);
    }
  }
  qrt(t = true) {
    var e;
    if (this.Art) {
      e = EntitySystem_1.EntitySystem.Get(this.Rrt);
      this.Art.Deactivate(e);
      if (t) {
        this.Art.Hide();
      } else {
        this.Art.HideWithAnim();
      }
      this.Art = undefined;
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(false);
    }
  }
  OnTickBattleChildViewPanel(t) {
    BossStatePanel.vJe.Start();
    this.Vrt();
    this.Art?.Tick(t);
    this.Prt?.Tick(t);
    BossStatePanel.vJe.Stop();
  }
  OnChangeBoss(t) {
    if (this.Art) {
      this.qrt();
      this.Grt();
    }
    this.Rrt = t;
    var e;
    var t = this.Wrt()?.BossViewConfig?.BossStateViewType ?? 0;
    if (bossStateViewMap.get(Number(t))) {
      if (e = EntitySystem_1.EntitySystem.Get(this.Rrt)) {
        this.jrt(e, t);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "显示Boss状态条时找不到对应Boss实体");
      }
    }
  }
  Vrt() {
    var t = this.Krt();
    if (t === -1) {
      if (this.IsTargetBossExist()) {
        this.qrt(false);
        this.Grt();
      }
    } else if (this.Rrt !== t) {
      this.OnChangeBoss(t);
    }
  }
  Grt() {
    this.Rrt = -1;
  }
  Krt() {
    var t = Global_1.Global.BaseCharacter;
    if (!t) {
      return -1;
    }
    if (this.Drt.size === 0) {
      return -1;
    }
    let e = -1;
    let i = MathUtils_1.MathUtils.Int32Max;
    for (const h of this.Drt) {
      var s;
      var n = EntitySystem_1.EntitySystem.Get(h);
      if (n &&= n.GetComponent(3)) {
        n = n.Owner.GetSquaredDistanceTo(t);
        if (s = this.YQn.get(h)) {
          if (n <= s && n < i) {
            i = n;
            e = h;
          }
        } else if (!(n > this.wrt)) {
          if (n <= this.xrt && n < i) {
            i = n;
            e = h;
          }
          if (n > this.xrt && n <= this.wrt && this.Rrt !== -1 && n < i) {
            i = n;
            e = h;
          }
        }
      }
    }
    return e;
  }
  Wrt() {
    if (this.Rrt) {
      return this.Qrt(this.Rrt);
    }
  }
  Qrt(t) {
    return EntitySystem_1.EntitySystem.Get(t).GetComponent(0)?.GetMonsterComponent();
  }
  IsTargetBossExist() {
    return this.Rrt !== -1;
  }
  brt(t) {
    if (!t?.Valid) {
      return false;
    }
    var e = t.Entity.GetComponent(0);
    if (!e) {
      return false;
    }
    e = e.GetMonsterComponent();
    if (!e) {
      return false;
    }
    let i = 0;
    var e = e.BossViewConfig;
    return (i = e ? e.BossStateViewType : i) !== 0 && !this.Drt.has(t.Id) && (this.Drt.add(t.Id), e?.ShowDistance && (e = e.ShowDistance * e.ShowDistance, this.YQn.set(t.Id, e)), true);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpawnBoss, this.Brt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged, this.Nrt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged, this.Ort);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.OnLanguageChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmHideMissionAndBossName, this.cF_);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpawnBoss, this.Brt);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged, this.Nrt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged, this.Ort);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.OnLanguageChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmHideMissionAndBossName, this.cF_);
  }
  GetUiActorForGuide() {
    return this.Art?.GetRootActor();
  }
}
(exports.BossStatePanel = BossStatePanel).vJe = Stats_1.Stat.Create("[BattleView]BossStatePanelTick");
//# sourceMappingURL=BossStatePanel.js.map