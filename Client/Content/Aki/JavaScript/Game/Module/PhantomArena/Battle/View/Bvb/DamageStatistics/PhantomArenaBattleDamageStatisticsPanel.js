"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDamageStatisticsPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const LguiIntTween_1 = require("../../../../../Util/Lgui/LguiIntTween");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const PhantomArenaBattleDamageStatisticsItem_1 = require("./PhantomArenaBattleDamageStatisticsItem");
const LIMIT_MIN_NUM = 3;
const LIMIT_DAMAGE_RATE = 0.01;
const ITEM_HEIGHT_INTERVAL = 12;
const TWEEN_DURATION = 0.3;
class PhantomArenaBattleDamageStatisticsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SelectRankType = 0;
    this.Sequence = undefined;
    this.LayoutItemMap = new Map();
    this.GridItemHeight = 0;
    this.OriginalHeight = 0;
    this.AllDamage = 0;
    this.AllInjury = 0;
    this.DamageDataMap = new Map();
    this.IsNotifyValueChange = false;
    this.LerpCurve = undefined;
    this.DefaultOffsetY = 0;
    this.HeightTween = undefined;
    this.ContentItem = undefined;
    this.vK1 = t => {
      if (t === "Close") {
        this.GetItem(2).SetUIActive(false);
      }
    };
    this.o3m = () => this.SelectRankType !== 1;
    this.n3m = () => this.SelectRankType !== 2;
    this.s3m = t => {
      if (t === 1) {
        this.SelectRankType = 1;
        this.GetExtendToggle(1).SetToggleStateForce(0);
        this.Dke();
      }
    };
    this.a3m = t => {
      if (t === 1) {
        this.SelectRankType = 2;
        this.GetExtendToggle(0).SetToggleStateForce(0);
        this.Dke();
      }
    };
    this.h3m = t => {
      var i = this.GetItem(3).Height;
      let s = 0;
      s = t === 1 ? this.OriginalHeight + (this.GridItemHeight + ITEM_HEIGHT_INTERVAL) * (this.LayoutItemMap.size - 1) : this.OriginalHeight + (this.GridItemHeight + ITEM_HEIGHT_INTERVAL) * (LIMIT_MIN_NUM - 1);
      this.HeightTween.PlayTween(i, s, TWEEN_DURATION, this.LerpCurve);
    };
    this.l3m = t => {
      if (t === 1) {
        this.Sequence.StopSequenceByKey("Close", false, true);
        this.GetItem(2).SetUIActive(true);
        this.Sequence.PlaySequence("Start");
      } else {
        this.Sequence.StopSequenceByKey("Start", false, true);
        this.Sequence.PlaySequence("Close");
      }
    };
    this._3m = (t, i, s, e) => {
      if (e === 2) {
        this.AllInjury += i;
        this.DamageDataMap.get(2).get(t).Damage += i;
      } else if (e === 1) {
        this.AllDamage += i;
        this.DamageDataMap.get(1).get(t).Damage += i;
      }
      if (e === this.SelectRankType && !(i / s <= LIMIT_DAMAGE_RATE)) {
        this.IsNotifyValueChange = true;
      }
    };
    this.u3m = () => this.SelectRankType === 1 ? this.AllDamage : this.AllInjury;
    this.c3m = t => {
      return (this.SelectRankType === 1 ? this.DamageDataMap.get(1) : this.DamageDataMap.get(2)).get(t).Damage;
    };
    this.Hjm = t => {
      this.ContentItem.SetHeight(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.s3m], [1, this.a3m], [5, this.h3m], [6, this.l3m]];
  }
  async OnBeforeStartAsync() {
    await this.d3m();
    await this.dAn();
  }
  OnStart() {
    this.jjm();
    this.m3m();
    this.Mqt();
    this.f3m();
    this.g3m();
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.HeightTween.Destroy();
  }
  Tick(t) {
    this.C3m();
  }
  jjm() {
    this.HeightTween = new LguiIntTween_1.LguiIntTween();
    this.HeightTween.BindUpdateTween(this.Hjm);
  }
  m3m() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
  }
  Mqt() {
    var t = this.GetExtendToggle(0);
    var i = this.GetExtendToggle(1);
    t.CanExecuteChange.Bind(this.o3m);
    i.CanExecuteChange.Bind(this.n3m);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList();
    this.GetExtendToggle(5).RootUIComp.SetUIActive(t.length > LIMIT_MIN_NUM);
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
  f3m() {
    this.ContentItem = this.GetItem(3);
    this.OriginalHeight = this.ContentItem.Height;
    this.ContentItem.SetHeight(this.OriginalHeight + (this.GridItemHeight + ITEM_HEIGHT_INTERVAL) * (LIMIT_MIN_NUM - 1));
  }
  g3m() {
    this.GetItem(4).SetUIActive(false);
  }
  async d3m() {
    const i = new CustomPromise_1.CustomPromise();
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("RacingBetsRankChangeCurve");
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.CurveFloat, t => {
      this.LerpCurve = t;
      i.SetResult(undefined);
    }, 102, this.MemoryTag);
    await i.Promise;
  }
  RT1() {
    var t = this.GetItem(4);
    return LguiUtil_1.LguiUtil.CopyItem(t, this.GetItem(3));
  }
  async dAn() {
    this.p3m();
    this.AllDamage = 0;
    this.AllInjury = 0;
    this.DamageDataMap.clear();
    var i = new Map();
    var s = new Map();
    this.DamageDataMap.set(1, i);
    this.DamageDataMap.set(2, s);
    var e = [...ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetPlayerEntityIdList(), ...ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetNpcEntityIdList()];
    var h = [];
    this.DefaultOffsetY = this.GetItem(4).GetAnchorOffsetY();
    for (let t = 0; t < e.length; t++) {
      var a = e[t];
      var r = {
        EntityId: a,
        Damage: 0,
        Count: t
      };
      i.set(a, r);
      var r = {
        EntityId: a,
        Damage: 0,
        Count: t
      };
      s.set(a, r);
      h.push(this.v3m(a, t));
    }
    await Promise.all(h);
  }
  p3m() {
    this.GridItemHeight = this.GetItem(4).Height;
  }
  C3m() {
    if (this.IsNotifyValueChange) {
      this.IsNotifyValueChange = false;
      this.Dke();
    }
  }
  Dke() {
    var t = this.DamageDataMap.get(this.SelectRankType);
    var i = Array.from(t.values());
    i.sort((t, i) => i.Damage - t.Damage);
    for (let t = 0; t < i.length; t++) {
      var s = i[t];
      var s = this.LayoutItemMap.get(s.EntityId);
      var e = this.DefaultOffsetY - t * (this.GridItemHeight + ITEM_HEIGHT_INTERVAL);
      s.RefreshOffsetY(e);
      s.RefreshCount();
    }
  }
  async v3m(t, i) {
    var s = this.RT1().GetOwner();
    var e = new PhantomArenaBattleDamageStatisticsItem_1.PhantomArenaBattleDamageStatisticsItem();
    e.GetAllCount = this.u3m;
    e.GetCount = this.c3m;
    e.NotifyValueChange = this._3m;
    await e.CreateThenShowByActorAsync(s);
    var s = this.DefaultOffsetY - i * (this.GridItemHeight + ITEM_HEIGHT_INTERVAL);
    e.Init(t, this.LerpCurve, s);
    this.LayoutItemMap.set(t, e);
  }
}
exports.PhantomArenaBattleDamageStatisticsPanel = PhantomArenaBattleDamageStatisticsPanel;
//# sourceMappingURL=PhantomArenaBattleDamageStatisticsPanel.js.map