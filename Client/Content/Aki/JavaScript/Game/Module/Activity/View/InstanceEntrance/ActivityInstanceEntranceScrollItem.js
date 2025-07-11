"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInstanceEntranceScrollItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.ABl = undefined;
    this.DBl = undefined;
    this.RBl = undefined;
    this.PBl = undefined;
    this.xBl = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async WZt() {
    this.ABl = new MainContentItem();
    this.DBl = new SubContentItem();
    this.RBl = new MainContentItem();
    this.PBl = new SubContentItem();
    this.AddChild(this.ABl);
    this.AddChild(this.DBl);
    this.AddChild(this.RBl);
    this.AddChild(this.PBl);
    await Promise.all([this.ABl.CreateByActorAsync(this.GetItem(0).GetOwner()), this.DBl.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(), this.RBl.CreateByActorAsync(this.GetItem(2).GetOwner()), this.PBl.CreateByActorAsync(this.GetItem(3).GetOwner()).finally()]);
  }
  GetUsingItem(t) {
    var i = !t.GetLockState();
    if (t.GetStyle() === 0) {
      const s = i ? this.GetItem(0) : this.GetItem(2);
      return s.GetOwner();
    }
    const s = i ? this.GetItem(1) : this.GetItem(3);
    return s.GetOwner();
  }
  Update(t, i) {
    var s = !(this.Data = t).GetLockState();
    var e = t.GetStyle();
    (e === 0 ? s ? this.ABl : this.RBl : s ? this.DBl : this.PBl).RefreshView(t);
    let h = undefined;
    h = e === 0 ? s ? this.GetItem(0) : this.GetItem(2) : s ? this.GetItem(1) : this.GetItem(3);
    if (this.xBl !== h) {
      this.xBl?.SetUIActive(false);
    }
    this.xBl = h;
    this.xBl?.SetUIActive(true);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ActivityInstanceEntranceScrollItem = ActivityInstanceEntranceScrollItem;
class SubContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.OnClickExtendToggle = t => {
      if (t === 1) {
        this.fGt.GetSelectCallBack()?.(this.fGt.GetSelectDataIndex());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [2, UE.UIText], [1, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  RefreshView(t) {
    this.fGt = t;
    this.Oqe(this.fGt);
    this.NFe(this.fGt);
    this.e6e(this.fGt);
    this.wBl(this.fGt);
    this.Iwn(this.fGt);
  }
  Oqe(t) {
    t = t.GetSelectState();
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0);
  }
  NFe(t) {
    t = t.GetLockState();
    this.GetItem(3).SetUIActive(t);
  }
  e6e(t) {
    t = t.GetFinishState();
    this.GetItem(4).SetUIActive(t);
  }
  wBl(t) {
    t = t.GetInstanceDifficultIconPath();
    if (t) {
      this.SetTextureByPath(t, this.GetTexture(1));
    }
  }
  Iwn(t) {
    var i;
    if (t.GetLockState()) {
      i = t.GetUnLockDesc();
      this.GetText(2)?.SetText(i);
    } else {
      i = t.GetDesc();
      this.GetText(2)?.SetText(i);
    }
  }
}
class MainContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.fGt = undefined;
    this.BBl = t => {
      if (t === 1) {
        t = this.fGt.HaveChildData();
        this.fGt.GetSelectCallBack()?.(this.fGt.GetSelectDataIndex());
        if (t) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityEntranceScroller, this.fGt.GetSelectUiLogicIndex());
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityEntranceItemContent, this.fGt.GetSelectUiLogicIndex());
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [5, UE.UIItem], [7, UE.UIItem], [6, UE.UIItem], [4, UE.UIItem], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.BBl]];
  }
  RefreshView(t) {
    this.fGt = t;
    this.Oqe(t);
    this.bBl(t);
    this.NFe(t);
    this.e6e(t);
    this.qBl(t);
    this.wBl(t);
    this.mGe(t);
    this.GBl(t);
    this.kBl(t);
    this.HEl(t);
  }
  Oqe(t) {
    t = t.GetSelectState();
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0);
  }
  bBl(t) {
    t = t.GetSelectState();
    this.GetItem(5)?.SetUIActive(t);
  }
  NFe(t) {
    t = t.GetLockState();
    this.GetItem(7).SetUIActive(t);
  }
  e6e(t) {
    t = t.GetFinishState();
    this.GetItem(6).SetUIActive(t);
  }
  qBl(t) {
    var i = t.HaveChildData();
    var t = t.GetSelectState();
    this.GetItem(1)?.SetUIActive(i && t);
  }
  wBl(t) {
    this.GetTexture(2)?.SetUIActive(false);
    t = t.GetInstanceDifficultIconPath();
    if (t) {
      this.SetTextureByPath(t, this.GetTexture(2));
    }
  }
  mGe(t) {
    this.GetText(3)?.SetText("");
    t = t.GetInstanceName();
    if (t !== "") {
      this.GetText(3)?.SetText(t);
    }
  }
  GBl(t) {
    var i;
    if (t.GetLockState()) {
      i = t.GetUnLockDesc();
      this.GetText(8)?.SetText(i);
    } else {
      i = t.GetSubTitle();
      this.GetText(8)?.SetText(i);
    }
  }
  kBl(t) {
    t = t.HaveChildData();
    this.GetItem(4).SetUIActive(t);
  }
  HEl(t) {
    t = t.GetRedDotState();
    this.GetItem(9).SetUIActive(t);
  }
}
//# sourceMappingURL=ActivityInstanceEntranceScrollItem.js.map