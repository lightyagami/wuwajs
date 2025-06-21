"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MoraleBuffAddPanel_1 = require("./MoraleBuffAddPanel"),
  MoraleBuffInfoPanel_1 = require("./MoraleBuffInfoPanel"),
  MoraleBuffItem_1 = require("./MoraleBuffItem"),
  MoraleLvInfoItem_1 = require("./MoraleLvInfoItem"),
  MoraleUnbreakableLvInfoItem_1 = require("./MoraleUnbreakableLvInfoItem");
class MoraleBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.OpenParam = void 0, this.PopupCaption = void 0, this.BuffInfoPanel = void 0, this.BuffItemList = [], this.BuffItemMap = new Map, this.MoraleLvPanel = void 0, this.UnbreakableLvPanel = void 0, this.SelectBuff = void 0, this.BuffDataList = [], this.RoleAttrAddPanel = void 0, this.mz1 = () => {
      this.RoleAttrAddPanel.SetActive(!0)
    }, this.Os_ = e => {
      this.fz1(e), this.BuffInfoPanel.UpdateData(e), this.BuffItemList.forEach(e => {
        e.UpdateToggleState()
      })
    }, this.V2i = () => {
      this.CloseMe()
    }, this._au = () => {
      ModelManager_1.ModelManager.MoraleModel.ClearNewActiveAreaBuff(), this.UpdateAreaBuffRedDot()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIArtText],
      [8, UE.UIArtText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIScrollViewWithScrollbarComponent],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem]
    ], this.BtnBindInfo = [
      [9, this.mz1]
    ]
  }
  Es_() {
    this.BuffDataList = ModelManager_1.ModelManager.MoraleModel.BuffList;
    var e = this.BuffDataList.find(e => e.Id === this.OpenParam?.BuffId);
    this.SelectBuff = e ?? ModelManager_1.ModelManager.MoraleModel.GetStageBuffData(), this.fz1(this.SelectBuff), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam])
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync(), this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1), this.RoleAttrAddPanel = new MoraleBuffAddPanel_1.MoraleBuffAddPanel, await this.RoleAttrAddPanel.Init(this.GetItem(15)), this.RoleAttrAddPanel.CloseCallback = this._au, this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.PopupCaption.SetCloseCallBack(this.V2i), this.PopupCaption.SetHelpBtnActive(!1), this.BuffInfoPanel = new MoraleBuffInfoPanel_1.MoraleBuffInfoPanel, await this.BuffInfoPanel.Init(this.GetItem(1)), await this.gz1(), this.MoraleLvPanel = new MoraleLvInfoItem_1.MoraleLvInfoItem, await this.MoraleLvPanel.Init(this.GetItem(11)), this.UnbreakableLvPanel = new MoraleUnbreakableLvInfoItem_1.MoraleUnbreakableLvInfoItem, await this.UnbreakableLvPanel.Init(this.GetItem(10)), this.GetSprite(2)?.SetUIActive(!1), this.GetSprite(3)?.SetUIActive(!1)
  }
  async gz1() {
    const s = [];
    var e = ModelManager_1.ModelManager.MoraleModel.BuffList;
    const a = this.GetItem(4),
      r = this.GetItem(5),
      h = this.GetItem(6);
    e.forEach((e, t) => {
      var t = t % 2 == 0 ? h : r,
        t = LguiUtil_1.LguiUtil.CopyItem(t, a),
        i = new MoraleBuffItem_1.MoraleBuffItem;
      i.ClickCallback = this.Os_, s.push(i.Init(t, e)), this.BuffItemList.push(i), this.BuffItemMap.set(e.Id, i)
    }), await Promise.all(s)
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.Slo();
    const e = this.GetScrollViewWithScrollbar(13);
    e.OnLateUpdate.Bind(() => {
      TimerSystem_1.TimerSystem.Next(this.UpdateProgressAndJump.bind(this)), e?.OnLateUpdate.Unbind()
    })
  }
  UpdateProgressAndJump() {
    this.IsDestroyOrDestroying || (this.UpdateLvProgress(), this.UpdateScrollJumpPos())
  }
  Slo() {
    this.BuffItemList.forEach(e => {
      e.UpdateData()
    }), this.SelectBuff && this.BuffInfoPanel.UpdateData(this.SelectBuff), this.MoraleLvPanel.UpdateData(), this.UnbreakableLvPanel.UpdateData();
    var e = ModelManager_1.ModelManager.MoraleModel.BuffList,
      t = e.filter(e => e.IsActiveOrTempActive()).length;
    this.GetArtText(7)?.SetText(t.toString()), this.GetArtText(8)?.SetText(e.length.toString()), this.UpdateLvProgress(), this.UpdateExpAddDesc(), this.UpdateAreaBuffRedDot()
  }
  UpdateScrollJumpPos() {
    var e, t, i;
    this.SelectBuff && (e = Math.max(0, this.SelectBuff.Index - 2), e = this.BuffItemList[e]) && (t = this.GetScrollViewWithScrollbar(13), i = (0, puerts_1.$ref)(new UE.Vector2D(t.ContentUIItem.RelativeLocation)), t.ScrollToLeft(i, e.GetRootItem()))
  }
  fz1(e) {
    this.SelectBuff = e, this.pz1()
  }
  pz1() {
    this.BuffDataList.forEach(e => {
      e.SetSelectState(e.Id === this.SelectBuff?.Id)
    })
  }
  UpdateLvProgress(e, t) {
    var i, s, a, r, h = this.GetSprite(2),
      o = h?.GetWidth() ?? 0;
    o <= 0 || (e = e ?? ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel(), i = this.GetLvProgress(e), h?.SetFillAmount(i), h?.SetUIActive(!0), t = 0 < (h = t ?? ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleLevel()) || i < 1, (r = this.GetSprite(3))?.SetUIActive(t), t && (r?.SetStretchLeft(t = o * i), a = this.GetLvProgress(s = e + h), r?.SetStretchRight(r = o * (1 - a)), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Morale", 69, "更新等级进度信息", ["总宽度", o], ["士气等级", e], ["士气等级进度", i], ["临时士气等级", h], ["临时士气等级左间距", t], ["临时士气等级右间距", r], ["总等级", s], ["总等级进度", a]))
  }
  GetLvProgress(e) {
    var t = 2 * this.BuffItemList.length - 1,
      i = ModelManager_1.ModelManager.MoraleModel.GetStageBuffDataByLv(e),
      s = Math.max(i.StartStageLv - 1, 0),
      a = 0 < i.Index ? 2 : 1,
      s = (e - s) / (i.EndStageLv - s) * a,
      a = Math.max(2 * i.Index - 1, 0),
      t = (a + s) / t;
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "根据等级计算进度比", ["等级", e], ["进度", t], ["阶段Id", i.Id], ["阶段索引", i.Index], ["阶段开始等级", i.StartStageLv], ["阶段结束等级", i.EndStageLv], ["阶段进度", s], ["阶段前进度", a]), t
  }
  UpdateExpAddDesc() {
    var e = this.GetText(16),
      t = ModelManager_1.ModelManager.MoraleBattleModel.GetExpRatio(),
      i = t / 100,
      s = 100 < i;
    e?.SetUIActive(s), s && LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Morale_title_37", i.toString()), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "UpdateExpAddDesc", ["ratio", t])
  }
  UpdateAreaBuffRedDot() {
    var e = ModelManager_1.ModelManager.MoraleModel.IsExistNewActiveAreaBuff();
    this.GetItem(17)?.SetUIActive(e)
  }
}
exports.MoraleBuffView = MoraleBuffView;
//# sourceMappingURL=MoraleBuffView.js.map