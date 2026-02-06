"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryPlayerStateView = undefined;
const UE = require("ue");
const Queue_1 = require("../../../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleHonamiStoryPlayerLevelView_1 = require("./BattleHonamiStoryPlayerLevelView");
const BattleHonamiStoryRoleItem_1 = require("./BattleHonamiStoryRoleItem");
class BattleHonamiStoryPlayerStateView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Rqm = -1;
    this.wqm = [];
    this.Lqm = undefined;
    this.Pqm = 0;
    this.PW1 = [];
    this.Ojm = new Queue_1.Queue();
    this.Aqm = [];
    this.Uqm = new Queue_1.Queue();
    this.$pt = undefined;
    this.TZs = (e, t) => {
      this.Lqm?.RefreshLevel(e, t);
      this.xqm(t);
    };
    this.Bqm = i => {
      var s = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(i);
      if (s) {
        i = s.GetItemDataByPosition(i);
        if (i) {
          let e = undefined;
          let t = undefined;
          var r = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(s.GetWeaponId());
          if (r) {
            e = [];
            t = [];
            for (const a of r.Config.SuitId) {
              e.push(a);
              t.push(s.IsSuitActivate(a));
            }
          }
          r = {
            RoleId: s.GetRoleId(),
            ItemSubType: i.GetSubType(),
            BuffActive: s.CheckItemBuffIsActive(i),
            SuitIdList: e,
            SuitDataList: t
          };
          this.Ojm.Push(r);
          this.Gjm();
        }
      }
    };
    this.Fjm = () => {
      var e = this.Uqm.Pop();
      if (e !== undefined) {
        this.Aqm.push(e);
      }
      this.Gjm();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("HonamiStoryRankLevelList");
    if (e) {
      for (const n of e) {
        this.wqm.push(n);
      }
    }
    this.Lqm = new BattleHonamiStoryPlayerLevelView_1.BattleHonamiStoryPlayerLevelView();
    t.push(this.Lqm.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Pqm = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryRoleAutoEquipTipsDuration") ?? 0;
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryRoleAutoEquipTipsMaxSize") ?? 0;
    var s = this.GetItem(1);
    var r = this.GetItem(2);
    r.SetUIActive(false);
    for (let e = 0; e < i; e++) {
      var a = LguiUtil_1.LguiUtil.CopyItem(r, s);
      var o = new BattleHonamiStoryRoleItem_1.BattleHonamiStoryRoleItem();
      o.RegisterOnAfterHide(this.Fjm);
      this.PW1.push(o);
      this.Aqm.push(e);
      t.push(o.CreateByActorAsync(a.GetOwner()));
    }
    await Promise.all(t);
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    e = ModelManager_1.ModelManager.HonamiStoryModel.PlayerData.PowerLevel ?? 0;
    this.Lqm?.RefreshLevel(0, e, true);
    this.xqm(e, true);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetItem(6).SetUIActive(true);
    this.Njm(false);
    this.Ore();
  }
  Reset() {
    this.kre();
    this.$pt?.Clear();
    this.$pt = undefined;
    super.Reset();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.TZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, this.Bqm);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.TZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, this.Bqm);
  }
  xqm(t, e = false) {
    let i = -1;
    for (let e = 0; e < this.wqm.length; e++) {
      if (t < this.wqm[e]) {
        break;
      }
      i = e;
    }
    if (e || i !== this.Rqm) {
      this.Rqm = i;
      var s = [4, 3, 5];
      for (let e = 0; e < s.length; e++) {
        this.GetItem(s[e]).SetUIActive(i >= e);
      }
    }
  }
  Gjm() {
    if (this.Ojm.Size === 0) {
      if (this.Aqm.length === this.PW1.length) {
        this.Njm(false);
      }
    } else if (this.Aqm.length <= 0) {
      if (e = this.Uqm.Front) {
        this.PW1[e].HideRoleItem();
      }
    } else {
      var e = this.Aqm.pop();
      if (e !== undefined) {
        if (this.Uqm.Size === 0) {
          this.Njm(true);
        }
        var t = this.Ojm.Pop();
        if (t) {
          this.PW1[e].ShowRoleItem(t, this.Pqm);
          this.Uqm.Push(e);
          for (let e = 0; e < this.Uqm.Size; e++) {
            var i = this.Uqm.Get(e);
            if (i !== undefined) {
              this.PW1[i].GetRootItem().SetHierarchyIndex(e);
            }
          }
        }
      }
    }
  }
  Njm(e) {
    this.$pt?.StopPrevSequence(false, true);
    this.$pt?.PlaySequencePurely(e ? "Extended" : "Basics");
  }
}
exports.BattleHonamiStoryPlayerStateView = BattleHonamiStoryPlayerStateView;
//# sourceMappingURL=BattleHonamiStoryPlayerStateView.js.map