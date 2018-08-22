class SpringSkin extends BaseMovieClip {
    public skinList:Object = {
        'default':'normalSpringMove'
    }
    constructor(){
        super();
        this.createMoveObj(this.skinList[this.skinType],{width:35,height:36});
    }
  
}