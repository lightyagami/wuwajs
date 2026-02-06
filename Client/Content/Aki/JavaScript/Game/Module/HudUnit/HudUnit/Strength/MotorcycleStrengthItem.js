"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleStrengthItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MotorcycleAutoMovingItem_1 = require("./MotorcycleAutoMovingItem");
const StrengthItemBase_1 = require("./StrengthItemBase");
const CLOSE_ANIM_TIME = 250;
const PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 3;
const autoAcceleratorTagId = 285518931;
const autoNitrogenTagId = -904464547;
class MotorcycleStrengthItem extends StrengthItemBase_1.StrengthItemBase {
  constructor() {
    super(...arguments);
    this.mii = true;
    this.uRl = true;
    this.Rhm = false;
    this.Rjt = false;
    this.bld = false;
    this.yni = 0;
    this.Eii = 0;
    this.Sii = 1;
    this.dii = [];
    this.Mni = 0;
    this.Sni = 0;
    this.gii = new UE.Rotator(0, 0, 0);
    this.l5f = false;
    this.xii = undefined;
    this.uAl = undefined;
    this.Pni = (t, i, s) => {
      this.xni();
    };
    this.bni = (t, i, s) => {
      this.xni();
    };
    this.whm = (t, i) => {
      if (this.Rhm !== i) {
        this.Rhm = i;
        this.Lri();
      }
    };
    this.YAl = (t, i) => {
      if (this.Rjt !== i) {
        this.Rjt = i;
        this.wke();
        this.Lri();
      }
    };
    this.Yst = (t, i) => {
      if (this.bld !== i) {
        this.bld = i;
        this.Lri();
      }
    };
    this._5f = false;
    this.u5f = false;
    this.Ruc = undefined;
    this.Auc = 0;
    this.rtf = undefined;
    this.c5f = undefined;
    this.d5f = false;
    this.m5f = false;
    this.MotorcycleTagTaskList = [];
    this.Duc = t => {
      this.Uuc();
      this.f5f();
      this.Buc();
    };
    this.Wef = t => {
      this.f5f();
      this.Buc();
    };
    this.g5f = (t, i) => {
      this.d5f = i;
      this.Buc();
    };
    this.C5f = (t, i) => {
      this.m5f = i;
      this.Buc();
    };
  }
  GetResourceId() {
    return "UiItem_EnergyRide";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Ruc = new MotorcycleAutoMovingItem_1.MotorcycleAutoMovingItem();
    await this.Ruc.CreateByActorAsync(this.GetItem(10).GetOwner());
  }
  OnStart() {
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++) {
      this.bii(t === 0);
    }
    this.yni = CommonParamById_1.configCommonParamById.GetIntConfig("LowEndurancePercent") / CommonDefine_1.RATE_10000;
    this.Eii = CommonParamById_1.configCommonParamById.GetIntConfig("MotorcycleSingleStrengthValue");
    this.Sii = CommonParamById_1.configCommonParamById.GetIntConfig("MotorcycleMaxSingleStrengthItemCount");
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    super.OnStart();
    this.l5f = false;
    this.GetItem(9).SetAlpha(0);
    this.Uuc(true);
    this.f5f();
    this.Buc(true);
    this.xni(true);
  }
  async OnBeforeHideAsync() {
    if (this.uAl) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HudUnit", 17, "重复隐藏摩托车体力条");
      }
    } else {
      this.Gii();
      this.uAl = new CustomPromise_1.CustomPromise();
      this.xii = TimerSystem_1.TimerSystem.Delay(() => {
        this.xii = undefined;
        if (this.uAl) {
          this.uAl.SetResult();
          this.uAl = undefined;
        }
      }, CLOSE_ANIM_TIME, MotorcycleStrengthItem.Xii);
      await this.uAl.Promise;
    }
  }
  OnBeforeDestroy() {
    this.Gii();
    this.p5f();
    super.OnBeforeDestroy();
  }
  OnAddEvents() {
    FormationAttributeController_1.FormationAttributeController.AddValueListener(14, this.Pni);
    FormationAttributeController_1.FormationAttributeController.AddMaxListener(14, this.bni);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorcycleAutoAcceleratorSettingChanged, this.Duc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorcycleAutoNitrogenSettingChanged, this.Duc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
  }
  OnRemoveEvents() {
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.Pni);
    FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(14, this.bni);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorcycleAutoAcceleratorSettingChanged, this.Duc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorcycleAutoNitrogenSettingChanged, this.Duc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
  }
  OnAddEntityEvents() {
    var t;
    if (this.RoleData && (t = this.RoleData.GameplayTagComponent)) {
      this.ListenForTagAddOrRemove(t, 346080557, this.whm);
      this.ListenForTagAddOrRemove(t, 961093495, this.YAl);
      this.ListenForTagAddOrRemove(t, -919634824, this.Yst);
    }
  }
  OnRefreshRoleData() {
    if (this.RoleData) {
      this.Rhm = this.RoleData?.GameplayTagComponent?.HasTag(346080557) ?? false;
      this.Rjt = this.RoleData?.GameplayTagComponent?.HasTag(961093495) ?? false;
      this.bld = this.RoleData?.GameplayTagComponent?.HasTag(-919634824) ?? false;
      this.wke();
      this.Lri();
    }
  }
  bii(t = false) {
    var i = this.GetItem(3);
    var s = this.GetItem(4);
    let e = undefined;
    e = t ? s : LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), i).GetComponentByClass(UE.UIItem.StaticClass());
    this.dii.push(e);
    return e;
  }
  xni(t = false) {
    var i = FormationAttributeController_1.FormationAttributeController.GetValue(14);
    var s = FormationAttributeController_1.FormationAttributeController.GetMax(14);
    let e = i !== this.Mni;
    if (e) {
      this.Mni = i;
    }
    if (s !== this.Sni) {
      e = true;
      this.Sni = s;
      this.kii(s);
    }
    if (e) {
      this.GetSprite(1).SetFillAmount(i / s);
    }
    this.Bni(t);
  }
  kii(t) {
    let i = Math.floor(t / this.Eii);
    if (i > this.Sii) {
      i = this.Sii;
    }
    for (let t = 0; t < this.dii.length; t++) {
      var s = this.dii[t];
      var e = t < i;
      if (s.IsUIActiveSelf() !== e) {
        s.SetUIActive(e);
      }
    }
    this.qni();
  }
  qni() {
    let t = Math.floor(this.Sni / this.Eii);
    var s = 360 / (t = t > this.Sii ? this.Sii : t);
    let e = 0;
    for (let i = 0; i < t; i++) {
      let t = this.dii[i];
      t = t || this.bii();
      this.gii.Yaw = e;
      t.SetUIRelativeRotation(this.gii);
      e += s;
    }
  }
  Bni(t = false) {
    var i = this.Mni;
    var s = this.Sni;
    var e = i / s > this.yni;
    this.fRl(e, t);
    var e = s <= i;
    if (this.uRl !== e || !!t) {
      this.uRl = e;
      this.Lri();
    }
  }
  fRl(t, i = false) {
    if (this.mii !== t || !!i) {
      this.mii = t;
      (i = this.GetSprite(1)).SetChangeColor(!t, i.changeColor);
      (i = this.GetSprite(2)).SetChangeColor(!t, i.changeColor);
    }
  }
  Lri() {
    var t = !this.bld && (this.Rjt || this.Rhm && !this.uRl);
    var i = !this.bld && this.Ruc.GetTargetVisible();
    var i = t || i;
    this.SetActive(i);
    if (this.l5f && !t) {
      this.l5f = false;
      this.StopTweenAnim(7);
      this.PlayTweenAnim(8);
    } else if (!this.l5f && t) {
      this.l5f = true;
      this.StopTweenAnim(8);
      this.PlayTweenAnim(7);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "摩托车体力条显隐", ["visible", i], ["IsHideTag", this.bld], ["IsLock", this.Rjt], ["IsDriving", this.Rhm], ["IsFullState", this.uRl]);
    }
  }
  wke() {
    this.GetItem(6)?.SetUIActive(this.Rjt);
  }
  Gii() {
    if (this.xii) {
      TimerSystem_1.TimerSystem.Remove(this.xii);
      this.xii = undefined;
    }
    if (this.uAl) {
      this.uAl.SetResult();
      this.uAl = undefined;
    }
  }
  Tick(t) {
    this.Buc();
  }
  Uuc(t = false) {
    var i = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    if ((this._5f !== i.AutoAcceleratorSettingEnable || this.u5f !== i.AutoNitrogenSettingEnable) && !(this._5f = i.AutoAcceleratorSettingEnable, this.u5f = i.AutoNitrogenSettingEnable, this._5f) && !this.u5f) {
      this.kuc(0, 0, t);
    }
  }
  f5f() {
    var t;
    this.rtf = undefined;
    this.ClearMotorcycleTagTask();
    if ((this._5f || this.u5f) && (t = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData).IsDriving) {
      this.rtf = t.MotorcycleEntityHandle;
      if (this.rtf?.Valid) {
        this.c5f = this.rtf.Entity.GetComponent(217);
        this.d5f = this.c5f?.HasTag(autoAcceleratorTagId) ?? false;
        this.m5f = this.c5f?.HasTag(autoNitrogenTagId) ?? false;
        this.ListenForMotorcycleTagAddOrRemove(this.c5f, autoAcceleratorTagId, this.g5f);
        this.ListenForMotorcycleTagAddOrRemove(this.c5f, autoNitrogenTagId, this.C5f);
      } else {
        this.c5f = undefined;
      }
    }
  }
  ListenForMotorcycleTagAddOrRemove(t, i, s) {
    t = t.ListenForTagAddOrRemove(i, s);
    if (t) {
      this.MotorcycleTagTaskList.push(t);
    }
  }
  ClearMotorcycleTagTask() {
    for (const t of this.MotorcycleTagTaskList) {
      t.EndTask();
    }
    this.MotorcycleTagTaskList.length = 0;
  }
  Buc(t = false) {
    if (this._5f || this.u5f) {
      var i = this.rtf?.Entity?.GetComponent(264);
      if (i) {
        if (this.u5f) {
          if (this.m5f) {
            this.kuc(4, 1, t);
            return;
          }
          var s = i.GetNitroBoostInfo();
          if (s) {
            var e = s.GetDuration();
            var s = s.GetCurrentTime();
            if (s > 0) {
              this.kuc(3, s / e, t);
              return;
            }
          }
        }
        if (this._5f) {
          if (this.d5f) {
            this.kuc(2, 1, t);
            return;
          }
          s = i.GetHoldThrottleInfo();
          if (s) {
            e = s.GetDuration();
            i = s.GetCurrentTime();
            if (i > 0) {
              this.kuc(1, i / e, t);
              return;
            }
          }
        }
        this.kuc(0, 0, t);
      }
    }
  }
  kuc(t, i = 0, s = false) {
    if (this.Ruc) {
      if (this.Auc === t) {
        if (this.Auc === 3) {
          this.Ruc.SetPercentNitrogen(i);
        } else if (this.Auc === 1) {
          this.Ruc.SetPercentAccelerator(i);
        }
      } else {
        this.Auc = t;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 17, "摩托车体力条自动油门氮气状态切换", ["state", t]);
        }
        if (t === 0) {
          this.Ruc.SetVisible(false);
        } else {
          this.Ruc.SetVisible(true);
          this.Ruc.SetNitrogen(t = t === 4 || t === 3);
          if (t) {
            this.Ruc.SetPercentNitrogen(i);
          } else {
            this.Ruc.SetPercentAccelerator(i);
          }
        }
        if (!s) {
          this.Lri();
        }
      }
    }
  }
  p5f() {
    this.ClearMotorcycleTagTask();
    this.rtf = undefined;
    this.c5f = undefined;
  }
}
(exports.MotorcycleStrengthItem = MotorcycleStrengthItem).Xii = Stats_1.Stat.Create("MotorcycleStrengthCloseAnim");
//# sourceMappingURL=MotorcycleStrengthItem.js.map