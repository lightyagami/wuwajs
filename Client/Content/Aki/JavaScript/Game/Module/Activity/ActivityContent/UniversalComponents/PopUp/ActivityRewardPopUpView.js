"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRewardPopUpView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRewardPopUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.DataList = [];
    this.ContentLayout = undefined;
    this.TabLayout = undefined;
    this.u4e = 0;
    this.InitContentItem = () => {
      var t = new ActivityRewardPopUpContent();
      t.CloseViewFunction = () => {
        this.CloseMe();
      };
      return t;
    };
    this.InitTabItem = () => {
      return new TabItem();
    };
    this.c4e = t => {
      if (!this.Data || t.Source === this.Data.Source) {
        this.Data = t;
        this.Refresh();
      }
    };
    this.m4e = t => {
      var i = this.Data.DataPageList[t];
      var e = this.u4e;
      this.u4e = t;
      if (e >= 0 && e !== this.u4e) {
        this.TabLayout.GetLayoutItemByIndex(e)?.SetTabToggleState(false, false);
      }
      this.d4e(i.DataList);
      this.C4e(i.TabTips !== undefined, i.TabTips);
    };
    this.g4e = (t, i) => true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.c4e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.c4e);
  }
  OnStart() {
    this.Data = this.OpenParam ?? undefined;
    if (this.Data) {
      this.ContentLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.InitContentItem);
      this.TabLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.InitTabItem);
      this.GetText(6).SetUIActive(false);
      this.Refresh();
    }
  }
  Refresh() {
    this.f4e();
  }
  f4e() {
    if (this.Data.DataPageList.length !== 0) {
      var i = [];
      let t = false;
      for (const s of this.Data.DataPageList) {
        if (!t && !!s.TabName && !StringUtils_1.StringUtils.IsEmpty(s.TabName)) {
          t = true;
        }
        var e = {
          TabData: s,
          TabFunction: this.m4e,
          TabCanExecuteFunction: this.g4e
        };
        i.push(e);
      }
      this.TabLayout?.RefreshByData(i, () => {
        this.TabLayout.GetLayoutItemByIndex(this.u4e)?.SetTabToggleState(true, true);
      }, false);
      this.GetItem(3).SetUIActive(t);
    }
  }
  d4e(t) {
    this.DataList = t;
    this.ContentLayout?.RefreshByData(this.DataList, undefined, false);
  }
  C4e(t, i) {
    if (i) {
      this.GetText(6).SetText(i);
    }
    this.GetText(6).SetUIActive(t);
  }
}
exports.ActivityRewardPopUpView = ActivityRewardPopUpView;
class ActivityRewardPopUpContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.p4e = undefined;
    this.s4e = undefined;
    this.CloseViewFunction = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.W2e);
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(3));
  }
  Refresh(t, i, e) {
    var s;
    if (t.NameTextId) {
      s = t.NameTextArgs ?? [];
      this.Zma(t.NameTextId, s);
    } else {
      this.mGe(t.NameText);
    }
    this.v4e(t.RewardList ?? [], t.RewardState);
    this._Oe(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t);
  }
  Zma(t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, ...i);
  }
  v4e(t, i) {
    this.s4e?.SetActive(t.length !== 0);
    if (t.length !== 0) {
      this.s4e?.RefreshByData(t);
    }
  }
  _Oe(t) {
    this.p4e.SetActive(t.RewardState === 1);
    this.GetItem(4)?.SetUIActive(t.RewardState === 2);
    this.GetText(5)?.SetUIActive(t.RewardState === 0);
    switch (t.RewardState) {
      case 1:
        this.p4e?.SetRedDotVisible(t.RewardButtonRedDot ?? true);
        if (t.ClickFunction) {
          this.p4e?.SetFunction(() => {
            t.ClickFunction?.();
            if (t.ClickFunctionAndCloseSelf) {
              this.CloseViewFunction?.();
            }
          });
        }
        if (t.RewardButtonTextId !== undefined) {
          this.p4e?.SetLocalTextNew(t.RewardButtonTextId);
        } else if (t.RewardButtonText !== undefined) {
          this.p4e?.SetText(t.RewardButtonText);
        }
        break;
      case 0:
        this.p4e?.SetRedDotVisible(false);
        if (t.RewardButtonTextId !== undefined) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.RewardButtonTextId);
        } else if (t.RewardButtonText !== undefined) {
          this.GetText(5).SetText(t.RewardButtonText);
        }
    }
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.m4e = undefined;
    this.M4e = undefined;
    this.E4e = undefined;
    this.kqe = () => {
      this.m4e?.(this.GridIndex);
      this.M4e?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    const t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(() => this.S4e(t.ToggleState));
    this.GetItem(2).SetUIActive(false);
  }
  S4e(t) {
    return !this.E4e || this.E4e(t === 1, this.GridIndex);
  }
  Refresh(t, i, e) {
    if (t.TabData.TabName && !StringUtils_1.StringUtils.IsEmpty(t.TabData.TabName)) {
      this.GetText(1).SetText(t.TabData.TabName);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
    let s = false;
    for (const h of t.TabData.DataList) {
      if (h.RewardState === 1) {
        s = true;
        break;
      }
    }
    this.GetItem(2).SetUIActive(s);
    if (t.TabData.TabExtraFunction) {
      this.M4e = t.TabData.TabExtraFunction;
    }
    this.m4e = t.TabFunction;
    this.E4e = t.TabCanExecuteFunction;
  }
  SetTabToggleState(t, i) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
    if (t && i) {
      this.kqe();
    }
  }
}
//# sourceMappingURL=ActivityRewardPopUpView.js.map