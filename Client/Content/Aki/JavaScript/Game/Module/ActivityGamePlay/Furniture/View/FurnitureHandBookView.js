"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureHandBookView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const FurnitureDetailTipItem_1 = require("./FurnitureDetailTipItem");
const FurnitureHandBookItem_1 = require("./FurnitureHandBookItem");
class FurnitureHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CurSelectedFurnitureData = undefined;
    this.Bcg = [];
    this.CurShowDataList = [];
    this.fBg = undefined;
    this.S9t = [];
    this.zJa = undefined;
    this.C1g = undefined;
    this.kcg = undefined;
    this.Ept = undefined;
    this._5e = () => {
      this.CloseMe();
    };
    this.v1g = (t, e) => {
      this.fBg = this.S9t[t];
      this.qcg();
      this.RefreshGrid();
      this.SelectProxy();
    };
    this.Qld = () => {
      var t = new FurnitureHandBookItem_1.FurnitureHandBookItem();
      t.BindOnExtendToggleStateChanged(t => {
        var e = t.State;
        var t = t.Data;
        this.Ocg(e, t);
      });
      t.BindOnCanExecuteChange(this.Gcg);
      return t;
    };
    this.Ocg = (t, e) => {
      if (t === 1) {
        this.SelectFurniture(e);
      }
    };
    this.Gcg = (t, e, i) => {
      t = t.FurnitureConfig.Id;
      return i !== 1 || this.CurSelectedFurnitureData?.FurnitureConfig.Id !== t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6));
    this.zJa.SetCloseCallBack(this._5e);
    this.zJa.SetHelpBtnActive(false);
    this.S9t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureFilterConfigList();
    this.C1g = new CommonDropDown_1.CommonDropDown(this.GetItem(4), t => new OneTextDropDownItem_1.OneTextDropDownItem(t), t => new OneTextTitleItem_1.OneTextTitleItem(t));
    this.C1g.SetOnSelectCall(this.v1g);
    this.C1g.SetShowType(0);
    this.kcg = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.Qld);
    this.Ept = new FurnitureDetailTipItem_1.FurnitureDetailTipItem();
    await Promise.all([this.C1g.Init(), this.Ept.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())]);
    this.C1g.InitScroll(this.S9t, t => {
      return new LguiUtil_1.TableTextArgNew(t.Name ?? "");
    }, 0);
  }
  async OnBeforeShowAsyncImplementImplement() {
    const e = this.CurSelectedFurnitureData?.FurnitureConfig.Id ?? 0;
    this.UpdateAllDataList();
    this.qcg();
    await this.kcg.RefreshByDataAsync(this.CurShowDataList);
    let t = 0;
    if (e > 0 && (t = this.CurShowDataList.findIndex(t => t.FurnitureConfig.Id === e)) === -1) {
      t = 0;
    }
    this.kcg?.ScrollToGridIndex(t);
    this.SelectFurniture(this.CurShowDataList[t]);
    this.RefreshNumText();
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.FurnitureController.SetAllFurnitureHandBookItemRedDotAsRead();
  }
  UpdateAllDataList() {
    var t = ModelManager_1.ModelManager.FurnitureModel.cVn;
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfigListByHandleId(t);
    this.Bcg.length = 0;
    for (const i of t) {
      var e = !ModelManager_1.ModelManager.FurnitureModel.GetIsFurnitureUnlockById(i.Id);
      var e = {
        FurnitureConfig: i,
        IsLock: e,
        RedDotVisible: ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureHandBookItemRedDot(i.Id)
      };
      this.Bcg.push(e);
    }
  }
  qcg() {
    const e = this.fBg?.TagList;
    if (e) {
      this.CurShowDataList = this.Bcg.filter(t => e.includes(t.FurnitureConfig.TagId));
    } else {
      this.CurShowDataList = this.Bcg;
    }
    this.sSg();
  }
  sSg() {
    this.CurShowDataList.sort((t, e) => t.IsLock !== e.IsLock ? t.IsLock ? 1 : -1 : t.FurnitureConfig.QualityId !== e.FurnitureConfig.QualityId ? e.FurnitureConfig.QualityId - t.FurnitureConfig.QualityId : t.FurnitureConfig.Id !== e.FurnitureConfig.Id ? t.FurnitureConfig.Id - e.FurnitureConfig.Id : 0);
  }
  RefreshGrid() {
    this.kcg.RefreshByData(this.CurShowDataList);
  }
  RefreshDetail() {
    if (this.CurSelectedFurnitureData) {
      this.Ept.RefreshByFurnitureId(this.CurSelectedFurnitureData.FurnitureConfig.Id, true);
    }
  }
  RefreshNumText() {
    let t = 0;
    var e = this.Bcg.length;
    for (const i of this.Bcg) {
      if (!i.IsLock) {
        t++;
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "DIY_FurnitureDic_Process", t, e);
  }
  SelectFurniture(t) {
    this.CurSelectedFurnitureData = t;
    this.SelectProxy();
    this.RefreshDetail();
  }
  SelectProxy() {
    const e = this.CurSelectedFurnitureData?.FurnitureConfig.Id;
    var t;
    if (e && (t = this.CurShowDataList.findIndex(t => t.FurnitureConfig.Id === e)) !== -1) {
      this.kcg?.SelectGridProxy(t);
    }
  }
}
exports.FurnitureHandBookView = FurnitureHandBookView;
//# sourceMappingURL=FurnitureHandBookView.js.map