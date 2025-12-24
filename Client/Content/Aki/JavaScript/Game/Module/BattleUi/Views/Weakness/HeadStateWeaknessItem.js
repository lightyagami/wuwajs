"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStateWeaknessItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleUiControl_1 = require("../../BattleUiControl");
const lockTag = 2050198060;
const fullTag = 1100879485;
const breakTag = 294347708;
const cdTag = -932739656;
const deBuffTag = -242263999;
const forbidTag = -1976301727;
const CD_BUFF_ID = 3199;
class HeadStateWeaknessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FYf = 0;
    this.kG = 1;
    this.mLm = undefined;
    this.ac = 0;
    this.E0 = 0;
    this.$te = undefined;
    this.Xte = undefined;
    this.m1t = undefined;
    this.SPe = undefined;
    this.Pst = undefined;
    this.a2d = undefined;
    this.yst = -1;
    this.zpm = 0;
    this.BY = 0;
    this.RRf = 0;
    this.Rjt = false;
    this.DP_ = false;
    this.eEc = false;
    this.LRf = false;
    this.bst = undefined;
    this.p2a = 0;
    this.yLm = false;
    this.vFf = false;
    this.yFf = false;
    this.Lti = false;
    this.ldt = [];
    this.Xzf = false;
    this.Yzf = undefined;
    this.zHu = (t, i) => {
      if (t === 4) {
        this.yFf = i;
        this.MLm();
      }
    };
    this._yo = (t, i, s) => {
      if (t === CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp) {
        this.zpm = i;
      } else if (t === CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax) {
        this.BY = i;
      }
      this.Gdl();
      this.MLm();
    };
    this.YAl = (t, i) => {
      this.Rjt = i;
      this.MLm();
    };
    this.lNu = (t, i) => {
      if (this.DP_ !== i) {
        this.DP_ = i;
      }
      this.MLm();
    };
    this.ELm = (t, i) => {
      if (this.yLm !== i && (this.yLm = i, this.MLm(), this.yLm)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiShowWeaknessBreakEffect, true);
      }
    };
    this.PRf = (t, i) => {
      this.eEc = i;
      this.GetItem(8).SetUIActive(this.eEc);
      this.ARf();
      if (i) {
        this.zzf();
      }
      this.MLm();
    };
    this.DRf = (t, i) => {
      this.LRf = i;
      this.MLm();
    };
    this.SFf = (t, i) => {
      this.yFf = i;
      this.MLm();
    };
    this.Jzf = () => {
      this.Xzf = false;
      this.Yzf = undefined;
      this.mLm?.();
    };
  }
  async InitializeAsync(t, i = 1) {
    this.kG = i;
    i = BattleUiControl_1.BattleUiControl.Pool.GetWeaknessItem(t);
    await this.CreateByActorAsync(i);
  }
  DestroyOverride() {
    if (this.RootActor && (this.kG !== 1 && this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector), this.RootActor.IsValid())) {
      BattleUiControl_1.BattleUiControl.Pool.RecycleWeaknessItem(this.RootActor);
    }
    return true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UINiagara], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite]];
  }
  OnStart() {
    if (this.kG !== 1) {
      this.RootItem?.SetUIItemScale(new UE.Vector(this.kG, this.kG, 1));
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.ac = 0;
    this.Pst = this.GetSprite(1);
    this.yst = 0;
    this.Pst?.SetFillAmount(0);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetUiNiagara(6).SetUIActive(false);
    this.GetItem(7).SetAlpha(1);
    this.GetItem(8).SetUIActive(false);
    this.a2d = this.GetSprite(9);
    this.a2d.SetFillAmount(0);
    this.yFf = ModelManager_1.ModelManager.BattleUiModel.GetRoleSpecialState(4);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.zHu);
  }
  OnAfterShow() {
    HeadStateWeaknessItem.cW.Start();
    this.SPe?.PlayLevelSequenceByName("Start");
    HeadStateWeaknessItem.cW.Stop();
  }
  async OnBeforeHideAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe?.PlaySequenceAsync("Close", t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.zHu);
    this.Zzf();
    this.Refresh(undefined);
    super.OnBeforeDestroy();
  }
  Refresh(t) {
    var i = t?.Id ?? 0;
    if (i !== this.E0) {
      this.bLm();
      this.E0 = i;
      this.$te = t?.CheckGetComponent(182);
      this.Xte = t?.CheckGetComponent(215);
      this.m1t = t?.CheckGetComponent(220);
      i = t?.CheckGetComponent(0)?.GetBaseInfo()?.Category.MonsterMatchType ?? 3;
      this.FYf = HeadStateWeaknessItem.NYf.get(i) ?? CD_BUFF_ID;
      this.Xzf = false;
    }
    if (t && this.$te && this.Xte) {
      this.RLm();
      this.Rjt = this.Xte.HasTag(lockTag);
      this.DP_ = this.Xte.HasTag(fullTag);
      this.eEc = this.Xte.HasTag(cdTag);
      this.LRf = this.Xte.HasTag(deBuffTag);
      this.vFf = this.Xte.HasTag(forbidTag);
      this.zpm = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp);
      this.BY = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax);
      this.Gdl();
      this.MLm();
      this.GetItem(8).SetUIActive(this.eEc);
      this.ARf();
    } else {
      this.Rjt = false;
      this.DP_ = false;
      this.eEc = false;
      this.LRf = false;
      this.vFf = false;
      this.zpm = 0;
      this.BY = 0;
      this.mLm = undefined;
      this.MLm();
    }
    this.Lri();
  }
  RLm() {
    if (this.$te) {
      this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp, this._yo);
      this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax, this._yo);
    }
    this.mdt(lockTag, this.YAl);
    this.mdt(fullTag, this.lNu);
    this.mdt(breakTag, this.ELm);
    this.mdt(cdTag, this.PRf);
    this.mdt(deBuffTag, this.DRf);
    this.mdt(forbidTag, this.SFf);
  }
  bLm() {
    if (this.$te) {
      this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp, this._yo);
      this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax, this._yo);
    }
    for (const t of this.ldt) {
      t.EndTask();
    }
    this.ldt.length = 0;
  }
  mdt(t, i) {
    if (this.Xte && (t = this.Xte.ListenForTagAddOrRemove(t, i))) {
      this.ldt.push(t);
    }
  }
  Gdl() {
    let t = 0;
    var i = (t = this.BY > 0 && this.zpm > 0 ? this.zpm / this.BY : t) === 1 || t === 0 ? 0 : 0.01;
    if (Math.abs(t - this.yst) > i) {
      this.yst = t;
      this.Pst.SetFillAmount(t);
    }
  }
  MLm() {
    let t = 0;
    var i;
    var s;
    if (this.vFf || this.yFf) {
      t = 0;
    } else if (this.Rjt) {
      t = 5;
    } else if (this.yLm) {
      t = this.DP_ ? 4 : 3;
    } else if (this.DP_) {
      t = 2;
    } else if (this.LRf) {
      t = 6;
    } else if (this.BY > 0 && this.zpm > 0 || this.eEc) {
      t = 1;
    }
    if (this.ac !== t) {
      i = this.ac;
      this.ac = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "血条弱点状态改变", ["EntityId", this.E0], ["state", t]);
      }
      this.Lri();
      HeadStateWeaknessItem.VYf.Start();
      if (this.ac === 5) {
        this.SPe.StopSequenceByKey("Unlock");
        this.SPe.PlayLevelSequenceByName("Lock");
      } else if (i === 5) {
        this.SPe.StopSequenceByKey("Lock");
        this.SPe.PlayLevelSequenceByName("Unlock");
      }
      s = this.ac === 3 || this.ac === 6 || this.ac === 4;
      if (!(i = i === 3 || i === 6 || i === 4) && s) {
        this.SPe.StopSequenceByKey("Unbreak");
        this.SPe.PlayLevelSequenceByName("Break");
      } else if (i && !s) {
        this.SPe.StopSequenceByKey("Break");
        this.SPe.PlayLevelSequenceByName("Unbreak");
      }
      if (this.ac === 2) {
        this.SPe.PlayLevelSequenceByName("Full");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiShowWeaknessBreakEffect, false);
      }
      HeadStateWeaknessItem.VYf.Stop();
      if (this.Lti) {
        this.Kbe();
      }
      this.mLm?.();
    }
  }
  IsFullState(t = true) {
    return this.ac === 2 || !!t && this.ac === 4;
  }
  IsInBreakAnim() {
    return this.Xzf;
  }
  SetStateChangeCallback(t) {
    this.mLm = t;
  }
  ARf() {
    if (this.eEc) {
      let t = 0;
      if (!this.bst || !this.m1t?.GetBuffByHandle(this.p2a)) {
        this.bst = this.m1t?.GetBuffById(this.FYf);
        this.p2a = this.bst?.Handle ?? 0;
      }
      var i = (t = this.bst ? this.bst.GetRemainDuration() / this.bst.Duration : t) === 1 || t === 0 ? 0 : 0.01;
      if (Math.abs(t - this.RRf) > i) {
        this.RRf = t;
        this.a2d.SetFillAmount(t);
      }
    }
  }
  Lri() {
    var t = this.ac !== 0;
    if (this.Lti !== t) {
      if (this.Lti = t) {
        this.Kbe();
        this.Show();
      } else {
        this.Hide();
      }
    }
  }
  Tick(t) {
    this.ARf();
  }
  Kbe() {
    var t = this.ac === 3 || this.ac === 6 || this.ac === 4;
    this.GetItem(2).SetUIActive(this.ac === 1 || this.ac === 2);
    this.GetItem(3).SetUIActive(t);
    this.GetItem(4).SetUIActive(t);
    this.GetItem(5).SetUIActive(this.ac === 5);
  }
  zzf() {
    this.Xzf = true;
    if (this.Yzf) {
      TimerSystem_1.TimerSystem.Remove(this.Yzf);
      this.Yzf = undefined;
    }
    this.Yzf = TimerSystem_1.TimerSystem.Delay(this.Jzf, 1000);
    this.mLm?.();
  }
  Zzf() {
    if (this.Yzf) {
      this.Xzf = false;
      TimerSystem_1.TimerSystem.Remove(this.Yzf);
      this.Yzf = undefined;
    }
  }
}
(exports.HeadStateWeaknessItem = HeadStateWeaknessItem).cW = Stats_1.Stat.Create("HeadStateWeaknessItemStart");
HeadStateWeaknessItem.VYf = Stats_1.Stat.Create("HeadStateWeaknessItemRefresh");
HeadStateWeaknessItem.NYf = new Map([[0, 3196], [1, 3197], [2, 3198], [3, 3199]]); //# sourceMappingURL=HeadStateWeaknessItem.js.map