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
    this.ckm = -1;
    this.dkm = [];
    this.mkm = undefined;
    this.fkm = 0;
    this.PW1 = [];
    this.r9m = new Queue_1.Queue();
    this.gkm = [];
    this.pkm = new Queue_1.Queue();
    this.$pt = undefined;
    this.TZs = (e, t) => {
      this.mkm?.RefreshLevel(e, t);
      this.vkm(t);
    };
    this.ykm = i => {
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
          this.r9m.Push(r);
          this.o9m();
        }
      }
    };
    this.n9m = () => {
      var e = this.pkm.Pop();
      if (e !== undefined) {
        this.gkm.push(e);
      }
      this.o9m();
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
        this.dkm.push(n);
      }
    }
    this.mkm = new BattleHonamiStoryPlayerLevelView_1.BattleHonamiStoryPlayerLevelView();
    t.push(this.mkm.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.fkm = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryRoleAutoEquipTipsDuration") ?? 0;
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryRoleAutoEquipTipsMaxSize") ?? 0;
    var s = this.GetItem(1);
    var r = this.GetItem(2);
    r.SetUIActive(false);
    for (let e = 0; e < i; e++) {
      var a = LguiUtil_1.LguiUtil.CopyItem(r, s);
      var o = new BattleHonamiStoryRoleItem_1.BattleHonamiStoryRoleItem();
      o.RegisterOnAfterHide(this.n9m);
      this.PW1.push(o);
      this.gkm.push(e);
      t.push(o.CreateByActorAsync(a.GetOwner()));
    }
    await Promise.all(t);
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    e = ModelManager_1.ModelManager.HonamiStoryModel.PlayerData.PowerLevel ?? 0;
    this.mkm?.RefreshLevel(0, e, true);
    this.vkm(e, true);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetItem(6).SetUIActive(true);
    this.s9m(false);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, this.ykm);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.TZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, this.ykm);
  }
  vkm(t, e = false) {
    let i = -1;
    for (let e = 0; e < this.dkm.length; e++) {
      if (t < this.dkm[e]) {
        break;
      }
      i = e;
    }
    if (e || i !== this.ckm) {
      this.ckm = i;
      var s = [4, 3, 5];
      for (let e = 0; e < s.length; e++) {
        this.GetItem(s[e]).SetUIActive(i >= e);
      }
    }
  }
  o9m() {
    if (this.r9m.Size === 0) {
      if (this.gkm.length === this.PW1.length) {
        this.s9m(false);
      }
    } else if (this.gkm.length <= 0) {
      if (e = this.pkm.Front) {
        this.PW1[e].HideRoleItem();
      }
    } else {
      var e = this.gkm.pop();
      if (e !== undefined) {
        if (this.pkm.Size === 0) {
          this.s9m(true);
        }
        var t = this.r9m.Pop();
        if (t) {
          this.PW1[e].ShowRoleItem(t, this.fkm);
          this.pkm.Push(e);
          for (let e = 0; e < this.pkm.Size; e++) {
            var i = this.pkm.Get(e);
            if (i !== undefined) {
              this.PW1[i].GetRootItem().SetHierarchyIndex(e);
            }
          }
        }
      }
    }
  }
  s9m(e) {
    this.$pt?.StopPrevSequence(false, true);
    this.$pt?.PlaySequencePurely(e ? "Extended" : "Basics");
  }
}
exports.BattleHonamiStoryPlayerStateView = BattleHonamiStoryPlayerStateView;
//# sourceMappingURL=BattleHonamiStoryPlayerStateView.js.map