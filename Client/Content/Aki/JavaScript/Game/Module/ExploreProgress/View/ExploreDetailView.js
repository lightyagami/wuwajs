"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreDetailView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const MapUtil_1 = require("../../Map/MapUtil");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const ExploreProgressDefine_1 = require("../ExploreProgressDefine");
const ExploreAreaDynamicItem_1 = require("./ExploreAreaDynamicItem");
const ExploreAreaParentItem_1 = require("./ExploreAreaParentItem");
const ExploreAreaViewData_1 = require("./ExploreAreaViewData");
const ExploreProgressItem_1 = require("./ExploreProgressItem");
class ExploreDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.n6t = undefined;
    this.s6t = undefined;
    this.a6t = undefined;
    this.kGe = undefined;
    this.h6t = -1;
    this.l6t = (e, r, i) => {
      const t = new ExploreProgressItem_1.ExploreProgressItem();
      t.CreateByActorAsync(r.GetOwner()).then(() => {
        t.Refresh(e);
        t.SetUiActive(true);
      }, () => {});
      return {
        Key: i,
        Value: t
      };
    };
    this.x4t = () => {
      UiManager_1.UiManager.CloseView("ExploreDetailView");
    };
    this._6t = () => {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10057)) {
        UiManager_1.UiManager.CloseView("ExploreDetailView");
        SkipTaskManager_1.SkipTaskManager.Run(0, ExploreProgressDefine_1.MAP_MARK_TYPE, ExploreProgressDefine_1.MAP_MARK_ID);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreProgressRewardNotOpen");
      }
    };
    this.u6t = (e, r, i) => {
      var t = new ExploreAreaParentItem_1.ExploreAreaParentItem();
      t.BindOnCountrySelected(this.t6t);
      t.BindOnAreaSelected(this.i6t);
      if (i === this.h6t) {
        this.s6t = t.ExploreAreaItem;
        this.h6t = -1;
      }
      return t;
    };
    this.t6t = (e, r, i) => {
      r = r.CountryId;
      if (i === 1) {
        this.c6t(r);
      } else {
        (i = ModelManager_1.ModelManager.ExploreProgressModel).SelectedCountryId = 0;
        i.SelectedAreaId = 0;
      }
      this.m6t();
    };
    this.i6t = (e, r, i) => {
      if (i) {
        this.d6t(r.AreaId, e);
        this.C6t();
        this.PlaySequence("Switch");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDynScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this._6t]];
  }
  async OnBeforeStartAsync() {
    this.a6t = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(2), new ExploreAreaDynamicItem_1.ExploreAreaDynamicItem(), this.u6t);
    await this.a6t.Init();
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.n6t.SetCloseCallBack(this.x4t);
    this.kGe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(4), this.l6t);
    this.c6t(ModelManager_1.ModelManager.AreaModel.GetAreaCountryId());
    this.m6t();
    if (!this.s6t) {
      this.C6t();
    }
  }
  OnBeforeDestroy() {
    this.n6t?.Destroy();
    this.n6t = undefined;
    this.a6t?.ClearChildren();
    this.a6t = undefined;
    this.kGe?.ClearChildren();
    this.kGe = undefined;
  }
  d6t(e, r) {
    if (r) {
      this.s6t?.SetSelected(false);
      (this.s6t = r).SetSelected(true);
      ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId = e;
    }
  }
  c6t(e) {
    var r;
    var i = ModelManager_1.ModelManager.ExploreProgressModel;
    if (e <= 0) {
      i.SelectedCountryId = ExploreProgressDefine_1.DEFAULT_COUNTRY_ID;
      r = i.GetExploreCountryData(e).GetExploreAreaDataList()[0];
      i.SelectedAreaId = r.AreaId;
    }
    i.SelectedCountryId = e;
    i.SelectedAreaId = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
  }
  m6t() {
    var e = [];
    var r = this.g6t(e);
    if (e[r]) {
      this.a6t.RefreshByData(e);
      this.h6t = r;
    } else {
      this.s6t = undefined;
    }
  }
  g6t(e) {
    var r = ModelManager_1.ModelManager.ExploreProgressModel;
    let i = 0;
    for (const l of ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataMap().values()) {
      if (!(l.GetAreaSize() <= 0)) {
        var t = l.CountryId;
        var a = new ExploreAreaViewData_1.ExploreAreaViewData();
        a.RefreshCountry(t, l.GetNameId(), false);
        e.push(a);
        if (t === r.SelectedCountryId) {
          var s;
          var o;
          var a = l.GetExploreAreaDataList();
          a.sort((e, r) => {
            var i = e.GetSortIndex();
            var t = r.GetSortIndex();
            if (i !== 0 && t !== 0 && i !== t) {
              return i - t;
            } else {
              return e.AreaId - r.AreaId;
            }
          });
          for (const n of a) {
            if (!(n.GetAllExploreAreaItemData().length <= 0)) {
              s = n.AreaId;
              (o = new ExploreAreaViewData_1.ExploreAreaViewData()).RefreshArea(s, n.GetNameId(), n.GetProgress());
              e.push(o);
              if (r.SelectedAreaId === s) {
                i = e.length - 1;
              }
            }
          }
        }
      }
    }
    return i;
  }
  C6t() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel;
    var r = e.SelectedAreaId;
    var e = e.GetExploreAreaData(r);
    if (e) {
      this.kGe.RefreshByData(e.GetAllExploreAreaItemData());
    }
  }
}
exports.ExploreDetailView = ExploreDetailView;
//# sourceMappingURL=ExploreDetailView.js.map