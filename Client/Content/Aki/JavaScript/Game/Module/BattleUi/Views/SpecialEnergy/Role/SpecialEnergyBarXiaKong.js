"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarXiaKong = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const SUMMON_NUM = 3;
const MAX_NUM = 2;
class SpecialEnergyBarXiaKong extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.pMc = undefined;
    this._ii = 0;
    this.wca = [];
    this.Bca = 0;
    this.xN1 = false;
    this.DN1 = false;
    this.UN1 = false;
    this.kP1 = () => {
      this.qca();
    };
    this.BN1 = (t, i) => {
      this.xN1 = i;
      this.qca();
    };
    this.kN1 = (t, i) => {
      this.DN1 = i;
      this.qca();
    };
    this.Zyn = (t, i) => {
      this.UN1 = i;
      this.qca();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  OnInitData() {
    super.OnInitData();
    var t = this.RoleData?.CreatureDataComponent;
    if (t) {
      var i = t.CustomServerEntityIds;
      for (let t = 0; t < SUMMON_NUM && !(t > i.length - 1); t++) {
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntity(i[t]);
        if (s?.IsInit) {
          this.wca.push(s);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "夏空能量条读取幻影实体时异常", ["creatureDataId", i[t]]);
        }
      }
    }
  }
  AddEvents() {
    super.AddEvents();
    for (const t of this.wca) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnSetActorHidden, this.kP1);
    }
    this.ListenForTagAddOrRemoveChanged(420927313, this.BN1);
    this.ListenForTagAddOrRemoveChanged(791426644, this.kN1);
    this.ListenForTagAddOrRemoveChanged(-1572058059, this.Zyn);
  }
  RemoveEvents() {
    super.RemoveEvents();
    for (const t of this.wca) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnSetActorHidden, this.kP1);
    }
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot();
    this.pMc.InitData(this.RoleData, this.Config);
    this.pMc.ForceHideBottomLine = true;
    await this.pMc.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.InitTweenAnim(12);
    this.InitTweenAnim(13);
    this.OnBarPercentChanged();
    this.xN1 = this.TagComponent?.HasTag(420927313) ?? false;
    this.DN1 = this.TagComponent?.HasTag(791426644) ?? false;
    this.UN1 = this.TagComponent?.HasTag(-1572058059) ?? false;
    this.qca(true);
  }
  OnBarPercentChanged() {
    this.Owt(this.GetKeyEnable() ? 1 : 0);
  }
  Owt(t, i = false) {
    if (t !== this._ii || i) {
      this._ii = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "夏空能量条改变状态", ["满能量", t]);
      }
      switch (this._ii) {
        case 0:
          this.StopTweenAnim(8);
          this.PlayTweenAnim(9);
          break;
        case 1:
          this.StopTweenAnim(9);
          this.PlayTweenAnim(8);
      }
    }
  }
  Tick(t) {
    super.Tick(t);
    this.pMc?.Tick(t);
  }
  qca(t = false) {
    let i = 0;
    if (this.UN1) {
      if (this.xN1) {
        i++;
      }
      if (this.DN1) {
        i++;
      }
    } else {
      for (const s of this.wca) {
        if (s.Entity?.GetComponent(1)?.DisableActorHandle.Empty) {
          i++;
        }
      }
      i = Math.min(i, MAX_NUM);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "【能量条】夏空幻影数量更新", ["", i]);
    }
    if (this.Bca !== i || t) {
      if (i > this.Bca) {
        for (let t = this.Bca; t < i; t++) {
          if (t === 0) {
            this.StopTweenAnim(11);
            this.PlayTweenAnim(10);
          } else if (t === 1) {
            this.StopTweenAnim(13);
            this.PlayTweenAnim(12);
          }
        }
      } else {
        for (let t = this.Bca - 1; t >= i; t--) {
          if (t === 0) {
            this.StopTweenAnim(10);
            this.PlayTweenAnim(11);
          } else if (t === 1) {
            this.StopTweenAnim(12);
            this.PlayTweenAnim(13);
          }
        }
      }
      this.Bca = i;
    }
  }
}
exports.SpecialEnergyBarXiaKong = SpecialEnergyBarXiaKong;
//# sourceMappingURL=SpecialEnergyBarXiaKong.js.map