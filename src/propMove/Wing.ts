class Wing extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(WingSkin,'wing');
        this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        // this.caculateJumpDistance();

	}
    public JUMP_DISTANCE:number = 1000;
    public TYPE_NAME = 'wingProp';
    // private caculateJumpDistance(){
    //     this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    // }

}