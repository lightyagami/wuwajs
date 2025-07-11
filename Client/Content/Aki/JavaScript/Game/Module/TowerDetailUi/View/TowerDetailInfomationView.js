"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const TowerDetailData_1 = require("../TowerDetailData");
const TowerDetailInformationItem_1 = require("./TowerDetailInformationItem");
const TowerDetailSwitchItem_1 = require("./TowerDetailSwitchItem");
class TowerDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.aDo = undefined;
    this.hDo = undefined;
    this.NHe = 0;
    this.lDo = (e, t, i) => {
      t = new TowerDetailInformationItem_1.TowerDetailInformationItem(t);
      t.Update(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.PCo = (e, t, i) => {
      t = new TowerDetailSwitchItem_1.TowerDetailSwitchItem(t);
      t.Update(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.SortFunc = (e, t) => e.Priority - t.Priority;
    this._Do = () => {
      this.NHe = ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId;
      this.uDo();
      this.cDo();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.aDo = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.lDo);
    this.hDo = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(4), this.PCo);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn, this._Do);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn, this._Do);
  }
  OnAfterShow() {
    this.NHe = ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId;
    this.Og();
  }
  Og() {
    this.mDo();
    this.uDo();
    this.cDo();
  }
  uDo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.SwitchData;
    this.hDo.RebuildLayoutByDataNew(e);
  }
  cDo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.SwitchData;
    let t = undefined;
    e.forEach(e => {
      if (e.Index === this.NHe) {
        t = e;
      }
    });
    const i = new Array();
    ModelManager_1.ModelManager.TowerDetailModel.GetBuffs(t).forEach(e => {
      var t = new TowerDetailData_1.TowerInformationData();
      t.Type = 0;
      t.TowerDetailBuffData = e;
      t.Title = e.Title;
      t.Priority = e.Priority;
      i.push(t);
    });
    ModelManager_1.ModelManager.TowerDetailModel.GetMonsters(t).forEach(e => {
      var t = new TowerDetailData_1.TowerInformationData();
      t.Type = 1;
      t.MonsterData = e;
      t.Title = e.Title;
      t.Priority = e.Priority;
      i.push(t);
    });
    i.sort(this.SortFunc);
    this.aDo.RefreshByData(i);
  }
  mDo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.TowerTitle;
    this.GetText(0).SetText(e);
  }
  OnBeforeDestroy() {
    this.aDo.ClearChildren();
    this.hDo.ClearChildren();
  }
}
exports.TowerDetailView = TowerDetailView;
//# sourceMappingURL=TowerDetailInfomationView.js.map