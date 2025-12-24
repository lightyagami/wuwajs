"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDetailPanelGroup = exports.PhantomInteractDetailPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomInteractDetailNormalContent_1 = require("./PhantomInteractDetailNormalContent");
const PhantomInteractDetailSpecialContent_1 = require("./PhantomInteractDetailSpecialContent");
const PhantomInteractListItem_1 = require("./PhantomInteractListItem");
class PhantomInteractDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.T5f = t;
    this._gf = undefined;
    this.Ewf = undefined;
    this.Ami = 0;
    this.b5f = undefined;
    this.o6f = undefined;
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    if (this.T5f) {
      e = (i = new PhantomInteractDetailSpecialContent_1.PhantomInteractDetailSpecialContent()).CreateByResourceIdAsync("UiItem_VisionEditTipSpecial", this.GetItem(2));
      this.b5f = i;
      t.push(e);
    } else {
      e = (i = new PhantomInteractDetailNormalContent_1.PhantomInteractDetailNormalContent()).CreateByResourceIdAsync("UiItem_VisionEditTipNor", this.GetItem(2));
      this.b5f = i;
      t.push(e);
    }
    this._gf = new PhantomInteractListItem_1.PhantomInteractListItem();
    var i = this._gf.CreateByActorAsync(this.GetItem(0).GetOwner());
    t.push(i);
    this.Ewf = new GetWayPanel();
    var e = this.Ewf.CreateByActorAsync(this.GetItem(3).GetOwner());
    t.push(e);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.o6f = new ActivePanel();
    var i = this.o6f.CreateByActorAsync(this.GetItem(4).GetOwner());
    t.push(i);
    await Promise.all(t);
    this._gf.SetUiActive(true);
    this._gf.DisableToggle();
    this.Ewf?.SetUiActive(false);
    this.b5f?.SetUiActive(true);
    this.GetItem(4)?.SetUIActive(false);
    this.o6f.SetText("PhantomDisplay_AreaNotSupported");
  }
  async Refresh(t) {
    var i = {
      ItemIndex: 0,
      MonsterId: t.MonsterId
    };
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Name);
    await this._gf.Refresh(i, false, false);
    this.b5f?.Refresh(t);
    this.GetItem(4)?.SetUIActive(t.IsSpecial && !t.IsInArea);
    this.Ewf?.SetUiActive(t.NeedGetWay);
    if (t.NeedGetWay && this.Ami !== t.GetWayItemData?.Id) {
      this.Ami = t.GetWayItemData?.Id ?? 0;
      const s = t.GetWayItemData;
      this.Ewf?.SetButtonFunction(() => {
        s?.Function?.();
      });
      this.Ewf?.SetText(s?.Text ?? "");
    }
  }
  PlaySwitchAnimation() {
    this.Hea?.StopCurrentSequence(false, true);
    this.Hea?.PlayLevelSequenceByName("Switch");
  }
}
exports.PhantomInteractDetailPanel = PhantomInteractDetailPanel;
class GetWayPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.Lxt = () => {
      if (this.Gke) {
        this.Gke();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.Lxt]];
  }
  SetButtonFunction(t) {
    this.Gke = t;
  }
  SetText(t) {
    var i = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
}
class PhantomInteractDetailPanelGroup {
  constructor() {
    this.R5f = undefined;
    this.L5f = undefined;
    this.V1i = 0;
    this.Cjf = false;
  }
  async CreateWithParent(t) {
    this.R5f = new PhantomInteractDetailPanel(true);
    this.L5f = new PhantomInteractDetailPanel(false);
    await Promise.all([this.R5f.CreateByResourceIdAsync("UiItem_VisionEditTip", t), this.L5f.CreateByResourceIdAsync("UiItem_VisionEditTip", t)]);
  }
  RefreshDetailPanel(t, i) {
    if (t) {
      if (i) {
        this.w5f(i);
      }
    } else {
      this.R5f?.SetUiActive(false);
      this.L5f?.SetUiActive(false);
      this.V1i = 0;
    }
  }
  async w5f(t) {
    var i = t.IsSpecial;
    var e = i ? this.R5f : this.L5f;
    this.R5f?.SetUiActive(false);
    this.L5f?.SetUiActive(false);
    this.Cjf = i;
    if (this.V1i !== t.MonsterId) {
      this.V1i = t.MonsterId;
      e?.PlaySwitchAnimation();
      await e?.Refresh(t);
    } else {
      e?.Refresh(t);
    }
    this.R5f?.SetUiActive(this.Cjf);
    this.L5f?.SetUiActive(!this.Cjf);
  }
}
exports.PhantomInteractDetailPanelGroup = PhantomInteractDetailPanelGroup;
class ActivePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText]];
  }
  SetText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
}
//# sourceMappingURL=PhantomInteractDetailPanel.js.map