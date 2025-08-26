"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MoraleBuffAddPanel_1 = require("./MoraleBuffAddPanel");
const MoraleBuffInfoPanel_1 = require("./MoraleBuffInfoPanel");
const MoraleBuffItem_1 = require("./MoraleBuffItem");
const MoraleLvInfoItem_1 = require("./MoraleLvInfoItem");
const MoraleUnbreakableLvInfoItem_1 = require("./MoraleUnbreakableLvInfoItem");
class MoraleBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.PopupCaption = undefined;
    this.BuffInfoPanel = undefined;
    this.BuffItemList = [];
    this.BuffItemMap = new Map();
    this.MoraleLvPanel = undefined;
    this.UnbreakableLvPanel = undefined;
    this.SelectBuff = undefined;
    this.BuffDataList = [];
    this.RoleAttrAddPanel = undefined;
    this.UJ1 = () => {
      this.RoleAttrAddPanel.SetActive(true);
    };
    this.Os_ = e => {
      this.DJ1(e);
      this.BuffInfoPanel.UpdateData(e);
      this.BuffItemList.forEach(e => {
        e.UpdateToggleState();
      });
    };
    this.V2i = () => {
      this.CloseMe();
    };
    this.Zdu = () => {
      ModelManager_1.ModelManager.MoraleModel.ClearNewActiveAreaBuff();
      this.UpdateAreaBuffRedDot();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIArtText], [8, UE.UIArtText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIScrollViewWithScrollbarComponent], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem]];
    this.BtnBindInfo = [[9, this.UJ1]];
  }
  Es_() {
    this.BuffDataList = ModelManager_1.ModelManager.MoraleModel.BuffList;
    var e = this.BuffDataList.find(e => e.Id === this.OpenParam?.BuffId);
    this.SelectBuff = e ?? ModelManager_1.ModelManager.MoraleModel.GetStageBuffData();
    this.DJ1(this.SelectBuff);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.RoleAttrAddPanel = new MoraleBuffAddPanel_1.MoraleBuffAddPanel();
    await this.RoleAttrAddPanel.Init(this.GetItem(15));
    this.RoleAttrAddPanel.CloseCallback = this.Zdu;
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.V2i);
    this.PopupCaption.SetHelpBtnActive(false);
    this.BuffInfoPanel = new MoraleBuffInfoPanel_1.MoraleBuffInfoPanel();
    await this.BuffInfoPanel.Init(this.GetItem(1));
    await this.BJ1();
    this.MoraleLvPanel = new MoraleLvInfoItem_1.MoraleLvInfoItem();
    await this.MoraleLvPanel.Init(this.GetItem(11));
    this.UnbreakableLvPanel = new MoraleUnbreakableLvInfoItem_1.MoraleUnbreakableLvInfoItem();
    await this.UnbreakableLvPanel.Init(this.GetItem(10));
    this.GetSprite(2)?.SetUIActive(false);
    this.GetSprite(3)?.SetUIActive(false);
  }
  async BJ1() {
    const s = [];
    var e = ModelManager_1.ModelManager.MoraleModel.BuffList;
    const a = this.GetItem(4);
    const r = this.GetItem(5);
    const h = this.GetItem(6);
    e.forEach((e, t) => {
      var t = t % 2 == 0 ? h : r;
      var t = LguiUtil_1.LguiUtil.CopyItem(t, a);
      var i = new MoraleBuffItem_1.MoraleBuffItem();
      i.ClickCallback = this.Os_;
      s.push(i.Init(t, e));
      this.BuffItemList.push(i);
      this.BuffItemMap.set(e.Id, i);
    });
    await Promise.all(s);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.Slo();
    const e = this.GetScrollViewWithScrollbar(13);
    e.OnLateUpdate.Bind(() => {
      TimerSystem_1.TimerSystem.Next(this.UpdateProgressAndJump.bind(this));
      e?.OnLateUpdate.Unbind();
    });
  }
  UpdateProgressAndJump() {
    if (!this.IsDestroyOrDestroying) {
      this.UpdateLvProgress();
      this.UpdateScrollJumpPos();
    }
  }
  Slo() {
    this.BuffItemList.forEach(e => {
      e.UpdateData();
    });
    if (this.SelectBuff) {
      this.BuffInfoPanel.UpdateData(this.SelectBuff);
    }
    this.MoraleLvPanel.UpdateData();
    this.UnbreakableLvPanel.UpdateData();
    var e = ModelManager_1.ModelManager.MoraleModel.BuffList;
    var t = e.filter(e => e.IsActiveOrTempActive()).length;
    this.GetArtText(7)?.SetText(t.toString());
    this.GetArtText(8)?.SetText(e.length.toString());
    this.UpdateLvProgress();
    this.UpdateExpAddDesc();
    this.UpdateAreaBuffRedDot();
  }
  UpdateScrollJumpPos() {
    var e;
    var t;
    var i;
    if (this.SelectBuff && (e = Math.max(0, this.SelectBuff.Index - 2), e = this.BuffItemList[e])) {
      t = this.GetScrollViewWithScrollbar(13);
      i = (0, puerts_1.$ref)(new UE.Vector2D(t.ContentUIItem.RelativeLocation));
      t.ScrollToLeft(i, e.GetRootItem());
    }
  }
  DJ1(e) {
    this.SelectBuff = e;
    this.OJ1();
  }
  OJ1() {
    this.BuffDataList.forEach(e => {
      e.SetSelectState(e.Id === this.SelectBuff?.Id);
    });
  }
  UpdateLvProgress(e, t) {
    var i;
    var s;
    var a;
    var r;
    var h = this.GetSprite(2);
    var o = h?.GetWidth() ?? 0;
    if (!(o <= 0)) {
      e = e ?? ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel();
      i = this.GetLvProgress(e);
      h?.SetFillAmount(i);
      h?.SetUIActive(true);
      t = (h = t ?? ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleLevel()) > 0 || i < 1;
      (r = this.GetSprite(3))?.SetUIActive(t);
      if (t && (r?.SetStretchLeft(t = o * i), a = this.GetLvProgress(s = e + h), r?.SetStretchRight(r = o * (1 - a)), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Morale", 69, "更新等级进度信息", ["总宽度", o], ["士气等级", e], ["士气等级进度", i], ["临时士气等级", h], ["临时士气等级左间距", t], ["临时士气等级右间距", r], ["总等级", s], ["总等级进度", a]);
      }
    }
  }
  GetLvProgress(e) {
    var t = this.BuffItemList.length * 2 - 1;
    var i = ModelManager_1.ModelManager.MoraleModel.GetStageBuffDataByLv(e);
    var s = Math.max(i.StartStageLv - 1, 0);
    var a = i.Index > 0 ? 2 : 1;
    var s = (e - s) / (i.EndStageLv - s) * a;
    var a = Math.max(i.Index * 2 - 1, 0);
    var t = (a + s) / t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "根据等级计算进度比", ["等级", e], ["进度", t], ["阶段Id", i.Id], ["阶段索引", i.Index], ["阶段开始等级", i.StartStageLv], ["阶段结束等级", i.EndStageLv], ["阶段进度", s], ["阶段前进度", a]);
    }
    return t;
  }
  UpdateExpAddDesc() {
    var e = this.GetText(16);
    var t = ModelManager_1.ModelManager.MoraleBattleModel.GetExpRatio();
    var i = t / 100;
    var s = i > 100;
    e?.SetUIActive(s);
    if (s) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Morale_title_37", i.toString());
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "UpdateExpAddDesc", ["ratio", t]);
    }
  }
  UpdateAreaBuffRedDot() {
    var e = ModelManager_1.ModelManager.MoraleModel.RedDotAreaBuff();
    this.GetItem(17)?.SetUIActive(e);
  }
}
exports.MoraleBuffView = MoraleBuffView;
//# sourceMappingURL=MoraleBuffView.js.map