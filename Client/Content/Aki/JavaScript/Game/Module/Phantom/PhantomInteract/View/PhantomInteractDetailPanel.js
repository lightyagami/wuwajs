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
    this.nQf = t;
    this.YSf = undefined;
    this.QDf = undefined;
    this.Ami = 0;
    this.sQf = undefined;
    this.Czf = undefined;
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    if (this.nQf) {
      e = (i = new PhantomInteractDetailSpecialContent_1.PhantomInteractDetailSpecialContent()).CreateByResourceIdAsync("UiItem_VisionEditTipSpecial", this.GetItem(2));
      this.sQf = i;
      t.push(e);
    } else {
      e = (i = new PhantomInteractDetailNormalContent_1.PhantomInteractDetailNormalContent()).CreateByResourceIdAsync("UiItem_VisionEditTipNor", this.GetItem(2));
      this.sQf = i;
      t.push(e);
    }
    this.YSf = new PhantomInteractListItem_1.PhantomInteractListItem();
    var i = this.YSf.CreateByActorAsync(this.GetItem(0).GetOwner());
    t.push(i);
    this.QDf = new GetWayPanel();
    var e = this.QDf.CreateByActorAsync(this.GetItem(3).GetOwner());
    t.push(e);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.Czf = new ActivePanel();
    var i = this.Czf.CreateByActorAsync(this.GetItem(4).GetOwner());
    t.push(i);
    await Promise.all(t);
    this.YSf.SetUiActive(true);
    this.YSf.DisableToggle();
    this.QDf?.SetUiActive(false);
    this.sQf?.SetUiActive(true);
    this.GetItem(4)?.SetUIActive(false);
    this.Czf.SetText("PhantomDisplay_AreaNotSupported");
  }
  async Refresh(t) {
    var i = {
      ItemIndex: 0,
      MonsterId: t.MonsterId
    };
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Name);
    await this.YSf.Refresh(i, false, false);
    this.sQf?.Refresh(t);
    this.GetItem(4)?.SetUIActive(t.IsSpecial && !t.IsInArea);
    this.QDf?.SetUiActive(t.NeedGetWay);
    if (t.NeedGetWay && this.Ami !== t.GetWayItemData?.Id) {
      this.Ami = t.GetWayItemData?.Id ?? 0;
      const s = t.GetWayItemData;
      this.QDf?.SetButtonFunction(() => {
        s?.Function?.();
      });
      this.QDf?.SetText(s?.Text ?? "");
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
    this.aQf = undefined;
    this.hQf = undefined;
    this.V1i = 0;
    this.xig = false;
  }
  async CreateWithParent(t) {
    this.aQf = new PhantomInteractDetailPanel(true);
    this.hQf = new PhantomInteractDetailPanel(false);
    await Promise.all([this.aQf.CreateByResourceIdAsync("UiItem_VisionEditTip", t), this.hQf.CreateByResourceIdAsync("UiItem_VisionEditTip", t)]);
  }
  RefreshDetailPanel(t, i) {
    if (t) {
      if (i) {
        this.lQf(i);
      }
    } else {
      this.aQf?.SetUiActive(false);
      this.hQf?.SetUiActive(false);
      this.V1i = 0;
    }
  }
  async lQf(t) {
    var i = t.IsSpecial;
    var e = i ? this.aQf : this.hQf;
    this.aQf?.SetUiActive(false);
    this.hQf?.SetUiActive(false);
    this.xig = i;
    if (this.V1i !== t.MonsterId) {
      this.V1i = t.MonsterId;
      e?.PlaySwitchAnimation();
      await e?.Refresh(t);
    } else {
      e?.Refresh(t);
    }
    this.aQf?.SetUiActive(this.xig);
    this.hQf?.SetUiActive(!this.xig);
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