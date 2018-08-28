class WoodSticket extends Stickets {
    constructor(){
        super();
        this.createMovieClipSticket(WoodSticketSkin);
    }

    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.setStickNormalMoveStatus(this.MOVE_FIXATION);
	}
    public TYPE_NAME = 'woodSticket';
    public IS_TIMING:boolean = false;
    public resertData(){
        this.visible = true;
        this.myClipSkinObj.movePesticide.gotoAndStop(1);
    }
    public sticketTimeSelfSkill(playerItem){
        let self = this;

        if(playerItem.$y-this.y<100&& !this.IS_TIMING) {
            let randomTime = Math.random()*2000+1000;
            this.IS_TIMING = true;
            setTimeout(()=>{
                this.myClipSkinObj.movePesticide.play();
                this.myClipSkinObj.movePesticide.addEventListener('complete',function(){
                    self.visible = false;
                    self.IS_TIMING  = false;
                },this)
            },randomTime)
        }
       
    }
}