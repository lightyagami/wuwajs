"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashCollectGridItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomBattleFettersViewItem_1 = require("../../../Phantom/PhantomBattle/View/PhantomBattleFettersViewItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashCollectStarItem_1 = require("./CalabashCollectStarItem");
class CalabashCollectGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.ppt = undefined;
    this.$be = undefined;
    this.VIc = false;
    this.CanToggleChange = undefined;
    this.OnToggleClick = undefined;
    this.zbe = () => new CalabashCollectStarItem_1.CalabashCollectStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, () => {
      this.OnToggleClick?.(this.GridIndex);
    }]];
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
    this.ppt = new PhantomBattleFettersViewItem_1.VisionDetailMonsterItem();
    await this.ppt?.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.ppt.SetToggleInteractive(false);
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.zbe);
  }
  Refresh(t, e, i) {
    var s = (this.Pe = t).DevelopRewardData.MonsterId;
    var a = [];
    let r = 0;
    for (const n of ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(s)) {
      var h = n.IsUnlock;
      a.push(h);
      if (h) {
        r++;
      }
    }
    if (t.UnlockData) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.SkillName);
    } else {
      o = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(s).MonsterNumber;
      this.GetText(2)?.SetText(o + "???");
    }
    this.ppt.Refresh(new PhantomBattleFettersViewItem_1.VisionDetailMonsterItemData(t.DevelopRewardData.MonsterId, r));
    this.$be?.RefreshByData(a);
    var o = e ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleStateForce(o);
    if (e) {
      ModelManager_1.ModelManager.CalabashModel?.RecordMonsterId(s);
    }
    this.RefreshNewItem();
  }
  OnSelected(t) {
    var e = this.Pe.DevelopRewardData.MonsterId;
    if (this.VIc) {
      ModelManager_1.ModelManager.CalabashModel?.RecordMonsterId(e);
      this.RefreshNewItem();
    }
    this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  RefreshNewItem() {
    this.VIc = this.Pe.UnlockData && !ModelManager_1.ModelManager.CalabashModel.CheckMonsterIdInRecord(this.Pe.DevelopRewardData.MonsterId);
    this.GetItem(3).SetUIActive(this.VIc);
  }
}
exports.CalabashCollectGridItem = CalabashCollectGridItem;
//# sourceMappingURL=CalabashCollectGridItem.js.map