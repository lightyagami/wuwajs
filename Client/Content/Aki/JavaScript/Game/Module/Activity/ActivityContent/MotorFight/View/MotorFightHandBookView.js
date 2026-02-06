"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightHandBookView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MultiTemplateScrollView_1 = require("../../../../Util/ScrollView/MultiTemplateScrollView");
const MotorFightGridItem_1 = require("./Item/MotorFightGridItem");
const MotorFightItemDetailPanel_1 = require("./Item/MotorFightItemDetailPanel");
const MotorFightTitleItem_1 = require("./Item/MotorFightTitleItem");
class MotorFightHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dcg = undefined;
    this.hLt = 1;
    this.ycg = [];
    this.cs1 = undefined;
    this.lqe = undefined;
    this._xg = undefined;
    this.Scg = undefined;
    this.PAg = t => this.dcg.GetItemUnlockNum(t);
    this.Bco = (t, i) => {
      this._xg = t;
      this.Scg.RefreshProxyDirectly(this.hLt);
      this.hLt = i;
      this.Scg.RefreshProxyDirectly(i);
      this.cs1?.Refresh(t);
      this.PlayOrReplaySequence("Switch");
    };
    this.aui = t => !!this._xg && this._xg.Id === t;
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIMultiTemplateScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.dcg = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    var t = [];
    this.cs1 = new MotorFightItemDetailPanel_1.MotorFightItemDetailPanel();
    t.push(this.cs1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(t);
    this.Scg = new MultiTemplateScrollView_1.MultiTemplateScrollView(this.GetMultiTemplateScrollViewComponent(2));
    this.Mcg();
    var t = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.ycg);
    t.ScrollToGridIndex = 0;
    t.GridAnimName = "Start";
    t.PlayGridAnim = true;
    this.Scg.RefreshByData(t);
    var t = this.Scg.GetProxyByGridIndex(this.hLt);
    if (t && t.Data) {
      this.Bco(t.Data, this.hLt);
    }
    var [t, i] = this.dcg.GetAllItemUnlockNum();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PrefabTextItem_878845910_Text", t, i);
  }
  Mcg() {
    for (const e of this.dcg.GetMotorFightItemTypeList()) {
      var t = new MotorFightTitleItem_1.MotorFightItemTypeTemplateData();
      t.Data = e;
      t.GetUnlockNum = this.PAg;
      this.ycg.push(t);
      var t = this.dcg.GetMotorFightItemDataListByType(e.Id);
      for (const s of t) {
        var i = new MotorFightGridItem_1.MotorFightGridTemplateData();
        i.Data = s;
        i.OnClickCb = this.Bco;
        i.IsSelected = this.aui;
        this.ycg.push(i);
      }
    }
  }
  OnBeforeHide() {
    this.dcg.ReadHandBookRedDot();
  }
}
exports.MotorFightHandBookView = MotorFightHandBookView;
//# sourceMappingURL=MotorFightHandBookView.js.map