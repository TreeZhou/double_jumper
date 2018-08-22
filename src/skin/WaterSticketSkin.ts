class WaterSticketSkin extends BaseMovieClip {
    public skinList:Object = {
        'default':'waterDefaultMove'
    }
    constructor(){
        super();
        this.createMoveObj(this.skinList[this.skinType],{width:123,height:31});
    }
  
}