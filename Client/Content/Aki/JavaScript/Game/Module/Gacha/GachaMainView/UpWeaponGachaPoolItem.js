"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UpWeaponGachaPoolItem = void 0;
const UE = require("ue"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaPoolItem_1 = require("./GachaPoolItem"),
  WeaponDescribeComponent_1 = require("./WeaponDescribeComponent");
class UpWeaponGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments), this.mWt = void 0, this.dWt = new Map, this.aGc = new Map, this.CWt = void 0, this.gWt = new Queue_1.Queue, this.pjt = !1
  }
  get Rjt() {
    return this.pjt
  }
  Ujt() {
    this.pjt = !0
  }
  Jft() {
    var e;
    this.pjt = !1, 0 !== this.gWt.Size && (e = this.gWt.Pop()) && this.fWt(e)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture]
    ]
  }
  async OnBeforeStartAsync() {
    this.mWt = new WeaponDescribeComponent_1.WeaponDescribeComponent, await this.mWt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())
  }
  Refresh() {
    var e;
    this.GachaViewInfo && (e = this.GachaViewInfo.ShowIdList[0], this.fWt(e))
  }
  fWt(e) {
    this.Rjt ? this.gWt.Push(e) : (this.Ujt(), this.pWt(e).finally(() => {
      this.Jft()
    }))
  }
  async pWt(t) {
    if (!this.IsDestroyOrDestroying) {
      this.mWt.Update(t), this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(2));
      var t = this.GetItem(0),
        i = this.GachaViewInfo.WeaponPrefabPath,
        s = this.dWt.get(i);
      if (!s || s !== this.CWt) {
        this.CWt?.SetUIActive(!1), this.hGc(this.CWt);
        let e = s;
        e || (s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, t), e = s.GetComponentByClass(UE.UIItem.StaticClass()), this.dWt.set(i, e)), e.SetUIActive(!0), this.lGc(e), this.CWt = e
      }
    }
  }
  lGc(e) {
    let t = this.aGc.get(e);
    t || (t = new LevelSequencePlayer_1.LevelSequencePlayer(e), this.aGc.set(e, t)), t?.CheckSeqActorIsSeqPlaying("Loop") ? t.ReplaySequenceByKey("Loop") : t.PlaySequencePurely("Loop")
  }
  hGc(e) {
    e && (e = this.aGc.get(e)) && e.StopCurrentSequence()
  }
}
exports.UpWeaponGachaPoolItem = UpWeaponGachaPoolItem;
//# sourceMappingURL=UpWeaponGachaPoolItem.js.map