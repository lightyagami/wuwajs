"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySwitchToggleDynamicItem = exports.ActivitySwitchToggle = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class CategoryToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnToggleClickCallBack = undefined;
    this.Bke = t => {
      this.OnToggleClickCallBack?.(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  SetIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(1), false);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  SetRedDotState(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
}
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.N8e = undefined;
    this.nAd = undefined;
    this.Nel = new Map();
    this.Fel = 0;
    this.BNe = t => {
      var e;
      var i = this.Nel.get(t);
      if (i !== undefined) {
        e = this.Vel(t);
        this.Nel.set(t, e);
        if (i && !e) {
          this.Hel(false);
        } else if (!i && e) {
          this.Hel(true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIItem]];
  }
  async Init(t) {
    this.nAd = new CategoryToggleItem();
    this.nAd.OnToggleClickCallBack = this.sAd.bind(this);
    var e = [];
    e.push(super.CreateThenShowByActorAsync(t.GetOwner(), undefined, true));
    e.push(this.nAd.CreateByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
  }
  OnBeforeShow() {
    this.KBl();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnBeforeDestroy() {
    this.Pe &&= undefined;
    this.Nel.clear();
  }
  sAd(t) {
    this.N8e?.(this.Pe, this.nAd.GetTabToggle(), t);
  }
  ClearItem() {}
  GetUsingItem(t) {
    return (t.IsLineType ? this.GetItem(1) : this.GetRootItem()).GetOwner();
  }
  Update(t, e) {
    if ((this.Pe = t).IsLineType) {
      this.mco();
    } else {
      this.jFi();
      this.BindRedDotIds(t.Activities.map(t => t.Id));
    }
  }
  InitData(t) {
    this.Pe = t;
  }
  SetOnToggleClicked(t) {
    this.N8e = t;
  }
  mco() {
    this.GetItem(1).SetUIActive(true);
    this.nAd?.SetUiActive(false);
  }
  jFi() {
    this.GetItem(1).SetUIActive(false);
    this.nAd?.SetUiActive(true);
    this.nAd?.SetIcon(this.Pe.IconPath);
  }
  OnSelected(t) {
    this.nAd?.GetTabToggle().SetToggleStateForce(1, t);
  }
  KBl() {
    for (const t of this.Nel.keys()) {
      this.BNe(t);
    }
  }
  Hel(t) {
    var e = this.Fel;
    if (t) {
      this.Fel++;
    } else {
      this.Fel--;
    }
    if (e && !this.Fel || !e && this.Fel) {
      this.SetRedDotState(this.Fel > 0);
    }
  }
  SetRedDotState(t) {
    this.nAd.SetRedDotState(t);
  }
  Vel(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(t);
  }
  BindRedDotIds(t) {
    this.Nel = new Map();
    this.Fel = 0;
    for (const i of t) {
      var e = this.Vel(i);
      this.Nel.set(i, e);
      if (e) {
        this.Fel++;
      }
    }
    this.SetRedDotState(this.Fel > 0);
  }
}
exports.ActivitySwitchToggle = ActivitySwitchToggle;
class ActivitySwitchToggleDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIItem]];
  }
  GetItemSize(t) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    if (t.IsLineType) {
      t = this.GetItem(1);
      this.eqe.Set(t.GetWidth(), t.GetHeight());
    } else {
      t = this.GetRootItem();
      this.eqe.Set(t.GetWidth(), t.GetHeight());
    }
    return this.eqe.ToUeVector2D(true);
  }
  ClearItem() {}
}
exports.ActivitySwitchToggleDynamicItem = ActivitySwitchToggleDynamicItem;
//# sourceMappingURL=ActivitySwitchToggle.js.map