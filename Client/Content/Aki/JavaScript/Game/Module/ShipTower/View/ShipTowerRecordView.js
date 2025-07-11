"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRecordView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ShipTowerAreaItem_1 = require("./ShipTowerAreaItem");
const ShipTowerRecordItem_1 = require("./ShipTowerRecordItem");
class ShipTowerRecordView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zJa = undefined;
    this.OpenParam = undefined;
    this.PA_ = undefined;
    this.uA_ = undefined;
    this.iJl = undefined;
    this.LD_ = undefined;
    this.Ns_ = undefined;
    this.UA_ = () => {
      var e = new ShipTowerAreaItem_1.ShipTowerAreaItem();
      e.ClickCallBack = this.DA_;
      return e;
    };
    this.DA_ = e => {
      var i = (this.iJl = e).RecordList?.some(e => e.TeamList.length > 0);
      var t = e.RecordList?.some(e => e.BuffId > 0);
      var i = !!i && !!t;
      this.U$l(!i);
      if (i) {
        this.LD_?.RefreshByData(e.RecordList, undefined, true);
      }
      var t = e.RecordList?.reduce((e, i) => e + i.Score, 0) ?? 0;
      var i = e.RecordList?.reduce((e, i) => e + i.Wave, 0) ?? 0;
      this.GetText(6).SetText(t.toString());
      this.GetText(7).SetText(i.toString());
      var e = this.GetTexture(8);
      var i = this.Ns_?.GetStageGradeResIdByScore(t);
      var t = i !== undefined;
      e?.SetUIActive(t);
      if (t) {
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        this.SetTextureByPath(t, e);
      }
      this.PlaySequence("Switch");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 69, "", ["SelectData", this.iJl]);
      }
    };
    this.VSi = () => {
      return new ShipTowerRecordItem_1.ShipTowerRecordItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UITexture], [9, UE.UIVerticalLayout], [10, UE.UIItem]];
  }
  Es_() {
    this.uA_ = ModelManager_1.ModelManager.ShipTowerModel.RecordList;
    this.Ns_ = ModelManager_1.ModelManager.ShipTowerModel.GetEndlessStageData();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    await ModelManager_1.ModelManager.ShipTowerModel.RequestRecord();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.CloseMe.bind(this));
    this.zJa.SetHelpBtnActive(false);
    this.PA_ = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(10).GetOwner(), this.UA_, true);
    this.LD_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.VSi);
    await this.PA_.RefreshByDataAsync(this.uA_);
    this.PA_.SelectGridProxy(this.kA_());
    if (this.uA_.length <= 0) {
      this.U$l(true);
    }
  }
  OnStart() {
    var e = this.Ns_?.TitleKey ?? "";
    this.GetText(5).ShowTextNew(e);
  }
  U$l(e) {
    this.GetItem(4)?.SetUIActive(!e);
    this.GetItem(3)?.SetUIActive(e);
  }
  kA_() {
    return 0;
  }
}
exports.ShipTowerRecordView = ShipTowerRecordView;
//# sourceMappingURL=ShipTowerRecordView.js.map