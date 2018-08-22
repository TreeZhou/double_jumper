class WoodSticketSkin extends BaseMovieClip {
    public skinList:Object = {
        'default':'woodDefaultMove'
    }
    constructor(){
        super();
        this.createMoveObj(this.skinList[this.skinType],{width:126,height:31});
    }
}