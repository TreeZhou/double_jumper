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

	}
    public TYPE_NAME = 'wingProp';

}