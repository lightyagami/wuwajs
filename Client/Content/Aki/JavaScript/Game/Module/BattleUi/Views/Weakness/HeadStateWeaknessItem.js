"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStateWeaknessItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleUiControl_1 = require("../../BattleUiControl");
const lockTag = 2050198060;
const fullTag = 1100879485;
const breakTag = 646875359;
class HeadStateWeaknessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xvm = undefined;
    this.ac = 0;
    this.E0 = 0;
    this.$te = undefined;
    this.Xte = undefined;
    this.SPe = undefined;
    this.Pst = undefined;
    this.yst = -1;
    this.cmm = 0;
    this.BY = 0;
    this.Rjt = false;
    this.DP_ = false;
    this.tym = false;
    this.iym = undefined;
    this.ldt = [];
    this._yo = (t, i, s) => {
      if (t === CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp) {
        this.cmm = i;
      } else if (t === CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax) {
        this.BY = i;
      }
      this.Gdl();
      this.rym();
    };
    this.YAl = (t, i) => {
      this.Rjt = i;
      this.rym();
    };
    this.lNu = (t, i) => {
      if (this.DP_ !== i) {
        this.DP_ = i;
      }
      this.rym();
    };
    this.oym = (t, i) => {
      if (i && !this.tym) {
        this.nym();
      }
    };
    this.sym = () => {
      this.iym = undefined;
      this.tym = false;
      this.rym();
    };
  }
  async InitializeAsync(t) {
    t = BattleUiControl_1.BattleUiControl.Pool.GetWeaknessItem(t);
    await this.CreateByActorAsync(t);
  }
  DestroyOverride() {
    if (this.RootActor) {
      BattleUiControl_1.BattleUiControl.Pool.RecycleWeaknessItem(this.RootActor);
    }
    return true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UINiagara], [8, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.ac = 0;
    this.Pst = this.GetSprite(1);
    this.yst = 0;
    this.Pst?.SetFillAmount(0);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetUiNiagara(7).SetUIActive(false);
    this.GetItem(8).SetAlpha(1);
  }
  OnAfterShow() {
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
    super.OnBeforeDestroy();
  }
  Refresh(t) {
    var i = t?.Id ?? 0;
    if (i !== this.E0 && (this.aym(), this.E0 = i, this.$te = t?.CheckGetComponent(177), this.Xte = t?.CheckGetComponent(209), this.ac !== 0)) {
      this.ac = 0;
      this.Hide();
    }
    if (t && this.$te && this.Xte) {
      this.hym();
      this.Rjt = this.Xte.HasTag(lockTag);
      this.DP_ = this.Xte.HasTag(fullTag);
      this.cmm = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp);
      this.BY = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax);
      this.Gdl();
      this.rym();
    }
  }
  hym() {
    if (this.$te) {
      this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUp, this._yo);
      this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_WeaknessBuildUpMax, this._yo);
    }
    this.mdt(lockTag, this.YAl);
    this.mdt(fullTag, this.lNu);
    this.mdt(breakTag, this.oym);
  }
  aym() {
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
  nym() {
    this.tym = true;
    this.lym();
    this.iym = TimerSystem_1.TimerSystem.Delay(this.sym, 1000);
    this.rym();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiShowWeaknessBreakEffect, true);
  }
  lym() {
    if (this.iym) {
      TimerSystem_1.TimerSystem.Remove(this.iym);
      this.iym = undefined;
    }
  }
  Gdl() {
    var t = this.BY <= 0 ? 0 : this.cmm / this.BY;
    var i = t == 1 || t == 0 ? 0 : 0.01;
    if (Math.abs(t - this.yst) > i) {
      this.yst = t;
      this.Pst.SetFillAmount(t);
    }
  }
  rym() {
    let t = 0;
    var i;
    if (this.Rjt) {
      t = 4;
    } else if (this.tym) {
      t = 3;
    } else if (this.DP_) {
      t = 2;
    } else if (this.BY > 0 && this.cmm > 0) {
      t = 1;
    }
    if (this.ac !== t) {
      i = this.ac;
      this.ac = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "血条弱点状态改变", ["EntityId", this.E0], ["state", t]);
      }
      if (this.ac === 0) {
        this.Hide();
      } else if (i === 0) {
        this.Show();
      }
      if (this.ac === 4) {
        this.SPe.StopSequenceByKey("Unlock");
        this.SPe.PlayLevelSequenceByName("Lock");
      } else if (i === 4) {
        this.SPe.StopSequenceByKey("Lock");
        this.SPe.PlayLevelSequenceByName("Unlock");
      }
      if (this.ac === 3) {
        this.SPe.StopSequenceByKey("Unbreak");
        this.SPe.PlayLevelSequenceByName("Break");
      } else if (i === 3) {
        this.lym();
        this.tym = false;
        this.SPe.StopSequenceByKey("Break");
        this.SPe.PlayLevelSequenceByName("Unbreak");
      }
      if (this.ac === 2) {
        this.SPe.PlayLevelSequenceByName("Full");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiShowWeaknessBreakEffect, false);
      }
      this.GetItem(2).SetUIActive(this.ac === 1);
      this.GetItem(3).SetUIActive(this.ac === 2);
      this.GetItem(4).SetUIActive(this.ac === 3);
      this.GetItem(5).SetUIActive(this.ac === 3);
      this.GetItem(6).SetUIActive(this.ac === 4);
      this.Xvm?.();
    }
  }
  IsFullState() {
    return this.ac === 2;
  }
  IsBreakState() {
    return this.ac === 3;
  }
  SetStateChangeCallback(t) {
    this.Xvm = t;
  }
}
exports.HeadStateWeaknessItem = HeadStateWeaknessItem;
//# sourceMappingURL=HeadStateWeaknessItem.js.map