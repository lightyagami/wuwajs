"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyPreviewView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const DestroyPreviewGrid_1 = require("./DestroyPreviewGrid");
const GRID_SIZE = 210;
const GRID_NORMAL_WIDTH_SIZE = 630;
const GRID_NORMAL_HEIGHT_SIZE = 525;
const layoutSize = [[GRID_NORMAL_WIDTH_SIZE, GRID_NORMAL_HEIGHT_SIZE], [GRID_SIZE, GRID_SIZE], [GRID_SIZE * 2, GRID_SIZE], [GRID_NORMAL_WIDTH_SIZE, GRID_SIZE], [GRID_NORMAL_WIDTH_SIZE, GRID_SIZE * 2], [GRID_NORMAL_WIDTH_SIZE, GRID_SIZE * 2], [GRID_NORMAL_WIDTH_SIZE, GRID_SIZE * 2]];
class DestroyPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Nmi = undefined;
    this.Omi = undefined;
    this.kmi = [];
    this.Fmi = undefined;
    this.Vmi = undefined;
    this.Hmi = false;
    this.jmi = () => {
      return new DestroyPreviewGrid_1.DestroyPreviewGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e;
    var t;
    var i = this.OpenParam;
    if (i) {
      e = this.GetLoopScrollViewComponent(0);
      this.Nmi = new LoopScrollView_1.LoopScrollView(e, this.GetItem(2).GetOwner(), this.jmi);
      await this.Nmi.RefreshByDataAsync(i.OriginList);
      this.Wmi(i.OriginList.length, e);
      this.kmi = i.OriginList;
      e = this.GetLoopScrollViewComponent(1);
      this.Omi = new LoopScrollView_1.LoopScrollView(e, this.GetItem(2).GetOwner(), this.jmi);
      t = i.ResultList.length === 0;
      this.GetText(3).SetUIActive(t);
      e.RootUIComp.SetUIActive(!t);
      if (!t) {
        await this.Omi.RefreshByDataAsync(i.ResultList);
        this.Wmi(i.ResultList.length, e);
      }
      this.Hmi = !t;
      this.Fmi = new ButtonItem_1.ButtonItem(this.GetItem(4));
      this.Fmi.SetFunction(() => {
        this.CloseMe();
      });
      this.Vmi = new ButtonItem_1.ButtonItem(this.GetItem(5));
      this.Vmi.SetFunction(() => {
        this.Kmi();
        this.CloseMe();
      });
    }
  }
  OnAfterShow() {
    if (this.Hmi) {
      this.UiViewSequence.PlaySequence("Notice");
    }
  }
  Wmi(e, t) {
    let i = GRID_NORMAL_WIDTH_SIZE;
    let o = GRID_NORMAL_HEIGHT_SIZE;
    if (e < layoutSize.length) {
      i = layoutSize[e][0];
      o = layoutSize[e][1];
    }
    t.RootUIComp.SetWidth(i);
    t.RootUIComp.SetHeight(o);
  }
  Kmi() {
    var e = [];
    for (const i of this.kmi) {
      var t = {
        L8n: i[0].ItemId,
        b9n: i[0].IncId,
        m9n: i[1]
      };
      e.push(t);
    }
    ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructRequest(e);
  }
}
exports.DestroyPreviewView = DestroyPreviewView;
//# sourceMappingURL=DestroyPreviewView.js.map