"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerBuffView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView"),
  BabelTowerBuffDetailItem_1 = require("./BabelTowerBuffDetailItem"),
  BabelTowerBuffItem_1 = require("./BabelTowerBuffItem");
class BabelTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.e_c = void 0, this.Ept = void 0, this.t_c = void 0, this.lqe = void 0, this.i_c = void 0, this.Vc1 = void 0, this.r_c = -1, this.AMo = () => {
      this.CloseMe()
    }, this.gDo = () => {
      var e = new BabelTowerBuffItem_1.BabelTowerBuffItem;
      return e.OnToggleClick = this.o_c, e
    }, this.o_c = e => {
      this.n_c(e)
    }, this.s_c = () => {
      this.a_c()
    }, this.ERc = () => {
      this.IRc()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.s_c],
      [3, this.ERc],
      [1, this.AMo]
    ]
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam, this.Pe ? (this.GetButton(1)?.RootUIComp.SetUIActive(!1), this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.Ept = new BabelTowerBuffDetailItem_1.BabelTowerBuffDetailItem, await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())]), this.lqe.SetCloseCallBack(this.AMo), this.e_c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.gDo, !0)) : Log_1.Log.CheckError() && Log_1.Log.Error("UiCommon", 43, "Data为空")
  }
  OnBeforeShow() {
    this.t_c || this.a_c()
  }
  a_c() {
    this.nQi(this.GetExtendToggle(2)), this.__c()
  }
  IRc() {
    this.nQi(this.GetExtendToggle(3)), this.TRc()
  }
  __c() {
    var e = new UiAsyncTask_1.UiAsyncTask("BabelTowerBuffView.ToggleSelect", async () => {
      await this.u_c()
    });
    this.RunAsyncTask(e)
  }
  TRc() {
    var e = new UiAsyncTask_1.UiAsyncTask("BabelTowerBuffView.ToggleSelect", async () => {
      await this.bRc()
    });
    this.RunAsyncTask(e)
  }
  async u_c() {
    this.i_c = this.Pe?.BuffDataList, this.Vc1 = 0, await this.m_c()
  }
  async bRc() {
    this.i_c = this.Pe?.DeTermDataList, this.Vc1 = 1, await this.m_c()
  }
  nQi(e) {
    this.t_c?.SetToggleState(0), this.t_c = e, this.t_c.SetToggleState(1)
  }
  async m_c() {
    this.i_c && 0 !== this.i_c.length ? (this.f_c(!1), await this.g_c(), this.n_c(0)) : this.f_c(!0)
  }
  async g_c() {
    await this.e_c.RefreshByDataAsync(this.i_c)
  }
  C_c() {
    !this.i_c || this.r_c < 0 || this.r_c >= this.i_c.length || this.Ept.Update(this.i_c[this.r_c])
  }
  f_c(e) {
    if (this.GetItem(6).SetUIActive(e), e) {
      let e = "";
      0 === this.Vc1 ? e = "PrefabTextItem_1001383652_Text" : 1 === this.Vc1 && (e = "PrefabTextItem_438129107_Text"), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e)
    }
    this.GetLoopScrollViewComponent(4).RootUIComp.SetUIActive(!e), this.Ept.SetActive(!e)
  }
  n_c(e) {
    !this.i_c || e < 0 || e >= this.i_c.length || (this.r_c = e, this.e_c?.SelectGridProxy(e), this.C_c())
  }
}
exports.BabelTowerBuffView = BabelTowerBuffView;
//# sourceMappingURL=BabelTowerBuffView.js.map