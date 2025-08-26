"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyStrengthItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const StrengthItemBase_1 = require("./StrengthItemBase");
const CLOSE_ANIM_TIME = 250;
const PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 3;
class FlyStrengthItem extends StrengthItemBase_1.StrengthItemBase {
  constructor() {
    super(...arguments);
    this.mii = true;
    this.uRl = true;
    this.cRl = false;
    this._3a = false;
    this.Rjt = false;
    this.Wnd = false;
    this.yni = 0;
    this.Eii = 0;
    this.Sii = 1;
    this.mRl = 0.1;
    this.dii = [];
    this.Mni = 0;
    this.Sni = 0;
    this.dRl = 0;
    this.gii = new UE.Rotator(0, 0, 0);
    this.xii = undefined;
    this.uAl = undefined;
    this.Pni = (t, i, s) => {
      this.xni();
    };
    this.bni = (t, i, s) => {
      this.xni();
    };
    this.CRl = (t, i) => {
      if (this.cRl !== i) {
        this.cRl = i;
        this.Lri();
      }
    };
    this.jGa = (t, i) => {
      if (this._3a !== i) {
        this._3a = i;
        this.gRl();
      }
    };
    this.YAl = (t, i) => {
      if (this.Rjt !== i) {
        this.Rjt = i;
        this.wke();
      }
    };
    this.Yst = (t, i) => {
      if (this.Wnd !== i) {
        this.Wnd = i;
        this.Lri();
      }
    };
  }
  GetResourceId() {
    return "UiItem_EnergyFly";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++) {
      this.bii(t === 0);
    }
    this.yni = CommonParamById_1.configCommonParamById.GetIntConfig("LowEndurancePercent") / CommonDefine_1.RATE_10000;
    this.Eii = CommonParamById_1.configCommonParamById.GetIntConfig("FlySingleStrengthValue");
    this.Sii = CommonParamById_1.configCommonParamById.GetIntConfig("FlyMaxSingleStrengthItemCount");
    this.mRl = CommonParamById_1.configCommonParamById.GetIntConfig("FlyTailSpeed") * TimeUtil_1.TimeUtil.Millisecond;
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    super.OnStart();
    this.xni(true);
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.StopTweenAnim(8);
    this.PlayTweenAnim(7);
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(7);
    this.PlayTweenAnim(8);
    if (this.uAl) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HudUnit", 17, "重复隐藏翱翔体力条");
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
      }, CLOSE_ANIM_TIME, FlyStrengthItem.Xii);
      await this.uAl.Promise;
    }
  }
  OnBeforeDestroy() {
    this.Gii();
    super.OnBeforeDestroy();
  }
  Tick(t) {
    if (!!this.GetUiVisible() && !(this.dRl <= this.Mni)) {
      this.dRl -= t * this.mRl;
      this.pRl();
    }
  }
  OnAddEvents() {
    FormationAttributeController_1.FormationAttributeController.AddValueListener(10, this.Pni);
    FormationAttributeController_1.FormationAttributeController.AddMaxListener(10, this.bni);
  }
  OnRemoveEvents() {
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(10, this.Pni);
    FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(10, this.bni);
  }
  OnAddEntityEvents() {
    var t;
    if (this.RoleData && (t = this.RoleData.GameplayTagComponent)) {
      this.ListenForTagAddOrRemove(t, -2027866845, this.CRl);
      this.ListenForTagAddOrRemove(t, -54528961, this.jGa);
      this.ListenForTagAddOrRemove(t, 1745099302, this.YAl);
      this.ListenForTagAddOrRemove(t, 649220293, this.Yst);
    }
  }
  OnRefreshRoleData() {
    if (this.RoleData) {
      this.cRl = this.RoleData?.GameplayTagComponent?.HasTag(-2027866845) ?? false;
      this._3a = this.RoleData?.GameplayTagComponent?.HasTag(-54528961) ?? false;
      this.Rjt = this.RoleData?.GameplayTagComponent?.HasTag(1745099302) ?? false;
      this.Wnd = this.RoleData?.GameplayTagComponent?.HasTag(649220293) ?? false;
      this.gRl();
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
    var i = FormationAttributeController_1.FormationAttributeController.GetValue(10);
    var s = FormationAttributeController_1.FormationAttributeController.GetMax(10);
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
    var t = !this.Wnd && (this.cRl || !this.uRl);
    this.SetActive(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "翱翔体力条显隐", ["visible", t]);
    }
  }
  gRl() {
    var t = this.GetSprite(0);
    var i = this.GetItem(5);
    if (this._3a) {
      if (this.dRl === 0) {
        this.dRl = this.Mni;
      }
      this.pRl();
      t.SetUIActive(true);
      i.SetUIActive(true);
    } else {
      this.dRl = 0;
      t.SetUIActive(false);
      i.SetUIActive(false);
    }
  }
  pRl() {
    var t = this.GetSprite(0);
    var i = this.GetItem(5);
    t.SetFillAmount(this.dRl / this.Sni);
    this.gii.Yaw = this.Mni / this.Sni * 360;
    i.SetUIRelativeRotation(this.gii);
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
}
(exports.FlyStrengthItem = FlyStrengthItem).Xii = Stats_1.Stat.Create("StrengthCloseAnim");
//# sourceMappingURL=FlyStrengthItem.js.map