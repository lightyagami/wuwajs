"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpWeaponGachaPoolItem = undefined;
const UE = require("ue");
const Queue_1 = require("../../../../Core/Container/Queue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaPoolItem_1 = require("./GachaPoolItem");
const WeaponDescribeComponent_1 = require("./WeaponDescribeComponent");
class UpWeaponGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.mWt = undefined;
    this.dWt = new Map();
    this.aGc = new Map();
    this.CWt = undefined;
    this.gWt = new Queue_1.Queue();
    this.pjt = false;
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    var e;
    this.pjt = false;
    if (this.gWt.Size !== 0 && (e = this.gWt.Pop())) {
      this.fWt(e);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.mWt = new WeaponDescribeComponent_1.WeaponDescribeComponent();
    await this.mWt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  Refresh() {
    var e;
    if (this.GachaViewInfo) {
      e = this.GachaViewInfo.ShowIdList[0];
      this.fWt(e);
    }
  }
  fWt(e) {
    if (this.Rjt) {
      this.gWt.Push(e);
    } else {
      this.Ujt();
      this.pWt(e).finally(() => {
        this.Jft();
      });
    }
  }
  async pWt(t) {
    if (!this.IsDestroyOrDestroying) {
      this.mWt.Update(t);
      this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(2));
      var t = this.GetItem(0);
      var i = this.GachaViewInfo.WeaponPrefabPath;
      var s = this.dWt.get(i);
      if (!s || s !== this.CWt) {
        this.CWt?.SetUIActive(false);
        this.hGc(this.CWt);
        let e = s;
        if (!e) {
          s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, t);
          e = s.GetComponentByClass(UE.UIItem.StaticClass());
          this.dWt.set(i, e);
        }
        e.SetUIActive(true);
        this.lGc(e);
        this.CWt = e;
      }
    }
  }
  lGc(e) {
    let t = this.aGc.get(e);
    if (!t) {
      t = new LevelSequencePlayer_1.LevelSequencePlayer(e);
      this.aGc.set(e, t);
    }
    if (t?.CheckSeqActorIsSeqPlaying("Loop")) {
      t.ReplaySequenceByKey("Loop");
    } else {
      t.PlaySequencePurely("Loop");
    }
  }
  hGc(e) {
    if (e &&= this.aGc.get(e)) {
      e.StopCurrentSequence();
    }
  }
}
exports.UpWeaponGachaPoolItem = UpWeaponGachaPoolItem;
//# sourceMappingURL=UpWeaponGachaPoolItem.js.map